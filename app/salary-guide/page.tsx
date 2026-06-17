"use client";
import { useState } from "react";
import { TrendingUp, Loader2, CheckCircle, Lightbulb } from "lucide-react";
import { getSalaryInsights } from "@/lib/ai";

const roles = ["Data Scientist", "Data Analyst", "Software Engineer", "Business Analyst", "Product Manager", "ML Engineer", "DevOps Engineer", "UX Designer", "Full Stack Developer"];
const countries = ["Sri Lanka", "United States", "United Kingdom", "Australia", "Germany", "Canada", "India", "Singapore", "UAE"];

type SalaryResult = {
  currency: string;
  entry: { min: number; max: number };
  mid: { min: number; max: number };
  senior: { min: number; max: number };
  requiredSkills: string[];
  careerTips: string[];
};

function formatSalary(n: number, currency: string) {
  if (currency === "LKR") return `LKR ${(n / 1000).toFixed(0)}K`;
  return `$${(n / 1000).toFixed(0)}K`;
}

export default function SalaryGuide() {
  const [role, setRole] = useState("Data Scientist");
  const [country, setCountry] = useState("Sri Lanka");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);

  async function handleSearch() {
    setLoading(true);
    try {
      const data = await getSalaryInsights(role, country);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  const levels = [
    { label: "Entry Level", range: result?.entry, color: "bg-blue-50 border-blue-200", bar: "bg-blue-500", pct: 40 },
    { label: "Mid Level", range: result?.mid, color: "bg-violet-50 border-violet-200", bar: "bg-violet-500", pct: 65 },
    { label: "Senior Level", range: result?.senior, color: "bg-emerald-50 border-emerald-200", bar: "bg-emerald-500", pct: 100 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Salary Guide</h1>
        </div>
        <p className="text-slate-600">Discover real salary ranges for your role and country, with required skills and growth tips.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleSearch} disabled={loading}
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Fetching data…</> : "Get Salary Insights"}
        </button>
      </div>

      {result && !loading && (
        <div className="space-y-6">
          {/* Salary table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">
                {role} Salary in {country}
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {levels.map((lv) => (
                <div key={lv.label} className={`px-6 py-5 ${lv.color} border-l-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-800 text-sm">{lv.label}</span>
                    <span className="font-bold text-slate-900">
                      {lv.range ? `${formatSalary(lv.range.min, result.currency)} – ${formatSalary(lv.range.max, result.currency)}` : "—"}
                      <span className="text-xs text-slate-500 font-normal ml-1">/ year</span>
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                    <div className={`h-full ${lv.bar} rounded-full`} style={{ width: `${lv.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Required skills */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-slate-900">Required Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.requiredSkills.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-200">{s}</span>
                ))}
              </div>
            </div>

            {/* Career tips */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900">Career Growth Tips</h3>
              </div>
              <ul className="space-y-3">
                {result.careerTips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-amber-500 font-bold mt-0.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
