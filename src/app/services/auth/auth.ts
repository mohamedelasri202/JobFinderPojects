import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);  
  private apiUrl = 'http://localhost:3000'













  register(userData:any):Observable<any>{
    console.log("its in the service")
    return this.http.post(`${this.apiUrl}/users`,userData);
  } 

  login(email:string):Observable<any>{
    console.log("its here")
    return this.http.get(`${this.apiUrl}/users?email=${email}`)
  }


}
