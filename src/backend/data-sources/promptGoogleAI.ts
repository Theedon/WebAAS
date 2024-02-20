import { GoogleGenerativeAI } from "@google/generative-ai";

export const promptGoogleAI = async (prompt: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_API_KEY as string,
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};
