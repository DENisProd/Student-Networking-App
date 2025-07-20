import { useEffect, useRef, useState, useCallback } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
import Message from "../../widgets/Message/Message";
import chatService from "@/services/chat.service";
import { useChatStore } from "@/services/store/chat.store";
import { SendHorizontal, Circle } from "lucide-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import styles from "./ChatBlock.module.scss";
import TextField from "@/components/ui/TextField/TextField";
import { Link } from "react-router-dom";
import { routes } from "@/routes/routes";
import { ChatMember } from "@/services/models/Chat";

const MEDIA_SERVER_URL = import.meta.env.VITE_MEDIA_BACKEND_URL;

export function ChatBlock({ chatId: initialChatId, userId, recipientId }: { chatId: string | null; userId: number; recipientId: number | null }) {
  const [chatId, setChatId] = useState<string | null>(initialChatId);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<any | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Сброс сообщений при смене чата
  useEffect(() => {
    setMessages([]);
    setChatId(initialChatId);
  }, [initialChatId]);

  // Создание приватного чата если нужно
  useEffect(() => {
    if (!chatId && recipientId && userId) {
      chatService.createPrivateChat(userId, recipientId).then(res => {
        const newChatId = res.data.id || res.data.chatId || res.data.content?.id;
        console.log('Created chat with ID:', newChatId);
        setChatId(newChatId);
      });
    }
  }, [chatId, recipientId, userId]);

  const onMessage = useCallback((msg: any) => {
    console.log('Received message:', msg);
    setMessages((prev) => [...prev, msg]);
  }, []);
  
  const onHistory = useCallback((msgs: any[]) => {
    console.log('Received history:', msgs);
    setMessages(msgs);
  }, []);

  const { sendMessage, isConnected } = useChatSocket(
    chatId || "",
    onMessage,
    onHistory
  );

  useEffect(() => {
    console.log('ChatBlock: chatId =', chatId, 'isConnected =', isConnected);
  }, [chatId, isConnected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    console.log('handleSend called with input:', input, 'chatId:', chatId);
    if (!input.trim() || !chatId) {
      console.log('Cannot send: input empty or no chatId');
      return;
    }
    
    const messageData = {
      content: input,
      type: "TEXT",
      recipientId,
      chatId,
      senderId: userId,
    };
    
    console.log('Sending message:', messageData);
    sendMessage(messageData);
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

  if (!chatId) {
    return (
      <div className={styles.container}>
        <div className={styles.messagesContainer}>
          <div style={{ textAlign: 'center', color: '#888' }}>Выберите чат для начала общения</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {otherMember && userProfile && (
        <div className={styles.header}>
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
        </div>
      )}

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