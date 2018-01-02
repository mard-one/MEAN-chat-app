import { ContactThread } from "../../models/contactThread.model";

import * as fromContactThread from "../actions";
import { User } from "../../models/user.model";

export interface ContactThreadState {
  data: ContactThread;
  loading: boolean;
  loaded: boolean;
}

export const initialState: ContactThreadState = {
  data: null,
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
    case fromContactThread.LOAD_CONTACT_THREAD_READY: {
      const contacts = action.payload.contactThread;
      // console.log("action.payload", action.payload);
      return { ...state, loading: false, loaded: action.payload.success, data: { contacts: contacts } };
    }

    case fromContactThread.ADD_CONTACT_TO_CONTACT_THREAD: {
      return { ...state, loading: true };
    }
    case fromContactThread.ADD_CONTACT_TO_CONTACT_THREAD_READY: {
      console.log("add contact to contact thread success payload", action.payload);
      const contact: User = action.payload.user;
      return { ...state, loading: false, loaded: action.payload.success, data: { contacts: [...state.data.contacts, contact] } };
    }
    case fromContactThread.ADD_NEW_MESSAGE_TO_CONTACT_THREAD: {
      if (state.data.contacts.length) {
        console.log("contact thread payload", action.payload);
        console.log("contact thread state", state);
        const foundContact = state.data.contacts.filter(thread => {
          console.log("thread", thread);
          return action.payload.messageThread.chatBetween
            .map(element => {
              // console.log("element", element);
              // console.log("element._id == thread._id", element._id == thread._id);
              return element._id == thread._id;
            })
            .includes(true);
        });
        if (foundContact.length) {
          console.log("foundContact", foundContact);
          const properMessageThreadPayload = { messageThread: { ...action.payload.messageThread, chatBetween: action.payload.messageThread.chatBetween.filter(
                userInChat => {
                  return foundContact[0]._id == userInChat._id;
                }
              ) } };
          console.log("properContactThreadPayload", properMessageThreadPayload);
          const filteredStateWithoutFoundUser = [...state.data.contacts.filter(
              contact => {
                return contact._id != foundContact[0]._id;
              }
            )];
          console.log("filter works");
          const updatedFoundContact: User = { _id: foundContact[0]._id, username: foundContact[0].username, messageThread: [properMessageThreadPayload.messageThread], avatar: foundContact[0].avatar };

          return { ...state, loading: true, data: { ...state.data, contacts: [...filteredStateWithoutFoundUser, updatedFoundContact] } };
        }
      }
    }
  }
  return state;
}

export const getContactThread = (state: ContactThreadState) => state.data;
export const getContactThreadLoaded = (state: ContactThreadState) =>
  state.loaded;
export const getContactThreadLoading = (state: ContactThreadState) =>
  state.loading;
