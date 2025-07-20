import server from "@/middleware/wrappers/server";
import { Chat, Message } from "./models/Chat";

const chatService = {
  async getChats(): Promise<Chat[]> {
    const res = await server.get("profiles/chat/");
    return res.data.content || res.data;
  },
  async getMessages(chatId: string): Promise<Message[]> {
    const res = await server.get(`profiles/chat/${chatId}/messages`);
    return res.data.content || res.data;
  },
  async createChat(members: number[], name?: string) {
    return server.post("profiles/chat/", { memberIds: members, name, type: members.length > 2 ? "GROUP" : "PRIVATE" });
  },
  async createPrivateChat(senderId: Number, recipientId: Number) {
    return server.post("profiles/chat/", { senderId, recipientId});
  }
};

export default chatService; 