import { useState } from "react";
import styles from "./ChatInput.module.scss";
import useChat from "@/hooks/useChat";

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");
  const { chatState } = useChat();
  const { isTyping } = chatState;

  const disable = !input.trim() || isTyping;

  const handleSend = async () => {
    if (disable) return;
    await onSendMessage(input);
    setInput("");
  };

  return (
    <div
      className={styles.inputContainer}
      role="form"
      aria-label="Chat Input Area"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className={styles.inputField}
        disabled={isTyping}
        aria-disabled={isTyping}
        aria-label="Type your message here"
      />
      <button
        onClick={handleSend}
        className={`${styles.sendButton} ${
          disable ? styles.disabledButton : ""
        }`}
        disabled={isTyping}
        aria-disabled={isTyping}
        aria-label={isTyping ? "Message is being generated" : "Send message"}
      >
        {isTyping ? "Generating..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}
