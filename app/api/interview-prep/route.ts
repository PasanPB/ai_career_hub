import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, level } = await req.json();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate interview questions for a ${level} ${role}. Return ONLY valid JSON with no extra text:
{"technical":[{"question":string,"answer":string,"difficulty":"Easy"|"Medium"|"Hard"}],"hr":[{"question":string,"answer":string}]}`
          }]
        }],
        generationConfig: { temperature: 0.7 }
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
  return NextResponse.json(JSON.parse(text));
}