import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: '', 
        loadComponent: () => import('./shared/components/search/search').then(m => m.Search)
      },
      {
        path: 'favorites',
        canActivate: [authGuard],
        loadComponent: () => import('./components/favorite-list/favorite-list').then(m => m.FavoriteList)
      },
      {
        path: 'follows',
        canActivate: [authGuard],
        loadComponent: () => import('./components/follow-list/follow-list').then(m => m.FollowList)
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./components/user-profile/user-profile').then(m => m.UserProfile)
      }
    ]
  }
,
  {
    path: 'login',
    canActivate: [guestGuard], 
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'inscription',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/inscription/inscription').then(m => m.Inscription)
  },
  { path: '**', redirectTo: '' }
];