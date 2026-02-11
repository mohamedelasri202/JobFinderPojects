import { Component, Input, input } from '@angular/core';
import { Job } from '../../../modules/job/job-module';
import { required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {

  @Input({required:true}) job!:Job

}
