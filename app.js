/* ==========================================================================
   FASHOW — Application Logic & Marketplace Architecture
   Vidovo-Benchmark Marketplace Mechanics & Fashion Editorial UX
   Two-Font System · Restrained Editorial Style · LocalStorage Persisted
   ========================================================================== */

(function () {
  'use strict';

  // Helper to generate elegant, original brand SVG logos
  function createSvgLogo(initials, bg, fg) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="100" height="100" rx="4" fill="${bg}"/>
      <rect x="6" y="6" width="88" height="88" rx="2" fill="none" stroke="${fg}" stroke-width="1.2" opacity="0.25"/>
      <text x="50" y="58" text-anchor="middle" dominant-baseline="central" fill="${fg}" font-family="Bricolage Grotesque, system-ui, sans-serif" font-size="36" font-weight="600" letter-spacing="1">${initials}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // ============================================================================
  // SEED DATA: 12 Diverse College Models, Creators & Micro-Influencers
  // ============================================================================
  const INITIAL_CREATORS = [
    {
      id: 'creator-1',
      username: 'maya-chen',
      name: 'Maya Chen',
      school: 'UMass Amherst',
      major: 'Fashion Marketing & Art History',
      gradYear: 'Class of 2028',
      location: 'Amherst & Boston, MA',
      primaryRole: 'Model',
      roles: ['Model', 'Creator'],
      aesthetic: 'Streetwear',
      styles: ['Streetwear', 'Vintage', 'Editorial'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
      bio: 'College model and streetwear content creator blending campus culture with contemporary ready-to-wear aesthetics. Experienced in on-camera modeling, lookbook styling, and short-form video production.',
      tiktok: { handle: '@maya.chen', followers: '14.2K' },
      instagram: { handle: '@mayachen_fit', followers: '5.1K' },
      reachSummary: '19.3K Reach',
      engagementRate: '8.4%',
      availability: 'Available',
      rates: '$350 - $600',
      collabPreferences: ['Modeling', 'Lookbooks', 'TikTok', 'Instagram', 'Campaigns', 'Campus activations'],
      portfolio: [
        {
          title: 'Autumn Outerwear Lookbook',
          img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
          caption: 'Editorial lookbook for contemporary outerwear featuring layered wool and archival boots.'
        },
        {
          title: 'Campus Streetwear Walk',
          img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
          caption: 'Natural 35mm analogue documentation on campus walkways with oversized tailoring.'
        },
        {
          title: 'Downtown Night Editorial',
          img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
          caption: 'Low-light flash photography exploring monochromatic leather and structured tailoring.'
        },
        {
          title: 'Studio Fitting Documentation',
          img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
          caption: 'Runway fitting documentation and showroom test styling for upcoming presentation.'
        }
      ],
      pastCollabs: [
        { brand: 'Atelier Marais', type: 'Capsule Lookbook', quote: 'Maya understood our tailoring proportions effortlessly.' },
        { brand: 'Revue Editorial', type: 'Digital Cover', quote: 'Professional on set, natural movement, and great engagement.' }
      ]
    },
    {
      id: 'creator-2',
      username: 'jordan-williams',
      name: 'Jordan Williams',
      school: 'Amherst College',
      major: 'Art History & Architecture',
      gradYear: 'Class of 2027',
      location: 'Amherst & Boston, MA',
      primaryRole: 'Model',
      roles: ['Model', 'Stylist'],
      aesthetic: 'Tailoring',
      styles: ['Tailoring', 'Minimal', 'Vintage'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
      bio: 'Menswear model focused on modern tailoring, architectural silhouettes, and heritage textiles. Collaborates with luxury ateliers and independent menswear labels.',
      tiktok: { handle: '@jordan.style', followers: '8.7K' },
      instagram: { handle: '@jwilliams.fits', followers: '11.4K' },
      reachSummary: '20.1K Reach',
      engagementRate: '6.9%',
      availability: 'Available',
      rates: '$400 - $750',
      collabPreferences: ['Modeling', 'Lookbooks', 'Instagram', 'Campaigns'],
      portfolio: [
        {
          title: 'Architectural Suiting',
          img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          caption: 'Double-breasted wool suiting shot against Brutalist architecture.'
        },
        {
          title: 'Heritage Knitwear Series',
          img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
          caption: 'Chunky wool knitwear paired with wide-leg flannel trousers.'
        }
      ],
      pastCollabs: [
        { brand: 'Nordic Studio', type: 'Autumn Outerwear', quote: 'Jordan brought an incredible presence and sophistication.' }
      ]
    },
    {
      id: 'creator-3',
      username: 'aaliyah-brooks',
      name: 'Aaliyah Brooks',
      school: 'UMass Amherst',
      major: 'Communication & Media',
      gradYear: 'Class of 2028',
      location: 'Amherst, MA',
      primaryRole: 'Creator',
      roles: ['Creator', 'Micro-Influencer'],
      aesthetic: 'Y2K',
      styles: ['Y2K', 'Vintage', 'Streetwear'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      bio: 'Thrift stylist and Y2K aesthetic content creator. Known for viral "Outfit of the Day on Campus" videos and nostalgic denim pairings with high student engagement.',
      tiktok: { handle: '@aaliyahbrooks', followers: '28.6K' },
      instagram: { handle: '@aaliyahb.style', followers: '9.8K' },
      reachSummary: '38.4K Reach',
      engagementRate: '11.2%',
      availability: 'Booking',
      rates: '$450 - $800',
      collabPreferences: ['TikTok', 'Instagram', 'Campus activations', 'Campaigns'],
      portfolio: [
        {
          title: 'Campus Thrift Haul & Style',
          img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
          caption: 'Styling archival cargo trousers and baby tees for daily college lectures.'
        }
      ],
      pastCollabs: [
        { brand: 'Kōhaku Apparel', type: 'TikTok Campus Launch', quote: 'Aaliyah drove incredible peer interaction across Amherst.' }
      ]
    },
    {
      id: 'creator-4',
      username: 'chris-rivera',
      name: 'Chris Rivera',
      school: 'Northeastern',
      major: 'Graphic Design',
      gradYear: 'Class of 2026',
      location: 'Boston & New York',
      primaryRole: 'Stylist',
      roles: ['Stylist', 'Creator', 'Photographer'],
      aesthetic: 'Streetwear',
      styles: ['Streetwear', 'Vintage', 'Skate'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
      bio: 'Skate culture stylist, vintage curator, and 35mm analogue photographer. Focuses on urban lookbooks, heavy denim, and graphic accessories.',
      tiktok: { handle: '@rivera.archive', followers: '16.8K' },
      instagram: { handle: '@chrisrivera_35mm', followers: '8.4K' },
      reachSummary: '25.2K Reach',
      engagementRate: '9.1%',
      availability: 'Available',
      rates: '$350 - $650',
      collabPreferences: ['Lookbooks', 'TikTok', 'Campaigns'],
      portfolio: [
        {
          title: 'Boston Alleyway Editorial',
          img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
          caption: 'Raw analogue flash photography capturing oversized chore jackets.'
        }
      ],
      pastCollabs: [
        { brand: 'Kōhaku Apparel', type: 'Drop 04 Lookbook', quote: 'Crisp aesthetic perspective and rapid turnaround.' }
      ]
    },
    {
      id: 'creator-5',
      username: 'elena-rostova',
      name: 'Elena Rostova',
      school: 'NYU',
      major: 'Film & Dramatic Arts',
      gradYear: 'Class of 2027',
      location: 'New York, NY',
      primaryRole: 'Model',
      roles: ['Model', 'Creator'],
      aesthetic: 'Minimal',
      styles: ['Minimal', 'Editorial', 'Tailoring'],
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
      bio: 'NYU Tisch student with experience in runway walking, cinematic fashion shorts, and monochrome editorial campaigns. Deep connection to Downtown Manhattan art circles.',
      tiktok: { handle: '@elena.rostova', followers: '18.9K' },
      instagram: { handle: '@elenarostova_', followers: '14.2K' },
      reachSummary: '33.1K Reach',
      engagementRate: '7.8%',
      availability: 'Available',
      rates: '$500 - $900',
      collabPreferences: ['Modeling', 'Lookbooks', 'Campaigns'],
      portfolio: [
        {
          title: 'East Village Dusk Editorial',
          img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
          caption: 'Monochrome tailored trench and draped knitwear at dusk.'
        }
      ],
      pastCollabs: [
        { brand: 'Maison Solène', type: 'Runway Presentation', quote: 'Elena is pure grace on camera and on the runway.' }
      ]
    },
    {
      id: 'creator-6',
      username: 'marcus-vance',
      name: 'Marcus Vance',
      school: 'Boston University',
      major: 'Sports Management & PR',
      gradYear: 'Class of 2026',
      location: 'Boston, MA',
      primaryRole: 'Campus Ambassador',
      roles: ['Campus Ambassador', 'Model', 'Creator'],
      aesthetic: 'Streetwear',
      styles: ['Streetwear', 'Athletic', 'Minimal'],
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
      bio: 'BU varsity track athlete and menswear creator blending technical athletic wear with streetwear. Extensive leadership across campus student organizations.',
      tiktok: { handle: '@marcusvance', followers: '22.3K' },
      instagram: { handle: '@marcus.vance', followers: '15.6K' },
      reachSummary: '37.9K Reach',
      engagementRate: '8.7%',
      availability: 'Available',
      rates: '$400 - $700',
      collabPreferences: ['Campus activations', 'TikTok', 'Instagram', 'Campaigns'],
      portfolio: [
        {
          title: 'Trackside Technical Apparel',
          img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
          caption: 'Dynamic running shots highlighting technical waterproof textiles.'
        }
      ],
      pastCollabs: [
        { brand: 'Aero Creative Labs', type: 'Footwear Launch', quote: 'Marcus was the perfect athletic ambassador on campus.' }
      ]
    },
    {
      id: 'creator-7',
      username: 'chloe-tanaka',
      name: 'Chloe Tanaka',
      school: 'FIT',
      major: 'Fashion Design & Textiles',
      gradYear: 'Class of 2027',
      location: 'New York, NY',
      primaryRole: 'Stylist',
      roles: ['Stylist', 'Creator'],
      aesthetic: 'Minimal',
      styles: ['Minimal', 'Editorial', 'Avant-Garde'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      bio: 'FIT student focusing on zero-waste patternmaking, Japanese denim, and quiet luxury styling. Works as an assistant stylist for independent Chelsea showrooms.',
      tiktok: { handle: '@chloe.tanaka', followers: '11.5K' },
      instagram: { handle: '@chloetanaka_fit', followers: '9.2K' },
      reachSummary: '20.7K Reach',
      engagementRate: '9.4%',
      availability: 'Available',
      rates: '$350 - $600',
      collabPreferences: ['Lookbooks', 'Styling', 'Instagram'],
      portfolio: [
        {
          title: 'Chelsea Showroom Lookbook',
          img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
          caption: 'Clean, understated silhouettes styled with natural linen and raw selvedge denim.'
        }
      ],
      pastCollabs: [
        { brand: 'Atelier Marais', type: 'Patternmaking Apprentice', quote: 'Chloe possesses an innate understanding of garment architecture.' }
      ]
    },
    {
      id: 'creator-8',
      username: 'liam-oconnor',
      name: 'Liam O’Connor',
      school: 'Parsons',
      major: 'Integrated Design',
      gradYear: 'Class of 2028',
      location: 'New York, NY',
      primaryRole: 'Model',
      roles: ['Model', 'Creator'],
      aesthetic: 'Avant-Garde',
      styles: ['Avant-Garde', 'Streetwear', 'Editorial'],
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
      bio: 'Experimental model pushing the boundaries of genderless tailoring, distressed knitwear, and dystopian streetwear. Walked at multiple student runway showcases in NYC.',
      tiktok: { handle: '@liam.oconnor', followers: '15.4K' },
      instagram: { handle: '@liam.archive', followers: '12.8K' },
      reachSummary: '28.2K Reach',
      engagementRate: '8.1%',
      availability: 'Booking',
      rates: '$450 - $750',
      collabPreferences: ['Modeling', 'Lookbooks', 'Campaigns'],
      portfolio: [
        {
          title: 'Distressed Knitwear Series',
          img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
          caption: 'Deconstructed mohair and oversized distressed leather shot on Lower East Side rooftops.'
        }
      ],
      pastCollabs: [
        { brand: 'Revue Editorial', type: 'Avant-Garde Feature', quote: 'Liam brings unmatched intensity and unique character to the camera.' }
      ]
    },
    {
      id: 'creator-9',
      username: 'samantha-diaz',
      name: 'Samantha Diaz',
      school: 'USC',
      major: 'PR & Fashion Marketing',
      gradYear: 'Class of 2027',
      location: 'Los Angeles, CA',
      primaryRole: 'Micro-Influencer',
      roles: ['Micro-Influencer', 'Creator'],
      aesthetic: 'Lifestyle',
      styles: ['Lifestyle', 'Contemporary', 'Streetwear'],
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
      bio: 'Southern California creator sharing sun-drenched styling, beach-to-campus transitions, and sustainable ready-to-wear collections. Highly engaged West Coast college demographic.',
      tiktok: { handle: '@samdiaz.fit', followers: '34.2K' },
      instagram: { handle: '@samanthadiaz', followers: '21.5K' },
      reachSummary: '55.7K Reach',
      engagementRate: '10.3%',
      availability: 'Available',
      rates: '$500 - $850',
      collabPreferences: ['TikTok', 'Instagram', 'Campus activations', 'Campaigns'],
      portfolio: [
        {
          title: 'Venice Beach Sunset Editorial',
          img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
          caption: 'Golden hour resort wear and contemporary knit pairings.'
        }
      ],
      pastCollabs: [
        { brand: 'Nordic Studio', type: 'Summer Linen Capsule', quote: 'Samantha created some of our highest-converting TikTok video content.' }
      ]
    },
    {
      id: 'creator-10',
      username: 'malik-hayes',
      name: 'Malik Hayes',
      school: 'Columbia',
      major: 'Economics & Visual Culture',
      gradYear: 'Class of 2028',
      location: 'New York, NY',
      primaryRole: 'Model',
      roles: ['Model', 'Creator'],
      aesthetic: 'Tailoring',
      styles: ['Tailoring', 'Vintage', 'Minimal'],
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
      bio: 'Columbia student blending Ivy League collegiate aesthetics with modern high-fashion tailoring. Editorial model with distinct profile and sharp jawline.',
      tiktok: { handle: '@malikhayes', followers: '12.1K' },
      instagram: { handle: '@malik.hayes', followers: '16.7K' },
      reachSummary: '28.8K Reach',
      engagementRate: '7.5%',
      availability: 'Available',
      rates: '$450 - $800',
      collabPreferences: ['Modeling', 'Lookbooks', 'Campaigns'],
      portfolio: [
        {
          title: 'Morningside Heights Suiting',
          img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
          caption: 'Fine tailored overcoats and silk neckwear on historical stone stairways.'
        }
      ],
      pastCollabs: [
        { brand: 'Atelier Marais', type: 'Menswear Lookbook', quote: 'Malik carries tailored silhouettes with natural poise and quiet confidence.' }
      ]
    }
  ];

  // ============================================================================
  // SEED DATA: Verified Fashion Houses
  // ============================================================================
  const INITIAL_BRANDS = [
    {
      id: 'brand-1',
      name: 'Atelier Marais',
      slug: 'atelier-marais',
      logo: createSvgLogo('AM', '#141518', '#FAF8F5'),
      category: 'Ready-to-Wear / Tailoring',
      location: 'Soho, New York & Boston',
      website: 'https://ateliermarais.com',
      bio: 'Contemporary independent atelier crafting tailored silhouettes, architectural outerwear, and sustainable luxury textiles for modern creatives.',
      verified: true
    },
    {
      id: 'brand-2',
      name: 'Kōhaku Apparel',
      slug: 'kohaku-apparel',
      logo: createSvgLogo('KA', '#141518', '#FAF8F5'),
      category: 'Streetwear & Contemporary',
      location: 'Lower East Side, NYC',
      website: 'https://kohaku.design',
      bio: 'Downtown Manhattan streetwear label drawing inspiration from Japanese workwear, modular garment engineering, and skate culture.',
      verified: true
    },
    {
      id: 'brand-3',
      name: 'Nordic Studio',
      slug: 'nordic-studio',
      logo: createSvgLogo('NS', '#141518', '#FAF8F5'),
      category: 'Minimal Denim & Knitwear',
      location: 'Soho, New York',
      website: 'https://nordicstudio.store',
      bio: 'Sustainable Scandinavian essentials focused on undyed organic wool, Japanese selvedge denim, and timeless oversized outerwear.',
      verified: true
    }
  ];

  // ============================================================================
  // SEED DATA: Active Open Campaigns
  // ============================================================================
  const INITIAL_CAMPAIGNS = [
    {
      id: 'camp-1',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      brandLogo: createSvgLogo('AM', '#141518', '#FAF8F5'),
      title: 'Spring / Summer 2027 Boston Streetwear Campaign',
      category: 'Lookbook',
      talentType: 'Model & Content Creator',
      compensation: '$500 Flat Fee',
      perks: 'Full capsule wardrobe gifted ($450 retail value)',
      location: 'Boston & Amherst, MA',
      campuses: 'UMass Amherst, Amherst College, Northeastern, BU',
      deadline: 'May 10, 2027',
      slots: 3,
      moodboard: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['2x TikTok Styling Videos', '4x High-Res Lookbook Stills'],
      description: 'Atelier Marais is casting 3 college models and creators to style and showcase our Spring tailored outerwear and raw silk trousers. Shoot on campus or in Boston with natural lighting, capturing movement and silhouette details.',
      requirements: [
        'Enrolled college student with natural styling flair',
        'Demonstrated ability to produce crisp short-form vertical video',
        'Personal aesthetic aligns with minimal or structured tailoring',
        'Deliver high-resolution photo assets via Google Drive'
      ]
    },
    {
      id: 'camp-2',
      brandId: 'brand-2',
      brandName: 'Kōhaku Apparel',
      brandLogo: createSvgLogo('KA', '#141518', '#FAF8F5'),
      title: 'Streetwear Campus Ambassador Cohort',
      category: 'Ambassador',
      talentType: 'Campus Ambassador & Creator',
      compensation: '$400 / month',
      perks: 'Monthly drop wardrobe + 20% campus affiliate commission',
      location: 'Campus / Hybrid',
      campuses: 'UMass Amherst, Northeastern, Boston University',
      deadline: 'May 20, 2027',
      slots: 4,
      moodboard: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['3x Monthly TikToks', 'Campus Drop Handout', '1x Monthly Lookbook Carousel'],
      description: 'Represent Kōhaku Apparel on your university campus. Wear our drop garments to lectures and campus events, host mini pop-ups, and share authentic video GRWMs.',
      requirements: [
        'Active campus presence and involvement in student organizations',
        'Strong affinity for skate, vintage, or Japanese streetwear'
      ]
    },
    {
      id: 'camp-3',
      brandId: 'brand-3',
      brandName: 'Nordic Studio',
      brandLogo: createSvgLogo('NS', '#141518', '#FAF8F5'),
      title: 'Scandinavian Minimal Denim Content Creation',
      category: 'Social Video',
      talentType: 'Content Creator',
      compensation: '$350 Flat Fee',
      perks: 'Pair of custom selvedge denim ($280 value)',
      location: 'Remote / Campus',
      campuses: 'All Campuses',
      deadline: 'May 25, 2027',
      slots: 4,
      moodboard: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['2x TikTok Styling Videos', '3x High-Res Still Photos'],
      description: 'Showcase how you integrate clean, raw selvedge denim into your daily university wardrobe. Focus on texture, fit, and timeless aesthetics.',
      requirements: [
        'Clean, bright video aesthetics and steady camera work',
        'Ability to meet strict delivery deadline'
      ]
    }
  ];

  // ============================================================================
  // SEED DATA: Applications to Atelier Marais
  // ============================================================================
  const INITIAL_APPLICATIONS = [
    {
      id: 'app-1',
      campaignId: 'camp-1',
      campaignTitle: 'Spring / Summer 2027 Boston Streetwear Campaign',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      creatorId: 'creator-1',
      creatorName: 'Maya Chen',
      creatorSchool: 'UMass Amherst · Class of 2028',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      creatorRole: 'Model · Creator',
      pitch: 'I would love to style the SS27 tailored overcoat on the UMass campus! I have experience shooting both high-res stills and high-performing TikToks. I can deliver 2 dynamic transition cuts within 5 days of receiving garments.',
      proposedRate: '$500 Flat Fee',
      portfolioLink: 'https://fashow2007.github.io/Fashow/#creators/maya-chen',
      status: 'Accepted',
      submittedAt: 'May 02, 2027'
    },
    {
      id: 'app-2',
      campaignId: 'camp-1',
      campaignTitle: 'Spring / Summer 2027 Boston Streetwear Campaign',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      creatorId: 'creator-4',
      creatorName: 'Chris Rivera',
      creatorSchool: 'Northeastern · Class of 2026',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      creatorRole: 'Stylist · Creator',
      pitch: 'Experienced with 35mm analogue film and street video in Boston. Would love to shoot these silhouettes in downtown Boston alleyways.',
      proposedRate: '$500 Flat Fee',
      portfolioLink: 'https://fashow2007.github.io/Fashow/#creators/chris-rivera',
      status: 'Pending',
      submittedAt: 'May 04, 2027'
    },
    {
      id: 'app-3',
      campaignId: 'camp-1',
      campaignTitle: 'Spring / Summer 2027 Boston Streetwear Campaign',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      creatorId: 'creator-2',
      creatorName: 'Jordan Williams',
      creatorSchool: 'Amherst College · Class of 2027',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      creatorRole: 'Model · Stylist',
      pitch: 'Architectural tailoring specialist with Boston network. I have an upcoming studio shoot in Boston that would be an ideal setting for these pieces.',
      proposedRate: '$500 Flat Fee',
      portfolioLink: 'https://fashow2007.github.io/Fashow/#creators/jordan-williams',
      status: 'Pending',
      submittedAt: 'May 05, 2027'
    }
  ];

  // ============================================================================
  // SEED DATA: Active Collaborations (6-Stage Vidovo Benchmark Workflow)
  // Stages: 1. Accepted -> 2. In Progress -> 3. Submitted -> 4. Revision Requested -> 5. Approved -> 6. Completed
  // ============================================================================
  const INITIAL_COLLABORATIONS = [
    {
      id: 'collab-1',
      campaignId: 'camp-1',
      campaignTitle: 'Spring / Summer 2027 Boston Streetwear Campaign',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      brandLogo: createSvgLogo('AM', '#141518', '#FAF8F5'),
      creatorId: 'creator-1',
      creatorName: 'Maya Chen',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      creatorSchool: 'UMass Amherst',
      fee: '$500 Flat Fee',
      dueDate: 'May 18, 2027',
      stage: 3, // Submitted
      stageName: 'Submitted',
      deliverablesRequired: '2x TikTok Styling Videos, 4x High-Res Lookbook Stills',
      deliverablesSubmitted: {
        previewImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        assetsLink: 'https://drive.google.com/drive/folders/fashow-atelier-marais-maya-chen',
        socialLink: 'https://www.tiktok.com/@maya.chen/video/734891234',
        notes: 'Shot all 4 lookbook portraits on 35mm analogue and filmed 2 morning-to-night styling cuts. Let me know if any audio timing changes are needed!'
      },
      updatedAt: 'Just now'
    },
    {
      id: 'collab-2',
      campaignId: 'camp-2',
      campaignTitle: 'Streetwear Campus Ambassador Cohort',
      brandId: 'brand-2',
      brandName: 'Kōhaku Apparel',
      brandLogo: createSvgLogo('KA', '#141518', '#FAF8F5'),
      creatorId: 'creator-4',
      creatorName: 'Chris Rivera',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      creatorSchool: 'Northeastern',
      fee: '$400 / month',
      dueDate: 'May 24, 2027',
      stage: 2, // In Progress
      stageName: 'In Progress',
      deliverablesRequired: '3x Monthly TikToks, 1x Lookbook Carousel',
      deliverablesSubmitted: null,
      updatedAt: '2 days ago'
    }
  ];

  // ============================================================================
  // SEED DATA: Direct In-Platform Messages
  // ============================================================================
  const INITIAL_CONVERSATIONS = [
    {
      id: 'conv-1',
      recipientId: 'creator-1',
      recipientName: 'Maya Chen',
      recipientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      recipientRole: 'Model · UMass Amherst',
      lastMessage: 'All required lookbook shots and 2 TikTok video edits uploaded!',
      lastTime: '10:45 AM',
      unread: true,
      messages: [
        { sender: 'brand', text: 'Hi Maya! We loved your portfolio on Fashow. We’d love to have you collaborate on our Spring/Summer Boston Streetwear Campaign.', time: 'Yesterday 2:15 PM' },
        { sender: 'creator', text: 'Thank you so much! I love the structural tailoring of your pieces. What is the target delivery date?', time: 'Yesterday 3:30 PM' },
        { sender: 'brand', text: 'We are targeting May 18th. Samples are on the way to you in Amherst today!', time: 'Yesterday 4:00 PM' },
        { sender: 'creator', text: 'All required lookbook shots and 2 TikTok video edits uploaded! Let me know if you would like any minor adjustments.', time: 'Today 10:45 AM' }
      ]
    },
    {
      id: 'conv-2',
      recipientId: 'creator-2',
      recipientName: 'Jordan Williams',
      recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      recipientRole: 'Model · Amherst College',
      lastMessage: 'Looking forward to the suiting fittings in Boston.',
      lastTime: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'brand', text: 'Jordan, your application is currently under review for our lookbook.', time: 'May 03 11:00 AM' },
        { sender: 'creator', text: 'Looking forward to the suiting fittings in Boston.', time: 'Yesterday 6:20 PM' }
      ]
    }
  ];

  // ============================================================================
  // STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  // ============================================================================
  const DATA_KEY_VER = 'fashow_v5_editorial';
  if (localStorage.getItem('fashow_version') !== DATA_KEY_VER) {
    localStorage.removeItem('fashow_creators');
    localStorage.removeItem('fashow_campaigns');
    localStorage.removeItem('fashow_applications');
    localStorage.removeItem('fashow_collaborations');
    localStorage.removeItem('fashow_saved_talent');
    localStorage.removeItem('fashow_conversations');
    localStorage.setItem('fashow_version', DATA_KEY_VER);
  }

  let creators = JSON.parse(localStorage.getItem('fashow_creators')) || INITIAL_CREATORS;
  let brands = INITIAL_BRANDS;
  let campaigns = JSON.parse(localStorage.getItem('fashow_campaigns')) || INITIAL_CAMPAIGNS;
  let applications = JSON.parse(localStorage.getItem('fashow_applications')) || INITIAL_APPLICATIONS;
  let collaborations = JSON.parse(localStorage.getItem('fashow_collaborations')) || INITIAL_COLLABORATIONS;
  let savedTalentIds = JSON.parse(localStorage.getItem('fashow_saved_talent')) || ['creator-1', 'creator-4'];
  let conversations = JSON.parse(localStorage.getItem('fashow_conversations')) || INITIAL_CONVERSATIONS;
  let activeConversationId = 'conv-1';

  // Role: 'brand' (Atelier Marais), 'creator' (Maya Chen), 'guest'
  let currentRole = localStorage.getItem('fashow_simulated_role') || 'guest';
  let currentView = 'home';

  function saveState() {
    localStorage.setItem('fashow_creators', JSON.stringify(creators));
    localStorage.setItem('fashow_campaigns', JSON.stringify(campaigns));
    localStorage.setItem('fashow_applications', JSON.stringify(applications));
    localStorage.setItem('fashow_collaborations', JSON.stringify(collaborations));
    localStorage.setItem('fashow_saved_talent', JSON.stringify(savedTalentIds));
    localStorage.setItem('fashow_conversations', JSON.stringify(conversations));
    localStorage.setItem('fashow_simulated_role', currentRole);
  }

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<span style="color: var(--accent); font-weight: bold;">✓</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea, button.btn-primary');
    if (firstInput) firstInput.focus();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ============================================================================
  // ROLE PERSPECTIVE SWITCHER (CLEAN & NON-INTRUSIVE)
  // ============================================================================
  function setSimulatedRole(role) {
    currentRole = role;
    saveState();

    const publicLinks = document.getElementById('nav-public-links');
    const brandLinks = document.getElementById('nav-brand-links');
    const creatorLinks = document.getElementById('nav-creator-links');
    const guestActions = document.getElementById('nav-guest-actions');
    const authActions = document.getElementById('nav-auth-actions');
    const userNameEl = document.getElementById('nav-user-name');
    const userRoleBadge = document.getElementById('nav-user-role-badge');
    const userAvatarEl = document.getElementById('nav-user-avatar');

    if (role === 'brand') {
      if (publicLinks) publicLinks.style.display = 'none';
      if (brandLinks) brandLinks.style.display = 'flex';
      if (creatorLinks) creatorLinks.style.display = 'none';
      if (guestActions) guestActions.style.display = 'none';
      if (authActions) authActions.style.display = 'flex';
      if (userNameEl) userNameEl.textContent = 'Atelier Marais';
      if (userRoleBadge) userRoleBadge.textContent = 'Brand';
      if (userAvatarEl) userAvatarEl.textContent = 'AM';
      showToast('Account: Atelier Marais (Brand)');
    } else if (role === 'creator') {
      if (publicLinks) publicLinks.style.display = 'none';
      if (brandLinks) brandLinks.style.display = 'none';
      if (creatorLinks) creatorLinks.style.display = 'flex';
      if (guestActions) guestActions.style.display = 'none';
      if (authActions) authActions.style.display = 'flex';
      if (userNameEl) userNameEl.textContent = 'Maya Chen';
      if (userRoleBadge) userRoleBadge.textContent = 'Creator';
      if (userAvatarEl) userAvatarEl.textContent = 'MC';
      showToast('Account: Maya Chen (Creator)');
    } else {
      if (publicLinks) publicLinks.style.display = 'flex';
      if (brandLinks) brandLinks.style.display = 'none';
      if (creatorLinks) creatorLinks.style.display = 'none';
      if (guestActions) guestActions.style.display = 'flex';
      if (authActions) authActions.style.display = 'none';
    }

    if (currentView === 'collaborations') renderCollaborationsWorkspace();
    if (currentView === 'brand-dashboard') renderBrandDashboard();
    if (currentView === 'messages') renderMessages();
  }

  // ============================================================================
  // CLIENT-SIDE ROUTER & VIEW CONTROLLER
  // ============================================================================
  function setView(viewName, param) {
    currentView = viewName;

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.style.display = 'none';
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render corresponding view data
    if (viewName === 'home') renderHome();
    if (viewName === 'discover') renderDiscoverFeed();
    if (viewName === 'creator-profile') renderCreatorProfile(param || 'maya-chen');
    if (viewName === 'campaigns') renderCampaignsFeed();
    if (viewName === 'campaign-detail') renderCampaignDetail(param || 'camp-1');
    if (viewName === 'brand-dashboard') renderBrandDashboard();
    if (viewName === 'collaborations') renderCollaborationsWorkspace();
    if (viewName === 'my-talent') renderSavedTalent();
    if (viewName === 'messages') renderMessages();
  }

  function handleRoute() {
    const hash = window.location.hash || '#home';

    if (hash === '' || hash === '#' || hash === '#home') {
      setView('home');
    } else if (hash === '#discover') {
      setView('discover');
    } else if (hash.startsWith('#creators/')) {
      const username = hash.replace('#creators/', '');
      setView('creator-profile', username);
    } else if (hash === '#profile') {
      setView('creator-profile', 'maya-chen');
    } else if (hash === '#for-brands') {
      setView('for-brands');
    } else if (hash === '#for-creators') {
      setView('for-creators');
    } else if (hash === '#about') {
      setView('about');
    } else if (hash === '#campaigns') {
      setView('campaigns');
    } else if (hash.startsWith('#campaigns/')) {
      const campId = hash.replace('#campaigns/', '');
      setView('campaign-detail', campId);
    } else if (hash === '#brand/dashboard') {
      setView('brand-dashboard');
    } else if (hash === '#brand/campaigns/new') {
      setView('campaign-builder');
    } else if (hash === '#collaborations') {
      setView('collaborations');
    } else if (hash === '#my-talent') {
      setView('my-talent');
    } else if (hash === '#messages') {
      setView('messages');
    } else {
      setView('home');
    }
  }

  // ============================================================================
  // RENDER: HOME TALENT SHOWCASE (SECTION 10)
  // ============================================================================
  function renderHome() {
    const grid = document.getElementById('home-creators-grid');
    if (!grid) return;

    // Feature top 6 creators on homepage
    const featured = creators.slice(0, 6);
    grid.innerHTML = featured.map(c => createCastingCardHtml(c)).join('');
    attachCastingCardEvents(grid);
  }

  // ============================================================================
  // CASTING CARD HTML GENERATOR (SECTION 24: DOMINANT PHOTOGRAPHY)
  // ============================================================================
  function createCastingCardHtml(creator) {
    const isSaved = savedTalentIds.includes(creator.id);
    const availClass = creator.availability === 'Available' ? 'status-green' : 'status-gold';

    return `
      <article class="casting-card" data-creator-id="${creator.id}">
        <div class="casting-media-wrapper">
          <img src="${creator.avatar}" alt="${creator.name} portrait" class="casting-primary-img" loading="lazy">
          <img src="${creator.hoverImage || creator.avatar}" alt="${creator.name} lookbook" class="casting-hover-img" loading="lazy">
          
          <div class="availability-pill ${availClass}">
            <span class="status-dot"></span>
            <span>${creator.availability}</span>
          </div>

          <button class="save-talent-btn ${isSaved ? 'saved' : ''}" data-creator-id="${creator.id}" aria-label="Save ${creator.name} to roster">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="casting-info">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <h3 class="casting-name">
              <a href="#creators/${creator.username}">${creator.name}</a>
              ${creator.verified ? `<span class="verified-check" title="Verified" aria-label="Verified" style="display:inline-flex; align-items:center; margin-left:4px; vertical-align:middle;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></span>` : ''}
            </h3>
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--accent);">${creator.aesthetic}</span>
          </div>

          <p class="casting-school">${creator.school} · ${creator.gradYear}</p>

          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
            ${creator.styles.map(s => `<span class="badge badge-neutral">${s}</span>`).join('')}
          </div>

          <div class="casting-metrics-strip">
            <div class="metric-item">
              <span class="metric-num">${creator.tiktok.followers}</span>
              <span class="metric-label">TikTok</span>
            </div>
            <div class="metric-item">
              <span class="metric-num">${creator.instagram.followers}</span>
              <span class="metric-label">Instagram</span>
            </div>
            <div class="metric-item">
              <span class="metric-num">${creator.engagementRate}</span>
              <span class="metric-label">Eng rate</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <a href="#creators/${creator.username}" class="btn btn-sm btn-secondary" style="flex: 1; text-align: center;">View profile</a>
            <button class="btn btn-sm btn-primary invite-btn" data-creator-id="${creator.id}">Invite</button>
          </div>
        </div>
      </article>
    `;
  }

  function attachCastingCardEvents(container) {
    container.querySelectorAll('.save-talent-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cid = btn.getAttribute('data-creator-id');
        toggleSaveTalent(cid, btn);
      });
    });

    container.querySelectorAll('.invite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cid = btn.getAttribute('data-creator-id');
        openInviteModal(cid);
      });
    });
  }

  function toggleSaveTalent(creatorId, btnEl) {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    const idx = savedTalentIds.indexOf(creatorId);
    if (idx > -1) {
      savedTalentIds.splice(idx, 1);
      if (btnEl) btnEl.classList.remove('saved');
      showToast(`Removed ${creator.name} from My Talent`);
    } else {
      savedTalentIds.push(creatorId);
      if (btnEl) btnEl.classList.add('saved');
      showToast(`Saved ${creator.name} to My Talent`);
    }
    saveState();
  }

  // ============================================================================
  // RENDER: MARKETPLACE DISCOVER (SECTION 23)
  // ============================================================================
  function renderDiscoverFeed() {
    const grid = document.getElementById('creators-marketplace-grid');
    const countEl = document.getElementById('discover-results-count');
    if (!grid) return;

    const searchVal = (document.getElementById('filter-search-input')?.value || '').toLowerCase().trim();
    const campusVal = document.getElementById('filter-campus-select')?.value || 'All';
    const locVal = document.getElementById('filter-location-select')?.value || 'All';
    
    const checkedTypes = [];
    document.querySelectorAll('.filter-checkbox:checked').forEach(cb => checkedTypes.push(cb.value));

    const activeStyleBtn = document.querySelector('.filter-style-btn.active');
    const styleVal = activeStyleBtn ? activeStyleBtn.getAttribute('data-style') : 'All';

    const availRadio = document.querySelector('input[name="filter-avail"]:checked');
    const availVal = availRadio ? availRadio.value : 'All';

    const filtered = creators.filter(c => {
      if (searchVal) {
        const matchesName = c.name.toLowerCase().includes(searchVal);
        const matchesSchool = c.school.toLowerCase().includes(searchVal);
        const matchesAesthetic = c.aesthetic.toLowerCase().includes(searchVal);
        const matchesStyles = c.styles.some(s => s.toLowerCase().includes(searchVal));
        if (!matchesName && !matchesSchool && !matchesAesthetic && !matchesStyles) return false;
      }

      if (campusVal !== 'All') {
        if (!c.school.toLowerCase().includes(campusVal.toLowerCase())) return false;
      }

      if (locVal !== 'All') {
        if (!c.location.toLowerCase().includes(locVal.toLowerCase())) return false;
      }

      if (checkedTypes.length > 0) {
        const hasRole = c.roles.some(r => checkedTypes.includes(r)) || checkedTypes.includes(c.primaryRole);
        if (!hasRole) return false;
      }

      if (styleVal !== 'All') {
        const hasStyle = c.aesthetic.toLowerCase() === styleVal.toLowerCase() || c.styles.some(s => s.toLowerCase() === styleVal.toLowerCase());
        if (!hasStyle) return false;
      }

      if (availVal !== 'All') {
        if (availVal === 'Available' && c.availability !== 'Available') return false;
        if (availVal === 'Booking' && !c.availability.includes('Booking')) return false;
      }

      return true;
    });

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} creators ready to collaborate.`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; background-color: var(--bg-card); border: 1px dashed var(--line); border-radius: var(--radius-sm);">
          <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 0.5rem;">No creators found matching these filters.</p>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Try broadening your campus or styling aesthetic criteria.</p>
          <button id="reset-filter-inner-btn" class="btn btn-secondary">Reset All Filters</button>
        </div>
      `;
      document.getElementById('reset-filter-inner-btn')?.addEventListener('click', resetFilters);
      return;
    }

    grid.innerHTML = filtered.map(c => createCastingCardHtml(c)).join('');
    attachCastingCardEvents(grid);
  }

  function resetFilters() {
    const searchInput = document.getElementById('filter-search-input');
    if (searchInput) searchInput.value = '';
    const campusSelect = document.getElementById('filter-campus-select');
    if (campusSelect) campusSelect.value = 'All';
    const locSelect = document.getElementById('filter-location-select');
    if (locSelect) locSelect.value = 'All';
    
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = true);
    document.querySelectorAll('.filter-style-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-style') === 'All');
    });
    const availAll = document.getElementById('avail-all');
    if (availAll) availAll.checked = true;

    renderDiscoverFeed();
  }

  // Quick Filter Jump Helpers
  function filterDiscoverByCampus(campus) {
    window.location.hash = '#discover';
    setTimeout(() => {
      const select = document.getElementById('filter-campus-select');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase().includes(campus.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
      renderDiscoverFeed();
    }, 50);
  }

  function filterDiscoverByStyle(style) {
    window.location.hash = '#discover';
    setTimeout(() => {
      document.querySelectorAll('.filter-style-btn').forEach(btn => {
        const btnStyle = btn.getAttribute('data-style');
        if (btnStyle && btnStyle.toLowerCase() === style.toLowerCase()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      renderDiscoverFeed();
    }, 50);
  }

  function filterDiscoverByRole(role) {
    window.location.hash = '#discover';
    setTimeout(() => {
      document.querySelectorAll('.filter-checkbox').forEach(cb => {
        if (cb.value.toLowerCase().includes(role.toLowerCase()) || role.toLowerCase().includes(cb.value.toLowerCase())) {
          cb.checked = true;
        } else {
          cb.checked = false;
        }
      });
      renderDiscoverFeed();
    }, 50);
  }

  // ============================================================================
  // RENDER: CREATOR PROFILE VIEW (SECTION 25)
  // ============================================================================
  function renderCreatorProfile(username) {
    const container = document.getElementById('creator-profile-container');
    if (!container) return;

    const creator = creators.find(c => c.username === username) || creators[0];
    const isSaved = savedTalentIds.includes(creator.id);

    container.innerHTML = `
      <div style="margin-bottom: var(--space-6);">
        <a href="#discover" class="btn btn-sm btn-ghost" style="padding-left: 0; color: var(--accent);">← Back to Discover</a>
      </div>

      <!-- Top Profile Hero -->
      <div class="creator-hero-layout">
        <!-- 3:4 Large Portrait -->
        <div class="creator-portrait-box">
          <img src="${creator.avatar}" alt="${creator.name}">
          <div style="position: absolute; top: var(--space-4); left: var(--space-4);">
            <span class="badge badge-gold">${creator.availability}</span>
          </div>
        </div>

        <!-- Meta Details -->
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: var(--space-2); flex-wrap: wrap;">
            <span class="section-eyebrow" style="margin: 0;">${creator.primaryRole}</span>
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${creator.location}</span>
          </div>

          <h1 style="font-family: var(--font-display); font-size: clamp(2.2rem, 4vw + 0.5rem, 3.25rem); font-weight: 800; letter-spacing: -0.03em; line-height: 0.98; margin-bottom: 0.35rem;">
            ${creator.name}
            ${creator.verified ? `<span class="verified-check" title="Verified" aria-label="Verified" style="display:inline-flex; align-items:center; margin-left:8px; vertical-align:middle;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></span>` : ''}
          </h1>

          <p style="font-size: 1.05rem; color: var(--accent); margin-bottom: var(--space-5);">
            ${creator.school} · ${creator.major} (${creator.gradYear})
          </p>

          <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text); margin-bottom: var(--space-6);">
            ${creator.bio}
          </p>

          <!-- Style Tags -->
          <div style="margin-bottom: var(--space-6);">
            <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; color: var(--muted); display: block; margin-bottom: 0.4rem;">
              Style & aesthetic
            </span>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              ${creator.styles.map(s => `<span class="badge badge-neutral" style="font-size: 0.82rem; padding: 0.25rem 0.65rem;">${s}</span>`).join('')}
            </div>
          </div>

          <!-- Social & Reach Strip -->
          <div class="creator-stats-bar" style="margin-bottom: var(--space-8);">
            <div class="creator-stat-card">
              <span class="stat-num">${creator.tiktok.followers}</span>
              <span class="stat-label">TikTok (${creator.tiktok.handle})</span>
            </div>
            <div class="creator-stat-card">
              <span class="stat-num">${creator.instagram.followers}</span>
              <span class="stat-label">Instagram (${creator.instagram.handle})</span>
            </div>
            <div class="creator-stat-card">
              <span class="stat-num">${creator.engagementRate}</span>
              <span class="stat-label">Engagement</span>
            </div>
            <div class="creator-stat-card">
              <span class="stat-num">${creator.rates.split(' ')[0]}</span>
              <span class="stat-label">Base Fee</span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
            <button class="btn btn-lg btn-primary" onclick="window.fashow.openInviteModal('${creator.id}')">
              Invite to campaign
            </button>
            <button class="btn btn-lg btn-secondary" onclick="window.fashow.startDirectMessage('${creator.id}')">
              Message
            </button>
            <button class="btn btn-lg btn-ghost" onclick="window.fashow.toggleSaveTalent('${creator.id}', null)">
              ${isSaved ? '★ Saved to my talent' : '☆ Save to my talent'}
            </button>
          </div>
        </div>
      </div>

      <!-- Portfolio Section (Section 25) -->
      <section style="margin-bottom: var(--space-20); border-top: 1px solid var(--line); padding-top: var(--space-12);">
        <div class="section-header-row" style="margin-bottom: var(--space-8);">
          <div>
            <span class="section-eyebrow">Portfolio</span>
            <h2 class="section-title">Lookbook & creative work</h2>
          </div>
        </div>

        <div class="masonry-gallery">
          ${creator.portfolio.map(p => `
            <div class="masonry-item">
              <img src="${p.img}" alt="${p.title}" loading="lazy">
              <div style="padding: var(--space-4);">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: 0.25rem;">${p.title}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">${p.caption}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Collaboration Details & Reviews -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-10); border-top: 1px solid var(--line); padding-top: var(--space-12);">
        <div>
          <span class="section-eyebrow">Services</span>
          <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: var(--space-4);">Available for</h3>
          <ul class="plain-bullets">
            ${creator.collabPreferences.map(pref => `
              <li>
                <span class="bullet-dash">—</span>
                <span><strong>${pref}</strong></span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <span class="section-eyebrow">Collaboration history</span>
          <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: var(--space-4);">Past brand work</h3>
          ${creator.pastCollabs.map(c => `
            <div style="background-color: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: var(--space-5); margin-bottom: var(--space-4);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.35rem;">
                <strong style="color: var(--text);">${c.brand}</strong>
                <span class="badge badge-neutral">${c.type}</span>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-secondary); font-style: italic; margin: 0;">"${c.quote}"</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ============================================================================
  // RENDER: CAMPAIGNS FEED & DETAIL VIEW
  // ============================================================================
  function renderCampaignsFeed(filterCategory = 'All') {
    const grid = document.getElementById('campaigns-feed-grid');
    if (!grid) return;

    const filtered = filterCategory === 'All' 
      ? campaigns 
      : campaigns.filter(c => c.category === filterCategory);

    grid.innerHTML = filtered.map(c => `
      <article class="campaign-card">
        <div style="position: relative; height: 200px; overflow: hidden; background-color: var(--bg-subtle);">
          <img src="${c.moodboard}" alt="${c.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: var(--space-3); left: var(--space-3);">
            <span class="badge badge-gold">${c.category}</span>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: var(--space-3) var(--space-4); background: linear-gradient(180deg, transparent 0%, rgba(20,21,24,0.85) 100%); display: flex; align-items: center; gap: 0.5rem;">
            <img src="${c.brandLogo}" alt="${c.brandName}" style="width: 24px; height: 24px; border-radius: 2px;">
            <span style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 500; color: #FFFFFF;">${c.brandName}</span>
          </div>
        </div>

        <div style="padding: var(--space-6); display: flex; flex-direction: column; flex: 1;">
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 500; letter-spacing: var(--tracking-card); line-height: 1.25; margin-bottom: var(--space-2);">
            <a href="#campaigns/${c.id}">${c.title}</a>
          </h3>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-4); flex: 1;">
            ${c.description.slice(0, 120)}...
          </p>

          <div style="background-color: var(--bg-subtle); padding: var(--space-3) var(--space-4); border-radius: var(--radius-xs); margin-bottom: var(--space-4); font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem;">
              <span style="color: var(--muted);">Fee:</span>
              <strong style="color: var(--accent);">${c.compensation}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">Campuses:</span>
              <span>${c.campuses.slice(0, 24)}...</span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <span style="font-size: 0.78rem; color: var(--muted);">Closes ${c.deadline}</span>
            <a href="#campaigns/${c.id}" class="btn btn-sm btn-primary">View brief & apply →</a>
          </div>
        </div>
      </article>
    `).join('');

    document.querySelectorAll('[data-campaign-filter]').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('[data-campaign-filter]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderCampaignsFeed(pill.getAttribute('data-campaign-filter'));
      });
    });
  }

  function renderCampaignDetail(campaignId) {
    const container = document.getElementById('campaign-detail-container');
    if (!container) return;

    const camp = campaigns.find(c => c.id === campaignId) || campaigns[0];

    container.innerHTML = `
      <div style="margin-bottom: var(--space-6);">
        <a href="#campaigns" class="btn btn-sm btn-ghost" style="padding-left: 0; color: var(--accent);">← Back to campaigns</a>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-12); align-items: start;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: var(--space-3);">
            <img src="${camp.brandLogo}" alt="${camp.brandName}" style="width: 32px; height: 32px; border-radius: 4px;">
            <span style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 500;">${camp.brandName}</span>
            <span class="badge badge-gold">${camp.category}</span>
          </div>

          <h1 style="font-family: var(--font-display); font-size: 2.75rem; font-weight: 800; line-height: 1.02; letter-spacing: -0.03em; margin-bottom: var(--space-6);">${camp.title}</h1>

          <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: var(--space-8); border: 1px solid var(--line);">
            <img src="${camp.moodboard}" alt="Moodboard" style="width: 100%; height: 360px; object-fit: cover;">
          </div>

          <section style="margin-bottom: var(--space-8);">
            <span class="section-eyebrow">Creative direction</span>
            <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: var(--space-3);">Campaign brief</h3>
            <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text);">${camp.description}</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <span class="section-eyebrow">Deliverables</span>
            <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: var(--space-3);">What you'll create</h3>
            <ul class="plain-bullets">
              ${camp.deliverables.map(d => `<li><span class="bullet-dash">—</span><span><strong>${d}</strong></span></li>`).join('')}
            </ul>
          </section>
        </div>

        <!-- Sticky Application Box -->
        <div style="background-color: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: var(--space-8); position: sticky; top: calc(var(--nav-height) + var(--space-6));">
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: var(--space-6);">Campaign details</h3>

          <div style="display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8);">
            <div>
              <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; color: var(--muted);">Compensation</span>
              <p style="font-family: var(--font-heading); font-size: 1.65rem; font-weight: 500; color: var(--accent); margin: 0.1rem 0 0;">${camp.compensation}</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">${camp.perks}</p>
            </div>
            <div>
              <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; color: var(--muted);">Campuses</span>
              <p style="font-size: 0.95rem; margin: 0.1rem 0 0;">${camp.campuses}</p>
            </div>
            <div>
              <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; color: var(--muted);">Location</span>
              <p style="font-size: 0.95rem; margin: 0.1rem 0 0;">${camp.location}</p>
            </div>
            <div>
              <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; color: var(--muted);">Deadline</span>
              <p style="font-size: 0.95rem; margin: 0.1rem 0 0; color: var(--accent);">${camp.deadline}</p>
            </div>
          </div>

          <button class="btn btn-primary" style="width: 100%; padding: 0.85rem;" onclick="window.fashow.openApplyModal('${camp.id}')">
            Apply to campaign →
          </button>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // RENDER: BRAND DASHBOARD (SECTION 26 & 30: ACTION-ORIENTED)
  // ============================================================================
  function renderBrandDashboard() {
    const list = document.getElementById('brand-applications-list');
    const campList = document.getElementById('brand-campaigns-list');
    const filterStatus = document.getElementById('dash-filter-app-status')?.value || 'All';

    const activeCamps = campaigns.filter(c => c.brandId === 'brand-1');
    const brandApps = applications.filter(a => a.brandId === 'brand-1');
    const brandCollabs = collaborations.filter(c => c.brandId === 'brand-1');

    document.getElementById('stat-active-campaigns').textContent = activeCamps.length;
    document.getElementById('stat-total-applicants').textContent = brandApps.length;
    document.getElementById('stat-active-collabs').textContent = brandCollabs.length;
    document.getElementById('stat-saved-talent').textContent = savedTalentIds.length;
    document.getElementById('dash-app-count').textContent = brandApps.length;
    document.getElementById('dash-camp-count').textContent = activeCamps.length;

    const filteredApps = filterStatus === 'All' 
      ? brandApps 
      : brandApps.filter(a => a.status === filterStatus);

    if (list) {
      if (filteredApps.length === 0) {
        list.innerHTML = `<div style="padding: 3rem; text-align: center; color: var(--text-secondary);">No applications found for "${filterStatus}".</div>`;
      } else {
        list.innerHTML = filteredApps.map(app => `
          <div style="background-color: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: var(--space-6); margin-bottom: var(--space-4);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
              <div style="display: flex; gap: var(--space-4); align-items: center;">
                <img src="${app.creatorAvatar}" alt="${app.creatorName}" style="width: 56px; height: 56px; border-radius: var(--radius-xs); object-fit: cover;">
                <div>
                  <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 500; letter-spacing: var(--tracking-card); margin: 0 0 0.15rem;">
                    <a href="#creators/${app.creatorId === 'creator-1' ? 'maya-chen' : 'jordan-williams'}">${app.creatorName}</a>
                    <span class="badge ${app.status === 'Accepted' ? 'badge-available' : 'badge-neutral'}" style="font-size: 0.68rem; margin-left: 0.4rem;">${app.status}</span>
                  </h4>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">${app.creatorSchool} · Applied for: <strong>${app.campaignTitle}</strong></p>
                </div>
              </div>

              <div style="text-align: right;">
                <span style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 500; color: var(--accent);">${app.proposedRate}</span>
                <p style="font-size: 0.75rem; color: var(--muted); margin: 0.15rem 0 0;">Submitted ${app.submittedAt}</p>
              </div>
            </div>

            <div style="background-color: var(--bg-subtle); border-left: 2px solid var(--accent); padding: var(--space-4); margin: var(--space-4) 0; border-radius: 0 var(--radius-xs) var(--radius-xs) 0;">
              <p style="font-size: 0.92rem; color: var(--text); line-height: 1.5; margin: 0;">"${app.pitch}"</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
              <a href="${app.portfolioLink}" class="btn btn-sm btn-ghost" style="padding-left: 0; color: var(--accent);">
                View full lookbook →
              </a>

              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-sm btn-ghost" onclick="window.fashow.startDirectMessage('${app.creatorId}')">Message</button>
                ${app.status === 'Pending' ? `
                  <button class="btn btn-sm btn-secondary" onclick="window.fashow.handleDeclineApplication('${app.id}')">Decline</button>
                  <button class="btn btn-sm btn-primary" onclick="window.fashow.handleAcceptApplication('${app.id}')">Accept ✓</button>
                ` : app.status === 'Accepted' ? `
                  <a href="#collaborations" class="btn btn-sm btn-secondary">Open in collaborations →</a>
                ` : `
                  <span style="font-size: 0.82rem; color: var(--muted);">Declined</span>
                `}
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    if (campList) {
      campList.innerHTML = activeCamps.map(c => `
        <div style="background-color: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: var(--space-6);">
          <h4 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: 0.35rem;">${c.title}</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: var(--space-4);">Compensation: <strong style="color: var(--accent);">${c.compensation}</strong> · Closes: ${c.deadline}</p>
          <a href="#campaigns/${c.id}" class="btn btn-sm btn-secondary">View brief</a>
        </div>
      `).join('');
    }

    document.querySelectorAll('[data-dash-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('[data-dash-tab]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetTab = tab.getAttribute('data-dash-tab');

        if (targetTab === 'applications') {
          document.getElementById('dash-tab-content-applications').style.display = 'block';
          document.getElementById('dash-tab-content-campaigns').style.display = 'none';
        } else if (targetTab === 'campaigns') {
          document.getElementById('dash-tab-content-applications').style.display = 'none';
          document.getElementById('dash-tab-content-campaigns').style.display = 'grid';
        } else if (targetTab === 'collaborations') {
          window.location.hash = '#collaborations';
        } else if (targetTab === 'saved') {
          window.location.hash = '#my-talent';
        }
      });
    });

    document.getElementById('dash-filter-app-status')?.addEventListener('change', renderBrandDashboard);
  }

  function handleAcceptApplication(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    app.status = 'Accepted';

    let collab = collaborations.find(c => c.campaignId === app.campaignId && c.creatorId === app.creatorId);
    if (!collab) {
      collab = {
        id: `collab-${Date.now()}`,
        campaignId: app.campaignId,
        campaignTitle: app.campaignTitle,
        brandId: app.brandId,
        brandName: app.brandName,
        brandLogo: createSvgLogo('AM', '#141518', '#FAF8F5'),
        creatorId: app.creatorId,
        creatorName: app.creatorName,
        creatorAvatar: app.creatorAvatar,
        creatorSchool: app.creatorSchool,
        fee: app.proposedRate,
        dueDate: 'May 18, 2027',
        stage: 1, // Accepted
        stageName: 'Accepted',
        deliverablesRequired: '2x TikTok Styling Videos, 4x Lookbook Stills',
        deliverablesSubmitted: null,
        updatedAt: 'Just now'
      };
      collaborations.unshift(collab);
    }

    saveState();
    showToast(`Accepted application from ${app.creatorName}!`);
    renderBrandDashboard();
  }

  function handleDeclineApplication(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    app.status = 'Declined';
    saveState();
    showToast('Application declined.');
    renderBrandDashboard();
  }

  // ============================================================================
  // RENDER: COLLABORATION WORKSPACE (SECTION 32 & 33: 6-STAGE WORKFLOW)
  // Stages: 1. Accepted -> 2. In Progress -> 3. Submitted -> 4. Revision Requested -> 5. Approved -> 6. Completed
  // ============================================================================
  const STAGE_LABELS = [
    'Accepted',
    'In Progress',
    'Submitted',
    'Revision Requested',
    'Approved',
    'Completed'
  ];

  function renderCollaborationsWorkspace() {
    const container = document.getElementById('collaborations-workspace-list');
    if (!container) return;

    if (collaborations.length === 0) {
      container.innerHTML = `
        <div style="padding: 4rem; text-align: center; background-color: var(--bg-card); border: 1px dashed var(--line); border-radius: var(--radius-sm);">
          <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 0.5rem;">No active collaborations yet.</p>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Accept an application or invite a creator to begin.</p>
          <a href="#discover" class="btn btn-primary">Scout Talent to Invite</a>
        </div>
      `;
      return;
    }

    container.innerHTML = collaborations.map(collab => {
      const isCreator = currentRole === 'creator';

      return `
        <div class="collaboration-card" style="background-color: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: var(--space-8);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: var(--space-6); flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <img src="${collab.brandLogo}" alt="${collab.brandName}" style="width: 24px; height: 24px; border-radius: 2px;">
                <span style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 500;">${collab.brandName}</span>
                <span style="color: var(--muted);">✕</span>
                <img src="${collab.creatorAvatar}" alt="${collab.creatorName}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
                <span style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 500;">${collab.creatorName}</span>
              </div>
              <h2 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 500; letter-spacing: var(--tracking-card); margin: 0 0 0.25rem;">${collab.campaignTitle}</h2>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">Deliverables: ${collab.deliverablesRequired}</p>
            </div>

            <div style="text-align: right;">
              <span class="badge badge-gold">Stage ${collab.stage} of 6: ${collab.stageName}</span>
              <p style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 500; color: var(--accent); margin: 0.35rem 0 0;">${collab.fee}</p>
            </div>
          </div>

          <!-- 6-Stage Stepper -->
          <div class="collab-stepper">
            ${STAGE_LABELS.map((label, idx) => {
              const stepNum = idx + 1;
              const isPast = stepNum < collab.stage;
              const isCurrent = stepNum === collab.stage;
              const stateClass = isPast ? 'completed' : isCurrent ? 'current' : 'future';

              return `
                <div class="collab-step-node ${stateClass}">
                  <div class="collab-step-circle">${isPast ? '✓' : stepNum}</div>
                  <span class="collab-step-label">${label}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Deliverables Showcase Box -->
          ${collab.deliverablesSubmitted ? `
            <div style="background-color: var(--bg-subtle); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: var(--space-6); margin: var(--space-6) 0;">
              <span class="section-eyebrow" style="margin-bottom: 0.5rem;">Submitted content</span>
              <div style="display: grid; grid-template-columns: 140px 1fr; gap: var(--space-5); align-items: start;">
                <img src="${collab.deliverablesSubmitted.previewImg}" alt="Deliverable Still" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: var(--radius-xs);">
                <div>
                  <h4 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 500; letter-spacing: var(--tracking-card); margin-bottom: 0.35rem;">Lookbook package</h4>
                  <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-4);">
                    "${collab.deliverablesSubmitted.notes}"
                  </p>
                  <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
                    <a href="${collab.deliverablesSubmitted.assetsLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
                      📁 Open drive assets ↗
                    </a>
                    ${collab.deliverablesSubmitted.socialLink ? `
                      <a href="${collab.deliverablesSubmitted.socialLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">
                        📱 Video link ↗
                      </a>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Contextual Controls -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: var(--space-5); flex-wrap: wrap; gap: 1rem;">
            <div style="font-size: 0.85rem; color: var(--muted);">
              Target Delivery: <strong>${collab.dueDate}</strong>
            </div>

            <div style="display: flex; gap: var(--space-2);">
              <button class="btn btn-sm btn-ghost" onclick="window.fashow.startDirectMessage('${collab.creatorId}')">Message</button>

              ${isCreator && collab.stage <= 2 ? `
                <button class="btn btn-sm btn-primary" onclick="window.fashow.openSubmitDeliverableModal('${collab.id}')">
                  Submit Deliverables →
                </button>
              ` : ''}

              ${!isCreator && collab.stage === 3 ? `
                <button class="btn btn-sm btn-secondary" onclick="window.fashow.openRequestRevisionModal('${collab.id}')">
                  Request Revision
                </button>
                <button class="btn btn-sm btn-primary" onclick="window.fashow.handleApproveDeliverables('${collab.id}')">
                  Approve Deliverables ✓
                </button>
              ` : ''}

              ${collab.stage >= 5 ? `
                <span class="badge badge-available">Approved & Complete ✓</span>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function handleApproveDeliverables(collabId) {
    const collab = collaborations.find(c => c.id === collabId);
    if (!collab) return;

    collab.stage = 5;
    collab.stageName = 'Approved';
    collab.updatedAt = 'Just now';
    saveState();
    showToast('Deliverables approved! Marked complete.');
    renderCollaborationsWorkspace();
  }

  function openSubmitDeliverableModal(collabId) {
    document.getElementById('deliverable-collab-id').value = collabId;
    openModal('submit-deliverable-modal');
  }

  function openRequestRevisionModal(collabId) {
    document.getElementById('revision-collab-id').value = collabId;
    openModal('request-revision-modal');
  }

  // ============================================================================
  // RENDER: SAVED TALENT ROSTER (MY TALENT - SECTION 35 & 37)
  // ============================================================================
  function renderSavedTalent() {
    const grid = document.getElementById('saved-talent-grid');
    if (!grid) return;

    const saved = creators.filter(c => savedTalentIds.includes(c.id));

    if (saved.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem; text-align: center; background-color: var(--bg-card); border: 1px dashed var(--line); border-radius: var(--radius-sm);">
          <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 0.5rem;">Your talent roster is empty.</p>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Save creators from the directory to build your recurring brand roster.</p>
          <a href="#discover" class="btn btn-primary">Discover Creators</a>
        </div>
      `;
      return;
    }

    grid.innerHTML = saved.map(c => createCastingCardHtml(c)).join('');
    attachCastingCardEvents(grid);
  }

  // ============================================================================
  // RENDER: IN-PLATFORM MESSAGING (SECTION 31)
  // ============================================================================
  function renderMessages() {
    const threadsList = document.getElementById('messages-threads-list');
    const headerEl = document.getElementById('chat-active-header');
    const streamEl = document.getElementById('chat-messages-stream');
    if (!threadsList || !headerEl || !streamEl) return;

    threadsList.innerHTML = conversations.map(conv => `
      <div class="thread-card ${conv.id === activeConversationId ? 'active' : ''}" data-conv-id="${conv.id}">
        <img src="${conv.recipientAvatar}" alt="${conv.recipientName}" style="width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover;">
        <div style="overflow: hidden; flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 500; letter-spacing: var(--tracking-card); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${conv.recipientName}
            </h4>
            <span style="font-size: 0.72rem; color: var(--muted);">${conv.lastTime}</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.15rem 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${conv.lastMessage}
          </p>
        </div>
      </div>
    `).join('');

    threadsList.querySelectorAll('.thread-card').forEach(item => {
      item.addEventListener('click', () => {
        activeConversationId = item.getAttribute('data-conv-id');
        renderMessages();
      });
    });

    const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
    if (!activeConv) return;

    headerEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="${activeConv.recipientAvatar}" alt="${activeConv.recipientName}" style="width: 38px; height: 38px; border-radius: var(--radius-xs); object-fit: cover;">
        <div>
          <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 500; margin: 0;">${activeConv.recipientName}</h4>
          <span style="font-size: 0.78rem; color: var(--accent);">${activeConv.recipientRole}</span>
        </div>
      </div>
      <a href="#creators/${activeConv.recipientId === 'creator-1' ? 'maya-chen' : 'jordan-williams'}" class="btn btn-sm btn-ghost">View lookbook ↗</a>
    `;

    streamEl.innerHTML = activeConv.messages.map(msg => `
      <div class="chat-bubble ${msg.sender === 'brand' ? 'chat-bubble-sent' : 'chat-bubble-received'}">
        <p style="margin: 0; line-height: 1.5; color: inherit;">${msg.text}</p>
        <span style="display: block; font-size: 0.68rem; opacity: 0.75; margin-top: 0.35rem; text-align: right;">${msg.time}</span>
      </div>
    `).join('');

    streamEl.scrollTop = streamEl.scrollHeight;
  }

  function startDirectMessage(creatorId) {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    let conv = conversations.find(c => c.recipientId === creatorId);
    if (!conv) {
      conv = {
        id: `conv-${Date.now()}`,
        recipientId: creator.id,
        recipientName: creator.name,
        recipientAvatar: creator.avatar,
        recipientRole: `${creator.primaryRole} · ${creator.school}`,
        lastMessage: 'Conversation started',
        lastTime: 'Just now',
        unread: false,
        messages: [
          { sender: 'brand', text: `Hi ${creator.name}! We love your portfolio on Fashow and wanted to reach out regarding our upcoming campaign brief.`, time: 'Just now' }
        ]
      };
      conversations.unshift(conv);
      saveState();
    }
    activeConversationId = conv.id;
    window.location.hash = '#messages';
  }

  function openInviteModal(creatorId) {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    document.getElementById('invite-creator-id').value = creator.id;
    document.getElementById('invite-creator-subtitle').textContent = `Inviting ${creator.name} (${creator.school})`;

    const select = document.getElementById('invite-campaign-select');
    if (select) {
      select.innerHTML = campaigns.map(c => `
        <option value="${c.id}">${c.title} (${c.compensation})</option>
      `).join('');
    }

    openModal('invite-campaign-modal');
  }

  function openApplyModal(campId) {
    const camp = campaigns.find(c => c.id === campId);
    if (!camp) return;

    document.getElementById('apply-target-campaign-id').value = camp.id;
    document.getElementById('apply-campaign-subtitle').textContent = `${camp.title} · ${camp.brandName}`;
    document.getElementById('apply-proposed-rate').value = camp.compensation;
    openModal('campaign-apply-modal');
  }

  function openCreatorOnboarding() {
    openModal('creator-onboarding-modal');
  }

  // ============================================================================
  // DOM EVENT BINDINGS
  // ============================================================================
  function initEventBindings() {
    window.addEventListener('hashchange', handleRoute);

    // Mobile nav toggle
    document.getElementById('mobile-nav-toggle-btn')?.addEventListener('click', () => {
      document.getElementById('mobile-nav-overlay')?.classList.add('active');
    });
    document.getElementById('mobile-nav-close-btn')?.addEventListener('click', () => {
      document.getElementById('mobile-nav-overlay')?.classList.remove('active');
    });
    document.querySelectorAll('.mobile-nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        document.getElementById('mobile-nav-overlay')?.classList.remove('active');
      });
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
      });
    });

    // Public Log In / Get Started nav triggers
    document.getElementById('nav-login-btn')?.addEventListener('click', () => openModal('login-modal'));
    document.getElementById('nav-get-started-btn')?.addEventListener('click', () => openModal('signup-choice-modal'));
    document.getElementById('nav-logout-btn')?.addEventListener('click', () => setSimulatedRole('guest'));

    // Discover Filter Inputs
    document.getElementById('filter-search-input')?.addEventListener('input', renderDiscoverFeed);
    document.getElementById('filter-campus-select')?.addEventListener('change', renderDiscoverFeed);
    document.getElementById('filter-location-select')?.addEventListener('change', renderDiscoverFeed);
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.addEventListener('change', renderDiscoverFeed));
    document.querySelectorAll('input[name="filter-avail"]').forEach(r => r.addEventListener('change', renderDiscoverFeed));

    document.querySelectorAll('.filter-style-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-style-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDiscoverFeed();
      });
    });

    document.getElementById('filter-reset-btn')?.addEventListener('click', resetFilters);

    // Homepage search input
    document.getElementById('home-search-preview')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = e.target.value.trim();
        window.location.hash = '#discover';
        setTimeout(() => {
          const searchInput = document.getElementById('filter-search-input');
          if (searchInput) searchInput.value = val;
          renderDiscoverFeed();
        }, 50);
      }
    });

    // Creator Onboarding Form Submit
    document.getElementById('creator-onboarding-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('onboard-name').value || 'New Creator';
      const newSchool = document.getElementById('onboard-school').value || 'University';
      const customAvatar = (document.getElementById('onboard-avatar').value || '').trim();
      const newAvatar = customAvatar || generateAvatarSvg(newName, '#171A20', '#E8B04A');
      const newBio = document.getElementById('onboard-bio').value || 'College model & creator.';
      const newUsername = newName.toLowerCase().replace(/[^a-z0-9]/g, '-');

      const newCreator = {
        id: `creator-${Date.now()}`,
        username: newUsername,
        name: newName,
        school: newSchool,
        major: document.getElementById('onboard-major').value || 'Fashion Design',
        gradYear: document.getElementById('onboard-grad').value || 'Class of 2028',
        location: 'Amherst & Boston, MA',
        primaryRole: 'Model',
        roles: ['Model', 'Creator'],
        aesthetic: 'Streetwear',
        styles: ['Streetwear', 'Editorial'],
        avatar: newAvatar,
        hoverImage: newAvatar,
        bio: newBio,
        tiktok: { handle: document.getElementById('onboard-tiktok-handle').value || '@creator', followers: '5K' },
        instagram: { handle: document.getElementById('onboard-ig-handle').value || '@creator', followers: '3K' },
        reachSummary: '8K Reach',
        engagementRate: '9.2%',
        availability: 'Available',
        rates: '$350 - $600',
        collabPreferences: ['Modeling', 'Lookbooks', 'TikTok'],
        portfolio: [
          { title: 'Inaugural Lookbook', img: newAvatar, caption: 'First portfolio lookbook entry on Fashow.' }
        ],
        pastCollabs: []
      };

      creators.unshift(newCreator);
      saveState();
      closeModal('creator-onboarding-modal');
      setSimulatedRole('creator');
      showToast(`Welcome to Fashow, ${newName}! Your profile is live.`);
      window.location.hash = `#creators/${newUsername}`;
    });

    // Brand Onboarding Form Submit
    document.getElementById('brand-onboard-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const bname = document.getElementById('reg-brand-name').value;
      closeModal('brand-onboarding-modal');
      setSimulatedRole('brand');
      showToast(`Welcome ${bname}! Brand portal unlocked.`);
      window.location.hash = '#brand/dashboard';
    });

    // Campaign Builder Form
    document.getElementById('campaign-builder-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('cb-title').value;
      const talentType = document.getElementById('cb-talent-type').value;
      const description = document.getElementById('cb-description').value;
      const moodboard = document.getElementById('cb-moodboard').value;
      const deliverablesStr = document.getElementById('cb-deliverables').value;
      const location = document.getElementById('cb-location').value;
      const campuses = document.getElementById('cb-campuses').value;
      const compensation = document.getElementById('cb-compensation').value;
      const perks = document.getElementById('cb-perks').value;
      const deadline = document.getElementById('cb-deadline').value;
      const slots = parseInt(document.getElementById('cb-slots').value, 10) || 3;

      const newCampaign = {
        id: `camp-${Date.now()}`,
        brandId: 'brand-1',
        brandName: 'Atelier Marais',
        brandLogo: createSvgLogo('AM', '#141518', '#FAF8F5'),
        title,
        category: 'Lookbook',
        talentType,
        compensation,
        perks,
        location,
        campuses,
        deadline,
        slots,
        moodboard: moodboard || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
        deliverables: deliverablesStr.split(',').map(s => s.trim()),
        description,
        requirements: ['Active college student', 'Fits campaign aesthetic direction']
      };

      campaigns.unshift(newCampaign);
      saveState();
      showToast('Campaign brief published!');
      window.location.hash = '#campaigns';
    });

    // Creator Application Form
    document.getElementById('campaign-apply-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const campId = document.getElementById('apply-target-campaign-id').value;
      const camp = campaigns.find(c => c.id === campId);
      const pitch = document.getElementById('apply-pitch-note').value;
      const proposedRate = document.getElementById('apply-proposed-rate').value;

      const newApp = {
        id: `app-${Date.now()}`,
        campaignId: campId,
        campaignTitle: camp ? camp.title : 'Campaign',
        brandId: camp ? camp.brandId : 'brand-1',
        brandName: camp ? camp.brandName : 'Atelier Marais',
        creatorId: 'creator-1',
        creatorName: 'Maya Chen',
        creatorSchool: 'UMass Amherst · Class of 2028',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
        creatorRole: 'Model · Creator',
        pitch,
        proposedRate,
        portfolioLink: 'https://fashow2007.github.io/Fashow/#profile',
        status: 'Pending',
        submittedAt: 'Just now'
      };

      applications.unshift(newApp);
      saveState();
      closeModal('campaign-apply-modal');
      showToast('Application submitted to brand!');
    });

    // Brand Invitation Form
    document.getElementById('invite-campaign-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const creatorId = document.getElementById('invite-creator-id').value;
      const creator = creators.find(c => c.id === creatorId);

      startDirectMessage(creatorId);
      closeModal('invite-campaign-modal');
      showToast(`Campaign invitation sent to ${creator ? creator.name : 'creator'}!`);
    });

    // Deliverable Submission Form
    document.getElementById('submit-deliverable-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const collabId = document.getElementById('deliverable-collab-id').value;
      const collab = collaborations.find(c => c.id === collabId);
      if (!collab) return;

      collab.deliverablesSubmitted = {
        previewImg: document.getElementById('deliv-preview-img').value,
        assetsLink: document.getElementById('deliv-assets-link').value,
        socialLink: document.getElementById('deliv-social-link').value,
        notes: document.getElementById('deliv-notes').value
      };
      collab.stage = 3; // Submitted
      collab.stageName = 'Submitted';
      collab.updatedAt = 'Just now';

      saveState();
      closeModal('submit-deliverable-modal');
      showToast('Deliverables submitted to brand!');
      renderCollaborationsWorkspace();
    });

    // Revision Request Form
    document.getElementById('request-revision-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const collabId = document.getElementById('revision-collab-id').value;
      const collab = collaborations.find(c => c.id === collabId);
      if (!collab) return;

      collab.stage = 4; // Revision Requested
      collab.stageName = 'Revision Requested';
      collab.updatedAt = 'Revision requested';

      saveState();
      closeModal('request-revision-modal');
      showToast('Revision notes sent to creator.');
      renderCollaborationsWorkspace();
    });

    // Chat Message Send Form
    document.getElementById('chat-send-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-input-field');
      const text = input.value.trim();
      if (!text) return;

      const conv = conversations.find(c => c.id === activeConversationId);
      if (!conv) return;

      const senderType = currentRole === 'creator' ? 'creator' : 'brand';
      conv.messages.push({
        sender: senderType,
        text,
        time: 'Just now'
      });
      conv.lastMessage = text;
      conv.lastTime = 'Just now';

      input.value = '';
      saveState();
      renderMessages();
    });

    // General Login Modal Form
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      closeModal('login-modal');

      if (email.includes('brand') || email.includes('atelier')) {
        setSimulatedRole('brand');
        window.location.hash = '#brand/dashboard';
      } else {
        setSimulatedRole('creator');
        window.location.hash = '#profile';
      }
    });
  }

  // ============================================================================
  // GLOBAL EXPORTS
  // ============================================================================
  window.fashow = {
    openModal,
    closeModal,
    setView,
    setSimulatedRole,
    filterDiscoverByCampus,
    filterDiscoverByStyle,
    filterDiscoverByRole,
    toggleSaveTalent,
    openCreatorOnboarding,
    openBrandOnboarding: () => openModal('brand-onboarding-modal'),
    openInviteModal,
    openApplyModal,
    openSubmitDeliverableModal,
    openRequestRevisionModal,
    handleAcceptApplication,
    handleDeclineApplication,
    handleApproveDeliverables,
    startDirectMessage
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initEventBindings();
    setSimulatedRole(currentRole);
    handleRoute();
  });

})();
