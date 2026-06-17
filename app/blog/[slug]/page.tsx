import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string;
  description: string;
  content: { heading: string; body: string }[];
  skills: string[];
  salaryEntry: string;
  salaryMid: string;
  salarySenior: string;
}> = {
  "what-is-data-scientist": {
    title: "What Is a Data Scientist?",
    description: "A data scientist uses statistics, programming, and machine learning to extract insights from complex data and drive business decisions.",
    content: [
      {
        heading: "What does a Data Scientist do?",
        body: "Data Scientists collect, clean, and analyze large datasets to solve real business problems. They build machine learning models, run statistical experiments (A/B testing), and communicate findings to non-technical stakeholders through visualizations and reports.",
      },
      {
        heading: "Key Responsibilities",
        body: "Typical responsibilities include data collection and preprocessing, exploratory data analysis (EDA), building predictive models, deploying ML pipelines, collaborating with engineering and product teams, and presenting findings to leadership.",
      },
      {
        heading: "Career Path",
        body: "Most data scientists start as analysts or engineers before moving into specialized DS roles. Senior data scientists often grow into Lead DS, Staff DS, or management roles such as Head of Data Science or Chief Data Officer.",
      },
    ],
    skills: ["Python / R", "SQL", "Machine Learning", "Statistics", "TensorFlow / PyTorch", "Data Visualization", "Communication"],
    salaryEntry: "LKR 80K–150K / $65K–90K",
    salaryMid: "LKR 180K–350K / $95K–140K",
    salarySenior: "LKR 400K–800K / $145K–220K",
  },
  "what-is-business-analyst": {
    title: "What Is a Business Analyst?",
    description: "A business analyst bridges the gap between business needs and technology solutions by gathering requirements, modeling processes, and driving stakeholder alignment.",
    content: [
      {
        heading: "What does a Business Analyst do?",
        body: "Business Analysts (BAs) work with stakeholders to understand business problems, document requirements, and translate them into specifications for development teams. They're the translators between business and IT.",
      },
      {
        heading: "Key Responsibilities",
        body: "Core tasks include requirements elicitation and documentation, process modeling (using tools like BPMN), user story writing for Agile teams, gap analysis, stakeholder management, and UAT (User Acceptance Testing) coordination.",
      },
      {
        heading: "Career Path",
        body: "BAs often progress from Junior BA → Senior BA → Lead BA or Product Manager. Many also move into Product Ownership, Scrum Master, or Project Management roles. Domain expertise (finance, healthcare, logistics) significantly increases earning power.",
      },
    ],
    skills: ["Requirements Gathering", "Process Modeling", "SQL", "Jira / Confluence", "Agile / Scrum", "Stakeholder Management", "Excel"],
    salaryEntry: "LKR 60K–100K / $55K–75K",
    salaryMid: "LKR 120K–220K / $80K–110K",
    salarySenior: "LKR 250K–450K / $120K–160K",
  },
  "data-analyst-skills": {
    title: "Top 10 Skills Every Data Analyst Needs",
    description: "The essential technical and soft skills that separate junior data analysts from senior professionals in 2025.",
    content: [
      {
        heading: "Technical Skills",
        body: "The non-negotiables: SQL (complex queries, window functions, optimization), Python or R for data manipulation, and at least one BI tool — Power BI, Tableau, or Looker. Solid Excel/Google Sheets skills are still surprisingly valuable. Statistics fundamentals (distributions, hypothesis testing, regression) are essential for interpreting data correctly.",
      },
      {
        heading: "Data Visualization & Storytelling",
        body: "Knowing what chart to use when, and how to present findings to a non-technical audience, is the skill that differentiates senior analysts. Tools like Figma or Canva are increasingly useful for polished executive reports. A clear, concise narrative matters more than technical complexity.",
      },
      {
        heading: "Soft Skills & Domain Knowledge",
        body: "Critical thinking, intellectual curiosity, and the ability to ask the right business questions are often what make or break an analyst's career trajectory. Domain expertise — whether in finance, marketing, operations, or healthcare — turns a good analyst into an irreplaceable one.",
      },
    ],
    skills: ["SQL", "Python", "Power BI / Tableau", "Excel", "Statistics", "Data Cleaning", "Communication", "Critical Thinking", "Git", "Cloud Basics"],
    salaryEntry: "LKR 50K–90K / $50K–70K",
    salaryMid: "LKR 100K–200K / $75K–110K",
    salarySenior: "LKR 220K–400K / $115K–155K",
  },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: `${post.title} – AI Career Helper Hub`, description: post.description };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="flex items-center gap-2 text-sm text-blue-600 mb-8 hover:text-blue-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{post.title}</h1>
      <p className="text-xl text-slate-600 mb-10 leading-relaxed">{post.description}</p>

      <div className="space-y-8 mb-12">
        {post.content.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{section.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-slate-900 mb-4">Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {post.skills.map((s) => (
            <span key={s} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-blue-800">{s}</span>
          ))}
        </div>
      </div>

      {/* Salary table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-10">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">Salary Ranges (LKR / USD per year)</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-slate-600 font-semibold">Level</th>
              <th className="px-6 py-3 text-left text-slate-600 font-semibold">Salary Range</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="px-6 py-3 text-slate-700">Entry Level</td><td className="px-6 py-3 text-slate-800 font-medium">{post.salaryEntry}</td></tr>
            <tr><td className="px-6 py-3 text-slate-700">Mid Level</td><td className="px-6 py-3 text-slate-800 font-medium">{post.salaryMid}</td></tr>
            <tr><td className="px-6 py-3 text-slate-700">Senior Level</td><td className="px-6 py-3 text-slate-800 font-medium">{post.salarySenior}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to start your career journey?</h3>
        <p className="text-blue-100 mb-5 text-sm">Use our free AI tools to analyze your CV and prepare for interviews.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/cv-checker" className="px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors">
            Analyze My CV
          </Link>
          <Link href="/interview-prep" className="px-5 py-2.5 bg-blue-500/30 text-white font-semibold rounded-xl text-sm hover:bg-blue-500/50 transition-colors">
            Generate Interview Questions
          </Link>
        </div>
      </div>
    </article>
  );
}
