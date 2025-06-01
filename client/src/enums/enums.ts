export const UserStatus = {
  Online: "online",
  Offline: "offline",
  Away: "away",
  Busy: "busy",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const NotificationType = {
  XP: "xp",
  Achievement: "achievement",
  Message: "message",
} as const;
export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationStatus = {
  Unread: "unread",
  Read: "read",
  Dismissed: "dismissed",
} as const;
export type NotificationStatus =
  (typeof NotificationStatus)[keyof typeof NotificationStatus];

export const ChatType = {
  Private: "private",
  Group: "group",
} as const;
export type ChatType = (typeof ChatType)[keyof typeof ChatType];

export const MessageType = {
  Text: "text",
  Image: "image",
  Video: "video",
  File: "file",
} as const;
export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export const ReactionType = {
  Like: "like",
  Love: "love",
  Laugh: "laugh",
  Sad: "sad",
  Angry: "angry",
  Wow: "wow",
  Custom: "custom",
} as const;
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];

export const XPEventType = {
  SendMessage: "send_message",
  LoginStreak: "login_streak",
  AchievementUnlock: "achievement_unlock",
  FriendInvite: "friend_invite",
} as const;
export type XPEventType = (typeof XPEventType)[keyof typeof XPEventType];
