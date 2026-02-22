import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);  
  private apiUrl = 'http://localhost:3000';

  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  
  
  user$ = this.userSubject.asObservable();

  private getUserFromStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  
  getCurrentUser(): any {
    return this.userSubject.value;
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  } 

  login(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      tap(users => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
      })
    );
  }

  updateProfile(id: string | number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${id}`, data).pipe(
      tap(updatedUser => {
       
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.userSubject.next(updatedUser); 
      })
    );
  }

  logOut() {
    localStorage.removeItem('user');
    this.userSubject.next(null); 
  }
}