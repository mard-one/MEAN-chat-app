import { User } from "../../models/user.model";
import * as fromUser from "../actions/user.action";

export interface UserState {
  data: User[];
  loaded: boolean;
  loading: boolean;
}
export const initialState: UserState = {
  data: [{
    _id:"5a301aec2b60ab3ff0363c72",
    username:"mara",
    avatar:["image1", "image2"],
    messageThread:[{}]
  }],
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

export const getUserLoading = (state:UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUser = (state: UserState) => state.data;
