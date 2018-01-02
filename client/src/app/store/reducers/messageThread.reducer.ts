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
      console.log("add new message to message thread payload", action.payload);
      console.log("add new message to message thread state", state);
      if (state.data.messageThread.length) {
        const foundMessageThread = state.data.messageThread.filter(
          thread => action.payload.messageThread._id == thread._id
        );
        console.log("found message thread", foundMessageThread);
        if (foundMessageThread.length) {
          const filteredStateWithoutNewMessageThread = [
            ...state.data.messageThread.filter(thread => {
              return action.payload.messageThread._id != thread._id;
            })
          ];
          console.log(
            "filtered state without new message thread",
            filteredStateWithoutNewMessageThread
          );
          const properMessageThreadPayload = {
            messageThread: {
              ...action.payload.messageThread,
              chatBetween: action.payload.messageThread.chatBetween.filter(
                userInChat => {
                  return (
                    foundMessageThread[0].chatBetween[0]._id == userInChat._id
                  );
                }
              )
            }
          };
          console.log(
            "proper message thread payload",
            properMessageThreadPayload
          );
          return {
            ...state,
            loading: false,
            loaded: true,
            data: {
              messageThread: [
                ...filteredStateWithoutNewMessageThread,
                properMessageThreadPayload.messageThread
              ]
            }
          };
        } else {
          return {
            ...state,
            loading: false,
            loaded: true,
            data: {
              ...state.data,
              messageThread: [
                ...state.data.messageThread,
                action.payload.messageThread
              ]
            }
          };
        }
      } else {
        return {
          ...state,
          loading: false,
          loaded: true,
          data: {
            messageThread: [action.payload.messageThread]
          }
        };
      }
    }
  }
  return state;
}

export const getMessageThread = (state: MessageThreadState) => state.data;
export const getMessageThreadLoaded = (state: MessageThreadState) =>
  state.loaded;
export const getMessageThreadLoading = (state: MessageThreadState) =>
  state.loading;
