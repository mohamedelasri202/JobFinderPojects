import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth/auth'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private authService = inject(Auth);
  private router = inject(Router);


  user$ = this.authService.user$;

  logOut() {
   
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}