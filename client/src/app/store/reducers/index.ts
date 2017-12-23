import { ActionReducerMap, createSelector } from "@ngrx/store";

import * as formUser from "./user.reducer";

export interface ChatState {
  chosenUser: formUser.UserState;
}

export const reducers: ActionReducerMap<ChatState> = {
  chosenUser: formUser.userReducer
};

export const chooseUser = (state: ChatState) => state.chosenUser;

export const getUserState = createSelector(chooseUser, (chosenUser: formUser.UserState)=>{
  console.log(chosenUser)
})

export const getUser = createSelector(chooseUser, formUser.getUser);
export const getUserLoaded = createSelector(chooseUser, formUser.getUserLoaded);
export const getUserLoading = createSelector(chooseUser, formUser.getUserLoading);
