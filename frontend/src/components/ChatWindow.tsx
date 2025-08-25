import { useEffect, useRef, useState, useCallback } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
import Message from "./widgets/Message/Message";
import chatService from "@/services/chat.service";
import { useChatStore } from "@/services/store/chat.store";
import { SendHorizontal, ArrowLeft, Circle } from "lucide-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import TextField from "@/components/ui/TextField/TextField";
import styles from "./blocks/ChatBlock/ChatBlock.module.scss";
import { Link } from "react-router-dom";
import { routes } from "@/routes/routes";
import { ChatMember } from "@/services/models/Chat";

const MEDIA_SERVER_URL = import.meta.env.VITE_MEDIA_BACKEND_URL;

interface ChatWindowProps {
  chatId: string | null;
  userId: number;
  recipientId: number | null;
  onBack?: () => void;
}

export function ChatWindow({ chatId: initialChatId, userId, recipientId, onBack }: ChatWindowProps) {
  const [chatId, setChatId] = useState<string | null>(initialChatId);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<any | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    setChatId(initialChatId);
  }, [initialChatId]);

  useEffect(() => {
    if (!chatId && recipientId && userId) {
      chatService.createPrivateChat(userId, recipientId).then(res => {
        setChatId(res.data.id || res.data.chatId || res.data.content?.id);
      });
    }
  }, [chatId, recipientId, userId]);

  const onMessage = useCallback((msg: any) => setMessages((prev) => [...prev, msg]), []);
  const onHistory = useCallback((msgs: any[]) => setMessages(msgs), []);

  const { sendMessage, isConnected } = useChatSocket(
    chatId || "",
    onMessage,
    onHistory
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !chatId) return;
    sendMessage({
      content: input,
      type: "TEXT",
      recipientId,
      chatId,
      senderId: userId,
    });
    setInput("");
    setReplyTo(null);
  };

  // Получаем информацию о собеседнике
  const chat = useChatStore(state => state.chats.find(c => c.id === chatId));
  const otherMember: ChatMember = chat?.members.find(m => m.userId !== userId);
  const userProfile = otherMember?.userProfile;
  let lastSeenDate: Date | null = null;
  if (userProfile && typeof userProfile.lastActivityAt === 'string') {
    lastSeenDate = new Date(userProfile.lastActivityAt);
  }
  const isOnline = !!lastSeenDate && (new Date().getTime() - lastSeenDate.getTime() < 5 * 60 * 1000);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      {onBack && (
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft color={"var(--text-color)"}/>
        </button>
      )}
      {otherMember && userProfile && (
        
          <div className={styles.userInfo}>
            {userProfile.avatar && (
              <Avatar 
                src={MEDIA_SERVER_URL + "media/" + userProfile.avatar.filename} 
                size={40} 
              />
            )}
            <Link to={`${routes.Form}/${otherMember?.userProfile.id}`} className={styles.userDetails}>
              <div className={styles.userName}>
                {userProfile.name || `Пользователь ${otherMember.userId}`}
                {isOnline && <Circle size={12} className={styles.onlineIndicator} />}
              </div>
              <div className={styles.lastSeen}>
                {isOnline
                  ? 'В сети'
                  : userProfile.name
                    ? `${userProfile.name} был(а) в сети ${lastSeenDate ? lastSeenDate.toLocaleString() : 'недавно'}`
                    : lastSeenDate
                      ? `Был(а) в сети ${lastSeenDate.toLocaleString()}`
                      : 'Недавно'
                }
              </div>
            </Link>
          </div>
      )}
       </div>

      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <Message
            userId={userId}  
            key={msg.id}
            id={msg.id}
            chatId={chatId || msg.chatId}
            content={msg.content}
            sentAt={msg.sentAt || msg.createdAt}
            senderId={msg.senderId} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className={styles.sendContainer}>
        {replyTo && (
          <div style={{ fontSize: 12, color: "#888" }}>
            Ответ на: {replyTo.content} <button onClick={() => setReplyTo(null)}>X</button>
          </div>
        )}
        <TextField
          props={{
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSend(),
            placeholder: "Введите сообщение...",
            disabled: !isConnected,
          }}
          className={styles.input}
        />
        <button onClick={handleSend} disabled={!isConnected || !input.trim()}>
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
} 