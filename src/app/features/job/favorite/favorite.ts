import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { favoriteService } from '../../../services/favorite/favorite';
import { favorite } from '../../../modules/job/favorite';// Your interface

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ReactiveFormsModule],
    templateUrl: './favorite.html',
})
export class Favorite implements OnInit {
  @Input({ required: true }) jobData!: any; 
  favortiteForm!: FormGroup;
  
  private fb = inject(FormBuilder);
  private favService = inject(favoriteService);

  ngOnInit(): void {
    
    this.favortiteForm = this.fb.group({
      userId: ['user_id_from_auth'], 
      offerId: [this.jobData.id?.toString()],
      apiSource: ['TheMuse'],
      title: [this.jobData.name],
      company: [this.jobData.company?.name],
      location: [this.jobData.locations?.[0]?.name || 'Remote'],
      url: [this.jobData.refs?.landing_page],
      status: ['pending'],
      notes: [''],
      dateAdded: [new Date().toISOString()] 
    });
  }

  onSubmit() {
    if (this.favortiteForm.valid) {
    
      const finalData: favorite = this.favortiteForm.value;
      
      this.favService.addFavorite(finalData).subscribe({
        next: (res) => alert('Added to favorites!'),
        error: (err) => console.error('Error saving favorite:', err)
      });
    }
  }
}