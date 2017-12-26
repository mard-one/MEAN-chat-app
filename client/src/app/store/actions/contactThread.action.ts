import { Action } from "@ngrx/store";

export const LOAD_CONTACT_THREAD = "Load Contact Thread";
export const LOAD_CONTACT_THREAD_FAIL = "Load Contact Thread Fail";
export const LOAD_CONTACT_THREAD_SUCCESS = "Load Contact Thread Success";
export const ADD_CONTACT_TO_CONTACT_THREAD = "Add Contact To Contact Thread";
export const ADD_CONTACT_TO_CONTACT_THREAD_FAIL =
  "Add Contact To Contact Thread Fail";
export const ADD_CONTACT_TO_CONTACT_THREAD_SUCCESS =
  "Add Contact To Contact Thread Success";

export class LoadContactThread implements Action {
  readonly type = LOAD_CONTACT_THREAD;
}
export class LoadContactThreadFail implements Action {
  readonly type = LOAD_CONTACT_THREAD_FAIL;
  constructor(public payload: any) {}
}
export class LoadContactThreadSuccess implements Action {
  readonly type = LOAD_CONTACT_THREAD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddContactToContactThread implements Action {
  readonly type = ADD_CONTACT_TO_CONTACT_THREAD;
  constructor(public payload: any) {}
}
export class AddContactToContactThreadFail implements Action {
  readonly type = ADD_CONTACT_TO_CONTACT_THREAD_FAIL;
  constructor(public payload: any) {}
}
export class AddContactToContactThreadSuccess implements Action {
  readonly type = ADD_CONTACT_TO_CONTACT_THREAD_SUCCESS;
  constructor(public payload: any) {}
}

export type ContactThreadAction =
  | LoadContactThread
  | LoadContactThreadFail
  | LoadContactThreadSuccess
  | AddContactToContactThread
  | AddContactToContactThreadFail
  | AddContactToContactThreadSuccess;
