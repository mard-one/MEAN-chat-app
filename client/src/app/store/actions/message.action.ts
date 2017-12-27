import { Action } from "@ngrx/store";

// export const ADD_NEW_MESSAGE = "Add New Message";
export const ADD_NEW_MESSAGE_FAIL = "Add New Message Fail";
export const ADD_NEW_MESSAGE_SUCCESS = "Add New Message Success";
export const CHOOSE_MESSAGE_FROM_MESSAGE_THREAD =
  "Choose Message From Message Thread";
export const ADD_NEW_MESSAGE_TO_MESSAGES = "Add New Message To Messages";

export class AddNewMessageFail implements Action {
  readonly type = ADD_NEW_MESSAGE_FAIL;
  constructor(public payload: any) {}
}
export class AddNewMessageSuccess implements Action {
  readonly type = ADD_NEW_MESSAGE_SUCCESS;
  constructor(public payload: any) {}
}
export class ChooseMessageFromMessageThread implements Action {
  readonly type = CHOOSE_MESSAGE_FROM_MESSAGE_THREAD;
  constructor(public payload: any) {}
}
export class AddNewMessageToMessages implements Action {
  readonly type = ADD_NEW_MESSAGE_TO_MESSAGES;
  constructor(public payload: any) {}
}

export type MessageAction =
  | AddNewMessageFail
  | AddNewMessageSuccess
  | ChooseMessageFromMessageThread
  | AddNewMessageToMessages;
