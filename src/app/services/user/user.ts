import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());

  user$: Observable<any> = this.userSubject.asObservable();

  private getUserFromStorage(): any {
    const userStr = localStorage.getItem('user');
  
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null;
    }
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  setUser(user: any): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }
}