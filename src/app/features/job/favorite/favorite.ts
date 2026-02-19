import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store'; 
import { Observable } from 'rxjs';
import { favorite } from '../../../modules/job/favorite';
import * as FavActions from '../../../state/favorite/favorite.actions'
import { isJobFavorited } from '../../../state/favorite/favorite.selectors'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './favorite.html',
})
export class Favorite implements OnInit {
  @Input({ required: true }) jobData!: any; 
  favortiteForm!: FormGroup;
  
 
  isFavorited$!: Observable<boolean>;

  private fb = inject(FormBuilder);
  private store = inject(Store); 
  ngOnInit(): void {

    this.isFavorited$ = this.store.select(isJobFavorited(this.jobData.id.toString()));

    this.favortiteForm = this.fb.group({
      userId: ['user_id_from_auth'], 
      offerId: [this.jobData.id?.toString()],
      title: [this.jobData.name],
      company: [this.jobData.company?.name],
      location: [this.jobData.locations?.[0]?.name || 'Remote'],
     
    });
  }

  onSubmit() {
    if (this.favortiteForm.valid) {
      const finalData: favorite = this.favortiteForm.value;
    
      this.store.dispatch(FavActions.addFavorite({ fav: finalData }));
    }
  }
}