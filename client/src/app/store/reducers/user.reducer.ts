import { User } from "../../models/user.model";
import * as fromUser from "../actions/user.action";

export interface UserState {
  data: User[];
  loaded: boolean;
  loading: boolean;
}
export const initialState: UserState = {
  data: [],
  loaded: false,
  loading: false
};

export function userReducer(
  state = initialState,
  action: fromUser.ChosenUserAction
): UserState {
  switch (action.type) {
    case fromUser.LOAD_CHOSEN_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUser.LOAD_CHOSEN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case fromUser.LOAD_CHOSEN_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}
