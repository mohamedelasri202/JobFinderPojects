import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Important for template logic
import { Job } from '../../../services/job/job';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // 👈 Added these
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private jobService = inject(Job);

  searchForm!: FormGroup;
  jobList: any[] = [];
  isLoading: boolean = false;

  ngOnInit() {
   
  }

search() {
  this.isLoading = true;
  
  const filters = {
    keyWord: this.searchForm.value.keyword || '',
    location: this.searchForm.value.location || '',
    page: 1
  };


  this.jobService.getAllJobs(filters).subscribe({
  
    next: (data: any) => { 
      if (data && data.results) {
        this.jobList = data.results.filter((job: any) => {
          
          return job.name.toLowerCase().includes(filters.keyWord.toLowerCase());
        });
      }
      this.isLoading = false;
    },
    error: (err) => {
      console.error('API Error:', err);
      this.isLoading = false;
    }
  });
}
}