import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { favoriteReducer } from './state/favorite/favorite.reducer'; 
import { FavoritEffect } from './state/favorite/favorite.effects'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    
  
    provideStore({ favorites: favoriteReducer }),


    provideEffects([FavoritEffect])
  ]
};
