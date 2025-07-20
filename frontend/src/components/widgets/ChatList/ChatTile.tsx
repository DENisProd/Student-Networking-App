import { Chat, ChatMember } from '@/services/models/Chat'
import React from 'react';
import styles from './ChatTile.module.scss';
import Avatar from '@/components/ui/Avatar/Avatar';
import { User } from '@/services/models/User';
import { get } from 'node_modules/axios/index.cjs';
import Typography from '@/components/ui/Typography/Typography';

interface ChatTileProps {
    chat: Chat;
    onSelect: (chatId: string) => void;
    user: User;
}

const MEDIA_SERVER_URL = import.meta.env.VITE_MEDIA_BACKEND_URL;

const ChatTile: React.FC<ChatTileProps> = ({ chat, onSelect, user }) => {
    const getChatName = (chat: Chat) => {
        if (chat?.name) return chat.name;
        const otherMembers: ChatMember[] = chat.members.filter(member => member.userId !== user.id);
        if (otherMembers.length >= 1) return otherMembers[0]?.userProfile?.name;
        else return "Без имени";
    }

    const getChatIcon = (chat: Chat) => {
        if (chat.icon) return chat.icon;
        const otherMembers: ChatMember[] = chat.members.filter(member => member.userId !== user.id);
        if (otherMembers.length >= 1) return MEDIA_SERVER_URL + "media/" + otherMembers[0]?.userProfile?.avatar?.filename;
        return '';
    }

    return (
        <li className={styles.chat} onClick={() => onSelect(chat.id)}>
            <Avatar
                src={getChatIcon(chat)}
                size={40} />
                <div>
                    <div className={styles.name}>{getChatName(chat)}</div>
                    <div><Typography variant={'p'} onClamp vclamp2 text={`${chat?.lastMessage?.senderId === user.id ? 'Вы:' : ''} ${chat?.lastMessage?.content}`}/></div>
                </div>
        </li>
    )
}

export default ChatTile