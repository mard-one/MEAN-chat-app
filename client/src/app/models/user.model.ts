import { MessageThread } from "./messageThread.model"

export interface User {
  _id?: string;
  username?: string;
  avatar?: string;
  messageThread?: MessageThread[];
  //   contactThread?: { type: Schema.Types.ObjectId; ref: "ContactThread" };
}