import { createSelector } from "@ngrx/store";

import * as fromReducer from "../reducers";
import * as fromMessageThread from "../reducers/messageThread.reducer"

export const chooseMessageThread = (state: fromReducer.ChatState) => state.messageThread;

export const getMessageThreadState = createSelector(
  chooseMessageThread,
  (messageThread: fromMessageThread.MessageThreadState) => messageThread
);

export const getMessageThread = createSelector(
  chooseMessageThread,
  fromMessageThread.getMessageThread
);
export const getMessageThreadLoaded = createSelector(
  chooseMessageThread,
  fromMessageThread.getMessageThreadLoaded
);
export const getMessageThreadLoading = createSelector(
  chooseMessageThread,
  fromMessageThread.getMessageThreadLoading
);
