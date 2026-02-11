import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner'
import { toast } from 'ngx-sonner';


import { JobService } from '../../../services/job/job-service'; 

import { JobResponse } from '../../../modules/job/job-module';

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
  
  
  jobs = signal<JobResponse>({
    page: 0,
    page_count: 0,
    items_per_page: 0,
    total: 0,
    results: []
  });

  ngOnInit() {
    
    this.searchForm = this._fb.group({
      keyword: ['', Validators.required],
      location: ['']
    });

  
    this.loadJobs();
  }


onSearch() {
  if (this.searchForm.invalid) {
    toast.error("Please enter a job title/keyword");
    return;
  }

  const keyword = this.searchForm.value.keyword;
  const location = this.searchForm.value.location;

 
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

    const page = Number(params.get('page')) || 1;
    const keyword = params.get('keyword') || '';
    const location = params.get('location') || undefined;

    this._jobService.getAllJobs(page, keyword, location).subscribe({
      next: (resp: JobResponse) => {
        let results = resp.results;

        
        if (keyword && keyword.trim() !== '') {
          const lowerKeyword = keyword.toLowerCase().trim();
          results = results.filter(job => 
            job.name.toLowerCase().includes(lowerKeyword)
          );
        }

     
        this.jobs.set({
          ...resp,
          results: results,
          total: results.length 
        });

        this._spinner.hide();
      },
      error: () => {
        this._spinner.hide();
        toast.error("Error while retrieving jobs");
      }
    });
  });
}
  
}