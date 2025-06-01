import { UserStatus, XPEventType } from "../enums/enums";

export interface User {
  id: string;
  username: string;
  status: UserStatus;
  totalXp: number;
  level: number;
  achievements: Achievement[];
  friends: string[]; // array of user IDs
  starredMessages?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string; // ISO string
  chatId: string;
  replyTo?: string; // ID of the message being replied to
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  createdAt: string;
  updatedAt: string;
  isGroup: boolean;
  groupName?: string;
}

export interface XPEvent {
  type: XPEventType;
  amount: number;
  userId: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  xpReward: number;
}
