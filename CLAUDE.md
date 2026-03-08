# PK Lawton Portfolio — Project Instructions

## Design Context

### Users
**Primary:** Senior agency/consultancy hiring leaders (CSOs, EVPs, MDs at Edelman, Ogilvy, TBWA, Dentsu, WPP networks). They scan in 2 minutes, deep-dive in 15. Hierarchy and proof points must support both modes.

**Secondary:** CMOs and brand leaders in regulated/emerging categories evaluating PK or Sister Merci. They want evidence of strategic thinking applied to real business problems.

**Tertiary:** Working strategists, professors, students following Cultural Cartography. Here for the ideas. Also: music/culture community arriving via Bandcamp, Wikipedia, or Slagging Off legacy.

### Brand Personality
**Direct. Rigorous. Warm.**

PK's voice reads like he talks: intellectually sharp, proof-oriented, occasionally funny, never self-important. References Latour and Bourdieu as working tools, not name-drops. Self-deprecating where it counts ("I am still, and forever will be, a 'candidate'"). Numbers, names, outcomes — not "we did great work."

### Aesthetic Direction
**Academic monograph.** Clean, typographically precise, high information density. Think: Semiotext(e), Verso Books, an academic journal where the thinking IS the design.

- **Foundation:** Monospace body text (Bricolage Grotesque / Space Grotesk) as signature — signals "this person writes and thinks in plain text"
- **Palette:** Warm whites (#FAF8F4), olive (#565D4F), cream (#E0D3A8), brown (#362318), red accent (#DB3E36) used sparingly. Restraint is the point.
- **Texture:** Subtle grain overlay. Pixel trail interaction. Grayscale-to-color hover on images.
- **References:** mirelleborra.com (typographic confidence, giant titles, white space, zero decoration), monicamueller.ch (monospace index, split-panel layout with project list left + detail right, category tags, archival energy)
- **Anti-references:** Standard agency portfolios. LinkedIn-as-website. SaaS template aesthetics. Over-polished corporate smoothness. Stock photography.
- **Password gate:** Temporary — will be removed once site is polished. Site will be public at pklawton.com.

### Design Principles

1. **Content-first, always.** Text is the primary medium. Design exists to make reading comfortable, not to decorate. The writing carries the persuasion.

2. **Density without noise.** 27 case studies, 10 background sections, 150+ brands. Use hierarchy, spacing, and typography — not color or ornament — to guide the eye. Every element earns its place.

3. **Authenticity over polish.** The site should feel like a person made it, not a template. Intentional rough edges > corporate smoothness. The monograph aesthetic means: rigorous, precise, but human.

4. **Proof, not claims.** Design choices should support PK's proof-oriented voice. Numbers, testimonials, outcomes, and citations are first-class content — not afterthoughts buried in body copy.

5. **The range is the point.** Strategy + academia + music + teaching are all load-bearing, not hobbies. The design must hold the full range without flattening any of it.

## Tech Stack
- React 19 + Vite 8 (beta), Tailwind CSS 4, Framer Motion
- Single-page app, all content in App.jsx + projects.json
- Deployed via Vercel from GitHub (quartermass-merci/pk-portfolio)
- Fonts: Bricolage Grotesque (display/variable), Space Grotesk (UI/links)
- No CMS — PK edits code directly

## Content Architecture
- **Home:** Logo, tagline, contact links, "AN INTRODUCTION" button, 4 expandable nav accordions
- **Background (10 sections):** Career Timeline, Education, Agency as Lab, Research Stack, The Embedded Strategist, Square Shaped Strategists, Cultural Cartography, Teaching & Research, Published & Spoken, Music & Culture, Eye Witness Accounts
- **Case Studies (27):** Campaign Strategy (9), Brand Architecture (13), Corporate Comms (5)
- **Each case study:** title, year, category, summary, narrative sections, proof/results, image galleries, optional video
