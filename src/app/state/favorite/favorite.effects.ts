import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { favoriteService } from "../../services/favorite/favorite";
import * as FavAction from './favorite.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class FavoritEffect { 
    private actions$ = inject(Actions);
    private favService = inject(favoriteService);

    addFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavAction.addFavorite),
            mergeMap(({ fav }) =>
                this.favService.addFavorite(fav).pipe(
                    
                    map((response) => FavAction.addFavoriteSuccess({ fav: response })),
      
                    catchError((error) => of(FavAction.addFavoriteFailled({ error })))
                )
            )
        )
    );
}