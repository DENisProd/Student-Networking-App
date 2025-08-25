import { useEffect } from "react";
import { useChatStore } from "@/services/store/chat.store";
import { useUserStore } from "@/services/store/user.store";
import { Chat } from "@/services/models/Chat";
import ChatTile from "./ChatTile";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";

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
    <Layout>
      <Typography variant="h1" text="Чаты" />
      <ul>
        {chats.map((chat) => (
          <ChatTile chat={chat} key={chat.id} onSelect={handleSelect} user={user}/>
        ))}
      </ul>
    </Layout>
  );
} 