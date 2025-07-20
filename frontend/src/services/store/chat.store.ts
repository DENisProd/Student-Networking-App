import { create } from "zustand";
import { Chat, Message } from "../models/Chat";
import chatService from "../chat.service";

interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  setCurrentChat: (chat: Chat) => void;
  fetchChats: () => void;
  fetchMessages: (chatId: string) => void;
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  setCurrentChat: (chat) => set({ currentChat: chat, messages: [] }),
  fetchChats: async () => {
    const chats = await chatService.getChats();
    set({ chats });
  },
  fetchMessages: async (chatId) => {
    const messages = await chatService.getMessages(chatId);
    set({ messages });
  },
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
})); 