import { QUESTIONS, LEADER_CATEGORIES, TEAM_CATEGORIES } from '../data/questions.js';

/**
 * answers: { [category]: 1|2|3|4 }
 *
 * Returns:
 *  - composite: sum of all 12 answers (12-48), for an overall banded read.
 *  - leaderTopCategory / leaderTopScore: the leader-section category with
 *    the worst (highest) single answer. Ties broken by question order
 *    within the leader section (earlier category wins).
 *  - teamTopCategory / teamTopScore: same, scoped to the team section.
 *
 * This is a deliberate design choice (flagged as an open decision in the
 * campaign notes): rather than one single worst category across all 12
 * questions, the Roadmap Report gets one leader-side finding and one
 * team-side finding, matching "splitting individual vs. team findings"
 * from the 7/30 lunch meeting notes. Confirm with Bill before launch.
 */
export function scoreAssessment(answers) {
  const composite = QUESTIONS.reduce((sum, q) => sum + (answers[q.category] || 0), 0);

  const { topCategory: leaderTopCategory, topScore: leaderTopScore } = worstInSection(
    answers,
    LEADER_CATEGORIES
  );
  const { topCategory: teamTopCategory, topScore: teamTopScore } = worstInSection(
    answers,
    TEAM_CATEGORIES
  );

  return { composite, leaderTopCategory, leaderTopScore, teamTopCategory, teamTopScore };
}

function worstInSection(answers, categories) {
  let topCategory = categories[0];
  let topScore = -Infinity;
  for (const category of categories) {
    const value = answers[category] || 0;
    if (value > topScore) {
      topScore = value;
      topCategory = category;
    }
    // strictly ">" (not ">=") preserves question-order tie-breaking,
    // since the earliest category to reach a given max is kept.
  }
  return { topCategory, topScore };
}

// 12 questions x 1-4 each = 12-48. Bands split that range into rough
// quartiles, same spirit as the original 5-question bands.
export const COMPOSITE_BAND = (composite) => {
  if (composite <= 20) return 'Strong — few structural constraints';
  if (composite <= 28) return 'Stable — one or two areas to watch';
  if (composite <= 36) return 'Strained — real constraints slowing growth';
  return 'Critical — multiple compounding constraints';
};
