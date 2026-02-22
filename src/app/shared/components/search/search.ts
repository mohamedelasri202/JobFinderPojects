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
import { JobCard } from '../../../features/job/job-card/job-card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,JobCard],
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
      location: [''],
      level: [''] 
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

    this.searchForm.get('level')?.valueChanges.pipe(
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
    const level = this.searchForm.value.level || '';

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { 
        keyword: keyword,
        location: location, 
        level: level, 
        page: 1  
      }
    });
  }

loadJobs() {
  this._route.queryParamMap.subscribe((params) => {
    
    const currentPage = Number(params.get('page')) || 1;
    const location = params.get('location') || '';
    const level = params.get('level') || '';

    this._spinner.show();

    
    this._jobService.getAllJobs(currentPage, location || undefined, level || undefined)
      .pipe(
        catchError((err) => {
          if (err.status === 429) {
            toast.error("API Limit reached. Please wait 15 minutes.");
          }
          return of(null);
        })
      )
      .subscribe((resp: any) => {
        if (resp && resp.results) {
           this.jobs.set(resp);
        }
        this._spinner.hide();
      });
  });
}
  goToPage(page: number) {
    const keyword = this.searchForm.value.keyword || '';
    const location = this.searchForm.value.location || '';
    const level = this.searchForm.value.level || ''; 

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { 
        keyword: keyword,
        location: location,
        level: level, 
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