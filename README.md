# Caskey Team Assessment

Step 2 of the Caskey Training 5-step lead system: a 5-question, ungated
diagnostic that identifies a sales team's single biggest constraint
(Pipeline, Qualification, Closing, Digital Assets, or Team Capability),
captures name/email at the end, and forwards the result to a Zapier
webhook for routing into email/CRM.

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

1. Create a new GitHub repo named **`caskey-team-assessment`** and push this
   folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: sales team assessment"
   git branch -M main
   git remote add origin https://github.com/<your-org>/caskey-team-assessment.git
   git push -u origin main
   ```
2. In Vercel, "Add New Project" → import the `caskey-team-assessment` repo.
   Framework preset: **Vite**. Build command and output directory are
   already set in `vercel.json`.
3. In the Vercel project's **Settings → Environment Variables**, add:
   - `ZAPIER_WEBHOOK_URL` — the URL from a Zapier "Webhooks by Zapier →
     Catch Hook" trigger. Point that Zap at whatever should happen next
     (add to CRM, send Bill/Travis a notification, log to a sheet, etc.).
   - See `.env.example` for the format.
4. In **Settings → Domains**, add `assessment.billcaskey.com` and follow
   Vercel's CNAME/A-record instructions to point the subdomain at it.
5. Redeploy after adding the env var so it takes effect.

## What's a placeholder right now

- **Result copy** (`src/data/results.js`) — draft diagnostic blurbs for all
  5 categories, written to sound like Bill. He should review/edit before
  this goes live.
- **Video slot** — each result screen has a dashed placeholder box marked
  "Bill's Pain Result video goes here." Once Step 3 videos exist, swap that
  block in `src/components/ResultScreen.jsx` for an embed (e.g. Wistia/
  YouTube iframe), keyed by `topCategory`.
- **Zapier destination** — the app POSTs to whatever `ZAPIER_WEBHOOK_URL`
  is set to. No CRM/email tool is wired up yet; that's configured entirely
  on the Zapier side, not in this codebase.

## How scoring/routing works

Each answer scores 1 (healthy) to 4 (crisis). `src/lib/scoring.js`:
- `topCategory` = the category with the single worst answer. Ties are
  broken by question order (Pipeline > Qualification > Closing >
  Digital Assets > Team Capability) — the result screen only ever shows
  one category.
- `composite` = sum of all 5 answers (5–20) and `compositeBand`, both sent
  to the webhook, in case you want an overall score later without
  changing the assessment itself.

## Project structure

```
api/submit.js              Vercel serverless function → Zapier webhook
src/data/questions.js      The 5 questions + answer options
src/data/results.js        Per-category result copy (draft)
src/lib/scoring.js         Scoring + routing logic
src/components/            UI pieces (progress header, question, email gate, result)
src/App.jsx                Assessment flow/state machine
src/styles.css             Caskey brand styling (navy #092E44 / orange #E56233)
```
