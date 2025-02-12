import ChatContextProvider from "@/context/chatContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <Component {...pageProps} />
    </ChatContextProvider>
  );
}
