import { Action } from "@ngrx/store";

export const LOAD_MESSAGE_THREAD = "Load Message Thread";
export const LOAD_MESSAGE_THREAD_FAIL = "Load Message Thread Fail";
export const LOAD_MESSAGE_THREAD_SUCCESS = "Load Message Thread Success";
export const ADD_NEW_MESSAGE_TO_MESSAGE_THREAD =
  "Add New Message To Message Thread";

export class LoadMessageThread implements Action {
  readonly type = LOAD_MESSAGE_THREAD;
}
export class LoadMessageThreadFail implements Action {
  readonly type = LOAD_MESSAGE_THREAD_FAIL;
  constructor(public payload: any) {}
}
export class LoadMessageThreadSuccess implements Action {
  readonly type = LOAD_MESSAGE_THREAD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddNewMessageToMessageThread implements Action {
  readonly type = ADD_NEW_MESSAGE_TO_MESSAGE_THREAD;
  constructor(public payload: any) {}
}

export type MessageThreadAction =
  | LoadMessageThread
  | LoadMessageThreadFail
  | LoadMessageThreadSuccess
  | AddNewMessageToMessageThread;
