import { Message } from "../../models/message.model";

import * as fromMessage from "../actions";

export interface MessageState {
  data: Message[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: MessageState = {
  data: [null],
  loading: false,
  loaded: false
};

export function messageReducer(
  state = initialState,
  action: fromMessage.MessageAction
): MessageState{
    switch (action.type) {
      // case fromMessage.ADD_NEW_MESSAGE: {
      //   return { ...state, loading: true };
      // }
      case fromMessage.ADD_NEW_MESSAGE_SUCCESS: {
        const data = action.payload
        return { ...state, loading: false, loaded: true, data };
      }
      case fromMessage.ADD_NEW_MESSAGE_FAIL: {
        return { ...state, loading: false, loaded: false };
      }
    }
    return state
}

export const getMessage = (state: MessageState) => state.data;
export const getMessageLoaded = (state: MessageState) => state.loaded;
export const getMessageLoading = (state: MessageState) => state.loading;
