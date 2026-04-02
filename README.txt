━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  IWASREADY.COM | BRIDGING EARTH & KANARIA
  Complete Static Site Package | v15
  By Rick Broider
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTENTS
──────────────────────────────────────────────────────────
  index.html          Homepage (hero, trailer, testimonials, FAQ, quiz CTA)
  quiz.html           The Starseed Leadership Signal Activation (10 questions)
  result.html         Dynamic result page (4 archetypes, JS-rendered)
  sitemap.xml         XML sitemap for Google Search Console submission
  robots.txt          Crawler instructions + sitemap pointer
  assets/styles.css   Full design system (dark indigo, gold, cosmic aesthetic)
  assets/script.js    Quiz logic, result rendering, share + form functionality
  assets/cosmic-field.png    Background texture
  assets/desktop-hero.jpeg   Wide hero image
  assets/mobile-hero.png     Portrait hero image
  assets/rick-broider.jpg    Author photo (About section)
  assets/sacred-geometry.png Sacred geometry visual
  README.txt          This file

REQUIRED: IMAGES TO ADD BEFORE GOING LIVE
──────────────────────────────────────────────────────────
The following images are referenced in the site but NOT included in this
package. You must place them in the assets/ folder before deploying.

1. assets/hero-atf.png
   The above-the-fold hero image (right column, desktop only).
   This is the AI-generated cosmic figure image you had created.
   Recommended: 800x1000px minimum, portrait orientation.

2. assets/Bridging-Earth-and-Kanaria-journey.png
   The Open Graph / social share image used across all three pages.
   This appears when the site is shared on Facebook, WhatsApp, iMessage, etc.
   Required dimensions: 1200x630px exactly.

3. assets/archetype-flamekeeper.png
4. assets/archetype-architect.png
5. assets/archetype-bridge-walker.png
6. assets/archetype-signal-holder.png
   Result page archetype images. One per archetype type.
   Displayed on result.html for each quiz outcome.
   Recommended: 800x800px square, portrait crop friendly.

7. assets/trailer.mp3
   Your audiobook trailer audio file.
   Drop it into assets/ with exactly this filename.
   The player on the homepage is already wired to load it.

REQUIRED: TEXT PLACEHOLDERS TO REPLACE
──────────────────────────────────────────────────────────
Search for YOUR_AUDIOBOOK_URL in these files and replace with
your actual audiobook URL (Audible listing, sales page, etc.):

  index.html         (3 instances: nav, hero CTA, post-trailer CTA)
  quiz.html          (1 instance: nav)
  result.html        (1 instance: nav)
  assets/script.js   (1 instance: result page next-step card)

Also replace in index.html:
  YOUR_YOUTUBE_VIDEO_ID   Your actual YouTube trailer video ID
                          e.g. if URL is youtube.com/watch?v=abc123
                          set: data-youtube-id="abc123"

DEPLOYMENT
──────────────────────────────────────────────────────────
Upload all files maintaining the exact folder structure.
No build step. No server-side processing. No database.

Compatible with: GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3.

Required folder structure:
  /
  ├── index.html
  ├── quiz.html
  ├── result.html
  ├── sitemap.xml
  ├── robots.txt
  ├── README.txt
  └── assets/
      ├── styles.css
      ├── script.js
      ├── cosmic-field.png
      ├── desktop-hero.jpeg
      ├── mobile-hero.png
      ├── rick-broider.jpg
      ├── sacred-geometry.png
      ├── hero-atf.png                         [ADD THIS]
      ├── Bridging-Earth-and-Kanaria-journey.png  [ADD THIS]
      ├── archetype-flamekeeper.png             [ADD THIS]
      ├── archetype-architect.png               [ADD THIS]
      ├── archetype-bridge-walker.png           [ADD THIS]
      ├── archetype-signal-holder.png           [ADD THIS]
      └── trailer.mp3                           [ADD THIS]

GOOGLE SEARCH CONSOLE
──────────────────────────────────────────────────────────
1. Verify ownership of iwasready.com in Google Search Console
2. Submit sitemap: https://iwasready.com/sitemap.xml
3. Request indexing for: https://iwasready.com/ and https://iwasready.com/quiz.html

FORMSPREE FORMS (already wired)
──────────────────────────────────────────────────────────
  xlgowrbl   Testimonial submission form (index.html)
  xwvwqgoo   Gift form (index.html)
  No action required — these are live.

VERIFIED LINKS
──────────────────────────────────────────────────────────
  Canonical URLs        Correct on all three pages
  Open Graph tags       Correct on all three pages
  Twitter Card tags     Correct on all three pages
  Schema.org JSON-LD    Valid on all three pages (WebSite, Person, Book,
                        WebPage, FAQPage with 11 Q&A, BreadcrumbList)
  sitemap.xml           Valid, references all 3 public URLs
  robots.txt            Correct, points to sitemap
  Builder's Path link   https://stopthecollapse.com
  All internal links    Relative paths, no broken anchors

QUIZ FLOW
──────────────────────────────────────────────────────────
  quiz.html       10 questions, 4 signal type scores tallied per answer
  result.html     Reads ?type= URL param, renders matching archetype
  Valid types:    flamekeeper | architect | bridge-walker | signal-holder

SEO + LLM TARGETING
──────────────────────────────────────────────────────────
  FAQPage schema with 11 Q&A entries targeting AI Overview queries:
  - What is a starseed? What are the 4 archetypes? What is galactic ethics?
  - How long is the quiz? Where to get the audiobook? etc.
  All meta descriptions and OG tags tuned for starseed search intent.

DESIGN SYSTEM
──────────────────────────────────────────────────────────
  Colors:      Deep indigo + luminous gold (CSS custom properties in :root)
  Fonts:       Cinzel (display) | Cormorant Garamond (serif) | Inter (body)
               Loaded from Google Fonts CDN; internet connection required.
  Layout:      Mobile-first; two-column hero at desktop (>=900px)
  Animations:  CSS-only ring animations, infinite testimonial carousel
  No em dashes anywhere on the site (house rule, enforced in v15).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Rick Broider | IWasReady.com | All rights reserved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
