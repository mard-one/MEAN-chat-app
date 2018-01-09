import { Action } from "@ngrx/store";

export const NEW_GROUP = "New Group";
export const LOAD_GROUP = "Load Group";

export class LoadGroup implements Action {
  readonly type = LOAD_GROUP;
  constructor(public payload: any) {}
}
export class NewGroup implements Action {
  readonly type = NEW_GROUP;
  constructor(public payload: any) {}
}

export type GroupAction = NewGroup | LoadGroup;
