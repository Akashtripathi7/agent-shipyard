export const competencies = [
  { id: 'operate', name: 'Operating an agent', what: 'The loop, context, instructions and knowing when work is really done.' },
  { id: 'brief', name: 'Briefing and specs', what: 'Turning intent into specs and prompts an agent can run with for hours.' },
  { id: 'build', name: 'Building workflow pieces', what: 'Writing skills, subagents, hooks and plugins of your own.' },
  { id: 'verify', name: 'Verification', what: 'Tests, reviews and gates that catch what agents get wrong.' },
  { id: 'security', name: 'Security', what: 'Guardrails, threat models and keeping secrets and users safe.' },
  { id: 'orchestrate', name: 'Orchestration', what: 'Splitting work across parallel agents without collisions.' },
  { id: 'fleet', name: 'Running many projects', what: 'Isolating, watching and rescuing several live projects at once.' },
  { id: 'architecture', name: 'Software architecture', what: 'Designing systems: components, data, boundaries, scale and failure.' },
  { id: 'decide', name: 'Decisions and trade-offs', what: 'Choosing workflow, stack and architecture for the use case, and defending it.' },
  { id: 'ui', name: 'UI, UX and motion', what: 'Designing, building and verifying interfaces and animation with agents.' },
] as const;

export type CompetencyId = (typeof competencies)[number]['id'];
export const competencyIds = competencies.map((c) => c.id) as [CompetencyId, ...CompetencyId[]];

// Level thresholds by share of that competency's pages completed.
export const levels = [
  { min: 0, name: 'Not started' },
  { min: 0.01, name: 'Aware' },
  { min: 0.35, name: 'Practitioner' },
  { min: 0.7, name: 'Advanced' },
  { min: 1, name: 'Expert' },
];
