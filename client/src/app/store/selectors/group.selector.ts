import { createSelector } from "@ngrx/store";

import * as fromReducer from "../reducers";
import * as fromGroup from "../reducers/group.reducer";

export const chooseGroup = (state: fromReducer.ChatState) => state.group;

export const getGroupState = createSelector(
  chooseGroup,
  (group: fromGroup.GroupState) => group
);

export const getGroup = createSelector(chooseGroup, fromGroup.getGroup);
export const getGroupLoaded = createSelector(
  chooseGroup,
  fromGroup.getGroupLoaded
);
export const getGroupLoading = createSelector(
  chooseGroup,
  fromGroup.getGroupLoading
);
