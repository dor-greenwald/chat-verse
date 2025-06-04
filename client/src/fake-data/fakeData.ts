import { UserStatus } from "../enums/enums";
import type { Chat, ChatMessage, User } from "../interfaces/interfaces";

export const fakeChatData: Chat = {
  id: "chat1",
  participants: [
    {
      id: "user1",
      username: "Bob",
      status: UserStatus.Online,
      totalXp: 1500,
      level: 4,
      achievements: [],
      friends: ["user2", "user3"],
    },
    {
      id: "user2",
      username: "Alice",
      status: UserStatus.Offline,
      totalXp: 1250,
      level: 5,
      achievements: [],
      friends: ["user1", "user3"],
    },
    {
      id: "user3",
      username: "Charlie",
      status: UserStatus.Offline,
      totalXp: 1400,
      level: 5,
      achievements: [],
      friends: ["user1", "user2"],
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isGroup: false,
  groupName: undefined,
};

export const fakeUserData: User = {
  id: "user1",
  username: "Bob",
  status: UserStatus.Online,
  totalXp: 1500,
  level: 5,
  achievements: [],
  friends: ["user2", "user3"],
};

const fakeUsersData: User[] = [
  {
    id: "user1",
    username: "Bob",
    status: UserStatus.Online,
    totalXp: 1500,
    level: 4,
    achievements: [],
    friends: ["user2", "user3"],
  },
  {
    id: "user2",
    username: "Alice",
    status: UserStatus.Offline,
    totalXp: 1250,
    level: 5,
    achievements: [],
    friends: ["user1", "user3"],
  },
  {
    id: "user3",
    username: "Charlie",
    status: UserStatus.Offline,
    totalXp: 1400,
    level: 5,
    achievements: [],
    friends: ["user1", "user2"],
  },
];

export const fakeMessageData: ChatMessage[] = [
  {
    id: "msg1",
    senderName: "Bob",
    senderId: "user1",
    text: "Hello, how are you?",
    createdAt: new Date("2025-5-11 12:09").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg2",
    senderName: "Alice",
    senderId: "user2",
    text: "I'm good, thanks! How about you?",
    createdAt: new Date("2025-5-11 12:30").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg3",
    senderName: "Bob",
    senderId: "user1",
    text: "Doing well, just working on some projects.",
    createdAt: new Date("2025-5-11 12:34").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg4",
    senderName: "Alice",
    senderId: "user2",
    text: "Sounds great! Let me know if you need any help.",
    createdAt: new Date("2025-5-11 12:34").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg5",
    senderName: "Bob",
    senderId: "user1",
    text: "Will do! Thanks!",
    createdAt: new Date("2025-5-11 12:35").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg6",
    senderName: "Bob",
    senderId: "user1",
    text: "Are you coming to my party this weekend?",
    createdAt: new Date("2025-5-23 20:21").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg7",
    senderName: "Alice",
    senderId: "user2",
    text: "Of course!",
    createdAt: new Date("2025-5-23 20:22").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg8",
    senderName: "Bob",
    senderId: "user1",
    text: "Great! it's going to be so fun!!!",
    createdAt: new Date("2025-5-23 20:23").toISOString(),
    chatId: "chat1",
  },
  {
    id: "msg9",
    senderName: "Alice",
    senderId: "user2",
    text: "It was so fun! waiting for the next party!",
    createdAt: new Date("2025-5-29 20:23").toISOString(),
    chatId: "chat1",
  },
];
