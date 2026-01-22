console.log("VITE DEBUG - Key exists:", !!import.meta.env.VITE_GEMINI_API_KEY);
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// OPTION A: The most modern "Client" approach (Recommended for v1.35.0+)
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Note: Use 'ai.models.generateContent' instead of 'getGenerativeModel'
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      }
    });

    return response.text; // Simply access .text directly
  } catch (error) {
    console.error(error);
    return "Trouble connecting...";
  }
};