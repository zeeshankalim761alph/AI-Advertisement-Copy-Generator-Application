import { GoogleGenAI, Type } from "@google/genai";
import { AdRequestData, AdResponseData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdCopy = async (data: AdRequestData): Promise<AdResponseData> => {
  const modelName = 'gemini-3-flash-preview';

  const prompt = `
    You are an expert marketing copywriter. Create a high-converting advertisement based on the following details:
    
    Product/Service Name: ${data.productName}
    Product Description: ${data.description}
    Target Audience: ${data.targetAudience}
    Platform: ${data.platform}
    Tone: ${data.tone}
    Length: ${data.length}

    The copy must be original, engaging, and tailored specifically to the ${data.platform} format and the selected tone.
    Ensure there is a strong hook/headline and a clear Call to Action (CTA).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: {
              type: Type.STRING,
              description: "The main hook or title of the ad.",
            },
            body: {
              type: Type.STRING,
              description: "The main content text of the advertisement.",
            },
            callToAction: {
              type: Type.STRING,
              description: "A short, punchy phrase instructing the user what to do next.",
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Relevant hashtags for the platform (if applicable).",
            },
            explanation: {
              type: Type.STRING,
              description: "A brief explanation of why this copy works for this audience/platform.",
            }
          },
          required: ["headline", "body", "callToAction", "hashtags", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini.");
    }

    return JSON.parse(text) as AdResponseData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate ad copy. Please try again.");
  }
};