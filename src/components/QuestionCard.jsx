export default function QuestionCard({ question, onAnswer, onBack, canBack }) {
  return (
    <div className="card-body">
      <p className="question-prompt">{question.prompt}</p>
      <div className="options" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((opt) => (
          <button
            key={opt.value}
            className="option-btn"
            role="radio"
            aria-checked="false"
            onClick={() => onAnswer(question.category, opt.value)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <div className="nav-row">
        <button className="link-btn" onClick={onBack} disabled={!canBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}
