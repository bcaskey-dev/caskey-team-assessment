// Order matters within each section: it is also the tie-break order when
// two categories in the same section score the same "worst" value (earlier
// category wins). See src/lib/scoring.js.
//
// `section` splits the 12 questions into the two halves of the Roadmap
// Report: 'leader' (how the leader is leading) and 'team' (how the team is
// actually performing). Scoring routes to one top constraint per section.
export const QUESTIONS = [
  // ---------------------------------------------------------------------
  // SECTION 1 — THE LEADER (6 questions)
  // ---------------------------------------------------------------------
  {
    id: 'coachingRhythm',
    category: 'coachingRhythm',
    section: 'leader',
    label: 'Coaching Rhythm',
    prompt: 'How consistently do you have real 1:1 coaching conversations with each rep on your team?',
    options: [
      { value: 1, text: 'On a set cadence, every rep, every time — it never slips' },
      { value: 2, text: 'Fairly regular, but it slips when things get busy' },
      { value: 3, text: 'Sporadic — mostly reactive, when a deal or a rep is struggling' },
      { value: 4, text: "Rarely — I don't have real coaching conversations, I have status updates" }
    ]
  },
  {
    id: 'salesProcess',
    category: 'salesProcess',
    section: 'leader',
    label: 'Sales Process Ownership',
    prompt: 'Does your team follow one sales process you defined and actively enforce, or does each rep run their own version?',
    options: [
      { value: 1, text: 'One process, clearly defined, and I hold the team to it' },
      { value: 2, text: 'A process exists, but enforcement is inconsistent' },
      { value: 3, text: "Loosely defined — reps mostly do their own thing" },
      { value: 4, text: "There's no real process — every rep is winging it their own way" }
    ]
  },
  {
    id: 'forecastConfidence',
    category: 'forecastConfidence',
    section: 'leader',
    label: 'Forecast Confidence',
    prompt: "When you report your pipeline number up the chain, how confident are you that it's accurate?",
    options: [
      { value: 1, text: 'Very — our forecast is a real number, not a guess' },
      { value: 2, text: 'Mostly, with some rep-by-rep padding I discount for' },
      { value: 3, text: "Not very — I'm often surprised, in both directions" },
      { value: 4, text: "I basically don't trust the number I'm reporting" }
    ]
  },
  {
    id: 'talentDecisions',
    category: 'talentDecisions',
    section: 'leader',
    label: 'Talent Decisions',
    prompt: 'How confident are you in your ability to identify and hire the right sales talent?',
    options: [
      { value: 1, text: 'Very confident — our hiring process reliably finds the right people' },
      { value: 2, text: 'Fairly confident, though we still miss sometimes' },
      { value: 3, text: "Not very — we've made hires we regretted more than once" },
      { value: 4, text: "I honestly don't have a good process for this at all" }
    ]
  },
  {
    id: 'timeAllocation',
    category: 'timeAllocation',
    section: 'leader',
    label: 'Time Allocation',
    prompt: 'How much of your week actually goes to coaching and strategy, versus firefighting and admin?',
    options: [
      { value: 1, text: 'Most of my time is coaching and strategy — that’s the job, and I protect it' },
      { value: 2, text: "A healthy amount, though admin eats into it more than I'd like" },
      { value: 3, text: "Coaching gets squeezed to whatever time is left over" },
      { value: 4, text: "I'm almost entirely in firefighting and admin mode" }
    ]
  },
  {
    id: 'personalBrand',
    category: 'personalBrand',
    section: 'leader',
    label: 'Leader Visibility',
    prompt: 'How visible and positioned are you, personally, as a leader — with your team, your peers, and the market?',
    options: [
      { value: 1, text: "Strongly — people know what I stand for and what I've built" },
      { value: 2, text: "Somewhat — internally, not really outside the company" },
      { value: 3, text: "Minimally — I keep a low profile even inside my own org" },
      { value: 4, text: "Not really — I don't think much about my own visibility as a leader" }
    ]
  },

  // ---------------------------------------------------------------------
  // SECTION 2 — THE TEAM (6 questions)
  // ---------------------------------------------------------------------
  {
    id: 'pipeline',
    category: 'pipeline',
    section: 'team',
    label: 'Opportunity Pipeline',
    prompt: 'How would you describe the flow of new, qualified opportunities into your pipeline?',
    options: [
      { value: 1, text: 'We have more than enough qualified opportunities at any given time' },
      { value: 2, text: "We have enough, but it's inconsistent month to month" },
      { value: 3, text: "We're often scrambling to fill the pipeline" },
      { value: 4, text: 'Our pipeline is chronically thin and it’s a constant source of stress' }
    ]
  },
  {
    id: 'qualification',
    category: 'qualification',
    section: 'team',
    label: 'Qualification',
    prompt: 'How often do deals fall out of your pipeline late, after time has already been invested?',
    options: [
      { value: 1, text: 'Rarely — our reps qualify hard before investing real time' },
      { value: 2, text: "Occasionally, but it's not a pattern" },
      { value: 3, text: 'Frequently — we see a lot of "false positive" opportunities' },
      { value: 4, text: "Constantly — half our pipeline probably isn't real" }
    ]
  },
  {
    id: 'closing',
    category: 'closing',
    section: 'team',
    label: 'Closing',
    prompt: 'When your reps get in front of a qualified prospect, how often do they close the business?',
    options: [
      { value: 1, text: 'Almost always — our close rate is 50%+' },
      { value: 2, text: "Usually, but there's room to improve" },
      { value: 3, text: 'Inconsistently — it depends heavily on the rep' },
      { value: 4, text: 'Rarely — we lose more than we win on deals that should close' }
    ]
  },
  {
    id: 'digitalAssets',
    category: 'digitalAssets',
    section: 'team',
    label: 'Digital Assets',
    prompt: 'How well is your team using digital tools, content, and personal brand to create and advance opportunities?',
    options: [
      { value: 1, text: "Fully — it's a real engine for us" },
      { value: 2, text: 'Somewhat — a few reps do it well, most don’t' },
      { value: 3, text: "Minimally — we talk about it but don't execute" },
      { value: 4, text: 'Not at all — our team relies entirely on old-school methods' }
    ]
  },
  {
    id: 'teamCapability',
    category: 'teamCapability',
    section: 'team',
    label: 'Team Capability',
    prompt: 'When you look honestly at your team, which statement feels most true: "My team is capable of more than they’re currently producing"?',
    options: [
      { value: 1, text: "We're close to peak performance — I think we're getting most of what's there" },
      { value: 2, text: "There's some upside with a few team members but I haven't figured out how to unlock it yet" },
      { value: 3, text: "I can see significant upside potential in my people that isn't showing up in their numbers" },
      { value: 4, text: "I'm convinced my team has two or three times the capacity they're currently producing" }
    ]
  },
  {
    id: 'rampRetention',
    category: 'rampRetention',
    section: 'team',
    label: 'Ramp & Retention',
    prompt: 'When you hire a new rep, how long does it take them to become fully productive — and how often do you lose reps before they get there?',
    options: [
      { value: 1, text: 'They ramp fast on a defined path, and we rarely lose someone early' },
      { value: 2, text: 'Ramp takes a while, but it works and turnover is low' },
      { value: 3, text: "Ramp is slow and inconsistent, and we lose some reps along the way" },
      { value: 4, text: "There's no real ramp plan — new reps sink or swim, and a lot of them sink" }
    ]
  }
];

export const LEADER_CATEGORIES = QUESTIONS.filter((q) => q.section === 'leader').map((q) => q.category);
export const TEAM_CATEGORIES = QUESTIONS.filter((q) => q.section === 'team').map((q) => q.category);
