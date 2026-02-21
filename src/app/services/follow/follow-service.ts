import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Follow } from '../../modules/job/follow.'; 

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private apiUrl = `${environment.apiUrl}/follows`; 
  private http = inject(HttpClient);


  followJobOffer(followData: Follow): Observable<Follow> {
    return this.http.post<Follow>(this.apiUrl, followData);
  }
}