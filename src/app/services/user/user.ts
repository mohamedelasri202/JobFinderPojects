import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {

  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage())
  user$:Observable<any> = this.userSubject.asObservable();
 
  

  private getUserFromStorage(){
    const userStr =localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
    
  }
   
  setUser(user:any):void{
    localStorage.setItem('user',JSON.stringify(User));
    this.userSubject.next(user);
  }
  
  clearUser():void{
    localStorage.removeItem('user')
    this.userSubject.next(null);

  }
  

  getCurrantUser():any{
    return this.userSubject.value
  }
}
