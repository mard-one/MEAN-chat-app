import * as fromModels from "./index"

export interface User {
  _id?: string;
  username?: string;
  avatar?: string;
  messageThread?: fromModels.MessageThread[];
  contactThread?: fromModels.ContactThread;
  groups?: fromModels.Group[];
}