import { Action } from "@ngrx/store";

export const NEW_GROUP = "New Group";

export class NewGroup implements Action {
         readonly type = NEW_GROUP;
         constructor(public payload: any) {}
       }

export type GroupAction = NewGroup;
