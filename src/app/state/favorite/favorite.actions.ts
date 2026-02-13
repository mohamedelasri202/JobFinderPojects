import { createAction,props } from "@ngrx/store";
import { favorite } from "../../modules/job/favorite";


export const addFavorite  = createAction('[Favorite] add favorite' ,props<{fav:favorite}>());

export const addFavoriteSuccess = createAction('[Favorite] add favorite succes',props<{fav:favorite}>());

export const addFavoriteFailled = createAction('[Favorite] add favorite failled',props<{error:any}>());
