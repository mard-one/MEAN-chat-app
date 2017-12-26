import { User } from "./user.model"

export interface Message {
  _id?: string;
  sender?: User;
  reciever?: User;
  sentAt?: Date;
  text?: string;
  isRead?: boolean;
}