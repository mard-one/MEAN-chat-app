import { createSelector } from "@ngrx/store";

import * as fromReducer from "../reducers";
import * as fromUser from "../reducers/user.reducer";

export const chooseUser = (state: fromReducer.ChatState) => state.user;

export const getUserState = createSelector(
  chooseUser,
  (user: fromUser.UserState) => user
);

export const getUser = createSelector(chooseUser, fromUser.getUser);
export const getUserLoaded = createSelector(
  chooseUser,
  fromUser.getUserLoaded
);
export const getUserLoading = createSelector(
  chooseUser,
  fromUser.getUserLoading
);
