import { ChatContext } from "@/context/chatContext";
import { useContext } from "react";
import { IChatState } from "@/models/IChat";
import { IMessage } from "@/models/IMessage";

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }

  const { chatState, setChatState } = context;

  const setIsLoading = (value: boolean) => {
    setChatState((prevState: IChatState) => ({
      ...prevState,
      isLoading: value,
    }));
  };

  const setIsTyping = (value: boolean) => {
    setChatState((prevState: IChatState) => ({
      ...prevState,
      isTyping: value,
    }));
  };

  const updateMessages = (value: IMessage[]) => {
    setChatState((prevState: IChatState) => ({
      ...prevState,
      messages: value,
    }));
  };

  const updateNewMessages = (value: IMessage[]) => {
    setChatState((prevState: IChatState) => ({
      ...prevState,
      messages: [...prevState.messages, ...value],
    }));
  };

  const sendMessage = async ({
    message,
    generate,
  }: {
    message: string;
    generate?: boolean;
  }) => {
    if (chatState.isTyping) return;

    setIsTyping(true);

    const newMessage: Pick<IMessage, "author" | "message"> & {
      generate?: boolean;
    } = {
      author: "Vinicius Lima",
      message,
      generate,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      const newMessages: IMessage[] = await response.json();
      updateNewMessages(newMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    sendMessage,
    updateNewMessages,
    chatState,
    updateMessages,
    setIsLoading,
  };
};

export default useChat;
