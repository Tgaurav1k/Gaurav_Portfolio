# Action Plan — gaurav-portfolio-g1ks.vercel.app

Prioritized fixes from the full audit. Critical → High → Medium → Low.
Each fix: **What**, **Why**, **How**, **How we'll know it worked**.

---

## CRITICAL

### C1 — Move to a custom domain (deferred per user — keep planned)

**What:** Buy `gauravkumar.dev` / `gaurav.codes` / `gauravbuilds.com` (~$10–15/yr) and point it at this Vercel deployment.
**Why:** `*.vercel.app` cannot accrue independent domain authority. Every backlink earned for this site currently strengthens `vercel.app`, not you. This is the structural ceiling on rankings for competitive terms.
**How:**
1. Buy domain from Namecheap / Cloudflare Registrar / Porkbun
2. In Vercel dashboard → project → Domains → add domain
3. Update DNS as Vercel instructs (5 min)
4. Vercel auto-issues TLS cert
5. Add 301 redirect from old `.vercel.app` URL → new domain (Vercel does this automatically when you set the new domain as the production domain)
6. Resubmit sitemap in Google Search Console under the new domain property

**How we'll know it worked:** New domain serves the site, the old `.vercel.app` 301-redirects, GSC indexing the new domain.
**Status:** Deferred per user — proceed with H/M/L fixes on current URL.

---

## HIGH

### H1 — Add full security headers via `vercel.json`

**What:** Create or update `vercel.json` in the project root with:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' https://cdn.jsdelivr.net data:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'" }
      ]
    }
  ]
}
```

**Why:** Lighthouse Best Practices score, signals trustworthy site to Google's quality systems. CSP also defends against XSS.
**How:** Commit `vercel.json`, push to main, Vercel auto-deploys.
**How we'll know it worked:** `curl -I https://gaurav-portfolio-g1ks.vercel.app/` shows the new headers. Run https://securityheaders.com/ on the URL — target grade A.

---

### H2 — Shorten titles to ≤60 characters

**What:** Update `<title>` on all 4 pages.

| Page | Current (chars) | Proposed (chars) |
|---|---|---|
| Homepage | `Gaurav Kumar — Full-Stack Developer \| React, Node & Amazon Analytics` (68) | `Gaurav Kumar — Full-Stack Developer (React & Node)` (51) |
| Blog index | `Blog — Gaurav Kumar \| Engineering notes on dashboards, scraping & full-stack craft` (82) | `Engineering Blog — Gaurav Kumar` (31) |
| Blog post 1 | `Amazon Ads analytics dashboard with Puppeteer Stealth + PostgreSQL — Gaurav Kumar` (81) | `Amazon Ads Dashboard with Puppeteer + Postgres` (47) |
| Blog post 2 | `4 finance dashboards in 9 months — the React + Node playbook that worked every time` (83) | `4 Finance Dashboards in 9 Months — React + Node Playbook` (57) |

Also shorten matching `og:title` and `twitter:title`.

**Why:** Google truncates titles at ~580px (≈55–60 chars). Full-title visibility = higher CTR. Brand name doesn't need to repeat in every title — Google often appends it from sitelinks.
**How:** Edit `<title>` in each HTML file.
**How we'll know it worked:** After re-indexing (1–2 weeks), check Google SERP for your branded query — full title visible, no `…` truncation.

---

### H3 — Split hash-sections into real pages

**What:** Convert `/#services`, `/#about`, and (optionally) each Selected Work card into separate URLs.

Recommended new pages:
- `/services/` — full freelance services page (target: "hire react node freelance developer india")
- `/about/` — extended bio + timeline + photo (target: "Gaurav Kumar developer")
- `/work/amazon-analytics/` — case study of the Amazon Analytics platform
- `/work/finance-dashboards/` — case study of the finance dashboard work
- `/work/neomail/` — NeoMail case study

Each page: unique `<title>`, unique meta description, unique H1, 600+ words of content, internal links back to homepage and related pages, BreadcrumbList schema, image with alt.

**Why:** Google ranks **pages**, not sites. `#anchor` fragments are not separate URLs. Currently your site has 4 indexable URLs across the whole property. Adding 5–8 more pages each targeting a different keyword cluster = 5–8 new ranking opportunities.
**How:** Each new page can largely be a `<section>` extracted from the homepage + 2–3x the depth. Add to `sitemap.xml`. Cross-link from homepage's existing section.
**How we'll know it worked:** Each new URL appears as "Indexed" in GSC within 2–4 weeks; impressions appear for the targeted query.

---

### H4 — Publish more blog content (cadence)

**What:** Commit to **1 long-form post per week for 12 weeks**. Target 1,000–1,800 words each.
**Why:** Topical authority is built by breadth, not by a single post. AI engines (Perplexity, Google AI Overviews) preferentially cite domains with sustained publishing on a topic. Long-tail traffic compounds — each post averages dozens of unique long-tail queries.
**How:** See `KEYWORD-STRATEGY.md` for 24 ready-to-write topics tied to specific keyword targets.
**How we'll know it worked:** GSC impressions chart climbs steadily over the 12 weeks. After 3 months, total impressions / month is 5–10x the baseline.

---

### H5 — Remove `<meta name="keywords">`

**What:** Delete the `<meta name="keywords">` tag from `home.html` (and any other page where it appears).
**Why:** Google has not used the keywords meta tag since 2009. Bing the same. It does **nothing** for SEO. What it *does* do: publicly hand competitors a list of every keyword you're targeting. Walk into any competitor analysis tool, and your meta keywords tag is the first thing they see.
**How:** Delete line 10 of `home.html`. Repeat on any other page that has it.
**How we'll know it worked:** Headers no longer contain the keywords list; no measurable ranking change (because Google never used it).

---

## MEDIUM

### M1 — Create `llms.txt` at site root

**What:** Add `/llms.txt` (and `/llms-full.txt` for the long form) — a standard for LLM/AI-crawler discoverability.
**Why:** Modern AI search engines (Perplexity, Anthropic's web tools, etc.) check `llms.txt` to understand site structure and pull key context efficiently.
**How:** See content draft in the audit report § 7. Save as `public/llms.txt` (or wherever your static root is).
**How we'll know it worked:** `curl https://gaurav-portfolio-g1ks.vercel.app/llms.txt` returns 200 with content. Over weeks/months, increased AI-engine citation traffic in referer logs.

---

### M2 — Fix `og:locale` mismatch

**What:** Change `<meta property="og:locale" content="en_US">` to `en_IN`.
Optionally add `<meta property="og:locale:alternate" content="en_GB">` and `en_US` if targeting those markets.
**Why:** Tiny signal but inconsistent with site copy ("Based in India, IST/UTC+5:30"). Affects how Facebook/LinkedIn share previews are localized.
**How:** Edit line 22 of `home.html`.
**How we'll know it worked:** Visible in source; LinkedIn/Facebook share previews show India context.

---

### M3 — Self-host the 14 tech-stack SVG icons

**What:** Download the 14 SVGs from `cdn.jsdelivr.net/gh/devicons/devicon/icons/...`, save to `/icons/` in your repo, inline them as an SVG sprite or reference them with `<img src="/icons/react.svg">`.
**Why:** Removes a third-party domain dependency, eliminates 14 separate cross-origin requests, removes a CDN outage risk, faster paint on mobile.
**How:** `curl` each one, commit to repo, update markup. ~30 min of work.
**How we'll know it worked:** Network panel shows no requests to `cdn.jsdelivr.net`; LCP improves on cold-cache loads.

---

### M4 — Add a Services page with deeper commercial content

**What:** Build `/services/` covering:
- Finance dashboard development (P&L, AR aging, reconciliation, expense automation) — 250 words
- Amazon advertising analytics (ACOS, ROAS, keyword/rank tracking with Puppeteer Stealth + PostgreSQL) — 250 words
- Full-stack MERN development (auth, state management, deployment) — 250 words
- "How I work" (process, timeline, what's included, pricing range) — 200 words
- "Past results" (the 70%/60% stats with context) — 150 words
- FAQ tailored to commercial-intent queries — 6–10 Q&As

**Why:** Commercial-intent queries ("hire react developer", "freelance finance dashboard developer") will rank a dedicated services page over a portfolio homepage. Plus this is the page that converts visitors → inquiries.

**How:** Extract from the current `#services` section, expand by 5×. Add `Service` schema for each offering.

**How we'll know it worked:** Page indexed within 2 weeks; first impressions for hire-intent queries within 6 weeks.

---

### M5 — Add testimonials / social proof

**What:** Collect 3–5 short written testimonials from B3 Solution colleagues, past clients, or anyone you've shipped for. With permission, name them. Add to homepage and `/services/`.
**Why:** Direct E-E-A-T trust signal. Google's quality raters explicitly look for third-party validation. Recruiters / hiring managers convert higher with social proof.
**How:** Reach out to 5 people, request a 2–3 sentence quote, get permission to use name + company + LinkedIn link. Add as `<blockquote>` with `Review` schema nested under your `ProfessionalService`.
**How we'll know it worked:** Visible on site; potential `Review` rich result; higher conversion rate on contact form.

---

### M6 — Measure CWV with PageSpeed Insights manually

**What:** Run https://pagespeed.web.dev/?url=https://gaurav-portfolio-g1ks.vercel.app/&form_factor=mobile and the desktop equivalent.
**Why:** API was rate-limited during this audit. Real LCP/INP/CLS numbers — particularly mobile — determine whether the pre-loader + canvas + cursor effects need to be cut.
**How:** Run, screenshot results, address any "Fail" categories. If LCP > 2.5s on mobile, remove or shorten the pre-loader (it covers the screen until count completes — that *is* the LCP element).
**How we'll know it worked:** All three CWV in "Good" range on mobile.

---

## LOW

### L1 — Update `ProfilePage.dateCreated`

**What:** Set to actual site launch date (not generic `2024-01-01T00:00:00+05:30`).
**Why:** Minor accuracy / trust signal.
**How:** Edit `home.html` schema block.

### L2 — Add `BreadcrumbList` to homepage (or harmonize by removing from blog index)

**What:** Either both blog pages and homepage have breadcrumbs, or none do. Currently mixed.
**Why:** Consistency.
**How:** Either add a 1-item breadcrumb to homepage or accept the current state (it's not broken — just inconsistent).

### L3 — Use `TechArticle` instead of `BlogPosting` on engineering posts

**What:** Change schema `@type` from `BlogPosting` to `TechArticle` on both blog posts (it's more specific).
**Why:** Schema specificity helps entity classification in Google's Knowledge Graph and AI systems.
**How:** Edit the JSON-LD block; rest of the schema fields are compatible.

### L4 — Add `Article.author.sameAs` consistency

**What:** Ensure every author reference (`Person`, `BlogPosting.author`, etc.) uses the same `@id` URL.
**Why:** Helps search engines treat all references as the same entity.
**How:** Replace duplicated author objects with `{"@id": "https://gaurav-portfolio-g1ks.vercel.app/#gaurav"}` references.

### L5 — Verify hero image file size

**What:** Inspect `img/profilepic.webp` actual file size.
**Why:** Even at 540×720 displayed, the source might be larger than needed.
**How:** `curl -sI` the WebP — target <100 KB. If larger, re-encode at quality 75–80.

### L6 — Add a `/uses/` or `/now/` style page

**What:** Indie-developer convention pages. `/uses/` lists your tools/setup; `/now/` is what you're working on this month.
**Why:** Both rank well for branded queries, add personality, and tend to attract organic backlinks (the `/uses/` and `/now/` directories link out to people who publish these pages).
**How:** Create as separate static pages; submit to https://uses.tech and https://nownownow.com.

### L7 — Cross-post blog content to Dev.to / Hashnode / Medium

**What:** Republish each blog post on Dev.to (with `canonical_url` pointing to your domain).
**Why:** Reach + brand mention signal. Each cross-post is also discoverable by AI engines.
**How:** Manual copy-paste; set `canonical_url` in Dev.to front matter so Google credits the original.

---

## Sequenced Execution Plan

### Week 1 (~3 hours total) — Quick wins
- [ ] H5: Remove meta keywords (5 min)
- [ ] H1: Add security headers via `vercel.json` (30 min)
- [ ] H2: Shorten titles on all 4 pages (30 min)
- [ ] M2: Fix `og:locale` (2 min)
- [ ] M1: Publish `llms.txt` (30 min)
- [ ] M6: Run PSI manually, screenshot results (15 min)
- [ ] L1, L3, L4: Schema cleanups (30 min)

### Weeks 2–3 (~6 hours total) — Structural
- [ ] H3: Build `/services/`, `/about/` as separate pages
- [ ] M4: Expand the new `/services/` page with deeper commercial content + `Service` schema
- [ ] M3: Self-host the 14 SVG icons

### Weeks 4–6 (~10 hours total) — Case studies + social proof
- [ ] H3 continued: Build 3 `/work/<project>/` case-study pages (Amazon Analytics, Finance Dashboards, NeoMail)
- [ ] M5: Collect & publish 3–5 testimonials

### Weeks 4–15 (parallel, ongoing) — Content cadence
- [ ] H4: Publish 1 blog post / week. See `KEYWORD-STRATEGY.md` for the 24-topic backlog.

### Whenever you're ready
- [ ] C1: Buy custom domain, point at Vercel, set as production domain
- [ ] L6: Add `/uses/`, `/now/`
- [ ] L7: Start cross-posting blog to Dev.to with canonical back to your site

---

## How to know the audit's recommendations are *actually* working

**4-week checkpoint:** Set up Google Search Console for the site (free, takes 5 min to verify via Vercel domain). Then watch:

- **Total impressions trend** — should grow week-over-week as you publish
- **Queries you're being shown for** — should diversify beyond just your name
- **Average position** — should be improving on your name queries first, then slowly on long-tail blog queries

**12-week checkpoint:** If your weekly post + structural fixes are landing, you should see:
- 10–20× the baseline GSC impressions
- Ranking #1–3 for "Gaurav Kumar full-stack developer" type queries
- Long-tail rankings for blog topics (positions 10–50, climbing)
- Occasional AI citation traffic (visible in GA / Plausible referer logs as Perplexity / ChatGPT)

**If after 12 weeks of consistent work you see no growth:** the diagnosis was wrong. Most likely cause = subdomain authority cap. That's the trigger to execute C1 (buy domain) immediately.
