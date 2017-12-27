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
    case fromContactThread.LOAD_CONTACT_THREAD_SUCCESS: {
      const contacts = action.payload.contactThread;
      // console.log("action.payload", action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: { contacts: contacts }
      };
    }
    case fromContactThread.LOAD_CONTACT_THREAD_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromContactThread.ADD_CONTACT_TO_CONTACT_THREAD: {
      return { ...state, loading: true };
    }
    case fromContactThread.ADD_CONTACT_TO_CONTACT_THREAD_SUCCESS: {
      const contact: User = action.payload.user;
      return {
        ...state,
        loading: false,
        loaded: true,
        data: { contacts: [...state.data.contacts, contact] }
      };
    }
    case fromContactThread.ADD_CONTACT_TO_CONTACT_THREAD_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromContactThread.ADD_NEW_MESSAGE_TO_CONTACT_THREAD: {
      console.log("contact thread payload", action.payload);
      console.log("contact thread state", state);
      const foundUser: any = state.data.contacts.filter(contact => {
        // console.log("contact._id", contact._id);
        // console.log("action.payload.messageThread.chatBetween", contact._id);
        // console.log(
        //   "action.payload.messageThread.chatBetween != contact._id",
        //   action.payload.messageThread.chatBetween[0]._id == contact._id
        // );
        return action.payload.messageThread.chatBetween[0]._id == contact._id;
      });
      // console.log("found user", foundUser);
      const filteredStateWithoutFoundUser = [
        ...state.data.contacts.filter(contact => {
          return contact._id != foundUser[0]._id;
        })
      ];
      const updatedFoundUser: User = {
        _id: foundUser[0]._id,
        username: foundUser[0].username,
        messageThread: [action.payload.messageThread],
        avatar: foundUser[0].avatar
      };
      return {
        ...state,
        loading: true,
        data: {
          ...state.data,
          contacts: [...filteredStateWithoutFoundUser, updatedFoundUser]
        }
      };
    }
  }
  return state;
}

export const getContactThread = (state: ContactThreadState) => state.data;
export const getContactThreadLoaded = (state: ContactThreadState) =>
  state.loaded;
export const getContactThreadLoading = (state: ContactThreadState) =>
  state.loading;
