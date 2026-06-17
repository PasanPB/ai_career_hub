import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { cvText } = await req.json();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert HR consultant. Analyze this CV and return ONLY valid JSON with no extra text or markdown:
{"score":number,"strengths":string[],"weaknesses":string[],"improvements":string[],"atsOptimization":string[],"missingSkills":string[]}

CV:
${cvText}`
          }]
        }],
        generationConfig: { temperature: 0.4 }
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
  return NextResponse.json(JSON.parse(text));
}