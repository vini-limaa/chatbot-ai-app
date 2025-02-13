import styles from "./Chat.module.scss";
import ChatHeader from "@/components/chat-header/ChatHeader";
import MessageList from "@/components/messages/MessageList";
import ChatInput from "@/components/chat-input/ChatInput";
import useChat from "@/hooks/useChat";

const Chat = () => {
  const { sendMessage, chatState } = useChat();
  const { isLoading } = chatState;

  return (
    <div
      className={styles.appContainer}
      role="main"
      aria-label="Chat Application"
    >
      <div className={styles.chatContainer}>
        <ChatHeader userName="Vinicius Lima" />
        {isLoading ? (
          <div className={styles.loadingContainer} role="alert">
            <div className={styles.loadingSpinner} aria-hidden="true"></div>
            <span>Loading messages...</span>
          </div>
        ) : (
          <MessageList />
        )}
        <ChatInput
          onSendMessage={async (input) => {
            await sendMessage({ message: input });
            await sendMessage({ message: input, generate: true });
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
