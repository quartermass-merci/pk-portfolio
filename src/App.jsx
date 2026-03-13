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

  const categories = useMemo(() => ['Campaign Strategy', 'Brand Architecture', 'Corporate Comms'], []);



  const openPanel = (newView, project = null) => {
    setView(newView);
    setActiveProject(project);
    setPanelOpen(true);
  };

  const closePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const handleProjectClick = (p) => { openPanel('project', p); };

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
    { id: 'agency', title: 'Agency as Lab: Sister Merci' },
    { id: 'research-stack', title: 'Research Stack' },
    { id: 'square', title: 'Developing Square Shaped Strategists' },
    { id: 'cartography', title: 'Cultural Cartography' },
    { id: 'teaching', title: 'Teaching & Research' },
    { id: 'published', title: 'Published & Spoken' },
    { id: 'music', title: 'Music & Culture' },
    { id: 'testimonials', title: 'Eye Witness Accounts' }
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
        <div className="absolute bottom-3 right-3 bg-[#362318]/70 text-white text-xs px-2 py-1 font-mono uppercase tracking-wider">
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
            className="aspect-square bg-[#F0EDE7] overflow-hidden cursor-zoom-in border-0 p-0"
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
    <div className="min-h-screen bg-[#FAF8F4] text-[#362318] font-mono text-sm md:text-[14px] leading-relaxed md:leading-tight relative pk-grain">
      
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
            className="fixed inset-0 z-50 bg-[#362318]/95 flex items-center justify-center p-4 cursor-zoom-out"
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

      {/* Navigation */}
      <div className="w-full max-w-5xl mx-auto p-6 md:p-10 flex flex-col min-h-screen relative z-10">
        <motion.div className="mb-16 text-center" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex justify-center">
            <img src="/images/pk-logo.png" alt="PK Lawton — Strategy × Culture" className="w-full max-w-[300px] md:max-w-[560px] h-auto mb-4" />
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <img src="/images/PK%20ICON.png" alt="" className="w-16 md:w-20 h-auto opacity-70" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm md:text-base text-[#6B5D52] mb-6 max-w-xl mx-auto">Co-Founder & Chief Strategy Officer, Sister Merci.<br />Creative Strategist, Researcher, Educator. Rock & Roll Sociologist.</motion.p>
          <motion.div variants={fadeUp} className="flex justify-center gap-6 text-sm font-ui">
            <AnimatedLink href="mailto:pklawton@gmail.com" variant="goesOut">Email</AnimatedLink>
            <AnimatedLink href="https://linkedin.com/in/paulklawton" target="_blank" rel="noreferrer" variant="center">LinkedIn</AnimatedLink>
            <AnimatedLink href="https://culturalcartography.substack.com" target="_blank" rel="noreferrer" variant="comesIn">Substack</AnimatedLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 pt-4 border-t border-[#C4B99A] font-ui max-w-xl mx-auto">
            <p className="text-sm tracking-wide text-[#6B5D52]">
              <span className="font-bold text-[#362318]"><CountUp target={150} />+</span> brands · <span className="font-bold text-[#362318]"><CountUp target={20} />+</span> industry awards · <span className="font-bold text-[#DB3E36]"><CountUp target={7} /> Clios</span> · <span className="font-bold text-[#362318]"><CountUp target={3} />×</span> Agency of the Year · <span className="font-bold text-[#362318]"><CountUp target={85} />%</span> pitch win rate
            </p>
          </motion.div>

        </motion.div>

        <motion.button variants={fadeUp} initial="hidden" animate="show" onClick={() => openPanel('about')} className={`flex items-center gap-3 mb-10 transition-opacity group ${view === 'about' && panelOpen ? 'font-bold' : ''}`}>
          <span className="text-2xl text-[#DB3E36] animate-pulse">●</span>
          <VariableFontHoverByLetter
            label="AN INTRODUCTION"
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 800"
            staggerDuration={0.02}
            staggerFrom="first"
            className="cursor-pointer text-base tracking-wider"
          />
        </motion.button>

        <nav className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 items-start">
          {/* Background */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#565D4F] border-l-2 border-[#DB3E36] pl-2 mb-2 font-bold">Background</h3>
            <ul>
              {backgroundSections.map((item) => (
                <li
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.title}`}
                  onClick={() => openPanel(item.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(item.id); } }}
                  className={`border-b border-[#C4B99A]/40 py-2.5 md:py-1.5 px-1 cursor-pointer hover:bg-[#F0EDE7] transition-all duration-200 border-l-2 ${view === item.id && panelOpen ? 'bg-[#F0EDE7] font-bold border-l-[#DB3E36]' : 'border-l-transparent'}`}
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
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#565D4F] border-l-2 border-[#DB3E36] pl-2 mb-2 font-bold">{category}</h3>
              <ul>
                {portfolioData.filter((p) => p.category === category).map((project) => (
                  <li
                    key={project.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View case study: ${project.title}`}
                    onClick={() => handleProjectClick(project)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProjectClick(project); } }}
                    className={`border-b border-[#C4B99A]/40 py-2.5 md:py-1.5 px-1 flex justify-between cursor-pointer hover:bg-[#F0EDE7] transition-all duration-200 border-l-2 ${activeProject?.id === project.id && view === 'project' && panelOpen ? 'bg-[#F0EDE7] font-bold border-l-[#DB3E36]' : 'border-l-transparent'}`}
                  >
                    <VariableFontHoverByLetter
                      label={project.title}
                      fromFontVariationSettings={project.forceBold ? "'wght' 700" : "'wght' 400"}
                      toFontVariationSettings="'wght' 700"
                      staggerDuration={0.015}
                      staggerFrom="first"
                      className={`truncate pr-4 cursor-pointer ${project.forceBold ? 'underline decoration-2' : ''}`}
                    />
                    <span className="whitespace-nowrap text-[#D4903A] text-sm">{project.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
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
      <footer className="relative z-10 bg-[#362318] text-[#E0D3A8] py-10 px-6 md:px-10 border-t-2 border-[#D4903A]">
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
            className="fixed inset-0 z-30 bg-[#362318]/20 backdrop-blur-sm"
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
            className="fixed top-0 right-0 z-40 h-full w-full md:w-3/5 bg-[#FAF8F4] border-l border-[#C4B99A] shadow-2xl overflow-y-auto"
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
              <button onClick={closePanel} aria-label="Close panel and return to navigation" className="mb-8 text-sm font-mono uppercase tracking-widest text-[#6B5D52] hover:text-[#362318] transition-colors flex items-center gap-2 group">
                <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Back
              </button>
        
        {/* BACKGROUND SECTIONS */}
        {view === 'research-stack' && (
          <Suspense fallback={<div className="text-sm text-[#362318] py-8 animate-pulse">Loading Research Stack…</div>}>
            <ResearchStack />
          </Suspense>
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
                <nav className="flex justify-between items-start border-t border-[#C4B99A] pt-6 mt-4 mb-16 font-ui max-w-2xl">
                  {prev ? (
                    <button onClick={() => { setView(prev.id); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-left group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]"><span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Previous</span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#362318] transition-colors">{prev.title}</span>
                    </button>
                  ) : <span />}
                  {next ? (
                    <button onClick={() => { setView(next.id); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-right group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]">Next <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#362318] transition-colors">{next.title}</span>
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
            <p className="text-xs uppercase tracking-[0.25em] text-[#DB3E36] font-bold mb-2 font-ui">{activeProject.category}</p>
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
                    <h3 className="uppercase tracking-widest text-sm md:text-xs font-bold border-l-2 border-[#DB3E36] pl-2 mb-3">{s.heading}</h3>
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
                <h3 className="uppercase tracking-widest text-sm md:text-xs font-bold border-l-2 border-[#DB3E36] pl-2 mb-3">Proof & Results</h3>
                <ul className="list-disc pl-5 space-y-2">{activeProject.proof.map((p, i) => <li key={i}><Linkify text={p} /></li>)}</ul>
              </div>
            )}

            {activeProject?.team && activeProject.team.length > 0 && (
              <div className="mb-12">
                <h3 className="uppercase tracking-widest text-sm md:text-xs font-bold border-l-2 border-[#DB3E36] pl-2 mb-3">Team & Credits</h3>
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
                <nav className="flex justify-between items-start border-t border-[#C4B99A] pt-6 mt-8 font-ui">
                  {prev ? (
                    <button onClick={() => { setActiveProject(prev); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-left group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]"><span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span> Previous</span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#362318] transition-colors">{prev.title}</span>
                    </button>
                  ) : <span />}
                  {next ? (
                    <button onClick={() => { setActiveProject(next); document.querySelector('.overflow-y-auto')?.scrollTo(0, 0); }} className="text-right group cursor-pointer">
                      <span className="text-xs uppercase tracking-widest text-[#D4903A]">Next <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
                      <span className="block text-sm text-[#565D4F] group-hover:text-[#362318] transition-colors">{next.title}</span>
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