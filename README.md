# Caskey Team Assessment

Step 2 of the Caskey Training 5-step lead system: a 12-question, ungated
diagnostic split into two halves — **you as the leader** (6 questions) and
**your team** (6 questions) — that identifies one biggest constraint on
each side, captures name/email at the end, and forwards the result to a
Zapier webhook for routing into email/CRM.

> **Sep 2026 update:** expanded from the original 5-question, single-result
> version (Pipeline / Qualification / Closing / Digital Assets / Team
> Capability) to 12 questions across a Leader half and a Team half, per the
> "Roadmap Report should split individual vs. team findings" note from the
> 7/30 lunch meeting. The original 5 team questions are unchanged; 6 new
> leader questions and 1 new team question (Ramp & Retention) were added.
> **Bill has not reviewed any of this copy yet** — do not launch until he
> has.

Stack: React + Vite (static frontend) + one Vercel serverless function
(`api/submit.js`), same pattern as `caskey-webinar-builder`.

## Local development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. The `/api/submit` route only runs
on Vercel (locally you can use `vercel dev` instead of `npm run dev` if you
want to test the webhook call end-to-end).

## Deploy (GitHub + Vercel)

1. Push changes to this repo's `main` branch (Vercel auto-deploys on push
   if a project is already linked — check Vercel before assuming you need
   to create a new project).
2. If no Vercel project exists yet: in Vercel, "Add New Project" → import
   `caskey-team-assessment`. Framework preset: **Vite**. Build command and
   output directory are already set in `vercel.json`.
3. In the Vercel project's **Settings → Environment Variables**, add:
   - `ZAPIER_WEBHOOK_URL` — the URL from a Zapier "Webhooks by Zapier →
     Catch Hook" trigger. Point that Zap at whatever should happen next
     (add to CRM, send Bill/Travis a notification, log to a sheet, etc.).
     See `.env.example` for the format. **Not yet set as of this update —
     submissions will be logged in Vercel but not forwarded anywhere until
     this is configured.**
4. In **Settings → Domains**, confirm `assessment.billcaskey.com` (or
   whatever subdomain is intended) is pointed at this project.
5. Redeploy after adding the env var so it takes effect.

## Before this goes live

- **Result copy** (`src/data/results.js`) — draft diagnostic blurbs for all
  12 categories (6 leader, 6 team), written to sound like Bill. He must
  review/edit every category before this ships — the 6 leader categories
  and Ramp & Retention are new and have never been reviewed.
- **Video slots** — each result has a dashed placeholder box marked
  "Bill's Pain Result video goes here." Once Step 3 videos exist for a
  category, swap that block in `src/components/ResultScreen.jsx` for an
  embed (e.g. Wistia/YouTube iframe), keyed by category.
- **Zapier destination** — `ZAPIER_WEBHOOK_URL` must be set in Vercel and
  pointed at a real destination before submissions go anywhere. No
  CRM/email tool is wired up yet; that's configured entirely on the
  Zapier side, not in this codebase.
- **Scoring model confirmation** — this version returns *two* results
  (`leaderTopCategory` + `teamTopCategory`) instead of one overall worst
  category. That's a judgment call made to match the "split leader vs.
  team findings" note in the campaign log — confirm with Bill that this is
  the model he wants before launch.

## How scoring/routing works

Each answer scores 1 (healthy) to 4 (crisis). `src/lib/scoring.js`:
- `leaderTopCategory` = the leader-section category (Coaching Rhythm,
  Sales Process Ownership, Forecast Confidence, Talent Decisions, Time
  Allocation, Leader Visibility) with the single worst answer.
- `teamTopCategory` = the team-section category (Pipeline, Qualification,
  Closing, Digital Assets, Team Capability, Ramp & Retention) with the
  single worst answer.
- Ties within a section are broken by question order (earlier category in
  `src/data/questions.js` wins).
- `composite` = sum of all 12 answers (12–48) and `compositeBand`, both
  sent to the webhook, in case you want an overall score later without
  changing the assessment itself.

## Project structure

```
api/submit.js              Vercel serverless function → Zapier webhook
src/data/questions.js      The 12 questions (leader + team halves) + answer options
src/data/results.js        Per-category result copy (draft, 12 categories)
src/lib/scoring.js         Scoring + leader/team routing logic
src/components/            UI pieces (progress header, question, email gate, result)
src/App.jsx                Assessment flow/state machine
src/styles.css             Caskey brand styling (navy #092E44 / orange #E56233)
```
