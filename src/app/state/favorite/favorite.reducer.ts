import { createReducer,on, State } from "@ngrx/store";
import * as FavAction from './favorite.actions'
import { fakeAsync } from "@angular/core/testing";

export interface FavoriteState {
    favorites:any[];
    savedOfferIds:string[];
    loading:boolean;
    error:any
}

export const initialState:FavoriteState = {
    favorites:[],
    savedOfferIds:[],
    loading:false,
    error:null
}
export const favoriteReducer = createReducer(
  initialState,
  on(FavAction.addFavorite, (state) => ({
    ...state,
    loading: true,
    error: null
  })),


on(FavAction.addFavoriteSuccess, (state, { fav }) => ({
    ...state,
    loading: false,
    favorites: [...state.favorites, fav],
    savedOfferIds: [...state.savedOfferIds, fav.offerId]
})),

  on(FavAction.addFavoriteFailled, (state, { error }) => ({ 
    ...state,
    loading: false,
    error: error
  }))
);