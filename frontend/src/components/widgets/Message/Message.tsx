import Avatar from "@/components/ui/Avatar/Avatar";
import { useChatStore } from "@/services/store/chat.store";
import cn from "classnames";
import styles from "./Message.module.scss";
import { ChatMember } from "@/services/models/Chat";

interface MessageProps {
  id: string;
  chatId: string;
  senderId: number;
  content: string;
  sentAt: string;
  userId: number;
}

const MEDIA_SERVER_URL = import.meta.env.VITE_MEDIA_BACKEND_URL;

export default function Message({ userId, id, chatId, senderId, content, sentAt }: MessageProps) {
  const chat = useChatStore(state => state.chats.find(c => c.id === chatId));
  const sender: ChatMember = chat?.members.find(m => m.userId === senderId);

  return (
    <div className={styles.messageContainer}>
    <div className={cn(styles.message, senderId === userId && styles.ownMessage)}>
      {senderId !== userId && sender?.userProfile?.avatar && <Avatar src={MEDIA_SERVER_URL + "media/" + sender?.userProfile?.avatar.filename} size={32} />}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <b>{senderId !== userId && (sender?.userProfile?.name ?? senderId)}</b>
            <div style={{ marginLeft: 8, fontSize: 12, color: '#888' }}>{sentAt.split('T')[1].slice(0,5)}</div>
        </div>
        <span>{content}</span>
      </div>
    </div>
    </div>
  );
}