import { Media } from "./Media";

export interface Chat {
  id: string;
  name: string;
  icon?: string;
  type: "PRIVATE" | "GROUP";
  memberIds: number[];
  members: UserChatProfile[],
  lastMessage: Message | null;
}

export interface ChatMember {
  id: number;
  userId: number;
  userProfile?: UserChatProfile;
  joinedAt?: string | boolean;
}

export interface UserChatProfile {
  id: number;
  userId: number;
  name: string;
  sex: string;
  lastActivityAt: boolean;
  avatar?: Media;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: number;
  content: string;
  type: "TEXT" | "IMAGE";
  sentAt: string;
  replyTo?: Message;
} 