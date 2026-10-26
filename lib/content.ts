import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const ROOT = process.cwd();

async function md(src: string) {
  const out = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeSlug).use(rehypeStringify).process(src);
  return String(out);
}

export type Post = { slug: string; year: string; title: string; date: string; description: string; tags: string[]; category: string; minutes: number; file: string };

// content/posts/YYYY-MM-DD-slug.md  ->  /blog/YYYY/slug/   (same URLs as the previous site)
export function listPosts(): Post[] {
  const dir = path.join(ROOT, "content/posts");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      const m = f.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)!;
      const date = data.date ? new Date(data.date).toISOString().slice(0, 10) : `${m[1]}-${m[2]}-${m[3]}`;
      const tags = typeof data.tags === "string" ? data.tags.split(/\s+/) : (data.tags ?? []);
      return {
        slug: m[4], year: m[1], title: data.title ?? m[4], date, description: data.description ?? "", tags,
        category: String(data.categories ?? "notes"), minutes: Math.max(1, Math.round(content.split(/\s+/).length / 230)), file: f,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(year: string, slug: string) {
  const p = listPosts().find((x) => x.year === year && x.slug === slug);
  if (!p) return null;
  const { content } = matter(fs.readFileSync(path.join(ROOT, "content/posts", p.file), "utf8"));
  return { ...p, html: await md(content) };
}

export type Research = { slug: string; title: string; description: string; order: number };
export function listResearch(): Research[] {
  const dir = path.join(ROOT, "content/research");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: f.replace(/\.md$/, ""), title: data.title, description: data.description ?? "", order: Number(data.importance ?? 9) };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getResearch(slug: string) {
  const f = path.join(ROOT, "content/research", `${slug}.md`);
  if (!fs.existsSync(f)) return null;
  const { data, content } = matter(fs.readFileSync(f, "utf8"));
  return { slug, title: data.title as string, description: (data.description as string) ?? "", html: await md(content) };
}
