import React, { useState, useMemo } from 'react';
import portfolioData from './data/projects.json';


export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [view, setView] = useState(null); 
  const [zoomImg, setZoomImg] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const [expandedCategories, setExpandedCategories] = useState({
    'Background': false,
    'Campaign Strategy': false,
    'Brand Architecture': false,
    'Corporate Comms': false
  });

  const categories = useMemo(() => ['Campaign Strategy', 'Brand Architecture', 'Corporate Comms'], []);

  const openPanel = (newView, project = null) => {
    setView(newView);
    setActiveProject(project);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const handleProjectClick = (p) => { openPanel('project', p); };

  const backgroundSections = [
    { id: 'timeline', title: 'Career Timeline' },
    { id: 'education', title: 'Education' },
    { id: 'agency', title: 'Agency as Lab: Sister Merci' },
    { id: 'teaching', title: 'Teaching & Research' },
    { id: 'published', title: 'Published & Spoken' },
    { id: 'music', title: 'Music & Culture' }
  ];

  // Auto-link URLs in text
  const Linkify = ({ text }) => {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="underline hover:opacity-50 break-all">{part}</a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // Video embed — handles YouTube (thumbnail + link), Vimeo (iframe), and MP4 (native)
  const VideoEmbed = ({ url }) => {
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
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-500 transition-colors shadow-lg">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 font-mono uppercase tracking-wider">
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
        {label && <p className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">{label}</p>}
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
              {v.label && <p className="text-xs text-center text-gray-500 mt-1">{v.label}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ImageGrid = ({ urls }) => {
    if (!urls || urls.length === 0) return null;
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8 pt-8 border-t border-black">
        {urls.map((url, i) => (
          <div key={i} className="aspect-square bg-gray-100 overflow-hidden cursor-zoom-in" onClick={() => setZoomImg(url)}>
            <img src={url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" alt={`Gallery item ${i + 1}`} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono text-[14px] leading-tight relative">
      
      {/* Lightbox Overlay */}
      {zoomImg && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setZoomImg(null)}>
          <img src={zoomImg} className="max-w-full max-h-full object-contain" alt="Zoomed view" />
          <button className="absolute top-6 right-6 text-white text-xl hover:opacity-50">✕</button>
        </div>
      )}

      {/* Navigation */}
      <div className="w-full max-w-5xl mx-auto p-6 md:p-10 flex flex-col min-h-screen">
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">PK Lawton</h1>
          <p className="text-sm md:text-base text-gray-600 mb-6 max-w-xl">Co-Founder & Chief Strategy Officer at Sister Merci. Brand strategist, researcher, educator, cultural critic. Based in Hamilton, ON.</p>
          <div className="flex gap-6 text-sm underline decoration-1">
            <a href="mailto:pklawton@gmail.com" className="hover:opacity-50">Email</a>
            <a href="https://linkedin.com/in/paulklawton" target="_blank" rel="noreferrer" className="hover:opacity-50">LinkedIn</a>
            <a href="https://culturalcartography.substack.com" target="_blank" rel="noreferrer" className="hover:opacity-50">Substack</a>
          </div>
        </div>

        <button onClick={() => openPanel('about')} className={`flex items-center gap-2 mb-10 hover:opacity-50 transition-opacity ${view === 'about' && panelOpen ? 'font-bold' : ''}`}>
          <span className="text-xl">●</span> AN INTRODUCTION
        </button>

        <nav className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 items-start">
          {/* Background Nav */}
          <div className="mb-8">
            <button onClick={() => setExpandedCategories(p=>({...p, Background: !p.Background}))} className="w-full bg-black text-white flex justify-between px-1.5 py-0.5 mb-1 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity">
              <span>{expandedCategories.Background ? '↓' : '→'} Background</span>
              <span>{expandedCategories.Background ? '↓' : '→'}</span>
            </button>
            {expandedCategories.Background && (
              <ul className="border-t border-black">
                {backgroundSections.map((item) => (
                  <li key={item.id} onClick={() => openPanel(item.id)} className={`border-b border-black py-2 px-1 flex justify-between cursor-pointer hover:bg-gray-100 transition-colors ${view === item.id && panelOpen ? 'bg-gray-100 font-bold' : ''}`}>
                    <span className="truncate pr-4">{item.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Categories Nav */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <button onClick={() => setExpandedCategories(p=>({...p, [category]: !p[category]}))} className="w-full bg-black text-white flex justify-between px-1.5 py-0.5 mb-1 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity">
                <span>{expandedCategories[category] ? '↓' : '→'} {category}</span>
                <span>{expandedCategories[category] ? '↓' : '→'}</span>
              </button>
              {expandedCategories[category] && (
                <ul className="border-t border-black">
                  {portfolioData.filter((p) => p.category === category).map((project) => (
                    <li key={project.id} onClick={() => handleProjectClick(project)} className={`border-b border-black py-2 px-1 flex justify-between cursor-pointer hover:bg-gray-100 transition-colors ${activeProject?.id === project.id && view === 'project' && panelOpen ? 'bg-gray-100 font-bold' : ''}`}>
                      <span className={`truncate pr-4 ${project.forceBold ? 'font-bold underline decoration-2' : ''}`}>{project.title}</span>
                      <span className="whitespace-nowrap flex gap-2">
                        <span>{project.year}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {panelOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity" onClick={closePanel} />
      )}

      {/* Slide-out Content Panel */}
      <div className={`fixed top-0 right-0 z-40 h-full w-full md:w-3/5 bg-white border-l border-black shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${panelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 md:p-10">
          <button onClick={closePanel} className="mb-8 text-sm font-mono uppercase tracking-widest hover:opacity-50 transition-opacity flex items-center gap-2">
            <span>←</span> Back
          </button>
        
        {/* BACKGROUND SECTIONS */}
        {view === 'about' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-6 font-bold uppercase tracking-widest">HI, I'M PK</h2>
            <div className="space-y-6">
              <p>Hello! I am the Co-Founder and Chief Strategy Officer at Sister Merci, a strategy-led creative agency that won the 2023 Clio Cannabis Agency of the Year. I co-founded Sister Merci with my friend Katie Waterman in 2019, after stints at Cossette, Weber Shandwick, and Cohn & Wolfe, where I led brand strategy and integrated media for clients including Canopy Growth, Air Canada, RBC, and Mondelez.</p>
              <p>My approach to strategy comes from a background that doesn't fit neatly on a resume. I spent an entire decade in academia, undertaking sociological research on the emerging field of digital culture (MA from the University of Lethbridge, PhD work at the University of Calgary); I've been part of running two indie record labels and have released close to 100 records; I've toured North America as a musician and promoter. In 2013, an anonymous music criticism blog I started went viral, and CBC called me "The Most Hated Man in Canadian Music" for it (actually, I am not that hateful, but it's a provocative title, no?). But that drive to say the thing has carried through everything since.</p>
              <p>At Sister Merci, I've led strategy for over 150 brands across cannabis, iGaming, AI, beverage alcohol, health tech, and financial services. Our little agency has taken home seven Clios, been named Agency of the Year three times, and grown from four founders to a 30-person team with offices in Toronto and Chicago. During this period, I spent a year as the Fractional CMO (FTE model) at Galaxie Brands, bringing WYLD gummies to the Canadian market and building the CRUUZY brand from scratch.</p>
              <p>I also teach brand strategy, market research, and consumer research courses at McMaster Continuing Education, where I have been rethinking the curriculum in light of platform fragmentation and AI. I am a co-founding editor of Rebrief: A Canadian Journal of Advertising, set to launch in April 2026, and I sometimes publish on my Substack site, Cultural Cartography (mostly about strategy as field practice, drawing on the social theory of Pierre Bourdieu, Actor-Network Theory, and Institutional ethnography).</p>
              <p>People are sometimes surprised that after this long gauntlet of making things: labels, agencies, courses, campaigns, I get real satisfaction from life as a strategist.</p>
              <p>I'm still genuinely fascinated by people and how they use technology and culture. I read about 60 books a year, my record collection is 4,000 pieces deep, and I'm at a matinee almost every Saturday. All this feeds everything I build.</p>
              <p>But the part that matters most is that none of it happens alone. I ground everything in research, foundational knowledge, and building on what other people have done.</p>
              <p>I know I work best on a team, and if I'm honest, contribution is the one thing that sustains me. I'm a campaigner and bridge builder where I can; I love to teach and to learn.</p>
              <p>Some people will say, "But PK, aren't you worried about moving away from music?" and I tell them that the infrastructure of community building is the same, no matter the medium.</p>
              <p>I currently live in Hamilton, Ontario, where you can sometimes find me on a Sunday afternoon working at a local indie bookstore (The City and The City), just so I can talk to more people about literature. I've been learning the trade of book selling because my entire goal in life is to retire, move out to the rural Maritimes, and run a small bookstore, and there is no better way to learn than to do. I promise you one thing: I will start a book club with you as soon as I get the chance. This site is a rundown of my life in the 21st century. If you have any questions, hit me up, here is my cell number: 6472412575. I promise to respond.</p>
            </div>
            <ImageGrid urls={[
              'https://mytoastlife.com/wp-content/uploads/2020/08/Paul-Lawton.jpg',
              '/images/personal/623189004_18170246671387407_872038208662811001_n.jpg',
              '/images/personal/629475347_18171368608387407_657306813332588271_n.jpg',
              '/images/personal/IMG_0372.JPG',
              '/images/personal/IMG_0950.JPG',
              '/images/personal/download-3.jpg',
              '/images/personal/download-4.jpg',
              '/images/personal/download-5.jpg',
              '/images/personal/download.jpg'
            ]} />
          </div>
        )}

        {view === 'timeline' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-8 font-bold uppercase tracking-widest">Career Timeline</h2>
            <div className="space-y-12">
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>Sister Merci</span><span>2019–Present</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">Co-Founder & Chief Strategy Officer</p>
                <p>Co-founded with Katie Waterman. Built from four founders to 30+ staff across Toronto and Chicago. Led strategy for 150+ brands across cannabis, iGaming, AI, beverage alcohol, health tech, and financial services. 2023 Clio Cannabis Agency of the Year. Seven Clios total. Three-time Agency of the Year.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>McMaster Continuing Education</span><span>2020–Present</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">Adjunct Professor</p>
                <p>Teaching Brand Strategy, Consumer Research, Introduction to Marketing, Personal Branding, and Effective Presentations. Redesigning curriculum for platform fragmentation and AI. Partnered with the Canadian Marketing Association to create an accelerated pathway to the Chartered Marketer designation.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>National Cannabis Industry Association</span><span>2023–2025</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">Officer, Marketing & Advertising Committee</p>
                <p>Coordinator (2023), Vice Chair (2024), Chair (2025).</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>Cannabis Standards Alliance of Canada</span><span>2024–2025</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">Strategic Advisor</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>Cossette</span><span>2018–2019</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">Vice President, Strategy</p>
                <p>Led market insights and brand strategy for the Canopy Growth portfolio during legalization. Brand strategy for Tweed, DNA Genetics, and Foria. Managed a team of 20 strategists.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>Weber Shandwick</span><span>2016–2018</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">VP, Strategic Planning</p>
                <p>Led strategic planning for Air Canada, RBC, Mondelez, and Chevrolet. Agency won consecutive Holmes Report Agency of the Year during tenure.</p>
              </div>
              <div>
                <div className="flex justify-between border-b border-black mb-2 pb-1 font-bold"><span>Cohn & Wolfe</span><span>2013–2016</span></div>
                <p className="uppercase text-xs tracking-tighter text-gray-500 mb-2">Senior Counsellor & Digital Lead</p>
                <p>Built the agency's first analytics and measurement framework. Integrated media for Nissan, Nintendo, CN Rail, Dell. Employee of the Year 2015.</p>
              </div>
            </div>
            <ImageGrid urls={['https://webershandwick.asia/wp-content/uploads/2018/05/2.-Sophie-Shin-Paul-Lawton-Fatma-Othman-640x640.jpg']} />
          </div>
        )}

        {view === 'education' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-6 font-bold uppercase tracking-widest">Education</h2>
            <div className="space-y-8">
              <div>
                <p className="font-bold">PhD (ABD), Sociology : University of Calgary, 2006–2010</p>
                <p>Dissertation on internet-mediated doctor-patient relationships. SSHRC PhD Fellowship recipient.</p>
              </div>
              <div>
                <p className="font-bold">MA, Sociology : University of Lethbridge, 2003–2005</p>
                <p>Thesis: "Capital and Stratification Within Virtual Community: A Case Study of Metafilter.com." Applied Bourdieu's theory of capital to online community dynamics. Cited in the Yale Journal of Law & Technology.</p>
              </div>
              <div>
                <p className="font-bold">BA, Sociology : University of Lethbridge, 1999–2003</p>
                <p>Graduated with Great Distinction.</p>
              </div>
            </div>
          </div>
        )}

        {view === 'agency' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-2 font-bold uppercase tracking-widest">AGENCY AS LAB: SISTER MERCI</h2>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">EXPERIMENT UNTIL EXTRAORDINARY</h3>
            
            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-black pb-1 mb-3">The Thesis</h4>
              <p>The most restricted marketing environment in North America would produce the sharpest creative thinking, not the weakest.</p>
              <p>Sister Merci started as a hypothesis: the disciplines forced by cannabis marketing, specifically: compliance as creative fuel, budtender ecosystems as distribution channels, ethnographic research as the basis for every brief, would transfer to any high-stakes, emerging, or restricted category.</p>
              <p>Seven years later, the hypothesis has been tested across cannabis, iGaming, craft beverages, CPG, fintech, and pharma. Three Agency of the Year awards from three different organizations. A reverse-takeover that created a North American footprint. Constraints don't limit creativity. They sharpen it.</p>
              <p>Some people will say, "But PK, aren't you worried about working in cannabis limiting your career options?" and then I show them how sharp I've made my strategy blade working in the most relentless, unforgiving category you can work in. When Sister Merci started working in other categories, we've blown away expectations because we've had to really figure out the fundamentals of brand and marketing strategy with our arms tied behind our backs.</p>
              <p>Some people will say, "But PK, you can't even build a brand in Cannabis!" I will sigh, and ask them to explain how a brand like SHRED could be in the top 5 sellers and have a 98% retail penetration rate without having brand salience through the distinctive brand assets we helped create with Organigram. Here is the story of what we've built over the last 7 years:</p>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="font-bold border-b border-black pb-1 mb-3">The Sister Merci Timeline</h4>
              <div>
                <p className="font-bold">2019: The Experiment Begins</p>
                <p>Three agency veterans: Katie Waterman, PK Lawton, and Amanda Wood, leave nice jobs from major Canadian agencies to build something no one had attempted: a strategy-led creative agency with a niche focus on emerging, highly regulated "vice" categories like cannabis and iGaming. BlackShire Capital puts up $1.5M in seed funding. The bet: regulatory constraint as creative advantage.</p>
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
                <p className="font-bold">2025: The Playbook Goes Public</p>
                <p>Two major thought-leadership pieces on LBB Online. "I'm High Right Now" Phase 2 launches on Meta targeting 55+ audiences. Sister Merci expands into tech, health and fintech brands, deploying our unique strategy-first approach to startups like MosaicAI, NiaHealth, Doodle and, most recently, Manulife.</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-12">
              <h4 className="font-bold border-b border-black pb-1 mb-3">Some Random Industry Firsts</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>First cannabis campaign on Pornhub</li>
                <li>First cannabis campaign on Spotify</li>
                <li>First cannabis ad in Vanity Fair.</li>
                <li>Super Bowl preview PSA for cannabis in Hearst publications</li>
              </ul>
            </div>

            <div className="space-y-4 mb-12">
              <h4 className="font-bold border-b border-black pb-1 mb-3">Selected Agency Awards</h4>
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
              <h4 className="font-bold border-b border-black pb-1 mb-3">As Covered In</h4>
              <p>Adweek · Forbes · Ad Age · Strategy · Campaign Canada · Financial Post · Clio · LBB · Muse by Clios · TrendHunter · Ads of the World · MediaPost · B&T Australia · Honeysuckle Magazine · mg Magazine</p>
            </div>


          </div>
        )}

        {view === 'teaching' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-2 font-bold uppercase tracking-widest">TEACHING & RESEARCH</h2>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">STRATEGY IS APPLIED RESEARCH, NOT DECORATED OPINION</h3>

            <p className="mb-8">The academic work came first. A decade of sociology: Bourdieu, Latour, ethnographic methods before the first strategy deck. I taught sociology at the University of Lethbridge after enough agency experience to know what the textbooks were getting wrong. The two feed each other: the classroom forces clarity, and the client work keeps the theory honest.</p>
            
            <h4 className="font-bold border-b border-black pb-1 mb-3">Teaching</h4>
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold">McMaster Continuing Education (2020–present)</p>
                <p>Adjunct Professor. Courses: Branding & Image, Consumer Research, Market Research, Introduction to Marketing, Developing Personal Brand, Delivering Effective Presentations. Between 2023 and 2026, played a central role in revamping the Marketing Diploma, partnering with the Canadian Marketing Association to create an accelerated pathway to the Chartered Marketer (CM) designation.</p>
              </div>
              <div>
                <p className="font-bold">University of Lethbridge, Department of Sociology (2007–2012)</p>
                <p>Adjunct Assistant Professor. Courses designed: Sociology of Mass Communication, Digital Culture and Society, Medical Sociology.</p>
              </div>
              <div>
                <p className="font-bold">The Thoughtful Strategist</p>
                <p>A year-long reading group and graduate seminar for working strategists, co-created with Michelle Lee and Spencer MacEachern (Zulu Alpha Kilo). The 11-book syllabus spans Lazzarato, Stiegler, Mbembe, Berlant, Preciado, and Malabou. Hosted through Cultural Cartography on Substack.</p>
              </div>
            </div>

            <h4 className="font-bold border-b border-black pb-1 mb-3">Academic Research</h4>
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold uppercase tracking-widest text-xs mb-2">Peer-Reviewed Publications</p>
                <p className="mb-3">Frank, A.W., Corman, M., Gish, J. & Lawton, P. (2010). "Healer–Patient Interaction: New Mediations in Clinical Relationships." The SAGE Handbook of Qualitative Methods in Health Research (pp. 34–52), SAGE Publications. — Invited book chapter in one of the field's most authoritative reference works. Early engagement with Actor-Network Theory.</p>
                <p className="mb-3">Wood, R.T., Williams, R.J. & Lawton, P.K. (2007). "Why Do Internet Gamblers Prefer Online Versus Land-Based Venues? Some Preliminary Findings and Implications." Journal of Gambling Issues, 20, 235–252. — Original research using data from 1,920 gamblers. Widely cited in international gambling research.</p>
                <p>Lawton, P.K. (2005). "Capital and Stratification Within Virtual Community: A Case Study of Metafilter.com." Master's thesis, University of Lethbridge. — Applied Bourdieu's theory of capital to online community stratification years before "social capital" became standard platform vocabulary. Cited in the Yale Journal of Law & Technology.</p>
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest text-xs mb-2">Conference Presentations</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Canadian Sociological Association, Annual Meeting (2007) — "Mapping the Forms of Capital in Online Community"</li>
                  <li>University of Lethbridge Sociology Day (2007) — "The End of Cosmology: Latour, Actor-Network Theory and Reassembling the Social"</li>
                  <li>University of Calgary Graduate Research Conference (2007) — MA thesis findings</li>
                  <li>University of Lethbridge Sociology Day (2005, 2004) — Preliminary MA research</li>
                </ul>
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest text-xs mb-2">Research Positions</p>
                <p>Research Coordinator for Dr. Arthur W. Frank (University of Calgary). Research Assistant to Dr. Robert Wood (online gambling), Dr. Anne Gautier (family dynamics), and Dr. Lloyd Wong (anti-multiculturalism). SSHRC PhD Fellowship recipient.</p>
              </div>
            </div>


          </div>
        )}

        {view === 'published' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-2 font-bold uppercase tracking-widest">PUBLISHED & SPOKEN</h2>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">EVERYTHING HERE SITS AT THE INTERSECTION OF HOW BRANDS GET BUILT AND WHY MOST OF THE PLAYBOOKS ARE WRONG</h3>
            
            <p className="mb-8">The newsletter, the trade publications, the op-eds, and the talks all come from the same place: a conviction that strategy work should be grounded in something more durable than trend decks and gut instinct. The writing covers cultural theory, cannabis marketing, brand methodology, and industry criticism. The speaking side is keynotes, panels, and podcast appearances.</p>
            
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold border-b border-black pb-1 mb-3">Cultural Cartography (Substack, 2025–Present)</p>
                <p className="mb-4">A newsletter and forthcoming book applying Actor-Network Theory, critical theory, and institutional ethnography to brand strategy.</p>
                <p className="font-bold uppercase tracking-widest text-xs mb-2 mt-4">Selected Essays</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><a href="https://culturalcartography.substack.com/p/reassembling-the-strategist" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Reassembling the Strategist"</a> — The flagship essay. Proposes Cultural Cartography as a new theory and method for practicing strategy. 74 likes, most popular post. Accompanied by a 22-page Field Guide for paid subscribers.</li>
                  <li><a href="https://culturalcartography.substack.com/p/reassembling-the-consumer" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Reassembling the Consumer"</a> — "The Consumer" is a fiction that enters the marketing process early and hardens into organizational infrastructure. Uses the Stanley thermos trend as a case study.</li>
                  <li><a href="https://culturalcartography.substack.com/p/glazed-and-confused-how-ai-is-rewriting" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Glazed and Confused: How AI Is Rewriting Human Trust in Real Time"</a> — The ChatGPT-4o "glazing" controversy analyzed through Latour.</li>
                  <li><a href="https://culturalcartography.substack.com/p/ai-serves-power-not-people" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"AI Serves Power, Not People"</a> — Technology is never neutral. DOGE as a case study.</li>
                  <li><a href="https://culturalcartography.substack.com/p/are-you-a-strategist-or-are-you-just" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Are You a Strategist, or Are You Just a Human Algorithm with Good Taste?"</a> — Whether the strategy function has been reduced to pattern recognition and taste arbitrage.</li>
                  <li><a href="https://culturalcartography.substack.com/p/notes-from-the-underground" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Notes from the Underground" (Parts 1 & 2)</a> — Intellectual autobiography. From punk scenes in Winnipeg through a sociology PhD to the ad world.</li>
                  <li><a href="https://culturalcartography.substack.com/p/taste-wont-save-you-on-maintaining" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Taste Won't Save You: On Maintaining Subscriptions"</a> — Creative professionals have to actively maintain cultural engagement. Accumulated taste is not a static asset.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Trade Publications & Op-Eds</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><a href="https://lbbonline.com/news/the-secret-playbook-of-cannabis-brands-that-win" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"The Secret Playbook of Cannabis Brands That Win"</a> — LBBOnline (2025). Six years of agency experience across 150+ cannabis brands distilled.</li>
                  <li><a href="https://lbbonline.com/news/Entering-the-Age-of-Health-Conscious-Hedonism" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Entering the Age of Health-Conscious Hedonism"</a> — LBBOnline (2026). Emerging beverage trends and what they mean for regulated categories.</li>
                  <li><a href="https://www.quirks.com/articles/how-hype-analysis-lets-companies-find-value-in-customer-excitement" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"How Hype Analysis Lets Companies Find Value in Customer Excitement"</a> — Quirk's Marketing Research Review (2024). Co-authored with Marcelo Bursztein. Introduces hype analysis as a methodology beyond traditional social listening.</li>
                  <li><a href="https://www.linkedin.com/pulse/content-ecology-understanding-consequences-garbage-paul-k-lawton-ywehc" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"Content Ecology: Understanding the Consequences of Garbage Content"</a> — LinkedIn Pulse (2024).</li>
                  <li><a href="https://www.theglobeandmail.com/report-on-business/rob-commentary/in-a-hyper-politicized-world-should-brands-take-a-stand/article34138902/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"In a Hyper-Politicized World, Brands Must Stay True to Themselves"</a> — The Globe and Mail (2017). Co-authored with Cameron Summers (SVP, Weber Shandwick Canada).</li>
                  <li><a href="https://www.theglobeandmail.com/report-on-business/rob-commentary/for-brands-fake-news-is-an-existential-threat/article33109539/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"For Brands, Fake News Is an Existential Threat"</a> — The Globe and Mail (2016). Co-authored with Cameron Summers.</li>
                  <li><a href="http://marketingmag.ca/media/how-outrage-culture-changes-the-rules-for-crisis-management-155353/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">"How Outrage Culture Changes the Rules for Crisis Management"</a> — Marketing Magazine (2015). Co-authored with David Gordon (Managing Partner, Cohn & Wolfe).</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Keynotes & Conference Speaking</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>APG Canada Keynote (2024) — The future of market research.</li>
                  <li>Cannabis Council of Canada Keynote (2024) — Reddit's impact on brand performance.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Industry Roles</p>
                <p>Chair, Marketing & Advertising Committee, National Cannabis Industry Association (2025). Vice Chair (2024), Coordinator (2023). Strategic Advisor, Cannabis Standards Alliance of Canada (2024–2025). CMA Awards Judge.</p>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Individual Recognition</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ADCANN Cannabis Marketer of the Year, Canada— Finalist (2022, 2023, 2024).</li>
                  <li>Strategy Magazine Creative Report Card, Planners category, ranked #12 (2021).</li>
                  <li>Cohn & Wolfe Employee of the Year (2015).</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Campaign Awards (PK Credited as Strategist)</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>"I'm High Right Now" — Cannabis Media Council: Clio Cannabis Silver + 4 Bronze. Adweek Top 3 Cannabis Campaign of 2023. ADCANN Campaign of the Year, USA (2023–24).</li>
                  <li>Tweed "Hi." — Canopy Growth / Cossette: AToMiC Awards, Strategy Awards Bronze, SIA Gold/Silver/Bronze, CMA Award. Part of Cossette's Strategy Agency of the Year submission (2018).</li>
                  <li>Don't Drive High — Tweed × MADD × Uber / Cossette: AToMiC Awards, SIA, Media Innovation Awards, CMA Awards, Strategy Awards.</li>
                  <li>Coleman "Get Outside Day" — Cohn & Wolfe: CPRS ACE Award (Bronze 2017, Silver 2018), multiple Platinum Awards.</li>
                  <li>Sunbeam "Supports with Warmth" — Cohn & Wolfe: CPRS ACE Award, Bronze, Media Relations (2015).</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Podcasts</p>
                <p className="font-bold uppercase tracking-widest text-xs mb-2">As Host</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Send Me the Link (2023-2025) with Melissa Eshaghbeigi: Digital culture</li>
                  <li>The Sister Merci Podcast (2019–2020): Cannabis industry insights, dispensary reviews, edibles commentary.</li>
                  <li>Welcome: Toronto! (2019-2020): Toronto Raptors fan culture</li>
                  <li>Pleasence Record Podcast (2018): Co-hosted with James Lindsay. Conversations with indie label operators and musicians.</li>
                </ul>
                <p className="font-bold uppercase tracking-widest text-xs mb-2">As Guest</p>
                <p>Legacies (2025) The Lobsterpot (2024), Craft & Crew (2021), CANADALAND Ep. 87 (2015), Stereo Dynamite (2015), Part of the Noise (2013), City Slang Radio (2013)</p>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Selected Press (Strategy & Cannabis)</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><a href="https://continuing.mcmaster.ca/meet-paul-lawton-developing-your-brand-with-style-and-confidence/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">McMaster Continuing Education (2024) — Institutional profile</a></li>
                  <li><a href="https://strategyonline.ca/2023/01/19/homegrown-cannabis-brand-building-cred/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Strategy Online (2023) — "Homegrown cannabis brand building cred" agency profile</a></li>
                  <li><a href="https://strategyonline.ca/2020/03/20/cannabis-industry-copes-with-social-distancing/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Strategy Online (2020) — COVID-era cannabis marketing advice</a></li>
                  <li><a href="https://medium.com/authority-magazine/marketing-strategies-from-the-top-all-gut-no-glory-with-paul-lawton-chief-strategy-officer-at-90de1dc3bf7d" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Authority Magazine (2020) — "All Gut, No Glory" extended interview</a></li>
                  <li><a href="https://www.campaigncanada.ca/article/sister-merci-vows-to-solve-the-challenges-of-cannabis-marketing/4685qg6nyt1a9xkvm4sq4jjyxm" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Campaign Canada (2019) — Agency launch coverage</a></li>
                </ul>
              </div>
            </div>
            

          </div>
        )}

        {view === 'music' && (
          <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
            <h2 className="text-xl mb-2 font-bold uppercase tracking-widest">THE OTHER LIFE: MUSIC & CULTURE</h2>
            <h3 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">TWO DECADES BUILDING THE CANADIAN UNDERGROUND</h3>

            <p className="mb-8">Before strategy decks, I spent two decades in Canadian underground music: fronting bands, pressing records, co-organizing festivals, and writing the critiques nobody else would. The same instincts that built the music community now build brands and run agencies. The through line is infrastructure: figuring out what people need, then building it.</p>
            
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-bold border-b border-black pb-1 mb-3">Bands & Projects</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong><a href="https://ketamines.bandcamp.com/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Ketamines</a> (1996–2015; 2023-Current):</strong> Bass, vocals, principal songwriter. Long-running garage-pop project with James Leroy, originating in Lethbridge and evolving through multiple lineups across three cities. Released records on HoZac (Chicago), Southpaw, Mammoth Cave, Mint Records, and Hosehead. Pitchfork gave Spaced Out a 7.0. PopMatters named You Can't Serve Two Masters #15 Best Canadian Album of 2013. Oprah tweeted about the band. Target used a song in a US commercial. 128+ documented shows including SXSW, Sled Island, Pop Montreal, NXNE, HoZac BlackOut Fest. NEW LP OUT 2026!</li>
                  <li><strong><a href="https://centurypalm.bandcamp.com/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Century Palm</a> (2014–2017):</strong> Bass, vocals. Toronto post-punk with Andrew Payne (Zebrassieres), Penny Clark (Tough Age), Jesse Locke (Dirty Beaches), and Alex Hamlyn. Debut LP Meet You on Deranged Records, mixed by Jay Arner, mastered by Mikey Young. Premiered on Stereogum. Album of the Day on Bandcamp Daily. CLRVYNT called it "a crash course in post-punk."</li>
                  <li><strong><a href="https://myelinsheaths.bandcamp.com/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Myelin Sheaths</a> (~2008–2010):</strong> Drums, vocals. Lethbridge garage-punk. Two 7" singles on HoZac and Bachelor Records. LP Get On Your Nerves on Southpaw: Weird Canada called it "the most realized piece of psy-fi punk shreddery from the camp that put Alberta on the map."</li>
                  <li><strong><a href="https://themobydicks.bandcamp.com/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">The Moby Dicks</a> (2009–2011):</strong> Bass, vocals. Lethbridge bar-rock. Self-titled 7" on Southpaw, split with Needles//Pins, collaborative 7" with B.A. Johnston on Mammoth Cave.</li>
                  <li><strong>Also:</strong> Tough Age (touring bassist, Mint Records, 2013–2015), Red Mass (touring guitar player) Don't Bother, Endangered Ape, Radians, Pentagon, Mean Tikes, Complex Cities, James Leroy and the Giant, Ran, Kill Credo, 10% Gain.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Record Labels</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong><a href="https://mammothcave.bandcamp.com/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Mammoth Cave Recording Co.</a> (2008–2015):</strong> Co-founded with Evan Van Reekum. Nearly four dozen releases, 7"s, LP and cassettes that defined a specific era of Canadian DIY. FFWD Magazine voted it Best Record Label for three consecutive years (2010, 2011, 2012). B.A. Johnston's Shit Sucks was longlisted for the Polaris Prize. Catalogue includes B.A. Johnston, Fist City, The Famines, Needles//Pins, Korean Gut, Krang, Strange Attractor, Nervous Talk, Lab Coast. Reissued legacy recordings by Simply Saucer and Shadowy Men on a Shadowy Planet. The Bloodstains Across... compilation series documented punk scenes province-by-province, featuring White Lung, Nü Sensae (now: Orville Peck), and an unreleased Shadowy Men track. I got to meet Tonetta once. This is one thing I did in my life that earned me a Wikipedia page. Eulogized by Exclaim! and National Post when I decided to shut the label down over pressing plant backlogs, the weakening Canadian dollar, and the impact of Record Store Day on independent manufacturers.</li>
                  <li><strong><a href="https://pleasencerecords.bandcamp.com/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Pleasence Records</a> (2016–2022):</strong> And then, almost immediately, I bought into the amazing Toronto underground experimental label with James Lindsay. The story is that I did freelance brand strategy for Precision Pressing plant in Burlington, ON, in exchange for production credit. This helped guide the label through a prolific period Profiled by NOW Toronto on the label's evolving approach to sustainability in indie music. Catalogue: TRAITRS, Fake Palms, Isla Craig, Petra Glynt, WHIMM, Aidan Baker, Feel Alright, Germaphobes, Man Made Hill. TRAITRS might be the most successful band I've ever worked with; they generated an insane amount of money on streaming music.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Event Production</p>
                <p>Co-organized Mammoth Cave Fest (Lethbridge, 2009–2010) and Wyrd Fest (Alberta travelling festival, 2009–2013) with Weird Canada founder Aaron Levin.</p>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Writing & Cultural Criticism</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Slagging Off (2013):</strong> In February 2013, I started an anonymous Tumblr blog reviewing every band playing Canadian Music Week (CMW) as a joke for my friends. I decided to review every single band from A-Z with jokes because, at the time, I was taking stand-up comedy writing lessons at Second City. I was learning how to structure a joke! But then it went viral, so with the attention on me, I dropped a long, data-driven investigation into how FACTOR was distributing public arts funding. The blog hit 10,000+ daily views. CBC dubbed me "The Most Hated Man in Canadian Music." I was asked to come on DAY6 to debate FACTOR's president, but that coward refused to sit in the same studio with me, so they interviewed me. What gets lost in the "most hated" framing is the advocacy underneath. The project was an attempt to help non-Toronto musicians access better funding coverage, to address the collapse of touring infrastructure, and to argue for a more equitable system. From Husky House Zine #1 (2025), reflecting a decade later: "If there is one thing I regret, it was waging the battle solo. Everything I had learned about Canadian music is that the power came from community, and we were building a very strong infrastructure that was benefiting many people. By doing Slagging Off, I damaged the community I was trying to advocate for. Even if I was right, all I really did was teach the industry how to hide their tracks."</li>
                  <li><strong><a href="https://en.wikipedia.org/wiki/Weird_Canada" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Weird Canada</a> (2009–2014):</strong> Writer, editor, board member, grant writer. Winner of the 2011 CBC Radio 3 Searchlight Award for Best Canadian Music Website. Co-organized Wyrd Fest.</li>
                  <li><strong><a href="https://www.newfeeling.ca/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">New Feeling</a> (2020–present):</strong> Founding member. Multi-stakeholder cooperative of Canadian music journalists. Cited by Liz Pelly in Mood Machine as "one of the most interesting models of co-op music" journalism in Canada.</li>
                  <li><strong>BeatRoute Magazine:</strong> Monthly punk 7" review column. "A column convinced no one actually read."</li>
                  <li><strong>Toast Life, Weird Canada, New Feeling:</strong> Various criticism and reviews.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Reviewed In</p>
                <p>Pitchfork · Stereogum · Bandcamp Daily · PopMatters · VICE · Exclaim! · NOW Toronto · Maximum Rocknroll · Razorcake · Dusted Magazine · Weird Canada · CLRVYNT · Raven Sings The Blues · Collective Zine · Yellow Green Red · Styrofoam Drone · The 405 · QRO Magazine · CBC Music · LA Beat · Largehearted Boy · Norman Records</p>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Selected Press (Music & Culture)</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><a href="https://www.theglobeandmail.com/arts/music/why-indie-rock-mediocrity-rules-in-canada-according-to-one-insider/article11170577/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">The Globe and Mail (2013) — "Why Indie-Rock Mediocrity Rules in Canada"</a></li>
                  <li><a href="https://www.vice.com/en/article/meet-the-guy-whos-slagging-off-the-canadian-music-industry/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">VICE (2013) — "Meet the Guy Who's Slagging Off the Canadian Music Industry"</a></li>
                  <li><a href="https://www.cbc.ca/player/play/audio/1.1541637" target="_blank" rel="noreferrer" className="underline hover:opacity-70">CBC Day 6 (2013) — "The Most Hated Man in Canadian Music"</a></li>
                  <li>National Post (2013, 2015) — Music industry profiles</li>
                  <li><a href="https://www.ominocity.com/2013/04/30/how-paul-lawton-became-the-most-hated-man-in-canadian-music-timeline/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">Ominocity (2013) — Full Slagging Off timeline</a></li>
                  <li><a href="https://www.canadaland.com/podcast/canadian-music-horribly-broken-week/" target="_blank" rel="noreferrer" className="underline hover:opacity-70">CANADALAND Ep. 87 (2015) — "Canadian Music (Is Horribly Broken) Week"</a></li>
                  <li><a href="https://nowtoronto.com/music/features/pleasence-records-indie-record-label-podcast-festival" target="_blank" rel="noreferrer" className="underline hover:opacity-70">NOW Toronto (2018) — "How Pleasence Records Is Rethinking the Label Model"</a></li>
                  <li>Husky House Zine #1 (2025) — "Slagging Off: Ten Years Later"</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Notable Shared Bills</p>
                <p>Mac DeMarco, Thee Oh Sees, Redd Kross, Parquet Courts, Screaming Females, The Fresh and Onlys, Damo Suzuki, Sonic Boom, King Tuff, Shannon and the Clams, The Blind Shake, Warm Soda, Viet Cong, Cindy Lee, Dirty Beaches, Times New Viking, Davila 666, Human Eye</p>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Touring</p>
                <p>128+ documented Ketamines shows (2011–2014). Festivals: SXSW 2012, Sled Island (multiple years), HoZac BlackOut Fest 2012, Pop Montreal 2013, Ottawa Explosion Weekend (2014, 2018), NXNE 2014, Halifax Pop Explosion 2013, OBEY Fest 2013. Major tours: 35-date national run with B.A. Johnston (2012), cross-Canada with Zebrassieres (2013), Ontario with Tough Age (2013), Maritimes with Jay Arner (2014). US venues: Death By Audio, Mercury Lounge, The Empty Bottle, Comet Ping Pong, The Bug Jar, Now That's Class, Turf Club, Gabe's.</p>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Production & Engineering</p>
                <p>Selected credits: Century Palm Meet You (2017), B.A. Johnston Mission Accomplished (2013), Ketamines You Can't Serve Two Masters (2013), Fist City It's 1983 Grow Up! (2012), Krang Speed Of Tent (2011), Korean Gut Your Misery Our Benefit (2011), The Famines Complete Collected Singles (2011), Myelin Sheaths (2008–2010).</p>
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

        {/* PROJECT CASE STUDIES */}
        {view === 'project' && activeProject && (
          <div className="max-w-3xl pb-20">
            <h1 className="text-2xl mb-2 font-bold">{activeProject.title}</h1>
            <p className="text-gray-500 mb-8 italic">{activeProject.summary}</p>

            {/* Videos */}
            {activeProject.videos && activeProject.videos.length > 0 && (
              <div className="mb-10">
                {activeProject.videos.map((v, i) => <VideoEmbed key={i} url={v} />)}
              </div>
            )}

            {/* Video pairs (side-by-side portrait videos) */}
            {activeProject.videoPairs && activeProject.videoPairs.length > 0 && (
              <div className="mb-10">
                {activeProject.videoPairs.map((pair, i) => <VideoPairEmbed key={i} videos={pair.videos} label={pair.label} />)}
              </div>
            )}
            
            <div className="space-y-8 mb-12">
              {activeProject?.sections?.map((s, i) => (
                <React.Fragment key={i}>
                  {activeProject.sectionVideos && activeProject.sectionVideos[s.heading] && (
                    <VideoEmbed url={activeProject.sectionVideos[s.heading]} />
                  )}
                  <div>
                    <h3 className="uppercase tracking-widest text-xs font-bold border-b border-black pb-1 mb-3">{s.heading}</h3>
                    <p className="whitespace-pre-wrap leading-relaxed">{s.text}</p>
                  </div>
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

            {/* Video above proof */}
            {activeProject.proofVideo && (
              <div className="mb-10">
                <VideoEmbed url={activeProject.proofVideo} />
              </div>
            )}
            
            {activeProject?.proof && activeProject.proof.length > 0 && (
              <div className="mb-12">
                <h3 className="uppercase tracking-widest text-xs font-bold border-b border-black pb-1 mb-3">Proof & Results</h3>
                <ul className="list-disc pl-5 space-y-2">{activeProject.proof.map((p, i) => <li key={i}><Linkify text={p} /></li>)}</ul>
              </div>
            )}

            {activeProject?.team && activeProject.team.length > 0 && (
              <div className="mb-12">
                <h3 className="uppercase tracking-widest text-xs font-bold border-b border-black pb-1 mb-3">Team & Credits</h3>
                <ul className="list-disc pl-5 space-y-2">{activeProject.team.map((t, i) => <li key={i}><Linkify text={t} /></li>)}</ul>
              </div>
            )}

            {/* Images explicitly placed at the bottom */}
            {activeProject.images && activeProject.images.length > 0 && <ImageGrid urls={activeProject.images} />}
          </div>
        )}
        </div>
      </div>

    </div>
  );
}