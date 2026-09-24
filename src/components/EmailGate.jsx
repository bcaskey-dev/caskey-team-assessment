import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailGate({ onSubmit, onBack, submitting, submitError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const nameValid = name.trim().length > 1;
  const emailValid = EMAIL_RE.test(email.trim());
  const formValid = nameValid && emailValid;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!formValid || submitting) return;
    onSubmit({ name: name.trim(), email: email.trim() });
  }

  return (
    <div className="card-body">
      <p className="question-prompt">You've made it through — where should we send your Roadmap?</p>
      <p className="gate-copy">
        Based on your answers, we'll show you the single biggest constraint on you as the leader,
        and on your team's production, plus what to do about each.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            autoComplete="name"
          />
          {touched && !nameValid && <div className="error-text">Enter your name.</div>}
        </div>
        <div className="form-row">
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            autoComplete="email"
          />
          {touched && !emailValid && <div className="error-text">Enter a valid email.</div>}
        </div>
        {submitError && <div className="error-text">{submitError}</div>}
        <button className="primary-btn" type="submit" disabled={submitting}>
          {submitting ? 'Scoring your team…' : 'Show My Result'}
        </button>
      </form>
      <div className="nav-row">
        <button className="link-btn" onClick={onBack} disabled={submitting}>
          ← Back
        </button>
      </div>
    </div>
  );
}
