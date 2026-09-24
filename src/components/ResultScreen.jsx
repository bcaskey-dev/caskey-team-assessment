import { RESULTS } from '../data/results.js';

export default function ResultScreen({ leaderTopCategory, teamTopCategory, name }) {
  const leaderResult = RESULTS[leaderTopCategory];
  const teamResult = RESULTS[teamTopCategory];

  return (
    <div className="card-body">
      <p className="gate-copy" style={{ marginBottom: 24 }}>
        {name ? `${name.split(' ')[0]}, here` : "Here's"} the single biggest constraint we found on
        each side of your Roadmap — as the leader, and across your team.
      </p>

      <section className="result-section">
        <span className="result-label">Your biggest constraint as the leader</span>
        <h2 className="result-headline">{leaderResult.headline}</h2>
        <p className="result-body">{leaderResult.body}</p>
        {leaderResult.videoSlot && (
          <div className="video-slot">
            🎥 Bill's Pain Result video for {leaderResult.label} goes here
            <span>(Step 3 of the lead system — embed once recorded)</span>
          </div>
        )}
      </section>

      <section className="result-section">
        <span className="result-label">Your team's biggest constraint</span>
        <h2 className="result-headline">{teamResult.headline}</h2>
        <p className="result-body">{teamResult.body}</p>
        {teamResult.videoSlot && (
          <div className="video-slot">
            🎥 Bill's Pain Result video for {teamResult.label} goes here
            <span>(Step 3 of the lead system — embed once recorded)</span>
          </div>
        )}
      </section>

      <p className="gate-copy">
        Thanks{name ? `, ${name.split(' ')[0]}` : ''} — keep an eye on your inbox. We'll follow up
        with more on how to fix both of these.
      </p>
    </div>
  );
}
