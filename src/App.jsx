import React, { useState, useMemo } from 'react';

const portfolioData = [
  // CAMPAIGN STRATEGY
  {
    id: 'cmc',
    category: 'Campaign Strategy',
    title: "CMC: I'M HIGH RIGHT NOW",
    year: '2023-2026',
    tags: '',
    forceBold: true,
    summary: "Shifted cannabis stigma by featuring Baby Boomers as confident, stylish users",
    sections: [
      {
        heading: 'Summary',
        text: 'We built the Cannabis Media Council\'s first consumer campaign around a single provocation: "I\'m High Right Now." The campaign featured Baby Boomers photographed in bold, fashion-forward portraits, active, sharp, stylish, undeniably present. It addressed a critical gap: the generation most affected by anti-cannabis propaganda (Nancy Reagan\'s "Just Say No," Reefer Madness) had become one of the fastest-growing segments of legal cannabis users, yet appeared in no mainstream cannabis advertising. By flipping the most common misconception about cannabis, that it makes people visibly impaired, into a declaration of agency, the campaign did more to normalize cannabis than typical messaging aimed at younger audiences. The campaign also met a strategic second objective: showing mainstream publishers (Condé Nast, Hearst) that cannabis ads could be sophisticated, inclusive, and right for their brands. The result was industry change. Once one publisher accepted a cannabis ad, others followed.'
      },
      {
        heading: 'Background',
        text: 'The Cannabis Media Council is a U.S. trade group created to help normalize cannabis use and open up mainstream advertising for the legal cannabis industry. Even as legalization spread across most American states, advertising options lagged behind. Decades of War on Drugs messaging shaped media policy. Cannabis brands could not buy the same ad placements that alcohol or pharmaceutical brands used routinely.'
      },
      {
        heading: 'Objective',
        text: 'Educate and reduce stigma among Americans, especially Baby Boomers, while demonstrating to mainstream publishers that cannabis ads are high-quality, safe for brands, and culturally relevant.'
      },
      {
        heading: 'Challenge',
        text: 'The War on Drugs shaped how people think, especially older Americans influenced by decades of anti-cannabis messaging. Most marketing targeted younger, countercultural audiences already on board. By speaking only to those people, the industry kept reinforcing the stigma it wanted to break. Publishers saw cannabis ads as risky because there were no high-quality cannabis ads in mainstream media.'
      },
      {
        heading: 'Opportunity',
        text: 'What if, instead of making cannabis seem cool to young people, the campaign showed that the most unexpected cannabis users were already using it and thriving?'
      },
      {
        heading: 'Insight',
        text: 'Baby Boomers are the most overlooked group in cannabis advertising and the most affected by past propaganda. Yet they represent one of the fastest-growing groups of legal cannabis users. A campaign featuring real Boomers, stylish, confident, unapologetic, could normalize cannabis more than content aimed at 25-year-olds, while proving to publishers that cannabis ads can be sophisticated.'
      },
      {
        heading: 'Strategy',
        text: 'We built the campaign around "I\'m High Right Now." The line co-opted the most common misconception about cannabis and flipped it into a declaration of agency. Boomers photographed in bold, fashion-forward portraits conveyed: these people are high right now, and they are doing just fine. The contrast between subjects and audience assumptions did the persuasive work. We designed visuals and messaging to feel like a fashion editorial rather than a typical cannabis ad, addressing brand-safety standards of publishers hesitant about cannabis.'
      },
      {
        heading: 'Methodology',
        text: 'The campaign ran across print advertising (including Vanity Fair), programmatic digital display across all 50 states, digital advertorial and native placements, streaming audio, and organic social. Media strategy targeted legal markets with paid buys while using earned media to reach national audiences. Native advertising achieved roughly 2x industry average mobile dwell time (1:56), indicating the content held attention.'
      }
    ],
    proof: [
      '286,184,200 earned media impressions (87:1 earned-to-paid ratio)',
      '18.3 million paid impressions reaching all 50 states',
      '4 Clio Awards plus 2 shortlists',
      'First cannabis advertisement in Vanity Fair Magazine print edition',
      '~2x industry average dwell time for native advertising on mobile (1:56)',
      '287% LinkedIn follower growth; 190% Instagram growth for CMC',
      'Unlocked new cannabis ad space with Hearst, TrafficJunky, and Condé Nast'
    ],
    team: [
      'Advertiser / Brand: Cannabis Media Council, New York',
      'Advertising Agency: Sister Merci, Toronto',
      'Chief Creative Officer: Amanda Wood / Sister Merci',
      'Chief Strategy Officer: Paul Lawton / Sister Merci',
      'Executive Creative Director: Leah Whitney / Sister Merci',
      'Creative Director: Jennifer Dunaj / Sister Merci',
      'Copywriter: Jill Krajewski / Sister Merci',
      'Executive Producer: Brit Brown / Sister Merci',
      'Photographer: John Keatley',
      'Client: Lulu Tsui / Cannabis Media Council',
      'Client: Amy Deneson / Cannabis Media Council',
      'Client: Allison Disney / Cannabis Media Council',
      'Client: Joyce Cenalli / Cannabis Media Council'
    ],
    images: [
      'https://cdn.getmidnight.com/ee9375a9e35b070b930b27b8e868dc1c/2023/11/Cannabis-Media-Council_Im-High-Right-Now_John-Keatley.jpg',
      'https://static-www.adweek.com/wp-content/uploads/sites/7/2023/11/Cannabis-Media-Council-Pornhub-Computer-Takeover.jpeg',
      'https://static-www.adweek.com/wp-content/uploads/2025/04/im-high-right-now-2025.jpg',
      'https://images.squarespace-cdn.com/content/v1/61e1b093c9c6bb104195123e/8906e8c2-adc7-46b5-bc5e-ff4931b650d3/Cannabis+Media+Council+I%27m+High+Right+Now+Meta+420+2025.png',
      'https://cdn.prod.website-files.com/688121391a3801b69772fa7d/6894f7bb663cb7e7d4c6c2bc_CMC_ProjectArtboard-1.png'
    ]
  },
  {
    id: 'casino-time',
    category: 'Campaign Strategy',
    title: "CASINOTIME: BIG FRAN",
    year: '2023-2026',
    tags: '',
    summary: "Created female Sasquatch mascot that forced market correction in Ontario iGaming",
    sections: [
      {
        heading: 'Summary',
        text: 'Ontario\'s regulated iGaming market defaulted to two approaches: sign-up bonuses and celebrity endorsements from retired athletes. Most brands used flashy, high-energy ads that promised digital immersion and quick money. We identified a gap: the fastest-growing segment of online gambling was women over 50, yet no brand addressed them. We created Big Fran, a Pinot Grigio-loving, bingo-playing female Sasquatch who served as a mirror of her audience: warm, funny, no-nonsense. Through deadpan wit and an inviting presence, Fran tapped into something more powerful than adrenaline: nostalgia, community, and belonging. The creative was deliberately anti-iGaming. While the category used overproduced casino glitz, Fran welcomed players into her forest cave for wine and chat. The campaign forced industry change: within months, competitors shifted to softer, more inclusive messaging. One CasinoTime fan tattooed the brand logo, an unprecedented signal of affinity in iGaming.'
      },
      {
        heading: 'Background',
        text: 'Ontario opened its regulated iGaming market in April 2022, leading to a surge of new online casino brands competing for the same audience with nearly identical products. CasinoTime needed to stand out against industry giants like Bet365 and FanDuel. The category defaulted to two approaches: sign-up bonuses and celebrity endorsements. Most brands used flashy, high-energy ads.'
      },
      {
        heading: 'Objective',
        text: 'Develop CasinoTime from naming through launch, brand strategy, visual identity, in-product design, and fully integrated campaign, and build brand preference in a market where the product is functionally identical across platforms and competitors outspent us by an order of magnitude.'
      },
      {
        heading: 'Challenge',
        text: 'iGaming in Ontario is regulated with strict responsible gambling disclosures and age-gating rules. Most platforms run the same games from the same providers, so the product offers no real differentiation. Category leaders spent ten times CasinoTime\'s media budget. The brand needed to win on identity, not impressions.'
      },
      {
        heading: 'Opportunity',
        text: 'Instead of selling the fantasy of fast money, could an online casino brand focus on what people are actually seeking: connection?'
      },
      {
        heading: 'Insight',
        text: 'Research from Rutgers University and the National Library of Medicine showed women over 50 were one of the fastest-growing segments in online gambling, yet no brand addressed them. These players were not chasing adrenaline. They were looking for community: the chat rooms, the regulars, the social fabric around the games.'
      },
      {
        heading: 'Strategy',
        text: 'We created Big Fran, a warm, funny female Sasquatch who felt less like a cannabis brand and more like entertainment. The creative execution was deliberately anti-iGaming. While the category used casino glitz, Fran welcomed players into her forest cave for wine and chat. TV spots felt like invitations, not advertisements. The visual system, black and gold, playful typography, smiley-face logomark, felt more like entertainment than gambling.'
      },
      {
        heading: 'Methodology',
        text: 'The campaign ran across national TV, OOH, paid social, digital display, in-app creative, and branded merchandise. We extended the work into in-product UX, developing design elements that reinforced community positioning inside the gaming experience. We adapted the campaign for each of CasinoTime\'s 10 affiliated charitable gaming centres with localized variations.'
      }
    ],
    proof: [
      'Over 1M earned media impressions in first month; Big Fran became an instant cult figure',
      '800M+ targeted paid impressions in one market',
      '2% brand awareness increase in 6 months on 10x less media spend than category leaders',
      'Industry shift: competitors moved to softer, more inclusive messaging within months',
      'One fan tattooed the brand logo, unprecedented affinity signal in iGaming',
      'Two TV spots plus full asset library produced in a single 24-hour shoot',
      'Campaign adapted across 10 affiliated charitable gaming centres with localized creative'
    ],
    team: [
      'Paul Lawton, Chief Strategy Officer',
      'Creative Director: Amanda Wood',
      'Writer: Leah Whitney',
      'Art Director: Kat Tapp',
      'Production Company: Headford Productions',
      'Director: Michael Headford',
      'Executive Producer: Michael Headford',
      'Producer: Michael James Regan',
      'DP: Nik Pilecki',
      'Editor: Michael Headford',
      'Colour/VFX Studio: Studio Feather',
      'Audio Post House: Audiomancy',
      'Key HMU: Natalia Andrea Pozo',
      'HMU Assist: Gabrielle Jovellanos',
      'FX STUDIO: Stefaniuk FX Studio',
      'Wardrobe: Melissa Bessey'
    ],
    images: [
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/467394198_18145488322348735_5836426376033989475_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=iqaRmh799FUQ7kNvwEzw77h&_nc_oc=AdmxXHW6Wuh8ebJeehXISj5TwcTL276xK_GZCu9FerDpl14ulTyljRBXPeZq88x-DhQ&_nc_zt=23&_nc_ht=scontent-yyz1-1.xx&_nc_gid=VhXhZ8EUTvjKGGF43HFT_A&_nc_ss=8&oh=00_Afxth1z9Jz5Xx0P63vA44kvvZlfquLcLz33OWecp4oQxxA&oe=69AAB987',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/467314585_18145488376348735_3006361451666194417_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=Ny5ekufoR6sQ7kNvwEDR1Li&_nc_oc=AdlGiv3OD8MMflaGwWwHPzyVaRUQ4jAoSP4-BfemEbgqel5eitF4iqL_XxCLQH23KYU&_nc_zt=23&_nc_ht=scontent-yyz1-1.xx&_nc_gid=AYp-G-wg55lvyscF9AgFpw&_nc_ss=8&oh=00_Afxp-yIOMhhnA2s68lcnYVT4_V_w9BS4hqKIclLPPMPGhw&oe=69AAB4F2',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/467445551_18145488223348735_3774512950698256015_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=jb1G5ZktI7sQ7kNvwEBSj5r&_nc_oc=AdktR5xzPxHqJTuO_apwQO98MyxKtwD2ygPKFr29FUgqA579-EmiNPpIfsm9NukRegg&_nc_zt=23&_nc_ht=scontent-yyz1-1.xx&_nc_gid=AYp-G-wg55lvyscF9AgFpw&_nc_ss=8&oh=00_AfyA7fNbo6tb_xpFB5H2hT8JFwtrTMwAISFxy_khzMrv7A&oe=69AAA77D',
      '/images/casino-time/casino-time-1.jpg',
      '/images/casino-time/casino-time-2.jpg',
      '/images/casino-time/casino-time-3.png',
      '/images/casino-time/casino-time-4.png',
      '/images/casino-time/casino-time-5.jpg',
      '/images/casino-time/casino-time-6.jpg',
      '/images/casino-time/casino-time-7.png',
      '/images/casino-time/casino-time-8.png',
      '/images/casino-time/casino-time-9.png',
      '/images/casino-time/casino-time-10.png'
    ],
    videos: [
      'https://www.youtube.com/watch?v=3Fj8UUIrDR0',
      'https://www.youtube.com/watch?v=QHp57imwKrg',
      'https://www.youtube.com/watch?v=gyQlPDw8cyQ',
      'https://www.youtube.com/watch?v=BV8jOl_wdeI',
      'https://www.youtube.com/watch?v=pM2aMqm0D5g'
    ]
  },
  {
    id: 'jr-strain',
    category: 'Campaign Strategy',
    title: "J.R. STRAIN: ROOTSUIT",
    year: '2023',
    tags: '',
    summary: "Used AI to create visual icon introducing aeroponics to Ontario cannabis consumers",
    sections: [
      {
        heading: 'Summary',
        text: 'J.R. Strain grew cannabis using aeroponics, a method where plants grow without soil. Roots hang in the air and get sprayed with nutrient-rich mist. This creates cleaner flower and is better for the environment. But almost no one knew what aeroponics was. J.R. Strain had a real product difference, but consumers could not see, understand, or value it. We used AI to connect an abstract product truth to a real-world visual. With Runway ML and MidJourney, we explored how aeroponic root structures could take human-sized form that adhered to Cannabis Act mascot rules. AI outputs guided costume designers in building the final suit. The result was the Rootsuit: a life-sized, human-shaped costume made of white roots. The campaign language reinforced the roots positioning. The Rootsuit became the visual anchor of the brand identity and appeared in campaign photography, OOH placements, dispensary displays, and digital creative.'
      },
      {
        heading: 'Background',
        text: 'J.R. Strain grew cannabis using aeroponics. But almost no one knew what aeroponics was, no one was asking for it, and the brand had no presence in Ontario. J.R. Strain had a real product difference, but consumers could not see or understand it.'
      },
      {
        heading: 'Objective',
        text: 'Make cannabis consumers aware of aeroponic cannabis and position J.R. Strain as Ontario\'s top aeroponic brand.'
      },
      {
        heading: 'Challenge',
        text: 'Cannabis consumers care most about THC and are wary of brands. The legal market is crowded with new brands monthly. Technical explanations of aeroponics would not work because people do not read detailed copy in dispensaries. Cannabis Act rules against mascots limited visual assets.'
      },
      {
        heading: 'Opportunity',
        text: 'What if consumers were more likely to engage with mystery than explanation? Rather than functional storytelling, could we spark curiosity?'
      },
      {
        heading: 'Insight',
        text: 'Aeroponics creates unique root structure: dense, white, exposed. Most brands use a leaf, logo, or lifestyle photo. A full-body root sculpture would stand out and prompt curiosity.'
      },
      {
        heading: 'Strategy',
        text: 'We used AI to connect aeroponic root structures to human-sized form that adhered to Cannabis Act rules. The Rootsuit became the visual anchor of brand identity, appearing in campaign photography, OOH placements, dispensary displays, and digital creative.'
      },
      {
        heading: 'Methodology',
        text: 'With Runway ML and Midjourney, we explored how aeroponic root structures could take human-sized form. AI outputs guided costume designers in building the final suit. The campaign language reinforced roots positioning with lines like: "We\'re your guy with the roots to prove it." "You will not find dirt on us because we do not use any." The integrated launch ran across brand voice development, a visual identity rebrand, refreshed sales collateral, PR, print, digital display, audio placements, dispensary OOH, and event activations.'
      }
    ],
    proof: [
      'Complete sell-out of J.R. Strain products on OCS within one week of launch',
      '51% surge in average weekly sales in Toronto, with 38% additional boost following KIND event',
      '39% sales increase across Ontario, with 14% lift post-KIND',
      '2,000 additional units in retail purchase orders directly attributed to campaign',
      '3M+ targeted Ontario impressions and 2,000 page engagements in three weeks',
      '134K OOH impressions under Cannabis Act restrictions',
      '48K organic impressions from Twitter and Reddit cannabis communities',
      'Coverage: Campaign Canada (https://www.campaigncanada.ca/article/cannabis-brand-j-r-strain-shows-off-its-roots/476bhytgn4t9x1zwxwbed7ftd3)'
    ],
    team: [
      'Paul Lawton: Qualitative and quantitative research, campaign strategy, strategic unlock, brand architecture',
      'Amanda Wood: Creative Director, Design, Copy, Costume Development',
      'Katelyn Randal: Client Experience',
      'Tyler Stuart: Dycar Client',
      'Media: The Flower Agency',
      'Cannabis Act compliance'
    ],
    images: [
      'https://profectio.com/wp-content/uploads/2023/08/JR-Strain-KIND-Summer-Fair-scaled.jpg',
      'https://profectio.com/wp-content/uploads/2023/08/JR-Strain-Campaign-Image.png',
      'https://www.campaigncanada.ca/media/Article/News/Screen-Shot-2023-08-15-at-10.00.25-AM.png?width=1248',
      'https://offlinehbpl.hbpl.co.uk/news/ACC/Screen-Shot-2023-08-16-at-1.16.36-PM-239x300.png',
      '/images/jr-strain/jr-strain-1.png',
      '/images/jr-strain/jr-strain-2.png',
      '/images/jr-strain/jr-strain-3.png',
      '/images/jr-strain/jr-strain-4.jpg',
      '/images/jr-strain/jr-strain-5.jpg',
      '/images/jr-strain/jr-strain-6.png'
    ]
  },
  {
    id: 'collective-arts',
    category: 'Campaign Strategy',
    title: "COLLECTIVE ARTS: DRINK CREATIVELY",
    year: '2023',
    tags: '',
    summary: "Reclaimed creative leadership by making scale and depth of artist network visible",
    sections: [
      {
        heading: 'Summary',
        text: 'Collective Arts Brewing was among Canada\'s first craft breweries to feature world-class art on packaging, commissioning artists from around the world and turning the can into a canvas. This visual identity became the brand\'s most recognizable asset. But competitors copied the approach, making art-forward packaging less distinctive. Collective Arts had never run paid advertising. We faced a differentiation crisis, not just a messaging problem. We framed this through Jenni Romaniuk\'s Distinctive Brand Assets framework: brands don\'t grow through meaningful differentiation, they grow through meaningless distinctiveness. Collective Arts needed to reestablish uniqueness by showing what no imitator could replicate: the scale and depth of the artist community. We produced "Drink Creatively," a brand video that functioned as a Distinctive Brand Asset activation. Every shot featured different artist-submitted work brought to life through VFX and motion design, with the product at centre.'
      },
      {
        heading: 'Background',
        text: 'Collective Arts Brewing was among Canada\'s original craft breweries to feature world-class art on packaging. This visual identity became recognizable and iconic. But after years of success, competitors copied the approach, making art-forward packaging less distinctive. Collective Arts had never run paid advertising.'
      },
      {
        heading: 'Objective',
        text: 'Launch Collective Arts\' first-ever paid campaign to reassert creative leadership and remind consumers that Collective Arts is as creative on the inside as on the outside.'
      },
      {
        heading: 'Challenge',
        text: 'The brand\'s main differentiator, art on packaging, had been diluted by imitators. Collective Arts needed to reclaim creative leadership without repeating what competitors were now doing. They were starting from scratch with paid media: no past data, no benchmarks.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the campaign didn\'t need to defend creative credentials but made the scale and depth of the artist network visible for the first time?'
      },
      {
        heading: 'Insight',
        text: 'We framed this through Distinctive Brand Assets framework. Collective Arts had a distinctiveness crisis, not a differentiation crisis. Competitors had copied the surface-level expression without replicating the underlying asset. The campaign needed to re-establish uniqueness on the Distinctive Asset Grid by showing what no imitator could replicate.'
      },
      {
        heading: 'Strategy',
        text: 'We developed "Drink Creatively" as the campaign platform. We produced a brand video that functioned as a Distinctive Brand Asset activation. Every shot featured different artist-submitted work brought to life through VFX and motion design, with the product at centre. The creative approach followed Romaniuk\'s formation formula: reach, co-presentation, and consistency.'
      },
      {
        heading: 'Methodology',
        text: 'The campaign ran across paid social (media hero), digital display, a branded landing page, YouTube, and advertorial content partnership with Toronto Life. Media strategy treated paid social as the primary driver of reach, with programmatic and display as supporting channels.'
      }
    ],
    proof: [
      'Campaign exceeded performance targets by 105%, generating 17.3M impressions against 16.5M goal',
      'Paid social generated over 10.5M impressions, surpassing goals by 11.5x',
      'Full-length brand video became top-performing organic video on Collective Arts YouTube channel',
      'Paid media drove measurable increase in organic content performance across Twitter, Instagram, YouTube',
      'Re-established Collective Arts\' visual identity as distinctive brand asset on Distinctive Asset Grid'
    ],
    team: [
      'Paul Lawton, Chief Strategy Officer',
      'Amanda Wood, Chief Creative Officer',
      'Jill Krajewski, Copywriter',
      'Leah Whitney, Copywriter',
      'Katy Holden, Strategy',
      'June Findlay, Content Strategy',
      'Hayden Lawton, Strategy',
      'Lena Hess, Client Experience',
      'Jamie Brunton, Producer',
      'Rebecca Peters, Media Relations',
      'Steve St. Jean, Creative Director, Collective Arts',
      'Toni Shelton, Brand Director, Collective Arts',
      'Production: Feather Studio'
    ],
    images: [
      '/images/collective-arts/mario_carpe_art_director_graphic_designer_illustrator_craft_beer_canada_collective_arts_brewing_design_illustration_ipa_packaging_presentation_15.jpg',
      '/images/collective-arts/mario_carpe_art_director_graphic_designer_illustrator_craft_beer_canada_collective_arts_brewing_design_illustration_ipa_packaging_presentation_15-1.jpg',
      '/images/collective-arts/mario_carpe_art_director_graphic_designer_illustrator_craft_beer_canada_collective_arts_brewing_design_illustration_ipa_packaging_presentation_15-2.jpg',
      '/images/collective-arts/56d1af106719649.Y3JvcCwxNjMxLDEyNzYsMjQsMjA.jpg',
      '/images/collective-arts/download.jpg',
      '/images/collective-arts/MZE5YUOORFA5TJIODCYIHGDAHE.avif'
    ],
    videos: ['https://www.youtube.com/watch?v=it5omoE8KMI']
  },
  {
    id: 'up-cannabis',
    category: 'Campaign Strategy',
    title: "UP CANNABIS: MEA CULPA",
    year: '2020-2023',
    tags: '',
    summary: "Turned negative reviews into campaign creative, rebuilding trust and boosting sales 130%",
    sections: [
      {
        heading: 'Summary',
        text: 'UP Cannabis struggled after legalization. The rush to market led to issues: dry flower, weak potency, inconsistent quality. UP responded by improving growing methods and launching a new lineup with a 20% THC guarantee. But the brand faced a trust problem because customers had been let down and made their feelings known on Reddit, Twitter, and in dispensary reviews. We built the campaign around real negative reviews, quoting them exactly and crediting original usernames. Each ad spoke directly to a specific critic, showing their complaint in big letters and responding with an apology and the UP20 guarantee. The tone was self-aware, friendly, and very Canadian. By acknowledging people\'s frustrations instead of ignoring them, we turned critics into supporters. The community did not just accept the apology; they celebrated it because someone was finally listening.'
      },
      {
        heading: 'Background',
        text: 'UP Cannabis struggled after legalization. The rush to market on October 17, 2018, led to issues: dry flower, weak potency, inconsistent quality. UP responded by improving growing methods and launching a new lineup with a 20% or higher THC guarantee. Still, the brand faced a trust problem.'
      },
      {
        heading: 'Objective',
        text: 'Encourage Canadian cannabis consumers to reconsider UP Cannabis by acknowledging past failures and reintroducing the product with a credible quality guarantee.'
      },
      {
        heading: 'Challenge',
        text: 'Regaining trust in cannabis is difficult. When customers get a bad product, they talk about it publicly. UP\'s negative reviews were out in the open. Strict Cannabis Act rules meant we could not use product sampling to win people back.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the best way for a cannabis brand to regain trust after letting people down was to do something very Canadian: apologize, not generic, but using the negative reviews themselves as creative?'
      },
      {
        heading: 'Insight',
        text: 'We would use the negative reviews themselves as our creative, using real customer words to show we were listening.'
      },
      {
        heading: 'Strategy',
        text: 'We built the campaign around real negative reviews, quoting them exactly and crediting original usernames. Each ad spoke directly to a specific critic, showing their complaint and responding with an apology and the UP20 guarantee. The tone was self-aware, friendly, and very Canadian.'
      },
      {
        heading: 'Methodology',
        text: 'We refreshed the brand identity and ran creative across print, out-of-home, digital, paid social, and advertorials, as well as a new website. The campaign focused on Reddit and cannabis Twitter, where complaints first appeared.'
      }
    ],
    proof: [
      '130% lift in sales as measured by OCS sales data and brand lift study',
      '24.3M total impressions, surpassing 20.8M target by 117%, at $9.64 CPM (goal: $11.25)',
      '4.7M earned social impressions from cannabis subreddit conversations, plus 140K+ on Twitter',
      'Strategy Magazine coverage in December 2020; top three most-read brand articles of the year within 3 weeks',
      'Reddit users called it the "first interesting cannabis ad campaign since legalization"'
    ],
    team: [
      'Paul Lawton, Chief Strategy Officer: Brand Architecture, Brand Identity Refresh, Go-to-Market Plan, Media Strategy and Buying',
      'Amanda Wood, Chief Creative Officer: Development, Brand Identity Refresh, Print, OOH, Digital',
      'Hayden Lawton, Strategy',
      'Lauren Knox, Account Lead',
      'Jessica Harkes, Brand Manager, HEXO',
      'Jessica Harkes, CMO, HEXO',
      'Cannabis Act compliance'
    ],
    images: [
      '/images/up-cannabis/up-20percent.png',
      '/images/up-cannabis/up-smoked-meat.png',
      '/images/up-cannabis/up-sorry-bud.png',
      '/images/up-cannabis/up-mulligan.jpg',
      '/images/up-cannabis/up-cannabis-1.png',
      '/images/up-cannabis/up-cannabis-2.jpg',
      '/images/up-cannabis/up-cannabis-3.jpg',
      '/images/up-cannabis/up-cannabis-4.png'
    ]
  },
  {
    id: 'scotiabank',
    category: 'Campaign Strategy',
    title: "SCOTIABANK: HOCKEY 24",
    year: '2019-2020',
    tags: '',
    summary: "Ethnographic research revealed hockey's deepest meaning is community, not competition",
    sections: [
      {
        heading: 'Summary',
        text: 'Scotiabank supported over 8,000 community hockey teams across Canada and held sponsorship positions with the NHL and Hockey Night in Canada. The bank was tied for first in unaided recall as a hockey sponsor, but struggled to demonstrate fit between master brand and sponsorship properties. Over two months of ethnographic fieldwork in community rinks across the GTA, we interviewed parents, coaches, referees, community centre staff, and players of all ages. The research surfaced a finding that contradicted category assumptions: parents do not put their kids in hockey for exercise or fun. The overwhelming motivation was social and developmental: empathy, collaboration, bonding, grit, confidence, responsibility. Hockey\'s deepest meaning is community formation, not competition. Early morning drives, parents behind glass, volunteer coaches, bonds between families who would never otherwise meet, that is the real story. This insight became the foundation for Hockey 24: A Film by Canada, a 90-minute feature-length documentary that scaled the community-level insight into a national participatory film project.'
      },
      {
        heading: 'Background',
        text: 'Scotiabank held sponsorship positions with the NHL, Hockey Night in Canada, and individual teams. The bank was tied for first in unaided recall as a hockey sponsor, but had a specific weakness: it fell short in demonstrating fit between master brand and sponsorship properties. The existing "Heroes of Hockey Day" campaign produced adequate branded content but did nothing to deepen emotional connection.'
      },
      {
        heading: 'Objective',
        text: 'Redefine Scotiabank\'s hockey content strategy by grounding it in real insight about what hockey means to Canadian families, and use that research to shift the campaign toward content people actually want to watch.'
      },
      {
        heading: 'Challenge',
        text: 'Sponsorship marketing in hockey defaults to logo placement and manufactured enthusiasm. Scotiabank\'s existing content sat firmly in the second category. The brand\'s own research showed that awareness of sponsorship properties influenced performance, but the content itself was not building affinity that justified the spend.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the research revealed something that contradicted category assumptions, something that could reshape how the company talked about hockey entirely?'
      },
      {
        heading: 'Insight',
        text: 'Over two months of ethnographic fieldwork, interviewing parents, coaches, referees, and players, we found that parents do not put kids in hockey for exercise or fun. Seventy-five percent of values parents cited were social. Twenty-five percent were individual. Hockey\'s deepest meaning is community formation, not competition.'
      },
      {
        heading: 'Strategy',
        text: 'We used ethnographic findings to build a tension map that reframed the campaign. The core tensions: childhood is being eroded by technology; today\'s youth lack grit, but hockey builds it; it is harder to form lasting friendships, but hockey is intensely social. This framework pivoted "Heroes of Hockey Day" away from manufactured content toward real community stories. It became the foundation for Hockey 24: a 90-minute feature-length documentary inviting all Canadians to submit video footage capturing a single day in community hockey. Twenty-five professional documentary crews were dispatched across the country.'
      },
      {
        heading: 'Methodology',
        text: 'Ethnographic research conducted over two months in community rinks across the GTA, working alongside cultural anthropologist Stephanie Creighton. We interviewed 14+ informants across parents, coaches, referees, community centre staff, and players. The research surfaced core values and tensions. The framework became the foundation for Hockey 24, a participatory film project that centred stories from LGBTQ community, new Canadians, Indigenous communities, and people with physical disabilities.'
      }
    ],
    proof: [
      '500,000+ Canadian homes tuned in for premiere: 3rd most-watched show in Canada that day',
      '#Hockey24 was top 3 trending hashtag on Twitter during broadcast',
      '99% lift in brand awareness for Scotiabank, with measurable improvements in propensity to consider and likelihood to recommend',
      'CMA Gold (Business Impact, 2020), CMA Silver (Innovative Media, 2020)',
      'Clio Sports Bronze (Branded Entertainment & Content, 2020)',
      'The One Show Finalist (Branded Entertainment, User-Generated Content, 2020)',
      'SMCC Sponsorship Marketing Awards Gold (Diversity, Equity & Inclusion, 2021)',
      'Official Selection at 12+ international film festivals'
    ],
    team: [
      'PK Lawton: Lead Strategist, Ethnographic Research, Audience Analysis, Strategic Narrative',
      'Stephanie Creighton: Cultural Anthropologist, Ethnographic Research',
      'Agency: The Mark (Hayes Steinberg, CCO/EP; Kyle Scotland and Jason Sweeney, Directors)',
      'Client: Scotiabank (Clinton Braganza, CMO; Mike Tasevski, Sponsorship Marketing)',
      'Partners: Sportsnet/Rogers (Broadcast), Hot Docs (Streaming)'
    ],
    images: [
      'https://mma.prnewswire.com/media/1026263/Scotiabank_Lace_up_your_skates_and_grab_your_camera__Scotiabank.jpg?p=facebook',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjHTFMoTD6fbNas_57wGTLos2hxzdcS_2T_Q&s'
    ],
    videos: ['https://www.youtube.com/watch?v=habAwdCOQHk']
  },
  {
    id: 'tweed',
    category: 'Campaign Strategy',
    title: "TWEED: HI / DON'T DRIVE HIGH",
    year: '2017-2019',
    tags: '',
    summary: "Proved cannabis brand could reach wide audience through education and responsibility",
    sections: [
      {
        heading: 'Summary',
        text: 'On October 17, 2018, Canada became the first G7 country to legalize recreational cannabis. The Cannabis Act brought strict marketing rules similar to tobacco. Brands could not use lifestyle ads, target youth, use celebrities, sponsor events, or do much out-of-home or broadcast advertising. Canopy Growth put their existing medical brand, Tweed, at the centre. We developed "Hi.", a simple phrase that introduced the brand and gave a playful nod to cannabis culture. The campaign sent people to Tweed.com where Canadians could find answers to real questions. Education was the core of the brand strategy. It ran across out-of-home ads nationwide, restaurant and bar activations on 4/20, digital ads, and over 250 events across the country. After October 17, most traditional cannabis marketing was banned. We built "Don\'t Drive High", a three-way partnership with MADD Canada and Uber Canada. The Cannabis Act did not allow cannabis brands to use out-of-home advertising, but public safety campaigns could. By making the campaign a genuine social-impact effort focused on preventing impaired driving, Tweed was able to use OOH, broadcast, and digital ads that would normally be restricted. Together, these two campaigns created the industry playbook for reaching wide audiences through education and responsibility.'
      },
      {
        heading: 'Background',
        text: 'On October 17, 2018, Canada became the first G7 country to legalize recreational cannabis. Most people did not know the difference between THC and CBD and held many misconceptions. The client wanted people to ask for Tweed, not just weed. Canopy Growth put their existing medical brand, Tweed, at the centre.'
      },
      {
        heading: 'Objective',
        text: 'Build brand awareness during pre-legalization window and establish Tweed as the first cannabis brand Canadians would think of when legalization arrived. Then, keep Tweed visible after legalization even though most traditional cannabis marketing was now banned.'
      },
      {
        heading: 'Challenge',
        text: '"Hi.": The time frame was short and results would last. Any brand awareness built before October 17 would endure, since new marketing would not be allowed after. The target audience was beyond the core cannabis consumer to include regular Canadians who were anxious, uninformed, and skeptical. "Don\'t Drive High": After October 17, Tweed could not use out-of-home ads, sponsor events, use lifestyle advertising, or broadcast. All usual marketing channels were closed.'
      },
      {
        heading: 'Opportunity',
        text: '"Hi.": Information, not aspiration, was what Canadians needed. The brand that showed up as a friendly, approachable educator would own the space that actually mattered: trust. "Don\'t Drive High": Could a genuine public safety campaign become the marketing vehicle for a cannabis brand post-legalization?'
      },
      {
        heading: 'Insight',
        text: '"Hi.": Information, not aspiration. "Don\'t Drive High": The Cannabis Act did not allow cannabis brands to use out-of-home advertising, but public safety campaigns could. By making the campaign a true social-impact effort focused on preventing impaired driving, Tweed could use restricted channels.'
      },
      {
        heading: 'Strategy',
        text: '"Hi.": Developed the strategy around "Hi.", a simple phrase that introduced the brand. The campaign sent people to Tweed.com where Canadians could find answers. Education was the core. "Don\'t Drive High": Built a three-way partnership with MADD Canada and Uber Canada. Tweed brought category credibility; the world\'s largest cannabis company proactively telling consumers not to drive high was unprecedented. The creative suggested 101 things Canadians could do instead of driving (baking a cookie, popping bubble wrap, calling grandparents). The tone was playful, using humour to share a serious message.'
      },
      {
        heading: 'Methodology',
        text: '"Hi.": Campaign ran across out-of-home ads nationwide, restaurant and bar activations on 4/20, digital and mobile ads, Live Nation concert partnerships, over 250 events across the country including Pride and Calgary Stampede, PR through Citizen Relations, and content through Merry Jane. Tweed also launched the Tweed Collective, a $20 million, four-year commitment to social initiatives. "Don\'t Drive High": Campaign used out-of-home ads (first for cannabis brand under Cannabis Act), pre-roll video, radio, and interactive website at DontDriveHigh.ca.'
      }
    ],
    proof: [
      '"Hi.": 700+ million media impressions across approximately 200 days',
      '190 million paid impressions from digital and OOH',
      '38% lift in brand awareness',
      '95% month-over-month increase in website traffic',
      '92% higher click-through rates than cannabis industry average',
      '34,000 consumers signed up for Tweed communications',
      'Tweed achieved highest brand awareness among Canadian cannabis consumers, position held for years',
      '"Don\'t Drive High": Three Gold awards at AToMiC (Best Out of Home, Cannabis Branding)',
      'Shopper Innovation + Activation Awards Silver (Public Service Integrated Media Campaign)',
      'ADCANN Campaign of the Year (2019)',
      'FIA Best Road Safety Intervention by a Private Company, global road safety authority',
      'First cannabis brand to deploy out-of-home advertising under Cannabis Act',
      '40,000 Uber promo codes distributed through DontDriveHigh.ca'
    ],
    team: [
      '"Hi.", Agency: Cossette (Wes Wolsh, CSO; Sarah Thompson / PK Lawton, VP Strategy; Natasha Michalowska and Cooper Evoy, ACD). Cossette Media, Citizen Relations (PR), Behaviour (Experiential), Merry Jane (Content). Client: Canopy Growth (David Bigioni, CMO).',
      '"Don\'t Drive High", Agency: Cossette (Peter Ignazi and Carlos Moreno, Global CCOs; Paul Lawton, VP Strategy; Rosie Gentile, SVP Strategy). Cossette Media, Citizen Relations. Client: Canopy Growth (David Bigioni, CCO), MADD Canada (Andrew Murie, CEO), Uber Canada (Lindsay Liptok, Head of Marketing).',
      'Cannabis Act compliance'
    ],
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/28514b85214639.5d75676aebe8e.jpg'
    ]
  },
  {
    id: 'coleman',
    category: 'Campaign Strategy',
    title: "COLEMAN: GET OUTSIDE DAY",
    year: '2014-2017',
    tags: '',
    summary: "Tripled year-over-year media coverage by turning brand into civic movement",
    sections: [
      {
        heading: 'Summary',
        text: 'Coleman Canada wanted to stay relevant in a mature outdoor recreation market where people thought about the brand once a year at the start of camping season. While the company was well known for products, it lacked a cultural presence. Canadians had no reason to think about Coleman except when making a purchase. We created Get Outside Day as a Coleman-owned platform. Coleman had commissioned research showing that 64% of Canadians spend two hours or fewer per week doing outdoor recreation. A petition to the Canadian government gave us an organizing principle that could unify earned, social, retail, and digital under a single action. Media relations, social content, retail partnerships, and the microsite all pointed at the same call-to-action: sign the petition, urge the government to declare a national Get Outside Day. That unified call-to-action solved the problem of integrated campaigns where every channel runs disconnected KPIs. We positioned Coleman not as a brand selling tents but as the company leading a national effort. The government-relations angle made it a news story rather than an ad. The strategy had three parts: the movement frame, the content engine (GetOutsideCanada.com filled with broad, accessible content), and the action spectrum framework, refined from Sunbeam.'
      },
      {
        heading: 'Background',
        text: 'Coleman Canada wanted to stay relevant in a mature outdoor recreation market where people thought about the brand once a year at the start of camping season. The company was well known for products but lacked cultural presence.'
      },
      {
        heading: 'Objective',
        text: 'Create a platform that kept Coleman in the conversation year-round, connected the brand to a bigger cultural idea, and generated earned media far beyond what the budget would suggest.'
      },
      {
        heading: 'Challenge',
        text: 'Outdoor gear is seasonal and practical. People do not follow a tent company on social media for entertainment. The category\'s social presence was quiet. Coleman\'s Facebook page had fewer than 4,000 followers.'
      },
      {
        heading: 'Opportunity',
        text: 'What if we gave people a reason to engage with the brand that was not about buying a cooler, but about supporting a civic effort?'
      },
      {
        heading: 'Insight',
        text: 'A petition works as a campaign mechanic because it gives every audience touchpoint a single, clear action. Media relations, social content, retail partnerships, and the microsite all point at the same call-to-action. That unified action solves the chronic problem of integrated campaigns.'
      },
      {
        heading: 'Strategy',
        text: 'We created Get Outside Day as a Coleman-owned platform and launched it in 2014. The movement frame positioned Coleman not as a brand selling tents but as the company leading a national effort. The petition to declare a national holiday gave the campaign a civic dimension, earning media coverage far beyond what a product campaign could generate.'
      },
      {
        heading: 'Methodology',
        text: 'We built GetOutsideCanada.com as the campaign hub and filled it with broad, accessible content. The Walmart "30 Ideas" page averaged over two minutes per visit. We brought in Dr. Dina Kulik, a pediatrician with media credibility, to lead broadcast segments. We designed the action spectrum framework, first developed for Sunbeam, adding co-produce and produce tiers to capture the petition mechanic and UGC volume. We mapped every channel and content type to a specific engagement tier.'
      }
    ],
    proof: [
      '2014: 19 million media impressions across 68 media hits. Facebook engagement increased 12x from standing start of under 4,000 followers.',
      '2015: 59 million media impressions, nearly 3x the 20M target. 228 media stories. 9.8M social impressions. 10.6% engagement rate (vs. 2.5% industry average). Petition secured 1,251 signatures with 70.4% conversion rate. Over 2,500 pieces of UGC.',
      '2016-2017: Campaign continued with expanded partner network. Over 1,350 petition signatures. Coleman declared July 15th Get Outside Day, taking entire team to Bronte Creek Provincial Park.',
      'Total earned media footprint across program exceeded 78 million impressions, built primarily on earned and owned channels'
    ],
    team: [
      'PK Lawton, Strategy and Media Buying',
      'Craig Ritchie, Creative Direction',
      'Jennifer Meehan and Heather Meehan, Account Leads',
      'Lauren Harrison, Account Support',
      'Client: Coleman Canada / Jarden Consumer Solutions (Ezio Sbrizzi, President; Dawn Whiteside, Client Lead)',
      'Partners: Walmart Canada, Canadian Tire (Retail), Dr. Dina Kulik (Spokesperson)'
    ],
    images: []
  },
  {
    id: 'sunbeam',
    category: 'Campaign Strategy',
    title: "SUNBEAM: SUPPORTS WITH WARMTH",
    year: '2013-2015',
    tags: '',
    summary: "Created measurement system that made commodity brand most-engaged in category",
    sections: [
      {
        heading: 'Summary',
        text: 'Sunbeam Canada was bringing back its electric blanket line in a market where customers had no real loyalty and no brand story. Heated blankets are a seasonal, low-interest product that often goes unnoticed. With a limited budget, we had to get noticed without relying on paid media. We partnered with Sunbeam and the Canadian Cancer Society\'s Wheels of Hope program to build a multi-year, integrated campaign. We connected Sunbeam\'s core value of warmth to Wheels of Hope mission, where volunteer drivers help keep cancer patients warm and supported on their way to treatment. We created a proprietary five-level measurement model: applause (likes and passive support), share (word-of-mouth), simple engagement (comments), deep engagement (user-generated content or independent action), and action (volunteering, donating, or buying). We adjusted in real time, if shares were low, we changed content. The action spectrum became our core strategic innovation. Cause-story content consistently outperformed product and giveaway content on both reach and engagement depth. Sunbeam was the only brand in the Canadian home comfort category generating meaningful social engagement during this period.'
      },
      {
        heading: 'Background',
        text: 'Sunbeam Canada was bringing back its electric blanket line in a market with no real loyalty and no brand story. Heated blankets are seasonal, low-interest products that often go unnoticed.'
      },
      {
        heading: 'Objective',
        text: 'Build lasting brand awareness through a campaign that would earn media coverage, spark social engagement, and give people a reason to care about Sunbeam beyond seeing it in stores.'
      },
      {
        heading: 'Challenge',
        text: 'The category was quiet. Canadian competitors such as KitchenAid and Oster were running product promotions but getting almost no engagement. Sunbeam\'s Facebook page had fewer than 1,200 followers.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the most engaging content was not about the brand itself, but about real people whose stories connected to the brand\'s core value?'
      },
      {
        heading: 'Insight',
        text: 'A first-person story from a Wheels of Hope volunteer driver generated significantly higher engagement than the next-best-performing product post. The brand\'s role was to step back and let people tell their own stories.'
      },
      {
        heading: 'Strategy',
        text: 'We partnered with Sunbeam and the Canadian Cancer Society\'s Wheels of Hope program. We connected Sunbeam\'s core value of warmth to the Wheels of Hope mission, where volunteer drivers help keep cancer patients warm and supported. This was more than putting a logo on a check.'
      },
      {
        heading: 'Methodology',
        text: 'We created a proprietary five-level measurement model: applause (likes), share (word-of-mouth), simple engagement (comments), deep engagement (UGC), and action (volunteering, donating, buying). Each type of content and channel matched a specific level. We adjusted in real time.'
      }
    ],
    proof: [
      '23 million earned media impressions across 108 media placements (over three campaign cycles)',
      '6.5 million social impressions',
      'Engagement rate peaked at 19.5%, nearly 8x industry average',
      'Rally cry video: 53,000+ views; 2015 version beat prior year by 55% in first month',
      'Facebook page grew 73% during November 2015 push alone',
      'Cause-story content consistently outperformed product and giveaway content on reach and engagement depth',
      'Sunbeam was the only brand in Canadian home comfort category generating meaningful social engagement during this period'
    ],
    team: [
      'PK Lawton, Strategy and Media Buying',
      'Craig Ritchie, Creative Direction',
      'Jennifer Meehan, Account Lead',
      'Lauren Harrison, Account Support',
      'Agency: Cohn & Wolfe (now Burson)',
      'Client: Jarden Canada / Newell Brands (Jamie Libregts, Client Lead)'
    ],
    images: []
  },

  // BRAND ARCHITECTURE
  {
    id: 'madegood',
    category: 'Brand Architecture',
    title: "MADEGOOD: FOR ALL THE GOOD REASONS",
    year: '2023-2024',
    tags: '',
    forceBold: true,
    summary: "Shifted snack brand from lunchbox image to values-led identity across occasions",
    sections: [
      {
        heading: 'Summary',
        text: 'MadeGood had a loyal following in Canada as an allergen-free snack for school lunches. In the U.S., the market was bigger and more crowded, and the lunchbox positioning limited reach. The U.S. snack market is saturated with better-for-you brands competing on nearly identical claims: organic, non-GMO, clean label. MadeGood had real product advantages (free from top eight allergens, B-Corp certified, vegetable-derived nutrients) but no strategic framework to connect those features to emotional truth. We positioned MadeGood around "For All the Good Reasons", a platform that reframed the brand\'s nutritional depth as proof of genuine care, more than marketing copy. We built the full architecture around "The Optimistic Neighbor" personality with "Highly Thoughtful Snacks" as the consumer-facing brand idea. Our research showed that the main audience, "The Balanced Snacker," was not after the cleanest label but a brand that matched their values while addressing the gap between what brands said and what people believed. The strategy shifted the brand from a functional allergen-free play to a values-led identity that could stretch across occasions, audiences, and channels.'
      },
      {
        heading: 'Background',
        text: 'MadeGood, owned by Riverside Foods, had a loyal following in Canada as an allergen-free snack for school lunches. In the U.S., the market was bigger and more crowded, and the lunchbox positioning limited reach.'
      },
      {
        heading: 'Objective',
        text: 'Create a master brand architecture, define a consumer persona, and build a content strategy to help MadeGood expand in the U.S. with a clear identity and value.'
      },
      {
        heading: 'Challenge',
        text: 'The U.S. snack market is saturated with better-for-you brands competing on nearly identical claims. MadeGood had real product advantages but no strategic framework to connect features to emotional truth. The brand was pigeonholed as a children\'s snack, limiting purchase occasions.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the allergen-free story was not about restriction, but about inclusion? What if the brand\'s real competitive advantage was not any single ingredient claim, but the sheer density of reasons to choose it?'
      },
      {
        heading: 'Insight',
        text: 'Our research showed that "The Balanced Snacker" was not after the cleanest label or richest treat. They wanted a brand that matched their values but struggled to tell which brands were truly authentic.'
      },
      {
        heading: 'Strategy',
        text: 'We positioned MadeGood around "For All the Good Reasons", a platform that reframed the brand\'s nutritional depth as proof of genuine care. The strategy shifted the brand from a functional allergen-free play to a values-led identity. We built the full architecture around "The Optimistic Neighbor" personality with "Highly Thoughtful Snacks" as the consumer-facing brand idea.'
      },
      {
        heading: 'Methodology',
        text: 'Research program: qualitative research including in-depth interviews, focus groups across multiple U.S. markets, ethnographic studies, and consumer diaries. Quantitative research including surveys, market segmentation analysis, trend analysis, and consumer behaviour modelling. Tension framework: We built a proprietary tension segmentation model mapping two axes of consumer conflict. Experience vs. Function captured the pull between taste indulgence and health practicality. Idealism vs. Pragmatism mapped the gap between aspirational healthy eating and real-world convenience. This produced four distinct consumer personas. We built a full brand architecture including purpose, promise, unique point, personality, and voice. We created the "Highly Thoughtful Snacks" platform and strategy with a brand manifesto video, influencer partnerships, and full content plan.'
      }
    ],
    proof: [
      'MadeGood sales increased 26.9% in 2023',
      'Brand ranked #43 on Instacart\'s top 75 innovative, emerging brands with explosive growth',
      'Brand architecture became the operating framework for MadeGood\'s global marketing team',
      'Strategy informed all subsequent campaigns, product development, and media planning'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy and Research Lead',
      'Melissa Eshaghbeigi, Strategy',
      'Craig Ritchie, Creative Director',
      'Nicole Bleiwas, CMO, Riverside Foods',
      'Jill Geromino, Senior Director of Marketing, MadeGood'
    ],
    images: [
      'https://www.madegoodfoods.com/cdn/shop/files/MGUS_SHOPALL_HERO_DESKTOP.png',
      'https://cdn.prod.website-files.com/688121391a3801b69772fa7d/689b83bb4ee355629d7d2d44_MadeGood_projectArtboard-1.png',
      '/images/madegood/madegood-1.jpg',
      '/images/madegood/madegood-2.jpg',
      '/images/madegood/madegood-3.png',
      '/images/madegood/madegood-4.jpg',
      '/images/madegood/madegood-5.jpg',
      '/images/madegood/madegood-6.png',
      '/images/madegood/madegood-7.png',
      '/images/madegood/madegood-8.png',
      '/images/madegood/madegood-9.png',
      '/images/madegood/madegood-10.png',
      '/images/madegood/madegood-11.png',
      '/images/madegood/madegood-12.jpg'
    ]
  },
  {
    id: 'pangea',
    category: 'Brand Architecture',
    title: "PANGEA: SIMPLE. HONEST. TRANSFERS.",
    year: '2024-2025',
    tags: '',
    summary: "Turned transactional app into culturally fluent brand for Mexican American diaspora",
    sections: [
      {
        heading: 'Summary',
        text: 'Pangea had built a functional, reliable remittance platform. Its core users, first- and second-generation Mexican Americans, were loyal, but the brand had no emotional distinction in a market where every competitor led with fees and speed. The remittance category is commoditized on price and speed. Every player claims to be cheapest or fastest. For the target audience, the act of sending money carries weight that no brand acknowledged: obligation, love, guilt, pride, cultural identity. Pangea needed a position that honoured this complexity without becoming sentimental or heavy-handed. Through listening labs and behavioural research, we found that the audience did not want a remittance brand that understood their culture, they wanted one that respected it enough not to perform understanding. The less the brand inserted itself into the emotional moment, the more trusted it became. We built the position around "Simple. Honest. Transfers.", not a tagline, but a strategic lens applied to every touchpoint. It moved the brand from fintech jargon to human utility. Every communication was evaluated against three questions: Is this simple? Is this honest? Does this get out of the way?'
      },
      {
        heading: 'Background',
        text: 'Pangea had built a functional, reliable remittance platform. Its core users were first- and second-generation Mexican Americans. The brand had no emotional distinction in a market where every competitor led with fees and speed.'
      },
      {
        heading: 'Objective',
        text: 'Define Pangea\'s brand meaning for its core audience and build a strategic system that could flex across markets, moments, and media, starting with a Visa co-marketing partnership.'
      },
      {
        heading: 'Challenge',
        text: 'The remittance category is commoditized on price and speed. Most platforms run identical games from same providers. Pangea needed a position that honoured the complexity of sending money without becoming sentimental. It needed to work in English and Spanish, across digital and retail.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the brand\'s greatest strength was not a feature at all, but the fact that it disappears? The platform works because it gets out of the way of the human act it enables.'
      },
      {
        heading: 'Insight',
        text: 'Through listening labs and behavioural research, we found that the audience did not want a brand that understood their culture, they wanted one that respected it enough not to perform understanding.'
      },
      {
        heading: 'Strategy',
        text: 'We built the position around "Simple. Honest. Transfers.", not a tagline, but a strategic lens applied to every touchpoint. It moved the brand from fintech jargon to human utility.'
      },
      {
        heading: 'Methodology',
        text: 'Phase 1: audience segmentation combining quantitative data with listening labs and stakeholder workshops. Phase 2: behavioural persona development, we created personas like "Fernando" to ground strategy in lived experience. Phase 3: bilingual messaging framework rooted in behavioural insights, designed to feel native in both languages. Phase 4: strategic communications system structured for organizational adoption. Phase 5: Visa Holiday campaign partnership as real-world stress test, with Meta-first content.'
      }
    ],
    proof: [
      '+23% brand-positive sentiment on Meta',
      'Influencer pilots exceeded 2x engagement benchmarks',
      'Visa Holiday campaign: CTR 0.92% / CPV $1.28',
      'Messaging system adopted organization-wide across app store, CRM, and paid media'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Allison Disney, Strategy',
      'Jemilly Castro, Multicultural Strategy and Research',
      'Natasha Oliveras-Figueroa, Copywriter',
      'Jennifer Dunaj, Creative Director',
      'Rachel Boykins, Head of Brand Strategy, Pangea'
    ],
    images: []
  },
  {
    id: 'far-out-crops',
    category: 'Brand Architecture',
    title: "FAR OUT CROPS: BEYOND THE ORDINARY",
    year: '2023-2024',
    tags: '',
    summary: "Built cannabis brand around surreal sensory experience and psychedelic identity",
    sections: [
      {
        heading: 'Summary',
        text: 'A licensed producer needed a new cannabis brand that could stand out in an increasingly commoditized market. The brief was to build something oriented around the experience of consuming cannabis rather than typical category language of strain genetics and THC percentages. The Canadian cannabis shelf is visually monotonous. Most brands cluster around a few aesthetic modes: clean minimalism, street culture, or nature/craft. Standing out requires more than a different colour palette, it requires a completely different visual language. An experience-oriented brand needs to communicate something subjective within a regulatory environment that prohibits most experiential or lifestyle claims. Cannabis consumers who prioritize experience over specs are looking for something they cannot easily describe. The brand needed to evoke a feeling before it explained a product. Visual impact was the entry point; product quality was the proof. We built Far Out Crops as a sensory brand first and a cannabis brand second. The visual identity was designed to stop people in their tracks, psychedelic, surreal, unapologetically loud. The positioning framed the brand as one that transcends traditional category norms.'
      },
      {
        heading: 'Background',
        text: 'A licensed producer needed a new cannabis brand that could stand out in an increasingly commoditized market. The brief was to build something oriented around experience of consuming cannabis.'
      },
      {
        heading: 'Objective',
        text: 'Create a cannabis brand from scratch that resonated with diverse consumer base, educated consumers on experience-oriented cannabis selection, and shifted perceptions in a category stuck in sameness.'
      },
      {
        heading: 'Challenge',
        text: 'The Canadian cannabis shelf is visually monotonous. Standing out requires more than a different colour palette, it requires a completely different visual language.'
      },
      {
        heading: 'Opportunity',
        text: 'What if a cannabis brand looked and felt like nothing else in the category, from a different world entirely?'
      },
      {
        heading: 'Insight',
        text: 'Cannabis consumers who prioritize experience over specs are looking for something they cannot easily describe. The brand needed to evoke a feeling before explaining a product.'
      },
      {
        heading: 'Strategy',
        text: 'We built Far Out Crops as a sensory brand first and a cannabis brand second. The visual identity was designed to stop people in their tracks, psychedelic, surreal, unapologetically loud.'
      },
      {
        heading: 'Methodology',
        text: 'We developed the brand architecture, establishing positioning, personality, and messaging hierarchy. The visual identity was the centrepiece: bold psychedelic typography (liquid, organic letterforms in purple and black), illustrated artwork with surreal motifs, and a hot pink, orange, and black palette. We designed product packaging, sales and go-to-market collateral, the brand website, and merchandise. The Instagram presence (@faroutcrops) was designed as a visual portfolio.'
      }
    ],
    proof: [
      'Far Out Crops launched with a visual identity that was immediately distinctive on shelf and in digital channels',
      'Brand system spanning packaging, merch, social, web was cohesive and unlike any competitor',
      'Psychedelic visual language became recognizable brand asset that drove organic social engagement'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'CM Ruiz, Designer',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      '/images/far-out-crops/far-out-crops-1.png',
      '/images/far-out-crops/far-out-crops-2.png',
      '/images/far-out-crops/far-out-crops-3.png',
      '/images/far-out-crops/far-out-crops-4.png',
      '/images/far-out-crops/far-out-crops-5.png',
      '/images/far-out-crops/far-out-crops-6.png'
    ]
  },
  {
    id: 'highly-dutch',
    category: 'Brand Architecture',
    title: "HIGHLY DUTCH: BEACON OF WEIRD",
    year: '2022-2024',
    tags: '',
    summary: "Reframed organic from certification badge to personality trait and lifestyle",
    sections: [
      {
        heading: 'Summary',
        text: 'Highly Dutch was originally the value-oriented brand from The Green Organic Dutchman. Despite strong sales (best-selling organic 1oz flower SKU in Q4), the brand had no coherent identity. Sales teams and budtenders did not know what it stood for. The "organic" claim was confusing in a cannabis context and insufficiently differentiated. We reframed "organic" from a certification badge to a personality trait. To live in a way that is raw, unfiltered, and true to your own authentic spirit is to be organic. Drawing on the offbeat brilliance of Dutch culture, the new Highly Dutch became "a beacon of weird", celebrating the naturally occurring, unmodified uniqueness in each person. Through consumer research and ethnographic work, we identified "High Flyers": 25-45-year-olds seeking potent, high-quality, good-value dried flower. This group does not care about fitting in. Authenticity is a core value. The word "organic" resonated with them not as a product feature but as an ethos.'
      },
      {
        heading: 'Background',
        text: 'Highly Dutch was originally the value-oriented brand from The Green Organic Dutchman. Despite strong sales, the brand had no coherent identity. Sales teams did not know what it stood for.'
      },
      {
        heading: 'Objective',
        text: 'Create a brand identity and messaging strategy that would tell the story of sustainably and ethically grown organic cannabis in a way that resonated with the target audience.'
      },
      {
        heading: 'Challenge',
        text: 'Two problems at once. First, "organic" in cannabis does not carry the same instant credibility as in food. Second, the brand needed to establish independence from parent company while using the one attribute connecting them.'
      },
      {
        heading: 'Opportunity',
        text: 'What if "organic" was not about what is in the product, but about how you live?'
      },
      {
        heading: 'Insight',
        text: 'Through consumer research and ethnographic work, we identified "High Flyers": 25-45-year-olds seeking potent, high-quality, good-value dried flower. Authenticity is a core value.'
      },
      {
        heading: 'Strategy',
        text: 'We reframed "organic" from a certification badge to a personality trait. The new Highly Dutch became "a beacon of weird", celebrating the naturally occurring, unmodified uniqueness in each person.'
      },
      {
        heading: 'Methodology',
        text: 'Phase 1: consumer research and ethnography to define the target and map competitive field. Brand repositioning centred on "beacon of weird" concept. New visual identity with bright colours and expressive typography. Channel strategy and media planning. Social media and content strategy. Business analytics to track performance. Phase 2: refined the visual identity with new logo design, tightened brand strategy, and produced asset packages for sales teams.'
      }
    ],
    proof: [
      'The repositioned brand gave sales teams and budtenders a story they could articulate',
      'Brand architecture provided internal alignment and external consistency',
      'Visual rebrand differentiated Highly Dutch on shelf in category where most organic brands default to earth tones'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Hayden Lawton, Strategy',
      'Amanda Wood, Chief Creative Officer',
      'Jennifer Dunaj, Lead Designer',
      'Oli Bell, VP, Marketing and Brand',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      '/images/highly-dutch/highly-dutch-1.png'
    ]
  },
  {
    id: 'neighborgoods',
    category: 'Brand Architecture',
    title: "NEIGHBORGOODS: NEIGHBORHOOD CANNABIS CO.",
    year: '2022-2023',
    tags: '',
    summary: "Built brand identity as the act of being local, not claiming a specific geography",
    sections: [
      {
        heading: 'Summary',
        text: 'Battle Green Cannabis needed a wholesale brand that could compete across price points in the U.S. cannabis market while maintaining distinct identity. The U.S. cannabis market is fragmented by state, with different regulatory environments, consumer cultures, and competitive conditions. A national-feeling brand risks feeling generic. A hyper-local brand cannot scale. We designed Neighborgoods as a locally adapted brand system. The core identity, visual language, and messaging architecture were built for market-by-market customization while maintaining brand-level consistency. The positioning, "your local grower," expressed through warm retro-diner aesthetics and friendly typography, was universal enough to travel but specific enough to feel genuine. The target consumer does not just buy cannabis. They identify with it. Legalization was welcome, but it came with a sanitization of the culture they loved. A retail brand that acknowledged this tension, legal but not corporate, compliant but not boring, would earn loyalty that price alone could not.'
      },
      {
        heading: 'Background',
        text: 'Battle Green Cannabis needed a wholesale brand that could compete across price points in the U.S. cannabis market while maintaining distinct identity.'
      },
      {
        heading: 'Objective',
        text: 'Create a new cannabis brand from scratch, name, identity, architecture, packaging, collateral, that could resonate with diverse cannabis consumers and adapt to local markets without losing brand coherence.'
      },
      {
        heading: 'Challenge',
        text: 'The U.S. cannabis market is fragmented by state, with different regulatory environments, consumer cultures, and competitive conditions. A national-feeling brand risks feeling generic. A hyper-local brand cannot scale.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the brand\'s identity was the act of being local, not claiming a specific geography, but embodying the values of supporting your neighbourhood?'
      },
      {
        heading: 'Insight',
        text: 'Through focus groups and interviews with heavy cannabis consumers, we found that community engagement and local business support were stronger purchase drivers than product attributes.'
      },
      {
        heading: 'Strategy',
        text: 'We designed Neighborgoods as a locally adapted brand system. The core identity, visual language, and messaging architecture were built for market-by-market customization while maintaining brand-level consistency.'
      },
      {
        heading: 'Methodology',
        text: 'Audience research and segmentation through focus groups and in-depth interviews with heavy cannabis consumers. We developed the brand name, logo, and visual identity, a retro-Americana aesthetic with teal, cream, and red palette. We designed packaging across product formats. We produced retail and sales collateral, content planning frameworks, and social asset templates. The brand architecture was structured to support local adaptation.'
      }
    ],
    proof: [
      'Neighborgoods launched with a complete brand system spanning retail, digital, collateral, and packaging',
      'Designed for multi-market rollout',
      'Brand architecture supports scaling across states while maintaining local identity'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Allison Disney, Strategy',
      'Hayden Lawton, Strategy',
      'Amanda Wood, Chief Creative Officer',
      'Jennifer Dunaj, Lead Designer',
      'Shaira Santos, Designer',
      'Ben Gaines, Director of Marketing, Wyld Cannabis',
      'Chris Joseph, Founder/CMO, Wyld Cannabis'
    ],
    images: [
      '/images/neighborgoods/neighborgoods-1.png',
      '/images/neighborgoods/neighborgoods-2.jpg',
      '/images/neighborgoods/neighborgoods-3.png',
      '/images/neighborgoods/neighborgoods-4.png',
      '/images/neighborgoods/neighborgoods-5.png',
      '/images/neighborgoods/neighborgoods-6.png'
    ]
  },
  {
    id: 'holy-mountain',
    category: 'Brand Architecture',
    title: "HOLY MOUNTAIN: A MIRROR, NOT A MEGAPHONE",
    year: '2022-2023',
    tags: '',
    summary: "Built value cannabis brand through ethnographic research with heavy users",
    sections: [
      {
        heading: 'Summary',
        text: 'The value flower and concentrate market in Canada was growing fast, but brands competing in the space were largely undifferentiated: generic packaging, commodity positioning, race to the bottom on price. Organigram wanted a new brand that could earn loyalty from heavy users, not just capture their price sensitivity. Heavy cannabis users are the most valuable segment in the industry, but also the most skeptical of brand marketing. They have seen the corporate cannabis playbook and are not buying it. A value brand targeting this audience could not just be cheap. It had to feel authentic to people who can smell inauthenticity at a distance. Through ethnographic research, we found that heavy users carry a specific hostility toward "big weed", the corporate cannabis companies they see as profiting from a culture those companies did not build. This audience does not want to be educated, inspired, or elevated by a brand. They want to be recognized. The brand\'s job was to be a mirror, not a megaphone. We built the brand around a persona called "The Hot Couch Guy", an honest, affectionate representation of the heavy user\'s self-image. Not aspirational, not condescending.'
      },
      {
        heading: 'Background',
        text: 'The value flower and concentrate market in Canada was growing fast, but brands were largely undifferentiated. Organigram wanted a new brand that could earn loyalty from heavy users.'
      },
      {
        heading: 'Objective',
        text: 'Develop a new value cannabis brand built from genuine consumer understanding of heavy users, their lifestyle, values, frustrations with existing market.'
      },
      {
        heading: 'Challenge',
        text: 'Heavy cannabis users are the most valuable segment but also the most skeptical. A value brand targeting this audience could not just be cheap. It had to feel authentic.'
      },
      {
        heading: 'Opportunity',
        text: 'What if a cannabis brand was built to reflect how heavy users actually see themselves, rather than how marketers imagine them?'
      },
      {
        heading: 'Insight',
        text: 'Through ethnographic research, we found that heavy users carry hostility toward "big weed." This audience does not want to be educated or elevated. They want to be recognized.'
      },
      {
        heading: 'Strategy',
        text: 'We built the brand around a persona called "The Hot Couch Guy", an honest, affectionate representation of heavy user\'s self-image. Not aspirational, not condescending.'
      },
      {
        heading: 'Methodology',
        text: 'We started with ethnographic research approach, spending time with Canadian heavy users to map their relationship with cannabis, media consumption, brand perceptions, and purchase drivers. We developed consumer positioning centred on "The Hot Couch Guy" persona. The brand identity drew from dark, atmospheric visuals, misty forests, moody lighting, a halo-over-mountain logo. We used collectible-style strain cards featuring strain information including terpene profiles, flavour notes, and descriptions in audience\'s own language. We developed brand architecture, paid and organic social asset development, and sales assets including merch.'
      }
    ],
    proof: [
      'Holy Mountain launched in December 2022 and received strong consumer reviews',
      'Brand\'s visual identity and strain card system generated organic social sharing',
      'Positioning gave Organigram credible entry into value segment built on audience truth rather than price alone'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Matt Weirr, Strategy',
      'Hayden Lawton, Strategy',
      'Amy Valm, Copywriter, Social Strategy',
      'Shaira Santos, Designer',
      'Jill Garcia, Account Lead',
      'Eric Williams, Organigram, VP Marketing',
      'Tyler Owens, Organigram, Director, Brand & Trade',
      'Mark McKay, Organigram, Director of Communications and Digital Strategy',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      '/images/holy-mountain/holy-mountain-1.jpg',
      '/images/holy-mountain/holy-mountain-2.jpg',
      '/images/holy-mountain/holy-mountain-3.png',
      '/images/holy-mountain/holy-mountain-4.jpg',
      '/images/holy-mountain/holy-mountain-5.png'
    ]
  },
  {
    id: 'shred',
    category: 'Brand Architecture',
    title: "SHRED: BRAND ARCHITECTURE & SOCIAL",
    year: '2021-2023',
    tags: '',
    summary: "Made radical simplicity the entire brand identity in heavily regulated category",
    sections: [
      {
        heading: 'Summary',
        text: 'SHRED launched as the first pre-milled cannabis product on the Canadian market, a format innovation offering genuine convenience in a category obsessed with whole-flower aesthetics. But the brand had no strategic identity to match its product differentiation. Canadian cannabis marketing operates under strict regulatory constraints: no lifestyle imagery, no health claims, limited media channels. Most brands default to product shots and potency stats. SHRED needed a brand voice that cut through sameness without breaking compliance. The product\'s core benefit, convenience, risked reading as low-effort unless the brand owned it with confidence. We positioned SHRED around radical simplicity, in product, in messaging, in visual identity. The communications framework celebrated convenience as a feature. Cannabis consumers who buy pre-milled flower are not looking for a connoisseur experience. They want something that works, every time, without fuss. The brand voice needed to match that: direct, funny, zero pretension.'
      },
      {
        heading: 'Background',
        text: 'SHRED launched as the first pre-milled cannabis product on the Canadian market, a format innovation offering genuine convenience. But the brand had no strategic identity.'
      },
      {
        heading: 'Objective',
        text: 'Build a brand architecture that would differentiate SHRED from the THC-and-terpene arms race, then bring it to life through social content and digital campaigns.'
      },
      {
        heading: 'Challenge',
        text: 'Canadian cannabis marketing operates under strict regulatory constraints. Most brands default to product shots and potency stats. SHRED needed a brand voice that cut through sameness without breaking compliance. The product\'s core benefit risked reading as low-effort.'
      },
      {
        heading: 'Opportunity',
        text: 'What if a cannabis brand\'s personality was as uncomplicated as its product? What if simplicity was not a limitation but the entire identity?'
      },
      {
        heading: 'Insight',
        text: 'Cannabis consumers who buy pre-milled flower are not looking for a connoisseur experience. They want something that works, every time, without fuss.'
      },
      {
        heading: 'Strategy',
        text: 'We positioned SHRED around radical simplicity, in product, in messaging, in visual identity. The communications framework celebrated convenience as a feature.'
      },
      {
        heading: 'Methodology',
        text: 'We developed the brand architecture, defining SHRED\'s personality, voice, visual identity, and messaging hierarchy. We built communications strategy and content planning framework, then executed paid and organic social asset development, sales tools, and digital/programmatic display campaigns. For social, we implemented a reactive content strategy that used topical moments and cultural trends. We designed and built the full brand website.'
      }
    ],
    proof: [
      '200% increase in followers',
      '776% increase in organic impressions',
      'Top-3 share of voice among cannabis brands online',
      'Nominated and short-listed for Best Social Media at 2023 ADCANN Awards',
      'Organically grew social following to over 3,000 followers in less than a year',
      'SHRED remains one of top-performing cannabis brands in Canada'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Amanda Wood, Chief Creative Officer',
      'Leah Whitney, Copywriter, ECD',
      'Hillary Kelebay, Designer, ECD',
      'Matt Weir, Strategy',
      'Hayden Lawton, Strategy',
      'Amy Valm, Copywriter, Social Strategy',
      'Shaira Santos, Designer',
      'Jill Garcia, Account Lead',
      'Eric Williams, Organigram, VP Marketing',
      'Tyler Owens, Organigram, Director, Brand & Trade',
      'Mark McKay, Organigram, Director of Communications and Digital Strategy',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      'https://i0.wp.com/douglasdalecannabis.com/wp-content/uploads/2020/12/Gnarberry.jpg',
      '/images/shred/shred-1.png',
      '/images/shred/shred-2.png',
      '/images/shred/shred-3.jpg',
      '/images/shred/shred-4.png',
      '/images/shred/shred-5.png',
      '/images/shred/shred-6.png',
      '/images/shred/shred-7.png',
      '/images/shred/shred-8.jpg',
      '/images/shred/shred-9.png',
      '/images/shred/shred-10.jpg',
      '/images/shred/shred-11.jpg',
      '/images/shred/shred-12.png'
    ]
  },
  {
    id: 'solesavy',
    category: 'Brand Architecture',
    title: "SOLESAVY: STATE OF SNEAKERS",
    year: '2021-2023',
    tags: '',
    summary: "Proved membership value proposition using audience's own research data",
    sections: [
      {
        heading: 'Summary',
        text: 'SoleSavy launched as a membership community for sneaker collectors frustrated by bots, resellers, and increasingly difficult odds of limited-edition drops. The company had a loyal early base but needed to scale. We designed research to serve dual purposes: internal audience intelligence for SoleSavy\'s product and marketing teams, and external content marketing demonstrating category expertise. Every finding was structured to ladder up to the value proposition of membership: better access, community intelligence, collective buying power. We designed and fielded an extensive ethnographic study combining quantitative surveys with qualitative interviews and behavioural analysis. The survey mapped demographics, spending behaviour ($250-$499 monthly for 40% of respondents), collection size (38% own 25-75 pairs), and entry points into sneaker culture. We synthesized findings into "The State of Sneakers, Vol. 1," a designed white paper with data visualizations, pull quotes from anonymous respondents, and persona profiles. We then produced a social content series pulling individual data points into shareable assets optimized for Instagram and Twitter.'
      },
      {
        heading: 'Background',
        text: 'SoleSavy launched as a membership community for sneaker collectors frustrated by bots, resellers, and increasingly difficult odds of limited-edition drops. The company had a loyal early base but needed to scale.'
      },
      {
        heading: 'Objective',
        text: 'Understand the current state of sneaker culture well enough to produce a credible white paper and content series that would position SoleSavy as category authority and drive new memberships.'
      },
      {
        heading: 'Challenge',
        text: 'Sneaker culture is tribal, fast-moving, and deeply skeptical of corporate messaging. A brand research piece could easily read as patronizing if the methodology was not rigorous or findings were not genuinely useful.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the research itself was the product, a document the community would share, cite, and argue about, because it reflected their world back to them with clarity they had not seen?'
      },
      {
        heading: 'Insight',
        text: 'The typical sneaker enthusiast profile did not match the caricature. Our research showed a 33-year-old, well-educated professional with disposable income, living in a metropolitan area. Forty percent got into sneakers in the previous five years. The community was feeling increasingly locked out of drops that defined the culture.'
      },
      {
        heading: 'Strategy',
        text: 'We designed the research to serve dual purposes: internal audience intelligence and external content marketing demonstrating expertise. Every finding was structured to ladder up to membership value proposition.'
      },
      {
        heading: 'Methodology',
        text: 'We designed and fielded an extensive ethnographic study combining quantitative surveys with qualitative interviews and behavioural analysis. The survey mapped demographics, spending behaviour, collection size, and entry points into sneaker culture. We synthesized findings into "The State of Sneakers, Vol. 1," a designed white paper with data visualizations and persona profiles. We produced a social content series pulling individual data points into shareable assets optimized for Instagram and Twitter.'
      }
    ],
    proof: [
      'White paper became SoleSavy\'s primary top-of-funnel content asset',
      'Social assets drove engagement and sharing within sneaker community',
      'Audience segmentation informed internal product development and marketing targeting'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Research Lead',
      'Melissa Eshaghbeigi, Strategy',
      'Craig Ritchie, Creative Director'
    ],
    images: [
      '/images/solesavy/solesavy-1.png',
      '/images/solesavy/solesavy-2.png',
      '/images/solesavy/solesavy-3.png',
      '/images/solesavy/solesavy-4.jpg',
      '/images/solesavy/solesavy-5.jpg',
      '/images/solesavy/solesavy-6.jpg',
      '/images/solesavy/solesavy-7.jpg',
      '/images/solesavy/solesavy-8.jpg',
      '/images/solesavy/solesavy-9.jpg'
    ]
  },
  {
    id: 'wyld',
    category: 'Brand Architecture',
    title: "WYLD: CANADIAN MARKET ENTRY",
    year: '2021-2022',
    tags: '',
    summary: "Fastest-growing edible brand in Canada with compostable packaging innovation",
    sections: [
      {
        heading: 'Summary',
        text: 'Wyld had become the top-selling cannabis gummy brand in the United States. But Canadian brand awareness and affinity were non-existent. The Canadian edibles market had its own competitive dynamics: local brands with community credibility, provincial regulatory variation, and consumers skeptical of American cannabis companies entering their market. The Canadian cannabis edibles market was already crowded with local and regional brands. Wyld risked being dismissed as a foreign import without local relevance. Provincial compliance requirements varied significantly. We positioned the Canadian entry around three themes: product authenticity (real fruit, unique flavours), innovation (first compostable edibles packaging in Canada), and values alignment (transparency, quality, sustainability). The brand tone was adjusted to resonate with Canadian values without abandoning Wyld\'s established identity. We designed and procured Canada\'s first compostable edibles packaging, which became both a sustainability proof point and a marketing asset. We executed the market entry across provincial government boards, navigating multiple stakeholders and province-specific compliance requirements to secure listings for all 10 SKUs in five provinces.'
      },
      {
        heading: 'Background',
        text: 'Wyld had become the top-selling cannabis gummy brand in the United States. But Canadian brand awareness and affinity were non-existent. The Canadian edibles market had its own competitive dynamics.'
      },
      {
        heading: 'Objective',
        text: 'Adapt Wyld\'s brand for Canadian consumers, ensure regulatory compliance across multiple provinces, and execute a market entry strategy that would achieve immediate distribution and sales velocity.'
      },
      {
        heading: 'Challenge',
        text: 'The Canadian cannabis edibles market was already crowded with local and regional brands. Wyld risked being dismissed as a foreign import. Provincial compliance requirements varied significantly.'
      },
      {
        heading: 'Opportunity',
        text: 'What if Wyld\'s U.S. success was reframed not as a foreign advantage but as proof of product quality, and the Canadian entry became an opportunity to lead on sustainability and innovation?'
      },
      {
        heading: 'Insight',
        text: 'Competitive analysis revealed that less-localized competitors had gaps: inconsistent sustainability claims, generic flavour profiles, weak community engagement. Wyld\'s genuine product differentiators gave us concrete proof points.'
      },
      {
        heading: 'Strategy',
        text: 'We positioned the Canadian entry around three themes: product authenticity (real fruit, unique flavours), innovation (first compostable edibles packaging in Canada), and values alignment (transparency, quality, sustainability).'
      },
      {
        heading: 'Methodology',
        text: 'We conducted edibles category research and competitive market mapping specific to the Canadian market. We developed all creative materials localized for the Canadian market. Packaging was a major workstream: we designed and procured Canada\'s first compostable edibles packaging. We produced trade marketing materials and in-store display designs. We wrote social media compliance guide addressing specific regulatory constraints. We developed digital content strategy and retail strategy adaptation. We executed market entry across provincial government boards.'
      }
    ],
    proof: [
      'Fastest-growing edible brand in Canada in 2022, with compound monthly growth rate of +16.5%',
      'Winner of every "Edible of the Year" award in Canada in launch year, including KIND Magazine and ADCANN',
      'Winner of ADCANN "Packaging of the Year" for compostable packaging innovation',
      'Full distribution in eight provinces with all 10 SKUs listed in five',
      'Significant market share captured within six months of launch'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Katie Waterman, CEO, Market Research',
      'Matt Weirr, Strategy',
      'Hayden Lawton, Strategy',
      'Leah Whitney, Copywriter, ECD',
      'Kat Tapp, Designer',
      'Shaira Santos, Designer',
      'Ben Gaines, Director of Marketing, Wyld Cannabis',
      'Chris Joseph, Founder/CMO, Wyld Cannabis',
      'Cannabis Act compliance (Canada); Provincial regulatory requirements'
    ],
    images: [
      '/images/wyld/wyld-1.jpg',
      '/images/wyld/wyld-2.png',
      '/images/wyld/wyld-3.png',
      '/images/wyld/wyld-4.jpg',
      '/images/wyld/wyld-5.jpg',
      '/images/wyld/wyld-6.png'
    ]
  },
  {
    id: 'cruuzy',
    category: 'Brand Architecture',
    title: "CRUUZY: IT'S ALL CRUUZY",
    year: '2020-2023',
    tags: '',
    summary: "Built personality-driven cannabis brand that was acquired within nine months of launch",
    sections: [
      {
        heading: 'Summary',
        text: 'Galaxie, a licensed producer, needed a new recreational cannabis brand but had no consumer strategy, no identity, and no go-to-market plan. We were given full creative and strategic ownership. The Canadian cannabis market was flooded with brands that all looked and sounded the same: earth tones, strain names, potency stats. The value segment was a race to the bottom on price. We identified a gap in the middle: a brand with real personality that did not take itself too seriously. Machine-learning-driven audience segmentation revealed a distinct cluster we named "the emerging enthusiast": daily users who started or increased consumption post-legalization and ramped up during COVID. They were not legacy stoners or canna-curious dabblers. They were building a new consumption habit and wanted a brand that matched their energy, casual, fun, unapologetic. We followed the White Claw model: build the lifestyle brand first, let the product live inside it. Cruuzy was designed to be visually exciting with effortless energy, but deliberately ambiguous in cultural references. The brand could read as California cool, a skateboard company, or just a vibe. That openness was the strategy.'
      },
      {
        heading: 'Background',
        text: 'Galaxie, a licensed producer, needed a new recreational cannabis brand but had no consumer strategy, identity, or go-to-market plan. Sister Merci was given full creative and strategic ownership.'
      },
      {
        heading: 'Objective',
        text: 'Create a complete cannabis brand, from name through package design through launch, that could compete for the daily-use consumer in a rapidly commoditizing market.'
      },
      {
        heading: 'Challenge',
        text: 'The Canadian cannabis market was flooded with brands that looked and sounded the same. The value segment was a race to the bottom on price. Premium brands leaned on craft narratives consumers could not verify.'
      },
      {
        heading: 'Opportunity',
        text: 'What if a cannabis brand felt less like a cannabis brand and more like a lifestyle product you would find at a surf shop or record store?'
      },
      {
        heading: 'Insight',
        text: 'Machine-learning-driven audience segmentation revealed "the emerging enthusiast": daily users who started or increased consumption post-legalization. They were building a new consumption habit and wanted a brand matching their energy.'
      },
      {
        heading: 'Strategy',
        text: 'We followed the White Claw model: build the lifestyle brand first, let the product live inside it. Cruuzy was designed to be visually exciting with effortless energy but deliberately ambiguous in cultural references.'
      },
      {
        heading: 'Methodology',
        text: 'Full-scope brand build. We ran audience research and segmentation using machine-learning clustering against cannabis retail behaviour data. We developed the brand name, logo, and visual identity. We designed all packaging (three vape SKUs: Sugar Spice Indica, Citrus Ice Sativa, Mango Twist Hybrid) with illustration-forward design and retro-surf aesthetic. We produced merchandise displayers for retail, sales collateral for provincial buyers, content planning and social assets, and influencer engagement program. The entire process took four months.'
      }
    ],
    proof: [
      'Cruuzy\'s first limited-time-offer flower sold out in three weeks after launch',
      'Brand was on market for nine months before being acquired by The Green Organic Dutchman',
      'Speed of acquisition validated both brand strategy and market positioning'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Max Hosseinian, Visual Identity',
      'Leah Whitney, Copywriter, ECD',
      'Hillary Kelebay, Designer, ECD',
      'Shaira Santos, Designer',
      'Matt Weirr, Strategy',
      'Hayden Lawton, Strategy',
      'Erica Emery, Galaxie Brands, Director, Product & Strategic Development',
      'Jill Garcia, Galaxie Brands, Brand Manager',
      'Day Job, Production',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      '/images/cruuzy/cruuzy-1.png',
      '/images/cruuzy/cruuzy-2.jpg',
      '/images/cruuzy/cruuzy-3.png',
      '/images/cruuzy/cruuzy-4.png',
      '/images/cruuzy/cruuzy-5.png',
      '/images/cruuzy/cruuzy-6.jpg',
      '/images/cruuzy/cruuzy-7.png',
      '/images/cruuzy/cruuzy-8.jpg',
      '/images/cruuzy/cruuzy-9.jpg',
      '/images/cruuzy/cruuzy-10.jpg',
      '/images/cruuzy/cruuzy-11.png',
      '/images/cruuzy/cruuzy-12.png'
    ]
  },
  {
    id: 'offside',
    category: 'Brand Architecture',
    title: "OFFSIDE CANNABIS: SHOP AROUND",
    year: '2020-2021',
    tags: '',
    summary: "Built retail brand that feels like actual cannabis culture spaces, not dispensaries",
    sections: [
      {
        heading: 'Summary',
        text: 'A value-oriented cannabis retailer was operating under the name "Spyder Cannabis", a name carrying no strategic weight and no emotional connection to its target consumer. The company wanted to rebrand around the legacy cannabis consumer. Legal cannabis retail in Canada tends to split between two aesthetics: sterile pharmacy and generic lifestyle. Neither honours the actual history of cannabis culture. The brand needed to reference that history without feeling nostalgic or exclusionary, and it needed to work within compliance constraints. The target consumer does not just buy cannabis. They identify with it. Legalization was welcome, but it came with a sanitization of the culture they loved. A retail brand that acknowledged this tension, legal but not corporate, compliant but not boring, would earn loyalty that price alone could not. We built OFFSIDE as a brand that celebrates being outside the mainstream. The name itself references the act of breaking rules, of being in the wrong place at the right time. The visual identity, retail experience, and brand voice were all designed to feel like a counterculture space operating inside the legal framework.'
      },
      {
        heading: 'Background',
        text: 'A value-oriented cannabis retailer was operating under the name "Spyder Cannabis." The company wanted to rebrand around the legacy cannabis consumer.'
      },
      {
        heading: 'Objective',
        text: 'Name and create the complete brand, identity, assets, and retail experience, for a cannabis retailer targeting consumers who cherish the countercultural heritage of cannabis.'
      },
      {
        heading: 'Challenge',
        text: 'Legal cannabis retail tends to split between sterile pharmacy and generic lifestyle. Neither honours actual cannabis culture. The brand needed to reference that history without feeling nostalgic or exclusionary.'
      },
      {
        heading: 'Opportunity',
        text: 'What if a legal cannabis store could feel like the places where cannabis culture actually lived, not a dispensary trying to look like an Apple Store?'
      },
      {
        heading: 'Insight',
        text: 'The target consumer does not just buy cannabis. They identify with it. A retail brand that acknowledged the tension between legalization and culture would earn loyalty that price alone could not.'
      },
      {
        heading: 'Strategy',
        text: 'We built OFFSIDE as a brand that celebrates being outside the mainstream. The name references the act of breaking rules. The visual identity, retail experience, and brand voice were designed to feel like a counterculture space operating inside the legal framework.'
      },
      {
        heading: 'Methodology',
        text: 'Full-scope brand build: audience segmentation and targeting, brand naming (OFFSIDE), brand development and architecture, logo and visual identity design (distinctive purple palette, gradient circle mark, clean modern typography), retail space design, package design, content strategy, social media engagement approach, and production of all marketing collateral.'
      }
    ],
    proof: [
      'OFFSIDE launched with a complete brand system spanning retail, digital, collateral, and packaging',
      'Retailer achieved distinct market position in crowded cannabis retail market'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Amanda Wood, Chief Creative Officer',
      'Leah Whitney, Copywriter, ECD',
      'Hillary Kelebay, Designer, ECD',
      'Cannabis Act compliance (Canada)'
    ],
    images: []
  },
  {
    id: 'simply-bare',
    category: 'Brand Architecture',
    title: "SIMPLY BARE: NOTHING ADDED",
    year: '2019-2020',
    tags: '',
    summary: "Built brand architecture and visual world for premium organic craft cannabis",
    sections: [
      {
        heading: 'Summary',
        text: 'Simply Bare was an organic craft cannabis brand grown on BC\'s Sunshine Coast with a clear product philosophy: minimal intervention, maximum quality. The brand had the credentials to compete at the premium end of the Canadian market but lacked the visual identity and brand system to communicate its positioning. Premium cannabis branding tends to default to two modes: dark and moody luxury or rustic craft. Both were overcrowded territories. Simply Bare needed a visual language that read as premium and craft without falling into either cliche. The brand\'s origin on BC\'s Sunshine Coast was not just a geography fact. It was the entire aesthetic and philosophical foundation. The light, the stone, the coast, the stripped-back approach to growing, these were the brand. We built the visual identity as an extension of the growing philosophy: nothing added, nothing taken away. Every visual decision was governed by restraint. Natural materials, soft light, minimal styling. The brand architecture connected organic growing process to consumer promise through a clean hierarchy: origin, philosophy, product, experience.'
      },
      {
        heading: 'Background',
        text: 'Simply Bare was an organic craft cannabis brand grown on BC\'s Sunshine Coast with clear product philosophy: minimal intervention, maximum quality. The brand had credentials to compete at premium end but lacked visual identity and brand system.'
      },
      {
        heading: 'Objective',
        text: 'Develop a brand architecture and visual identity that would establish Simply Bare as the benchmark for organic craft cannabis in North America.'
      },
      {
        heading: 'Challenge',
        text: 'Premium cannabis branding tends to default to two overcrowded modes: dark and moody luxury or rustic craft. Simply Bare needed visual language that read as premium and craft without cliche.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the brand\'s visual identity followed the same principle as its growing philosophy, strip away everything that does not belong, and let what remains speak?'
      },
      {
        heading: 'Insight',
        text: 'The brand\'s origin on BC\'s Sunshine Coast was the entire aesthetic and philosophical foundation. The light, the stone, the coast, the stripped-back approach.'
      },
      {
        heading: 'Strategy',
        text: 'We built the visual identity as an extension of the growing philosophy: nothing added, nothing taken away. Every visual decision was governed by restraint.'
      },
      {
        heading: 'Methodology',
        text: 'We developed the full brand architecture. For visual identity, we art directed and produced a brand photoshoot with award-winning photographer Maya Visnyei, creating hero assets that placed product against natural textures in soft, natural light. We designed and produced strain cards, grower\'s notes, and an education booklet. We built the brand website and developed a social content design system. The terracotta-toned packaging and embossed clay brand mark became recognizable shelf signals.'
      }
    ],
    proof: [
      'Simply Bare launched with a visual identity that immediately distinguished it on shelf and in digital channels',
      'Brand photography, strain cards, and education materials became core sales tools for budtender education',
      'Brand established itself as a premium organic reference point in the Canadian market'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Amanda Wood, Chief Creative Officer',
      'Shaira Santos, Designer',
      'Lauren Orlando, Messaging, PR',
      'Andy von Hirschberg, Brand Manager, Rubicon Organics',
      'Melanie Ramsay, VP Marketing',
      'Maya Visnyei, Photographer',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      '/images/simply-bare/simply-bare-1.jpg',
      '/images/simply-bare/simply-bare-2.jpg',
      '/images/simply-bare/simply-bare-3.png'
    ]
  },
  {
    id: 'herbert-labs',
    category: 'Brand Architecture',
    title: "HERBERT LABS: BRAND STRATEGY",
    year: '2019-2020',
    tags: '',
    summary: "Pivoted to influencer-led soft launch when pandemic disrupted traditional rollout",
    sections: [
      {
        heading: 'Summary',
        text: 'Herbert Labs brought Greenhouse Juices\' commitment to plant-based wellness into the cannabis beverage space. The mission was to combine advanced technology with experience-enhancing properties of cannabis to create products designed around specific lifestyle needs. But the brand existed only as a product line with no market-facing identity. Functional cannabis beverages were new to the Canadian market. Consumers did not have a frame of reference. The brand needed to educate without lecturing, differentiate on function without making health claims (a regulatory constraint), and establish trust in a category where most decisions were driven by THC or CBD content rather than brand affinity. Then COVID-19 arrived weeks before the planned launch. We built the positioning around three pillars: audience ("for people who want to grow"), functional framing ("trust your gut"), and product truth ("plant power in a bottle"). Each pillar worked independently as a messaging hook and together as a coherent brand story. When the pandemic forced a pivot, we launched through an influencer program identifying 25 health and wellness influencers aligned with Herbert\'s positioning. Despite zero marketing spend, the influencer-led soft launch produced 200+ pieces of earned digital content, with 25 influencers posting multiple stories about the brand and products.'
      },
      {
        heading: 'Background',
        text: 'Herbert Labs was born from Greenhouse Juices, bringing commitment to plant-based wellness into the cannabis beverage space. The brand existed only as a product line with no market-facing identity.'
      },
      {
        heading: 'Objective',
        text: 'Create brand strategy, consumer segmentation, positioning, and go-to-market plan that would launch Herbert into a nascent and crowded functional beverage market.'
      },
      {
        heading: 'Challenge',
        text: 'Functional cannabis beverages were new. Consumers did not have a frame of reference. The brand needed to educate without lecturing, differentiate on function without making health claims, and establish trust where most purchase decisions were driven by THC or CBD content. Then COVID-19 arrived weeks before planned launch.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the positioning did not lead with cannabis at all, but with the aspiration that cannabis-curious wellness consumers already held?'
      },
      {
        heading: 'Insight',
        text: 'Through consumer segmentation work, we identified that the target audience defined themselves not by what they consumed but by how they wanted to live. Cannabis was a tool, not an identity.'
      },
      {
        heading: 'Strategy',
        text: 'We built the positioning around three pillars: audience ("for people who want to grow"), functional framing ("trust your gut"), and product truth ("plant power in a bottle"). The go-to-market plan was designed for flexibility.'
      },
      {
        heading: 'Methodology',
        text: 'We conducted consumer segmentation study to identify and profile target audience. We developed the complete brand architecture: purpose, personality, positioning, voice, visual identity guidelines, and messaging hierarchy. For go-to-market, we developed an influencer program identifying 25 health and wellness influencers. We conducted 40 interviews and shop-alongs with target consumers and ran 3 listening sessions with brand ambassadors.'
      }
    ],
    proof: [
      'Despite zero marketing spend, the influencer-led soft launch produced 200+ pieces of earned digital content',
      '25 influencers posted multiple stories about the brand and products',
      'The Message (Campaign magazine) covered the pivot as case study in launching during economic shutdown',
      'BevNET reviewed the product line',
      'Brand architecture became foundation for all subsequent Herbert marketing'
    ],
    team: [
      'PK Lawton, Chief Strategy Officer, Strategy Lead',
      'Cannabis Act compliance (Canada)'
    ],
    images: [
      'https://cdn.prod.website-files.com/688121391a3801b69772fa7d/68a48956a60a466c5f2d7d81_Herbert_projectArtboard-1.png',
      '/images/herbert/herbert-1.jpg',
      '/images/herbert/herbert-2.jpg',
      '/images/herbert/herbert-3.png',
      '/images/herbert/herbert-4.jpg'
    ]
  },

  // CORPORATE COMMS
  {
    id: 'air-canada',
    category: 'Corporate Comms',
    title: "AIR CANADA: AEROPLAN BREAKUP",
    year: '2016-2017',
    tags: '',
    forceBold: true,
    summary: "Turned loyalty program breakup into $2+ billion value creation play",
    sections: [
      {
        heading: 'Summary',
        text: 'Aeroplan was born in 1984 as Air Canada\'s in-house frequent flyer program. By 2016, Air Canada had decided not to renew the contract with Aimia Inc. and to build its own loyalty program instead. The question was how to announce the split on Air Canada\'s terms, knowing that Aimia would have every incentive to shape the narrative first. Canadians\' relationship with loyalty points is fundamentally emotional, not rational. The first response to any perceived threat to a loyalty program is a visceral, immediate fear that accumulated savings are at risk. The question was not "What are the contractual implications?" It was "What about my points?" Two weeks before the scheduled announcement date, Aimia pre-emptively leaked to media, compressing the entire rollout timeline into roughly 24 hours. We designed an offensive communications program. The operating assumption was that we had a short window to own the narrative. The strategy was built to pre-empt the emotional response and ensure that by the time most consumers heard the news, the reassurance was already in the room. We led a pre-dawn briefing with Canada\'s most influential voices in travel rewards space, bloggers, content creators, loyalty experts whom Aeroplan members actually trusted. By the time most consumers encountered the story, the first independent commentary they found was accurate, detailed, and reassuring.'
      },
      {
        heading: 'Background',
        text: 'Aeroplan was born in 1984 as Air Canada\'s in-house frequent flyer program. After financial fallout from 9/11 and SARS, Air Canada spun it off and sold it. By 2016, Air Canada had decided not to renew the contract with Aimia Inc.'
      },
      {
        heading: 'Objective',
        text: 'Tell 5 million Aeroplan members that Air Canada was walking away from Aimia without causing a trust collapse, negative media cycle, or stampede of panic redemptions.'
      },
      {
        heading: 'Challenge',
        text: 'Canada is one of the most loyalty-obsessed consumer markets. Over 95% of Canadians belong to at least one program. Aeroplan members treated their miles as real savings, accumulated over years. The team had a cautionary tale: Air Miles announced it would expire unused miles and was forced into a humiliating public reversal.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the announcement could be designed to avoid panic and to actually deepen customer trust in Air Canada by demonstrating the airline cared more about its customers\' points than the company managing them?'
      },
      {
        heading: 'Insight',
        text: 'Digital ethnography and consumer interviews revealed that Canadians\' relationship with loyalty points is fundamentally emotional. The first response to any threat is a visceral fear that accumulated savings are at risk.'
      },
      {
        heading: 'Strategy',
        text: 'We designed an offensive communications program. The operating assumption was that we had a short window to own the narrative. The strategy was built to pre-empt the emotional response.'
      },
      {
        heading: 'Methodology',
        text: 'Consumer research and digital ethnography combined with in-depth consumer interviews to understand how Aeroplan members would respond. Points influencer pre-dawn briefing: before the press release went live, we led a briefing with Canada\'s most influential travel rewards voices. Real-time Q&A microsite: we developed a dedicated customer-facing hub at aircanada.com/loyalty. The site was still being built when Aimia\'s leak forced the launch; the team completed and published it within 24 hours. Messaging architecture: all official messaging was calibrated to frame the split as customer-positive.'
      }
    ],
    proof: [
      'Stock price lifted 10.5% immediately; the market endorsed the strategic rationale',
      'Media coverage focused on business logic and reassurance to consumers, not panic',
      'In 2018, Air Canada led a consortium that reacquired Aeroplan for $450 million',
      'All existing members\' miles were honoured one-to-one in the new program',
      'Air Canada relaunched the transformed Aeroplan in November 2020 with no blackout dates, no fuel surcharges',
      'Program grew from 5 million to over 9 million active members',
      'Won Program of the Year, Best Elite Program, Best Promotion at 2025 Freddie Awards',
      'Analysts valued program repatriation at $2.0-2.5 billion in net present value over 15 years'
    ],
    team: [
      'Paul (PK) Lawton, Digital Strategist | Research lead, communications strategy, influencer briefing program, Q&A microsite concept and content',
      'Greg Power, President, Weber Shandwick',
      'Cameron Summers, EVP, Weber Shandwick',
      'Madeline Long-Duke, VP, Corporate, Weber Shandwick',
      'Dana Frank, Director, Client Experience',
      'Marc Holmes, Copywriter, Weber Shandwick',
      'Amanda Wood, Creative Director, Weber Shandwick',
      'Air Canada: Andy Shibata, VP Brand, Air Canada; Derek Whitworth, Customer Care, Air Canada; Mark Nasr, EVP & COO, Air Canada',
      'Public filings, press releases, and published reporting; no proprietary internal communications or unreleased financial projections'
    ],
    images: []
  },
  {
    id: 'nia-health',
    category: 'Corporate Comms',
    title: "NIA HEALTH: MARKET ENTRY",
    year: '2025',
    tags: '',
    summary: "Used single flagship research report to establish market credibility and generate $66M earned impressions",
    sections: [
      {
        heading: 'Summary',
        text: 'Canada\'s healthcare system was under sustained pressure. Wait times were at historic highs, primary care access was deteriorating, and a growing segment of the population was falling into gaps between what the public system could provide and what people actually needed. Health-tech platforms were emerging, but most entered the market with consumer-facing messaging positioning themselves as wellness brands. Nia Health had a different problem. The platform was clinically sophisticated, built on real diagnostic and outcomes data, capable of delivering measurable health results. But outside existing users, nobody knew that. The company had technology and traction but no public narrative, no media presence. We designed a single-asset content strategy. Rather than launching with scattered social posts and press releases, we built the entire market entry around one flagship piece of intellectual property, a research report substantial enough to function as a credibility instrument on its own. Every other asset (messaging framework, executive talking points, social content, media pitches, investor materials) would be derived from that single source. The report gave journalists and producers a substantive, data-backed story to tell. The results: 106 earned media hits across national outlets including BNN Bloomberg, CBC, National Post. Total earned media impressions reached 66 million.'
      },
      {
        heading: 'Background',
        text: 'Canada\'s healthcare system was under sustained pressure. Health-tech platforms were emerging but entering the market with consumer-facing messaging as wellness brands. Nia Health had technology and traction but no public narrative.'
      },
      {
        heading: 'Objective',
        text: 'Give Nia Health a market-entry communications strategy built on defensible positioning, a flagship piece of intellectual property that could anchor sustained media activity, and executive messaging infrastructure.'
      },
      {
        heading: 'Challenge',
        text: 'Health-tech companies entering Canada face credibility problems from two directions. The medical establishment is skeptical. And consumers have developed thick filters against health claims that sound like advertising.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the same data that proved the platform worked could tell the story of why the platform was necessary? What if that story, told rigorously enough, could bypass traditional media gatekeeping?'
      },
      {
        heading: 'Insight',
        text: 'The gap Nia Health was filling was not a market gap. It was a system gap. Canadians were not choosing health-tech because they preferred it to doctors; they were turning to it because the system could not see them fast enough.'
      },
      {
        heading: 'Strategy',
        text: 'We designed a single-asset content strategy. Rather than launching with scattered assets, we built the entire market entry around one flagship research report. Every other asset would be derived from that single source.'
      },
      {
        heading: 'Methodology',
        text: 'Embedded research partnership: we operated as an embedded extension of Nia Health team. External research audit: we led a research audit across peer-reviewed literature in health sciences, sociology, and anthropology. Data synthesis: we layered external research over Nia\'s internal anonymized member diagnostics. Strategic positioning: from the research synthesis, we repositioned Nia Health as a necessary complement to an at-capacity system. Flagship report production: a 10,000-word, 35-page research report synthesizing diagnostic and clinical outcomes data. Messaging framework and executive positioning: we built talking points for CEO Sameer Dhar. Sustained content harvest: we designed the report to be modular, insights, charts, data points could be extracted and reformatted as standalone social assets.'
      }
    ],
    proof: [
      'Report bypassed traditional media gatekeeping process',
      '106 earned media hits across national outlets including BNN Bloomberg, CBC, National Post',
      'Total earned media impressions reached 66 million and continued to accumulate',
      'CEO Sameer Dhar went from unknown founder to recognized voice in health-tech conversation',
      'Report served as validation for investors during critical fundraising period',
      'Content harvested from single flagship asset sustained six months of thought-leadership content'
    ],
    team: [
      'Paul (PK) Lawton, Chief Strategy Officer, Sister Merci | Research lead, strategic positioning, whitepaper content strategy, messaging framework',
      'Jennifer Dunak, Designer',
      'Candy Lee, CMO, NiaHealth',
      'Kate Carnegie, Media Relations',
      'Chantel Cassar, Media Relations'
    ],
    images: []
  },
  {
    id: 'shoppers',
    category: 'Corporate Comms',
    title: "SHOPPERS DRUG MART: PROJECT HOUSTON",
    year: '2019',
    tags: '',
    summary: "Designed go-to-market strategy to reposition pharmacy as health services platform",
    sections: [
      {
        heading: 'Summary',
        text: 'Shoppers Drug Mart operates the largest pharmacy network in Canada. The pharmacy had always been a traffic driver built on convenience. But Canadian healthcare system was shifting: provinces were expanding the scope of pharmacy practice, allowing pharmacists to prescribe for minor ailments, administer vaccinations, and offer clinical services. SDM saw an opportunity to transform its pharmacy from a dispensing operation into a health services platform, but the consumer relationship was not ready for it. Canadians chose SDM pharmacy for convenience, and the pharmacist had almost no bearing on that decision. The relationship was transactional. A previous attempt to reposition the pharmacist had run as a short campaign then was followed by disconnected service-specific campaigns that never built on each other. SDM\'s broad brand promise of "wellness" was a trap. Every consumer category was already promising wellness. The pharmacy needed its own tight brand promise, distinct from the retail floor, that could anchor a sequenced expansion of services. That promise had to start with the pharmacist, not the services, because Canadians would not pay for health services from someone they did not have a relationship with.'
      },
      {
        heading: 'Background',
        text: 'Shoppers Drug Mart operates the largest pharmacy network in Canada. The pharmacy was a traffic driver built on convenience. Canadian healthcare system was shifting, expanding scope of pharmacy practice.'
      },
      {
        heading: 'Objective',
        text: 'Develop the strategic marketing framework and go-to-market approach for Project Houston: a phased expansion of pharmacy services.'
      },
      {
        heading: 'Challenge',
        text: 'Canadians chose SDM pharmacy for convenience; only 9% described interaction as friendly. A previous "Partners in Health" campaign had run as a short campaign then disconnected. Rexall tried #MyRexallPharmacist for four years but generated low engagement.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the barrier to expanded pharmacy services was not awareness of those services but the absence of a relationship strong enough to carry the ask?'
      },
      {
        heading: 'Insight',
        text: 'SDM\'s broad "wellness" promise was a trap. The pharmacy needed its own tight brand promise, distinct from retail floor. The promise had to start with the pharmacist, not the services.'
      },
      {
        heading: 'Strategy',
        text: 'We designed a pharmacist-first master brand approach. Rather than launching individual service campaigns, the strategy required that all communications ladder up to a single idea: your SDM pharmacist is critical to positive health outcomes.'
      },
      {
        heading: 'Methodology',
        text: 'Consumer research and digital ethnography of SDM pharmacy reviews combined with analysis of previous campaign performance. Wellness trap analysis: we mapped SDM\'s existing brand promise and found it created a vulnerability. Snowball go-to-market strategy: three-phase market entry organized around cost and time consumers would invest. Consumer journey redesign: we replaced trigger-based journey with an occasion-state model built around five distinct moments. Three-stage communications architecture: Inspire, Believe, Act.'
      }
    ],
    proof: [
      'Strategy and brand architecture were delivered as recommended go-to-market framework',
      'Pharmacist-first master brand approach gave SDM a strategic architecture replacing disconnected campaigns',
      'Snowball framework provided clear decision logic for which services to launch first',
      'Occasion-state consumer journey model reframed how SDM planned pharmacy marketing across channels'
    ],
    team: [
      'Paul (PK) Lawton, Strategist | Consumer research, brand architecture, go-to-market strategy, communications framework',
      'Tracy Smith, President, The Mark',
      'Jeff Lynch, Client Experience, The Mark',
      'Hayes Steinberg, Chief Creative Officer, The Mark',
      'Client: Shoppers Drug Mart (Loblaw Companies)',
      'Pharmacy services expansion is widely reported in Canadian media; provincial scope-of-practice changes are matters of public regulatory record'
    ],
    images: []
  },
  {
    id: 'rbc',
    category: 'Corporate Comms',
    title: "RBC: FUTURE LAUNCH AUDIENCE IDENTIFICATION",
    year: '2016-2017',
    tags: '',
    summary: "Built audience strategy that shaped Canada's largest-ever RBC community investment",
    sections: [
      {
        heading: 'Summary',
        text: 'Canada\'s youth were entering a workforce shifting under their feet. A 2015 McKinsey report found that while 83% of education providers believed graduates were adequately prepared, only 44% of students agreed. Youth unemployment outpaced prime-working-age rates. RBC had identified this as both a social imperative and a business opportunity. The challenge was building a communications strategy that would make the issue resonate with people who could amplify it most. The people RBC most needed to influence, affluent educated Canadians who shaped public discourse, were the people least likely to feel the youth employment crisis personally. They were successful over-achievers who believed their own work ethic, transferred to their children, would overcome systemic barriers. They were not going to respond to doom-and-gloom messaging about a crisis they did not believe would touch their families. Rather than treating the channel plan as a media buy, we designed it as a behavioural system. The strategy started with a content taxonomy, three categories of shareable content matched to psychological drivers, and then mapped those categories to five distinct media consumption modes based on how Engaged Canadians actually moved through their days.'
      },
      {
        heading: 'Background',
        text: 'Canada\'s youth were entering a workforce shifting under their feet. Youth unemployment outpaced prime-working-age rates. RBC identified this as both a social imperative and a business opportunity.'
      },
      {
        heading: 'Objective',
        text: 'Develop an audience-first media strategy: identify who RBC needed to reach, understand how those people consumed media, and design a channel plan matching the right stories to the right behavioural moments.'
      },
      {
        heading: 'Challenge',
        text: 'The people RBC most needed to influence were least likely to feel the youth employment crisis personally. They were successful over-achievers who believed their work ethic would overcome systemic barriers.'
      },
      {
        heading: 'Opportunity',
        text: 'What if we designed content that made affluent, educated Canadians feel smart for sharing it, content connecting youth employment to the family outcomes they actually cared about?'
      },
      {
        heading: 'Insight',
        text: 'Engaged Canadians are family first, but their success makes them believe youth employment problems will be solved systemically, not personally. The path to engagement is not through fear or guilt.'
      },
      {
        heading: 'Strategy',
        text: 'Rather than treating the channel plan as a media buy, we designed it as a behavioural system. The strategy started with a content taxonomy, three categories of shareable content, and mapped those to five distinct media consumption modes.'
      },
      {
        heading: 'Methodology',
        text: 'Audience identification and profiling: using Global Web Index data, we built a detailed profile. Engaged Canadians skewed 56% male, 80% married, top 25% income bracket, 72% holding at least a bachelor\'s degree. Content taxonomy: we developed a three-category framework (Identity-based, Emotional, Informational) designed around what motivates sharing. Behavioural modes framework: we mapped content taxonomy to five media consumption modes (Flow, Switch, Escape, Explore, Connect) with distinct tactical recommendations.'
      }
    ],
    proof: [
      'RBC launched Future Launch in 2017 as a 10-year, $500 million commitment',
      'By 2024, the program had reached over 5.4 million young Canadians through 900+ community organizations',
      'In 2020, RBC expanded commitment with additional $50 million for 25,000 BIPOC youth by 2025',
      '85% of youth surveyed reported being better prepared for workforce after participating',
      'The "quiet crisis" framing and Engaged Canadians targeting helped turn this into a sustained national platform'
    ],
    team: [
      'Paul (PK) Lawton, Digital Strategist | Audience research, content strategy, channel planning, behavioural framework design',
      'Greg Power, President, Weber Shandwick',
      'Cameron Summers, EVP, Weber Shandwick',
      'Craig Ritchie, Creative Director, Weber Shandwick',
      'RBC: Lisa Hutniak, Director, Communications, RBC; Michelle Yao, Senior Manager, Brand Communications, RBC',
      'RBC Future Launch is publicly promoted with extensive documentation; no proprietary RBC internal financial data referenced'
    ],
    images: []
  },
  {
    id: 'cn-rail',
    category: 'Corporate Comms',
    title: "CN RAIL: MILTON VALUES ETHNOGRAPHY",
    year: '2014-2015',
    tags: '',
    summary: "Ethnographic research turned a decade of opposition into approval for major infrastructure",
    sections: [
      {
        heading: 'Summary',
        text: 'CN Rail had been planning to construct a large intermodal shipping facility in Milton, Ontario since 2003. The first attempt met fierce public and political resistance, and CN was forced to shelve the project entirely. By 2014, Milton had grown from 30,000 to over 105,000 residents. CN needed to understand what had changed in the community, what had not, and how to communicate the proposal without triggering the same opposition. Over two months of ethnographic fieldwork in community rinks and public spaces across the GTA, we interviewed 237 people and conducted 21 in-depth interviews across community gathering points, municipal meetings, residential neighbourhoods, and public events. The research surfaced a finding that reframed the problem: the opposition to CN\'s intermodal in 2003 was not about the intermodal at all, but about a deeper misalignment between what the company communicated and what the community actually cared about. The community\'s resistance to development was not ideological opposition to industry. It was anxiety about the specific things that development threatened. We built a values-first communications and monitoring program structured around three phases: strategic foresight (detecting friction before it escalated), timely response (pre-planned response frameworks), and accelerated recovery (using crisis data to inform future engagement).'
      },
      {
        heading: 'Background',
        text: 'CN Rail had been planning an intermodal facility in Milton since 2003. The first attempt met fierce public and political resistance. By 2014, Milton had grown significantly with 70% of residents having arrived since 2001.'
      },
      {
        heading: 'Objective',
        text: 'Develop a deep understanding of community values to inform a communications strategy that would reduce friction ahead of the development announcement; identify citizen advocates; and create a real-time monitoring system to detect and respond to emerging opposition.'
      },
      {
        heading: 'Challenge',
        text: 'Milton in 2014 was fundamentally different from 2003. Seventy percent of residents had arrived since 2001. Up to 40% were immigrants. Traditional polling and focus groups would surface stated attitudes, not underlying values driving behaviour.'
      },
      {
        heading: 'Opportunity',
        text: 'What if the opposition in 2003 was not about the intermodal at all, but about a deeper misalignment between corporate actions and community values?'
      },
      {
        heading: 'Insight',
        text: 'Every source of community friction traced back to the same root: the gap between organizational actions and audience values. The opposition in 2003 was pro-Milton, not anti-CN. And CN had never spoken to that.'
      },
      {
        heading: 'Strategy',
        text: 'We built a values-first communications and monitoring program structured around three phases: strategic foresight, timely response, and accelerated recovery. The entire strategy was organized around aligning CN\'s messaging with the community\'s demonstrated values.'
      },
      {
        heading: 'Methodology',
        text: 'Hybrid ethnographic research design combining traditional embedded ethnography with digital social listening. Four trained researchers deployed into Milton, Oakville, and Burlington for ten days, logging 300 combined hours in the field, conducting 237 recorded interactions and 21 in-depth interviews. All observations were geotagged and mapped. Values-based archetype segmentation produced three distinct community archetypes: The Founder (10%), The Settler (20%), and The Newcomer (majority). Despite different demographics and orientations, all three archetypes shared overlapping core values: family safety, protection of investment, and preservation of natural environment.'
      }
    ],
    proof: [
      'CN\'s intermodal proposal in Milton was approved, a reversal of the 2003 outcome',
      'Ethnographic research and friction monitoring program provided CN with strategy grounded in community values',
      'Archetype framework gave the company a segmented stakeholder engagement model it had never had',
      'Monitoring system ensured the team could detect and respond to emerging friction in real time'
    ],
    team: [
      'Paul (PK) Lawton, Counselor, Digital | Research design, ethnographic fieldwork lead, strategy development, friction monitoring program architect',
      'Jennifer Meehan, SVP, Consumer and Digital',
      'Client: Canadian National Railway',
      'Public record information only; no proprietary CN financial data or confidential regulatory submissions included'
    ],
    images: []
  }
];

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

  // YouTube video — clickable thumbnail that opens YouTube (works for age-gated videos)
  const YouTubeEmbed = ({ url }) => {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!match) return null;
    const videoId = match[1];
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

            {/* Images moved to bottom per request */}
            <ImageGrid urls={[
              'https://cdn.prod.website-files.com/688121381a3801b69772f9bc/68829c2154c28432fc1501ef_SM_Logo_RGB__Monogram_HeavyBlack.png',
              'https://cdn.prod.website-files.com/688121381a3801b69772f9bc/688293c5ddcb789b9802c493_SM-Website_VisualsArtboard-1-copy-2.png',
              'https://cdn.prod.website-files.com/688121381a3801b69772f9bc/689e02bb3734dd96550b81ea_ezgif-337cc23b0f3970.gif',
              'https://resized-media.entries.clios.com/companies/1446/media/7d7b53cb-2b3c-4fef-f679-08db9ab4efdb-large.jpg.webp',
              'https://resized-media.entries.clios.com/companies/1446/media/2e76a4f1-3358-4023-f649-08db9ab4efdb-large.jpg.webp',
              '/images/sister-merci/download.jpg',
              '/images/sister-merci/download-1.jpg',
              '/images/sister-merci/download-2.jpg',
              '/images/sister-merci/download-3.jpg',
              '/images/sister-merci/download-4.jpg',
              '/images/sister-merci/download-5.jpg',
              '/images/sister-merci/download-6.jpg',
              '/images/sister-merci/download-7.jpg',
              '/images/sister-merci/download-8.jpg',
              '/images/sister-merci/download-9.jpg',
              '/images/sister-merci/download-10.jpg',
              '/images/sister-merci/f_yFUaMu_400x400.jpg',
              '/images/sister-merci/images.jpg'
            ]} />
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

            <ImageGrid urls={['https://continuing.mcmaster.ca/app/uploads/2024/04/Paul-Lawton.jpg']} />
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
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Reassembling the Strategist"</a> — The flagship essay. Proposes Cultural Cartography as a new theory and method for practicing strategy. 74 likes, most popular post. Accompanied by a 22-page Field Guide for paid subscribers.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Reassembling the Consumer"</a> — "The Consumer" is a fiction that enters the marketing process early and hardens into organizational infrastructure. Uses the Stanley thermos trend as a case study.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Glazed and Confused: How AI Is Rewriting Human Trust in Real Time"</a> — The ChatGPT-4o "glazing" controversy analyzed through Latour.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Capital Hates Creative"</a> — Applies Lazzarato's capitalism critique to the ad industry. Average agency tenure has shrunk to roughly 12 months.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"AI Serves Power, Not People"</a> — Technology is never neutral. DOGE as a case study.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Are You a Strategist, or Are You Just a Human Algorithm with Good Taste?"</a> — Whether the strategy function has been reduced to pattern recognition and taste arbitrage.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Notes from the Underground" (Parts 1 & 2)</a> — Intellectual autobiography. From punk scenes in Winnipeg through a sociology PhD to the ad world.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Taste Won't Save You: On Maintaining Subscriptions"</a> — Creative professionals have to actively maintain cultural engagement. Accumulated taste is not a static asset.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Trade Publications & Op-Eds</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"The Secret Playbook of Cannabis Brands That Win"</a> — LBBOnline (2025). Six years of agency experience across 150+ cannabis brands distilled.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Entering the Age of Health-Conscious Hedonism"</a> — LBBOnline (2026). Emerging beverage trends and what they mean for regulated categories.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"How Hype Analysis Lets Companies Find Value in Customer Excitement"</a> — Quirk's Marketing Research Review (2024). Co-authored with Marcelo Bursztein. Introduces hype analysis as a methodology beyond traditional social listening.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"Content Ecology: Understanding the Consequences of Garbage Content"</a> — LinkedIn Pulse (2024).</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"In a Hyper-Politicized World, Brands Must Stay True to Themselves"</a> — The Globe and Mail (2017). Co-authored with Cameron Summers (SVP, Weber Shandwick Canada).</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"For Brands, Fake News Is an Existential Threat"</a> — The Globe and Mail (2016). Co-authored with Cameron Summers.</li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">"How Outrage Culture Changes the Rules for Crisis Management"</a> — Marketing Magazine (2015). Co-authored with David Gordon (Managing Partner, Cohn & Wolfe).</li>
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
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">McMaster Continuing Education (2024) — Institutional profile</a></li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">Strategy Online (2023) — "Homegrown cannabis brand building cred" agency profile</a></li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">Strategy Online (2020) — COVID-era cannabis marketing advice</a></li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">Authority Magazine (2020) — "All Gut, No Glory" extended interview</a></li>
                  <li><a href="javascript:void(0)" className="underline cursor-default opacity-70">Campaign Canada (2019) — Agency launch coverage</a></li>
                </ul>
              </div>
            </div>
            
            <ImageGrid urls={[
              'https://substack-post-media.s3.amazonaws.com/public/images/ea0ab3a2-6ba7-4ec7-920c-32045d08f0d6_1024x1024.png',
              'https://adage.com/resizer/v2/T6WAW5QVXZC5LLPOVBBRLYC2VE.jpg'
            ]} />
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
                  <li><strong>Ketamines (1996–2015; 2023-Current):</strong> Bass, vocals, principal songwriter. Long-running garage-pop project with James Leroy, originating in Lethbridge and evolving through multiple lineups across three cities. Released records on HoZac (Chicago), Southpaw, Mammoth Cave, Mint Records, and Hosehead. Pitchfork gave Spaced Out a 7.0. PopMatters named You Can't Serve Two Masters #15 Best Canadian Album of 2013. Oprah tweeted about the band. Target used a song in a US commercial. 128+ documented shows including SXSW, Sled Island, Pop Montreal, NXNE, HoZac BlackOut Fest. NEW LP OUT 2026!</li>
                  <li><strong>Century Palm (2014–2017):</strong> Bass, vocals. Toronto post-punk with Andrew Payne (Zebrassieres), Penny Clark (Tough Age), Jesse Locke (Dirty Beaches), and Alex Hamlyn. Debut LP Meet You on Deranged Records, mixed by Jay Arner, mastered by Mikey Young. Premiered on Stereogum. Album of the Day on Bandcamp Daily. CLRVYNT called it "a crash course in post-punk."</li>
                  <li><strong>Myelin Sheaths (~2008–2010):</strong> Drums, vocals. Lethbridge garage-punk. Two 7" singles on HoZac and Bachelor Records. LP Get On Your Nerves on Southpaw: Weird Canada called it "the most realized piece of psy-fi punk shreddery from the camp that put Alberta on the map."</li>
                  <li><strong>The Moby Dicks (2009–2011):</strong> Bass, vocals. Lethbridge bar-rock. Self-titled 7" on Southpaw, split with Needles//Pins, collaborative 7" with B.A. Johnston on Mammoth Cave.</li>
                  <li><strong>Also:</strong> Tough Age (touring bassist, Mint Records, 2013–2015), Red Mass (touring guitar player) Don't Bother, Endangered Ape, Radians, Pentagon, Mean Tikes, Complex Cities, James Leroy and the Giant, Ran, Kill Credo, 10% Gain.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold border-b border-black pb-1 mb-3 mt-8">Record Labels</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Mammoth Cave Recording Co. (2008–2015):</strong> Co-founded with Evan Van Reekum. Nearly four dozen releases, 7"s, LP and cassettes that defined a specific era of Canadian DIY. FFWD Magazine voted it Best Record Label for three consecutive years (2010, 2011, 2012). B.A. Johnston's Shit Sucks was longlisted for the Polaris Prize. Catalogue includes B.A. Johnston, Fist City, The Famines, Needles//Pins, Korean Gut, Krang, Strange Attractor, Nervous Talk, Lab Coast. Reissued legacy recordings by Simply Saucer and Shadowy Men on a Shadowy Planet. The Bloodstains Across... compilation series documented punk scenes province-by-province, featuring White Lung, Nü Sensae (now: Orville Peck), and an unreleased Shadowy Men track. I got to meet Tonetta once. This is one thing I did in my life that earned me a Wikipedia page. Eulogized by Exclaim! and National Post when I decided to shut the label down over pressing plant backlogs, the weakening Canadian dollar, and the impact of Record Store Day on independent manufacturers.</li>
                  <li><strong>Pleasence Records (2016–2022):</strong> And then, almost immediately, I bought into the amazing Toronto underground experimental label with James Lindsay. The story is that I did freelance brand strategy for Precision Pressing plant in Burlington, ON, in exchange for production credit. This helped guide the label through a prolific period Profiled by NOW Toronto on the label's evolving approach to sustainability in indie music. Catalogue: TRAITRS, Fake Palms, Isla Craig, Petra Glynt, WHIMM, Aidan Baker, Feel Alright, Germaphobes, Man Made Hill. TRAITRS might be the most successful band I've ever worked with; they generated an insane amount of money on streaming music.</li>
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
                  <li><strong>Weird Canada (2009–2014):</strong> Writer, editor, board member, grant writer. Winner of the 2011 CBC Radio 3 Searchlight Award for Best Canadian Music Website. Co-organized Wyrd Fest.</li>
                  <li><strong>New Feeling (2020–present):</strong> Founding member. Multi-stakeholder cooperative of Canadian music journalists. Cited by Liz Pelly in Mood Machine as "one of the most interesting models of co-op music" journalism in Canada.</li>
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
                  <li>The Globe and Mail (2013) — "Why Indie-Rock Mediocrity Rules in Canada"</li>
                  <li>VICE (2013) — "Meet the Guy Who's Slagging Off the Canadian Music Industry"</li>
                  <li>CBC Day 6 (2013) — "The Most Hated Man in Canadian Music"</li>
                  <li>National Post (2013, 2015) — Music industry profiles</li>
                  <li>Ominocity (2013) — Full Slagging Off timeline</li>
                  <li>CANADALAND Ep. 87 (2015) — "Canadian Music (Is Horribly Broken) Week"</li>
                  <li>NOW Toronto (2018) — "How Pleasence Records Is Rethinking the Label Model"</li>
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
                {activeProject.videos.map((v, i) => <YouTubeEmbed key={i} url={v} />)}
              </div>
            )}
            
            <div className="space-y-8 mb-12">
              {activeProject?.sections?.map((s, i) => (
                <div key={i}>
                  <h3 className="uppercase tracking-widest text-xs font-bold border-b border-black pb-1 mb-3">{s.heading}</h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            
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