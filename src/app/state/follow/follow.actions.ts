import { createAction, props } from "@ngrx/store";
import { Follow } from "../../modules/job/follow.";


export const addFollow = createAction(
    '[Follow] add follow', 
    props<{ followData: Follow }>()
);


export const addFollowSuccess = createAction(
    '[Follow] add follow success', 
    props<{ followData: Follow }>()
);


export const addFollowFailled = createAction(
    '[Follow] add follow failled', 
    props<{ error: any }>()
);