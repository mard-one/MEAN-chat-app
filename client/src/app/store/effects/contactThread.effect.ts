import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { catchError, switchMap, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as contactThreadActions from "../actions/contactThread.action";
import * as fromService from "../../services";

@Injectable()
export class ContactThreadEffects {
  constructor(
    private actions$: Actions,
    private contactService: fromService.ContactService
  ) {}

  @Effect({ dispatch: true })
  loadContactThread$ = this.actions$
    .ofType(contactThreadActions.LOAD_CONTACT_THREAD)
    .pipe(
      switchMap((action: any) => {
        return this.contactService
          .getAllContacts()
          .pipe(
            map(user => new contactThreadActions.LoadContactThreadSuccess(user))
          );
      })
    );

  @Effect({ dispatch: true })
  addContactToContactThread$ = this.actions$
    .ofType(contactThreadActions.ADD_CONTACT_TO_CONTACT_THREAD)
    .pipe(
      switchMap((action: any) => {
        return this.contactService
          .addContact(action.payload)
          .pipe(
            map(user => new contactThreadActions.AddContactToContactThread(user))
          );
      })
    );
}
