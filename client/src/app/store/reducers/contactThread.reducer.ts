import { ContactThread } from "../../models/contactThread.model";

import * as fromContactThread from "../actions";

export interface ContactThreadState {
  data: ContactThread[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: ContactThreadState = {
  data: [null],
  loading: false,
  loaded: false
};

export function contactThreadReducer(
  state = initialState,
  action: fromContactThread.ContactThreadAction
): ContactThreadState {
  switch (action.type) {
    case fromContactThread.LOAD_CONTACT_THREAD: {
      return { ...state, loading: true };
    }
    case fromContactThread.LOAD_CONTACT_THREAD_SUCCESS: {
      const data = action.payload;
      return { ...state, loading: false, loaded: true, data };
    }
    case fromContactThread.LOAD_CONTACT_THREAD_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
  }
  return state;
}

export const getContactThread = (state: ContactThreadState) => state.data;
export const getContactThreadLoaded = (state: ContactThreadState) =>
  state.loaded;
export const getContactThreadLoading = (state: ContactThreadState) =>
  state.loading;
