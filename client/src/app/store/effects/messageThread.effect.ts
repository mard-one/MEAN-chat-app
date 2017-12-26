import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { catchError, switchMap, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as messageThreadActions from "../actions/messageThread.action";
import * as fromService from "../../services";

@Injectable()
export class MessageThreadEffects {
  constructor(
    private actions$: Actions,
    private threadService: fromService.ThreadService
  ) {}

  @Effect({ dispatch: true })
  loadMessageThread$ = this.actions$
    .ofType(messageThreadActions.LOAD_MESSAGE_THREAD)
    .pipe(
      switchMap((action: any) => {
        // console.log(action.payload)
        return this.threadService
          .getAllMessageThread()
          .pipe(
            map(
              user =>
                new messageThreadActions.LoadMessageThreadSuccess(user)
            )
          );
      })
    );
}
