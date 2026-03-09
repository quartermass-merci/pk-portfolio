import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import portfolioData from './data/projects.json';
const ResearchStack = React.lazy(() => import('./ResearchStack'));
import PixelTrail from './components/PixelTrail';
import { useScreenSize } from './components/hooks/useScreenSize';
import AnimatedLink from './components/AnimatedLink';
import { VariableFontHoverByLetter } from './components/VariableFontHover';
import { InfiniteSlider } from './components/InfiniteSlider';

const BRAND_LOGOS = [
  { src: '/images/scrolling-logos/air-canada.png', alt: 'Air Canada' },
  { src: '/images/scrolling-logos/rbc.png', alt: 'RBC' },
  { src: '/images/scrolling-logos/nintendo.png', alt: 'Nintendo' },
  { src: '/images/scrolling-logos/cbc.png', alt: 'CBC' },
  { src: '/images/scrolling-logos/mcdonalds.png', alt: "McDonald's" },
  { src: '/images/scrolling-logos/scotiabank.png', alt: 'Scotiabank' },
  { src: '/images/scrolling-logos/walmart.png', alt: 'Walmart' },
  { src: '/images/scrolling-logos/shoppers.png', alt: 'Shoppers Drug Mart' },
  { src: '/images/scrolling-logos/oreo.png', alt: 'Oreo' },
  { src: '/images/scrolling-logos/buick.png', alt: 'Buick' },
  { src: '/images/scrolling-logos/chevrolet.png', alt: 'Chevrolet' },
  { src: '/images/scrolling-logos/nissan.png', alt: 'Nissan' },
  { src: '/images/scrolling-logos/infiniti.png', alt: 'Infiniti' },
  { src: '/images/scrolling-logos/manulife.png', alt: 'Manulife' },
  { src: '/images/scrolling-logos/coleman.png', alt: 'Coleman' },
  { src: '/images/scrolling-logos/madegood.png', alt: 'MadeGood' },
  { src: '/images/scrolling-logos/canopy-growth.png', alt: 'Canopy Growth' },
  { src: '/images/scrolling-logos/houseplant.png', alt: 'Houseplant' },
  { src: '/images/scrolling-logos/homebase.png', alt: 'Homebase' },
  { src: '/images/scrolling-logos/novartis.png', alt: 'Novartis' },
  { src: '/images/scrolling-logos/collective-arts.png', alt: 'Collective Arts' },
  { src: '/images/scrolling-logos/solesavy.png', alt: 'SoleSavy' },
  { src: '/images/scrolling-logos/deep-space.png', alt: 'Deep Space' },
  { src: '/images/scrolling-logos/7acres.png', alt: '7Acres' },
  { src: '/images/scrolling-logos/nia-health.png', alt: 'Nia Health' },
  { src: '/images/scrolling-logos/globe-and-mail.png', alt: 'Globe and Mail' },
  { src: '/images/scrolling-logos/spectrum.svg', alt: 'Spectrum' },
  { src: '/images/scrolling-logos/tweed.svg', alt: 'Tweed' },
  { src: '/images/scrolling-logos/ronald-mcdonald-house.svg', alt: 'Ronald McDonald House' },
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
    let current = 0;
    const step = Math.max(1, Math.ceil(n / 30));
    const id = setInterval(() => {
      current += step;
      if (current >= n) { setVal(n); clearInterval(id); }
      else setVal(current);
    }, 35);
    return () => clearInterval(id);
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
    { id: 'counsel', title: 'How I Work' },
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
    // Vimeo embed
    const vimeoMatch = url.match(/player\.vimeo\.com\/video\/(\d+)/);
    if (vimeoMatch) {
      return (
        <div className="aspect-video w-full my-6 bg-black overflow-hidden">
          <iframe
            src={url}
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
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
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
        <motion.div className="mb-16" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <img src="/images/pk-logo.png" alt="PK Lawton — Strategy × Culture" className="w-full max-w-[300px] md:max-w-[560px] h-auto mb-8" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm md:text-base text-[#6B5D52] mb-6 max-w-xl">Co-Founder & Chief Strategy Officer, Sister Merci. Brand Strategist, Researcher, Educator. Rock & Roll Sociologist based in Hamilton, ON.</motion.p>
          <motion.div variants={fadeUp} className="flex gap-6 text-sm font-ui">
            <AnimatedLink href="mailto:pklawton@gmail.com" variant="goesOut">Email</AnimatedLink>
            <AnimatedLink href="https://linkedin.com/in/paulklawton" target="_blank" rel="noreferrer" variant="center">LinkedIn</AnimatedLink>
            <AnimatedLink href="https://culturalcartography.substack.com" target="_blank" rel="noreferrer" variant="comesIn">Substack</AnimatedLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 pt-4 border-t border-[#C4B99A] font-ui">
            <p className="text-sm tracking-wide text-[#6B5D52]">
              <span className="font-bold text-[#362318]"><CountUp target={150} />+</span> brands · <span className="font-bold text-[#362318]"><CountUp target={20} />+</span> industry awards · <span className="font-bold text-[#DB3E36]"><CountUp target={7} /> Clios</span> · <span className="font-bold text-[#362318]"><CountUp target={3} />×</span> Agency of the Year · <span className="font-bold text-[#362318]"><CountUp target={85} />%</span> pitch win rate
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 -mx-6 md:-mx-10"
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

      {/* Footer Colophon */}
      <footer className="relative z-10 bg-[#362318] text-[#E0D3A8] py-10 px-6 md:px-10 border-t-2 border-[#D4903A]">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="font-display font-bold text-lg tracking-wide">PK Lawton</p>
            <div className="flex gap-6 text-sm font-ui">
              <a href="mailto:pklawton@gmail.com" className="hover:text-white transition-colors">Email</a>
              <a href="https://linkedin.com/in/paulklawton" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://culturalcartography.substack.com" target="_blank" rel="noreferrer" aria-label="Substack (opens in new tab)" className="hover:text-white transition-colors">Substack</a>
            </div>
          </div>
          <p className="text-sm text-[#C4B99A]">Strategy is a discipline of attention, the practice of staying awake in a world that will not stay still.</p>
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
        {view === 'about' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-8 font-bold uppercase tracking-widest font-display">An Introduction</h2>
            <div className="space-y-6">
              <p>I co-founded Sister Merci in 2019 with Katie Waterman and Amanda Wood to build a strategy-led creative agency for the categories where marketing is genuinely difficult: cannabis, iGaming, health tech, and financial services. Seven years later, we work across Toronto and Chicago with seven Clios, three Agency of the Year awards, and an approach to regulated markets that has consistently turned compliance into creative advantage.</p>
              <p>My work starts with research, usually qualitative, and focuses on giving account and creative teams a clearer read on the problem before anyone jumps to concepting. That means the brief is sharper, the audience insight is grounded in something real, and the creative team has what they need to sell ambitious work. I care as much about helping breakthrough ideas survive a client presentation as I do about the strategy that sets them up.</p>
              <p>My early career as an academic sociologist informs most of my thinking. I was an early voice in applying social theory to online communities and digital culture, and that lens still shapes how I read consumer behaviour, build research programs, and develop the people around me. I teach brand strategy and consumer research at McMaster University and am co-founding editor of Rebrief: A Canadian Journal of Advertising, launching in 2026.</p>
              <p>Before Sister Merci, I led strategy and integrated media teams at Cossette, Weber Shandwick, and Cohn & Wolfe, working across Canopy Growth, Air Canada, RBC, CN Rail, Walmart, McDonald's, and Mondelez. That blue-chip background matters, but the work I sought out at Sister Merci was deliberately different: building brands from nothing. Understanding how to develop a strategy for something that does not yet exist and then applying the same thinking to take an established brand like MadeGood and give it a framework to grow beyond its original positioning. That range, from net-new builds to brand architecture for scaling companies, is where I do my best work.</p>
              <p>I came into strategy from the side door. Years of academic research and teaching from September to May, then touring North America in a van as a musician from May to August, writing my MA thesis and my dissertation on the road. I ran two indie record labels, Mammoth Cave Recording Co. (2008–2015) and Pleasence Records (2016–2023), with 100+ releases between them, building the infrastructure underground scenes needed to function. The instinct to understand subculture, develop talent, and build community is the same drive I bring to client work.</p>
              <p>I am also building tools to make that work sharper. Q-Litics is a methodology I developed with an AI research partner that uses semantic taxonomy and contextual sentiment scoring to turn unstructured conversations — Reddit threads, dispensary reviews, community forums — into quantifiable strategic data. It is one example of how I use AI to deepen research capability, not replace judgment.</p>
            </div>
            <ImageGrid urls={[
              'https://mytoastlife.com/wp-content/uploads/2020/08/Paul-Lawton.jpg',
              '/images/personal/623189004_18170246671387407_872038208662811001_n.jpg',
              '/images/personal/IMG_0372.JPG',
              'https://i.discogs.com/o4ywk6xy6S5JPxqmU-DeRwh2O_5Ej4Sm9gu_qUSMdYs/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE2NTg5/MDItMTQwNjQ4MjM5/OS0xNzEyLmpwZWc.jpeg',
              'https://f4.bcbits.com/img/a1848651623_2.jpg',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyoCGYedvklS8gptv5R1l0YPngZUTPFlCoNc6czxac4w&s',
              'https://media.licdn.com/dms/image/v2/D5603AQHNNyceJwIZ1A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729259711794?e=2147483647&v=beta&t=NVaxLNW8bYxoGVXGoDl_gl9vdo_Uk-vsFV2-FBpok2U',
              'https://media.licdn.com/dms/image/v2/D5622AQHD2R8hnP6udw/feedshare-shrink_800/feedshare-shrink_800/0/1697555138518?e=2147483647&v=beta&t=1jqELpma7CYUnyQPe834vq-15t9wbxD3I-QaIW4vPtE',
              'https://nowtoronto.com/wp-content/uploads/2020/05/Print-0246.jpg',
              'https://www.popmatters.com/wp-content/uploads/2021/01/img-53318.jpg',
              'https://smartcdn.gprod.postmedia.digital/nationalpost/wp-content/uploads/2015/03/jamesmacdonald_paullawton9_26970907.jpg?quality=90&strip=all&w=288&sig=IEt9Qp5vgbEaEByd3vU2dw',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwqBK8bmFy8fAQjL8hkfreSXclE0ht43938g&s',
              'https://i.discogs.com/PsOe9TRHDGHQwsU-ynYTDyBrNeDHYv24hFXotqnXvAg/rs:fit/g:sm/q:90/h:400/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTIzNzY4/ODAtMTU0ODAzODE0/Mi05NzI5LmpwZWc.jpeg',
              'https://antidotemag.com/wp-content/uploads/2017/03/centurypalmconverted-390x293.jpg',
              'https://f4.bcbits.com/img/0012089568_25.jpg'
            ]} />
          </div>
        )}

        {view === 'timeline' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-8 font-bold uppercase tracking-widest font-display">Career Timeline</h2>
            <div className="space-y-12">
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>Sister Merci</span><span>2019–Present</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Co-Founder & Chief Strategy Officer</p>
                <p>Built Sister Merci from zero clients to a cross-border operation serving brands across cannabis, iGaming, AI, health tech, fintech, and CPG. Led strategy across 150+ brands. Responsible for new business, research design, team development, and embedding strategy into agency operations. Led the agency's $1.5M seed round from BlackShire Capital. Clio Cannabis Agency of the Year (2023). Three-time Agency of the Year across three organizations.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>McMaster Continuing Education</span><span>2020–Present</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Adjunct Professor & Program Designer</p>
                <p>Teaching brand strategy, consumer research, introduction to marketing, personal branding, and effective presentations. Rebuilding the Brand & Image, Consumer Research, and Market Research courses, and partnering with the Canadian Marketing Association to create an accelerated pathway to the Chartered Marketer designation.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>University of Lethbridge, Department of Sociology</span><span>2007–2012</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Adjunct Assistant Professor</p>
                <p>Designed and taught senior undergraduate courses in Sociology of Mass Communication, Digital Culture and Society, and Medical Sociology.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>National Cannabis Industry Association</span><span>2023–2025</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Chair, Marketing & Advertising Committee (2025)</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>Cannabis Standards Alliance of Canada</span><span>2024–2025</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Strategic Advisor</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>Cossette</span><span>2018–2019</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Vice President, Strategy</p>
                <p>Led brand strategy and market insights for the Canopy Growth portfolio during Canada's cannabis legalization. Developed the positioning for Tweed that helped establish it as the country's most recognized cannabis brand. Strategy work contributed to CMO David Bigioni being named Canada's Marketer of the Year (2019).</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>Weber Shandwick</span><span>2016–2018</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">VP, Strategic Planning & Head of Paid Media</p>
                <p>Led strategic planning for Air Canada, RBC, Mondelez, and Chevrolet. Five direct reports, 20-person integrated media team. Brought audience analysis and digital ethnography into the corporate practice. Averaged ten competitive pitches per year at a 65% win rate.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-[#C4B99A] mb-2 pb-1 font-bold"><span>Cohn & Wolfe</span><span>2013–2016</span></div>
                <p className="uppercase text-sm md:text-xs tracking-tighter text-[#6B5D52] mb-2">Senior Counsellor & Digital Lead</p>
                <p>Built the agency's first analytics and measurement framework. Integrated media strategy for Nissan, Nintendo, CN Rail, and Dell. Connected earned, paid, and owned media at a time when most PR agencies treated them as separate functions.</p>
              </div>
            </div>
            <ImageGrid urls={['https://webershandwick.asia/wp-content/uploads/2018/05/2.-Sophie-Shin-Paul-Lawton-Fatma-Othman-640x640.jpg']} />
          </div>
        )}

        {view === 'education' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-8 font-bold uppercase tracking-widest font-display">Education</h2>
            <div className="space-y-8">
              <div>
                <p className="font-bold">PhD (ABD), Sociology — University of Calgary, 2006–2010</p>
                <p>Dissertation on internet-mediated doctor-patient relationships and rare-illness online communities. SSHRC PhD Fellowship recipient.</p>
              </div>
              <div>
                <p className="font-bold">MA, Sociology — University of Lethbridge, 2003–2005</p>
                <p>Applied Bourdieu's theory of capital to online community dynamics. Cited in the Yale Journal of Law & Technology.</p>
              </div>
              <div>
                <p className="font-bold">BA, Sociology — University of Lethbridge, 1999–2003</p>
                <p>Graduated with Great Distinction.</p>
              </div>
            </div>
          </div>
        )}

        {view === 'agency' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">AGENCY AS LAB: SISTER MERCI</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">EXPERIMENT UNTIL EXTRAORDINARY</h3>
            
            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">The Thesis</h4>
              <p>Sister Merci started from a conviction shared by all three founders: the toughest marketing environments produce the sharpest strategic thinking.</p>
              <p>Cannabis forced that discipline early. The Cannabis Act imposes restrictions comparable to tobacco: no lifestyle ads, no celebrity endorsements, limited media channels. We treated those constraints as design inputs. The disciplines we built — compliance-first creative development, ethnographic research as the basis for every brief, budtender ecosystems as distribution channels — transferred to every high-stakes category we entered.</p>
              <p>The record over seven years: strategy work across 150+ cannabis brands. Clients include Manulife, Doodle, Organigram, MadeGood, Pangea, and the Cannabis Media Council. In 2023, we expanded into the U.S. cannabis industry by integrating Allison Disney's Chicago-based consultancy Receptor Brands. We hold 85%+ client retention on top-tier accounts over four years.</p>
              <p>We grew from four founders to 30 staff across Toronto and Chicago on a model designed for accountability: a core team plus specialist talent that flexes based on client needs.</p>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">The Sister Merci Timeline</h4>
              <div>
                <p className="font-bold">2019: The Experiment Begins</p>
                <p>Three agency veterans — Katie Waterman (CEO), PK Lawton (CSO), and Amanda Wood (CCO) — leave established roles at major Canadian agencies to build something no one had attempted: a strategy-led creative agency focused on emerging, highly regulated categories like cannabis and iGaming. PK plays a key role in securing a $1.5M seed round from BlackShire Capital and partners with BlackShire and Canopy Rivers on strategic diligence — evaluating brand viability, audience alignment, and market-entry logic for U.S. companies entering Canada. The bet: regulatory constraint as creative advantage.</p>
              </div>
              <div>
                <p className="font-bold">2020: Don't Turn off the Lights…</p>
                <p>COVID hits. Sister Merci pushes clients to keep investing in the brand. PK advises in Strategy Online that going dark on marketing during a pandemic would cost more in the long run than maintaining a presence. The call proves right as OCS orders spike.</p>
              </div>
              <div>
                <p className="font-bold">2021: From Boutique to Engine</p>
                <p>The client roster deepens: Canopy Growth, Hexo, Organigram, Tilray. The SHRED brand build becomes the template: ethnographic research, positioning, design system, retail activation. 14.4% market share in pre-rolls, built from zero.</p>
              </div>
              <div>
                <p className="font-bold">2022: Agency of the Year (1 of 3)</p>
                <p>ADCANN names Sister Merci the 2022 Cannabis Agency of the Year for Canada. A national consumer study with YouGov shatters stoner stereotypes: 55% of heavy cannabis users are parents, 54% are over 35. Forbes covers it. Wyld enters Canada and hits +16.5% CMGR in its launch year. ADCANN Packaging and Edible of the Year.</p>
              </div>
              <div>
                <p className="font-bold">2023: "I'm High Right Now"</p>
                <p>For the Cannabis Media Council, Sister Merci creates a fully integrated campaign targeting Baby Boomers. It becomes the first cannabis ad in Vanity Fair, the first cannabis campaign on Pornhub (18M+ impressions), the first on Spotify. Adweek names it a Top 10 cannabis campaign of the year. 256M earned impressions from a single campaign.</p>
                <p className="mt-2">The Clio Cannabis Awards name Sister Merci Agency of the Year. Receptor Brands, Allison Disney's Chicago-based consultancy, is acquired in a reverse-takeover. Two countries. One thesis.</p>
                <p className="mt-2">Casino Time hires Sister Merci to build its iGaming brand from scratch. Instead of chasing the category's digital aesthetic, the team creates Big Fran, a sasquatch in the Ontario wilderness who just wants community. 800M paid impressions. Sister Merci also gets our foot in the door with MadeGood, who hired us to develop a brand architecture via a year-long, extensive, multi-modal consumer research program as they fought their way successfully into the US market.</p>
              </div>
              <div>
                <p className="font-bold">2024: Cannabis Meets Culture's Biggest Stage</p>
                <p>Hearst Media runs "I'm High Right Now" in its Super Bowl preview issue. Men's Health, Good Housekeeping, Vanity Fair, Town & Country. PK delivers the APG Canada keynote on the future of market research and the Cannabis Council of Canada keynote on Reddit's impact on brand performance.</p>
              </div>
              <div>
                <p className="font-bold">2025–2026: The Playbook Goes Public</p>
                <p>Two major thought-leadership pieces on LBB Online. "I'm High Right Now" Phase 2 launches on Meta targeting 55+ audiences. Sister Merci expands into tech, health, and fintech brands, deploying our strategy-first approach to startups like MosaicAI, NiaHealth, and Doodle — the latter won through a global competitive pitch. Manulife comes on board in 2026, a relationship built on a decade of trust with their Head of Communications, who PK first worked with at Weber Shandwick. 85%+ client retention on top-tier accounts across the agency's history.</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Selected Firsts</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>First cannabis campaign on Pornhub</li>
                <li>First cannabis campaign on Spotify</li>
                <li>First cannabis ad in Vanity Fair.</li>
                <li>Super Bowl preview PSA for cannabis in Hearst publications</li>
              </ul>
            </div>

            <div className="space-y-4 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Selected Agency Awards</h4>
              <ul className="space-y-2">
                <li><span className="font-bold">Clio Cannabis</span> — Agency of the Year (2023)</li>
                <li><span className="font-bold">ADCANN</span> — Cannabis Agency of the Year (Canada) (2022)</li>
                <li><span className="font-bold">KIND Magazine</span> — Agency of the Year (2021)</li>
                <li><span className="font-bold">ADCANN</span> — Campaign of the Year — "I'm High Right Now" (2023)</li>
                <li><span className="font-bold">ADCANN</span> — Packaging of the Year — Wyld (2022)</li>
                <li><span className="font-bold">ADCANN</span> — Edible of the Year — Wyld (2022)</li>
                <li><span className="font-bold">Adweek</span> — Top 10 Cannabis Campaign — "I'm High Right Now" (2023)</li>
                <li><span className="font-bold">Clio Cannabis</span> — Silver: Digital/Mobile, Website/Microsite (2023)</li>
                <li><span className="font-bold">Clio Cannabis</span> — Bronze: Integrated Campaign (2023)</li>
                <li><span className="font-bold">Clio Cannabis</span> — Bronze: Print & OOH (2023)</li>
                <li><span className="font-bold">Clio Cannabis</span> — Bronze: Print & OOH Craft (2023)</li>
                <li><span className="font-bold">Clio Cannabis</span> — Bronze: Advocacy (2023)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">As Covered In</h4>
              <p>Adweek · Forbes · Ad Age · Strategy · Campaign Canada · Financial Post · Clio · LBB · Muse by Clios · TrendHunter · Ads of the World · MediaPost · Honeysuckle Magazine · mg Magazine</p>
            </div>


          </div>
        )}

        {view === 'research-stack' && (
          <Suspense fallback={<div className="text-sm text-[#362318] py-8 animate-pulse">Loading Research Stack…</div>}>
            <ResearchStack />
          </Suspense>
        )}

        {view === 'counsel' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">How I Work</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">STRATEGY AS OPERATING SYSTEM</h3>

            <div className="space-y-6 mb-12">
              <p>Strategy works best when it is embedded in how a team operates, not isolated as a deliverable at the start of a project.</p>
              <p>In practice, that means clarifying the problem before jumping to solutions, translating between creative, account, research, and client teams so everyone works from the same brief, defining what success looks like before the budget moves, and staying close enough to the work to course-correct when the market shifts.</p>
              <p>The best strategy work happens when the strategist makes everyone else's job easier. The creative team gets a brief they can run with. The account team can tell a consistent story. The media plan connects to a measurement framework that was set before launch. The client hears one voice from the agency, not three.</p>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">New Business</h4>
              <p>A good strategist reframes the pitch from "here is what we do" to "here is what you are missing." At Sister Merci, I lead roughly five competitive pitches per year at an 85% win rate, including the recent global win for the Doodle.com rebrand. At Weber Shandwick, about ten per year at 65%. The Manulife relationship that came to Sister Merci in 2026 started at Weber Shandwick a decade earlier. That is what happens when strategy consistently helps the client make the right call.</p>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Building Strategists</h4>
              <p>I teach and coach strategists to work across four connected areas: problem clarification, insight development, strategic articulation, and effectiveness. The point is range with rigour. Teams need strategists who can move from a brand tracker to a cultural insight to an attribution model without losing clarity.</p>
              <p>A large part of leadership in this role is building an environment where people develop stronger judgment, sharper craft, and the confidence to hold a room. I have managed teams of up to 20 at Weber Shandwick and 30 at Sister Merci. Strategists I have worked with now hold senior positions at McDonald's Global, Zeno Group, GUT, Courage, and Lifelong Crush.</p>
            </div>
          </div>
        )}

        {view === 'square' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">DEVELOPING SQUARE SHAPED STRATEGISTS</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">THE SQUARE-SHAPED STRATEGIST</h3>

            <div className="space-y-6 mb-12">
              <p>The industry has long focused on T-shaped people, experts in one area, with a little knowledge in others. But that approach falls short when you need to analyze a brand tracker one day, test a cultural insight the next, and defend an attribution model by the end of the week.</p>
              <p>It also doesn't work in the age of AI, where the strategist has more opportunities to expand their skill set and invest time in going both wide AND deep. It is my belief that the age of specialization in agencies is over, and that our people, if they are to thrive in a new environment, need broader exposure to theory and practice across the board.</p>
              <p className="font-bold mt-8">The square-shaped strategist can master four corners:</p>
              <div className="space-y-4 ml-4">
                <p><strong>Problem Clarification.</strong> Most briefs show up already 'solved.' Clients often give you a deliverable before anyone has agreed on what the real issue is. Your job is to start with the actual problem and work backward, instead of just delivering what was first requested.</p>
                <p><strong>Insight Development.</strong> Data is everywhere, but not everyone can spot the tension that changes how you see a problem and makes a brief valuable. You need to be comfortable with both quantitative and qualitative methods, and be clear about which one you're relying on.</p>
                <p><strong>Strategic Approach.</strong> This is where you earn trust in the room. If a strategy can't be compressed into a sentence, it won't survive a creative review. Clarity isn't dumbing it down. It's the harder work of making the complex feel inevitable.</p>
                <p><strong>Effectiveness.</strong> Your job doesn't end at launch. You're also responsible for KPIs, attribution, and optimization. If you can't prove your work made a difference, you haven't finished the job.</p>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">My Coaching Tree</h4>
              <p>Strategists I've trained now hold:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Global Social Lead & Brand, McDonald's Global</li>
                <li>Head of Strategy, Zeno Group</li>
                <li>Strategy Director, GUT</li>
                <li>Head of Strategy, Courage</li>
                <li>SVP Strategy, Lifelong Crush</li>
              </ul>
              <p>All of these strategists have the qualities of a square-shaped strategist. They are just as skilled with an econometric model as they are with reading cultural signals. That kind of range gets them invited into important meetings and helps them lead those rooms.</p>
              <p>A Square-Shaped Strategist knows how to make work stand out, how to make it effective, and, just as importantly, how to sell the work and build trust with clients and partners.</p>
            </div>

            <div className="aspect-video w-full my-6 bg-[#F0EDE7] overflow-hidden rounded">
              <iframe
                src="https://www.canva.com/design/DAHCz5-pAFQ/--EKhbQ4MR4hhxGFW5ExjA/view?embed"
                className="w-full h-full border-0"
                allowFullScreen
                title="Square Shaped Strategist presentation"
              />
            </div>
          </div>
        )}

        {view === 'cartography' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">CULTURAL CARTOGRAPHY</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">A METHOD FOR STRATEGIC PLANNING</h3>

            <div className="space-y-6 mb-12">
              <p>Cultural Cartography is the strategic approach I have developed over 15 years of practice and academic research. It applies Actor-Network Theory — a framework from the social sciences — to the practical work of building brands.</p>
              <p>The core idea: strategy should start in the field, not in the deck. Rather than analyzing a market from the outside, you follow how meaning moves through the system. You map the relevant actors — a person, an algorithm, a competitor's advertising, a regulation, a Reddit thread — compiling an inventory of social objects already shaping the situation. You look for friction: the places where policy, culture, and business collide. And you stay with the complexity longer than is comfortable before forcing a tidy answer.</p>
              <p>This approach has been most useful in regulated and emerging categories where the standard playbooks do not apply. In cannabis, I have watched a single Health Canada compliance memo reshape an entire category's creative output in weeks. That memo is an actor in the system. Ignoring it because it does not fit on a positioning slide is a strategic error.</p>
              <p>The method is informed by sociology and institutional analysis, but it is meant to be useful in working teams, not trapped in theory. I write about Cultural Cartography on Substack and am developing a book. The flagship essay, "Reassembling the Strategist," is the most detailed introduction to the method.</p>
            </div>

            <div className="aspect-video w-full my-6 bg-[#F0EDE7] overflow-hidden rounded">
              <iframe
                src="https://www.canva.com/design/DAGmrey6WcQ/XiV4VUIzkBj0PMohFrxZSw/view?embed"
                className="w-full h-full border-0"
                allowFullScreen
                title="Cultural Cartography presentation"
              />
            </div>
          </div>
        )}

        {view === 'teaching' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">TEACHING & RESEARCH</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">THEORY INTO PRACTICE</h3>

            <p className="mb-8">Teaching keeps me grounded in both theory and practice. In the classroom, I work on clarity, structure, and practical application. In client work, I apply that same discipline to audience research, brand strategy, and organizational decision-making. The theoretical frameworks I studied — particularly Latour's Actor-Network Theory and Bourdieu's theory of capital — are the foundation of my current strategic practice.</p>
            
            <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Teaching</h4>
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold">McMaster Continuing Education (2020–present)</p>
                <p>Adjunct Professor. Courses: Branding & Image, Consumer Research, Market Research, Introduction to Marketing, Developing Personal Brand, and Delivering Effective Presentations.</p>
              </div>
              <div>
                <p className="font-bold">University of Lethbridge, Department of Sociology (2007–2012)</p>
                <p>Adjunct Assistant Professor. Courses designed: Sociology of Mass Communication, Digital Culture and Society, Medical Sociology.</p>
              </div>
              <div>
                <p className="font-bold">The Thoughtful Strategist</p>
                <p>A year-long reading group for working strategists, co-created with Michelle Lee and Spencer MacEachern (Zulu Alpha Kilo). Hosted through Cultural Cartography on Substack.</p>
              </div>
            </div>

            <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Academic Research</h4>
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2">Peer-Reviewed Publications</p>
                <p className="mb-3">Frank, A.W., Corman, M., Gish, J. & Lawton, P. (2010). "Healer–Patient Interaction: New Mediations in Clinical Relationships." The SAGE Handbook of Qualitative Methods in Health Research. SAGE Publications.</p>
                <p className="mb-3">Wood, R.T., Williams, R.J. & Lawton, P.K. (2007). "Why Do Internet Gamblers Prefer Online Versus Land-Based Venues?" Journal of Gambling Issues, 20, 235–252.</p>
                <p>Lawton, P.K. (2005). "Capital and Stratification Within Virtual Community: A Case Study of Metafilter.com." Master's thesis, University of Lethbridge. Cited in the Yale Journal of Law & Technology.</p>
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2">Conference Presentations</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Canadian Sociological Association, Annual Meeting (2007) — "Mapping the Forms of Capital in Online Community"</li>
                  <li>University of Lethbridge Sociology Day (2007) — "The End of Cosmology: Latour, Actor-Network Theory and Reassembling the Social"</li>
                  <li>University of Calgary Graduate Research Conference (2007) — MA thesis findings</li>
                  <li>University of Lethbridge Sociology Day (2005, 2004) — Preliminary MA research</li>
                </ul>
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2">Research Positions</p>
                <p>Research Coordinator for Dr. Arthur W. Frank (University of Calgary). Research Assistant to Dr. Robert Wood (online gambling), Dr. Anne Gautier (family dynamics), and Dr. Lloyd Wong (anti-multiculturalism). SSHRC PhD Fellowship recipient.</p>
              </div>
            </div>


          </div>
        )}

        {view === 'published' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">PUBLISHED & SPOKEN</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">THE WORK BETWEEN THE WORK</h3>
            
            <p className="mb-8">Writing and speaking on cultural theory, cannabis marketing, brand methodology, and industry criticism.</p>
            
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Cultural Cartography (Substack, 2025–Present)</p>
                <p className="mb-4">A newsletter and forthcoming book applying Actor-Network Theory and critical theory to brand strategy.</p>
                <p className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2 mt-4">Selected Essays</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/reassembling-the-strategist" target="_blank" rel="noreferrer" variant="center">"Reassembling the Strategist"</AnimatedLink>: Proposes Cultural Cartography as a theory and method for practising strategy.</li>
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/reassembling-the-consumer" target="_blank" rel="noreferrer" variant="center">"Reassembling the Consumer"</AnimatedLink>: How "The Consumer" hardens into organizational infrastructure.</li>
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/glazed-and-confused-how-ai-is-rewriting" target="_blank" rel="noreferrer" variant="center">"Glazed and Confused"</AnimatedLink>: The ChatGPT-4o "glazing" controversy analyzed through Latour.</li>
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/ai-serves-power-not-people" target="_blank" rel="noreferrer" variant="center">"AI Serves Power, Not People"</AnimatedLink>: Technology is never neutral. DOGE as case study.</li>
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/are-you-a-strategist-or-are-you-just" target="_blank" rel="noreferrer" variant="center">"Are You a Strategist, or Are You Just a Human Algorithm with Good Taste?"</AnimatedLink></li>
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/notes-from-the-underground" target="_blank" rel="noreferrer" variant="center">"Notes from the Underground" (Parts 1 & 2)</AnimatedLink>: Intellectual autobiography.</li>
                  <li><AnimatedLink href="https://culturalcartography.substack.com/p/taste-wont-save-you-on-maintaining" target="_blank" rel="noreferrer" variant="center">"Taste Won't Save You"</AnimatedLink>: Creative professionals must actively maintain cultural engagement.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Trade Publications & Op-Eds</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><AnimatedLink href="https://lbbonline.com/news/the-secret-playbook-of-cannabis-brands-that-win" target="_blank" rel="noreferrer" variant="center">"The Secret Playbook of Cannabis Brands That Win"</AnimatedLink> — LBBOnline (2025). Six years of agency experience across 150+ cannabis brands distilled.</li>
                  <li><AnimatedLink href="https://lbbonline.com/news/Entering-the-Age-of-Health-Conscious-Hedonism" target="_blank" rel="noreferrer" variant="center">"Entering the Age of Health-Conscious Hedonism"</AnimatedLink> — LBBOnline (2026). Emerging beverage trends and what they mean for regulated categories.</li>
                  <li><AnimatedLink href="https://www.quirks.com/articles/how-hype-analysis-lets-companies-find-value-in-customer-excitement" target="_blank" rel="noreferrer" variant="center">"How Hype Analysis Lets Companies Find Value in Customer Excitement"</AnimatedLink> — Quirk's Marketing Research Review (2024). Co-authored with Marcelo Bursztein. Introduces hype analysis as a methodology beyond traditional social listening.</li>
                  <li><AnimatedLink href="https://www.linkedin.com/pulse/content-ecology-understanding-consequences-garbage-paul-k-lawton-ywehc" target="_blank" rel="noreferrer" variant="center">"Content Ecology: Understanding the Consequences of Garbage Content"</AnimatedLink> — LinkedIn Pulse (2024).</li>
                  <li><AnimatedLink href="https://www.theglobeandmail.com/report-on-business/rob-commentary/in-a-hyper-politicized-world-should-brands-take-a-stand/article34138902/" target="_blank" rel="noreferrer" variant="center">"In a Hyper-Politicized World, Brands Must Stay True to Themselves"</AnimatedLink> — The Globe and Mail (2017). Co-authored with Cameron Summers (SVP, Weber Shandwick Canada).</li>
                  <li><AnimatedLink href="https://www.theglobeandmail.com/report-on-business/rob-commentary/for-brands-fake-news-is-an-existential-threat/article33109539/" target="_blank" rel="noreferrer" variant="center">"For Brands, Fake News Is an Existential Threat"</AnimatedLink> — The Globe and Mail (2016). Co-authored with Cameron Summers.</li>
                  <li><AnimatedLink href="http://marketingmag.ca/media/how-outrage-culture-changes-the-rules-for-crisis-management-155353/" target="_blank" rel="noreferrer" variant="center">"How Outrage Culture Changes the Rules for Crisis Management"</AnimatedLink> — Marketing Magazine (2015). Co-authored with David Gordon (Managing Partner, Cohn & Wolfe).</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Keynotes & Conference Speaking</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>APG Canada Keynote (2024) — The future of market research.</li>
                  <li>Cannabis Council of Canada Keynote (2024) — Reddit's impact on brand performance.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Industry Roles</p>
                <p>Chair, Marketing & Advertising Committee, National Cannabis Industry Association (2025). Strategic Advisor, Cannabis Standards Alliance of Canada (2024–2025). CMA Awards Judge.</p>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Individual Recognition</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ADCANN Cannabis Marketer of the Year, Canada: Finalist (2022, 2023, 2024)</li>
                  <li>Strategy Magazine Creative Report Card, Planners: #12 (2021)</li>
                  <li>Cohn & Wolfe Employee of the Year (2015)</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Campaign Awards (PK Credited as Strategist)</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>"I'm High Right Now" — Cannabis Media Council: Clio Silver + 4 Bronze. Adweek Top 3 Cannabis Campaign (2023). ADCANN Campaign of the Year (2023–24).</li>
                  <li>Tweed "Hi." — AToMiC Awards, Strategy Awards, SIA, CMA Award. Part of Cossette's Strategy Agency of the Year (2018).</li>
                  <li>Don't Drive High — AToMiC Awards, SIA, Media Innovation, CMA Awards, Strategy Awards.</li>
                  <li>Coleman "Get Outside Day" — CPRS ACE Award (Bronze 2017, Silver 2018), Platinum Awards.</li>
                  <li>Sunbeam "Supports with Warmth" — CPRS ACE Award, Bronze (2015).</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Podcasts</p>
                <p className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2">As Host</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Send Me the Link (2023–2025) with Melissa Eshaghbeigi: Digital culture</li>
                  <li>The Sister Merci Podcast (2019–2020): Cannabis industry</li>
                </ul>
                <p className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2">As Guest</p>
                <p>Legacies (2025), The Lobsterpot (2024), Craft & Crew (2021), CANADALAND Ep. 87 (2015)</p>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Selected Press (Strategy & Cannabis)</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><AnimatedLink href="https://continuing.mcmaster.ca/meet-paul-lawton-developing-your-brand-with-style-and-confidence/" target="_blank" rel="noreferrer" variant="center">McMaster Continuing Education (2024) — Institutional profile</AnimatedLink></li>
                  <li><AnimatedLink href="https://strategyonline.ca/2023/01/19/homegrown-cannabis-brand-building-cred/" target="_blank" rel="noreferrer" variant="center">Strategy Online (2023) — "Homegrown cannabis brand building cred" agency profile</AnimatedLink></li>
                  <li><AnimatedLink href="https://strategyonline.ca/2020/03/20/cannabis-industry-copes-with-social-distancing/" target="_blank" rel="noreferrer" variant="center">Strategy Online (2020) — COVID-era cannabis marketing advice</AnimatedLink></li>
                  <li><AnimatedLink href="https://medium.com/authority-magazine/marketing-strategies-from-the-top-all-gut-no-glory-with-paul-lawton-chief-strategy-officer-at-90de1dc3bf7d" target="_blank" rel="noreferrer" variant="center">Authority Magazine (2020) — "All Gut, No Glory" extended interview</AnimatedLink></li>
                  <li><AnimatedLink href="https://www.campaigncanada.ca/article/sister-merci-vows-to-solve-the-challenges-of-cannabis-marketing/4685qg6nyt1a9xkvm4sq4jjyxm" target="_blank" rel="noreferrer" variant="center">Campaign Canada (2019) — Agency launch coverage</AnimatedLink></li>
                </ul>
              </div>
            </div>
            

          </div>
        )}

        {view === 'music' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">THE OTHER LIFE: MUSIC & CULTURE</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">TWO DECADES BUILDING THE CANADIAN UNDERGROUND</h3>

            <p className="mb-8">Before strategy, I spent two decades in Canadian underground music: playing in bands, running record labels, co-organizing festivals, and writing cultural criticism. The instincts are the same across both careers. Figure out what people need. Build the infrastructure. Ship the thing.</p>
            
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Highlights</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong><AnimatedLink href="https://ketamines.bandcamp.com/" target="_blank" rel="noreferrer" variant="center">The Ketamines</AnimatedLink> (1996–2015; 2023–present):</strong> Bass, vocals, principal songwriter. Pitchfork 7.0. PopMatters #15 Best Canadian Album of 2013. New LP in 2026.</li>
                  <li><strong><AnimatedLink href="https://centurypalm.bandcamp.com/" target="_blank" rel="noreferrer" variant="center">Century Palm</AnimatedLink> (2014–2017):</strong> Bass, vocals. Toronto post-punk. Stereogum premiere. Bandcamp Album of the Day.</li>
                  <li><strong>Toured and Opened for:</strong> The B52s, Mac DeMarco, Thee Oh Sees, Redd Kross, Parquet Courts, Screaming Females, The Fresh and Onlys, Damo Suzuki (CAN), Sonic Boom, King Tuff, Shannon and the Clams, The Blind Shake, Warm Soda, Viet Cong, Cindy Lee, Dirty Beaches, Times New Viking, Davila 666, Human Eye</li>
                  <li><strong>Selected engineering and production credits:</strong> Century Palm Meet You (2017), B.A. Johnston Mission Accomplished (2013), Ketamines You Can't Serve Two Masters (2013), Fist City It's 1983 Grow Up! (2012), Krang Speed Of Tent (2011), Korean Gut Your Misery Our Benefit (2011), The Famines Complete Collected Singles (2011), Myelin Sheaths (2008–2010)</li>
                  <li><strong><AnimatedLink href="https://mammothcave.bandcamp.com/" target="_blank" rel="noreferrer" variant="center">Mammoth Cave Recording Co.</AnimatedLink> (2008–2015):</strong> Co-founder and Creative Director. FFWD Magazine Best Record Label three consecutive years (2010, 2011, 2012). B.A. Johnston's Shit Sucks longlisted for the Polaris Prize.</li>
                  <li><strong><AnimatedLink href="https://pleasencerecords.bandcamp.com/" target="_blank" rel="noreferrer" variant="center">Pleasence Records</AnimatedLink> (2016–2022):</strong> Co-owner and managing operator. Toronto underground experimental label. Profiled by NOW Toronto.</li>
                  <li>Co-organized Mammoth Cave Fest and Wyrd Fest with Weird Canada founder Aaron Levin. Wyrd Fest was a travelling music festival with 20 bands playing in four cities.</li>
                  <li><strong><AnimatedLink href="https://en.wikipedia.org/wiki/Weird_Canada" target="_blank" rel="noreferrer" variant="center">Weird Canada</AnimatedLink> (2009–2014):</strong> Writer, editor, board member. CBC Radio 3 Searchlight Award for Best Canadian Music Website.</li>
                  <li><strong><AnimatedLink href="https://www.newfeeling.ca/" target="_blank" rel="noreferrer" variant="center">New Feeling</AnimatedLink> (2020–present):</strong> Founding member. Multi-stakeholder co-op of Canadian music journalists. Cited by Liz Pelly in Mood Machine.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Reviewed In</p>
                <p>Pitchfork · Stereogum · Rolling Stone · Bandcamp Daily · PopMatters · VICE · Exclaim! · NOW Toronto · Maximum Rock'n'roll · Razorcake · Dusted Magazine · Weird Canada · CLRVYNT · Raven Sings the Blues · Collective Zine · Yellow Green Red · Styrofoam Drone · The 405 · QRO Magazine · CBC Music · LA Beat · Largehearted Boy · Norman Records</p>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Slagging Off (2013)</p>
                <p>In 2013, I ran a satirical blog about Canadian Music Week that went viral and led to a data-driven investigation of how FACTOR distributed public arts funding. The blog hit 10,000+ daily views. CBC covered it on Day 6.</p>
              </div>

              <div>
                <p className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">Selected Press</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><AnimatedLink href="https://www.theglobeandmail.com/arts/music/why-indie-rock-mediocrity-rules-in-canada-according-to-one-insider/article11170577/" target="_blank" rel="noreferrer" variant="center">The Globe and Mail (2013) — "Why Indie-Rock Mediocrity Rules in Canada"</AnimatedLink></li>
                  <li><AnimatedLink href="https://www.vice.com/en/article/meet-the-guy-whos-slagging-off-the-canadian-music-industry/" target="_blank" rel="noreferrer" variant="center">VICE (2013) — "Meet the Guy Who's Slagging Off the Canadian Music Industry"</AnimatedLink></li>
                  <li><AnimatedLink href="https://www.cbc.ca/player/play/audio/1.1541637" target="_blank" rel="noreferrer" variant="center">CBC Day 6 (2013) — "The Most Hated Man in Canadian Music"</AnimatedLink></li>
                  <li><AnimatedLink href="https://www.canadaland.com/podcast/canadian-music-horribly-broken-week/" target="_blank" rel="noreferrer" variant="center">CANADALAND Ep. 87 (2015)</AnimatedLink></li>
                  <li><AnimatedLink href="https://nowtoronto.com/music/features/pleasence-records-indie-record-label-podcast-festival" target="_blank" rel="noreferrer" variant="center">NOW Toronto (2018) — "How Pleasence Records Is Rethinking the Label Model"</AnimatedLink></li>
                  <li>Husky House Zine #1 (2025) — "Slagging Off: Ten Years Later"</li>
                </ul>
              </div>
            </div>

            <ImageGrid urls={[
              'https://i0.wp.com/www.ominocity.com/wp-content/uploads/2013/04/paul-lawton-live-1.jpg',
              'https://mintrecs.com/sites/default/files/styles/artist_profile_image/public/artist_profile_image/ketamines-rico-moran.jpg',
              'https://townsquare.media/site/875/files/2017/03/century-palm.jpg',
              'https://i0.wp.com/biffbampop.com/wp-content/uploads/2017/12/faves-of-2017-pleasence-records.jpg?resize=604%2C604&ssl=1',
              'https://i0.wp.com/www.ominocity.com/wp-content/uploads/2013/04/ketamines-live-1.jpg',
              'https://f4.bcbits.com/img/0012089568_10.jpg',
              'https://f4.bcbits.com/img/a4017687914_10.jpg',
              'https://f4.bcbits.com/img/a2199511335_10.jpg',
              'https://f4.bcbits.com/img/a0763637600_10.jpg',
              'https://f4.bcbits.com/img/a1750579306_10.jpg',
              'https://f4.bcbits.com/img/a3357090122_10.jpg',
              'https://f4.bcbits.com/img/a1462110973_10.jpg',
              'https://f4.bcbits.com/img/a1782315357_10.jpg',
              'https://f4.bcbits.com/img/a4031651432_10.jpg',
              'https://f4.bcbits.com/img/a2866988167_10.jpg',
              'https://f4.bcbits.com/img/a2216643284_10.jpg',
              'https://f4.bcbits.com/img/a1260674635_10.jpg',
              'https://f4.bcbits.com/img/a3139221143_10.jpg',
              'https://f4.bcbits.com/img/a1721398559_10.jpg',
              'https://f4.bcbits.com/img/a3975212979_10.jpg',
              'https://f4.bcbits.com/img/a4263969090_10.jpg',
              'https://f4.bcbits.com/img/a0822191567_10.jpg',
              'https://64.media.tumblr.com/tumblr_mek9npfukR1qzofx4o1_1280.jpg',
              'https://64.media.tumblr.com/tumblr_m82064Toac1qzofx4o1_500.jpg',
              'https://64.media.tumblr.com/tumblr_m5xgdjix6X1qzofx4o1_1280.jpg'
            ]} />
          </div>
        )}

        {view === 'testimonials' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">Eye Witness Accounts</h2>
            <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">A SELECTION OF PERSONAL RECOMMENDATIONS FROM MY CLIENTS, PEERS AND FORMER STRATEGY TEAMMATES</h3>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Client Testimonials</h4>

              <div className="mb-8">
                <p className="font-bold mb-2">Eric Williams | Organigram / Canopy Growth</p>
                <p>I had the opportunity to work with Paul across two chapters of my career, first while he was at Cossette supporting Canopy Growth, and later with Sister Merci, after I moved to Organigram. Few creative leaders combine strategic rigour and cultural fluency the way Paul does. His background in ethnographic research gives him a genuine feel for consumers and the communities that shape the category, allowing him to uncover insights many others miss. In a category where many brands end up looking and sounding the same, Paul consistently pushes for ideas that feel authentic to cannabis culture while still grounded in strong marketing fundamentals.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Nicole Bleiwas | Vapium / GreenHouse Juice / Riverside Foods (MadeGood, CookiePal)</p>
                <p>Paul brings both intellectual rigour and genuine curiosity to strategy. He has a way of digging beneath the obvious to understand the cultural and behavioural forces shaping a category, which consistently leads to insights others miss. Just as important, he is an excellent partner. He challenges thinking constructively and elevates the work through real collaboration.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Mark McKay | Organigram</p>
                <p>Paul's ability to find the cultural pulse allowed us to connect with audiences in a way that felt both authentic and daring. Under his guidance, our portfolio became the most engaged-with brands on social media within our competitive set. He is always my first call for new projects.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Rachel Boykins | Pangea Money Transfer</p>
                <p>PK and team were great strategic partners as we built out our new brand. From identifying the target audience to crafting the brand voice, he utilized various sources and exercises to ensure we collaborated on solutions quickly.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Jesse Ikeman | Vortex Media</p>
                <p>We had the pleasure of working with Paul to support our digital media strategy and social media outreach. Paul excelled at both. He has a deep understanding of the social media landscape. He was reliable and executed with speed and diligence. I'd highly recommend Paul for social media and other digital media projects.</p>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">Colleagues</h4>

              <div className="mb-8">
                <p className="font-bold mb-2">Melissa Eshaghbeigi | AKQA London</p>
                <p>PK has been instrumental to my growth as a strategic thinker. He has a rare ability to help you find and sharpen your own unique point of view, rather than simply handing you frameworks. He creates the conditions for you to develop them yourself. Whether you're stress-testing a half-formed idea or working through a complex cultural observation, PK is always genuinely engaged and ready to dig in.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Matt Weir | GUT Toronto</p>
                <p>Paul gave me my first full-time shot in strategy, converting my internship at Cossette into a full-time role, and later bringing me on as his first strategic hire at Sister Merci. What sets Paul apart is his commitment to long-term brand building in an industry obsessed with short-term gains. He seldom relies on desktop research. He gets in the dirt, talks to real people, and uncovers truths others miss.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Lindsay Peterson | GOLIN Canada</p>
                <p>Paul is collaborative, quick, and knows more than the average human. He unlocks insights that can take the team from zero to 100 in no time. I had the pleasure of developing several pitches with Paul: some of the best work I've ever done.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold mb-2">Yemina Kaiman | Cossette</p>
                <p>Paul is everything a leader should be: thoughtful, approachable, invested in his employees' success, and a wealth of knowledge and thought leadership. Most of all, Paul is an exceptional strategist who brings a dynamic perspective. His voracious thirst for knowledge means he's always got a book, a podcast, or a website to recommend — and he's always got a POV on that book, podcast, or website. His energy and good vibes are contagious, which results in a profound and indelible impact on any room he walks into. Everyone I know who's worked with Paul considers themselves lucky to have gotten the chance.</p>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-[#C4B99A] pb-1 mb-3">RateMyProfessors.com — University of Lethbridge, Sociology</h4>
              <div className="mb-6 pl-4 border-l-2 border-[#C4B99A]">
                <p className="italic">"Paul Lawton is among the best scholars today. Make no mistake, this guy is going to leave his mark on the field. Witty yet subtle. Intelligent yet comprehensible. Brilliant yet grounded. Take one of his courses before Princeton or Oxford snatches him up! Trust me, Lawton is going places..."</p>
              </div>

              <div className="mb-6 pl-4 border-l-2 border-[#C4B99A]">
                <p className="italic">"Professor Lawton is a very nice man. He made me understand digital culture, and I want to know more now. It is very cool, and one day during our lecture, we opened a portal to exciting new fields of learning. Yes. He has shown that the future is scary, but with Prof. Paul leading the way, we will survive. Don't fear the reaper."</p>
              </div>

              <div className="mb-6 pl-4 border-l-2 border-[#C4B99A]">
                <p className="italic">"WOW!! It was like the coolest, and, further to that, Prof Paul is a great teacher who explained things in an easy-to-understand way. Also, and this is true for most, he is quite funny!! Most recommended!"</p>
              </div>

              <div className="mb-6 pl-4 border-l-2 border-[#C4B99A]">
                <p className="italic">"Workload was heavy (lots of reading), but Paul does a good job compensating with being totally available (I emailed him once on a Saturday and he had a full-page response an hour later) and with lots of flexibility in turning in assignments. Seems to give a about his students."</p>
              </div>

              <div className="mb-6 pl-4 border-l-2 border-[#C4B99A]">
                <p className="italic">"Very knowledgeable in his field. There is a lot of reading, but that's expected in a 3rd year course. He is a good prof, and he's pretty cool because he's in a punk band that sounds pretty good."</p>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT CASE STUDIES */}
        {view === 'project' && activeProject && (() => {
          const { hero, distributed, remaining } = splitProjectImages(activeProject.images, activeProject.sections?.length || 0);
          return (
          <div className="max-w-3xl pb-20">
            <p className="text-xs uppercase tracking-[0.25em] text-[#DB3E36] font-bold mb-2 font-ui">{activeProject.category}</p>
            <h1 className="text-4xl md:text-5xl mb-4 font-bold font-display leading-tight">{activeProject.title}</h1>
            <p className="text-[#6B5D52] mb-10 italic text-base">{activeProject.summary}</p>

            {/* Hero image */}
            {hero && (
              <div className="mb-10">
                <img
                  src={hero}
                  alt=""
                  className="w-full rounded-md grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
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
                        className="w-full rounded-md grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
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