import { ActionReducerMap } from "@ngrx/store";

import * as formUser from "./user.reducer";

export interface ChatState {
  user: formUser.UserState;
}

export const reducers: ActionReducerMap<ChatState> = {
  user: formUser.userReducer
};
