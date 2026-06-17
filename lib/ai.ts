// AI service functions — call server-side API routes (Gemini) with client-side fallbacks

export async function analyzeCv(cvText: string) {
  try {
    const res = await fetch("/api/analyze-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvText }),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("analyzeCv error:", err);
    return getMockCvResult();
  }
}

export async function generateInterviewQuestions(role: string, level: string) {
  try {
    const res = await fetch("/api/interview-prep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, level }),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("generateInterviewQuestions error:", err);
    return getMockInterviewResult(role, level);
  }
}

export async function getSalaryInsights(role: string, country: string) {
  try {
    const res = await fetch("/api/salary-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, country }),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("getSalaryInsights error:", err);
    return getMockSalaryResult(role, country);
  }
}

export async function generateCareerRecommendation(answers: Record<number, number>) {
  try {
    const res = await fetch("/api/career-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("generateCareerRecommendation error:", err);
    return { title: "Software Engineer", emoji: "💻", desc: "A technical career.", skills: ["Python", "APIs"], href: "/salary-guide" };
  }
}

export async function generateBlog(topic: string) {
  try {
    const res = await fetch("/api/generate-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("generateBlog error:", err);
    return null;
  }
}

// --- Mock fallbacks ---
function getMockCvResult() {
  return {
    score: 72,
    strengths: [
      "Clear, chronological work history",
      "Relevant technical skills prominently listed",
      "Education section well-structured",
    ],
    weaknesses: [
      "No quantifiable achievements (e.g., % improvements, revenue impact)",
      "Summary section is generic — lacks a unique value proposition",
      "No links to portfolio, GitHub, or LinkedIn",
    ],
    improvements: [
      "Add metrics: 'Improved API response time by 40%' instead of 'Improved performance'",
      "Include a 2–3 sentence professional summary tailored to your target role",
      "Add your GitHub or portfolio URL near your contact info",
    ],
    atsOptimization: [
      "Include keywords from job descriptions (e.g., 'REST APIs', 'Agile', 'SQL')",
      "Avoid tables or columns — ATS systems often can't parse them",
      "Use standard section headings: Experience, Education, Skills",
    ],
    missingSkills: ["Docker / Kubernetes", "Cloud platform (AWS/GCP/Azure)", "System design knowledge"],
  };
}

function getMockInterviewResult(role: string, level: string) {
  return {
    technical: [
      {
        question: `What is the core difference between supervised and unsupervised learning?`,
        answer: `Supervised learning trains on labeled data to predict outputs; unsupervised learning finds hidden patterns in unlabeled data. For a ${level} ${role}, you should give examples from real projects.`,
        difficulty: "Medium",
      },
      {
        question: "Explain how you would handle missing data in a dataset.",
        answer: "Options include imputation (mean, median, mode, or model-based), deletion, or flagging missing values as a separate category. The right approach depends on the data's distribution and how much is missing.",
        difficulty: "Easy",
      },
      {
        question: "What is overfitting and how do you prevent it?",
        answer: "Overfitting is when a model learns noise in training data and fails to generalize. Prevention: cross-validation, regularization (L1/L2), dropout (neural nets), pruning, or collecting more data.",
        difficulty: "Hard",
      },
    ],
    hr: [
      {
        question: "Tell me about a time you dealt with a difficult team member.",
        answer: "Use the STAR method: describe the Situation, Task, Action you took, and Result. Focus on communication and constructive resolution.",
      },
      {
        question: "Where do you see yourself in 5 years?",
        answer: "Show ambition aligned with the company's growth. Mention specific skills you plan to develop and how they map to impact in the role.",
      },
      {
        question: "Why are you leaving your current job?",
        answer: "Keep it positive. Focus on seeking new challenges, growth opportunities, or a better cultural fit — avoid criticizing your current employer.",
      },
    ],
  };
}

function getMockSalaryResult(role: string, country: string) {
  const lkData = {
    currency: "LKR",
    entry: { min: 60000, max: 100000 },
    mid: { min: 120000, max: 220000 },
    senior: { min: 250000, max: 500000 },
    requiredSkills: ["Python / R", "SQL", "Data visualization", "Statistics", "Machine Learning basics"],
    careerTips: [
      "Get certified: Google Data Analytics or IBM Data Science certificates significantly boost early salaries",
      "Build a portfolio on Kaggle or GitHub with 3–5 real projects",
      "Remote roles from US/EU companies pay 3–5× local market rates",
    ],
  };
  const globalData = {
    currency: "USD",
    entry: { min: 65000, max: 90000 },
    mid: { min: 95000, max: 140000 },
    senior: { min: 145000, max: 220000 },
    requiredSkills: ["Python", "SQL", "Machine Learning", "Cloud (AWS/GCP)", "Communication"],
    careerTips: [
      "Specialize in a domain (finance, healthcare, e-commerce) to command premium rates",
      "Senior roles increasingly require leadership and cross-functional communication",
      "US salaries are highest but competition is intense — strong portfolio is essential",
    ],
  };
  return country.toLowerCase().includes("sri lanka") || country.toLowerCase() === "lk" ? lkData : globalData;
}
