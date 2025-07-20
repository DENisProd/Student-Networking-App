import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useChatSocket(
  chatId: string,
  onMessage: (msg: any) => void,
  onHistory: (msgs: any[]) => void
) {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!chatId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8071/ws"),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      setIsConnected(true);
      client.subscribe(`/topic/chat.${chatId}`, (message: IMessage) => {
        onMessage(JSON.parse(message.body));
      });
      client.subscribe(`/topic/chat.${chatId}.history`, (message: IMessage) => {
        onHistory(JSON.parse(message.body));
      });
      client.publish({
        destination: `/app/chat/${chatId}/history`,
        body: "",
      });
    };

    client.onDisconnect = () => setIsConnected(false);

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [chatId, onMessage, onHistory]);

  const sendMessage = (msg: any) => {
    if (isConnected) {
      clientRef.current?.publish({
        destination: `/app/chat/${chatId}/send`,
        body: JSON.stringify(msg),
      });
    }
  };

  return { sendMessage, isConnected };
} 