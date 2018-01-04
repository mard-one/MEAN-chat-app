import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { catchError, switchMap, map, mergeMap } from "rxjs/operators";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";

import * as userActions from "../actions/user.action";
import * as messageThreadActions from "../actions/messageThread.action"
import * as contactThreadActions from "../actions/contactThread.action"
import * as fromService from "../../services";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: fromService.UserService
  ) {}

  @Effect({ dispatch: true })
  loadCurrentUser$ = this.actions$.ofType(userActions.LOAD_CURRENT_USER).pipe(
    switchMap(() => {
      return this.userService.currentUser().pipe(
        map(user => {
          return new userActions.LoadCurrentUserReady(user);
        })
      );
    })
  );
  @Effect({ dispatch: true })
  loadCurrentUserReady$ = this.actions$.ofType(userActions.LOAD_CURRENT_USER_READY).pipe(
    switchMap((action: any) => {
      return [
        new messageThreadActions.LoadMessageThread(action.payload),
        new contactThreadActions.LoadContactThread(action.payload)
      ]
    })
  );
}
