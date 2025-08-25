import { useEffect, useState } from "react";

import { ChatWindow } from "@/components/ChatWindow";
import { useUserStore } from "@/services/store/user.store";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChatList } from "@/components/widgets/ChatList/ChatList";

function getQueryParam(search: string, key: string) {
  return new URLSearchParams(search).get(key);
}

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  const { user } = useUserStore();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const userParam = getQueryParam(location.search, "recipientId");
    if (userParam) {
      setTargetUserId(userParam);
      setSelectedChat(null);
    } else {
      setTargetUserId(null);
    }
  }, [location.search]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    setTargetUserId(null);
  };

  if (isMobile) {
    if (!selectedChat) {
      return <ChatList onSelect={setSelectedChat} />;
    }
    return (
      <ChatWindow
        chatId={selectedChat}
        userId={user?.id!}
        recipientId={targetUserId ? +targetUserId : null}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  // ПК-версия
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <ChatList onSelect={setSelectedChat} />
      {user && (
        <ChatWindow
          chatId={selectedChat}
          userId={user.id!}
          recipientId={targetUserId ? +targetUserId : null}
        />
      )}
    </div>
  );
};

export default ChatPage;
