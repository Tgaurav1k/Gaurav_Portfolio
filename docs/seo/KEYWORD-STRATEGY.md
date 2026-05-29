# Keyword Strategy — gaurav-portfolio-g1ks.vercel.app

**Goal:** Maximize real, click-generating Google rankings — not vanity keyword counts.

This document maps every keyword cluster to a specific page (existing or to-create) and the supporting/semantic terms to weave into that page's content. It is the operational counterpart to `ACTION-PLAN.md` § H3 (new pages) and § H4 (blog cadence).

---

## How modern keyword targeting works (2026)

Google does **not** rank you for keywords listed in a meta tag. It ranks you when:

1. A **page's primary keyword** appears in the **title**, **H1**, **first 100 words**, **URL slug**, and the **`<title>` of the OG/Twitter preview**
2. **Supporting (LSI / semantic) keywords** appear naturally in the body
3. The page genuinely **answers the question** behind that keyword
4. Other sites and AI engines reference your page on that topic

So the playbook is: **one focused keyword per page, with 10–20 supporting terms naturally woven in.**

---

## Keyword Tier Definitions

| Tier | Search volume | Competition | Realistic timeline to rank |
|---|---|---|---|
| **Head** | 1,000+ /mo | Brutal (LinkedIn, Toptal, Indeed) | Unlikely on `.vercel.app`; possible on own domain after 12+ months |
| **Mid-tail** | 100–1,000 /mo | High but reachable | 6–12 months with sustained content |
| **Long-tail** | 10–100 /mo | Reasonable | 2–6 months — **focus here** |
| **Branded** | Variable | None (it's your name) | Immediate to 4 weeks |
| **Question** | Variable | Low — AI engines weight high | 1–3 months; great for AI Overview citations |

---

## Cluster 1 — Branded / "Find me by name" (Tier: Branded — easy wins)

**Page:** `/` (homepage) — already optimized
**Primary keyword:** `Gaurav Kumar full-stack developer`
**Supporting terms to add to homepage opening paragraph:**
- Gaurav Kumar developer Bilaspur
- Gaurav Kumar React Node
- Gaurav Kumar B3 Solution
- Gaurav Kumar portfolio
- Gaurav Thakur developer (alternate name — already in `alternateName`)

**Action:** In the About section opening line, ensure your name appears with your role keyword close to it. Current opening (`I'm <strong>Gaurav Kumar</strong> — a full-stack developer...`) is already good. ✓

---

## Cluster 2 — Hire-intent freelance keywords (Tier: Mid-tail — the money cluster)

**Page to create:** `/services/` (per ACTION-PLAN H3 + M4)
**Primary keyword:** `hire freelance full-stack developer India`
**URL slug:** `/services/`
**Recommended `<title>`:** `Hire a Full-Stack Developer — React, Node & Next.js | Gaurav Kumar`
**Recommended H1:** `Freelance full-stack development for finance, e-commerce, and analytics teams`

**Supporting keywords to weave into body (use each 1–2 times naturally):**

| Keyword | Where to use |
|---|---|
| hire React developer India | Opening paragraph |
| freelance MERN developer | Services list |
| hire Next.js developer remote | Pricing / engagement section |
| Node.js backend developer India | Services list |
| freelance React Node engineer | About-this-service block |
| dashboard developer for hire | Section on dashboards |
| Amazon analytics developer freelance | Section on Amazon work |
| custom React Node application development | Engagement model section |
| MERN stack freelancer India | FAQ |
| remote full-stack developer Asia | FAQ |

**FAQ questions to add (these become AI-Overview citation magnets):**
- "How much does it cost to hire a freelance React developer in India?"
- "What's the difference between MERN and Next.js for a SaaS dashboard?"
- "How long does a typical finance dashboard project take?"
- "Can a freelance developer integrate with our existing Node.js codebase?"
- "Do you do fixed-price or hourly engagements?"

---

## Cluster 3 — Niche commercial: Finance dashboards (Tier: Long-tail — highly winnable)

**Page to create:** `/work/finance-dashboards/` (case study)
**Primary keyword:** `React finance dashboard developer`
**Recommended `<title>`:** `React Finance Dashboard Development — Case Study | Gaurav Kumar`
**Recommended H1:** `Building production finance dashboards in React + Node — what 4 projects taught me`

**Supporting keywords:**
- finance dashboard React Node tutorial
- P&L dashboard React
- AR aging dashboard frontend
- expense reconciliation automation
- bookkeeping dashboard custom development
- React PostgreSQL dashboard architecture
- finance reporting automation freelancer
- audit log React Node implementation
- CFO dashboard custom build
- monthly close automation dashboard

This page should also link to your existing `/blog/finance-dashboards-playbook.html` for the "playbook" expansion.

---

## Cluster 4 — Niche commercial: Amazon advertising analytics (Tier: Long-tail — highly winnable, hot vertical)

**Page to create:** `/work/amazon-analytics/`
**Primary keyword:** `Amazon Ads analytics dashboard developer`
**Recommended `<title>`:** `Custom Amazon Ads Analytics Dashboard — Case Study | Gaurav Kumar`

**Supporting keywords:**
- Amazon Seller Central scraper developer
- Puppeteer Stealth Amazon scraping freelancer
- ACOS dashboard custom build
- ROAS tracking dashboard React
- Amazon keyword rank tracker custom
- Amazon advertising automation developer
- Amazon Ads API alternative scraping
- PostgreSQL Amazon rank history schema
- Amazon agency tooling developer
- Amazon FBA analytics tool custom

This page can deeply expand the existing blog post into a longer, conversion-focused case study with screenshots.

---

## Cluster 5 — Long-tail engineering blog (Tier: Long-tail — your strongest current cluster)

**Pages:** Existing blog + 12 new posts over 12 weeks.

### 12-week blog topic backlog (each = one page targeting a specific search)

| Week | Target keyword | Working title |
|---|---|---|
| 1 | `Puppeteer Stealth login bypass Amazon` | Why my Puppeteer scraper kept getting blocked (and the 5 fixes that worked) |
| 2 | `PostgreSQL window function rank tracking` | The PostgreSQL window function that made rank history queries 50× faster |
| 3 | `React audit log component implementation` | Implementing an audit log in React + Node that finance teams actually trust |
| 4 | `Next.js dashboard rendering strategy` | When to SSR, when to ISR, when to client-render — a dashboard developer's flowchart |
| 5 | `Node.js cron job vs queue dashboard refresh` | Background refresh patterns for dashboards: cron, BullMQ, or webhooks? |
| 6 | `JWT HTTP-only cookie React Node tutorial` | The JWT + HTTP-only cookie auth setup I reuse on every project |
| 7 | `React dashboard performance large data table` | Rendering 50,000-row tables in React without freezing the page |
| 8 | `MongoDB TTL index email auto-expiry` | Building NeoMail's auto-expire feature with one MongoDB index |
| 9 | `Redux Toolkit RTK Query dashboard pattern` | Why I switched from plain Redux to RTK Query for dashboard apps |
| 10 | `CSV export React server-side architecture` | The "Download CSV" button that nearly took down my server |
| 11 | `Tailwind dashboard component library custom` | Building a reusable dashboard component kit on Tailwind (no shadcn) |
| 12 | `freelance developer client onboarding checklist` | My 12-step onboarding doc for every new freelance dashboard project |

### Per-post optimization template

For each blog post:
- `<title>`: ≤60 chars including the primary keyword
- URL slug: short, contains primary keyword (`/blog/postgres-window-rank-history.html`)
- H1: full primary keyword + a hook
- First paragraph: explicitly mentions primary keyword + the problem it solves
- `BlogPosting` (or `TechArticle`) JSON-LD with author, dates, image dimensions
- 1,000–1,800 words
- 3–5 internal links to other blog posts and the homepage
- 1 external authoritative link (MDN, official docs, etc.) — signals you cite sources
- 1 unique screenshot, code snippet, or diagram
- Closing CTA linking to `/services/` or `/contact/`

---

## Cluster 6 — Specific tech-stack searches (Tier: Long-tail — easy wins via existing project pages)

When you create `/work/<project>/` case studies, each one can rank for its tech-stack combo:

| Project case study | Likely-to-rank keyword |
|---|---|
| `/work/amazon-analytics/` | `Puppeteer PostgreSQL Amazon analytics architecture` |
| `/work/finance-dashboards/` | `React Node PostgreSQL finance dashboard` |
| `/work/neomail/` | `MERN email client JWT cookie auth` |
| `/work/uk-petroleum-analytics/` | `petroleum analytics dashboard custom build` |
| `/work/bulkgen/` | `AI bulk image generation platform architecture` |
| `/work/toolhub/` | `enterprise internal tool access platform React` |

---

## Cluster 7 — Question-format keywords (Tier: AI-engine optimization)

These are designed to be cited verbatim by Perplexity / ChatGPT / Google AI Overviews. Add as FAQPage entries OR as `<h2>` questions inside blog/services pages, with a direct 2–4 sentence answer immediately below.

Already in your FAQPage on homepage:
- "How do I hire Gaurav Kumar for a freelance project?"
- "What technologies does Gaurav specialise in?"
- "What kind of projects does Gaurav take on?"
- "Is Gaurav available for remote work outside India?"

**Add these (high AI-citation value):**

- "How long does it take to build a finance dashboard in React and Node?"
- "Can you scrape Amazon Seller Central legally for analytics?"
- "What's the best stack for a custom dashboard in 2026?"
- "How do you track keyword rank history in PostgreSQL?"
- "Is it better to use Puppeteer or the Amazon API for ad data?"
- "What does a freelance React developer in India typically cost?"
- "How do you handle authentication in a React + Node dashboard?"
- "Can a freelancer take a finance dashboard from idea to deployment alone?"

---

## What NOT to do (active anti-patterns)

| Don't | Why |
|---|---|
| Add 50 more keywords to the `<meta name="keywords">` tag | Ignored by Google since 2009. Hands strategy to competitors. |
| Repeat your primary keyword 15+ times on a page | "Keyword stuffing" — active Google penalty since 2011 |
| Buy keyword-heavy backlinks from link farms | Manual action / penalty in Search Console — recovery takes months |
| Hide keywords in white-on-white text or `display:none` | Old black-hat tactic; still actively penalized |
| Create thin pages targeting one keyword each | "Doorway pages" policy — penalized since 2015. Each page must have genuine, unique 600+ word content. |
| Use exact-match keyword anchor text on every internal link | Looks unnatural — Google's link analysis flags overoptimization |

---

## Where to validate keywords (free tools)

1. **Google Search itself** — type each target keyword, look at: autocomplete suggestions, "People also ask" box, "Related searches" at bottom. Free, unlimited, real Google data.
2. **Google Search Console** (after you verify the site) — the only way to see what queries Google is *actually* showing you for. Gold-standard data.
3. **AnswerThePublic** (free tier) — question-format expansions
4. **Google Trends** — directional, not absolute volume; useful for "is this rising?"
5. **Bing Webmaster Tools** — free keyword research tool (often overlooked, decent data)

For paid tools later: Ahrefs Webmaster Tools (free for verified sites), Moz Pro free trial, DataForSEO ($5 → comprehensive).

---

## The single most important insight

The fastest path to "more search visibility" for this site is **not** more keywords on existing pages. It's:

> **More pages, each targeting one realistic keyword, each genuinely useful.**

You currently have 4 indexable pages. The plan above gives you a roadmap to **~24 pages** within 12 weeks (4 existing + 5 structural new pages + 12 blog posts + ~3 case studies). Each is one more entry point into your site from Google.

That, plus the structural fixes in `ACTION-PLAN.md`, is what moves the needle. Not keyword volume — page volume × intent match × content quality.
