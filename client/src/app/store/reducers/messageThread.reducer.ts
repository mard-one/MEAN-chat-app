import * as fromModels from "../../models";

import * as fromMessageThread from "../actions";

export interface MessageThreadState {
  data: {
    messageThread?: fromModels.MessageThread[];
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
        if (action.payload.group) {
          let foundGroup = state.data.messageThread.filter(
            thread => action.payload.group._id == thread._id
          );
          console.log("found group", foundGroup);
          if (foundGroup.length) {
            let filteredStateWithoutNewGroup = [
              ...state.data.messageThread.filter(thread => {
                return action.payload.group._id != thread._id;
              })
            ];
            console.log(
              "filtered state without new group",
              filteredStateWithoutNewGroup
            );
            return {
              ...state,
              loading: false,
              loaded: true,
              data: {
                messageThread: [
                  ...filteredStateWithoutNewGroup,
                  ...action.payload.group
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
                  action.payload.group
                ]
              }
            };
          }
        } else {
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
            var numUnread = 0;
            if (element.creator) {
              element.messages.map(innerElement => {
                // console.log("inner element", innerElement);
                if (!innerElement.isRead && innerElement.sender != action.payload.userData._id) {
                  return numUnread++;
                } else {
                  return numUnread;
                }
              });
            } else {
              // console.log("element", element);
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
            }
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
      if (action.payload.group) {
        if (state.data.messageThread) {
          let foundGroup = state.data.messageThread.filter(thread => {
            // console.log("element._id", element._id);
            // console.log("action.payload.messageThread._id", action.payload.messageThread._id);
            // console.log("element._id == action.payload.messageThread._id", element._id == action.payload.messageThread._id);
            return thread._id == action.payload.group._id;
          });
          console.log("found group", foundGroup);
          if (foundGroup.length) {
            let filteredStateWithoutNewGroup = [
              ...state.data.messageThread.filter(thread => {
                return action.payload.group._id != thread._id;
              })
            ];
            console.log(
              "filteredStateWithoutNewGroupThread",
              filteredStateWithoutNewGroup
            );
            let groupWithNumberOfUnreadMessages = foundGroup.map(thread => {
              // console.log("thread", thread);
              let numUnread = 0;
              thread.messages.map(innerElement => {
                // console.log("innerElement.reciever", innerElement.reciever);
                // console.log("action.payload.currentUser._id", action.payload.currentUser._id);
                // console.log("innerElement.reciever == action.payload.group._id", innerElement.reciever == action.payload.group._id);
                // console.log("innerElement.sender != action.payload.currentUser._id", innerElement.sender != action.payload.currentUser._id);
                // console.log("!innerElement.isRead", !innerElement.isRead);
                // console.log("logic", !innerElement.isRead && innerElement.reciever == action.payload.group._id && innerElement.sender != action.payload.currentUser._id);
                if (
                  !innerElement.isRead &&
                  innerElement.reciever == action.payload.group._id &&
                  innerElement.sender != action.payload.currentUser._id
                ) {
                  return numUnread++;
                } else {
                  return numUnread;
                }
              });
              console.log("number of unread messages", numUnread);
              return { ...thread, unreadMessages: numUnread };
            });
            console.log(
              "groupWithNumberOfUnreadMessages",
              groupWithNumberOfUnreadMessages
            );

            return {
              ...state,
              loaded: true,
              data: {
                messageThread: [
                  ...filteredStateWithoutNewGroup,
                  ...groupWithNumberOfUnreadMessages
                ]
              }
            };
          } else {
            return { ...state, loaded: true };
          }
        } else {
          return { ...state, loaded: true };
        }
      } else {
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
            console.log(
              "filteredStateWithoutNewMessageThread",
              filteredStateWithoutNewMessageThread
            );
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
            if (foundMessageThread[0].creator) {
              console.log("group thread");
              let slightlyChangedGroupMessageThread = {
                ...messageThreadWithNumberOfUnreadMessages[0],
                chatBetween: [
                  {
                    avatar: action.payload.messageThread.avatar,
                    username: action.payload.messageThread.name,
                    _id: action.payload.messageThread._id,
                    creator: action.payload.messageThread.creator
                  }
                ]
              };
              console.log(
                "slightlyChangedGroupMessageThread",
                slightlyChangedGroupMessageThread
              );
              return {
                ...state,
                loaded: true,
                data: {
                  messageThread: [
                    ...filteredStateWithoutNewMessageThread,
                    slightlyChangedGroupMessageThread
                  ]
                }
              };
            } else {
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
            }
          } else {
            return { ...state, loaded: true };
          }
        } else {
          return { ...state, loaded: true };
        }
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
      if (action.payload.group) {
        if (action.payload.group.unreadMessages) {
          let filteredState = state.data.messageThread.map(thread => {
            // console.log("thread", thread);
            // console.log("thread._id == action.payload.messageThread._id", thread._id == action.payload.messageThread._id);
            if (thread._id == action.payload.group._id) {
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
      } else {
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
    }
    case fromMessageThread.ADD_NEW_GROUP_TO_MESSAGE_THREAD: {
      console.log("add new group to message thread payload", action.payload);
      console.log("add new group to message thread state", state);
      if (action.payload.userData) {
        return {
          ...state,
          data: {
            messageThread: [
              ...state.data.messageThread,
              ...action.payload.userData.groups
            ]
          }
        };
      } else {
        return {
          ...state,
          data: {
            messageThread: [...state.data.messageThread, ...action.payload]
          }
        };
      }
      // let newMessageThread = {
      //   ...action.payload,
      //   chatBetween: [
      //     {
      //       avatar: action.payload.avatar,
      //       username: action.payload.name,
      //       _id: action.payload._id,
      //       creator: action.payload.creator
      //     }
      //   ]
      // };
    }
  }
  return state;
}

export const getMessageThread = (state: MessageThreadState) => state.data;
export const getMessageThreadLoaded = (state: MessageThreadState) =>
  state.loaded;
export const getMessageThreadLoading = (state: MessageThreadState) =>
  state.loading;
