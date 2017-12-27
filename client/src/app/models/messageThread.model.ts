import { Message } from "./message.model"

export interface MessageThread {
  _id?: string,
  chatBetween?: [string];
  messages?: [Message];
  lastMessage?: string;
}

