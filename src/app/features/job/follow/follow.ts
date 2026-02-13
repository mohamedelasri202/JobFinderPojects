import { TmplAstForLoopBlockEmpty } from '@angular/compiler';
import { Component, inject, Input, input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FollowService } from '../../../services/follow/follow-service';


@Component({
  selector: 'app-follow',
  imports: [],
  templateUrl: './follow.html',
  styleUrl: './follow.css',
})
export class Follow {
  @Input({required:true})jobData!:any
  followForm!:FormGroup

  private fb = inject(FormBuilder)
  private followService = inject(FollowService)

  followAjobOffer(job){


  }



}
