import { ActionReducerMap } from "@ngrx/store";

import * as fromMessageThread from "./messageThread.reducer";
import * as fromMessage from "./message.reducer";
import * as fromContactThread from "./contactThread.reducer";

export interface ChatState {
  messageThread: fromMessageThread.MessageThreadState;
  message: fromMessage.MessageState;
  contactThread: fromContactThread.ContactThreadState;
}

export const reducers: ActionReducerMap<ChatState> = {
  messageThread: fromMessageThread.messageThreadReducer,
  message: fromMessage.messageReducer,
  contactThread: fromContactThread.contactThreadReducer
};


