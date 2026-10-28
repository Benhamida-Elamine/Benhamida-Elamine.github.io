// Runs after `vite build` (Node >= 22.18 executes TypeScript directly).
// GitHub Pages only serves files that exist, so each project route gets its own
// copy of index.html with the right title, description and canonical URL.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { profile, SITE_URL } from "../src/data/profile.ts";
import { projects } from "../src/data/projects.ts";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const template = await readFile(join(dist, "index.html"), "utf8");

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const withMeta = (html: string, { title, description, url }: { title: string; description: string; url: string }) => {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${t}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/s, `$1${d}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/s, `$1${d}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*/s, `$1${d}`);
};

const urls = [`${SITE_URL}/`];

for (const project of projects) {
  const url = `${SITE_URL}/projects/${project.slug}/`;
  urls.push(url);
  const directory = join(dist, "projects", project.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, "index.html"),
    withMeta(template, { title: `${project.title} — ${profile.name}`, description: project.description, url }),
  );
}

// Unknown paths: GitHub Pages serves 404.html, the app then shows its own "not found" page.
await writeFile(
  join(dist, "404.html"),
  withMeta(template, { title: `Page not found — ${profile.name}`, description: "This page does not exist.", url: `${SITE_URL}/` }).replace(
    '<meta name="robots" content="index, follow" />',
    '<meta name="robots" content="noindex" />',
  ),
);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`,
);

await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// Serve files as-is: no Jekyll processing on GitHub Pages.
await writeFile(join(dist, ".nojekyll"), "");

console.log(`postbuild: ${projects.length} project pages, 404.html, sitemap.xml (${urls.length} URLs), robots.txt`);
