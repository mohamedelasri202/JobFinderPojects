import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobResponse } from '../../modules/job/job-module';

@Injectable({ providedIn: 'root' })
export class JobService {
  private _httpClient = inject(HttpClient);
  private readonly API_THEMUSE = 'https://www.themuse.com/api/public'; 

  getAllJobs(page?: number, keyword?: string, location?: string): Observable<JobResponse> {
    let params = new HttpParams();

    if (page !== undefined) {
      params = params.set('page', page.toString());
    }


    if (keyword) {
      params = params.set('keyword', keyword);
    }

    if (location) {
      params = params.set('location', location);
    }

    return this._httpClient.get<JobResponse>(`${this.API_THEMUSE}/jobs`, { params });
  }
}