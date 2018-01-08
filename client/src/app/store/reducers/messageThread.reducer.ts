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
      console.log("load message thread payload", action.payload);
      console.log("load message thread state", state);
      return {
        ...state,
        loading: false,
        loaded: action.payload.success,
        data: { messageThread: action.payload.userData.messageThread }
      };
    }
    case fromMessageThread.ADD_NEW_MESSAGE_TO_MESSAGE_THREAD: {
      console.log("add new message to message thread payload", action.payload);
      console.log("add new message to message thread state", state);
      if (state.data.messageThread.length) {
        let foundMessageThread = state.data.messageThread.filter(
          thread => action.payload.messageThread._id == thread._id
        );
        console.log("found message thread", foundMessageThread);
        if (foundMessageThread.length) {
          let filteredStateWithoutNewMessageThread = [
            ...state.data.messageThread.filter(thread => {
              return action.payload.messageThread._id != thread._id;
            })
          ];
          console.log(
            "filtered state without new message thread",
            filteredStateWithoutNewMessageThread
          );
          // let properMessageThreadPayload = {
          //   messageThread: {
          //     ...action.payload.messageThread,
          //     chatBetween: action.payload.messageThread.chatBetween.filter(
          //       userInMessageThread => {
          //         return (
          //           foundMessageThread[0].chatBetween[0]._id == userInMessageThread._id
          //         );
          //       }
          //     )
          //   }
          // };
          // console.log(
          //   "proper message thread payload",
          //   properMessageThreadPayload
          // );
          return {
            ...state,
            loading: false,
            loaded: true,
            data: {
              messageThread: [
                ...filteredStateWithoutNewMessageThread,
                ...action.payload.messageThread
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
          data: { messageThread: [action.payload.messageThread] }
        };
      }
    }
    case fromMessageThread.COUNT_UNREAD_MESSAGE_IN_MESSAGE_THREAD: {
      console.log(
        "count unread message in message thread payload",
        action.payload
      );
      console.log("count unread message in message thread state", state);
      if (state.data.messageThread.length) {
        let messageThreadWithNumberOfUnreadMessages = state.data.messageThread.map(
          element => {
            // console.log("element", element);
            var numUnread = 0;
            element.messages.map(innerElement => {
              // console.log("inner element", innerElement);
              if (
                !innerElement.isRead &&
                innerElement.reciever == action.payload.userData._id
              ) {
                return numUnread++;
              } else {
                return numUnread;
              }
            });
            console.log("number of unread messages", numUnread);
            return { ...element, unreadMessages: numUnread };
          }
        );
        console.log("number", messageThreadWithNumberOfUnreadMessages);
        return {
          ...state,
          loaded: true,
          data: { messageThread: [...messageThreadWithNumberOfUnreadMessages] }
        };
      } else {
        return { ...state, loaded: true };
      }
    }
    case fromMessageThread.ADD_UNREAD_MESSAGE_TO_MESSAGE_THREAD: {
      console.log(
        "add unread message to message thread payload",
        action.payload
      );
      console.log("add unread message to message thread state", state);
      if (state.data.messageThread) {
        let foundMessageThread = state.data.messageThread.filter(thread => {
          // console.log("element._id", element._id);
          // console.log("action.payload.messageThread._id", action.payload.messageThread._id);
          // console.log("element._id == action.payload.messageThread._id", element._id == action.payload.messageThread._id);
          return thread._id == action.payload.messageThread._id;
        });
        console.log("found message thread", foundMessageThread);
        if (foundMessageThread.length) {
          let filteredStateWithoutNewMessageThread = [
            ...state.data.messageThread.filter(thread => {
              return action.payload.messageThread._id != thread._id;
            })
          ];
          let messageThreadWithNumberOfUnreadMessages = foundMessageThread.map(
            thread => {
              // console.log("thread", thread);
              let numUnread = 0;
              thread.messages.map(innerElement => {
                // console.log("inner thread", innerElement);
                // console.log("logic", (innerElement.isRead && innerElement.reciever == action.payload.currentUser._id));
                if (
                  !innerElement.isRead &&
                  innerElement.reciever == action.payload.currentUser._id
                ) {
                  return numUnread++;
                } else {
                  return numUnread;
                }
              });
              console.log("number of unread messages", numUnread);
              return { ...thread, unreadMessages: numUnread };
            }
          );
          console.log(
            "messageThreadWithNumberOfUnreadMessages",
            messageThreadWithNumberOfUnreadMessages
          );

          return {
            ...state,
            loaded: true,
            data: {
              messageThread: [
                ...filteredStateWithoutNewMessageThread,
                ...messageThreadWithNumberOfUnreadMessages
              ]
            }
          };
        } else {
          return { ...state, loaded: true };
        }
      } else {
        return { ...state, loaded: true };
      }
    }
    case fromMessageThread.REMOVE_UNREAD_MESSAGE_FROM_MESSAGE_THREAD: {
      console.log(
        "remove unread message from message thread payload",
        action.payload
      );
      console.log(
        "remove unread message from message thread state",
        state.data.messageThread
      );
      if (action.payload.messageThread.unreadMessages) {
        let filteredState = state.data.messageThread.map(thread => {
          // console.log("thread", thread);
          // console.log("thread._id == action.payload.messageThread._id", thread._id == action.payload.messageThread._id);
          if (thread._id == action.payload.messageThread._id) {
            return { ...thread, unreadMessages: 0 };
          } else {
            return thread;
          }
        });
        console.log("filteredState", filteredState);

        return { ...state, data: { messageThread: [...filteredState] } };
      } else {
        return state;
      }
    }
    case fromMessageThread.ADD_NEW_GROUP_TO_MESSAGE_THREAD: {
      console.log("add new group to message thread payload", action.payload);
      console.log("add new group to message thread state", state);
      let newMessageThread = { ...action.payload, chatBetween: [{ avatar: action.payload.avatar, username: action.payload.name }] };
      return { ...state, data: { ...state.data, messageThread: [...state.data.messageThread, newMessageThread] } };
    }
  }
  return state;
}

export const getMessageThread = (state: MessageThreadState) => state.data;
export const getMessageThreadLoaded = (state: MessageThreadState) =>
  state.loaded;
export const getMessageThreadLoading = (state: MessageThreadState) =>
  state.loading;
