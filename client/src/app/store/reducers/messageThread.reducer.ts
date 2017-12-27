import { MessageThread } from "../../models/messageThread.model";

import * as fromMessageThread from "../actions";

export interface MessageThreadState {
  data: {
    messageThread: MessageThread[];
  };
  loading: boolean;
  loaded: boolean;
}

export const initialState: MessageThreadState = {
  data: null,
  loading: false,
  loaded: false
};

export function messageThreadReducer(
  state = initialState,
  action: fromMessageThread.MessageThreadAction
): MessageThreadState {
  switch (action.type) {
    case fromMessageThread.LOAD_MESSAGE_THREAD: {
      return { ...state, loading: true };
    }
    case fromMessageThread.LOAD_MESSAGE_THREAD_SUCCESS: {
      const data = action.payload;
      return { ...state, loading: false, loaded: true, data };
    }
    case fromMessageThread.LOAD_MESSAGE_THREAD_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromMessageThread.ADD_NEW_MESSAGE_TO_MESSAGE_THREAD: {
      const filteredStateWithoutNewMessageThread = [
        ...state.data.messageThread.filter(thread => {
          return action.payload.messageThread._id != thread._id;
        })
      ];
      console.log("message thread payload", action.payload);
      console.log("message thread state", state);
      console.log(
        "filtered message thread state",
        filteredStateWithoutNewMessageThread
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        data: {
          messageThread: [
            ...filteredStateWithoutNewMessageThread,
            action.payload.messageThread
          ]
        }
      };
    }
  }
  return state;
}

export const getMessageThread = (state: MessageThreadState) => state.data;
export const getMessageThreadLoaded = (state: MessageThreadState) =>
  state.loaded;
export const getMessageThreadLoading = (state: MessageThreadState) =>
  state.loading;
