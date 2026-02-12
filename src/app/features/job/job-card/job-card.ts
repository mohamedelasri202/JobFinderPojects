import { Component, DoCheck, Input, input } from '@angular/core';
import { Job } from '../../../modules/job/job-module';
import { required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { Favorite } from '../favorite/favorite';
@Component({
  selector: 'app-job-card',
  imports: [CommonModule,Favorite],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard implements DoCheck {

  @Input({required:true}) job!:Job

  isAuth = false;
  ngDoCheck() {
    this.isAuth =!!localStorage.getItem('user');
  }
}
