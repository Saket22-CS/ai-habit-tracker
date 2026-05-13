import { GoogleGenAI } from "@google/genai";

let client = null;

const getClient = () => {
  if (client) {
    return client;
  }

  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return null;
  }

  client = new GoogleGenAI({
    apiKey: key,
  });

  return client;
};

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export const isAIEnabled = () => !!process.env.GEMINI_API_KEY;

export const parseJSON = (text) => {
  let cleaned = (text || "").trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?$/g, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```\n?/g, "");
  }

  return JSON.parse(cleaned.trim());
};

export const chatCompletion = async ({
  system,
  user,
  temperature = 0.7,
}) => {
  const c = getClient();

  if (!c) {
    return {
      ok: false,
      content:
        "AI features are disabled. Set GEMINI_API_KEY in the backend .env file to enable real AI responses.",
    };
  }

  try {
    const res = await c.models.generateContent({
      model: MODEL,
      contents: user,
      config: {
        systemInstruction: system,
        temperature,
      },
    });

    return {
      ok: true,
      content: (res.text || "").trim(),
    };
  } catch (err) {
    console.error("AI error:", err.message);

    return {
      ok: false,
      content:
        "AI request failed. Please try again later.",
    };
  }
};

export const SYSTEM_PROMPTS = {
    weekly:
    "You are a warm, encouraging habit coach. Analyse the user's last 7 days of habit data and write a short personalised report (120-180 words). Mention: what went well, what struggled, patterns noticed, and one specific piece of encouragement. Use the user's actual habit names. Be human, not generic. No markdown headers - use plain prose with line breaks.",
    suggestion:
    "You are a helpful habit coach. Based on the user's goals, productive time, and past struggles, suggest exactly 3 personalised habits. Return valid JSON only with this shape:{\"suggestions\":[{\"name\":\"...\",\"description\":\"...\",\"frequency\":\"daily|weekly\",\"category\":\"Health|Fitness|Learning|Mindfulness|Productivity|Social|Finance|Creative|Other\",icon\":\<emoji>\",\"reason\":\"...\"}]}. No prose outside JSON",
    recovery:
    "You are a compassionate habit coach. The user broke a streak. Write a 3-day recovery plan tailored to this specific habit. Be warm but actionable. use this structure. Use this structure: short empathetic opening (1-2 sentences), then Day 1 / Day 2 /Day 3 sections with one concrete action each, then a closing line of encouragement. 150-200 words total.",
    chat:
    "You are a helpful habit analysis assistant. Answer the user's question using ONLY the provided habit data as content. Be specific - cite actual names, days, percentage. keep replies under 120 words. If the data is insufficient, say no briefly.",
    morning:
    "You are a thoughtful and motivating habit coach. Write one short morning motivation message (30-60 words) based on the user's real habits and streaks. Mention 1-2 specific habits naturally. Sound supportive, focused, and energetic without being cheesy. Do NOT say 'Good morning'. Do NOT greet the user. Avoid generic motivational quotes. Maximum 1 emoji.",
};