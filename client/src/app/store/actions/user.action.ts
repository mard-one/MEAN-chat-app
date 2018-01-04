import { Action } from "@ngrx/store";

export const LOAD_CURRENT_USER = "Load Current User";
export const LOAD_CURRENT_USER_READY = "Load Current User Ready";

export class LoadCurrentUser implements Action {
  readonly type = LOAD_CURRENT_USER;
}
export class LoadCurrentUserReady implements Action {
  readonly type = LOAD_CURRENT_USER_READY;
  constructor(public payload: any) {}
}

export type UserAction = LoadCurrentUser | LoadCurrentUserReady;
