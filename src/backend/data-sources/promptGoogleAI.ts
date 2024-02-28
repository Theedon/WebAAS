import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentStreamResult,
} from "@google/generative-ai";

export const promptGoogleAI = async (
  prompt: string,
  stream = false,
): Promise<string | GenerateContentStreamResult> => {
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_API_KEY as string,
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const generationConfig = {
    temperature: 0.5,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];
  const parts = [{ text: prompt }];

  if (stream === true) {
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    return result;
  }

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  const response = result.response;
  const text = response.text();

  return text;
};
