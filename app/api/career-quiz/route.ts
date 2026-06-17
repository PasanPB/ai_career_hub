import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { answers } = await req.json();

  // Prompt includes the scoring mapping used by the client quiz
  const prompt = `A user completed an 8-question career quiz. Each answer is an index 0..3.
Map answers to scores using this mapping per question option:
Option 0 => se:+3, ds:+1, da:+0, ba:+0
Option 1 => se:+0, ds:+2, da:+3, ba:+1
Option 2 => se:+1, ds:+3, da:+1, ba:+0
Option 3 => se:+0, ds:+0, da:+1, ba:+3

Here are the user's answers as a JSON object (questionId: optionIndex):
${JSON.stringify(answers)}

Calculate the total scores and pick the highest career among se (Software Engineer), ds (Data Scientist), da (Data Analyst), ba (Business Analyst).
Return ONLY valid JSON with this structure:
{
  "key": "se" | "ds" | "da" | "ba",
  "title": string,
  "emoji": string,
  "desc": string,
  "skills": string[],
  "href": string
}
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] },
        ],
        generationConfig: { temperature: 0.2 },
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return NextResponse.json(JSON.parse(cleaned));
}
