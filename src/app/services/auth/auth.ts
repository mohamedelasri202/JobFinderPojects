import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);  
  private apiUrl = 'https//:localhost:3000'













  register(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/users`,userData);
  }


}
