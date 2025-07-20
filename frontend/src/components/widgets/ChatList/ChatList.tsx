import { useEffect } from "react";
import { useChatStore } from "@/services/store/chat.store";
import { useUserStore } from "@/services/store/user.store";
import { Chat } from "@/services/models/Chat";
import ChatTile from "./ChatTile";

export function ChatList({ onSelect }: { onSelect: (chatId: string) => void }) {
  const { chats, fetchChats } = useChatStore();

  const { user } = useUserStore();

  useEffect(() => {
    fetchChats();
  }, []);

  const handleSelect = (chatId: string) => {
    console.log("Selected chatId:", chatId);
    onSelect(chatId);
  };

  return (
    <div>
      <h3>Чаты</h3>
      <ul>
        {chats.map((chat) => (
          <ChatTile chat={chat} key={chat.id} onSelect={handleSelect} user={user}/>
        ))}
      </ul>
    </div>
  );
} 