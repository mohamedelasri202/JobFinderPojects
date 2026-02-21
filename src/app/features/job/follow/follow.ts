import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FollowActions from '../../../state/follow/follow.actions';
import { isJobFollowed } from '../../../state/follow/follow.selectors';

@Component({
  selector: 'app-follow',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './follow.html',
  styleUrl: './follow.css',
  standalone: true,
 
  host: { 'class': 'flex-1' }
})
export class Follow implements OnInit {
  @Input({ required: true }) jobData!: any;
  followForm!: FormGroup;
  isFollowed$!: Observable<boolean>;

  private fb = inject(FormBuilder);
  private store = inject(Store);

ngOnInit(): void {
  
  this.isFollowed$ = this.store.select(isJobFollowed(this.jobData.id.toString()));

 
  this.followForm = this.fb.group({
    userId: [2], 
    offerId: [this.jobData.id?.toString()],
    apiSource: ['adzuna'], 
    title: [this.jobData.name],
    company: [this.jobData.company?.name],
    location: [this.jobData.locations?.[0]?.name || 'Unknown'],
    url: [this.jobData.refs?.landing_page],
    status: ['en_attente'], 
    notes: ['Followed from search'], 
    dateAdded: [new Date().toISOString()] 
  });
}
  onSubmit() {
    if (this.followForm.valid) {
     
      this.store.dispatch(FollowActions.addFollow({ followData: this.followForm.value }));
    }
  }
}