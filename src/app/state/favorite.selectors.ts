import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite/favorite.reducer';


export const selectFavoriteState = createFeatureSelector<FavoriteState>('favorites');


export const selectSavedOfferIds = createSelector(
  selectFavoriteState,
  (state) => state.savedOfferIds
);


export const isJobFavorited = (offerId: string) => createSelector(
  selectSavedOfferIds,
  (ids) => ids.includes(offerId)
);