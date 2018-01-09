import { Group } from "../../models/group.model";

import * as fromGroup from "../actions";

export interface GroupState {
  data: Group[];
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: GroupState = { data: [], loading: false, loaded: false, message: null };

export function groupReducer(
  state = initialState,
  action: fromGroup.GroupAction
): GroupState {
  switch (action.type) {
    case fromGroup.LOAD_GROUP: {
      console.log("load group state", state);
      console.log("load group payload", action.payload);
      return { ...state, data: [...action.payload.userData.groups] };
    }
    case fromGroup.NEW_GROUP: {
      console.log("new group state", state);
      console.log("new group payload", action.payload);
      return state;
    }
  }
  return state;
}

export const getGroup = (state: GroupState) => state.data;
export const getGroupLoaded = (state: GroupState) => state.loaded;
export const getGroupLoading = (state: GroupState) => state.loading;
