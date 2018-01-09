import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { catchError, switchMap, map, mergeMap } from "rxjs/operators";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";

import * as fromActions from "../actions";

import * as fromService from "../../services";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: fromService.UserService
  ) {}

  @Effect({ dispatch: true })
  loadCurrentUser$ = this.actions$.ofType(fromActions.LOAD_CURRENT_USER).pipe(
    switchMap(() => {
      return this.userService.currentUser().pipe(
        map(user => {
          return new fromActions.LoadCurrentUserReady(user);
        })
      );
    })
  );
  @Effect({ dispatch: true })
  loadCurrentUserReady$ = this.actions$
    .ofType(fromActions.LOAD_CURRENT_USER_READY)
    .pipe(
      switchMap((action: any) => {
        return [
          new fromActions.LoadGroup(action.payload),
          new fromActions.LoadMessageThread(action.payload),
          new fromActions.LoadContactThread(action.payload)
        ];
      })
    );
}
