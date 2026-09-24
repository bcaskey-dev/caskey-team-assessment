import { useState } from 'react';
import { QUESTIONS } from './data/questions.js';
import { scoreAssessment, COMPOSITE_BAND } from './lib/scoring.js';
import ProgressHeader from './components/ProgressHeader.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import EmailGate from './components/EmailGate.jsx';
import ResultScreen from './components/ResultScreen.jsx';

const TOTAL_STEPS = QUESTIONS.length + 1; // +1 for the email gate step
const SECTION_TITLE = {
  leader: 'Part 1 of 2 — You as the Leader',
  team: 'Part 2 of 2 — Your Team'
};

export default function App() {
  const [index, setIndex] = useState(0); // which question we're on
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState('question'); // 'question' | 'gate' | 'result'
  const [contact, setContact] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState(null);

  const currentQuestion = QUESTIONS[index];

  function handleAnswer(category, value) {
    const next = { ...answers, [category]: value };
    setAnswers(next);
    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      setStage('gate');
    }
  }

  function handleBackFromQuestion() {
    if (index > 0) setIndex(index - 1);
  }

  function handleBackFromGate() {
    setStage('question');
    setIndex(QUESTIONS.length - 1);
  }

  async function handleGateSubmit(person) {
    setSubmitting(true);
    setSubmitError('');
    const scored = scoreAssessment(answers);
    const payload = {
      name: person.name,
      email: person.email,
      answers,
      composite: scored.composite,
      compositeBand: COMPOSITE_BAND(scored.composite),
      leaderTopCategory: scored.leaderTopCategory,
      leaderTopScore: scored.leaderTopScore,
      teamTopCategory: scored.teamTopCategory,
      teamTopScore: scored.teamTopScore,
      submittedAt: new Date().toISOString(),
      source: 'caskey-team-assessment'
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Submit failed');
    } catch (err) {
      // Don't block the user from seeing their result if the webhook hiccups —
      // just surface it so Travis/Bill know the lead may not have landed
      // wherever it was supposed to.
      console.error('Assessment submit error:', err);
    } finally {
      setContact(person);
      setResult(scored);
      setStage('result');
      setSubmitting(false);
    }
  }

  return (
    <div className="app">
      <div className="card">
        {stage === 'question' && (
          <>
            <ProgressHeader
              eyebrow="Caskey Training"
              title="Sales Team Assessment"
              step={index + 1}
              total={TOTAL_STEPS}
            />
            <QuestionCard
              question={currentQuestion}
              sectionTitle={SECTION_TITLE[currentQuestion.section]}
              onAnswer={handleAnswer}
              onBack={handleBackFromQuestion}
              canBack={index > 0}
            />
          </>
        )}

        {stage === 'gate' && (
          <>
            <ProgressHeader
              eyebrow="Caskey Training"
              title="Sales Team Assessment"
              step={TOTAL_STEPS}
              total={TOTAL_STEPS}
            />
            <EmailGate
              onSubmit={handleGateSubmit}
              onBack={handleBackFromGate}
              submitting={submitting}
              submitError={submitError}
            />
          </>
        )}

        {stage === 'result' && result && (
          <>
            <ProgressHeader
              eyebrow="Caskey Training"
              title="Your Roadmap"
              step={TOTAL_STEPS}
              total={TOTAL_STEPS}
            />
            <ResultScreen
              leaderTopCategory={result.leaderTopCategory}
              teamTopCategory={result.teamTopCategory}
              name={contact?.name}
            />
          </>
        )}
      </div>
    </div>
  );
}
