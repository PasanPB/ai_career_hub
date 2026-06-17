# AI Career Helper Hub

A production-ready, AI-powered career platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **CV Analyzer** — Paste your CV and get a score out of 100, strengths, weaknesses, ATS tips, and missing skills
- **Interview Prep** — Generate technical and HR questions by role and experience level
- **Salary Guide** — View compensation ranges by role and country (Sri Lanka + 8 global markets)
- **Career Quiz** — 8-question quiz that recommends your ideal tech career
- **SEO Blog** — Static articles for Data Scientist, Business Analyst, and Data Analyst roles
- **AdSense-ready** pages: About, Contact, Privacy Policy, Terms of Service

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Claude (Anthropic) via direct API call, with mock fallbacks

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## AI Integration

The platform calls the Anthropic API from client components. To activate live AI responses:

1. The API calls in `lib/ai.ts` are already wired up — they hit `https://api.anthropic.com/v1/messages`
2. To use them server-side or with an API key, create a Next.js API route at `app/api/analyze/route.ts` and move the fetch there with your key
3. Without a key, the app falls back to realistic mock data automatically

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel: `vercel deploy`

## AdSense / Monetization

All required pages for Google AdSense approval are included:
- `/privacy-policy`
- `/about`  
- `/contact`
- `/terms`

Add your AdSense script to `app/layout.tsx` once approved.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, features, stats |
| `/cv-checker` | CV analysis tool |
| `/interview-prep` | Interview question generator |
| `/salary-guide` | Salary comparison by role + country |
| `/career-quiz` | Career path discovery quiz |
| `/blog` | SEO blog index |
| `/blog/[slug]` | Individual blog posts |
| `/about` | About page |
| `/contact` | Contact form |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |
