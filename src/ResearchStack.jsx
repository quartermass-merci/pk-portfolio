import { useState } from 'react';

// ── Copy button ──
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="text-xs uppercase tracking-widest border border-black px-2 py-0.5 hover:bg-black hover:text-white transition-colors"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

// ── Expandable phase ──
function Phase({ num, name, subtitle, tool, time, gate, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}        className="w-full flex items-baseline gap-3 py-3 text-left hover:opacity-70 transition-opacity"
      >
        <span className="text-xs font-bold text-gray-400 w-4 shrink-0">{num}</span>
        <span className="font-bold uppercase tracking-widest text-sm flex-1">{name}</span>
        <span className="text-xs text-gray-500">{tool}</span>
        <span className="text-xs text-gray-400">{time}</span>
        <span className="text-xs">{open ? '↓' : '→'}</span>
      </button>
      {open && (
        <div className="pl-7 pb-6 space-y-4">
          {subtitle && <p className="text-xs uppercase tracking-widest text-gray-500">{subtitle}</p>}
          {children}
          {gate && (
            <div className="border-l-2 border-red-800 pl-3 mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-red-800 mb-1">⛔ Human Gate: {gate.title}</p>
              <p className="text-sm">{gate.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Prompt block ──
function Prompt({ label, text }) {
  return (
    <div className="border-l-2 border-gray-400 pl-3 my-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>        <CopyButton text={text} />
      </div>
      <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono bg-gray-50 p-3">{text}</pre>
    </div>
  );
}

// ── Tool row ──
function ToolRow({ fn, tools }) {
  return (
    <div className="flex gap-4 py-1.5 border-b border-gray-100 last:border-b-0">
      <span className="text-xs font-bold w-36 shrink-0">{fn}</span>
      <span className="text-xs text-gray-600">{tools}</span>
    </div>
  );
}

// ════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════
export default function ResearchStack() {
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);

  const tiers = [
    { id: 'orient', name: 'Orient', time: '1–2 hours', output: 'Get smart enough for a meeting', primary: false, phases: 'SCOPE → light DUMP → DESIGN → half SOURCE → LOAD → LEARN (A–C) → done', desc: 'Pre-meeting prep, unfamiliar category first look, client meet-and-greet.' },
    { id: 'corpus', name: 'Corpus', time: '5–8 hours', output: 'Build an annotated bibliography', primary: false, phases: 'SCOPE → DUMP → DESIGN → full SOURCE → optional LOAD/LEARN → ARCHIVE', desc: 'The deliverable IS the source corpus. Academic input, curated reading list.' },    { id: 'brief', name: 'Brief', time: '8–12 hours', output: 'Brief the team or a stakeholder', primary: 'optional', phases: 'Full pipeline. Lighter soak. Optional primary research.', desc: 'Category primer, competitive landscape, onboarding document.' },
    { id: 'recommend', name: 'Recommend', time: '10–14 hours', output: 'Make a strategic recommendation', primary: 'targeted', phases: 'Full pipeline + targeted primary research. Full soak. Room Test.', desc: 'Client strategy, positioning, campaign brief, pitch.' },
    { id: 'publish', name: 'Publish', time: '14–20+ hours', output: 'Publish or present original thinking', primary: 'full', phases: 'Full pipeline + full triangulation + theoretical framing.', desc: 'Thought leadership, academic paper, conference talk, Rebrief feature.' },
  ];

  return (
    <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
      <h2 className="text-xl mb-2 font-bold uppercase tracking-widest">Research Stack</h2>
      <h3 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">
        A RESEARCH-TO-FLUENCY OPERATING SYSTEM
      </h3>

      {/* ── INTRO ── */}
      <div className="space-y-4 mb-12">
        <p>Two ways a strategy team gets AI wrong. First: you ask a chatbot a question, get a confident answer, put it in a deck. Someone pushes back in the room and you fold, because the knowledge was never yours. Second: you do everything manually. Three weeks getting fluent when you have three days. The rigor is admirable. The velocity is a liability.</p>
        <p>This operating system sits between those two failures. AI sharpens the questions and finds the sources. You do the thinking. At no point does the AI generate claims for a deliverable. Every insight traces to a source you have read, a question you have answered, and an argument you can reconstruct from memory.</p>
        <p className="font-bold">The test: if someone challenges a claim in your brief, can you explain the evidence, name the counterargument, and say why you came down where you did? If yes, the research worked. If no, you skipped a step.</p>
      </div>
      {/* ── DECISION WIZARD ── */}
      <div className="border border-black p-4 mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-4">→ Decision Wizard: What Do You Need?</p>

        {wizardStep === 0 && (
          <div>
            <p className="mb-3 font-bold">What are you producing?</p>
            <div className="space-y-2">
              {tiers.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTier(t); setWizardStep(1); }}
                  className="w-full text-left border border-gray-300 p-3 hover:border-black transition-colors"
                >
                  <span className="font-bold">{t.name}</span>
                  <span className="text-gray-500 ml-2">— {t.output}</span>
                  <span className="text-xs text-gray-400 ml-2">{t.time}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {wizardStep === 1 && selectedTier && (
          <div>
            <p className="text-xs text-gray-500 mb-3">
              <button onClick={() => { setWizardStep(0); setSelectedTier(null); }} className="underline hover:opacity-70">← Change tier</button>
            </p>            <p className="font-bold mb-2">{selectedTier.name} — {selectedTier.time}</p>
            <p className="mb-3">{selectedTier.desc}</p>
            <div className="bg-gray-50 p-3 mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Your Path</p>
              <p className="font-mono text-xs">{selectedTier.phases}</p>
            </div>
            <div className="bg-gray-50 p-3 mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Primary Research</p>
              <p>{selectedTier.primary === false ? 'None — secondary only.' : selectedTier.primary === 'optional' ? 'Optional. Stakeholder interviews, community observation.' : selectedTier.primary === 'targeted' ? 'Targeted. 5–8 interviews, community ethnography, or survey after desk research reveals the gaps.' : 'Full triangulation. Multiple evidence streams designed to converge.'}</p>
            </div>
            <p className="text-xs text-gray-400">Before you start: write a one-sentence problem statement and name the output artifact. If you can't do both, you need more information, not more research.</p>
          </div>
        )}
      </div>

      {/* ── FULL PIPELINE ── */}
      <h4 className="font-bold border-b border-black pb-1 mb-1">The Pipeline</h4>
      <p className="text-xs text-gray-500 mb-4">Scope → Dump → Filter → Design → Source → Load → Learn → [Primary] → Write → Archive</p>
      <Phase num="0" name="Scope" tool="HUMAN" time="15–30 min"
        gate={{ title: 'Three-Sentence Check', description: "State the problem in one sentence. Name the tier. Name the output artifact. If you can't do all three, you're not ready." }}>
        <p>Three questions before you touch anything: What is the problem? (one sentence) Why are we researching it? (pick your tier) What does the output look like? (name the artifact)</p>
        <p className="text-xs text-gray-500 mt-2">Inputs: client brief, RFP, onboarding docs, kickoff transcript, account lead context.</p>
      </Phase>

      <Phase num="1" name="Dump" tool="HUMAN" time="30–60 min"
        gate={{ title: 'Declare Your Priors', description: "Write one paragraph, no AI: what you think the answer is, what you're uncertain about, what would change your mind. This is your anchor." }}>
        <p>Externalize everything: call transcripts, client briefs, gut hypotheses, Slack threads, adjacent examples, existing frameworks, open questions. Don't organize it. Label each piece with its source type.</p>
        <p className="text-xs text-gray-500 mt-2">Tools: Otter | Fireflies | Rev | Descript (transcription) · Apple Notes | Notion | Obsidian (capture)</p>
      </Phase>

      <Phase num="1.5" name="Filter" subtitle="CONFIDENTIALITY + CHUNKING" tool="HUMAN" time="10–15 min"
        gate={{ title: 'Clean Input', description: "The filtered version — not the raw dump — goes into the LLM. If you wouldn't email it to a stranger, don't paste it into a prompt." }}>
        <p>Two operations before anything goes into an LLM. First, strip client names, proprietary data, and NDA-covered material. The research design prompt needs the problem structure, not the client's name. Second, chunk it: read through your dump and pull the 10–15 sentences that carry the tension, the hypothesis, the open questions. The rest stays in your notes.</p>
      </Phase>
      <Phase num="2" name="Design" tool="LLM QUERY" time="20–40 min"
        gate={{ title: 'Own Your Questions', description: 'AI proposed questions. You edit, cut, reword, add. The final set is yours. Then tag each: DEEP SEARCH (niche, worth a token) or STANDARD SEARCH (established lit, free query).' }}>
        <p>Two prompts, not one. The first maps the territory. You edit. The second generates questions from your edited map.</p>

        <Prompt label="Prompt 2a — Tension + Question Type Mapping" text={`CONTEXT: I'm preparing a research sprint for a strategy project. Below is my raw thinking — messy notes, client context, gut hypotheses, and open questions.

[paste your filtered dump here]

TASK:
1. State the core tension I'm circling in one sentence — the central gap, paradox, or problem.
2. For each of these question types, tell me whether I need it for this specific problem and why or why not: Definitional, Empirical, Causal/Mechanistic, Comparative, Normative/Evaluative, Historical.

Stop after the mapping. Do not generate research questions yet.`} />

        <p className="text-xs text-gray-500 my-2">⛔ Human edit: review 2a output. Is the tension right? Which question types matter for YOUR project? Cut what doesn't serve the SCOPE objective.</p>

        <Prompt label="Prompt 2b — Question Generation" text={`Here is my research tension and the question types I've selected:

[paste your edited 2a output with your edits noted]

Generate 5–7 research questions. For each question, include:
- Type: which question type from the mapping
- Source domains: where would I find answers (e.g., "marketing science journals," "industry analyst reports")
- Time scope: what publication window matters (e.g., "2020–2025 for current dynamics")
- Scope check: can this be answered with 8–12 sources, or does it need splitting?

After the questions, flag:
- Which are too broad for a single research sprint
- Which assume contested premises that need their own investigation
- Where I'm conflating describing what is with evaluating what should be

End with a sequencing recommendation: which to research first to ground the others.`} />
      </Phase>
      <Phase num="3" name="Source" tool="DEEP RESEARCH + LLM" time="60–120 min"
        gate={{ title: 'Source Integrity', description: "Every source has a working URL and has been script-verified or human-verified. Any [UNVERIFIED] confirmed or dropped. If you can't vouch for your corpus, nothing downstream is trustworthy." }}>
        <p>DEEP-tagged questions get Deep Research tokens (1–2 questions per run max for best quality). STANDARD-tagged questions use free search-enabled LLM queries with the same prompt. Run across 2–3 LLMs for cross-validation.</p>

        <Prompt label="Prompt 3a — Annotated Bibliography (run per 2–3 questions)" text={`ROLE: Research librarian building an annotated bibliography.

RESEARCH QUESTIONS:
[paste max 3 questions]

SOURCE RULES:
- Allowed: peer-reviewed journals, academic press books, government/regulator publications, standards bodies, OECD/UN/WHO-type institutions, reputable research firms, think tanks with transparent methods.
- Excluded: blogs, newsletters, Medium/Substack, vendor content marketing, unsourced commentary.
- Verification mandatory: include only if you can provide (1) a working DOI or (2) an official publisher/issuer URL. If unverifiable, mark [UNVERIFIED] and explain.
- Do not guess bibliographic fields.
- Distinguish between sources you are confident exist and those reconstructed from training data. Flag uncertain sources as [CONFIDENCE: LOW].

SELECTION RULES:
- Target 8–12 sources per question. If high-quality sources run out before 8, stop and state the gap. Do not fill with weaker sources to hit a number.
- Year mix: 6–7 from 2023–2025, 2–3 from 2015–2022, 1–2 seminal pre-2015.
- Diversity caps: max 2 per first author, max 3 per journal, max 3 per issuer.
- Order: newest to oldest within each year band.

ENTRY FORMAT (per source):
1. APA 7 citation
2. Study type and methods
3. Key findings (2–4 sentences)
4. Conceptual frame
5. Operationalization (how key constructs defined/measured)
6. Direct contribution to research question
7. Limits and cautions (1 sentence)
8. Evidence strength: [HIGH], [MEDIUM], or [LOW] plus reason
9. Proof links: DOI + publisher URL

After the entries, produce a clean URL loading list: one verified URL per line, no markup, no numbering, matching the bibliography sequence.`} />
        <Prompt label="Prompt 3b — Stitch + Deduplicate (after multiple runs)" text={`Here are annotated bibliography outputs from multiple research tools on the same topic.

[paste all bibliography outputs]

Tasks:
1. Deduplicate: remove exact and near-duplicate sources. Keep the version with the most complete bibliographic data.
2. Cross-list signal: flag any source appearing in 2+ original lists as [HIGH CONFIDENCE].
3. Master bibliography: single merged bibliography, ordered by research question, newest to oldest.
4. URL loading list: one verified URL per line, no markup, no numbering, matching the bibliography sequence.`} />

        <p className="mt-3"><span className="font-bold">Verification:</span> 3c = automated URL check (script). 3d = human spot-check of 5–8 sources, prioritizing [CONFIDENCE: LOW] and [MEDIUM] evidence strength.</p>

        <p className="text-xs text-gray-500 mt-3">Tools: Google Scholar | Semantic Scholar | JSTOR | SSRN (academic) · Elicit | Consensus.app (AI search) · Connected Papers | Research Rabbit (lit mapping) · Claude | Gemini | Perplexity (deep research) · Zotero | Mendeley (bib management) · DOI.org | Crossref (verification)</p>
      </Phase>
      <Phase num="4" name="Load" tool="NOTEBOOKLM" time="20–30 min"
        gate={{ title: 'Corpus Review', description: "If you could only learn from these sources, would you trust the picture? If not, fill the gap before investing soak time." }}>
        <p><span className="font-bold">Goes in the notebook:</span> verified URLs, PDFs, your research questions (paste as text source), client docs if relevant.</p>
        <p><span className="font-bold">Stays on your desk:</span> the annotated bibliography (your proof lines — loading it contaminates the interrogation with AI interpretation), your Phase 1 priors note.</p>

        <Prompt label="Prompt 4a — Gap Analysis (first prompt in notebook)" text={`I've loaded sources for a research project. My research questions are in the text source titled "RESEARCH QUESTIONS."

Review this corpus against those questions. For each question, tell me:
- What perspectives or evidence types are well-represented
- What's underrepresented or missing entirely
- What a skeptic of my source selection would point to as a blind spot`} />

        <p className="text-xs text-gray-500 mt-2">Decision: one notebook (default, fine for most projects) or two notebooks (A = academic/theoretical, B = applied/industry — run interrogation on each, cross-synthesize yourself in Phase 6).</p>
      </Phase>
      <Phase num="5" name="Learn" subtitle="INTERROGATION PROTOCOL" tool="NOTEBOOKLM + HUMAN" time="4–8h full / 1–2h sprint"
        gate={{ title: 'Earn Your Position', description: "Without notes: name the three biggest debates and where you come down on each. If you can't, more soak time." }}>
        <p>Six stages. A–C take about an hour. D (the soak) takes 3–6 hours. ORIENT tier exits after C.</p>

        <Prompt label="Stage A — Mental Model Extraction" text={`What are the 5 core mental models that experts in [this domain] share? Not facts or best practices — the underlying frameworks that shape how they see the field, evaluate options, and interpret new information. Ground each model in specific sources from this notebook.`} />

        <Prompt label="Stage B — Debate Mapping" text={`Where do experts in this field fundamentally disagree? Identify 3–5 unresolved debates. For each one: state the disagreement clearly, give each side's strongest argument, and cite the specific sources that support each position.`} />

        <Prompt label="Stage C — Diagnostic Questions" text={`Generate 10 questions that would separate someone who genuinely understands this field from someone who memorized the key facts. These should require connecting multiple concepts, weighing tradeoffs, or reasoning through ambiguity. Reference specific source material in the expected answers.`} />

        <p className="text-xs text-gray-500 border-l-2 border-yellow-600 pl-3 my-3">ORIENT tier exits here. Review A–C output, take notes, done.</p>

        <p className="font-bold mt-4">Stage D — The Soak (3–6 hours, human only)</p>
        <p>Answer each diagnostic question using the source material. For every wrong answer: "Explain why my answer is wrong and what I'm missing. Cite specific sources." Repeat until no gaps. For each debate from Stage B, write one sentence on which side you lean toward and why.</p>

        <Prompt label="Stage E — Pre-Mortem" text={`Here is the position I've developed from this research:
[write 2–3 sentences stating your position]

Stress-test it. What are the 3 strongest counterarguments someone could make using the sources in this notebook? What evidence would make my position wrong? Where is my reasoning weakest?`} />

        <Prompt label="Stage F — Synthesis Draft" text={`Based on everything in these sources, write a one-page briefing for [name your audience: e.g., "a strategy team new to this category" or "a client executive making a decision"]. Cover:
- The consensus view — what most experts agree on
- The key open questions — what's unresolved
- The 2–3 things a strategist must get right in this space
- One non-obvious insight that most newcomers miss

Cite sources for every claim. No padding.`} />
      </Phase>
      {/* PRIMARY RESEARCH PHASE */}
      <Phase num="★" name="Primary Research" subtitle="TIERS 3–5 ONLY · RUNS IN PARALLEL WITH OR AFTER PHASE 5" tool="FIELDWORK" time="Varies"
        gate={{ title: 'Design Primary Research', description: "After Phase 5 reveals the gaps: what primary evidence would make this defensible? What can't you learn from published sources?" }}>
        <p>Phases 0–5 compress secondary research from weeks to hours. That time savings is not margin. It's an investment in fieldwork that produces evidence no other agency with a ChatGPT subscription can replicate.</p>

        <p className="font-bold mt-4 border-b border-black pb-1 mb-2">Quantitative Methods</p>
        <p>Survey design — Typeform | SurveyMonkey | Qualtrics</p>
        <p>Social listening / sentiment — Q-Litics | Brandwatch | Sprout Social</p>
        <p>Internal client data analysis — BU data, CRM, web analytics</p>
        <p>Behavioral data — GA4 | Hotjar | platform analytics</p>
        <p>Community scraping — structured semantic analysis (Reddit, forums)</p>

        <p className="font-bold mt-4 border-b border-black pb-1 mb-2">Qualitative Methods</p>
        <p>Stakeholder interviews — 1:1, structured or semi-structured</p>
        <p>Expert interviews — category specialists, regulators, practitioners</p>
        <p>Online ethnography — Reddit, Discord, forums (participant/observer)</p>
        <p>In-field observation — retail, events, dispensary floor, user testing</p>
        <p>Diary studies — participant journaling over time</p>

        <p className="font-bold mt-4 border-b border-black pb-1 mb-2">Triangulation Models</p>
        <div className="space-y-3">
          <div>
            <p className="font-bold">Manulife Model (PUBLISH tier)</p>
            <p>Internal BU data + national survey (n=2,000) + academic/govt validation + stakeholder interviews feeding a workshop. Evidence converges on a single thesis.</p>
          </div>
          <div>
            <p className="font-bold">Q-Litics Model (RECOMMEND+ tier)</p>
            <p>Semantic taxonomy + contextual sentiment scoring of online communities + structured interviews + existing literature. Qual-quant hybrid.</p>
          </div>          <div>
            <p className="font-bold">Category Sprint (BRIEF/RECOMMEND tier)</p>
            <p>5–8 stakeholder interviews + community observation (Reddit lurk) + desk research from Phases 2–5. Lightweight triangulation.</p>
          </div>
        </div>
      </Phase>

      <Phase num="6" name="Write" tool="HUMAN" time="2–4 hours"
        gate={{ title: 'The Room Test', description: "Could you present this without notes and handle three hard follow-up questions? If not, you're working from someone else's understanding." }}>
        <p>You write the deliverable. From your understanding, not from AI output. The named artifact from SCOPE is your target.</p>
        <p className="mt-2"><span className="font-bold">Draft from understanding.</span> Use Stage F synthesis as reference, not template. If you're copying AI sentences, stop.</p>
        <p className="mt-1"><span className="font-bold">Compare priors.</span> Pull up Phase 1 note. If your thinking changed, name the specific source that changed it.</p>
        <p className="mt-1"><span className="font-bold">Humanizer pass.</span> All external deliverables through the standard humanizer workflow. Polishing, not drafting.</p>
        <p className="mt-1"><span className="font-bold">Cite sources, not AI.</span> Every claim traces to a named, verified source from your corpus.</p>
        <p className="text-xs text-gray-500 mt-2">Where synthesis happens: secondary synthesis = Phase 5F (NotebookLM). Primary synthesis = ★ (your analysis of your fieldwork). Integration of both streams = Phase 6 (you, writing). You are the one who triangulates.</p>
      </Phase>

      <Phase num="7" name="Archive" tool="HUMAN" time="5 min">
        <p>Good notebooks compound. Name: [Client] — [Topic] — [Month Year]. File in shared Drive. Save bibliography as standalone doc. Add one-line description to team index. Five minutes of housekeeping that turns a project artifact into a team resource.</p>
      </Phase>
      {/* ── THE BRIGHT LINE ── */}
      <div className="border-t-2 border-black mt-12 pt-6 mb-12">
        <h4 className="font-bold border-b border-black pb-1 mb-4">The Bright Line</h4>
        <div className="space-y-2 font-bold">
          <p>AI never generates a claim that goes into a client deliverable without a human-verified source behind it.</p>
          <p>AI never writes the first draft of a strategic recommendation.</p>
          <p>AI never produces a final artifact.</p>
          <p>Primary research fills the gaps that published literature can't.</p>
        </div>
        <p className="mt-4 text-gray-500 italic">AI sharpens the questions and finds the sources. You do the thinking.</p>
      </div>

      {/* ── TOOLS REFERENCE ── */}
      <h4 className="font-bold border-b border-black pb-1 mb-3">Tools Reference</h4>
      <div className="mb-12">
        <ToolRow fn="Transcription" tools="Otter.ai | Fireflies.ai | Rev.com | Descript" />
        <ToolRow fn="Note capture" tools="Apple Notes | Notion | Obsidian | Google Docs" />
        <ToolRow fn="LLM (simple)" tools="Claude | ChatGPT | Gemini" />
        <ToolRow fn="Deep Research" tools="Claude | Gemini | Perplexity" />
        <ToolRow fn="Academic search" tools="Google Scholar | Semantic Scholar | JSTOR | SSRN | PubMed" />
        <ToolRow fn="AI paper search" tools="Elicit | Consensus.app | Scite.ai" />
        <ToolRow fn="Lit mapping" tools="Connected Papers | Research Rabbit | Litmaps" />
        <ToolRow fn="Verification" tools="DOI.org resolver | Crossref | publisher sites" />
        <ToolRow fn="Bib management" tools="Zotero | Mendeley | Paperpile" />
        <ToolRow fn="Notebook" tools="Google NotebookLM" />
        <ToolRow fn="Survey design" tools="Typeform | SurveyMonkey | Qualtrics" />
        <ToolRow fn="Social listening" tools="Q-Litics | Brandwatch | Sprout Social | BuzzSumo" />
        <ToolRow fn="Community" tools="Reddit | Discord | Facebook Groups | specialist forums" />
        <ToolRow fn="Writing polish" tools="Hemingway Editor | Grammarly" />
        <ToolRow fn="Team storage" tools="Google Drive | Notion | Dropbox" />
        <ToolRow fn="During the soak" tools="Pen and paper" />
      </div>
    </div>
  );
}