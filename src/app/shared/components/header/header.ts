import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { User } from '../../../services/user/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private userService = inject(User)

  user:any | null;
  constructor(private router :Router){}
 

  ngOnInit(): void {
    this.userService.user$.subscribe(user =>{
this.user =user;
    });


  }

  logOut(){
   this.userService.clearUser()
    
    this.router.navigate(['/login'])
  }

  
}
