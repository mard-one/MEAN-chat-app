import { Action } from "@ngrx/store";

export const LOAD_MESSAGE_THREAD = "Load Message Thread";
export const LOAD_MESSAGE_THREAD_FAIL = "Load Message Thread Fail";
export const LOAD_MESSAGE_THREAD_SUCCESS = "Load Message Thread Success";

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

export type MessageThreadAction =
  | LoadMessageThread
  | LoadMessageThreadFail
  | LoadMessageThreadSuccess;
