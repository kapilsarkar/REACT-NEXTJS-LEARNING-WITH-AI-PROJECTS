import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const MODEL = "gemini-3.1-flash-lite";

const cleanJsonResponse = (text) =>
  text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

export const evaluateInterview = async ({
  questions,
  answers,
  role,
  experience,
}) => {
  const interviewTranscript = questions.map((item, index) => ({
    question: item.question,
    answer: answers[index] ?? "",
  }));

  const prompt = `
You are a senior technical interviewer evaluating a completed interview.

Candidate role: ${role}
Candidate experience level: ${experience}

Interview transcript:
${JSON.stringify(interviewTranscript, null, 2)}

Evaluate the candidate fairly and specifically from the provided answers only.
Do not assume knowledge or experience that is not demonstrated in the transcript.
Score each numeric category as an integer from 0 to 100.
Provide concise, practical feedback.

Output rules:
- Return ONLY valid JSON.
- Do not use Markdown, code fences, headings, or explanatory text outside the JSON.
- Use exactly this JSON shape and no additional keys:

{
  "overallScore": 0,
  "communication": 0,
  "technicalKnowledge": 0,
  "problemSolving": 0,
  "strengths": [],
  "weaknesses": [],
  "learningRoadmap": [],
  "summary": ""
}

Array requirements:
- strengths: 2 to 4 concise strengths demonstrated in the answers.
- weaknesses: 2 to 4 specific improvement areas.
- learningRoadmap: 3 to 5 actionable next steps, ordered by priority.
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty evaluation.");
    }

    const cleaned = cleanJsonResponse(response.text);

    let evaluation;

    try {
      evaluation = JSON.parse(cleaned);
    } catch (err) {
      console.error("Raw Gemini Response:");
      console.log(response.text);

      console.error("Cleaned Response:");
      console.log(cleaned);

      for (let i = 1120; i < 1170; i++) {
        console.log(
  JSON.stringify(
    cleaned.substring(1100, 1190)
  )
);
      }
      throw new Error("Gemini returned invalid JSON.", { cause: err });
    }

    const requiredScores = [
      "overallScore",
      "communication",
      "technicalKnowledge",
      "problemSolving",
    ];

    const hasValidScores = requiredScores.every(
      (key) =>
        Number.isInteger(evaluation[key]) &&
        evaluation[key] >= 0 &&
        evaluation[key] <= 100,
    );

    if (
      !hasValidScores ||
      !Array.isArray(evaluation.strengths) ||
      !Array.isArray(evaluation.weaknesses) ||
      !Array.isArray(evaluation.learningRoadmap) ||
      typeof evaluation.summary !== "string"
    ) {
      throw new Error("Gemini returned an invalid evaluation format.");
    }

    return evaluation;
  } catch (error) {
    console.error("Gemini evaluation error:", error);
    throw new Error("Failed to evaluate the interview.", { cause: error });
  }
};
