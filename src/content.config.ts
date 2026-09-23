import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { competencyIds } from './data/competencies';

const course = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/course' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    kind: z.enum(['start', 'lesson', 'arch', 'decision', 'overview', 'milestone', 'drill', 'review', 'exam']),
    code: z.string().optional(), // e.g. "1.3", "A1.2", "M3", "Drill 4"
    tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
    time: z.string().optional(),
    competencies: z.array(z.enum(competencyIds)).default([]),
    kit: z.array(z.string()).default([]),
    updated: z.string().default('2026-09'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { course };
