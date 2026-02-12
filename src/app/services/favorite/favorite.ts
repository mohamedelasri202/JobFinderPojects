import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { favorite } from '../../modules/job/favorite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class favoriteService {

  private basedUrl =environment.apiUrl;
  private http = inject(HttpClient);

 addFavorite(fav: favorite): Observable<favorite> {
  
  return this.http.post<favorite>(`${this.basedUrl}/favorits`, fav);
}


  
}
