import { Action } from "@ngrx/store";

export const LOAD_CHOSEN_USER = "Load Chosen User";
export const LOAD_CHOSEN_USER_FAIL = "Load Chosen User Fail";
export const LOAD_CHOSEN_USER_SUCCESS = "Load Chosen User Success";

export class LoadChosenUser implements Action {
  readonly type = LOAD_CHOSEN_USER;
}
export class LoadChosenUserFail implements Action {
  readonly type = LOAD_CHOSEN_USER_FAIL;
  constructor(public payload: any) {}
}
export class LoadChosenUserSuccess implements Action {
  readonly type = LOAD_CHOSEN_USER_SUCCESS;
  constructor(public payload: any) {}
}

export type ChosenUserAction =
  | LoadChosenUser
  | LoadChosenUserFail
  | LoadChosenUserSuccess;
