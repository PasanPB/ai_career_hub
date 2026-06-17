import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, country } = await req.json();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Provide salary data for ${role} in ${country}. Return ONLY valid JSON with no extra text:
{"currency":string,"entry":{"min":number,"max":number},"mid":{"min":number,"max":number},"senior":{"min":number,"max":number},"requiredSkills":string[],"careerTips":string[]}`
          }]
        }],
        generationConfig: { temperature: 0.3 }
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
  return NextResponse.json(JSON.parse(text));
}