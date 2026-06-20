import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-2.5-flash";

async function callGemini(prompt: string, temperature = 0.7): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature, maxOutputTokens: 4096 },
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
    const { role, level, companyType = "General" } = await req.json();

    const prompt = `You are a senior technical interviewer and career coach specializing in ${role} roles.
Generate a comprehensive interview preparation guide for a ${level} ${role} at a ${companyType} company.
Return ONLY valid JSON — no markdown, no extra text, no code fences.

{
  "technical": [
    {
      "topic": "<topic area e.g. System Design, Algorithms, SQL>",
      "question": "<specific realistic technical interview question>",
      "answer": "<thorough expert-level answer with examples>",
      "tip": "<insider tip to impress the interviewer>",
      "difficulty": "<Easy|Medium|Hard>"
    }
  ],
  "hr": [
    {
      "question": "<behavioral/HR question>",
      "answer": "<detailed answer framework using STAR method>",
      "starExample": "<concrete STAR example answer>"
    }
  ],
  "interviewTips": ["<specific actionable tip for ${level} ${role} at ${companyType}>"],
  "topicsToRevise": [{ "topic": "<topic>", "priority": "<High|Medium|Low>" }]
}

Requirements:
- Exactly 8 technical questions covering different topics, mix of Easy/Medium/Hard
- Exactly 5 HR/behavioral questions
- Exactly 5 interviewTips
- Exactly 6 topicsToRevise
- Questions must be specific and realistic, not generic
- Answers at least 3-4 sentences
- Calibrate for ${level}: ${
      level === "Fresher" ? "focus on fundamentals and theory" :
      level === "Junior" ? "focus on practical coding basics" :
      level === "Mid-level" ? "focus on design patterns and ownership" :
      "focus on system design, leadership, and tradeoffs"
    }`;

    const text = await callGemini(prompt, 0.7);
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("interview-prep error:", err.message);
    if (err.message === "RATE_LIMIT") {
      return NextResponse.json(
        { error: "The AI service is busy. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}