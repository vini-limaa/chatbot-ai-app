import Chat from "@/components/chat/Chat";
import useChat from "@/hooks/useChat";
import { useEffect } from "react";
import { IMessage } from "@/models/IMessage";

interface HomeProps {
  initialMessages: IMessage[];
}

const Home = ({ initialMessages }: HomeProps) => {
  const { updateMessages, setIsLoading } = useChat();

  useEffect(() => {
    updateMessages(initialMessages);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return <Chat />;
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`http://localhost:3000/api/messages`);
    const data: IMessage[] = await res.json();

    return {
      props: { initialMessages: data },
    };
  } catch (error) {
    console.error("Failed to fetch messages on server:", error);
    return {
      props: { initialMessages: [] },
    };
  }
}

export default Home;
