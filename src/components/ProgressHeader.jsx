export default function ProgressHeader({ eyebrow, title, step, total }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="card-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-label">
        {step < total ? `Question ${step} of ${total}` : 'Almost done'}
      </div>
    </div>
  );
}
