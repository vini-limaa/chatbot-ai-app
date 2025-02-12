import { ReactNode, useState } from "react";
import { ChatContext, initialChatState } from "@/context/chatContext";
import { IChatState } from "@/models/IChat";

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProviderMock: React.FC<ChatProviderProps> = ({ children }) => {
  const [chatState, setChatState] = useState<IChatState>(initialChatState);

  return (
    <ChatContext.Provider value={{ chatState, setChatState }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProviderMock;
