import type { NextApiRequest, NextApiResponse } from "next";
import { saveMessage, getMessages } from "@global/lib/chatService";
import { getAIResponse } from "@global/lib/chatAI";
import { IMessage } from "@/models/IMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMessage[] | { error: string }>
) {
  if (req.method === "POST") {
    const { author, message } = req.body as Pick<
      IMessage,
      "author" | "message"
    >;

    const { generate } = req.body;

    if (generate) {
      try {
        if (!message) {
          return res.status(400).json({ error: "Message are required." });
        }

        const aiResponse = await getAIResponse(message);
        const botMessage = await saveMessage("ChatBot", aiResponse);

        return res.status(201).json([botMessage]);
      } catch (error) {
        console.error("Error processing POST request:", error);
        return res.status(500).json({ error: "Failed to process message." });
      }
    }

    try {
      if (!author || !message) {
        return res
          .status(400)
          .json({ error: "Author and message are required." });
      }

      const userMessage = await saveMessage(author, message);

      return res.status(201).json([userMessage]);
    } catch (error) {
      console.error("Error processing POST request:", error);
      return res.status(500).json({ error: "Failed to save message." });
    }
  }

  if (req.method === "GET") {
    try {
      const messages = await getMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error processing GET request:", error);
      return res.status(500).json({ error: "Failed to fetch messages." });
    }
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
