import { Message } from "./message.model"
import { User } from "./user.model";


export interface MessageThread {
  _id?: string,
  chatBetween?: User[];
  messages?: Message[];
  lastMessage?: string;
}

