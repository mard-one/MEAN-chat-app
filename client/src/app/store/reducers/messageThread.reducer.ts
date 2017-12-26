import { MessageThread } from "../../models/messageThread.model";

import * as fromMessageThread from "../actions";

export interface MessageThreadState {
  data: MessageThread[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: MessageThreadState = {
  data: [null],
  loading: false,
  loaded: false
};

export function messageThreadReducer(
  state = initialState,
  action: fromMessageThread.MessageThreadAction
): MessageThreadState{
    switch (action.type) {
      case fromMessageThread.LOAD_MESSAGE_THREAD: {
        return { ...state, loading: true };
      }
      case fromMessageThread.LOAD_MESSAGE_THREAD_SUCCESS: {
        const data = action.payload
        console.log("reducer state", state)
        console.log("reducer data", data);
        return { ...state, loading: false, loaded: true, data };
      }
      case fromMessageThread.LOAD_MESSAGE_THREAD_FAIL: {
        return { ...state, loading: false, loaded: false };
      }
    }
    return state
}

export const getMessageThread = (state: MessageThreadState) => state.data;
export const getMessageThreadLoaded = (state: MessageThreadState) => state.loaded;
export const getMessageThreadLoading = (state: MessageThreadState) => state.loading;
