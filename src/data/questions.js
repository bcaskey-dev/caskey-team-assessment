// Order matters: it is also the tie-break order when two categories score
// the same "worst" value (earlier category wins). See src/lib/scoring.js.
export const QUESTIONS = [
  {
    id: 'pipeline',
    category: 'pipeline',
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
    label: 'Team Capability',
    prompt: 'When you look honestly at your team, which statement feels most true: "My team is capable of more than they’re currently producing"?',
    options: [
      { value: 1, text: "We're close to peak performance — I think we're getting most of what's there" },
      { value: 2, text: "There's some upside with a few team members but I haven't figured out how to unlock it yet" },
      { value: 3, text: "I can see significant upside potential in my people that isn't showing up in their numbers" },
      { value: 4, text: "I'm convinced my team has two or three times the capacity they're currently producing" }
    ]
  }
];
