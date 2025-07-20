import { create } from "zustand";
import { Notification } from "@/models/Notification";

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [
    { id: 1, text: "Новое приглашение в проект", read: false },
    { id: 2, text: "Пользователь Петр добавил вас в контакты", read: false },
  ],
  unreadCount: 2,
  fetchNotifications: () => {},
})); 