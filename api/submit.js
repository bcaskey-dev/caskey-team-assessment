// Vercel serverless function: POST /api/submit
// Receives the completed assessment from the frontend and forwards it to a
// Zapier "Catch Hook" webhook, so Travis/Bill can route it into whatever
// CRM, sheet, or email Zap they set up — without redeploying this app.
//
// Required env var (set in Vercel project settings):
//   ZAPIER_WEBHOOK_URL = https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    answers,
    composite,
    compositeBand,
    leaderTopCategory,
    leaderTopScore,
    teamTopCategory,
    teamTopScore,
    submittedAt
  } = req.body || {};

  if (!name || !email || !leaderTopCategory || !teamTopCategory) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;

  if (!webhookUrl) {
    // Don't fail the user's flow just because the webhook isn't configured
    // yet — log it server-side so it shows up in Vercel logs, and let the
    // frontend proceed to the result screen regardless.
    console.warn('ZAPIER_WEBHOOK_URL is not set — assessment submission was not forwarded.', {
      name,
      email,
      leaderTopCategory,
      teamTopCategory
    });
    return res.status(200).json({ ok: true, forwarded: false });
  }

  try {
    const zapierRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        answers,
        composite,
        compositeBand,
        leaderTopCategory,
        leaderTopScore,
        teamTopCategory,
        teamTopScore,
        submittedAt: submittedAt || new Date().toISOString()
      })
    });

    if (!zapierRes.ok) {
      console.error('Zapier webhook responded with an error', zapierRes.status);
      return res.status(200).json({ ok: true, forwarded: false });
    }

    return res.status(200).json({ ok: true, forwarded: true });
  } catch (err) {
    console.error('Failed to forward assessment to Zapier webhook', err);
    return res.status(200).json({ ok: true, forwarded: false });
  }
}

