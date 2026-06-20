import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-2.5-flash";

async function callGemini(prompt: string, temperature = 0.4): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature, maxOutputTokens: 2048 },
      }),
    }
  );

  if (res.status === 429) {
    throw new Error("RATE_LIMIT");
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GEMINI_ERROR:${res.status}:${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text.replace(/```json|```/g, "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const { cvText } = await req.json();
    if (!cvText || cvText.length < 100) {
      return NextResponse.json({ error: "CV text too short" }, { status: 400 });
    }

    const prompt = `You are a world-class HR consultant and career coach with 20 years of experience.
Analyze the following CV/resume in detail and return ONLY a valid JSON object — no markdown, no extra text, no code fences.

Required JSON structure:
{
  "score": <overall score 0-100>,
  "subScores": {
    "structure": <0-100, layout, formatting, readability>,
    "content": <0-100, depth of experience, achievements>,
    "ats": <0-100, ATS keyword optimization>,
    "impact": <0-100, quantified achievements>
  },
  "detectedRole": "<primary job title this CV targets>",
  "detectedLevel": "<one of: Fresher | Junior | Mid-level | Senior | Lead | Executive>",
  "summary": "<2-sentence personalized summary of this candidate>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "improvements": [
    "<specific actionable improvement 1 with example>",
    "<specific actionable improvement 2 with example>",
    "<specific actionable improvement 3 with example>",
    "<specific actionable improvement 4 with example>"
  ],
  "atsOptimization": [
    "<ATS tip 1 specific to this CV>",
    "<ATS tip 2>",
    "<ATS tip 3>"
  ],
  "missingSkills": ["<skill 1>", "<skill 2>", "<skill 3>", "<skill 4>", "<skill 5>"],
  "topKeywords": ["<keyword 1>", "<keyword 2>", "<up to 12 keywords found in the CV>"],
  "recommendedRoles": [
    { "role": "<role title>", "match": "High", "reason": "<1 sentence>" },
    { "role": "<role title>", "match": "High", "reason": "<1 sentence>" },
    { "role": "<role title>", "match": "Medium", "reason": "<1 sentence>" }
  ]
}

CV to analyze:
${cvText.slice(0, 8000)}`;

    const text = await callGemini(prompt, 0.3);
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("analyze-cv error:", err.message);
    if (err.message === "RATE_LIMIT") {
      return NextResponse.json(
        { error: "The AI service is busy. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}