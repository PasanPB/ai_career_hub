export const metadata = {
  title: "Contact – AI Career Helper Hub",
  description: "Get in touch with the AI Career Helper Hub team.",
};

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
      <p className="text-slate-600 mb-10">Have a question, feedback, or partnership inquiry? We&apos;d love to hear from you.</p>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
          <input type="text" placeholder="Your name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
          <textarea rows={5} placeholder="Your message…" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
        </div>
        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          Send Message
        </button>
      </div>
      <p className="mt-6 text-sm text-slate-500 text-center">
        You can also reach us at <a href="mailto:hello@aicareerhub.com" className="text-blue-600 hover:underline">hello@aicareerhub.com</a>
      </p>
    </div>
  );
}
