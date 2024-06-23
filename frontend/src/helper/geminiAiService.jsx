import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        response_mime_type: "application/json"
    }
});

export const getCompletion = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text
};


