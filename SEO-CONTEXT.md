# SEO Context — Gaurav Kumar Portfolio

**Purpose of this file:** Hand-off doc so any new Claude / AI session can pick up
SEO work on this portfolio without losing context. Read this first before
making suggestions or edits.

**Canonical location:** Repo root — `SEO-CONTEXT.md` (relative to
`D:\Projects\website portfolio\PortfolioCloude\Main portfolio\`).
Backup copy at `C:\Users\tgaur\seo-audit-gaurav-portfolio\SEO-CONTEXT.md`.

**Companion docs in this repo (`docs/seo/`):**
- `docs/seo/FULL-AUDIT-REPORT.md` — full SEO audit (Score 82/100), all findings
- `docs/seo/ACTION-PLAN.md` — prioritised fixes Critical → High → Medium → Low
- `docs/seo/KEYWORD-STRATEGY.md` — 7 keyword clusters mapped to pages + 12-topic blog backlog

**Last updated:** 2026-05-29

---

## 1. Project facts

| Item | Value |
|---|---|
| Site | https://gaurav-portfolio-g1ks.vercel.app/ |
| Owner | Gaurav Kumar (alt: "Gaurav Thakur") |
| Owner location | Bilaspur, Himachal Pradesh, India (174001, IST/UTC+5:30) |
| Owner employer | B3 Solution (full-stack developer) + freelance |
| Owner email | Gauravthakur1k@gmail.com |
| Owner LinkedIn | https://www.linkedin.com/in/gaurav-kumar-6bb732230/ |
| Owner GitHub | https://github.com/tgaurav1k |
| User's account email (Claude) | info@zerodragautomation.com |
| Local repo path | `D:\Projects\website portfolio\PortfolioCloude\Main portfolio` |
| GitHub repo | https://github.com/Tgaurav1k/Gaurav_Portfolio |
| Audit artifacts folder | `C:\Users\tgaur\seo-audit-gaurav-portfolio\` |
| Hosting | Vercel (auto-deploy on push to `main`) |
| Stack | Static HTML, vanilla JS + GSAP/ScrollTrigger, no SSR framework |
| Build system | None (Vercel serves static files directly) |
| Node script | `scripts/publish-scheduled.mjs` (Node 20+, ES modules) |

## 2. Critical structural constraint (read this first)

**The site is on a `*.vercel.app` subdomain.** Google treats this as a
subdomain of `vercel.app`, not the site's own domain. Consequences:

- Cannot accrue independent domain authority
- Backlinks earned strengthen `vercel.app`, not this site
- Competitive head terms ("React developer India", "freelance MERN developer")
  are unreachable until a custom domain is in place
- Realistic wins on the current URL: owner's name + qualifier, long-tail
  technical queries, AI-engine citations

User has **deferred custom domain purchase** — work is being done on the
Vercel URL with the understanding that it will all transfer cleanly when a
domain is added (Vercel handles 301s automatically).

**Do not** keep pushing the user to buy a domain — they know and will do it
when ready.

## 3. SEO Health Score (post-work, May 28)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 82 | 18.0 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 85 | 17.0 |
| Schema / Structured Data | 10% | 95 | 9.5 |
| Performance (CWV) | 10% | 78 | 7.8 |
| AI Search Readiness | 10% | 75 | 7.5 |
| Images | 5% | 92 | 4.6 |
| **TOTAL** | | | **82 / 100** |

Full audit at `docs/seo/FULL-AUDIT-REPORT.md` (also at `C:\Users\tgaur\seo-audit-gaurav-portfolio\FULL-AUDIT-REPORT.md`).
Action plan at `docs/seo/ACTION-PLAN.md`.
Keyword strategy at `docs/seo/KEYWORD-STRATEGY.md`.

## 4. Commits made in this work (chronological)

| Commit | Description |
|---|---|
| `15cfefb` | feat(seo): expand site surface — services, about, 3 case studies + security headers, llms.txt, llms-full.txt, vercel.json, shortened titles, removed meta keywords, fixed og:locale → en_IN |
| `f266649` | chore(seo): add second Google Search Console verification file (google76dd5bd57fb4442d.html alongside existing googleedc2b84bbf41b869.html) |
| `6b14b47` | perf: strip lag sources — removed Lenis smooth scroll, pre-loader, custom cursor, animated radial-gradient canvas background, floating cursor label, bg-grain canvas, mouse-move parallax on orbs. Added defer to GSAP scripts. Kept hero intro, reveals, count-ups, 3D tilt, magnetic buttons, marquee, tab switchers |
| `2c3ae57` | feat(blog): publish first new blog post — "Why my Puppeteer scraper kept getting blocked — 5 fixes" |
| `63e9584` | feat(blog): queue 5 drafts + GitHub Action for scheduled weekly publishing |

## 5. Current live state

### Indexable URLs (10 total)

| URL | Type | Status |
|---|---|---|
| `/` | Homepage | Indexed by Google ✓ (verified via URL Inspection) |
| `/about/` | About page | Awaiting indexing |
| `/services/` | Services page (commercial intent) | Awaiting indexing |
| `/work/amazon-analytics/` | Case study | Awaiting indexing |
| `/work/finance-dashboards/` | Case study | Awaiting indexing |
| `/work/neomail/` | Case study | Awaiting indexing |
| `/blog/` | Blog index | Awaiting indexing |
| `/blog/amazon-analytics-puppeteer-postgres.html` | Blog post (original) | Status varies |
| `/blog/finance-dashboards-playbook.html` | Blog post (original) | Status varies |
| `/blog/puppeteer-amazon-scraper-blocked-fixes.html` | Blog post (new) | Awaiting indexing |

### Schema types live (15+ instances)

- Person, WebSite, ProfilePage (with mainEntity), ProfessionalService (×2 — one
  on homepage @graph, one on /services/)
- ItemList (Selected Work on homepage)
- FAQPage (homepage + /services/)
- AboutPage (/about/)
- CreativeWork (/work/amazon-analytics/, /work/finance-dashboards/)
- SoftwareApplication (/work/neomail/)
- BlogPosting (each blog post)
- TechArticle (Puppeteer blog post, queued drafts)
- Blog + BreadcrumbList (blog index)
- BreadcrumbList (every secondary page)

### Site-level files

| File | Purpose |
|---|---|
| `robots.txt` | Allows all, references sitemap |
| `sitemap.xml` | Currently 10 URLs (10 published + 5 will be added on auto-publish) |
| `vercel.json` | Security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy), cache rules, content-type overrides for sitemap/robots/llms |
| `llms.txt` | AI search discoverability (short form) |
| `llms-full.txt` | AI search discoverability (extended profile) |
| `googleedc2b84bbf41b869.html` | GSC verification (account 1) |
| `google76dd5bd57fb4442d.html` | GSC verification (account 2) |
| `BingSiteAuth.xml` | Bing Webmaster verification |

## 6. Active automation — scheduled blog publishing

### How it works

- **`_drafts/`** folder holds unpublished blog HTML files + `schedule.json`
- **`scripts/publish-scheduled.mjs`** reads schedule, finds posts with
  `publishDate <= today`, moves them from `_drafts/` to `blog/`, inserts entries
  into `sitemap.xml` and `blog/index.html` (visible card + JSON-LD)
- **`.github/workflows/publish-blog.yml`** runs daily at 01:00 UTC (06:30 IST),
  invokes the script, commits with `[skip ci]` if anything published
- Required setting: GitHub repo → Settings → Actions → Workflow permissions →
  **"Read and write permissions"** (already enabled)

### Schedule (5 drafts queued)

| Date | Slug | Topic |
|---|---|---|
| 2026-06-02 | `postgres-window-functions-rank-history.html` | PostgreSQL LAG() window function for rank history, 50× speedup, denormalised reporting table |
| 2026-06-09 | `react-audit-log-finance-dashboard.html` | Append-only audit_log table, three logging rules, React side-panel UI, why finance teams need it |
| 2026-06-16 | `jwt-http-only-cookie-auth-react-node.html` | XSS-safe JWT auth, HTTP-only cookies, refresh token rotation, SameSite for CSRF, dev gotchas |
| 2026-06-23 | `mongodb-ttl-index-auto-expire.html` | MongoDB TTL indexes — `expireAfterSeconds`, two modes, gotchas (Date object required, sweep interval, primary-only) |
| 2026-06-30 | `freelance-dashboard-onboarding-checklist.html` | 12-step kickoff doc — problem, done definition, scope, data sources, deployment, ownership, payment, change-request, handover |

### Local commands

```bash
cd "D:\Projects\website portfolio\PortfolioCloude\Main portfolio"

# Preview what would publish today (no changes)
node scripts/publish-scheduled.mjs --dry-run

# Force-preview all (no changes)
node scripts/publish-scheduled.mjs --force --dry-run

# Actually publish all due (modifies files, doesn't push)
node scripts/publish-scheduled.mjs

# Force-publish all queued posts (modifies files, doesn't push)
node scripts/publish-scheduled.mjs --force
```

### Managing the schedule

- **See queue:** open `_drafts/schedule.json`
- **Reschedule a post:** edit its `publishDate`, commit
- **Skip a post:** delete its entry from `schedule.json`, optionally delete the draft
- **Add a new post:** drop HTML into `_drafts/`, add metadata entry in `schedule.json`
- **Force-publish all now from GitHub UI:** Actions tab → "Publish scheduled blog posts" → Run workflow → tick "force"

## 7. User preferences and decisions logged

**About working style:**

- User wants **action over theory** — short explanations, then do the work
- User trusts agent to commit + push without asking each time (after initial green-light)
- User prefers direct, honest answers — including pushback when their idea is wrong
- User accepted recommendations: smart drip > flood, 5 quality posts > 11 mediocre ones

**About SEO goals:**

- Primary goals: rank for owner's name + qualifiers, long-tail technical
  queries, AI-engine citations (Perplexity/ChatGPT/Google AI Overviews)
- Secondary goal: look professional to recruiters who click LinkedIn link
- Not a goal: ranking for competitive head terms (acknowledged unrealistic
  without a custom domain)

**About content:**

- Blog posts must read in owner's voice — first-person, specific numbers,
  honest about what broke / what didn't work
- Each post needs at least one section with "lived experience" anchor
- TechArticle schema preferred over BlogPosting for engineering content
- Cross-link every blog post to relevant case study + services page

**About performance:**

- Previous "premium portfolio" effects (Lenis, custom cursor, pre-loader,
  perpetual canvas RAFs) were stripped on user request — performance > polish
- 3D tilt on cards, magnetic buttons, marquee, hero intro KEPT — these
  preserve the design while not constantly burning main thread
- Touch devices automatically skip hover-only effects

**About commits:**

- Conventional commits: `feat(scope):`, `fix(scope):`, `perf:`, `chore(scope):`
- Co-Authored-By trailer with Claude attribution included on all commits
- Bot commits use `[skip ci]` to prevent loops
- No `--no-verify`, no `--force` ever

## 8. Pending actions for the user

(In rough priority order)

1. **Request indexing in GSC** for the 9 not-yet-indexed pages — go to
   GSC → URL Inspection → paste URL → REQUEST INDEXING. List:
   - `/about/`
   - `/services/`
   - `/work/amazon-analytics/`
   - `/work/finance-dashboards/`
   - `/work/neomail/`
   - `/blog/`
   - `/blog/amazon-analytics-puppeteer-postgres.html`
   - `/blog/finance-dashboards-playbook.html`
   - `/blog/puppeteer-amazon-scraper-blocked-fixes.html`
   (GSC limits ~10 requests/day so this is exactly one day's worth.)

2. **Click "Validate Fix"** on the stale `mainEntity` error in GSC's Profile
   page rich-result report — the issue is already fixed in code; Google's
   dashboard just hasn't recrawled yet.

3. **Run PageSpeed Insights manually** at https://pagespeed.web.dev/ for
   live CWV numbers (the API was 429-rate-limited during the audit).

4. **Buy custom domain when ready** — deferred but tracked.

5. **Read each queued blog draft** in the week before its publish date —
   edit `_drafts/<filename>.html` directly if changes needed; the GitHub
   Action picks up your version.

6. **Collect 3–5 client testimonials** (per M5 in ACTION-PLAN.md) to add
   to homepage + /services/.

## 9. Things deliberately NOT done (and why)

- **Auto-generated 11 blog posts at once** — declined as too high a risk under
  Google's March 2024 "scaled content abuse" policy. Smart drip of 5 over 5
  weeks chosen instead.
- **Self-hosted the 14 jsdelivr SVG icons** — flagged in audit (M3) but
  deferred to avoid breaking the marquee animation without local testing.
- **Removed the FAQPage schema from homepage** — Google removed rich-result
  eligibility Aug 2023 for commercial sites, but the schema still helps AI
  engines cite Q&A passages. Kept.
- **Aggressive CSP** — the chosen CSP in `vercel.json` allows
  `'unsafe-inline'` for scripts and styles because the site has inline
  styles and the GSAP libraries do dynamic eval. Tightening would require
  refactoring; not blocking.

## 10. Quick reference URLs

### Live pages
- https://gaurav-portfolio-g1ks.vercel.app/
- https://gaurav-portfolio-g1ks.vercel.app/about/
- https://gaurav-portfolio-g1ks.vercel.app/services/
- https://gaurav-portfolio-g1ks.vercel.app/work/amazon-analytics/
- https://gaurav-portfolio-g1ks.vercel.app/work/finance-dashboards/
- https://gaurav-portfolio-g1ks.vercel.app/work/neomail/
- https://gaurav-portfolio-g1ks.vercel.app/blog/
- https://gaurav-portfolio-g1ks.vercel.app/blog/puppeteer-amazon-scraper-blocked-fixes.html
- https://gaurav-portfolio-g1ks.vercel.app/blog/amazon-analytics-puppeteer-postgres.html
- https://gaurav-portfolio-g1ks.vercel.app/blog/finance-dashboards-playbook.html
- https://gaurav-portfolio-g1ks.vercel.app/llms.txt
- https://gaurav-portfolio-g1ks.vercel.app/llms-full.txt
- https://gaurav-portfolio-g1ks.vercel.app/sitemap.xml
- https://gaurav-portfolio-g1ks.vercel.app/robots.txt

### Tools to check
- Google Search Console: https://search.google.com/search-console/
- PageSpeed Insights: https://pagespeed.web.dev/?url=https://gaurav-portfolio-g1ks.vercel.app/
- Security headers: https://securityheaders.com/?q=https%3A%2F%2Fgaurav-portfolio-g1ks.vercel.app%2F
- Rich Results Test: https://search.google.com/test/rich-results?url=https://gaurav-portfolio-g1ks.vercel.app/
- GitHub Actions: https://github.com/Tgaurav1k/Gaurav_Portfolio/actions

## 11. Onboarding instructions for the next AI session

When the user says "read `SEO-CONTEXT.md`" (or pastes the full path):

1. Read this entire file
2. Also read these companion files in the same repo:
   - `docs/seo/FULL-AUDIT-REPORT.md`
   - `docs/seo/ACTION-PLAN.md`
   - `docs/seo/KEYWORD-STRATEGY.md`
3. Check current git state of the repo —
   `_drafts/schedule.json` may have already advanced, `blog/` may have new posts
4. Do NOT re-do the audit. Do NOT push them again to buy a domain.
5. Default working assumption: user wants action, not theory. Confirm
   before destructive changes; otherwise commit + push.
6. Conventional commit style is required:
   `feat(scope): description` with Co-Authored-By trailer.
7. Update THIS file when you make material changes (new pages, new
   workflow steps, schedule changes, etc.). Increment the "Last updated"
   line at the top.

## 12. Glossary of decisions

- "Smart drip" = publishing 5 blog posts over 5 weeks via GitHub Action
- "Lived experience anchor" = a section of a blog post that references
  the user's actual project, not generic content (e.g., "the Amazon
  Analytics scraper" rather than "a typical scraper")
- "Subdomain ceiling" = the structural limit on rankings imposed by being
  on `*.vercel.app`
- "Perf strip-down" = the May 28 commit that removed Lenis + pre-loader +
  custom cursor + perpetual canvases

## 13. Blog content catalog

Full content for each blog lives as standalone HTML files in the repo
(see file paths). This catalog is the index — read the specific HTML
file directly when you need the full text. Drafts use the same HTML
structure as published posts; they will be moved by the publish script
without modification.

### 13.1 Published — already live on the site

#### Why my Puppeteer scraper kept getting blocked — 5 fixes that worked
- **File:** `D:\Projects\website portfolio\PortfolioCloude\Main portfolio\blog\puppeteer-amazon-scraper-blocked-fixes.html`
- **Live URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/puppeteer-amazon-scraper-blocked-fixes.html
- **Status:** Published 2026-05-28 (commit `2c3ae57`)
- **Word count:** ~1,700
- **Title (≤60 chars):** "Why My Puppeteer Scraper Got Blocked — 5 Fixes"
- **Target primary keyword:** `puppeteer stealth Amazon Seller Central blocked`
- **Schema:** TechArticle + BreadcrumbList
- **Lead:** Captcha-locked on the second Monday morning, account locked for 6 hours. Diagnosis + 5 fixes.
- **Sections:** Hook → "What Amazon checks" → Fix #1 stealth plugin → Fix #2 persistent userDataDir → Fix #3 User-Agent → Fix #4 human-paced timing → Fix #5 detect-captcha-stop → "What still breaks" → "Fix order summarised" → CTA
- **Internal links:** `/blog/amazon-analytics-puppeteer-postgres.html`, `/work/amazon-analytics/`, `/services/`
- **Lived-experience anchor:** Specific captcha lockout timing, the Advertising Reports page being the trigger, audit-log table for alerting

#### How I built an Amazon Ads analytics dashboard with Puppeteer Stealth + PostgreSQL (original)
- **File:** `D:\Projects\website portfolio\PortfolioCloude\Main portfolio\blog\amazon-analytics-puppeteer-postgres.html`
- **Live URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/amazon-analytics-puppeteer-postgres.html
- **Status:** Published (originally May 11, 2026 — pre-existing)
- **Word count:** ~1,069
- **Title (≤60 chars):** "Amazon Ads Dashboard with Puppeteer + Postgres" (shortened May 28)
- **Schema:** BlogPosting + BreadcrumbList
- **Cross-reference:** Authoritative source for the Amazon Analytics architecture; new Puppeteer post links back to this

#### I built 4 finance dashboards in 9 months — the React + Node playbook (original)
- **File:** `D:\Projects\website portfolio\PortfolioCloude\Main portfolio\blog\finance-dashboards-playbook.html`
- **Live URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/finance-dashboards-playbook.html
- **Status:** Published (originally May 11, 2026 — pre-existing)
- **Word count:** ~1,208
- **Title (≤60 chars):** "4 Finance Dashboards in 9 Months — React + Node Playbook" (shortened May 28)
- **Schema:** BlogPosting + BreadcrumbList
- **Cross-reference:** Authoritative source for finance dashboard patterns; audit-log blog draft links back to this

### 13.2 Queued drafts — auto-publish weekly

All drafts sit in `D:\Projects\website portfolio\PortfolioCloude\Main portfolio\_drafts\`
Schedule controlled by `_drafts\schedule.json`
Published by `scripts\publish-scheduled.mjs` via daily GitHub Actions cron.

#### 2026-06-02 — The PostgreSQL window function that made rank history 50× faster
- **Draft file:** `_drafts\postgres-window-functions-rank-history.html`
- **Slated URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/postgres-window-functions-rank-history.html
- **Word count:** ~900
- **Title (≤60 chars):** "The Postgres Window Function That Sped Up Rank History 50×"
- **Target primary keyword:** `postgres window function rank history`
- **Schema:** TechArticle + BreadcrumbList
- **Lead:** 8-second self-join query → 0.15s with `LAG()` + denormalised reporting table
- **Sections:** Problem (slow self-join) → Fix in one query (LAG window) → Schema change for the 50× win (denormalisation) → Why composite index → What window functions aren't good for (cross-partition + missing weeks) → Wider lesson
- **Internal links:** `/blog/amazon-analytics-puppeteer-postgres.html`, `/work/amazon-analytics/`, `/services/`
- **Lived-experience anchor:** Amazon Analytics 180,000-row table, 3,500 keywords × 50 weeks

#### 2026-06-09 — The audit log that won finance teams' trust
- **Draft file:** `_drafts\react-audit-log-finance-dashboard.html`
- **Slated URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/react-audit-log-finance-dashboard.html
- **Word count:** ~1,100
- **Title (≤60 chars):** "The Audit Log That Won Finance Teams' Trust"
- **Target primary keyword:** `react audit log finance dashboard`
- **Schema:** TechArticle + BreadcrumbList
- **Lead:** First dashboard launch failed because a number couldn't be traced; second launch (with audit log from day one) had permanent adoption
- **Sections:** "First launch went badly" story → Schema (append-only audit_log table with denormalised actor_name + jsonb before/after) → Three rules (log every state change, every override, no reads) → Node-side wrapper pattern (same transaction as entity write) → React side-panel UI → What this isn't (not compliance, not time machine) → Wider pattern
- **Internal links:** `/blog/finance-dashboards-playbook.html`, `/work/finance-dashboards/`, `/services/`
- **Lived-experience anchor:** Real reversion-to-spreadsheet story from first launch

#### 2026-06-16 — The JWT + HTTP-only cookie auth I reuse on every project
- **Draft file:** `_drafts\jwt-http-only-cookie-auth-react-node.html`
- **Slated URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/jwt-http-only-cookie-auth-react-node.html
- **Word count:** ~1,300
- **Title (≤60 chars):** "The JWT + HTTP-Only Cookie Auth I Reuse Every Time"
- **Target primary keyword:** `JWT HTTP-only cookie React Node`
- **Schema:** TechArticle + BreadcrumbList
- **Lead:** localStorage JWT = XSS disaster. The HTTP-only cookie + refresh rotation setup originally built for NeoMail, now in every dashboard
- **Sections:** Why localStorage is wrong → HTTP-only cookies (access + refresh token split) → Refresh flow with fetch wrapper → Refresh-token rotation with version counter → CSRF and SameSite=Lax trade-off → Three gotchas (cross-origin in dev, secure flag in dev, multi-tab refresh)
- **Internal links:** `/work/neomail/`, `/services/`
- **Lived-experience anchor:** NeoMail's actual auth implementation, the production fixes shipped

#### 2026-06-23 — MongoDB TTL indexes: auto-expire in one line, no cron
- **Draft file:** `_drafts\mongodb-ttl-index-auto-expire.html`
- **Slated URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/mongodb-ttl-index-auto-expire.html
- **Word count:** ~900
- **Title (≤60 chars):** "MongoDB TTL Indexes: Auto-Expire with One Line"
- **Target primary keyword:** `MongoDB TTL index auto expire`
- **Schema:** TechArticle + BreadcrumbList
- **Lead:** NeoMail expires old messages with one TTL index — no cron, no scheduler
- **Sections:** The pattern (createIndex with expireAfterSeconds) → Two modes (absolute expiry date vs fixed lifetime from insert) → What TTL indexes are NOT good for (sub-minute precision, cascading deletes, conditional expiry) → Three gotchas (must be Date object not Unix timestamp, slow first sweep, primary-only in replica set) → Why I reach for it more often than I used to
- **Internal links:** `/work/neomail/`
- **Lived-experience anchor:** NeoMail's messages collection, the TTL index has not been touched since

#### 2026-06-30 — My 12-step onboarding doc for every freelance project
- **Draft file:** `_drafts\freelance-dashboard-onboarding-checklist.html`
- **Slated URL:** https://gaurav-portfolio-g1ks.vercel.app/blog/freelance-dashboard-onboarding-checklist.html
- **Word count:** ~1,200
- **Title (≤60 chars):** "My 12-Step Onboarding Doc for Every Freelance Project"
- **Target primary keyword:** `freelance dashboard developer onboarding`
- **Schema:** Article + BreadcrumbList (not TechArticle — process content, not engineering)
- **Lead:** Every freelance dispute traces to something that should have been agreed in week one. The 12-step shared Notion page that catches them in advance.
- **Sections:** Format of the doc → The 12 items (problem in 1 sentence, what done looks like, 80% feature list, data sources, deployment target, ownership, communication cadence, payment, what I'm NOT doing, change-request, handover deliverables, "things that would change my mind") → What this catches before it becomes a problem → The 13th item I keep meaning to add (retrospective)
- **Internal links:** `/blog/react-audit-log-finance-dashboard.html`, `/services/`, `/about/`
- **Commercial intent:** Strong — this is process/sales content that pulls toward `/services/`
- **Lived-experience anchor:** Real disputes avoided, the 13th item self-honest gap

### 13.3 Reading the actual blog content

To see the full text of any blog (not just summary):

```bash
# Local (Windows)
notepad "D:\Projects\website portfolio\PortfolioCloude\Main portfolio\_drafts\postgres-window-functions-rank-history.html"

# Or for a published one
notepad "D:\Projects\website portfolio\PortfolioCloude\Main portfolio\blog\puppeteer-amazon-scraper-blocked-fixes.html"
```

In any AI session, use the Read tool on the file path. The HTML is human-readable
with clear `<h2>`/`<p>` structure — no transpilation, no framework wrapper.

### 13.4 Editing a queued blog before its publish date

The drafts are real files in the repo. To edit one before it auto-publishes:

1. Open the `_drafts/<file>.html` directly in any editor
2. Make changes — the HTML structure is straightforward
3. Commit + push (`git add _drafts/... && git commit -m "edit(blog): ..."`)
4. The GitHub Action picks up your latest version when it publishes

Do NOT rename the file or change its slug after queuing — `schedule.json` references the filename. If you need to rename, update both.

### 13.5 Adding a new draft to the queue

1. Create the new HTML file in `_drafts/<slug>.html` — copy structure from an existing draft to keep schema/nav consistent
2. Add a metadata entry to `_drafts/schedule.json` with `draft`, `publishDate`, `displayDate`, `title`, `excerpt`, `image`, `imageWebp`, `imageAlt`, `tag`, `readTime`
3. Commit + push
4. The cron will pick it up when its `publishDate` arrives
