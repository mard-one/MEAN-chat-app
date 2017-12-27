import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { catchError, switchMap, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
// import 'rxjs/add/operator/do';

import * as messageActions from "../actions/message.action";
import * as contactThreadActions from "../actions/contactThread.action"
import * as fromService from "../../services";

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    // private threadService: fromService.Service
  ) {}

  @Effect({ dispatch: true })
  loadMessage$ = this.actions$
    .ofType(messageActions.ADD_NEW_MESSAGE_SUCCESS)
    .map((action: any) => {
      console.log("message effect",action.payload)
      return new contactThreadActions.AddNewMessageToContactThread(action.payload);
    });
}
