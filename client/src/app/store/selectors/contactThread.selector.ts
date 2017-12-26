import { createSelector } from '@ngrx/store'

import * as fromReducer from "../reducers"
import * as fromContactThread from "../reducers/contactThread.reducer"

export const chooseContactThread = (state: fromReducer.ChatState) => state.contactThread;
export const getContactThreadState = createSelector(
  chooseContactThread,
  (contactThread: fromContactThread.ContactThreadState) => contactThread
);
export const getContactThread = createSelector(
  chooseContactThread,
  fromContactThread.getContactThread
);
export const getContactThreadLoaded = createSelector(
  chooseContactThread,
  fromContactThread.getContactThreadLoaded
);
export const getContactThreadLoading = createSelector(
  chooseContactThread,
  fromContactThread.getContactThreadLoading
);
