"use client";
import { useState } from "react";
import { FileText, Upload, CheckCircle, AlertCircle, TrendingUp, Zap, BookOpen, Loader2 } from "lucide-react";
import { analyzeCv } from "@/lib/ai";

type CvResult = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  atsOptimization: string[];
  missingSkills: string[];
};

export default function CvChecker() {
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CvResult | null>(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  async function handleAnalyze() {
    return handleAnalyzeWithText(cvText);
  }

  async function handleAnalyzeWithText(text: string) {
    if (!text || !text.trim() || text.length < 100) {
      setError("Please paste at least 100 characters of your CV.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await analyzeCv(text);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const scoreColor =
    (result?.score ?? 0) >= 80 ? "text-emerald-600" : (result?.score ?? 0) >= 60 ? "text-amber-600" : "text-red-500";
  const scoreRing =
    (result?.score ?? 0) >= 80 ? "stroke-emerald-500" : (result?.score ?? 0) >= 60 ? "stroke-amber-500" : "stroke-red-500";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">CV Analyzer</h1>
        </div>
        <p className="text-slate-600">
          Paste your CV text below and get an AI-powered score, strengths, weaknesses, and ATS optimization tips instantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Paste your CV / Resume text
        </label>
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">Or upload a PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setError("");
              setFileName(file.name);
              setFileLoading(true);
              try {
                const arrayBuffer = await file.arrayBuffer();
                // Load PDF.js from CDN at runtime in the browser to avoid bundling/server issues
                let pdfjsLib: any = (window as any).pdfjsLib;
                if (!pdfjsLib) {
                  await new Promise<void>((resolve, reject) => {
                    const s = document.createElement("script");
                    s.src = "https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.min.js";
                    s.onload = () => resolve();
                    s.onerror = (e) => reject(e);
                    document.head.appendChild(s);
                  });
                  pdfjsLib = (window as any).pdfjsLib;
                }
                // Worker from CDN
                pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js";
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let text = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                  const page = await pdf.getPage(i);
                  const content = await page.getTextContent();
                  const strings = content.items.map((it: any) => it.str || "");
                  text += strings.join(" ") + "\n\n";
                }
                setCvText(text);
                // Auto-run analysis if extracted text looks sufficient
                if (text && text.length >= 100) {
                  handleAnalyzeWithText(text);
                }
              } catch (err) {
                console.error(err);
                setError("Failed to extract text from PDF. Try a different file.");
              } finally {
                setFileLoading(false);
              }
            }}
            className="w-full text-sm"
          />
          {fileLoading && <p className="text-xs text-slate-500 mt-2">Extracting text from PDF…</p>}
          {fileName && !fileLoading && <p className="text-xs text-slate-500 mt-2">Loaded: {fileName}</p>}
        </div>
        <textarea
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          placeholder="Paste your full CV here — including work experience, education, skills, and any other sections..."
          rows={12}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <Upload className="w-3 h-3" />
          <span>{cvText.length} characters · Minimum 100 required</span>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Analyzing your CV…
            </>
          ) : (
            "Analyze CV"
          )}
        </button>
      </div>

      {loading && (
        <div className="grid md:grid-cols-3 gap-4">
          {["Score", "Strengths", "Improvements"].map((label) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="shimmer h-4 w-20 rounded mb-4" />
              <div className="space-y-2">
                <div className="shimmer h-3 rounded" />
                <div className="shimmer h-3 w-4/5 rounded" />
                <div className="shimmer h-3 w-3/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          {/* Score */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(result.score / 100) * 327} 327`}
                  className={scoreRing}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold ${scoreColor}`}>{result.score}</span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">CV Score</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {result.score >= 80
                  ? "Excellent! Your CV is well-structured and ATS-friendly."
                  : result.score >= 60
                  ? "Good foundation — a few improvements will make a big difference."
                  : "Needs work. Follow the suggestions below to significantly improve your chances."}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-slate-900">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900">Weaknesses</h3>
              </div>
              <ul className="space-y-3">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-amber-500 font-bold mt-0.5">!</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-slate-900">Improvements</h3>
              </div>
              <ul className="space-y-3">
                {result.improvements.map((imp, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-blue-500 font-bold mt-0.5">{i + 1}.</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>

            {/* ATS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-violet-500" />
                <h3 className="font-bold text-slate-900">ATS Optimization</h3>
              </div>
              <ul className="space-y-3">
                {result.atsOptimization.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-violet-500 font-bold mt-0.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing skills */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-slate-900">Skills to Add</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.missingSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-lg border border-orange-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
