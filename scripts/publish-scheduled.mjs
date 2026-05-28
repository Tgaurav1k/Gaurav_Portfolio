#!/usr/bin/env node
// Scheduled-publish script.
// Reads _drafts/schedule.json, finds any posts whose publishDate has arrived,
// moves the draft HTML into blog/, and inserts the corresponding entries
// into sitemap.xml and blog/index.html (both the visible card list and the
// Blog JSON-LD blogPost array).
//
// Designed to be invoked by .github/workflows/publish-blog.yml on a daily cron,
// but can also be run locally for testing:
//
//   node scripts/publish-scheduled.mjs            # respects today's date
//   node scripts/publish-scheduled.mjs --force    # publishes any pending posts regardless of date
//   node scripts/publish-scheduled.mjs --dry-run  # shows what would be published, makes no changes

import { readFile, writeFile, rename } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://gaurav-portfolio-g1ks.vercel.app';

const SCHEDULE_FILE = join(ROOT, '_drafts', 'schedule.json');
const SITEMAP_FILE  = join(ROOT, 'sitemap.xml');
const BLOG_INDEX    = join(ROOT, 'blog', 'index.html');

const args      = new Set(process.argv.slice(2));
const FORCE     = args.has('--force');
const DRY_RUN   = args.has('--dry-run');

const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeJson = s => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

async function main() {
  const schedule = JSON.parse(await readFile(SCHEDULE_FILE, 'utf8'));
  const posts = Array.isArray(schedule.posts) ? schedule.posts : [];

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
  const due = FORCE ? posts : posts.filter(p => p.publishDate && p.publishDate <= today);

  if (!due.length) {
    console.log(`Nothing to publish (today: ${today}, drafts queued: ${posts.length}).`);
    return;
  }

  // Sort by publishDate ASC so we insert oldest first;
  // each new insert prepends, so the newest ends up on top of the list.
  due.sort((a, b) => a.publishDate.localeCompare(b.publishDate));

  console.log(`Publishing ${due.length} post(s):`);
  for (const p of due) console.log(`  - ${p.draft}  (${p.publishDate})`);

  if (DRY_RUN) { console.log('Dry run — no changes written.'); return; }

  let sitemap   = await readFile(SITEMAP_FILE, 'utf8');
  let blogIndex = await readFile(BLOG_INDEX, 'utf8');

  for (const post of due) {
    const draftPath = join(ROOT, '_drafts', post.draft);
    const livePath  = join(ROOT, 'blog',    post.draft);

    // 1. Move the file from _drafts/ to blog/
    await rename(draftPath, livePath);

    // 2. Insert into sitemap.xml (before </urlset>)
    const sitemapEntry =
`  <url>
    <loc>${SITE}/blog/${post.draft}</loc>
    <lastmod>${post.publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE}${post.image}</image:loc>
      <image:title>${escapeHtml(post.title)}</image:title>
    </image:image>
  </url>

`;
    if (!sitemap.includes('</urlset>')) throw new Error('sitemap.xml missing </urlset>');
    sitemap = sitemap.replace('</urlset>', sitemapEntry + '</urlset>');

    // 3. Insert card into blog/index.html (after `<section class="blog-list">`)
    const cardHtml =
`
    <a class="blog-card" href="/blog/${post.draft}">
      <figure class="blog-card-media">
        <picture>
          <source srcset="${post.imageWebp}" type="image/webp">
          <img src="${post.image}" alt="${escapeHtml(post.imageAlt)}" loading="lazy">
        </picture>
      </figure>
      <div class="blog-card-content">
        <div class="blog-card-meta">
          <span class="blog-card-date">${post.displayDate}</span>
          <span class="blog-card-tag">${escapeHtml(post.tag)}</span>
          <span class="blog-card-tag">${post.readTime}</span>
        </div>
        <h2 class="blog-card-title">${escapeHtml(post.title)}</h2>
        <p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>
        <span class="blog-card-cta">Read article →</span>
      </div>
    </a>
`;
    const cardMarker = '<section class="blog-list">';
    if (!blogIndex.includes(cardMarker)) throw new Error(`blog/index.html missing ${cardMarker}`);
    blogIndex = blogIndex.replace(cardMarker, cardMarker + cardHtml);

    // 4. Insert into blog/index.html Blog JSON-LD blogPost array
    const jsonLdEntry =
`    {
      "@type": "BlogPosting",
      "headline": "${escapeJson(post.title)}",
      "url": "${SITE}/blog/${post.draft}",
      "datePublished": "${post.publishDate}"
    },
`;
    const jsonLdMarker = '"blogPost": [';
    if (!blogIndex.includes(jsonLdMarker)) throw new Error(`blog/index.html missing ${jsonLdMarker}`);
    blogIndex = blogIndex.replace(jsonLdMarker, jsonLdMarker + '\n' + jsonLdEntry);
  }

  await writeFile(SITEMAP_FILE, sitemap);
  await writeFile(BLOG_INDEX, blogIndex);

  // 5. Remove published entries from schedule.json
  const publishedDrafts = new Set(due.map(p => p.draft));
  schedule.posts = posts.filter(p => !publishedDrafts.has(p.draft));
  await writeFile(SCHEDULE_FILE, JSON.stringify(schedule, null, 2) + '\n');

  console.log(`Published ${due.length} post(s). Remaining in queue: ${schedule.posts.length}.`);
}

main().catch(e => {
  console.error('publish-scheduled failed:', e);
  process.exit(1);
});
