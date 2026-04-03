# Civic Exam Prep — French Naturalization

## Project
Web app for preparing the French civic exam (QCM 40 questions, 80% pass rate, 45 min).
Target: candidates for French naturalization.

## Stack
- Next.js 14 (App Router)
- Supabase (auth + database)
- TailwindCSS
- Vercel (deployment)

## Business model
Freemium — free limited access / 9.99 EUR one-shot full access (Stripe)

## Exam structure
- 40 questions QCM
- 5 themes: valeurs républicaines, symboles, institutions, droits/devoirs, vie en France
- Question banks: 191 / 209 / 258 questions (official lists)
- Sources: livret citoyen officiel (Ministère de l'Intérieur)

## Development conventions
- Language: French for UI, English for code and variable names
- Components: functional, TypeScript strict
- No class components
- Tailwind only for styling, no CSS modules
- Environment variables in .env.local, never committed

## Phase status
- [x] Phase 0: Setup
- [ ] Phase 1: Architecture + scaffolding
- [ ] Phase 2: Core features
- [ ] Phase 3: Auth + user profile
- [ ] Phase 4: Stripe monetization
- [ ] Phase 5: Polish + tests + prod
