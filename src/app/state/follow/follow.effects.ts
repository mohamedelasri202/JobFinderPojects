import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FollowService } from "../../services/follow/follow-service";
import * as FollowActions from './follow.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class FollowEffects {
  private actions$ = inject(Actions);
  private followService = inject(FollowService);

  addFollow$ = createEffect(() =>
    this.actions$.pipe(
     
      ofType(FollowActions.addFollow),  
      mergeMap(({ followData }) =>
        this.followService.followJobOffer(followData).pipe(     
          map((response) => FollowActions.addFollowSuccess({ followData: response })),
          catchError((error) => of(FollowActions.addFollowFailled({ error })))
        )
      )
    )
  );
}