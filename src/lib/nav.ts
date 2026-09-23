import { getCollection, type CollectionEntry } from 'astro:content';
import { sections, sectionById } from '../data/course';

export type Page = CollectionEntry<'course'>;

export interface NavItem {
  slug: string; // e.g. "p1/agent-loop"
  href: string;
  title: string;
  code?: string;
  kind: Page['data']['kind'];
  section: string;
  tier: number;
  competencies: string[];
}

export function sectionOf(page: Page) {
  return page.id.split('/')[0];
}

export function hrefOf(slug: string) {
  return `/learn/${slug}/`;
}

let cache: Page[] | null = null;

export async function orderedPages(): Promise<Page[]> {
  if (cache) return cache;
  const all = (await getCollection('course')).filter((p) => !p.data.draft);
  const rank = new Map(sections.map((s, i) => [s.id, i]));
  for (const p of all) {
    if (!sectionById[sectionOf(p)]) throw new Error(`Unknown section for ${p.id}`);
  }
  all.sort((a, b) => {
    const s = (rank.get(sectionOf(a)) ?? 0) - (rank.get(sectionOf(b)) ?? 0);
    return s !== 0 ? s : a.data.order - b.data.order;
  });
  cache = all;
  return all;
}

export async function navItems(): Promise<NavItem[]> {
  return (await orderedPages()).map((p) => ({
    slug: p.id,
    href: hrefOf(p.id),
    title: p.data.title,
    code: p.data.code,
    kind: p.data.kind,
    section: sectionOf(p),
    tier: p.data.tier,
    competencies: p.data.competencies,
  }));
}

export async function groupedNav() {
  const items = await navItems();
  return sections
    .map((s) => ({ section: s, items: items.filter((i) => i.section === s.id) }))
    .filter((g) => g.items.length > 0);
}

/**
 * Slugs that have a written lesson. Tiers 3 and 4 are still being written, so
 * reference pages link only to what exists and label the rest instead of
 * sending the reader to a 404.
 */
export async function writtenSlugs(): Promise<Set<string>> {
  return new Set((await orderedPages()).map((p) => p.id));
}
