import { Action } from "@ngrx/store";

export const LOAD_CONTACT_THREAD = "Load Contact Thread";
export const LOAD_CONTACT_THREAD_READY = "Load Contact Thread Ready";
export const ADD_CONTACT_TO_CONTACT_THREAD = "Add Contact To Contact Thread";
export const ADD_CONTACT_TO_CONTACT_THREAD_READY =
  "Add Contact To Contact Thread Ready";
export const ADD_NEW_MESSAGE_TO_CONTACT_THREAD =
  "Add New Message To Contact Thread Success";

export class LoadContactThread implements Action {
  readonly type = LOAD_CONTACT_THREAD;
  constructor(public payload: any) {}
}
export class LoadContactThreadReady implements Action {
  readonly type = LOAD_CONTACT_THREAD_READY;
  constructor(public payload: any) {}
}
export class AddContactToContactThread implements Action {
  readonly type = ADD_CONTACT_TO_CONTACT_THREAD;
  constructor(public payload: any) {}
}
export class AddContactToContactThreadReady implements Action {
  readonly type = ADD_CONTACT_TO_CONTACT_THREAD_READY;
  constructor(public payload: any) {}
}
export class AddNewMessageToContactThread implements Action {
  readonly type = ADD_NEW_MESSAGE_TO_CONTACT_THREAD;
  constructor(public payload: any) {}
}

export type ContactThreadAction =
  | LoadContactThread
  | LoadContactThreadReady
  | AddContactToContactThread
  | AddContactToContactThreadReady
  | AddNewMessageToContactThread;
