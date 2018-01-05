import { User } from "../../models/user.model";

import * as fromUser from "../actions";

export interface UserState {
  data: User;
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: UserState = {
  data: null,
  loading: false,
  loaded: false,
  message: null
};

export function userReducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.LOAD_CURRENT_USER: {
      console.log("load current user state", state);
      return {...state, loading: true}
    }
    case fromUser.LOAD_CURRENT_USER_READY: {
      console.log("load current user ready payload", action.payload);
      console.log("load current user ready state", state);
      return {...state, loaded: action.payload.success, loading: false, data: action.payload.userData, message: action.payload.message}
    }
  }
  return state;
}

export const getUser = (state: UserState) => state.data;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUserLoading = (state: UserState) => state.loading;
