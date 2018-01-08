import { Action } from "@ngrx/store";

export const LOAD_MESSAGE_THREAD = "Load Message Thread";
export const LOAD_MESSAGE_THREAD_FAIL = "Load Message Thread Fail";
export const LOAD_MESSAGE_THREAD_SUCCESS = "Load Message Thread Success";
export const ADD_NEW_MESSAGE_TO_MESSAGE_THREAD =
  "Add New Message To Message Thread";
export const COUNT_UNREAD_MESSAGE_IN_MESSAGE_THREAD =
  "Count Unread Message In Message Thread";
export const ADD_UNREAD_MESSAGE_TO_MESSAGE_THREAD =
  "Add Unread Message To Message Thread";
export const REMOVE_UNREAD_MESSAGE_FROM_MESSAGE_THREAD =
  "Remove Unread Message From Message Thread";
export const ADD_NEW_GROUP_TO_MESSAGE_THREAD =
  "Add New Group To Message Thread";

export class LoadMessageThread implements Action {
  readonly type = LOAD_MESSAGE_THREAD;
  constructor(public payload: any) {}
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
export class CountUnreadMessageInMessageThread implements Action {
  readonly type = COUNT_UNREAD_MESSAGE_IN_MESSAGE_THREAD;
  constructor(public payload: any) {}
}
export class AddUnreadMessageToMessageThread implements Action {
  readonly type = ADD_UNREAD_MESSAGE_TO_MESSAGE_THREAD;
  constructor(public payload: any) {}
}
export class RemoveUnreadMessageFromMessageThread implements Action {
  readonly type = REMOVE_UNREAD_MESSAGE_FROM_MESSAGE_THREAD;
  constructor(public payload: any) {}
}
export class AddNewGroupToMessageThread implements Action {
  readonly type = ADD_NEW_GROUP_TO_MESSAGE_THREAD;
  constructor(public payload: any) {}
}

export type MessageThreadAction =
  | LoadMessageThread
  | LoadMessageThreadFail
  | LoadMessageThreadSuccess
  | AddNewMessageToMessageThread
  | CountUnreadMessageInMessageThread
  | AddUnreadMessageToMessageThread
  | RemoveUnreadMessageFromMessageThread
  | AddNewGroupToMessageThread;
