import Link from "next/link";
import { FileText, MessageSquare, TrendingUp, Brain, ArrowRight, CheckCircle, Star } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "CV Analyzer",
    desc: "Get your CV scored out of 100 with detailed feedback on strengths, weaknesses, and ATS optimization tips.",
    href: "/cv-checker",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    desc: "Generate technical and HR questions tailored to your job role and experience level, with suggested answers.",
    href: "/interview-prep",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    desc: "Discover realistic salary ranges for any role by country, with required skills and career growth tips.",
    href: "/salary-guide",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Brain,
    title: "Career Quiz",
    desc: "Answer 10 questions about your interests and personality to discover which tech career suits you best.",
    href: "/career-quiz",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
  },
];

const stats = [
  { value: "50K+", label: "CVs analyzed" },
  { value: "200K+", label: "Interview questions generated" },
  { value: "120+", label: "Countries supported" },
  { value: "4.8★", label: "Average rating" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient px-4 pt-20 pb-28 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8 shadow-sm">
            <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
            Trusted by 50,000+ job seekers worldwide
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            AI Career Helper <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get instant CV feedback, tailored interview questions, and salary insights — powered by AI, designed for real job seekers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cv-checker"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              Analyze My CV <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/interview-prep"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
            >
              Generate Interview Questions
            </Link>
            <Link
              href="/salary-guide"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
            >
              View Salary Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-blue-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need to land your dream job</h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Four powerful AI tools, completely free. No sign-up required to get started.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="card-hover group p-8 bg-white rounded-2xl border border-slate-200 flex gap-5"
            >
              <div className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0`}>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center`}>
                  <f.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                  Try now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How it works</h2>
          <p className="text-slate-600 text-lg mb-16">Three steps to a better career outcome</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste or upload", desc: "Share your CV text, pick a job role, or answer a few questions." },
              { step: "2", title: "AI analyzes instantly", desc: "Our AI processes your input and generates structured, actionable feedback." },
              { step: "3", title: "Take action", desc: "Apply the insights, improve your CV, and walk into interviews confident." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white text-xl font-extrabold flex items-center justify-center mb-5 shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">About AI Career Helper Hub</h2>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
          <p>
            AI Career Helper Hub is a free, AI-powered platform built to help students, fresh graduates, and experienced professionals navigate their career journey more effectively. Whether you&apos;re applying for your first job or making a career change, our suite of tools gives you a competitive edge.
          </p>
          <p>
            Our <strong>CV Analyzer</strong> uses advanced language models to evaluate your resume against real hiring criteria — checking for ATS compatibility, keyword density, formatting issues, and missing skills. You receive a score out of 100 along with specific, actionable improvements.
          </p>
          <p>
            The <strong>Interview Question Generator</strong> creates role-specific technical and behavioral questions, complete with suggested answers. Our <strong>Salary Guide</strong> provides up-to-date compensation data for roles across 120+ countries. And the <strong>Career Quiz</strong> helps you identify which tech career path best fits your interests and strengths.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6 not-prose">
            {[
              "Free to use, no sign-up required",
              "AI-powered, not templates",
              "Covers 50+ job roles",
              "Salary data for 120+ countries",
              "ATS-optimized CV feedback",
              "Updated interview questions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to level up your career?</h2>
        <p className="text-blue-100 mb-8">Start with a free CV analysis — takes under 30 seconds.</p>
        <Link
          href="/cv-checker"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-xl"
        >
          Analyze My CV Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
