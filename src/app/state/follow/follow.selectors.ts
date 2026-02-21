import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FollowState } from './follow.reducer';


export const selectFollowState = createFeatureSelector<FollowState>('follows');


export const selectFollowedOfferIds = createSelector(
  selectFollowState,
  (state) => state.followedOfferIds
);


export const isJobFollowed = (offerId: string) => createSelector(
  selectFollowedOfferIds,
  (ids) => ids.includes(offerId)
);