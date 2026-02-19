import { TmplAstForLoopBlockEmpty } from '@angular/compiler';
import { Component, inject, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FollowService } from '../../../services/follow/follow-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-follow',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './follow.html',
  styleUrl: './follow.css',
  standalone:true
})
export class Follow {
  @Input({required:true})jobData!:any
  followForm!:FormGroup

  private fb = inject(FormBuilder)
  private followService = inject(FollowService)
  isFollwed$!:Observable<boolean>;

  onSubmit(){

  }

  followAjobOffer(){


  }



}
