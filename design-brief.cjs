const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageBreak, PageNumber, LevelFormat } = require('docx');

const charcoal = "231F20";
const lavender = "E6E6FB";
const medGray = "666666";
const ltGray = "F5F5F5";
const borderThin = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin };
const noBorders = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [new TextRun({ text, font: "Arial", bold: true, color: charcoal })] });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts.paraOpts,
    children: [new TextRun({ text, font: "Arial", size: 22, color: opts.color || charcoal, bold: opts.bold || false, italics: opts.italics || false })]
  });
}

function label(text) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text: text.toUpperCase(), font: "Arial", size: 18, bold: true, color: medGray, characterSpacing: 60 })]
  });
}

function bulletItem(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: charcoal })]
  });
}

function spacer() { return new Paragraph({ spacing: { after: 200 }, children: [] }); }
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }

function makeCell(text, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: opts.borders || borders,
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: opts.size || 22, color: opts.color || charcoal, bold: opts.bold || false })] })]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22, color: charcoal } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: charcoal },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: charcoal },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: charcoal },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets2", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets3", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets4", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets5", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets6", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets7", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({
          children: [new TextRun({ text: "PKLAWTON.COM \u2014 WEBSITE DESIGN BRIEF", font: "Arial", size: 16, bold: true, color: medGray, characterSpacing: 80 })],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: charcoal, space: 4 } }
        })
      ]})
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: "Page ", font: "Arial", size: 18, color: medGray }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: medGray })
          ]
        })
      ]})
    },
    children: [

      // ====================== COVER ======================
      new Paragraph({ spacing: { before: 3600 }, children: [] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "PKLAWTON.COM", font: "Arial", size: 56, bold: true, color: charcoal })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
        children: [new TextRun({ text: "WEBSITE DESIGN BRIEF", font: "Arial", size: 32, color: medGray, characterSpacing: 120 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Prepared by: PK Lawton | March 2026", font: "Arial", size: 22, color: medGray })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Document Version: 1.0", font: "Arial", size: 20, color: medGray, italics: true })]
      }),

      pageBreak(),

      // ====================== 1. PROJECT OVERVIEW ======================
      heading("1. Project Overview"),
      body("This design brief provides the strategic context, content architecture, audience definition, and visual direction for the redesign of pklawton.com \u2014 the personal portfolio site of PK Lawton, Co-Founder and Chief Strategy Officer at Sister Merci."),
      spacer(),
      body("The current site is a React/Vite single-page application deployed via Vercel from a GitHub repository (quartermass-merci/pk-portfolio). It uses a monospace font, black-and-white palette, and a slide-out panel navigation pattern. It is functional and content-rich, but was built quickly and without formal design direction. This brief establishes the foundation for a more intentional design execution that matches the caliber of the work it represents."),

      pageBreak(),

      // ====================== 2. WHO IS PK LAWTON ======================
      heading("2. Who Is PK Lawton"),
      body("Understanding the person behind the site is essential to getting the design right. PK is not a typical creative director or a typical strategist. The site needs to hold the full range of who he is without flattening any of it."),
      spacer(),

      label("Professional Identity"),
      bulletItem("Co-Founder & CSO at Sister Merci, a strategy-led creative agency (Toronto/Chicago, 30 staff, 8th year)", "bullets"),
      bulletItem("Led strategy for 150+ brands across cannabis, iGaming, AI, health tech, fintech, beverage alcohol, and CPG", "bullets"),
      bulletItem("Previously VP Strategy at Cossette, VP Strategic Planning & Head of Paid Media at Weber Shandwick, Senior Counsellor & Digital Lead at Cohn & Wolfe", "bullets"),
      bulletItem("Founding CMO at two startups (Galaxie Brands, PepHealth)", "bullets"),
      bulletItem("7 Clio Awards, 3x Agency of the Year, 85% competitive pitch win rate at Sister Merci", "bullets"),
      bulletItem("$1.5M seed raise from BlackShire Capital; strategic due diligence for institutional investors", "bullets"),

      label("Academic & Teaching Identity"),
      bulletItem("PhD candidate (ABD) in Sociology, University of Calgary. MA and BA in Sociology, University of Lethbridge", "bullets2"),
      bulletItem("Adjunct Professor at McMaster Continuing Education (Brand Strategy, Consumer Research, Marketing)", "bullets2"),
      bulletItem("Previously Adjunct Assistant Professor at University of Lethbridge (Mass Comm, Digital Culture, Medical Sociology)", "bullets2"),
      bulletItem("SSHRC PhD Fellowship recipient. Thesis cited in the Yale Journal of Law & Technology", "bullets2"),
      bulletItem("Co-founding editor, Rebrief: A Canadian Journal of Advertising (launching April 2026)", "bullets2"),
      bulletItem("Strategic process grounded in Latour\u2019s Actor-Network Theory and Bourdieu\u2019s theory of capital", "bullets2"),

      label("Music & Cultural Identity"),
      bulletItem("Two decades in Canadian underground music: Ketamines (HoZac, Mint, Southpaw), Century Palm (Deranged), Myelin Sheaths, Tough Age", "bullets3"),
      bulletItem("Co-founded Mammoth Cave Recording Co. (~48 releases, 3x Best Label \u2014 FFWD Magazine) and Pleasence Records", "bullets3"),
      bulletItem("Anonymous music blog \u201CSlagging Off\u201D went viral in 2013; CBC dubbed him \u201CThe Most Hated Man in Canadian Music\u201D", "bullets3"),
      bulletItem("Published in Vice, Adbusters, Exclaim!, Globe and Mail, National Post, Strategy Magazine, Quirk\u2019s", "bullets3"),
      bulletItem("4,000-piece record collection. 128+ documented live shows. Oprah tweeted about his band", "bullets3"),

      label("Personality & Working Style"),
      bulletItem("Direct, high-standards, low patience for fluff. Skeptical of easy answers. Attracted to grounded nuance", "bullets4"),
      bulletItem("Comfortable with tension and tradeoffs. Surfaces constraints early and treats them as design inputs", "bullets4"),
      bulletItem("Playful streak in framing, serious about rigor in execution", "bullets4"),
      bulletItem("Iterative builder: rapid v1, refine via critique loops. Deliverable-driven: everything becomes a usable artifact", "bullets4"),
      bulletItem("Pattern-hunter: scoring heuristics, taxonomies, frameworks, repeatable pipelines", "bullets4"),
      bulletItem("Reads ~60 books/year. At a matinee almost every Saturday. Works best on a team", "bullets4"),

      pageBreak(),

      // ====================== 3. SITE PURPOSE & OBJECTIVES ======================
      heading("3. Site Purpose & Objectives"),

      label("Primary Purpose"),
      body("A personal portfolio that positions PK as a senior strategic leader with an uncommon combination of agency operating experience, academic depth, cultural credibility, and a proven track record of building things \u2014 agencies, brands, teams, labels, and methodologies."),
      spacer(),

      label("The Site Must Accomplish"),
      bulletItem("Establish PK as a credible candidate for SVP/EVP-level strategy roles at global agencies and consultancies", "bullets5"),
      bulletItem("Demonstrate range without diluting authority: strategy + academia + music + teaching are all load-bearing, not hobbies", "bullets5"),
      bulletItem("Showcase 27 project case studies with depth (not just logos and taglines)", "bullets5"),
      bulletItem("Provide proof of impact through client testimonials, peer endorsements, student reviews, and measurable results", "bullets5"),
      bulletItem("Articulate a distinct strategic philosophy (Cultural Cartography) that is PK\u2019s intellectual differentiator", "bullets5"),
      bulletItem("Function as a living document that PK updates regularly as new work, writing, and thinking develops", "bullets5"),

      label("The Site Must Not"),
      bulletItem("Feel like a standard agency portfolio or a LinkedIn profile in website form", "bullets6"),
      bulletItem("Minimize the music/cultural work as a sidebar curiosity \u2014 it\u2019s core to PK\u2019s identity and credibility", "bullets6"),
      bulletItem("Over-design or over-polish to the point where it feels corporate or inauthentic", "bullets6"),
      bulletItem("Use stock photography, generic SaaS aesthetics, or template-driven layouts", "bullets6"),
      bulletItem("Feel precious or self-important \u2014 PK\u2019s voice is warm, direct, and occasionally self-deprecating", "bullets6"),

      pageBreak(),

      // ====================== 4. TARGET AUDIENCES ======================
      heading("4. Target Audiences"),

      label("Primary: Senior Agency & Consultancy Hiring Leaders"),
      body("Global Chief Strategy Officers, EVPs, and Managing Directors at agencies like Edelman, Ogilvy, TBWA, Dentsu, WPP networks, and strategic consultancies. They\u2019re evaluating PK\u2019s strategic depth, leadership range, category experience, and cultural fluency. They will scan, not read. The hierarchy, proof points, and navigation need to support a 2-minute scan and a 15-minute deep dive."),
      spacer(),

      label("Secondary: Prospective Clients & Partners"),
      body("CMOs, VPs of Marketing, and brand leaders in regulated, emerging, or complex categories evaluating Sister Merci or PK directly. They want evidence of strategic thinking applied to real business problems. Case studies with clear problem/approach/result framing matter here."),
      spacer(),

      label("Tertiary: Peers, Students & the Strategy Community"),
      body("Working strategists, professors, and students who follow PK\u2019s writing on Cultural Cartography, attend his courses, or engage with his Substack. This audience is here for the ideas and the thinking. They\u2019ll spend time in the Teaching & Research, Cultural Cartography, and Published & Spoken sections."),
      spacer(),

      label("Tertiary: Music & Culture Community"),
      body("People who know PK from the Canadian underground music scene, record labels, or cultural criticism. They may arrive via Bandcamp, Wikipedia, or the \u201CSlagging Off\u201D legacy. The Music & Culture section needs to hold weight as a real creative body of work, not just a fun fact in the bio."),

      pageBreak(),

      // ====================== 5. CONTENT ARCHITECTURE ======================
      heading("5. Content Architecture"),
      body("The site currently organizes content into a home/navigation screen and a slide-out panel that renders section content. Below is the full content inventory as it exists today."),
      spacer(),

      heading("5.1 Home / Navigation", HeadingLevel.HEADING_2),
      bulletItem("Header: PK Lawton, title line, email/LinkedIn/Substack links", "bullets7"),
      bulletItem("AN INTRODUCTION button (opens bio panel)", "bullets7"),
      bulletItem("Expandable navigation categories: Background (10 sections), Campaign Strategy (9 projects), Brand Architecture (13 projects), Corporate Comms (5 projects)", "bullets7"),
      spacer(),

      heading("5.2 Background Sections (10)", HeadingLevel.HEADING_2),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          new TableRow({ children: [
            makeCell("SECTION", 2800, { bold: true, shading: charcoal, color: "FFFFFF", size: 20 }),
            makeCell("DESCRIPTION", 6560, { bold: true, shading: charcoal, color: "FFFFFF", size: 20 }),
          ]}),
          new TableRow({ children: [
            makeCell("Career Timeline", 2800, { shading: ltGray }),
            makeCell("Chronological roles from Sister Merci (2019\u2013present) back through Cossette, Weber Shandwick, Cohn & Wolfe. Each entry has title, dates, and substantive narrative with proof points.", 6560, { shading: ltGray }),
          ]}),
          new TableRow({ children: [
            makeCell("Education", 2800),
            makeCell("PhD (ABD), MA, BA in Sociology. SSHRC fellowship. Yale JLT citation.", 6560),
          ]}),
          new TableRow({ children: [
            makeCell("Agency as Lab: Sister Merci", 2800, { shading: ltGray }),
            makeCell("The Sister Merci thesis (constraint as creative advantage), full agency timeline (2019\u20132026), industry firsts, agency awards, press coverage. Most content-rich section.", 6560, { shading: ltGray }),
          ]}),
          new TableRow({ children: [
            makeCell("The Embedded Strategist", 2800),
            makeCell("PK\u2019s model for the strategy function as a revenue driver. Six subsections: First Revenue Line, Trust Builder, Effectiveness Driver, Silo Buster, Internal Growth Engine, External Growth Engine.", 6560),
          ]}),
          new TableRow({ children: [
            makeCell("Square Shaped Strategists", 2800, { shading: ltGray }),
            makeCell("PK\u2019s training philosophy: four-corner competency model (Problem Clarification, Insight Development, Strategic Approach, Effectiveness). Coaching tree. Embedded Canva presentation.", 6560, { shading: ltGray }),
          ]}),
          new TableRow({ children: [
            makeCell("Cultural Cartography", 2800),
            makeCell("PK\u2019s strategic philosophy and methodology. Grounded in ANT and Latour. The Stalker Problem metaphor. How strategy got flattened. Embedded Canva presentation.", 6560),
          ]}),
          new TableRow({ children: [
            makeCell("Teaching & Research", 2800, { shading: ltGray }),
            makeCell("Origin story (sociology to strategy). McMaster CE, U of L courses. The Thoughtful Strategist reading group. Peer-reviewed publications, conference presentations, research positions.", 6560, { shading: ltGray }),
          ]}),
          new TableRow({ children: [
            makeCell("Published & Spoken", 2800),
            makeCell("Cultural Cartography Substack essays, trade publications (LBB, Quirk\u2019s, Globe and Mail), keynotes, industry roles, individual recognition, campaign awards, podcasts (host and guest), selected press.", 6560),
          ]}),
          new TableRow({ children: [
            makeCell("Music & Culture", 2800, { shading: ltGray }),
            makeCell("Bands, record labels (Mammoth Cave, Pleasence), event production, cultural criticism (Slagging Off, Weird Canada, New Feeling), touring, production credits. Extensive photo gallery.", 6560, { shading: ltGray }),
          ]}),
          new TableRow({ children: [
            makeCell("Eye Witness Accounts", 2800),
            makeCell("Three subsections: Client Testimonials (5), Peer/Colleague Endorsements (5), RateMyProfessors.com Reviews (10 curated, including 2 negative for humor).", 6560),
          ]}),
        ]
      }),

      spacer(),
      heading("5.3 Project Case Studies (27)", HeadingLevel.HEADING_2),
      body("Each case study includes: title, year, category, summary, narrative sections (typically 4\u20136), proof/results, and image galleries. Some include video embeds (YouTube thumbnails, Vimeo iframes, MP4 native). Three categories:"),
      bulletItem("Campaign Strategy (9 projects): CMC \u201CI\u2019m High Right Now,\u201D CasinoTime Big Fran, Tweed Hi/Don\u2019t Drive High, Scotiabank Hockey 24, Coleman, Sunbeam, etc.", "bullets"),
      bulletItem("Brand Architecture (13 projects): SHRED, Wyld, MadeGood, Pangea, Highly Dutch, SoleSavy, etc.", "bullets"),
      bulletItem("Corporate Comms (5 projects): Air Canada Aeroplan, Nia Health, Shoppers Drug Mart, RBC Future Launch, CN Rail", "bullets"),

      pageBreak(),

      // ====================== 6. TONE & VOICE ======================
      heading("6. Tone & Voice"),
      body("The site\u2019s voice is PK\u2019s voice. It reads like he talks: direct, warm, intellectually sharp, occasionally funny, never self-important. The design must support this voice, not compete with it."),
      spacer(),

      label("Voice Characteristics"),
      bulletItem("Direct: No hedging. Says the thing. \u201CSome people will say, \u2018But PK, aren\u2019t you worried about working in cannabis limiting your career options?\u2019 and then I show them how sharp I\u2019ve made my strategy blade.\u201D", "bullets"),
      bulletItem("Warm but not soft: Treats people well, holds high standards. \u201CContribution is what sustains me. The infrastructure of community building is the same in any medium.\u201D", "bullets"),
      bulletItem("Intellectually grounded: References Latour, Bourdieu, Tarkovsky naturally \u2014 not as name-drops but as working tools.", "bullets"),
      bulletItem("Self-deprecating where it counts: \u201CI am still, and forever will be, a \u2018candidate.\u2019\u201D RateMyProfessor reviews included for humor.", "bullets"),
      bulletItem("Proof-oriented: Numbers, names, outcomes. Not \u201Cwe did great work.\u201D Instead: \u201C85% win rate. 256M earned impressions. 14.4% market share from zero.\u201D", "bullets"),

      label("What the Voice is NOT"),
      bulletItem("Not corporate: No mission statements, no \u201Cwe leverage synergies\u201D language", "bullets2"),
      bulletItem("Not humble-braggy: The work speaks. PK presents facts and lets you draw conclusions", "bullets2"),
      bulletItem("Not precious about design: The current monospace + black-and-white palette works because it gets out of the way. Don\u2019t replace it with something that tries harder than the content", "bullets2"),

      pageBreak(),

      // ====================== 7. VISUAL DIRECTION ======================
      heading("7. Visual Direction"),

      label("Current Design Language"),
      body("The existing site uses a monospace font stack, black-and-white palette, and a slide-out panel pattern. Content is text-heavy with image grids (grayscale hover-to-color) and embedded video. The aesthetic reads as: editorial, utilitarian, slightly brutalist, high-information-density. This is working. The redesign should refine and extend this language, not abandon it."),
      spacer(),

      label("Design Principles"),
      bulletItem("Content-first: Text is the primary medium. The design exists to make reading comfortable, not to decorate", "bullets3"),
      bulletItem("High information density, low noise: Dense content must be scannable. Use hierarchy, spacing, and typography \u2014 not color or ornament \u2014 to guide the eye", "bullets3"),
      bulletItem("Authenticity over polish: The site should feel like a person made it, not a template. Rough edges that are intentional are better than corporate smoothness", "bullets3"),
      bulletItem("Let photography and video do the visual lifting: PK has excellent documentary photography from shows, agency life, and press. Use it. Don\u2019t add stock photography", "bullets3"),
      bulletItem("Performance matters: Fast load times, no unnecessary animations, minimal JavaScript overhead beyond React essentials", "bullets3"),

      label("Typography Direction"),
      body("The current monospace stack is strong and distinctive. Consider pairing it with a sharp sans-serif for headings (something like Instrument Sans, which Sister Merci uses, or Söhne, Untitled Sans, or Inter for broader availability). The monospace body text is a signature move \u2014 it signals \u201Cthis person writes and thinks in plain text.\u201D Keep it."),
      spacer(),

      label("Color Direction"),
      body("Black and white is the foundation. If accent color is introduced, consider Sister Merci\u2019s charcoal (#231F20) as the primary text color instead of pure black, and a single accent (lavender #E6E6FB from the SM brand, or a muted warm tone) used sparingly for section dividers or interactive states. Avoid adding a full color palette. The restraint is the point."),
      spacer(),

      label("Photography & Media"),
      body("The site currently has ~40+ images across galleries, plus embedded video (YouTube, Vimeo, MP4). The grayscale-to-color hover treatment on image grids is a good signature. Consider extending this treatment. All photography is documentary/candid \u2014 maintain this. No staged headshots, no stock."),

      pageBreak(),

      // ====================== 8. INTERACTION & NAVIGATION ======================
      heading("8. Interaction & Navigation"),

      label("Current Pattern"),
      body("Home page acts as a table of contents. Four expandable category accordions (Background, Campaign Strategy, Brand Architecture, Corporate Comms). Clicking any item opens a full-width slide-out panel from the right with a \u201C\u2190 Back\u201D button. Content renders in the panel. Lightbox for image zoom."),
      spacer(),

      label("What Works"),
      bulletItem("The slide-out panel creates a document-reading experience distinct from typical scrolling portfolios", "bullets4"),
      bulletItem("The accordion navigation surfaces the full content inventory without overwhelming", "bullets4"),
      bulletItem("The pattern supports both scanning (nav screen) and deep reading (panel)", "bullets4"),

      label("Opportunities"),
      bulletItem("Consider deep-linking/routing so individual sections and projects can be shared via URL", "bullets5"),
      bulletItem("Mobile experience needs attention: the slide-out panel at full width on mobile may need adaptation", "bullets5"),
      bulletItem("Search or filtering within the 27 case studies could help navigation for repeat visitors", "bullets5"),
      bulletItem("Section-level navigation within long panels (Agency as Lab, Published & Spoken, Music & Culture) would improve usability", "bullets5"),
      bulletItem("Consider a \u201Cquick stats\u201D or \u201Cat a glance\u201D summary that precedes the deep content", "bullets5"),

      pageBreak(),

      // ====================== 9. COMPETITIVE CONTEXT ======================
      heading("9. Competitive Context"),
      body("PK\u2019s site competes for attention against two types of comparables:"),
      spacer(),

      label("Senior Strategist Portfolios"),
      body("Most senior strategists at PK\u2019s level don\u2019t have portfolio sites. They rely on LinkedIn, conference bios, and reputation. Having a site at all is a differentiator. The few who do tend toward either (a) minimal single-page sites with a bio and links, or (b) overdesigned agency-style presentations. PK\u2019s content depth is his unfair advantage. No comparable strategist site has this volume of case studies, original thinking, testimonials, AND a parallel creative body of work."),
      spacer(),

      label("Agency Founder Portfolios"),
      body("Agency founders tend to subsume their personal brand under the agency brand. PK\u2019s site positions him as an individual with a body of work that extends beyond any one agency. This is important for the Edelman/Ogilvy audience: they\u2019re hiring PK, not hiring Sister Merci."),
      spacer(),

      label("Positioning Statement for the Site"),
      body("The only strategist portfolio that bridges a 150+ brand agency practice, peer-reviewed academic research, two decades of underground music infrastructure, and a distinct strategic methodology grounded in critical theory \u2014 all backed by client testimonials, student reviews, and measurable outcomes.", { italics: true }),

      pageBreak(),

      // ====================== 10. TECHNICAL SPECIFICATIONS ======================
      heading("10. Technical Specifications"),

      label("Current Stack"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ children: [makeCell("Framework", 3000, { bold: true, shading: ltGray }), makeCell("React 18 + Vite", 6360)] }),
          new TableRow({ children: [makeCell("Styling", 3000, { bold: true, shading: ltGray }), makeCell("Tailwind CSS (utility-first)", 6360)] }),
          new TableRow({ children: [makeCell("Hosting", 3000, { bold: true, shading: ltGray }), makeCell("Vercel (auto-deploy from GitHub)", 6360)] }),
          new TableRow({ children: [makeCell("Repository", 3000, { bold: true, shading: ltGray }), makeCell("github.com/quartermass-merci/pk-portfolio", 6360)] }),
          new TableRow({ children: [makeCell("Architecture", 3000, { bold: true, shading: ltGray }), makeCell("Single-page application. All content in App.jsx (~995 lines) + projects.json (~1,786 lines)", 6360)] }),
          new TableRow({ children: [makeCell("Domain", 3000, { bold: true, shading: ltGray }), makeCell("pklawton.com", 6360)] }),
        ]
      }),
      spacer(),

      label("Technical Considerations for Redesign"),
      bulletItem("Content currently lives in a single 995-line App.jsx. Consider componentizing sections for maintainability", "bullets6"),
      bulletItem("Project data is well-structured in JSON. This is a good pattern to maintain and extend", "bullets6"),
      bulletItem("No CMS currently. PK edits code directly. Consider whether a headless CMS (Sanity, Contentful) would support his update cadence", "bullets6"),
      bulletItem("SEO is limited in the current SPA architecture. Consider SSR/SSG (Next.js) or at minimum, meta tag management for sharing", "bullets6"),
      bulletItem("Image optimization: currently loading full-resolution external URLs. Implement responsive images and lazy loading", "bullets6"),
      bulletItem("No analytics currently visible. Implement lightweight tracking (Plausible or Vercel Analytics) to understand visitor behavior", "bullets6"),

      pageBreak(),

      // ====================== 11. SUCCESS CRITERIA ======================
      heading("11. Success Criteria"),
      body("The redesigned site succeeds if:"),
      spacer(),
      bulletItem("A senior hiring leader (CSO, EVP) can understand PK\u2019s range and depth within a 2-minute scan of the home page and one section deep-dive", "bullets7"),
      bulletItem("The 27 case studies are navigable and each tells a clear story with measurable outcomes", "bullets7"),
      bulletItem("The site supports PK\u2019s voice without the design competing for attention", "bullets7"),
      bulletItem("Individual sections and projects can be shared via direct URL", "bullets7"),
      bulletItem("The site loads fast on mobile and desktop without compromising content density", "bullets7"),
      bulletItem("PK can update content himself without a developer (whether through code or a CMS)", "bullets7"),
      bulletItem("The music/culture section feels like a legitimate body of work, not an afterthought", "bullets7"),
      bulletItem("A visitor leaves with the impression: \u201CThis person has built real things, thought deeply about the work, and has the receipts to prove it.\u201D", "bullets7"),

      spacer(),
      spacer(),

      // ====================== CLOSING ======================
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: charcoal, space: 8 } },
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: "END OF BRIEF", font: "Arial", size: 20, bold: true, color: medGray, characterSpacing: 120 })]
      }),
      body("For questions, context, or clarification: paul@sistermerci.com | 647-241-2575"),
      body("Current site: pklawton.com | GitHub: github.com/quartermass-merci/pk-portfolio"),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = '/Users/smadmin/pk-portfolio-edit/PKLAWTON_Website_Design_Brief.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('SUCCESS: ' + outPath);
}).catch(err => {
  console.error('ERROR:', err.message);
});
