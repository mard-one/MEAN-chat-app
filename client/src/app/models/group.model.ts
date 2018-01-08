import { Message } from "./message.model"
import { User } from "./user.model";


export interface Group {
  _id?: string;
  name: string;
  avatar: string;
  messages: Message[];
  lastMessage: string;
  members: User[];
  admins: User[];
  creator: User;
  createdAt: Date;
  description: string;
}

