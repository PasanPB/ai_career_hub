import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-2.5-flash";

async function callGemini(prompt: string, temperature = 0.2): Promise<string> {
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

  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GEMINI_ERROR:${res.status}:${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return (data.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/```json|```/g, "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const { role, country } = await req.json();

    const prompt = `You are a compensation expert with deep knowledge of ${country}'s tech job market.
Provide accurate salary data and career insights for a ${role} in ${country}.
Return ONLY valid JSON — no markdown, no extra text, no code fences.

{
  "currency": "<currency code e.g. USD, LKR, GBP, AUD, EUR, SGD, AED>",
  "entry": { "min": <annual number>, "max": <annual number> },
  "mid": { "min": <annual number>, "max": <annual number> },
  "senior": { "min": <annual number>, "max": <annual number> },
  "marketOutlook": {
    "trend": "<Growing|Stable|Declining>",
    "reason": "<1-2 sentences on market trend>"
  },
  "remoteMultiplier": <decimal e.g. 1.3 means +30%, 1.0 means no change>,
  "requiredSkills": ["<skill 1>", "<skill 2>", "<skill 3>", "<skill 4>", "<skill 5>", "<skill 6>"],
  "careerTips": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "topCompanies": ["<company 1>", "<company 2>", "<company 3>", "<company 4>", "<company 5>"],
  "certifications": [
    { "name": "<cert name>", "salaryBump": "<e.g. +15%>" },
    { "name": "<cert name>", "salaryBump": "<e.g. +12%>" },
    { "name": "<cert name>", "salaryBump": "<e.g. +8%>" }
  ],
  "careerPath": [
    { "title": "<entry title>", "yearsExp": "0-2 years", "avgSalary": "<formatted>" },
    { "title": "<mid title>", "yearsExp": "2-5 years", "avgSalary": "<formatted>" },
    { "title": "<senior title>", "yearsExp": "5-8 years", "avgSalary": "<formatted>" },
    { "title": "<lead title>", "yearsExp": "8+ years", "avgSalary": "<formatted>" }
  ]
}

Use realistic current market rates. For Sri Lanka use LKR. For US/Canada/Australia use their local currency.`;

    const text = await callGemini(prompt, 0.2);
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("salary-guide error:", err.message);
    if (err.message === "RATE_LIMIT") {
      return NextResponse.json(
        { error: "The AI service is busy. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Failed to fetch salary data. Please try again." }, { status: 500 });
  }
}