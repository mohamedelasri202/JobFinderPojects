import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FollowService {

  private apiUrl = environment.apiUrl
  private http =inject(HttpClient)

  followJobOffer(){
    
  }



  
}
