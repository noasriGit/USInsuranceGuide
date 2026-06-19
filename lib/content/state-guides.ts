import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  StateCategoryGuideFrontmatterSchema,
  type StateCategoryGuide,
} from "@/lib/schemas";

const STATE_GUIDES_DIR = path.join(process.cwd(), "content/state-guides");

function guideSlug(stateSlug: string, categorySlug: string): string {
  return `${stateSlug}-${categorySlug}`;
}

export function getStateCategoryGuides(): StateCategoryGuide[] {
  if (!fs.existsSync(STATE_GUIDES_DIR)) return [];

  const files = fs
    .readdirSync(STATE_GUIDES_DIR)
    .filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(STATE_GUIDES_DIR, filename), "utf-8");
      const { data } = matter(raw);
      const frontmatter = StateCategoryGuideFrontmatterSchema.parse(data);
      if (frontmatter.draft) return null;

      return {
        slug,
        ...frontmatter,
      } satisfies StateCategoryGuide;
    })
    .filter((g): g is StateCategoryGuide => g !== null);
}

export function getStateCategoryGuide(
  stateSlug: string,
  categorySlug: string,
): StateCategoryGuide | undefined {
  const slug = guideSlug(stateSlug, categorySlug);
  return getStateCategoryGuides().find((g) => g.slug === slug);
}

export function isStateCategoryGuideReady(
  stateSlug: string,
  categorySlug: string,
): boolean {
  return getStateCategoryGuide(stateSlug, categorySlug) !== undefined;
}
