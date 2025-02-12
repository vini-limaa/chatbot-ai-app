import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string | undefined = process.env.GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 10,
        maxOutputTokens: 50,
      },
    });
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Error generating AI response. :(";
  }
};
