export const metadata = {
  title: "Privacy Policy – AI Career Helper Hub",
  description: "Privacy Policy for AI Career Helper Hub. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated: January 2025</p>
      <div className="space-y-8 text-slate-600 leading-relaxed">
        {[
          {
            title: "1. Information We Collect",
            body: "We collect information you provide directly — such as CV text you paste into our analyzer, job roles you select, and messages you send through our contact form. We do not require account creation and do not collect personal identifying information unless you contact us.",
          },
          {
            title: "2. How We Use Your Information",
            body: "CV text and input data you provide are sent to our AI service to generate analysis results. We do not store your CV text after your session ends. Aggregate, anonymized usage data may be used to improve our service.",
          },
          {
            title: "3. Cookies and Analytics",
            body: "We use cookies for basic site functionality and may use analytics tools (such as Google Analytics) to understand how users interact with our platform. You can opt out of analytics cookies through your browser settings.",
          },
          {
            title: "4. Third-Party Services",
            body: "We use Claude (Anthropic) as our AI provider. Text you submit is processed by Anthropic's systems in accordance with their privacy policy. We may display ads through Google AdSense, which uses cookies to show relevant advertisements.",
          },
          {
            title: "5. Data Security",
            body: "We use industry-standard HTTPS encryption for all data in transit. We do not store CV text or other personal data on our servers beyond the duration of your active session.",
          },
          {
            title: "6. Your Rights",
            body: "You have the right to access, correct, or delete any personal data we hold about you. Since we do not store session data, there is generally no personal data to retrieve. For any privacy questions, contact us at privacy@aicareerhub.com.",
          },
          {
            title: "7. Changes to This Policy",
            body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the platform constitutes acceptance of the updated policy.",
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
