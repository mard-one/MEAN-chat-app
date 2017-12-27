import { Message } from "../../models/message.model";

import * as fromMessage from "../actions";

export interface MessageState {
  data: Message[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: MessageState = {
  data: [],
  loading: false,
  loaded: false
};

export function messageReducer(
  state = initialState,
  action: fromMessage.MessageAction
): MessageState {
  switch (action.type) {
    case fromMessage.ADD_NEW_MESSAGE_SUCCESS: {
      return { ...state, loading: false, loaded: true };
    }
    case fromMessage.ADD_NEW_MESSAGE_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromMessage.CHOOSE_MESSAGE_FROM_MESSAGE_THREAD: {
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [...action.payload.messages]
      };
    }
    case fromMessage.ADD_NEW_MESSAGE_TO_MESSAGES: {
      console.log("new message payload", action.payload);
      console.log("new message state", state);
      return { ...state, data: [...state.data, action.payload.message] };
    }
  }
  return state;
}

export const getMessage = (state: MessageState) => state.data;
export const getMessageLoaded = (state: MessageState) => state.loaded;
export const getMessageLoading = (state: MessageState) => state.loading;
