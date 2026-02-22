import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Follow } from '../../modules/job/follow.'; 
@Injectable({
  providedIn: 'root',
})
export class FollowService {
  
  private apiUrl = environment.apiUrl; 
  private http = inject(HttpClient);

  
  followJobOffer(followData: Follow): Observable<Follow> {
    return this.http.post<Follow>(`${this.apiUrl}/follows`, followData);
  }

  getFollows(): Observable<Follow[]> {
   
    return this.http.get<Follow[]>(`${this.apiUrl}/follows`);
  }

  updateFollowStatus(follow: Follow): Observable<Follow> {
   
    return this.http.patch<Follow>(`${this.apiUrl}/follows/${follow.id}`, {
      status: follow.status 
    });
  }
  deleteFollow(id: string | number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/follows/${id}`);
}
}