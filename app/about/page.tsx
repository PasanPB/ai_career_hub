export const metadata = {
  title: "About – AI Career Helper Hub",
  description: "Learn about AI Career Helper Hub — our mission, story, and the team behind the platform.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">About AI Career Helper Hub</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p className="text-xl text-slate-700">
          We built AI Career Helper Hub to give every job seeker access to the kind of personalized career guidance that used to require expensive coaches or insider connections.
        </p>
        <p>
          Our platform uses advanced AI to analyze CVs against real hiring criteria, generate role-specific interview questions, surface accurate salary data, and help people discover which career path fits their strengths and interests.
        </p>
        <p>
          We started with a simple observation: job seekers in developing markets — particularly students in Sri Lanka, India, and Southeast Asia — were applying for competitive global roles without feedback, preparation, or market awareness. We wanted to fix that.
        </p>
        <p>
          All our core tools are free. We believe career guidance shouldn&apos;t be a privilege.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Mission</h2>
        <p>
          To democratize access to career intelligence — giving every job seeker the feedback, preparation, and market knowledge they need to compete confidently.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Technology</h2>
        <p>
          AI Career Helper Hub is built on Claude, Anthropic&apos;s AI system. Our prompts are carefully designed to produce structured, actionable outputs — not generic advice. We continuously refine them based on user feedback and real hiring outcomes.
        </p>
      </div>
    </div>
  );
}
