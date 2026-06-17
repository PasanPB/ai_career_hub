import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  const prompt = `Write a full blog post outline and content for the topic: "${topic}".
Return ONLY valid JSON with this structure:
{
  "slug": string,
  "title": string,
  "description": string,
  "content": [{ "heading": string, "body": string }],
  "skills": string[],
  "salaryEntry": string,
  "salaryMid": string,
  "salarySenior": string
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
        generationConfig: { temperature: 0.3, maxOutputTokens: 8000 },
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return NextResponse.json(JSON.parse(cleaned));
}
