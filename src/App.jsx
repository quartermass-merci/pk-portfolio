import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import portfolioData from './data/projects.json';
const ResearchStack = React.lazy(() => import('./ResearchStack'));
import PixelTrail from './components/PixelTrail';
import { useScreenSize } from './components/hooks/useScreenSize';
import AnimatedLink from './components/AnimatedLink';
import ContentSection from './components/ContentSection';
import { VariableFontHoverByLetter } from './components/VariableFontHover';
import { InfiniteSlider } from './components/InfiniteSlider';
import { Zap, LineChart, Sparkles, MessageCircleQuestion, Compass, Network, Send, Shield, Microscope, Rocket, Users, Megaphone, Search, Share2, Handshake, Layers, Hammer, Radio, AlertTriangle, Activity, GraduationCap, Briefcase, Palette } from 'lucide-react';

// Editable content files — edit these .md files to update background sections
import aboutContent from './content/about.md?raw';
import timelineContent from './content/timeline.md?raw';
import educationContent from './content/education.md?raw';
import agencyContent from './content/agency.md?raw';
import squareContent from './content/square.md?raw';
import cartographyContent from './content/cartography.md?raw';
import teachingContent from './content/teaching.md?raw';
import publishedContent from './content/published.md?raw';
import musicContent from './content/music.md?raw';
import testimonialsContent from './content/testimonials.md?raw';

const sectionContent = {
  about: aboutContent,
  timeline: timelineContent,
  education: educationContent,
  agency: agencyContent,
  square: squareContent,
  cartography: cartographyContent,
  teaching: teachingContent,
  published: publishedContent,
  music: musicContent,
  testimonials: testimonialsContent,
};

// Single row, ordered by industry cluster so peers appear together
const BRAND_LOGOS = [
  // Cannabis
  { src: '/images/scrolling-logos/canopy-growth.png', alt: 'Canopy Growth' },
  { src: '/images/scrolling-logos/tweed.svg', alt: 'Tweed' },
  { src: '/images/scrolling-logos/houseplant.png', alt: 'Houseplant' },
  { src: '/images/scrolling-logos/7acres.png', alt: '7Acres' },
  { src: '/images/scrolling-logos/deep-space.png', alt: 'Deep Space' },
  { src: '/images/scrolling-logos/spectrum.svg', alt: 'Spectrum' },
  { src: '/images/scrolling-logos/homebase.png', alt: 'Homebase' },
  { src: '/images/scrolling-logos/collective-arts.png', alt: 'Collective Arts' },
  { src: '/images/scrolling-logos/holy-mountain.png', alt: 'Holy Mountain' },
  { src: '/images/scrolling-logos/shred.png', alt: 'Shred' },
  { src: '/images/scrolling-logos/wyld.png', alt: 'WYLD' },
  // Food, Retail & Non-Profit
  { src: '/images/scrolling-logos/mcdonalds.png', alt: "McDonald's" },
  { src: '/images/scrolling-logos/ronald-mcdonald-house.svg', alt: 'Ronald McDonald House' },
  { src: '/images/scrolling-logos/walmart.png', alt: 'Walmart' },
  { src: '/images/scrolling-logos/shoppers.png', alt: 'Shoppers Drug Mart' },
  { src: '/images/scrolling-logos/oreo.png', alt: 'Oreo' },
  { src: '/images/scrolling-logos/madegood.png', alt: 'MadeGood' },
  { src: '/images/scrolling-logos/coleman.png', alt: 'Coleman' },
  // Finance, Auto & Transport
  { src: '/images/scrolling-logos/rbc.png', alt: 'RBC' },
  { src: '/images/scrolling-logos/scotiabank.png', alt: 'Scotiabank' },
  { src: '/images/scrolling-logos/pangea.svg', alt: 'Pangea' },
  { src: '/images/scrolling-logos/manulife.png', alt: 'Manulife' },
  { src: '/images/scrolling-logos/buick.png', alt: 'Buick' },
  { src: '/images/scrolling-logos/chevrolet.png', alt: 'Chevrolet' },
  { src: '/images/scrolling-logos/nissan.png', alt: 'Nissan' },
  { src: '/images/scrolling-logos/infiniti.png', alt: 'Infiniti' },
  { src: '/images/scrolling-logos/air-canada.png', alt: 'Air Canada' },
  // Tech, Media & Health
  { src: '/images/scrolling-logos/nintendo.png', alt: 'Nintendo' },
  { src: '/images/scrolling-logos/cbc.png', alt: 'CBC' },
  { src: '/images/scrolling-logos/globe-and-mail.png', alt: 'Globe and Mail' },
  { src: '/images/scrolling-logos/solesavy.png', alt: 'SoleSavy' },
  { src: '/images/scrolling-logos/novartis.png', alt: 'Novartis' },
  { src: '/images/scrolling-logos/nia-health.png', alt: 'Nia Health' },
  { src: '/images/scrolling-logos/opentext.png', alt: 'OpenText' },
  { src: '/images/scrolling-logos/doodle.png', alt: 'Doodle' },
  { src: '/images/scrolling-logos/mosaic-ai.svg', alt: 'Mosaic AI' },
  { src: '/images/scrolling-logos/novascene-ai.png', alt: 'Novascene AI' },
];

const URL_REGEX = /(https?:\/\/[^\s)]+)/g;
const URL_REGEX_TEST = /^https?:\/\//;

function splitProjectImages(images, sectionCount = 0) {
  if (!images || !images.length) return { hero: null, distributed: [], remaining: [] };
  const hero = images[0];
  const rest = images.slice(1);
  const distributeCount = Math.min(rest.length, Math.max(0, sectionCount - 1));
  const distributed = rest.slice(0, distributeCount);
  const remaining = rest.slice(distributeCount);
  return { hero, distributed, remaining };
}

// Animated number counter — counts from 0 to target on first view
function CountUp({ target }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const n = typeof target === 'number' ? target : parseInt(target);
    if (isNaN(n) || reduced) { setVal(n); return; }
    const duration = 4500; // total animation time in ms
    const start = performance.now();
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setVal(Math.round(ease(progress) * n));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);
  return <span ref={ref}>{val}</span>;
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [view, setView] = useState(null);
  const [zoomImg, setZoomImg] = useState(null);
  const screenSize = useScreenSize();
  const [panelOpen, setPanelOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Motion-aware transition defaults
  const motionProps = prefersReducedMotion
    ? { initial: false, transition: { duration: 0 } }
    : {};


  // Animation variants — page load stagger
  const stagger = prefersReducedMotion ? {} : {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };
  const fadeUp = prefersReducedMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
  };
  // Image grid stagger
  const gridStagger = prefersReducedMotion ? {} : {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } }
  };
  const gridItem = prefersReducedMotion ? {} : {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
  };

  const categories = useMemo(() => ['Brand Design and Architecture', 'Campaign and Brand Strategy', 'Communications Strategy'], []);



  const openPanel = (newView, project = null) => {
    setView(newView);
    setActiveProject(project);
    setPanelOpen(true);
  };

  const closePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const handleProjectClick = (p) => { openPanel('project', p); };

  // Console message for the curious — devs, hiring engineers, journalists who inspect pages
  useEffect(() => {
    const head = 'color:#2D4A8F;font-family:Georgia,serif;font-size:22px;font-weight:bold;letter-spacing:-0.01em';
    const dim = 'color:#565D4F;font-family:ui-monospace,monospace;font-size:12px;line-height:1.6';
    const accent = 'color:#DB3E36;font-family:ui-monospace,monospace;font-size:12px;font-weight:bold';
    console.log('%cPK Lawton', head);
    console.log('%cStrategy × Culture × Commercial Pressure', dim);
    console.log('%c——', dim);
    console.log('%cIf you got here through dev tools, you probably also email people.', dim);
    console.log('%cpklawton@gmail.com', accent);
  }, []);

  // Keyboard: Escape closes lightbox or panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomImg) setZoomImg(null);
        else if (panelOpen) closePanel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomImg, panelOpen, closePanel]);

  const backgroundSections = [
    { id: 'timeline', title: 'Career Timeline' },
    { id: 'education', title: 'Education' },
    { id: 'teaching', title: 'Teaching & Research' },
    { id: 'testimonials', title: 'References' }
  ];

  // Auto-link URLs in text
  const Linkify = ({ text }) => {
    const parts = text.split(URL_REGEX);
    return parts.map((part, i) =>
      URL_REGEX_TEST.test(part) ? (
        <AnimatedLink key={i} href={part} target="_blank" rel="noreferrer" variant="center" className="break-all">{part}</AnimatedLink>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // Video embed — handles YouTube (thumbnail + link), Vimeo (iframe), and MP4 (native)
  const VideoEmbed = ({ url }) => {
    if (!url) return null;
    // MP4 / local video
    if (url.endsWith('.mp4') || url.endsWith('.webm')) {
      return (
        <div className="aspect-video w-full my-6 bg-black overflow-hidden">
          <video
            src={url}
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      );
    }
    // Vimeo embed (supports player.vimeo.com/video/ID and vimeo.com/ID)
    const vimeoMatch = url.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
      const vimeoId = vimeoMatch[1];
      return (
        <div className="aspect-video w-full my-6 bg-black overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo video"
          />
        </div>
      );
    }
    // YouTube thumbnail (works for age-gated videos)
    const ytMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!ytMatch) return null;
    const videoId = ytMatch[1];
    return (
      <a href={url} target="_blank" rel="noreferrer" className="block aspect-video w-full my-6 relative group bg-black overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video thumbnail"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-[#DB3E36] rounded-xl flex items-center justify-center group-hover:bg-[#DB3E36]/80 transition-colors shadow-lg">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-[#2D4A8F]/70 text-white text-xs px-2 py-1 font-mono uppercase tracking-wider">
          Watch on YouTube →
        </div>
      </a>
    );
  };

  // Side-by-side vertical video pair (for portrait videos like 1080x1350)
  const VideoPairEmbed = ({ videos, label }) => {
    if (!videos || videos.length < 2) return null;
    return (
      <div className="my-6">
        {label && <p className="text-xs uppercase tracking-widest font-bold text-[#6B5D52] mb-2">{label}</p>}
        <div className="grid grid-cols-2 gap-3">
          {videos.map((v, i) => (
            <div key={i} className="aspect-[9/11] bg-black overflow-hidden rounded">
              <video
                src={v.url}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
              {v.label && <p className="text-xs text-center text-[#6B5D52] mt-1">{v.label}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ImageGrid = ({ urls }) => {
    if (!urls || urls.length === 0) return null;
    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8 pt-8 border-t border-[#C4B99A]"
        variants={gridStagger}
        initial="hidden"
        animate="show"
      >
        {urls.map((url, i) => (
          <motion.button
            key={i}
            variants={gridItem}
            className="aspect-square bg-[#EDE3CC] overflow-hidden cursor-zoom-in border-0 p-0"
            onClick={() => setZoomImg(url)}
            aria-label={`View image ${i + 1} full size`}
          >
            <img
              src={url}
              className="w-full h-full object-cover md:grayscale md:hover:grayscale-0 transition duration-500"
              alt=""
              loading="lazy"
              onError={(e) => { e.target.src = ''; e.target.alt = 'Image unavailable'; e.target.className = 'w-full h-full flex items-center justify-center text-xs text-[#A89B86]'; }}
            />
          </motion.button>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#2D4A8F] font-mono text-sm md:text-[14px] leading-relaxed md:leading-tight relative pk-grain">
      
      {/* Pixel trail background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 72}
          fadeDuration={0}
          delay={800}
          pixelClassName="rounded-full bg-[#565D4F]/[0.10]"
        />
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#2D4A8F]/95 flex items-center justify-center p-4 cursor-zoom-out"
            role="dialog"
            aria-label="Image zoom"
            onClick={() => setZoomImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img
              src={zoomImg}
              className="max-w-full max-h-full object-contain"
              alt="Zoomed view"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            />
            <button
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-white text-xl hover:opacity-50"
              aria-label="Close zoom"
              onClick={(e) => { e.stopPropagation(); setZoomImg(null); }}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main page wrapper — no global max-width, sections handle their own containment. font-mono restores typewriter body texture. */}
      <div className="relative z-10 font-mono">

        {/* HERO ZONE — header + hero on warmer paper tone */}
        <div className="bg-[#F2EAD0] border-b border-[#C4B99A]/40">

        {/* HEADER — sketch icon + wordmark left, nav right */}
        <header className="pk-container pt-6 md:pt-8 pb-6 md:pb-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4 md:gap-5 flex-1 min-w-0">
              <img src="/images/PK%20ICON.png" alt="PK Lawton sketch portrait" className="w-14 md:w-20 h-auto flex-shrink-0 mt-1 md:mt-2 transition-transform duration-300 ease-out hover:rotate-[-3deg] hover:scale-105" />
              <div className="min-w-0">
                <a href="#top" className="font-display font-bold tracking-tight text-[#2D4A8F] t-wordmark block leading-none">PK LAWTON</a>
                <p className="t-label text-[#565D4F] mt-2 md:mt-3">Strategy × Culture × Commercial Pressure</p>
              </div>
            </div>
            <ul className="hidden md:flex gap-6 text-sm font-ui pt-2 flex-shrink-0">
              <li><a href="#work" className="text-[#2D4A8F] hover:text-[#DB3E36] transition">Work</a></li>
              <li><a href="#approach" className="text-[#2D4A8F] hover:text-[#DB3E36] transition">Approach</a></li>
              <li><a href="#capabilities" className="text-[#2D4A8F] hover:text-[#DB3E36] transition">Capabilities</a></li>
              <li><a href="#contact" className="text-[#2D4A8F] hover:text-[#DB3E36] transition">Contact</a></li>
            </ul>
          </div>
        </header>

        {/* HERO */}
        <section className="pk-container pt-4 md:pt-8 pb-10 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display t-hero font-bold text-[#2D4A8F] text-balance max-w-4xl">
              Strategy Loves Friction.
            </h1>
            <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 max-w-5xl">
              {/* Left column — the diagnosis */}
              <div className="space-y-4">
                <p className="t-body text-[#2D4A8F]">It is so easy to make something look like a strategy. But without contact with real people, real communities, real stakes, that strategy often collapses on arrival.</p>
                <p className="t-body text-[#2D4A8F]">There is only so much insight and life to extract from the screen.</p>
                <p className="t-body text-[#2D4A8F]">My practice is to restore contact.</p>
              </div>
              {/* Right column — the practice */}
              <div className="space-y-4 md:border-l md:border-[#2D4A8F]/30 md:pl-8 md:pl-12">
                <p className="t-body text-[#2D4A8F]">I trace the actors that make the problem move: behaviours, platforms, category rules, organizational habits, cultural tensions, sales realities, stakeholder anxieties, and executional limits. I look for the point of friction because friction shows where the work has something real to push against.</p>
                <p className="t-body text-[#2D4A8F]">That is what I bring as a strategist: not faster answers, but better contact. Not more polish, but more consequence.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#work" className="inline-flex items-center gap-2 bg-[#2D4A8F] text-[#FAF8F4] px-4 py-2.5 text-sm hover:bg-[#4A3F35] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out tracking-wide">[ View the work → ]</a>
              <a href="mailto:pklawton@gmail.com" className="text-sm text-[#2D4A8F] underline decoration-[#C4B99A] underline-offset-4 decoration-2 hover:decoration-[#DB3E36] transition">Get in touch ↗</a>
            </div>

            {/* Currently — availability signal on dark bg, hero footnote */}
            <div className="mt-10 md:mt-12 bg-[#2D4A8F] text-[#E0D3A8] px-5 md:px-6 py-4 md:py-5 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-[#DB3E36] font-bold mb-2">Currently</p>
              <p className="text-sm text-[#E0D3A8] leading-relaxed">Available for senior strategy leadership (CSO / VP / Head of Strategy), fractional or advisory engagements, and category-defining consulting. Toronto + Chicago. Open to remote and cross-border.</p>
            </div>
          </motion.div>
        </section>

        </div>
        {/* /HERO ZONE */}

        {/* § 01 — Sister Merci: Agency as Brand Lab — RISO PINK */}
        <section className="bg-[#FF66A8] border-y border-[#2D4A8F]/40">
          <div className="pk-container py-10 md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0D1929]/80 mb-3 font-bold">§ 01 &nbsp;—&nbsp; The operator story</p>
          <h2 className="font-display t-section font-bold text-[#2D4A8F] leading-tight max-w-3xl mb-6 md:mb-8">
            Sister Merci: Agency as Brand Lab.
          </h2>

          {/* Full-width sizzle reel */}
          <div className="border border-[#2D4A8F]/40 bg-[#2D4A8F] overflow-hidden aspect-video">
            <video
              src="/images/sister-merci/sister-merci-sizzle.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/background/timeline/Sister%20Merci.png"
            />
          </div>
          <p className="mt-2 text-xs text-[#0D1929]/80 font-ui italic">Sister Merci sizzle reel</p>

          {/* Two-column content below the video */}
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left col: story copy */}
            <div className="space-y-4 t-body text-[#0D1929]">
              <p>I co-founded Sister Merci with Katie Waterman and Amanda Wood in 2019 after a successful capital raise with BlackShire Capital. Together, we built the agency from four founders to 30+ staff across Toronto and Chicago.</p>
              <p>Our success with Sister Merci came from a sharp understanding that we needed to find new ways to build brands in regulated and vice categories. We operated the company as a "strategy-led creative agency," which meant we used category analysis and an ongoing, longitudinal study to continually deliver unique and exceptional brand design, go-to-market, and campaign strategy.</p>
              <p>I had success working in large agencies, but in my mind, building and operating Sister Merci over the last seven years was equivalent to getting my PhD in brand and comms strategy. In many ways, the PhD program I did as a sociologist was easier.</p>
            </div>

            {/* Right col: tenure bullets + footnote */}
            <div className="md:border-l md:border-[#0D1929]/30 md:pl-6 md:pl-10">
              <p className="text-xs uppercase tracking-[0.18em] text-[#0D1929]/80 font-bold mb-4">My tenure as CSO at Sister Merci</p>
              <ul className="space-y-2 text-sm text-[#0D1929]">
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span>Developed <span className="font-bold">150+</span> brands across cannabis, iGaming, AI, health tech, fintech, and CPG</span></li>
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span>Founded with 4 partners, grew to <span className="font-bold">30+</span> staff</span></li>
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span>Cross-border operation: Toronto + Chicago, with <span className="font-bold">2023</span> US market entry</span></li>
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span>Raised <span className="font-bold">$1.5M</span> VC funding from BlackShire Capital</span></li>
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span><span className="font-bold text-[#DB3E36]">7 Clios</span> and <span className="font-bold">3×</span> Agency of the Year</span></li>
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span><span className="font-bold">85%+</span> pitch win rate and <span className="font-bold">85%+</span> tier-one client retention</span></li>
                <li className="flex gap-3"><span className="text-[#F2EAD0] mt-0.5 font-bold">→</span><span>Press: <em>Adweek · Forbes · Ad Age · Strategy · Financial Post</em></span></li>
              </ul>
              {/* Footnote */}
              <p className="mt-6 pt-4 border-t border-[#0D1929]/30 text-xs text-[#0D1929]/80 italic leading-relaxed">
                <span className="not-italic font-bold text-[#0D1929]">*</span> SM continues, but in May 2026, I sold my stake in the company and am ready for new challenges.
              </p>
            </div>
          </div>
          </div>
        </section>

        {/* § 02 — What I bring into the work (with declarative beliefs) — warm white bg, cream cards */}
        <section id="approach" className="pk-container py-10 md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#565D4F] mb-3">§ 02 &nbsp;—&nbsp; A note on the working strategist</p>
          <h2 className="font-display t-section font-bold text-[#2D4A8F] max-w-3xl">
            What I bring into the work.
          </h2>
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { Icon: Layers, title: 'Evidence, taste, and commercial instinct', belief: 'Too often, strategy is intelligence without judgment.', body: "I am skilled in all three: a sociologist's research training, the taste of a working artist, and the pattern recognition needed to run an agency in heavily regulated categories. I love the work of a strategist, and the deeper I get into my agency career, the more I love it." },
              { Icon: Hammer, title: 'Bias toward making things real', belief: "Strategists who only critique are tourists. I've toured.", body: "I have lived the \"You can just do stuff, you know?\" ethos my whole life: I've run two indie labels, toured in garage bands, produced records, taught classes, raised VC capital, and launched an agency. I just want to make the world move." },
              { Icon: Users, title: 'Pressure-tested judgment', belief: "Most strategy decks don't survive procurement. I make the ones that do.", body: "I know how to do the work and sell the work, and generally, that means that I work fast and enroll the team as a more efficient unit of operations. When we destroy our internal silos, we build organizational empathy, which improves both output and employee relations. Find me some dogs to run with and we will make a go of it!" },
            ].map(({ Icon, title, belief, body }, i) => (
              <article key={i} className="bg-[#F2EAD0] border border-[#C4B99A]/40 p-5 md:p-6 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 border border-[#2D4A8F]/30 mb-4 bg-[#FAF8F4]">
                  <Icon className="w-4 h-4 text-[#2D4A8F]" aria-hidden />
                </div>
                <h3 className="font-bold text-[#2D4A8F] text-base md:text-lg mb-3 font-display">{title}</h3>
                <p className="font-bold text-[#2D4A8F] mb-3 italic text-sm md:text-base leading-snug">{belief}</p>
                <p className="t-body text-[#2D4A8F]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* § 03 — Selected work — 2x2 card grid with autoplay videos */}
        <section id="work" className="bg-[#F2EAD0] border-y border-[#C4B99A]/40">
          <div className="pk-container py-10 md:py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#565D4F] mb-3">§ 03 &nbsp;—&nbsp; Selected work</p>
            <h2 className="font-display t-section font-bold text-[#2D4A8F] max-w-3xl">
              The work.
            </h2>
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { id: 'cmc', name: "CMC: I'm High Right Now", role: 'Campaign strategy', year: '2023–2026', eyebrowColor: '#DB3E36', summary: "First nationwide consumer campaign for the Cannabis Media Council. Featured Baby Boomers as confident, stylish users, repositioning an entire audience.", proof: ['256M+ earned impressions', '1st cannabis ad in Vanity Fair', 'Adweek Top 10 of the year'] },
                { id: 'madegood', name: 'MadeGood: For All the Good Reasons', role: 'Brand architecture, US market entry', year: '2023–2024', eyebrowColor: '#5C9D34', summary: 'Year-long ethnographic research reframed a snack brand from lunchbox niche to values-led identity. Strategy informed every subsequent decision.', proof: ['26.9% sales increase in 2023', '#43 on Instacart\'s top emerging brands', 'Global operating framework'] },
                { id: 'scotiabank', name: 'Scotiabank: Hockey 24', role: 'Sponsorship strategy', year: '2019–2020', eyebrowColor: '#FF66A8', summary: "Ethnographic research revealed hockey's deepest meaning is community, not competition. Reframed sponsorship from logo placement to cultural document.", proof: ['500K+ Canadian homes for premiere', '99% lift in brand awareness', 'CMA Gold Business Impact'] },
                { id: 'tweed', name: "Tweed: Hi / Don't Drive High", role: 'Brand positioning, campaign platform', year: '2017–2019', eyebrowColor: '#DB3E36', summary: "Built Canada's most recognized cannabis brand. \"Hi.\" set the category bar; \"Don't Drive High\" introduced the first responsibility platform.", proof: ['700M+ media impressions', '38% lift in brand awareness', 'AToMiC Gold ×3'] },
              ].map((c) => {
                const project = portfolioData.find(p => p.id === c.id);
                const videoUrl = project?.videos?.[0];
                let videoElement = null;
                if (videoUrl) {
                  if (/\.(mp4|webm)$/i.test(videoUrl)) {
                    videoElement = <video src={videoUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" />;
                  } else {
                    const ytMatch = videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                    const vimeoMatch = videoUrl.match(/video\/(\d+)(?:\?h=([a-zA-Z0-9]+))?/);
                    if (ytMatch) {
                      const ytSrc = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`;
                      videoElement = <iframe src={ytSrc} className="absolute inset-0 pointer-events-none" style={{ width: 'calc(100% + 4px)', height: 'calc(100% + 4px)', left: '-2px', top: '-2px' }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" title={c.name} />;
                    } else if (vimeoMatch) {
                      const vimSrc = `https://player.vimeo.com/video/${vimeoMatch[1]}${vimeoMatch[2] ? `?h=${vimeoMatch[2]}&` : '?'}autoplay=1&muted=1&loop=1&background=1&controls=0`;
                      videoElement = <iframe src={vimSrc} className="absolute inset-0 w-full h-full pointer-events-none" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" title={c.name} />;
                    }
                  }
                }
                return (
                  <article key={c.id} className="bg-[#FAF8F4] border border-[#C4B99A]/40 overflow-hidden flex flex-col group hover:-translate-y-0.5 transition-all duration-200 ease-out">
                    <div className="aspect-video bg-[#2D4A8F] relative overflow-hidden">
                      {videoElement}
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: c.eyebrowColor }}>Featured case</p>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-[#2D4A8F] leading-tight mb-2">{c.name}</h3>
                      <p className="text-sm text-[#565D4F] italic mb-3">{c.role} &nbsp;·&nbsp; {c.year}</p>
                      <p className="t-body text-[#2D4A8F] mb-4">{c.summary}</p>
                      <ul className="space-y-1.5 text-sm text-[#2D4A8F] mb-5">
                        {c.proof.map((p, j) => <li key={j} className="flex gap-2"><span className="text-[#C4B99A]">·</span><span>{p}</span></li>)}
                      </ul>
                      <button onClick={() => project && handleProjectClick(project)} className="mt-auto self-start inline-flex items-center gap-2 bg-[#2D4A8F] text-[#F2EAD0] px-4 py-2.5 text-sm hover:bg-[#4A3F35] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out tracking-wide">[ Read the full case → ]</button>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 md:mt-8 text-sm text-[#565D4F]"><a href="#backgrounder" className="underline decoration-[#C4B99A] underline-offset-4 decoration-2 hover:decoration-[#DB3E36] hover:text-[#2D4A8F] transition">Backgrounder below ↓</a></p>
          </div>
        </section>

        {/* § 04 — Pull-quote testimonial — RISO GREEN POSTER */}
        <section className="bg-[#5C9D34] border-y border-[#2D4A8F]/30">
          <div className="pk-container py-12 md:py-20">
            <p className="text-xs uppercase tracking-[0.25em] text-[#2D4A8F]/80 mb-6 font-bold">§ 04 &nbsp;—&nbsp; In the room</p>
            <figure className="max-w-4xl">
              <blockquote className="font-display text-xl md:text-3xl leading-snug text-[#2D4A8F] tracking-tight">
                <span className="text-[#FF66A8] mr-1">"</span>Paul brings both intellectual rigour and genuine curiosity to strategy. He has a way of digging beneath the obvious to understand the cultural and behavioural forces shaping a category, which consistently leads to <span className="bg-[#FF66A8]/70 text-[#2D4A8F] px-1">insights others miss</span>. Just as important, he is an <span className="bg-[#FF66A8]/70 text-[#2D4A8F] px-1">excellent partner</span>. He challenges thinking constructively and elevates the work through real collaboration.<span className="text-[#FF66A8] ml-1">"</span>
              </blockquote>
              <figcaption className="mt-5 md:mt-6 text-sm text-[#2D4A8F] font-ui">
                <span className="text-[#FF66A8] mr-1">/</span> <span className="font-bold">Nicole Bleiwas</span> <span className="text-[#2D4A8F]/60">·</span> former client at GreenHouse Juice and Riverside Foods (MadeGood, CookiePal) <span className="text-[#2D4A8F]/60">·</span> <a href="#" onClick={(e) => { e.preventDefault(); openPanel('testimonials'); }} className="underline decoration-[#FF66A8] underline-offset-4 decoration-2 hover:decoration-[#F2EAD0] transition">read more testimonials ↗</a>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* § 05 — Where I'm most useful (bento, contained) — moved up from former § 06 */}
        <section className="pk-container py-10 md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#565D4F] mb-3">§ 05 &nbsp;—&nbsp; Use cases</p>
          <h2 className="font-display t-section font-bold text-[#2D4A8F] max-w-3xl">
            Where I'm most useful.
          </h2>
          <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
            {[
              { Icon: Compass, title: 'Strategy leadership for agencies in transition', trigger: "If your strategy function isn't pulling its weight in pitches, account growth, or client confidence:", body: 'Pitch win rates, account growth, sharper briefs, stronger creative partnerships, and strategy embedded in the agency\'s growth system.', span: 'lg:col-span-8' },
              { Icon: Shield, title: 'Brand strategy under pressure', trigger: 'If your brand has lost its edge or your category just shifted under you:', body: 'Positioning, architecture, narrative, and category strategy when the organization needs sharper language and better decisions.', span: 'lg:col-span-4' },
              { Icon: Microscope, title: 'Research that makes the work harder to ignore', trigger: "If your creative team needs sharper raw material to build from:", body: 'Fieldwork, interviews, community observation, cultural analysis, and synthesis that give creative and commercial teams something real to build from.', span: 'lg:col-span-7' },
              { Icon: Rocket, title: 'Growth and go-to-market in difficult categories', trigger: "If you're entering a regulated category or repositioning a brand the easy playbook doesn't fit:", body: 'Regulated markets, new categories, repositioning, complex buyers, and brands that need to enter the market with force.', span: 'lg:col-span-5' },
              { Icon: Megaphone, title: 'Executive narrative and thought leadership', trigger: 'If your founder, CMO, or category needs a sharper public argument:', body: 'Whitepapers, keynote logic, founder POV, category arguments, strategic essays, and internal alignment stories.', span: 'lg:col-span-12' },
            ].map(({ Icon, title, trigger, body, span }, i) => (
              <article key={i} className={`bg-[#F2EAD0] border border-[#C4B99A]/40 p-5 md:p-6 min-w-0 ${span}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 border border-[#2D4A8F]/30 flex-shrink-0 bg-[#FAF8F4]">
                    <Icon className="w-4 h-4 text-[#2D4A8F]" aria-hidden />
                  </div>
                  <h3 className="font-bold text-[#2D4A8F] text-base md:text-lg font-display">{title}</h3>
                </div>
                <p className="text-sm text-[#2D4A8F] italic mb-2 leading-snug">{trigger}</p>
                <p className="t-body text-[#2D4A8F]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* § 06 — Field Building (Rebrief Magazine) — cream paper bg with pink accents */}
        <section className="bg-[#F2EAD0] border-y border-[#2D4A8F]/20">
          <div className="pk-container py-10 md:py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF66A8] mb-3 font-bold">§ 06 &nbsp;—&nbsp; Field building</p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
              <div className="lg:col-span-6">
                <div className="border border-[#2D4A8F]/30 bg-[#FAF8F4] overflow-hidden">
                  <img src="/images/background/Rebrief/hero-composite-desktop.png" alt="Rebrief Magazine — hero composite" className="w-full h-auto block" loading="lazy" />
                </div>
                <p className="mt-3 text-xs text-[#565D4F] italic font-ui">Rebrief Magazine — editorial composite, July 2026.</p>
              </div>
              <div className="lg:col-span-6">
                <h2 className="font-display t-section font-bold text-[#2D4A8F] leading-tight">
                  Rebrief: A New Canadian Journal of Advertising.
                </h2>
                <div className="mt-5 md:mt-6 space-y-4 t-body text-[#2D4A8F] pk-prose">
                  <p>In 2025, I helped found a new non-profit, the <a href="https://rebrief.ca" target="_blank" rel="noreferrer" className="underline decoration-[#FF66A8] underline-offset-4 decoration-2 hover:text-[#FF66A8] transition">Rebrief Magazine Society</a>, a new independent Canadian journal of advertising, with Carly Miller, Spencer MacEachern, Jon Crowley, Zoe Kim, and Vince Rozas. Our first issue drops <span className="bg-[#FF66A8]/70 text-[#2D4A8F] px-1">July 2026</span>.</p>
                  <p>Rebrief gives Canadian advertising a place to think in public. We publish essays, fiction, interviews, and visual experiments from emerging and established voices across the country, asking what happens when the industry takes a second look at its own assumptions.</p>
                  <p>As founding editor, treasurer, and media sales lead, I help build the magazine as both an editorial project and an independent platform for the next wave of strategic thinking in Canada.</p>
                </div>
                <div className="mt-6 md:mt-8">
                  <a href="https://rebrief.ca" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#2D4A8F] text-[#F2EAD0] px-4 py-2.5 text-sm hover:bg-[#FF66A8] hover:text-[#2D4A8F] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out tracking-wide">[ Visit rebrief.ca ↗ ]</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* § 07 — Core capabilities — INVERTED: federal blue bg, cream cells */}
        <section id="capabilities" className="bg-[#2D4A8F]">
          <div className="pk-container py-10 md:py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF66A8] mb-3 font-bold">§ 07 &nbsp;—&nbsp; Capabilities</p>
            <h2 className="font-display t-section font-bold text-[#F2EAD0] max-w-3xl">
              Core capabilities.
            </h2>
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F2EAD0]/20 border border-[#F2EAD0]/20">
              {[
                { Icon: Compass, title: 'Strategy Leadership', body: 'Agency strategy leadership, pitch leadership, senior client counsel, stakeholder alignment, team development, growth planning.' },
                { Icon: Megaphone, title: 'Brand & Communications Strategy', body: 'Brand positioning, segmentation & targeting, brand architecture, campaign strategy, category strategy, messaging, narrative, go-to-market.' },
                { Icon: Search, title: 'Research & Insights', body: 'Qualitative research, interviews, ethnography, social listening, cultural analysis, synthesis, consumer insight.' },
                { Icon: Sparkles, title: 'Creative Strategy', body: 'Brief development, territory development, creative evaluation, voice, campaign platforms, research-to-creative translation.' },
                { Icon: Share2, title: 'Connections, Media & Content', body: 'Social strategy, channel planning, creator strategy, content systems, media logic, platform behaviour.' },
                { Icon: LineChart, title: 'Commercial & Effectiveness Strategy', body: 'Measurement logic, KPI development, scope protection, pitch conversion, case study development, growth storytelling.' },
                { Icon: Radio, title: 'Subculture Analysis', body: 'Scene building, subculture dynamics, grassroots amplification, high-affinity brand architecture, digital ethnography, participant observation.' },
                { Icon: AlertTriangle, title: 'Issues Management', body: 'Values-based stakeholder mapping, real-time issues monitoring, tactical opposition, media training, community engagement, stakeholder briefing.' },
                { Icon: Activity, title: 'Hype Analysis', body: 'Contextual sentiment scoring, AI-powered qualitative legibility, digital ethnography, unstructured data translation.' },
                { Icon: GraduationCap, title: 'Team Building', body: 'The Square-Shaped Strategist model, cross-disciplinary training, academic-to-agency translation, intellectual mentorship.' },
                { Icon: Briefcase, title: 'Commercial Strategy', body: 'Pitch development, opportunity mapping, strategic due diligence, market-entry logic, first-line revenue generation.' },
                { Icon: Palette, title: 'Brand Design', body: 'Audience analysis, design thinking, competitive mapping, naming, design territories, go-to-market.' },
              ].map(({ Icon, title, body }, i) => (
                <div key={i} className="bg-[#F2EAD0] p-5 md:p-6 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#2D4A8F]" aria-hidden />
                    <h3 className="font-bold text-[#2D4A8F] text-sm md:text-base font-display">{title}</h3>
                  </div>
                  <p className="t-body text-[#2D4A8F]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* § 07 — Backgrounder (background + case studies) — sage paper bg */}
        <section id="backgrounder" className="bg-[#5C9D34] border-y border-[#2D4A8F]/30">
          <div className="pk-container py-10 md:py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0D1929]/80 mb-3 font-bold">§ 08 &nbsp;—&nbsp; Backgrounder</p>
            <h2 className="font-display t-section font-bold text-[#2D4A8F] max-w-3xl mb-8 md:mb-10">
              Backgrounder.
            </h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 items-start text-[#0D1929]">
          {/* Background */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1929] border-l-2 border-[#0D1929] pl-2 mb-2 font-bold">Background</h3>
            <ul>
              {backgroundSections.map((item) => (
                <li
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.title}`}
                  onClick={() => openPanel(item.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(item.id); } }}
                  className={`border-b border-[#C4B99A]/40 py-2.5 md:py-1.5 px-1 cursor-pointer hover:bg-[#EDE3CC] transition-all duration-200 border-l-2 ${view === item.id && panelOpen ? 'bg-[#E0D3A8] font-bold border-l-[#DB3E36]' : 'border-l-transparent'}`}
                >
                  <VariableFontHoverByLetter
                    label={item.title}
                    fromFontVariationSettings="'wght' 400"
                    toFontVariationSettings="'wght' 700"
                    staggerDuration={0.015}
                    staggerFrom="first"
                    className="truncate pr-4 cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Case Study Categories */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#0D1929] border-l-2 border-[#0D1929] pl-2 mb-2 font-bold">{category}</h3>
              <ul>
                {portfolioData.filter((p) => p.category === category && !p.hidden).map((project) => (
                  <li
                    key={project.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View case study: ${project.title}`}
                    onClick={() => handleProjectClick(project)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProjectClick(project); } }}
                    className={`border-b border-[#C4B99A]/40 py-2.5 md:py-1.5 px-1 flex justify-between cursor-pointer hover:bg-[#EDE3CC] transition-all duration-200 border-l-2 ${activeProject?.id === project.id && view === 'project' && panelOpen ? 'bg-[#E0D3A8] font-bold border-l-[#DB3E36]' : 'border-l-transparent'}`}
                  >
                    <VariableFontHoverByLetter
                      label={project.title}
                      fromFontVariationSettings={project.forceBold ? "'wght' 700" : "'wght' 400"}
                      toFontVariationSettings="'wght' 700"
                      staggerDuration={0.015}
                      staggerFrom="first"
                      className={`truncate pr-4 cursor-pointer ${project.forceBold ? 'underline decoration-2' : ''}`}
                    />
                    <span className="whitespace-nowrap text-[#F2EAD0] text-sm">{project.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
          </div>
        </section>

        {/* § 08 — Closing CTA / Best fit — dark footnote zone */}
        <section id="contact" className="bg-[#2D4A8F] text-[#E0D3A8]">
          <div className="pk-container py-12 md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C4B99A] mb-3">§ 09 &nbsp;—&nbsp; Footnote / Best fit</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#FAF8F4] max-w-3xl mb-8 md:mb-10 leading-tight">
            Work with me.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left column — senior leadership */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4B99A] font-bold mb-3">Senior leadership</p>
              <p className="text-sm md:text-base text-[#E0D3A8] leading-relaxed mb-5">I am looking first for senior strategy leadership opportunities where I can help an agency or marketing organization make strategy more central to growth.</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#C4B99A]/80 mb-3">Best-fit roles (depending on org structure)</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 text-sm text-[#E0D3A8]">
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Chief Strategy Officer</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Head of Strategy</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>VP Strategy</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>SVP / EVP Strategy</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Group Strategy Director</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Executive Strategy Director</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Brand Strategy Lead</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Integrated Strategy Lead</span></li>
                <li className="flex gap-2"><span className="text-[#DB3E36]">·</span><span>Research-led Strategy Lead</span></li>
              </ul>
            </div>

            {/* Right column — fractional/advisory */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4B99A] font-bold mb-3">Fractional, advisory, project</p>
              <p className="text-sm md:text-base text-[#E0D3A8] leading-relaxed mb-4">I am also available for fractional, advisory, and project-based work when an agency, founder, or marketing team needs senior strategy support in a high-pressure moment.</p>
              <p className="text-sm md:text-base text-[#E0D3A8] leading-relaxed">That can include pitch strategy, brand positioning, repositioning, category reframing, audience research, consumer insights, creative territory development, stakeholder alignment, communications planning, connections strategy, social and content strategy, measurement strategy, agency strategy transformation, or strategy team development.</p>
            </div>
          </div>

          <div className="mt-10 md:mt-12 pt-6 border-t border-[#C4B99A]/30 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="mailto:pklawton@gmail.com" className="inline-flex items-center gap-2 bg-[#FAF8F4] text-[#2D4A8F] px-4 py-2.5 text-sm hover:bg-[#E0D3A8] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out tracking-wide font-bold">[ Get in touch → ]</a>
            <a href="https://linkedin.com/in/paulklawton" target="_blank" rel="noreferrer" className="text-sm text-[#E0D3A8] underline decoration-[#C4B99A]/60 underline-offset-4 decoration-2 hover:decoration-[#DB3E36] transition">LinkedIn ↗</a>
            <a href="https://culturalcartography.substack.com" target="_blank" rel="noreferrer" className="text-sm text-[#E0D3A8] underline decoration-[#C4B99A]/60 underline-offset-4 decoration-2 hover:decoration-[#DB3E36] transition">Substack ↗</a>
          </div>
          </div>
        </section>
      </div>

      {/* Trusted By Logo Slider */}
      <div className="relative z-10 py-12 px-6 md:px-10 border-t border-[#C4B99A]/40">
        <div
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <InfiniteSlider gap={48} duration={65} durationOnHover={130}>
            {BRAND_LOGOS.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center w-[250px] h-[60px] shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain opacity-30 hover:opacity-60 transition-opacity duration-300"
                  style={{ filter: 'grayscale(100%)' }}
                  loading="lazy"
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>

      {/* Footer Colophon */}
      <footer className="relative z-10 bg-[#2D4A8F] text-[#E0D3A8] py-10 px-6 md:px-10 border-t-2 border-[#D4903A]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
          <p className="font-display font-bold text-lg tracking-wide">PK Lawton</p>
          <div className="flex gap-6 text-sm font-ui">
            <a href="mailto:pklawton@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://linkedin.com/in/paulklawton" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://culturalcartography.substack.com" target="_blank" rel="noreferrer" aria-label="Substack (opens in new tab)" className="hover:text-white transition-colors">Substack</a>
          </div>
        </div>
      </footer>

      {/* Backdrop */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[#2D4A8F]/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Content Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed top-0 right-0 z-40 h-full w-full md:w-3/5 bg-[#F2EAD0] border-l border-[#C4B99A] shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <motion.div
              className="p-6 md:p-10 relative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <button onClick={closePanel} aria-label="Close panel and return to navigation" className="mb-8 text-sm font-mono uppercase tracking-widest text-[#6B5D52] hover:text-[#2D4A8F] transition-colors flex items-center gap-2 group">
                <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Back
              </button>
        
        {/* BACKGROUND SECTIONS */}
        {view === 'research-stack' && (
          <>
          <Suspense fallback={<div className="text-sm text-[#2D4A8F] py-8 animate-pulse">Loading Research Stack…</div>}>
            <ResearchStack />
          </Suspense>
          {(() => {
            const allSections = [{ id: 'about', title: 'An Introduction' }, ...backgroundSections];
            const idx = allSections.findIndex(s => s.id === 'research-stack');
            const prev = idx > 0 ? allSections[idx - 1] : null;
            const next = idx < allSections.length - 1 ? allSections[idx + 1] : null;
            if (!prev && !next) return null;
            return (
              <nav className="flex justify-between items-center border-t border-[#C4B99A] pt-6 mt-4 mb-16 font-ui max-w-2xl">
                {prev ? (
                  <button onClick={() => { setView(prev.id); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-left group cursor-pointer">
                    <span className="text-xs uppercase tracking-widest text-[#D4903A]"><span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Previous</span>
                    <span className="block text-sm text-[#565D4F] group-hover:text-[#2D4A8F] transition-colors">{prev.title}</span>
                  </button>
                ) : <span />}
                <button onClick={closePanel} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" aria-label="Return home">
                  <img src="/images/PK%20ICON.png" alt="Home" className="w-8 h-auto" />
                </button>
                {next ? (
                  <button onClick={() => { setView(next.id); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-right group cursor-pointer">
                    <span className="text-xs uppercase tracking-widest text-[#D4903A]">Next <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
                    <span className="block text-sm text-[#565D4F] group-hover:text-[#2D4A8F] transition-colors">{next.title}</span>
                  </button>
                ) : <span />}
              </nav>
            );
          })()}
          </>
        )}

        {view !== 'research-stack' && view !== 'project' && sectionContent[view] && (
          <>
            <ContentSection content={sectionContent[view]} />
            {/* Next section nav (mobile-friendly) */}
            {(() => {
              const allSections = [{ id: 'about', title: 'An Introduction' }, ...backgroundSections];
              const idx = allSections.findIndex(s => s.id === view);
              const prev = idx > 0 ? allSections[idx - 1] : null;
              const next = idx < allSections.length - 1 ? allSections[idx + 1] : null;
              if (!prev && !next) return null;
              return (
                <nav className="flex justify-between items-center border-t border-[#C4B99A] pt-6 mt-4 mb-16 font-ui max-w-2xl">
                  {prev ? (
                    <button onClick={() => { setView(prev.id); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-left group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]"><span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Previous</span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#2D4A8F] transition-colors">{prev.title}</span>
                    </button>
                  ) : <span />}
                  <button onClick={closePanel} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" aria-label="Return home">
                    <img src="/images/PK%20ICON.png" alt="Home" className="w-8 h-auto" />
                  </button>
                  {next ? (
                    <button onClick={() => { setView(next.id); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-right group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]">Next <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#2D4A8F] transition-colors">{next.title}</span>
                    </button>
                  ) : <span />}
                </nav>
              );
            })()}
          </>
        )}

        {/* PROJECT CASE STUDIES */}
        {view === 'project' && activeProject && (() => {
          const { hero, distributed, remaining } = splitProjectImages(activeProject.images, activeProject.sections?.length || 0);
          return (
          <div className="max-w-3xl pb-20">
            {/* Hero logo (small brand mark) */}
            {activeProject.heroLogo && (
              <div className="mb-6">
                <img
                  src={activeProject.heroLogo}
                  alt=""
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <p className="text-xs uppercase tracking-[0.25em] text-[#565D4F] font-bold mb-2 font-ui">{activeProject.category}</p>
            <h1 className="text-4xl md:text-5xl mb-4 font-bold font-display leading-tight">{activeProject.title}</h1>
            <p className="text-[#6B5D52] mb-10 italic text-base">{activeProject.summary}</p>

            {/* Hero image */}
            {hero && (
              <div className="mb-10">
                <img
                  src={hero}
                  alt=""
                  className="w-full rounded-md md:grayscale md:hover:grayscale-0 transition-all duration-500 cursor-pointer"
                  loading="lazy"
                  onClick={() => setZoomImg(hero)}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            {/* Videos */}
            {activeProject.videos && activeProject.videos.length > 0 && (
              <div className="mb-10">
                {activeProject.videos.map((v, i) => <VideoEmbed key={i} url={v} />)}
              </div>
            )}

            {/* Video pairs */}
            {activeProject.videoPairs && activeProject.videoPairs.length > 0 && (
              <div className="mb-10">
                {activeProject.videoPairs.map((pair, i) => <VideoPairEmbed key={i} videos={pair.videos} label={pair.label} />)}
              </div>
            )}

            {/* Sections interleaved with images */}
            <div className="space-y-8 mb-12">
              {activeProject?.sections?.map((s, i) => (
                <React.Fragment key={i}>
                  {activeProject.sectionVideos && activeProject.sectionVideos[s.heading] && (
                    <VideoEmbed url={activeProject.sectionVideos[s.heading]} />
                  )}
                  <div>
                    <h3 className="uppercase tracking-widest text-sm md:text-xs font-bold border-l-2 border-[#2D4A8F] pl-2 mb-3">{s.heading}</h3>
                    <p className="whitespace-pre-wrap leading-relaxed">{s.text}</p>
                  </div>
                  {distributed[i] && (
                    <div className="my-4">
                      <img
                        src={distributed[i]}
                        alt=""
                        className="w-full rounded-md md:grayscale md:hover:grayscale-0 transition-all duration-500 cursor-pointer"
                        loading="lazy"
                        onClick={() => setZoomImg(distributed[i])}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mid-case videos */}
            {activeProject.midVideos && activeProject.midVideos.length > 0 && (
              <div className="mb-10">
                {activeProject.midVideos.map((v, i) => <VideoEmbed key={i} url={v} />)}
              </div>
            )}

            {/* Mid-case video pairs */}
            {activeProject.midVideoPairs && activeProject.midVideoPairs.length > 0 && (
              <div className="mb-10">
                {activeProject.midVideoPairs.map((pair, i) => <VideoPairEmbed key={i} videos={pair.videos} label={pair.label} />)}
              </div>
            )}

            {/* Remaining images */}
            {remaining.length > 0 && <ImageGrid urls={remaining} />}

            {/* Video above proof */}
            {activeProject.proofVideo && (
              <div className="mb-10">
                <VideoEmbed url={activeProject.proofVideo} />
              </div>
            )}

            {activeProject?.proof && activeProject.proof.length > 0 && (
              <div className="mb-12">
                <h3 className="uppercase tracking-widest text-sm md:text-xs font-bold border-l-2 border-[#2D4A8F] pl-2 mb-3">Proof & Results</h3>
                <ul className="list-disc pl-5 space-y-2">{activeProject.proof.map((p, i) => <li key={i}><Linkify text={p} /></li>)}</ul>
              </div>
            )}

            {activeProject?.team && activeProject.team.length > 0 && (
              <div className="mb-12">
                <h3 className="uppercase tracking-widest text-sm md:text-xs font-bold border-l-2 border-[#2D4A8F] pl-2 mb-3">Team & Credits</h3>
                <ul className="list-disc pl-5 space-y-2">{activeProject.team.map((t, i) => <li key={i}><Linkify text={t} /></li>)}</ul>
              </div>
            )}

            {/* Prev / Next navigation */}
            {(() => {
              const siblings = portfolioData.filter(p => p.category === activeProject.category);
              const idx = siblings.findIndex(p => p.id === activeProject.id);
              const prev = idx > 0 ? siblings[idx - 1] : null;
              const next = idx < siblings.length - 1 ? siblings[idx + 1] : null;
              if (!prev && !next) return null;
              return (
                <nav className="flex justify-between items-center border-t border-[#C4B99A] pt-6 mt-8 font-ui">
                  {prev ? (
                    <button onClick={() => { setActiveProject(prev); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-left group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]"><span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Previous</span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#2D4A8F] transition-colors">{prev.title}</span>
                    </button>
                  ) : <span />}
                  <button onClick={closePanel} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" aria-label="Return home">
                    <img src="/images/PK%20ICON.png" alt="Home" className="w-8 h-auto" />
                  </button>
                  {next ? (
                    <button onClick={() => { setActiveProject(next); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-right group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]">Next <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#2D4A8F] transition-colors">{next.title}</span>
                    </button>
                  ) : <span />}
                </nav>
              );
            })()}
          </div>
          );
        })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}