"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/cv-checker", label: "CV Checker" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/salary-guide", label: "Salary Guide" },
  { href: "/career-quiz", label: "Career Quiz" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span>Career<span className="text-blue-600">AI</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cv-checker"
            className="ml-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-600">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === l.href ? "bg-blue-50 text-blue-700" : "text-slate-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
