"use client";
import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { generateInterviewQuestions } from "@/lib/ai";

const roles = ["Data Scientist", "Data Analyst", "Software Engineer", "Business Analyst", "Product Manager", "ML Engineer", "DevOps Engineer", "UX Designer"];
const levels = ["Fresher", "Junior", "Mid-level", "Senior"];
const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

type TechQ = { question: string; answer: string; difficulty: string };
type HrQ = { question: string; answer: string };
type Result = { technical: TechQ[]; hr: HrQ[] };

function AccordionItem({ question, answer, tag }: { question: string; answer: string; tag?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3 pr-4">
          {tag && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0 ${difficultyColors[tag] || "bg-slate-100 text-slate-600"}`}>
              {tag}
            </span>
          )}
          <span className="font-medium text-slate-900 text-sm">{question}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-4 bg-blue-50 border-t border-slate-200">
          <p className="text-sm text-slate-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function InterviewPrep() {
  const [role, setRole] = useState("Data Scientist");
  const [level, setLevel] = useState("Fresher");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await generateInterviewQuestions(role, level);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Interview Prep</h1>
        </div>
        <p className="text-slate-600">Generate technical and HR interview questions tailored to your role and experience level.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
            >
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
            >
              {levels.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Generating questions…</> : "Generate Interview Questions"}
        </button>
      </div>

      {result && !loading && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-violet-600 text-white text-xs font-bold flex items-center justify-center">T</span>
              Technical Questions
            </h2>
            <div className="space-y-3">
              {result.technical.map((q, i) => (
                <AccordionItem key={i} question={q.question} answer={q.answer} tag={q.difficulty} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-600 text-white text-xs font-bold flex items-center justify-center">H</span>
              HR / Behavioral Questions
            </h2>
            <div className="space-y-3">
              {result.hr.map((q, i) => (
                <AccordionItem key={i} question={q.question} answer={q.answer} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
