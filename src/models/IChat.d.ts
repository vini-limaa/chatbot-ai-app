import { IMessage } from "@/models/IMessage";

export interface IChatState {
  messages: IMessage[];
  isLoading: boolean;
  isTyping: boolean;
}
