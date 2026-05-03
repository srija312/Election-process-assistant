import { GoogleGenAI } from '@google/genai';

export const generateAIResponse = async ({ apiKey, lang, userState, inputText }) => {
  if (!apiKey) throw new Error("API Key is missing");

  const ai = new GoogleGenAI({ apiKey: apiKey });
  const prompt = `You are a neutral, highly knowledgeable Election Guide Assistant for India. 
  The user is speaking in language code: ${lang}. State context: ${userState}.
  Answer the following question simply, factually, and without political bias. Do not use markdown headers, keep it conversational.
  User Question: ${inputText}`;

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request timed out")), 15000) // 15s timeout
    );
    
    const apiPromise = ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);
    
    if (!response || !response.text) {
      throw new Error("Malformed response from AI service");
    }
    
    return response.text;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
