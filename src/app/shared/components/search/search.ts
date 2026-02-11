import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { toast } from 'ngx-sonner';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { JobService } from '../../../services/job/job-service'; 
import { JobResponse, Job } from '../../../modules/job/job-module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private _fb = inject(FormBuilder);
  private _jobService = inject(JobService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _spinner = inject(NgxSpinnerService);

  searchForm!: FormGroup;
  
  private allFilteredJobs: Job[] = [];
  
  private readonly ITEMS_PER_PAGE = 10;
  
  jobs = signal<JobResponse>({
    page: 0,
    page_count: 0,
    items_per_page: 0,
    total: 0,
    results: []
  });

  ngOnInit() {
    this.searchForm = this._fb.group({
      keyword: [''],
      location: ['']
    });

    this.searchForm.get('keyword')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearch();
    });

    this.searchForm.get('location')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearch();
    });

    this.loadJobs();
  }

  onSearch() {
    const keyword = this.searchForm.value.keyword || '';
    const location = this.searchForm.value.location || '';

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { 
        keyword: keyword,
        location: location, 
        page: 1  
      }
    });
  }

  loadJobs() {
    this._route.queryParamMap.subscribe((params) => {
      this._spinner.show(); 

      const currentPage = Number(params.get('page')) || 1;
      const keyword = params.get('keyword') || '';
      const locationFilter = params.get('location') || '';

      const pagesToFetch = 10; 
      const requests = [];

      for (let i = 1; i <= pagesToFetch; i++) {
        requests.push(
          // Don't pass location to API, we'll filter client-side
          this._jobService.getAllJobs(i, undefined).pipe(
            catchError(() => of(null))
          )
        );
      }

      forkJoin(requests).subscribe({
        next: (responses: any[]) => {
          let allResults: Job[] = [];
          
          responses.forEach(resp => {
            if (resp && resp.results) {
              allResults = [...allResults, ...resp.results];
            }
          });

          // Filter by keyword (search in job title)
          if (keyword && keyword.trim() !== '') {
            const lowerKeyword = keyword.toLowerCase().trim();
            allResults = allResults.filter(job => 
              job.name.toLowerCase().includes(lowerKeyword)
            );
          }

          // Filter by location (search in locations array)
          if (locationFilter && locationFilter.trim() !== '') {
            const lowerLocation = locationFilter.toLowerCase().trim();
            allResults = allResults.filter(job => {
              // Check if any location contains the search term
              return job.locations && job.locations.some(loc => 
                loc.name.toLowerCase().includes(lowerLocation)
              );
            });
          }

          // Sort by publication date (newest first)
          allResults.sort((a, b) => {
            const dateA = new Date(a.publication_date).getTime();
            const dateB = new Date(b.publication_date).getTime();
            return dateB - dateA; 
          });

          this.allFilteredJobs = allResults;

          const totalResults = allResults.length;
          const totalPages = Math.ceil(totalResults / this.ITEMS_PER_PAGE);
          
          const startIndex = (currentPage - 1) * this.ITEMS_PER_PAGE;
          const endIndex = startIndex + this.ITEMS_PER_PAGE;
          const paginatedResults = allResults.slice(startIndex, endIndex);

          this.jobs.set({
            page: currentPage - 1, 
            page_count: totalPages,
            items_per_page: this.ITEMS_PER_PAGE,
            total: totalResults,
            results: paginatedResults
          });

          this._spinner.hide();
          
          // Show appropriate message
          if (totalResults === 0) {
            if (keyword && locationFilter) {
              toast.info(`No jobs found with "${keyword}" in "${locationFilter}"`);
            } else if (keyword) {
              toast.info(`No jobs found with "${keyword}" in the title`);
            } else if (locationFilter) {
              toast.info(`No jobs found in "${locationFilter}"`);
            }
          }
        },
        error: () => {
          this._spinner.hide();
          toast.error("Error while retrieving jobs");
        }
      });
    });
  }

  goToPage(page: number) {
    const keyword = this.searchForm.value.keyword || '';
    const location = this.searchForm.value.location || '';

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { 
        keyword: keyword,
        location: location, 
        page: page
      }
    });
  }

  nextPage() {
    const currentPage = this.jobs().page + 1;
    const totalPages = this.jobs().page_count;
    
    if (currentPage < totalPages) {
      this.goToPage(currentPage + 2); 
    }
  }

  previousPage() {
    const currentPage = this.jobs().page + 1;
    
    if (currentPage > 1) {
      this.goToPage(currentPage);
    }
  }
}