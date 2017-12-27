import { createSelector } from "@ngrx/store";

import * as fromReducer from "../reducers";
import * as fromMessage from "../reducers/message.reducer";

export const chooseMessage = (state: fromReducer.ChatState) => state.message;

export const getMessageState = createSelector(
  chooseMessage,
  (message: fromMessage.MessageState) => message
);

export const getMessage = createSelector(chooseMessage, fromMessage.getMessage);
export const getMessageLoaded = createSelector(
  chooseMessage,
  fromMessage.getMessageLoaded
);
export const getMessageLoading = createSelector(
  chooseMessage,
  fromMessage.getMessageLoading
);
