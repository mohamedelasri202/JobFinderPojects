import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { MuseResponse } from '../../modules/job/job-module';
import { HttpParams } from '@angular/common/http';

export interface jobFilters {
  keyWord?:string,
  location?:string,
  category?:string,
  level?:string,
  page:number

}

@Injectable({
  providedIn: 'root',
})
export class Job {

  private http = inject(HttpClient)
  private readonly Muse_Api = 'https://www.themuse.com/api/public/jobs'


  getAllJobs(filters:jobFilters):Observable<MuseResponse>{

   let params = new HttpParams().set('page',filters.page.toString())
   if(filters.location) params = params.set('location',filters.location)
   if(filters.category)params =params.set('category',filters.category)
    if(filters.level) params =params.set('level',filters.level)
      if(filters.keyWord) params = params.set('keyword' ,filters.keyWord)

    return this.http.get<MuseResponse>(this.Muse_Api,{params})

  }

  
}
