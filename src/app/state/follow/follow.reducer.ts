import { createReducer, on } from "@ngrx/store";
import * as FollowActions from './follow.actions';
import { Follow } from "../../modules/job/follow.";

export interface FollowState {
    followedItems: Follow[];
    followedOfferIds: string[]; 
    loading: boolean;
    error: any;
}

export const initialState: FollowState = {
    followedItems: [],
    followedOfferIds: [],
    loading: false,
    error: null
};

export const followReducer = createReducer(
    initialState,

   
    on(FollowActions.addFollow, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    
    on(FollowActions.addFollowSuccess, (state, { followData }) => ({
        ...state,
        loading: false,
        followedItems: [...state.followedItems, followData],
      
        followedOfferIds: [...state.followedOfferIds, followData.offerId]
    })),

  
    on(FollowActions.addFollowFailled, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    }))
);