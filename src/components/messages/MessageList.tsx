import styles from "./MessageList.module.scss";
import { formatTimestamp } from "@/utils/formatTimestamp";
import useChat from "@/hooks/useChat";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IMessage } from "@/models/IMessage";

const MessageList = () => {
  const { chatState } = useChat();
  const { isTyping, messages } = chatState;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [myClass, setMyClass] = useState<string>(`${styles.container}`);

  const scroll = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scroll();
    setMyClass(`${styles.container} ${styles.loaded}`);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    scroll();
  }, [messages]);

  return (
    <>
      <div className={styles.chatBox} role="log">
        {messages?.map((msg: IMessage) => (
          <div
            key={msg.id}
            className={
              msg.author === "ChatBot"
                ? styles.receiverMessage
                : styles.senderMessage
            }
            role="article"
            aria-label={`Message from ${msg.author}`}
          >
            <span className={styles.author}>{msg.author}:</span>
            <ReactMarkdown>{msg.message}</ReactMarkdown>
            <span
              className={styles.timestamp}
              aria-label={`Sent at ${formatTimestamp(msg.createdAt)}`}
            >
              {formatTimestamp(msg.createdAt)}
            </span>
          </div>
        ))}
        {isTyping && <div className={styles.typingIndicator} role="status" />}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>
      <div className={myClass} />
    </>
  );
};

export default MessageList;
