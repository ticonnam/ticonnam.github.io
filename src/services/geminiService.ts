import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// VITE_ prefix is required to expose the key to the browser on Vercel
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: AI_SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AIRA Connection Error:", error);
    return "I'm having trouble connecting right now. Please try again or check the projects directly!";
  }
};