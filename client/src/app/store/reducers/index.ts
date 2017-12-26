import { ActionReducerMap } from "@ngrx/store";

import * as fromMessageThread from "./messageThread.reducer";
import * as fromContactThread from "./contactThread.reducer";

export interface ChatState {
  messageThread: fromMessageThread.MessageThreadState;
  contactThread: fromContactThread.ContactThreadState;
}

export const reducers: ActionReducerMap<ChatState> = {
  messageThread: fromMessageThread.messageThreadReducer,
  contactThread: fromContactThread.contactThreadReducer
};


