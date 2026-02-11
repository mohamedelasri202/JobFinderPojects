import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      
      
      // add other pages that should show header + search:
      // { path: 'offers', loadComponent: ... },
      // { path: 'favorites', loadComponent: ... },
    ]
  },


  {
    path: 'login',
    canActivate:[guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'inscription',
    canActivate:[guestGuard],
    loadComponent: () =>
      import('./features/auth/inscription/inscription').then(m => m.Inscription)
  },

  { path: '**', redirectTo: '' }
];
