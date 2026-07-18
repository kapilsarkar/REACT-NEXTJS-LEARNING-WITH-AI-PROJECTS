import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateInterviewQuestions = async ({
  role,
  experience,
  difficulty,
  questionCount,
}) => {
  try {
    const prompt = `
You are a senior React interviewer conducting a realistic technical interview.

Generate exactly ${questionCount} high-quality interview questions for this candidate:

Role: ${role}
Experience level: ${experience}
Difficulty level: ${difficulty}

Question requirements:
- Focus on React and relevant modern frontend concepts: JSX, components, props, state, hooks, rendering, useEffect, forms, lists and keys, performance, state management, API/data fetching, routing, testing, accessibility, and debugging.
- Match topics to the selected role. For example:
  - React Developer / Frontend Developer: prioritize React, browser behavior, accessibility, CSS, and frontend performance.
  - MERN Developer: include React integration with REST APIs, authentication, Node/Express, and MongoDB concepts where relevant.
  - Full Stack Developer (Next.js): include React, Next.js rendering, routing, server/client components, API integration, and performance where relevant.
- Match depth to the candidate:
  - Fresher: core concepts and simple practical examples.
  - Junior: hooks, component composition, data fetching, debugging, and common implementation decisions.
  - Mid-Level: architecture, performance, trade-offs, scalability, complex state, and production debugging.
- Match difficulty:
  - Beginner: clear conceptual and small implementation questions.
  - Intermediate: practical scenarios, debugging, and trade-off questions.
  - Advanced: architecture, performance, rendering behavior, and production-level scenarios.
- Make every question specific, concise, and answerable in an interview.
- Do not repeat topics or ask nearly identical questions.
- Do not ask yes/no questions.
- Include at least one realistic debugging or scenario-based question when questionCount is 3 or more.
- Ask only questions. Do not include answers, hints, explanations, headings, categories, or metadata.

Output rules:
- Return ONLY a valid JSON array.
- Do not use Markdown or code fences.
- The array must contain exactly ${questionCount} objects.
- Each object must contain only these fields: "id" and "question".
- "id" must be a unique integer starting at 1 and increasing sequentially.

Required JSON format:

[
  {
    "id": 1,
    "question": "Question text"
  }
]
`;
    const MODEL = "gemini-3-flash-preview";
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);

    throw new Error("Failed to generate interview questions.", { cause: error });
  }
};