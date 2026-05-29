# Full SEO Audit — gaurav-portfolio-g1ks.vercel.app

**Audit date:** 2026-05-28
**Audited URL:** https://gaurav-portfolio-g1ks.vercel.app/
**Business type detected:** Personal portfolio / freelance professional service (developer)
**Pages discovered (sitemap):** 4 (homepage, blog index, 2 blog posts)
**Framework:** Static HTML deployed on Vercel (Geist + Instrument Serif fonts, vanilla JS, no SPA framework on the homepage)

---

## Executive Summary

### Overall SEO Health Score: **82 / 100**

Genuinely strong on-page SEO craft. Schema is comprehensive (9 types), titles/descriptions/canonicals are clean on every page, all images have alt attributes, blog posts are 1,000+ words of original engineering content, sitemap.xml + robots.txt + HSTS are all in place. The work that's been done is well above average for personal portfolios.

The remaining ceiling is **structural, not technical**:

1. **`*.vercel.app` subdomain** — cannot accrue independent domain authority; competitive head terms ("React developer India") are out of reach until you move to a custom domain.
2. **Single-page architecture** — Work, About, Services, Contact are all `#anchors` on the homepage, leaving only 4 indexable URLs across the whole site. Each section that could rank for its own keyword cluster currently doesn't have its own URL.
3. **Blog has only 2 posts** — limits topical authority and the slow drip of organic discovery that compounds over time.

### Top 5 Critical / High-Impact Issues

| # | Issue | Severity | Effort | Impact |
|---|---|---|---|---|
| 1 | On `*.vercel.app` subdomain — cannot build domain authority | Critical (structural) | 1 hr + $10/yr | Massive — unblocks everything below |
| 2 | All major sections (`#work`, `#about`, `#services`) are anchors, not pages | High | 4–8 hrs | Each new URL = a new ranking opportunity |
| 3 | Security response headers missing (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP) | High | 30 min | Best-practices score + small ranking signal |
| 4 | Titles are 68–83 characters — Google truncates at ~580px (~60 chars) | High | 30 min | Higher CTR from full title visibility |
| 5 | Blog has only 2 posts — topical authority is thin | High | ongoing | Long-tail traffic compounds; need volume |

### Top 5 Quick Wins (high impact, low effort)

| # | Quick Win | Time |
|---|---|---|
| 1 | Remove `<meta name="keywords">` (Google ignores it; leaks strategy to competitors) | 5 min |
| 2 | Add `vercel.json` with full security header set | 15 min |
| 3 | Shorten homepage title to ≤60 chars (e.g., "Gaurav Kumar — Full-Stack Developer (React & Node)") | 5 min |
| 4 | Publish `llms.txt` at site root for AI search discoverability | 20 min |
| 5 | Change `og:locale` from `en_US` to `en_IN` (or both) — matches "Based in India" | 2 min |

---

## 1. Technical SEO

### What's working

| Check | Status | Notes |
|---|---|---|
| HTTPS | ✓ | Vercel handles cert |
| HSTS header | ✓ | `max-age=63072000; includeSubDomains; preload` |
| robots.txt | ✓ | `Allow: /` + sitemap reference |
| sitemap.xml | ✓ | Well-formed, image extension used |
| Canonical tags | ✓ | Self-referential on every page |
| Robots meta | ✓ | `index, follow, max-image-preview:large, max-snippet:-1` |
| `<html lang="en">` | ✓ | Set |
| Viewport meta | ✓ | Mobile-friendly |
| CDN / caching | ✓ | Vercel edge, `X-Vercel-Cache: HIT` |
| Single H1 per page | ✓ | All 4 pages |

### Issues found

**Missing security headers (HIGH).** Beyond HSTS, the following are absent from the server response:

| Header | Current | Recommended |
|---|---|---|
| `X-Content-Type-Options` | (missing) | `nosniff` |
| `X-Frame-Options` / `frame-ancestors` | (missing) | `DENY` or CSP frame-ancestors |
| `Referrer-Policy` | (missing) | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | (missing) | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | (missing) | At minimum, a report-only CSP |

These appear in Lighthouse "Best Practices" and feed into Google's overall quality signals.

**Subdomain ceiling (CRITICAL).** Search engines treat `gaurav-portfolio-g1ks.vercel.app` as a subdomain of `vercel.app`. You cannot build your own backlink profile or domain authority on this address. Every link earned is ultimately a link to "vercel.app". Fix: register a custom domain (`gauravkumar.dev`, `gaurav.codes`, etc.) and add it in Vercel's project settings — takes 5 minutes once the domain is purchased.

**Thin indexable surface (HIGH).** Whole site has 4 URLs. The site has rich content across Work, About, Services, Selected Work projects — but each project is just a card on the homepage, not a /work/<slug> page. The Selected Work section alone references 6 projects that could each be their own indexable case study (Amazon Analytics, NeoMail, Graphic Design Services, UK Petroleum Analytics, BulkGen, Toolhub).

**Section 8 below covers performance/CWV separately.**

---

## 2. Content Quality & E-E-A-T

### What's working

- **Experience signal:** "1.5+ years, 10+ projects, 4+ clients worldwide", quantified outcomes ("70% reporting time reduction", "60%+ workflow automation"). Numbers > vague claims.
- **Expertise signal:** Specific tech depth across 17 technologies, project descriptions name actual tools (Puppeteer Stealth, PostgreSQL window queries).
- **Authoritativeness:** Author byline on blog posts, LinkedIn + GitHub linked, contact info present.
- **Trustworthiness:** Real name, real photo, real address (Bilaspur, HP), real phone, real email. Author meta tag on every page.
- **Blog posts are not thin** — 1,069 and 1,208 words respectively, walking through real architecture decisions. This is the kind of content Google AI Overviews + Perplexity cite.

### Issues found

**Volume of content (HIGH).** Two blog posts is the floor of "having a blog at all". Topical authority requires breadth + depth + consistency. Target: 1 post / week for 12 weeks → 12–14 indexable long-form pages would dramatically expand the surface area for long-tail rankings.

**Homepage word count (MEDIUM).** ~908 visible words. Adequate. Page-type matters more than raw count: this is a portfolio homepage, not a guide, so don't pad. But the **Services** section in particular could become its own page (4× the depth) to rank for commercial-intent queries like "hire React Node freelance developer".

**E-E-A-T gaps (MEDIUM):**
- No `/about/` page with deeper bio + photo + credentials timeline
- No testimonials / client logos with attribution (the case studies hint at clients but don't name or quote them)
- No verifiable third-party signals (no "Featured on", "Speaker at", press mentions)

**Content freshness (LOW).** `lastmod: 2026-05-11` on all four URLs — that's about 2.5 weeks old at audit time. Update the sitemap (and `dateModified` in JSON-LD) on substantive content changes.

---

## 3. On-Page SEO

### What's working

| Element | Status |
|---|---|
| Title tag on every page | ✓ |
| Meta description on every page | ✓ |
| Self-referential canonical | ✓ |
| One H1 per page | ✓ |
| Heading hierarchy (H1→H2→H3) | ✓ Logical |
| Open Graph (full set) | ✓ |
| Twitter Card | ✓ |
| `og:image:alt` | ✓ |
| `article:published_time` / `article:modified_time` | ✓ on blog posts |

### Issues found

**Title length too long (HIGH).**

| Page | Title length | Status |
|---|---|---|
| Homepage | 68 chars | Borderline truncation |
| Blog index | 82 chars | Will truncate |
| Blog post 1 | 81 chars | Will truncate |
| Blog post 2 | 83 chars | Will truncate |

Google's SERP truncates titles around 580px (~55–60 characters on average). Recommended targets:

- Homepage: `Gaurav Kumar — Full-Stack Developer (React & Node)` — 51 chars
- Blog index: `Engineering Blog — Gaurav Kumar` — 31 chars
- Blog post 1: `Amazon Ads Dashboard with Puppeteer + Postgres` — 47 chars
- Blog post 2: `4 Finance Dashboards in 9 Months — React + Node Playbook` — 57 chars

(Brand name doesn't have to be in every blog post title — Google often appends it from sitelinks.)

**Meta keywords tag still present (MEDIUM).** `<meta name="keywords">` with 17 keywords on the homepage. Google has ignored this tag for 15+ years; Bing too. Leaving it in does no SEO harm but **publicly exposes your keyword strategy** to competitors. Remove it.

**`og:locale` mismatch (MEDIUM).** Set to `en_US` but site explicitly says "Based in India, IST/UTC+5:30". Use `en_IN`, or include both via `og:locale:alternate`.

**Hashtag navigation limits SEO scope (HIGH — structural).** `#work`, `#about`, `#services`, `#contact` all resolve to the homepage. Google indexes them as the same URL. Convert at minimum **Services** and **About** into separate pages with their own titles, descriptions, and content focus. (Selected Work → `/work/<project>/` case studies would also be valuable; see Critical fix #5.)

---

## 4. Schema / Structured Data

**This is the strongest part of the site.** 11 schema types across 4 pages, all valid JSON-LD, no parsing errors. Specifically:

| Page | Schemas present |
|---|---|
| Homepage | Person, WebSite, ProfilePage, ProfessionalService (with OfferCatalog), ItemList (Selected Work), FAQPage |
| Blog index | Blog, BreadcrumbList |
| Blog post 1 | BlogPosting (with image dimensions), BreadcrumbList |
| Blog post 2 | BlogPosting, BreadcrumbList |

### Issues found

**FAQPage on a commercial portfolio (INFO).** Google removed FAQ rich-result eligibility in August 2023 for all sites except government and health sites. Your FAQ schema **will not produce rich snippets in Google SERP**. However:

- It still helps **AI search engines** (Perplexity, ChatGPT, Google AI Overviews) cite specific Q&A passages directly.
- Keep it — it's not harmful and provides real GEO value — just don't expect SERP stars.

**Missing schemas (LOW):**

- `BreadcrumbList` on homepage (you have it on /blog/ — for consistency, add a 1-item breadcrumb on the homepage or skip)
- No `Article` / `TechArticle` on blog posts — you used `BlogPosting` which is correct, but `TechArticle` would be more specific for engineering writeups
- `ProfessionalService.aggregateRating` / `review` — if you can collect a couple of real client testimonials with permission, adding them as nested `Review` would unlock review stars in some surfaces

**Inconsistent dates (LOW).** ProfilePage `dateCreated: 2024-01-01` is suspiciously round — verify accuracy or set to actual site launch date.

---

## 5. Performance / Core Web Vitals

**Field data unavailable** — Google PageSpeed Insights API returned `429 Too Many Requests` during the audit window. Recommend running PSI manually at https://pagespeed.web.dev/ for current LCP/INP/CLS numbers. Code-level signals:

### What's working

- Hero image preloaded: `<link rel="preload" as="image" href="img/profilepic.webp" type="image/webp" fetchpriority="high">`
- WebP source with PNG fallback via `<picture>`
- Hero image has explicit `width="540" height="720"` (no CLS from this image)
- `decoding="async"` on hero
- Google Fonts loaded with `media="print"` swap trick (non-blocking)
- DNS prefetch / preconnect for fonts.googleapis.com, fonts.gstatic.com, cdn.jsdelivr.net
- Vercel edge CDN with `X-Vercel-Cache: HIT`

### Concerns (medium-likelihood, based on code inspection)

| Element | Risk |
|---|---|
| `<canvas class="bg-grain">` running JS animation | INP impact on low-end mobile, possible CLS if sized late |
| `cursor-dot` + `cursor-ring` custom cursor with JS tracking | INP/long-task risk |
| `pre-loader` with counter animation | LCP delay — loader covers screen until count completes |
| 28 third-party SVG icons from `cdn.jsdelivr.net` (tech marquee, duplicated for loop) | Multiple network roundtrips even with preconnect |
| Marquee scrolling animation | Layout work, possible CLS on resize |
| `bg-orb` × 3 with CSS animations | Generally GPU-accelerated but worth checking with DevTools |

### Recommendations

1. Measure first with `pagespeed.web.dev` — don't optimize blind.
2. If the pre-loader animates for > 1s, that **is** your LCP. Either remove it or set a maximum 800ms display.
3. Self-host the 14 tech icons as inline SVG or a sprite — eliminates 14 third-party requests.
4. Consider a `prefers-reduced-motion` opt-out for the background canvas + cursor effects (also good for accessibility).

---

## 6. Images

**Strong overall.** 36 images on the homepage, 0 missing alt attributes, 1 intentional empty alt (`<img id="navPeekImg" src="" alt="">` — a dynamically-populated preview image, correct usage).

- Hero portrait: WebP + PNG fallback, width/height set, alt descriptive ✓
- Project screenshots in Selected Work: alt attributes present ✓
- Image sitemap entries included in `sitemap.xml` ✓

### Issues

**External icon CDN (LOW).** All 14 technology icons load from `cdn.jsdelivr.net/gh/devicons/devicon/...`. Each is ~1–3 KB SVG. Self-hosting would:
- Eliminate one third-party domain (DNS + TLS + HTTP overhead)
- Allow inlining as a sprite (single request)
- Avoid CDN outage risk

**Hero image dimensions (LOW).** `width="540" height="720"` is fine for the displayed size, but the source `profilepic.png` may be a much larger file. Confirm it's been compressed (target: <100 KB WebP for a 540×720 portrait).

---

## 7. AI Search Readiness (GEO)

This site is **above average** for AI citability — schema is rich, content uses clear question/answer framings on blog posts, FAQPage explicitly answers natural-language hiring questions.

### What's working

- FAQPage with hiring-intent Q&As (LLMs love structured Q&A)
- BlogPosting with full author, publisher, dates, image dimensions
- ProfilePage marking the homepage as Gaurav's profile entity
- Person schema with sameAs links to LinkedIn + GitHub (cross-platform identity = stronger entity confidence)
- Specific, citable claims throughout: "cut weekly reporting from 4 hours to 5 minutes", "3,500+ keywords across 18 ASINs", "70% reporting time reduction"

### Issues

**No `llms.txt` (MEDIUM).** A small text file at the site root that summarizes the site for LLM crawlers. Recommended content for a portfolio:

```
# Gaurav Kumar — Full-Stack Developer

> Freelance React, Node.js and Next.js developer specialising in finance
> dashboards and Amazon advertising analytics. Based in Bilaspur, HP,
> India. Working with finance and e-commerce teams worldwide.

## Profile
- [Homepage](/)
- [Engineering Blog](/blog/)

## Selected Engineering Writeups
- [Amazon Ads analytics dashboard with Puppeteer + PostgreSQL](/blog/amazon-analytics-puppeteer-postgres.html)
- [4 finance dashboards in 9 months — React + Node playbook](/blog/finance-dashboards-playbook.html)

## Contact
- Email: Gauravthakur1k@gmail.com
- LinkedIn: https://www.linkedin.com/in/gaurav-kumar-6bb732230/
- GitHub: https://github.com/tgaurav1k
```

**No AI-crawler-specific robots rules (LOW).** Current robots.txt is `User-agent: *` — that's correct (allows all). No action needed unless you decide to block specific AI crawlers (GPTBot, ClaudeBot, PerplexityBot).

**Brand mention coverage (HIGH — but slow-burn).** AI engines weight "is this entity mentioned elsewhere on the web?". For a personal brand:
- Active LinkedIn (already linked)
- GitHub README (your `tgaurav1k` profile)
- Dev.to / Medium / Hashnode cross-posts of blog content
- Stack Overflow profile if applicable
- Speaking / podcast appearances (long-term)

---

## 8. Search Experience Optimization (SXO)

### Page-type match

- **Homepage** → searched as "Gaurav Kumar [...]" or "React developer portfolio". Page is a **portfolio/profile** — correct match.
- **Blog post 1** → "Amazon Ads scraper Puppeteer", "Amazon ACOS dashboard architecture". Page is a **technical engineering writeup with code-level detail** — correct match for the deeply-technical persona Google ranks for these queries.
- **Blog post 2** → "finance dashboard React Node playbook", "audit log React". Page is a **playbook / opinionated framework** — correct match.

### Persona scoring (3 personas)

**Persona A — Recruiter / hiring manager (the warm-traffic case):**
Lands via your LinkedIn or direct share. The hero, badges ("Available for projects"), tech-strip, stats, and "Get in touch" CTA do their job. **Score: 9/10.**

**Persona B — Cold organic searcher for "React Node freelance India":**
You're up against LinkedIn, Toptal, Upwork, Indeed. Even if you ranked, this searcher wants to scan 10 candidates fast. Your homepage's animation-heavy intro and pre-loader work *against* fast scanning. **Score: 6/10.** Consider a "quiet skin" version of the homepage that loads instantly with no pre-loader for inbound recruiter traffic.

**Persona C — Engineer searching for the blog content:**
Specific, code-level intent. They want copy-pasteable architecture. Your blog posts deliver. **Score: 9/10.**

### Search intent mismatches

None detected. The pages match the intent their titles imply.

---

## 9. Sitemap Analysis

```
URLs in sitemap: 4
- / (priority 1.0, monthly, 5 image entries)
- /blog/ (priority 0.8, weekly, no images)
- /blog/amazon-analytics-puppeteer-postgres.html (priority 0.9, monthly, 1 image)
- /blog/finance-dashboards-playbook.html (priority 0.9, monthly, 1 image)
```

### Strengths
- Image sitemap extension correctly used
- `lastmod` present and recent
- Priorities sensibly differentiated

### Issues
- **Only 4 URLs** — see Critical fix #2 (separate pages for Services, About, Work projects).
- **`changefreq` is hinted, not authoritative** — Google has stated it largely ignores this. Not harmful.

---

## 10. Crawlability Summary

- robots.txt: open + points to sitemap ✓
- No `noindex` meta tags ✓
- No paginated/canonical conflicts ✓
- No accidental noindex via `X-Robots-Tag` header ✓
- All sitemap URLs returned HTTP 200 ✓
- No broken internal links observed in the 4 pages crawled

---

## Synthesis — the 10-Principle Lens

| Phase | Observation |
|---|---|
| **Perceive (external)** | Highly competitive head terms ("React developer India") are dominated by SaaS marketplaces and aggregators; portfolios rarely rank for them. The realistic wins for you are: (a) your name, (b) long-tail engineering queries, (c) AI-engine citations. |
| **Perceive (internal)** | The site's craft is well above average. Schema and on-page basics are essentially solved. Constraints are structural (subdomain, page count, blog volume), not technical. |
| **Listen** | User's stated goal is "rank on top of Google with current Vercel URL, fix other issues later, buy domain later". This sequencing means: do all on-page/structural work now so when the domain moves, the site is already optimized; new domain inherits a polished site. |
| **Think** | First principle: Google ranks **pages**, not sites. More pages × matching intent = more rankings. The largest ROI lever here is *creating more indexable URLs* (services pages, project case studies, more blog posts), because everything else is already in good shape. |
| **Connect (lateral)** | Pattern from successful indie developer portfolios: 20–40 blog posts, separate /work/<project> pages, separate /uses or /now style pages, GitHub README cross-link. Each contributes its own long-tail traffic. |
| **Connect (system)** | Order of operations matters: (1) flatten the quick wins (titles, headers, llms.txt, meta keywords); (2) split hash-sections into pages; (3) commit to weekly blog cadence; (4) when ready, buy domain — site is already shaped to win. Skipping order and buying the domain first leaves authority growing on a thin site. |
| **Feel** | The instinct that "this site needs more content" is right. The instinct that "fix the small things first" is also right — but only because the small things are quick. The actual growth lever is content cadence. |
| **Accept** | Falsifiability: if after 12 weeks of weekly blog posts + this audit's fixes, Google Search Console shows no impression growth, the diagnosis was wrong and we revisit (likely the subdomain issue dominates). |
| **Act** | See ACTION-PLAN.md for sequenced execution. |
| **Grow** | Leading indicator to monitor *without* re-auditing: weekly Google Search Console impressions on your name + on long-tail blog terms. Trending up = compounding works; flat for 8+ weeks = need a different lever. |

---

## Score Breakdown

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 82 | 18.0 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 85 | 17.0 |
| Schema / Structured Data | 10% | 95 | 9.5 |
| Performance (CWV) | 10% | 78 | 7.8 |
| AI Search Readiness | 10% | 75 | 7.5 |
| Images | 5% | 92 | 4.6 |
| **TOTAL** | **100%** | — | **82.3** |

Performance score is conservative — measured field data (CrUX) could move it either direction by ±10 points.

---

## What the audit could *not* check

- **Live Core Web Vitals (field data)** — PageSpeed Insights API returned 429. Run https://pagespeed.web.dev/ manually.
- **Google Search Console data** — no GSC credentials configured; can't see actual impressions, clicks, positions, or indexation status.
- **Backlink profile** — no Moz / Ahrefs / DataForSEO credentials; assume close to zero backlinks for a subdomain.
- **Live SERP positions** — no DataForSEO; can't tell where you currently rank for any target keyword.
- **JavaScript-rendered content** — fetched server-rendered HTML only; if any content is JS-injected, this audit missed it (though this site appears static).

To unblock these: connect Google Search Console (verify the property at https://search.google.com/search-console/) and re-run with `/seo google` once data accumulates.
