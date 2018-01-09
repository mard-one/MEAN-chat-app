import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { catchError, switchMap, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as messageThreadActions from "../actions/messageThread.action";
import * as groupActions from "../actions/group.action";
import * as fromService from "../../services";
import { mergeMap } from "rxjs/operators/mergeMap";

@Injectable()
export class GroupEffects {
  constructor(private actions$: Actions) {}

  @Effect({ dispatch: true })
  newGroup$ = this.actions$
    .ofType(groupActions.NEW_GROUP)
    .map((action: any) => {
      console.log("new group effect action", action.payload);
      return new messageThreadActions.AddNewGroupToMessageThread(
        action.payload
      );
    });
  @Effect({ dispatch: true })
  loadGroup$ = this.actions$
    .ofType(groupActions.LOAD_GROUP)
    .map((action: any) => {
      console.log("load group effect action", action.payload);
      return new messageThreadActions.AddNewGroupToMessageThread(
        action.payload
      );
    });
}
