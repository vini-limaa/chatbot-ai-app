import React, { createContext, useState } from "react";
import { IChatState } from "@/models/IChat";

interface IChatContext {
  chatState: IChatState;
  setChatState: React.Dispatch<React.SetStateAction<IChatState>>;
}

export const initialChatState: IChatState = {
  messages: [],
  isLoading: false,
  isTyping: false,
};

export const ChatContext = createContext<IChatContext | null>(null);

const ChatContextProvider = ({ children }) => {
  const [chatState, setChatState] = useState<IChatState>(initialChatState);

  return (
    <ChatContext.Provider value={{ chatState, setChatState }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
