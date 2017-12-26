import { User } from "./user.model"

export interface ContactThread {
  threadOwner?: User;
  threadOwnerName?: User;
  contacts?: [User];
}
