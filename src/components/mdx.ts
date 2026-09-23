// Every component available inside MDX pages without an import line.
import Analogy from './Analogy.astro';
import Exercise from './Exercise.astro';
import Expect from './Expect.astro';
import IfNot from './IfNot.astro';
import Breaks from './Breaks.astro';
import BreakPart from './BreakPart.astro';
import Callout from './Callout.astro';
import Prompt from './Prompt.astro';
import CodeFile from './CodeFile.astro';
import GoDeeper from './GoDeeper.astro';
import Figure from './Figure.astro';
import Terms from './Terms.astro';
import KitPiece from './KitPiece.astro';
import Quiz from './Quiz.astro';
import Reveal from './Reveal.astro';
import Drill from './Drill.astro';
import Checklist from './Checklist.astro';
import KitFile from './KitFile.astro';

// Diagrams: any file in ./diagrams is available by its file name, e.g. <AgentLoop />.
const diagramModules = import.meta.glob('./diagrams/*.astro', { eager: true }) as Record<string, { default: unknown }>;
const diagrams = Object.fromEntries(
  Object.entries(diagramModules).map(([path, mod]) => [path.split('/').pop()!.replace('.astro', ''), mod.default]),
);

export const mdxComponents = {
  Analogy, Exercise, Expect, IfNot, Breaks, BreakPart, Callout, Prompt, CodeFile,
  GoDeeper, Figure, Terms, KitPiece, KitFile, Quiz, Reveal, Drill, Checklist,
  ...diagrams,
};
