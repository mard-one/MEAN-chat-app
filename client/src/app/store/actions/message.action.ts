import { Action } from "@ngrx/store";

// export const ADD_NEW_MESSAGE = "Add New Message";
export const ADD_NEW_MESSAGE_FAIL = "Add New Message Fail";
export const ADD_NEW_MESSAGE_SUCCESS = "Add New Message Success";

// export class AddNewMessage implements Action {
//   readonly type = ADD_NEW_MESSAGE;
// }
export class AddNewMessageFail implements Action {
  readonly type = ADD_NEW_MESSAGE_FAIL;
  constructor(public payload: any) {}
}
export class AddNewMessageSuccess implements Action {
  readonly type = ADD_NEW_MESSAGE_SUCCESS;
  constructor(public payload: any) {}
}

export type MessageAction =
  // | AddNewMessage
  | AddNewMessageFail
  | AddNewMessageSuccess;
