import { prisma } from "./prisma";
import { IMessage } from "@/models/IMessage";

export const saveMessage = async (
  author: string,
  message: string
): Promise<IMessage> => {
  if (!author || !message) {
    console.error("Error: Missing required fields", { author, message });
    throw new Error("Author and message are required.");
  }

  console.log("Saving message to database:", { author, message });

  try {
    const newMessage = await prisma.message.create({
      data: {
        author,
        message,
      },
    });

    console.log("Message successfully saved:", newMessage);
    return newMessage;
  } catch (error) {
    console.error("Error saving message to database:", error);
    throw new Error("Failed to save message.");
  }
};

export const getMessages = async (): Promise<IMessage[]> => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    console.log("Fetched messages from database:", messages);
    return messages.reverse();
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages.");
  }
};
