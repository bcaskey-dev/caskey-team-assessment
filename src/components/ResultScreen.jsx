import { RESULTS } from '../data/results.js';

export default function ResultScreen({ topCategory, name }) {
  const result = RESULTS[topCategory];

  return (
    <div className="card-body">
      <span className="result-label">Your team's biggest constraint</span>
      <h2 className="result-headline">{result.headline}</h2>
      <p className="result-body">{result.body}</p>

      {result.videoSlot && (
        <div className="video-slot">
          🎥 Bill's Pain Result video for {result.label} goes here
          <span>(Step 3 of the lead system — embed once recorded)</span>
        </div>
      )}

      <p className="gate-copy">
        Thanks{name ? `, ${name.split(' ')[0]}` : ''} — keep an eye on your inbox. We'll follow up
        with more on how to fix this.
      </p>
    </div>
  );
}
