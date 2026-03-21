import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { message, history, systemInstruction, language } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'API Key not configured on server' }), { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction
        });

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
    }
}
