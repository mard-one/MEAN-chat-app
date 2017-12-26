import { Message } from "./message.model"

export interface MessageThread {
  chatBetween: [string];
  messages: [Message];
  lastMessage: string;
}

