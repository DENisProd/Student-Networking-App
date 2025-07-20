import { useState, useEffect } from "react";
import { ChatBlock } from "@/components/blocks/ChatBlock/ChatBlock";
import { useUserStore } from "@/services/store/user.store";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatList } from "@/components/widgets/ChatList/ChatList";

function getQueryParam(search: string, key: string) {
  return new URLSearchParams(search).get(key);
}

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  const { user } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <ChatList onSelect={handleSelectChat} />
      {user && (
        <ChatBlock
          chatId={selectedChat}
          userId={user.id!}
          recipientId={targetUserId ? +targetUserId : null}
        />
      )}
    </div>
  );
};

export default ChatPage;
