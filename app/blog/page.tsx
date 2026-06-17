import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "what-is-data-scientist",
    title: "What Is a Data Scientist? Role, Skills & Salary",
    desc: "A complete guide to the Data Scientist role — responsibilities, required skills, tools, salary ranges, and how to start your career.",
    tags: ["Data Science", "Career Guide"],
    readTime: "7 min",
  },
  {
    slug: "what-is-business-analyst",
    title: "What Is a Business Analyst? A Beginner's Guide",
    desc: "Understand the Business Analyst role, day-to-day responsibilities, key tools like Jira and Confluence, and how to break in.",
    tags: ["Business Analysis", "Career Guide"],
    readTime: "6 min",
  },
  {
    slug: "data-analyst-skills",
    title: "Top 10 Skills Every Data Analyst Needs in 2025",
    desc: "From SQL and Python to Power BI and storytelling — the skills that separate entry-level analysts from senior professionals.",
    tags: ["Data Analytics", "Skills"],
    readTime: "5 min",
  },
];

export const metadata = {
  title: "Blog – AI Career Helper Hub",
  description: "Career guides, skill breakdowns, and job market insights for tech professionals.",
};

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Career Guides & Resources</h1>
        <p className="text-slate-600 text-lg">In-depth articles on tech careers, skills, and job market trends.</p>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="card-hover block bg-white rounded-2xl border border-slate-200 p-6 group">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded">{t}</span>
              ))}
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded">{post.readTime} read</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{post.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{post.desc}</p>
            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium gap-1 group-hover:gap-2 transition-all">
              Read guide <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
