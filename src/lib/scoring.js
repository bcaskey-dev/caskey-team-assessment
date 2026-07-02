import { QUESTIONS } from '../data/questions.js';

/**
 * answers: { [category]: 1|2|3|4 }
 * Returns:
 *  - composite: sum of all 5 answers (5-20), used if you ever want a
 *    banded overall score instead of / alongside single-category routing.
 *  - topCategory: the category with the worst (highest) single answer.
 *    Ties are broken by question order (earlier category wins), per the
 *    agreed routing rule.
 *  - topScore: that category's answer value.
 */
export function scoreAssessment(answers) {
  const composite = QUESTIONS.reduce((sum, q) => sum + (answers[q.category] || 0), 0);

  let topCategory = QUESTIONS[0].category;
  let topScore = -Infinity;
  for (const q of QUESTIONS) {
    const value = answers[q.category] || 0;
    if (value > topScore) {
      topScore = value;
      topCategory = q.category;
    }
    // strictly ">" (not ">=") preserves question-order tie-breaking,
    // since the earliest category to reach a given max is kept.
  }

  return { composite, topCategory, topScore };
}

export const COMPOSITE_BAND = (composite) => {
  if (composite <= 8) return 'Strong — few structural constraints';
  if (composite <= 12) return 'Stable — one or two areas to watch';
  if (composite <= 16) return 'Strained — real constraints slowing growth';
  return 'Critical — multiple compounding constraints';
};
