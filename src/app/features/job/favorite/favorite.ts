import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { favoriteService } from '../../../services/favorite/favorite';
import { favorite } from '../../../modules/job/favorite';// Your interface

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="favortiteForm" (ngSubmit)="onSubmit()">
      <button type="submit" 
        class="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded text-sm font-bold hover:bg-blue-50 transition">
        Save
      </button>
    </form>
  `
})
export class Favorite implements OnInit {
  @Input({ required: true }) jobData!: any; 
  favortiteForm!: FormGroup;
  
  private fb = inject(FormBuilder);
  private favService = inject(favoriteService);

  ngOnInit(): void {
    // 1. Map the job data to match your 'favorite' interface exactly
    this.favortiteForm = this.fb.group({
      userId: ['user_id_from_auth'], // Logic to get current user
      offerId: [this.jobData.id?.toString()],
      apiSource: ['TheMuse'],
      title: [this.jobData.name],
      company: [this.jobData.company?.name],
      location: [this.jobData.locations?.[0]?.name || 'Remote'],
      url: [this.jobData.refs?.landing_page],
      status: ['pending'],
      notes: [''],
      dateAdded: [new Date().toISOString()] // Added this to match interface
    });
  }

  onSubmit() {
    if (this.favortiteForm.valid) {
      // Cast the value to your 'favorite' interface
      const finalData: favorite = this.favortiteForm.value;
      
      this.favService.addFavorite(finalData).subscribe({
        next: (res) => alert('Added to favorites!'),
        error: (err) => console.error('Error saving favorite:', err)
      });
    }
  }
}