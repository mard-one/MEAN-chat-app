import { ActionReducerMap } from "@ngrx/store";

import * as fromMessageThread from "./messageThread.reducer";
import * as fromMessage from "./message.reducer";
import * as fromContactThread from "./contactThread.reducer";
import * as fromUser from "./user.reducer"

export interface ChatState {
  messageThread: fromMessageThread.MessageThreadState;
  message: fromMessage.MessageState;
  contactThread: fromContactThread.ContactThreadState;
  user: fromUser.UserState
}

export const reducers: ActionReducerMap<ChatState> = {
  messageThread: fromMessageThread.messageThreadReducer,
  message: fromMessage.messageReducer,
  contactThread: fromContactThread.contactThreadReducer,
  user: fromUser.userReducer
};


