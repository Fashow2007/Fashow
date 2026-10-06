/* ==========================================================================
   FASHOW — Application Logic & Marketplace Architecture
   Vidovo-Benchmark Marketplace Mechanics & Fashion Editorial UX
   Vanilla JS · LocalStorage Persisted · Accessible · Zero External Dependencies
   ========================================================================== */

(function () {
  'use strict';

  // Helper to generate elegant, original brand SVG logos
  function createSvgLogo(initials, bg, fg) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="100" height="100" rx="8" fill="${bg}"/>
      <rect x="6" y="6" width="88" height="88" rx="6" fill="none" stroke="${fg}" stroke-width="1.5" opacity="0.3"/>
      <text x="50" y="56" text-anchor="middle" dominant-baseline="central" fill="${fg}" font-family="Bricolage Grotesque, Inter, sans-serif" font-size="34" font-weight="800" letter-spacing="2">${initials}</text>
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
      major: 'Fashion Marketing & Visual Arts',
      gradYear: 'Class of 2028',
      location: 'Boston & New York',
      primaryRole: 'Model',
      roles: ['Model', 'Creator'],
      aesthetic: 'Streetwear',
      styles: ['Streetwear', 'Lifestyle', 'Contemporary'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      bio: 'College model and streetwear content creator blending campus culture with contemporary ready-to-wear aesthetics. Experienced in on-camera modeling, lookbook styling, and short-form TikTok video production.',
      tiktok: { handle: '@maya.chen', followers: '14.2K' },
      instagram: { handle: '@mayachen_fit', followers: '5.1K' },
      reachSummary: '19.3K Combined Reach',
      engagementRate: '8.4%',
      availability: 'Available',
      rates: '$350 - $600 per campaign',
      collabPreferences: ['Lookbook Modeling', 'TikTok Styling Series', 'Campus Activation', 'Capsule Drops'],
      portfolio: [
        {
          title: 'Soho Autumn Outerwear Series',
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
          title: 'Studio Capsule Fitting',
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
      location: 'Boston & New York',
      primaryRole: 'Model',
      roles: ['Model', 'Stylist'],
      aesthetic: 'Luxury',
      styles: ['Luxury', 'Minimal', 'Tailoring'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Menswear model focused on modern tailoring, architectural silhouettes, and heritage textiles. Collaborates with luxury ateliers and independent menswear labels.',
      tiktok: { handle: '@jordan.style', followers: '8.7K' },
      instagram: { handle: '@jwilliams.fits', followers: '11.4K' },
      reachSummary: '20.1K Combined Reach',
      engagementRate: '6.9%',
      availability: 'Available',
      rates: '$400 - $750 per campaign',
      collabPreferences: ['Menswear Lookbooks', 'Runway Presentations', 'Suiting Campaigns'],
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
      location: 'Boston, MA',
      primaryRole: 'Creator',
      roles: ['Creator', 'Micro-Influencer'],
      aesthetic: 'Y2K',
      styles: ['Y2K', 'Vintage', 'Lifestyle'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Thrift stylist and Y2K aesthetic content creator. Known for viral "Outfit of the Day on Campus" videos and nostalgic denim pairings with over 220K monthly video views.',
      tiktok: { handle: '@aaliyahbrooks', followers: '28.6K' },
      instagram: { handle: '@aaliyahb.style', followers: '9.8K' },
      reachSummary: '38.4K Combined Reach',
      engagementRate: '11.2%',
      availability: 'Booking for Fall',
      rates: '$450 - $800 per campaign',
      collabPreferences: ['TikTok GRWM Series', 'Vintage Denim Activations', 'College Gifting'],
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
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Skate culture stylist, vintage curator, and 35mm analogue photographer. Focuses on gritty urban lookbooks, heavy denim, and graphic accessories.',
      tiktok: { handle: '@rivera.archive', followers: '16.8K' },
      instagram: { handle: '@chrisrivera_35mm', followers: '8.4K' },
      reachSummary: '25.2K Combined Reach',
      engagementRate: '9.1%',
      availability: 'Available',
      rates: '$350 - $650 per campaign',
      collabPreferences: ['Streetwear Lookbooks', 'Analogue 35mm Shoots', 'Skate Styling'],
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
      major: 'Film & Dramatic Arts (Tisch)',
      gradYear: 'Class of 2027',
      location: 'New York, NY',
      primaryRole: 'Model',
      roles: ['Model', 'Creator'],
      aesthetic: 'Minimal',
      styles: ['Minimal', 'Luxury', 'Contemporary'],
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      bio: 'NYU Tisch student with experience in runway walking, cinematic fashion shorts, and monochrome editorial campaigns. Deep connection to Downtown Manhattan art circles.',
      tiktok: { handle: '@elena.rostova', followers: '18.9K' },
      instagram: { handle: '@elenarostova_', followers: '14.2K' },
      reachSummary: '33.1K Combined Reach',
      engagementRate: '7.8%',
      availability: 'Available',
      rates: '$500 - $900 per campaign',
      collabPreferences: ['Runway Shows', 'High-Fashion Editorial', 'Film Video Campaigns'],
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
      aesthetic: 'Athleisure',
      styles: ['Athleisure', 'Streetwear', 'Lifestyle'],
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'BU varsity track athlete and menswear creator blending technical athletic wear with streetwear. Extensive leadership across campus fitness and student organizations.',
      tiktok: { handle: '@marcusvance', followers: '22.3K' },
      instagram: { handle: '@marcus.vance', followers: '15.6K' },
      reachSummary: '37.9K Combined Reach',
      engagementRate: '8.7%',
      availability: 'Available',
      rates: '$400 - $700 per campaign',
      collabPreferences: ['Activewear Drops', 'Campus Ambassador Activations', 'Footwear Launches'],
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
      styles: ['Minimal', 'Contemporary', 'Avant-Garde'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'FIT student with a focus on zero-waste patternmaking, Japanese denim, and quiet luxury styling. Works as an assistant stylist for independent Chelsea showrooms.',
      tiktok: { handle: '@chloe.tanaka', followers: '11.5K' },
      instagram: { handle: '@chloetanaka_fit', followers: '9.2K' },
      reachSummary: '20.7K Combined Reach',
      engagementRate: '9.4%',
      availability: 'Available',
      rates: '$350 - $600 per campaign',
      collabPreferences: ['Lookbook Styling', 'Behind-the-Scenes Production', 'Textile Showcases'],
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
      styles: ['Avant-Garde', 'Streetwear', 'Experimental'],
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Experimental model pushing the boundaries of genderless tailoring, distressed knitwear, and dystopian streetwear. Walked at multiple student runway showcases in NYC.',
      tiktok: { handle: '@liam.oconnor', followers: '15.4K' },
      instagram: { handle: '@liam.archive', followers: '12.8K' },
      reachSummary: '28.2K Combined Reach',
      engagementRate: '8.1%',
      availability: 'Booking for Fall',
      rates: '$450 - $750 per campaign',
      collabPreferences: ['Experimental Castings', 'Video Lookbooks', 'Runway Presentations'],
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
      major: 'Annenberg PR & Fashion Marketing',
      gradYear: 'Class of 2027',
      location: 'Los Angeles, CA',
      primaryRole: 'Micro-Influencer',
      roles: ['Micro-Influencer', 'Creator', 'Model'],
      aesthetic: 'Lifestyle',
      styles: ['Lifestyle', 'Contemporary', 'Streetwear'],
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      bio: 'Southern California creator sharing sun-drenched styling, beach-to-campus transitions, and sustainable ready-to-wear collections. Highly engaged West Coast college demographic.',
      tiktok: { handle: '@samdiaz.fit', followers: '34.2K' },
      instagram: { handle: '@samanthadiaz', followers: '21.5K' },
      reachSummary: '55.7K Combined Reach',
      engagementRate: '10.3%',
      availability: 'Available',
      rates: '$500 - $850 per campaign',
      collabPreferences: ['TikTok Video Series', 'Brand Trips & Events', 'Campus Ambassadorship'],
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
      aesthetic: 'Luxury',
      styles: ['Luxury', 'Vintage', 'Tailoring'],
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Columbia student blending Ivy League collegiate aesthetics with modern high-fashion tailoring. Editorial model with distinct profile and sharp jawline.',
      tiktok: { handle: '@malikhayes', followers: '12.1K' },
      instagram: { handle: '@malik.hayes', followers: '16.7K' },
      reachSummary: '28.8K Combined Reach',
      engagementRate: '7.5%',
      availability: 'Available',
      rates: '$450 - $800 per campaign',
      collabPreferences: ['Editorial Lookbooks', 'Tailoring Campaigns', 'Campus Castings'],
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
    },
    {
      id: 'creator-11',
      username: 'zoe-kravitz-cole',
      name: 'Zoe Cole',
      school: 'RISD',
      major: 'Apparel Design',
      gradYear: 'Class of 2026',
      location: 'Providence & New York',
      primaryRole: 'Stylist',
      roles: ['Stylist', 'Model'],
      aesthetic: 'Vintage',
      styles: ['Vintage', 'Y2K', 'Avant-Garde'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'RISD senior focusing on hand-draped textiles, archival upcycling, and sculptural jewelry styling. Often models her own bespoke creations.',
      tiktok: { handle: '@zoecole.design', followers: '17.3K' },
      instagram: { handle: '@zoecole_risd', followers: '13.9K' },
      reachSummary: '31.2K Combined Reach',
      engagementRate: '12.4%',
      availability: 'Booking for Fall',
      rates: '$400 - $700 per campaign',
      collabPreferences: ['Archival Styling', 'Bespoke Collaborations', 'Lookbooks'],
      portfolio: [
        {
          title: 'Providence Textile Study',
          img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
          caption: 'Hand-dyed organic silks layered with vintage workwear denim.'
        }
      ],
      pastCollabs: [
        { brand: 'Maison Solène', type: 'Textile Research Assistant', quote: 'Zoe brings true artisan craftsmanship and high-concept taste.' }
      ]
    },
    {
      id: 'creator-12',
      username: 'devon-park',
      name: 'Devon Park',
      school: 'Harvard',
      major: 'History & Literature',
      gradYear: 'Class of 2027',
      location: 'Boston, MA',
      primaryRole: 'Creator',
      roles: ['Creator', 'Model'],
      aesthetic: 'Minimal',
      styles: ['Minimal', 'Contemporary', 'Lifestyle'],
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Understated menswear creator highlighting minimalist Japanese workwear, chore coats, and clean studio aesthetics. Writes cultural essays on fashion history.',
      tiktok: { handle: '@devonpark', followers: '19.4K' },
      instagram: { handle: '@devon.park', followers: '18.1K' },
      reachSummary: '37.5K Combined Reach',
      engagementRate: '7.9%',
      availability: 'Available',
      rates: '$400 - $750 per campaign',
      collabPreferences: ['Minimalist Lookbooks', 'Editorial Reviews', 'Contemporary RTW'],
      portfolio: [
        {
          title: 'Cambridge Architecture & Tailoring',
          img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
          caption: 'Navy wool overcoat and raw denim captured in Harvard Yard.'
        }
      ],
      pastCollabs: [
        { brand: 'Nordic Studio', type: 'Denim Campaign', quote: 'Devon writes and shoots with deliberate literary elegance.' }
      ]
    }
  ];

  // ============================================================================
  // SEED DATA: 6 Verified Fashion Houses & Ateliers
  // ============================================================================
  const INITIAL_BRANDS = [
    {
      id: 'brand-1',
      name: 'Atelier Marais',
      slug: 'atelier-marais',
      logo: createSvgLogo('AM', '#0F1115', '#F6C453'),
      category: 'Ready-to-Wear / High Fashion',
      location: 'Soho, New York',
      website: 'https://ateliermarais.com',
      bio: 'Contemporary independent atelier crafting tailored silhouettes, architectural outerwear, and sustainable luxury textiles for modern creatives.',
      verified: true
    },
    {
      id: 'brand-2',
      name: 'Kōhaku Apparel',
      slug: 'kohaku-apparel',
      logo: createSvgLogo('KA', '#171A20', '#F28A2E'),
      category: 'Streetwear & Contemporary',
      location: 'Lower East Side, NYC',
      website: 'https://kohaku.design',
      bio: 'Downtown Manhattan streetwear label drawing inspiration from Japanese workwear, modular garment engineering, and skate culture.',
      verified: true
    },
    {
      id: 'brand-3',
      name: 'Maison Solène',
      slug: 'maison-solene',
      logo: createSvgLogo('MS', '#0F1115', '#F6C453'),
      category: 'Couture & Ready-to-Wear',
      location: 'Madison Ave, New York',
      website: 'https://maisonsolene.com',
      bio: 'Heritage-inspired evening wear and sculptural silk garments designed for showroom presentations and runway exhibitions.',
      verified: true
    },
    {
      id: 'brand-4',
      name: 'Revue Editorial',
      slug: 'revue-editorial',
      logo: createSvgLogo('RE', '#171A20', '#FFFFFF'),
      category: 'Editorial Publishing & Agency',
      location: 'Chelsea, New York',
      website: 'https://revue-mag.fashion',
      bio: 'Independent fashion publication and casting agency bridging university creative talent with high-profile seasonal editorials.',
      verified: true
    },
    {
      id: 'brand-5',
      name: 'Nordic Studio',
      slug: 'nordic-studio',
      logo: createSvgLogo('NS', '#0F1115', '#F5F1E8'),
      category: 'Minimal Denim & Knitwear',
      location: 'Soho, New York & Stockholm',
      website: 'https://nordicstudio.store',
      bio: 'Sustainable Scandinavian essentials focused on undyed organic wool, Japanese selvedge denim, and timeless oversized outerwear.',
      verified: true
    },
    {
      id: 'brand-6',
      name: 'Aero Creative Labs',
      slug: 'aero-creative',
      logo: createSvgLogo('AC', '#171A20', '#F6C453'),
      category: 'Technical Footwear & Apparel',
      location: 'Boston, MA',
      website: 'https://aerolabs.design',
      bio: 'Performance footwear and modular streetwear built at the intersection of collegiate athletics and progressive industrial design.',
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
      brandLogo: createSvgLogo('AM', '#0F1115', '#F6C453'),
      title: 'Autumn / Winter Capsule Lookbook & TikTok Series',
      category: 'Lookbook',
      talentType: 'Model & Content Creator',
      compensation: '$500 Flat Fee',
      perks: 'Full capsule wardrobe gifted ($450 retail value)',
      location: 'New York, NY',
      campuses: 'UMass Amherst, NYU, FIT, Parsons, Columbia',
      deadline: 'Nov 15, 2026',
      slots: 3,
      moodboard: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['2x TikTok Styling Videos', '4x High-Res Lookbook Photos', '1x IG Story Sequence'],
      description: 'Atelier Marais is casting 3 college models and creators to style and showcase our Autumn/Winter wool tailored outerwear and raw silk trousers. Shoot on campus or in NYC with natural lighting, capturing movement and silhouette details.',
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
      brandLogo: createSvgLogo('KA', '#171A20', '#F28A2E'),
      title: 'LES Streetwear Campus Ambassador Cohort',
      category: 'Ambassador',
      talentType: 'Campus Ambassador & Creator',
      compensation: '$400 / month',
      perks: 'Monthly drop wardrobe + 20% campus affiliate commission',
      location: 'Campus / Hybrid',
      campuses: 'UMass Amherst, Northeastern, Boston University',
      deadline: 'Nov 20, 2026',
      slots: 4,
      moodboard: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['3x Monthly TikToks', 'Campus Drop Flyer Handout', '1x Monthly Lookbook Carousel'],
      description: 'Represent Kōhaku Apparel on your university campus. Wear our drop garments to lectures and campus events, host mini pop-ups, and share authentic video GRWMs.',
      requirements: [
        'Active campus presence and involvement in student organizations',
        'TikTok or Instagram audience exceeding 5K engaged followers',
        'Strong affinity for skate, vintage, or Japanese streetwear'
      ]
    },
    {
      id: 'camp-3',
      brandId: 'brand-3',
      brandName: 'Maison Solène',
      brandLogo: createSvgLogo('MS', '#0F1115', '#F6C453'),
      title: 'Runway & Showroom Presentation Casting',
      category: 'Modeling',
      talentType: 'Runway Model',
      compensation: '$650 / Day',
      perks: 'Professional runway stills + lookbook feature',
      location: 'New York, NY',
      campuses: 'NYU, FIT, Parsons, Columbia',
      deadline: 'Dec 01, 2026',
      slots: 5,
      moodboard: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['Garment Fitting', 'Runway Walk Presentation', 'Backstage Documentation'],
      description: 'Open casting for college students interested in runway modeling and showroom presentations for our seasonal couture presentation in Manhattan.',
      requirements: [
        'Open availability during presentation rehearsal and showcase day',
        'Strong runway posture and stage presence',
        'All body types and backgrounds welcome'
      ]
    },
    {
      id: 'camp-4',
      brandId: 'brand-4',
      brandName: 'Revue Editorial',
      brandLogo: createSvgLogo('RE', '#171A20', '#FFFFFF'),
      title: 'Spring Issue Editorial Styling Assistant & Model',
      category: 'Lookbook',
      talentType: 'Stylist & Creative',
      compensation: '$24 / Hour ($600 Total)',
      perks: 'Print credit in Revue Issue 14 + sample loans',
      location: 'Chelsea, New York',
      campuses: 'All Campuses (Travel Stipend Provided)',
      deadline: 'Nov 25, 2026',
      slots: 2,
      moodboard: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['On-Set Garment Prep', 'Editorial Model Stand-in', 'BTS Video Production'],
      description: 'Assist senior stylists on our Spring digital cover story and lookbook spread. Hands-on experience with luxury ready-to-wear samples and studio production.',
      requirements: [
        'Passion for editorial styling and backstage production rigor',
        'Familiarity with contemporary design houses and independent labels'
      ]
    },
    {
      id: 'camp-5',
      brandId: 'brand-5',
      brandName: 'Nordic Studio',
      brandLogo: createSvgLogo('NS', '#0F1115', '#F5F1E8'),
      title: 'Scandinavian Minimal Denim Content Creation',
      category: 'Social Video',
      talentType: 'Content Creator',
      compensation: '$350 Flat Fee',
      perks: 'Pair of custom selvedge denim ($280 value)',
      location: 'Remote / Campus',
      campuses: 'All Campuses',
      deadline: 'Dec 05, 2026',
      slots: 4,
      moodboard: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['2x TikTok Styling Videos', '3x High-Res Still Photos'],
      description: 'Showcase how you integrate clean, raw selvedge denim into your daily university wardrobe. Focus on texture, fit, and timeless aesthetics.',
      requirements: [
        'Clean, bright video aesthetics and steady camera work',
        'Ability to meet strict delivery deadline'
      ]
    },
    {
      id: 'camp-6',
      brandId: 'brand-6',
      brandName: 'Aero Creative Labs',
      brandLogo: createSvgLogo('AC', '#171A20', '#F6C453'),
      title: 'Technical Footwear Campus Launch Series',
      category: 'Social Video',
      talentType: 'Campus Ambassador & Creator',
      compensation: '$450 Flat Fee',
      perks: '2 Pairs Aero Technical Footwear gifted ($380 value)',
      location: 'Boston & New York Campuses',
      campuses: 'UMass Amherst, BU, Northeastern, Harvard',
      deadline: 'Dec 10, 2026',
      slots: 3,
      moodboard: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      deliverables: ['2x High-Paced TikToks', '1x Campus Walk Reel', '5x Stills'],
      description: 'Debut Aero technical trail shoes on campus. Highlight weather resistance, sleek silhouette, and versatile urban styling.',
      requirements: [
        'Energetic lifestyle, athlete, or streetwear creator',
        'Experience producing dynamic motion content'
      ]
    }
  ];

  // ============================================================================
  // SEED DATA: Applications to Atelier Marais (Vidovo Mechanics Benchmark)
  // ============================================================================
  const INITIAL_APPLICATIONS = [
    {
      id: 'app-1',
      campaignId: 'camp-1',
      campaignTitle: 'Autumn / Winter Capsule Lookbook & TikTok Series',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      creatorId: 'creator-1',
      creatorName: 'Maya Chen',
      creatorSchool: 'UMass Amherst · Class of 2028',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      creatorRole: 'Model · Creator',
      pitch: 'I would love to style the Autumn/Winter wool tailored overcoat on the UMass campus! I have experience shooting both high-res stills and high-performing TikToks (average 15K views per fit video). I can deliver 2 dynamic transition cuts within 5 days of receiving garments.',
      proposedRate: '$500 Flat Fee',
      portfolioLink: 'https://fashow2007.github.io/Fashow/#creators/maya-chen',
      status: 'Pending', // 'Pending', 'Accepted', 'Declined'
      submittedAt: 'Oct 04, 2026'
    },
    {
      id: 'app-2',
      campaignId: 'camp-1',
      campaignTitle: 'Autumn / Winter Capsule Lookbook & TikTok Series',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      creatorId: 'creator-2',
      creatorName: 'Jordan Williams',
      creatorSchool: 'Amherst College · Class of 2027',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      creatorRole: 'Model · Stylist',
      pitch: 'My architectural background complements Atelier Marais double-breasted suiting. I have an upcoming studio shoot in Boston that would be an ideal setting for these pieces.',
      proposedRate: '$500 Flat Fee',
      portfolioLink: 'https://fashow2007.github.io/Fashow/#creators/jordan-williams',
      status: 'Accepted',
      submittedAt: 'Oct 03, 2026'
    },
    {
      id: 'app-3',
      campaignId: 'camp-1',
      campaignTitle: 'Autumn / Winter Capsule Lookbook & TikTok Series',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      creatorId: 'creator-9',
      creatorName: 'Samantha Diaz',
      creatorSchool: 'USC · Class of 2027',
      creatorAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
      creatorRole: 'Micro-Influencer',
      pitch: 'Would love to shoot a West Coast interpretation of your tailoring! Clean natural lighting in downtown LA.',
      proposedRate: '$550 Flat Fee',
      portfolioLink: 'https://fashow2007.github.io/Fashow/#creators/samantha-diaz',
      status: 'Pending',
      submittedAt: 'Oct 05, 2026'
    }
  ];

  // ============================================================================
  // SEED DATA: Active Collaborations (Vidovo 6-Stage Workflow Benchmark)
  // Stages: 1. Matched -> 2. Briefed -> 3. In Production -> 4. Deliverables Submitted -> 5. Approved -> 6. Complete
  // ============================================================================
  const INITIAL_COLLABORATIONS = [
    {
      id: 'collab-1',
      campaignId: 'camp-1',
      campaignTitle: 'Autumn / Winter Capsule Lookbook & TikTok Series',
      brandId: 'brand-1',
      brandName: 'Atelier Marais',
      brandLogo: createSvgLogo('AM', '#0F1115', '#F6C453'),
      creatorId: 'creator-1',
      creatorName: 'Maya Chen',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      creatorSchool: 'UMass Amherst',
      fee: '$500 Flat Fee',
      dueDate: 'Nov 18, 2026',
      stage: 4, // 1 to 6
      stageName: 'Deliverables Submitted',
      deliverablesRequired: '2x TikTok Styling Videos, 4x High-Res Lookbook Photos',
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
      brandLogo: createSvgLogo('KA', '#171A20', '#F28A2E'),
      creatorId: 'creator-4',
      creatorName: 'Chris Rivera',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      creatorSchool: 'Northeastern',
      fee: '$400 / month',
      dueDate: 'Nov 24, 2026',
      stage: 3,
      stageName: 'In Production',
      deliverablesRequired: '3x Monthly TikToks, 1x Lookbook Carousel',
      deliverablesSubmitted: null,
      updatedAt: '2 days ago'
    },
    {
      id: 'collab-3',
      campaignId: 'camp-3',
      campaignTitle: 'Runway & Showroom Presentation Casting',
      brandId: 'brand-3',
      brandName: 'Maison Solène',
      brandLogo: createSvgLogo('MS', '#0F1115', '#F6C453'),
      creatorId: 'creator-5',
      creatorName: 'Elena Rostova',
      creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      creatorSchool: 'NYU Tisch',
      fee: '$650 / Day',
      dueDate: 'Dec 02, 2026',
      stage: 5,
      stageName: 'Approved',
      deliverablesRequired: 'Fitting attendance, Runway presentation walk',
      deliverablesSubmitted: {
        previewImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        assetsLink: 'https://frame.io/maisonsolene-elena-runway-final',
        notes: 'Final presentation walk recorded in 4K ProRes.'
      },
      updatedAt: '3 days ago'
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
      recipientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      recipientRole: 'Model · UMass Amherst',
      lastMessage: 'All required lookbook shots and 2 TikTok video edits uploaded!',
      lastTime: '10:45 AM',
      unread: true,
      messages: [
        { sender: 'brand', text: 'Hi Maya! We were blown away by your styling aesthetic and campus lookbook. We’d love to have you collaborate on our Autumn/Winter outerwear campaign.', time: 'Yesterday 2:15 PM' },
        { sender: 'creator', text: 'Thank you so much! I love the structural tailoring of your pieces. What is the deadline for the video delivery?', time: 'Yesterday 3:30 PM' },
        { sender: 'brand', text: 'We’re targeting November 18th. Samples are on the way to you in Amherst today!', time: 'Yesterday 4:00 PM' },
        { sender: 'creator', text: 'All required lookbook shots and 2 TikTok video edits uploaded! Let me know if you would like any minor color grading adjustments.', time: 'Today 10:45 AM' }
      ]
    },
    {
      id: 'conv-2',
      recipientId: 'creator-2',
      recipientName: 'Jordan Williams',
      recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      recipientRole: 'Model · Amherst College',
      lastMessage: 'Looking forward to the suiting fittings next week.',
      lastTime: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'brand', text: 'Jordan, your application has been accepted for our lookbook.', time: 'Oct 03 11:00 AM' },
        { sender: 'creator', text: 'Looking forward to the suiting fittings next week.', time: 'Yesterday 6:20 PM' }
      ]
    }
  ];

  // ============================================================================
  // STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  // ============================================================================
  const DATA_KEY_VER = 'fashow_v4_marketplace';
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
  let currentRole = localStorage.getItem('fashow_simulated_role') || 'brand';
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

  // Toast notifications
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<span style="color: var(--gold); font-weight: bold;">✓</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Modal helpers
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
  // SIMULATED PERSPECTIVE ROLE SWITCHER
  // ============================================================================
  function setSimulatedRole(role) {
    currentRole = role;
    saveState();

    // Update demo bar button active states
    document.querySelectorAll('.demo-role-btn').forEach(btn => {
      if (btn.getAttribute('data-role') === role) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const descEl = document.getElementById('demo-role-desc');
    const guestActions = document.getElementById('nav-guest-actions');
    const authActions = document.getElementById('nav-auth-actions');
    const brandHubLink = document.getElementById('nav-brand-hub-link');
    const creatorProfileLink = document.getElementById('nav-creator-profile-link');
    const userNameEl = document.getElementById('nav-user-name');
    const userBadgeEl = document.getElementById('nav-user-badge');
    const userAvatarEl = document.getElementById('nav-user-avatar');

    if (role === 'brand') {
      if (descEl) descEl.textContent = 'Simulating: Atelier Marais (Soho RTW Label)';
      if (guestActions) guestActions.style.display = 'none';
      if (authActions) authActions.style.display = 'flex';
      if (brandHubLink) brandHubLink.style.display = 'inline-block';
      if (creatorProfileLink) creatorProfileLink.style.display = 'none';
      if (userNameEl) userNameEl.textContent = 'Atelier Marais';
      if (userBadgeEl) userBadgeEl.textContent = 'Brand';
      if (userAvatarEl) userAvatarEl.textContent = 'AM';
      showToast('Switched to Brand View: Atelier Marais');
    } else if (role === 'creator') {
      if (descEl) descEl.textContent = 'Simulating: Maya Chen (UMass Amherst Model)';
      if (guestActions) guestActions.style.display = 'none';
      if (authActions) authActions.style.display = 'flex';
      if (brandHubLink) brandHubLink.style.display = 'none';
      if (creatorProfileLink) creatorProfileLink.style.display = 'inline-block';
      if (userNameEl) userNameEl.textContent = 'Maya Chen';
      if (userBadgeEl) userBadgeEl.textContent = 'Creator';
      if (userAvatarEl) userAvatarEl.textContent = 'MC';
      showToast('Switched to Creator View: Maya Chen');
    } else {
      if (descEl) descEl.textContent = 'Viewing as Public Guest';
      if (guestActions) guestActions.style.display = 'flex';
      if (authActions) authActions.style.display = 'none';
      showToast('Switched to Guest View');
    }

    // Refresh view specific components if active
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
    if (viewName === 'for-brands') { /* Static view */ }
    if (viewName === 'for-creators') { /* Static view */ }
    if (viewName === 'campaigns') renderCampaignsFeed();
    if (viewName === 'campaign-detail') renderCampaignDetail(param || 'camp-1');
    if (viewName === 'brand-dashboard') renderBrandDashboard();
    if (viewName === 'campaign-builder') { /* Initialized via form */ }
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
    } else if (hash === '#how-it-works-sec') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works-sec');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setView('home');
    }
  }

  // ============================================================================
  // RENDER: HOME TALENT ROSTER
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
  // CASTING CARD HTML GENERATOR
  // ============================================================================
  function createCastingCardHtml(creator) {
    const isSaved = savedTalentIds.includes(creator.id);
    const availClass = creator.availability === 'Available' ? 'status-green' : 'status-gold';

    return `
      <article class="casting-card" data-creator-id="${creator.id}">
        <div class="casting-media-wrapper">
          <img src="${creator.avatar}" alt="${creator.name} portrait" class="casting-primary-img" loading="lazy">
          <img src="${creator.hoverImage || creator.avatar}" alt="${creator.name} styling look" class="casting-hover-img" loading="lazy">
          
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
              <span class="badge badge-gold" style="font-size: 0.65rem; padding: 0.05rem 0.35rem; margin-left: 0.3rem;">✓ VERIFIED</span>
            </h3>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold);">${creator.aesthetic}</span>
          </div>

          <p class="casting-school">${creator.school} · ${creator.gradYear}</p>

          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
            ${creator.styles.map(s => `<span class="badge badge-neutral" style="font-size: 0.68rem; padding: 0.1rem 0.4rem;">${s}</span>`).join('')}
          </div>

          <div class="casting-metrics-strip">
            <span><strong>${creator.tiktok.followers}</strong> TikTok</span>
            <span>·</span>
            <span><strong>${creator.instagram.followers}</strong> IG</span>
            <span>·</span>
            <span style="color: var(--gold);"><strong>${creator.engagementRate}</strong> Eng</span>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <a href="#creators/${creator.username}" class="btn btn-sm btn-secondary" style="flex: 1; text-align: center;">View Profile</a>
            <button class="btn btn-sm btn-primary invite-btn" data-creator-id="${creator.id}" style="padding: 0.4rem 0.8rem;">Invite</button>
          </div>
        </div>
      </article>
    `;
  }

  function attachCastingCardEvents(container) {
    // Save to roster heart buttons
    container.querySelectorAll('.save-talent-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cid = btn.getAttribute('data-creator-id');
        toggleSaveTalent(cid, btn);
      });
    });

    // Direct Invite buttons
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
      showToast(`Saved ${creator.name} to My Talent Roster`);
    }
    saveState();
  }

  // ============================================================================
  // RENDER: MARKETPLACE DISCOVER WITH FILTERING
  // ============================================================================
  function renderDiscoverFeed() {
    const grid = document.getElementById('creators-marketplace-grid');
    const countEl = document.getElementById('discover-results-count');
    if (!grid) return;

    // Read filter values
    const searchVal = (document.getElementById('filter-search-input')?.value || '').toLowerCase().trim();
    const campusVal = document.getElementById('filter-campus-select')?.value || 'All';
    const locVal = document.getElementById('filter-location-select')?.value || 'All';
    
    // Checked talent types
    const checkedTypes = [];
    document.querySelectorAll('.filter-checkbox:checked').forEach(cb => checkedTypes.push(cb.value));

    // Active aesthetic style
    const activeStyleBtn = document.querySelector('.filter-style-btn.active');
    const styleVal = activeStyleBtn ? activeStyleBtn.getAttribute('data-style') : 'All';

    // Availability radio
    const availRadio = document.querySelector('input[name="filter-avail"]:checked');
    const availVal = availRadio ? availRadio.value : 'All';

    // Filter creators
    const filtered = creators.filter(c => {
      // Search text filter
      if (searchVal) {
        const matchesName = c.name.toLowerCase().includes(searchVal);
        const matchesSchool = c.school.toLowerCase().includes(searchVal);
        const matchesAesthetic = c.aesthetic.toLowerCase().includes(searchVal);
        const matchesStyles = c.styles.some(s => s.toLowerCase().includes(searchVal));
        if (!matchesName && !matchesSchool && !matchesAesthetic && !matchesStyles) return false;
      }

      // Campus filter
      if (campusVal !== 'All') {
        if (!c.school.toLowerCase().includes(campusVal.toLowerCase())) return false;
      }

      // Location filter
      if (locVal !== 'All') {
        if (!c.location.toLowerCase().includes(locVal.toLowerCase())) return false;
      }

      // Talent type filter
      if (checkedTypes.length > 0) {
        const hasRole = c.roles.some(r => checkedTypes.includes(r)) || checkedTypes.includes(c.primaryRole);
        if (!hasRole) return false;
      }

      // Style aesthetic filter
      if (styleVal !== 'All') {
        const hasStyle = c.aesthetic.toLowerCase() === styleVal.toLowerCase() || c.styles.some(s => s.toLowerCase() === styleVal.toLowerCase());
        if (!hasStyle) return false;
      }

      // Availability filter
      if (availVal !== 'All') {
        if (availVal === 'Available' && c.availability !== 'Available') return false;
        if (availVal === 'Booking' && !c.availability.includes('Booking')) return false;
      }

      return true;
    });

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} verified creators across 8 university campuses.`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; background: var(--ink-2); border: 1px dashed var(--line); border-radius: var(--radius-sm);">
          <p style="font-size: 1.1rem; color: var(--paper); margin-bottom: 0.5rem;">No creators found matching these filters.</p>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 1.5rem;">Try broadening your campus or styling aesthetic criteria.</p>
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

  // Quick Campus Filter from homepage chips
  function filterDiscoverByCampus(campusName) {
    window.location.hash = '#discover';
    setTimeout(() => {
      const select = document.getElementById('filter-campus-select');
      if (select) {
        select.value = campusName;
      }
      renderDiscoverFeed();
    }, 100);
  }

  // ============================================================================
  // RENDER: CREATOR PROFILE & LOOKBOOK VIEW
  // ============================================================================
  function renderCreatorProfile(username) {
    const container = document.getElementById('creator-profile-container');
    if (!container) return;

    const creator = creators.find(c => c.username === username) || creators[0];
    const isSaved = savedTalentIds.includes(creator.id);

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <a href="#discover" class="btn btn-sm btn-ghost" style="padding-left: 0; color: var(--gold);">← Back to Discover</a>
      </div>

      <!-- Creator Hero Layout -->
      <div class="creator-hero-layout" style="display: grid; grid-template-columns: 340px 1fr; gap: 3rem; align-items: start; margin-bottom: 4rem;">
        
        <!-- Left: 3:4 Editorial Portrait -->
        <div class="creator-portrait-box" style="position: relative; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--line); aspect-ratio: 3/4; background: var(--ink-2);">
          <img src="${creator.avatar}" alt="${creator.name}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: 1rem; left: 1rem;">
            <span class="badge badge-gold" style="font-size: 0.72rem; padding: 0.25rem 0.6rem;">${creator.availability}</span>
          </div>
        </div>

        <!-- Right: Bio & Profile Details -->
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="section-label">${creator.primaryRole}</span>
            <span class="badge badge-gold">✓ VERIFIED STUDENT</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--muted);">${creator.location}</span>
          </div>

          <h1 class="hero-title-main" style="font-size: 2.75rem; margin-bottom: 0.5rem;">${creator.name}</h1>
          <p style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--gold); margin-bottom: 1.5rem;">
            ${creator.school} · ${creator.major} (${creator.gradYear})
          </p>

          <p style="font-size: 1.05rem; line-height: 1.7; color: var(--paper); opacity: 0.92; margin-bottom: 2rem;">
            ${creator.bio}
          </p>

          <!-- Aesthetic Style Badges -->
          <div style="margin-bottom: 2rem;">
            <span class="filter-heading" style="margin-bottom: 0.5rem;">Aesthetic & Styling Focus</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${creator.styles.map(s => `<span class="badge badge-neutral" style="font-size: 0.82rem; padding: 0.25rem 0.65rem;">${s}</span>`).join('')}
            </div>
          </div>

          <!-- Social Reach & Stats Bar -->
          <div class="creator-stats-bar" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem;">
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
              <span class="stat-label">Avg Engagement</span>
            </div>
            <div class="creator-stat-card">
              <span class="stat-num">${creator.rates.split(' ')[0]}</span>
              <span class="stat-label">Starting Rate</span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-lg btn-primary" onclick="window.fashow.openInviteModal('${creator.id}')">
              Invite to Campaign
            </button>
            <button class="btn btn-lg btn-secondary" onclick="window.fashow.startDirectMessage('${creator.id}')">
              Message Creator
            </button>
            <button class="btn btn-lg btn-ghost" onclick="window.fashow.toggleSaveTalent('${creator.id}', null)">
              ${isSaved ? '★ Saved to My Talent' : '☆ Save to My Talent'}
            </button>
          </div>
        </div>

      </div>

      <!-- Portfolio & Lookbook Gallery -->
      <section style="margin-bottom: 5rem;">
        <div class="section-header-row" style="margin-bottom: 2rem;">
          <div>
            <span class="section-eyebrow">EDITORIAL ARCHIVE</span>
            <h2 class="section-title">Lookbook & Portfolio</h2>
            <p style="color: var(--muted); font-size: 0.95rem;">High-fashion stills and campaign styling work.</p>
          </div>
        </div>

        <div class="masonry-gallery" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          ${creator.portfolio.map(p => `
            <div class="masonry-item" style="border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; background: var(--ink-2);">
              <img src="${p.img}" alt="${p.title}" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
              <div style="padding: 1rem;">
                <h4 style="font-family: var(--font-display); font-size: 1rem; margin-bottom: 0.35rem;">${p.title}</h4>
                <p style="font-size: 0.82rem; color: var(--muted); line-height: 1.5; margin: 0;">${p.caption}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Collaboration Terms & Past Work -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; padding-top: 3rem; border-top: 1px solid var(--line);">
        <div>
          <span class="section-eyebrow">PREFERENCES</span>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">Willing To Collaborate On</h3>
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
          <span class="section-eyebrow">VERIFIED REVIEWS</span>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">Past Brand Partnerships</h3>
          ${creator.pastCollabs.map(c => `
            <div style="background: var(--ink-2); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                <strong style="color: var(--gold);">${c.brand}</strong>
                <span class="badge badge-neutral" style="font-size: 0.7rem;">${c.type}</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--paper); font-style: italic; margin: 0;">"${c.quote}"</p>
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
      <article class="campaign-card" style="background: var(--ink-2); border: 1px solid var(--line); border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column;">
        <div style="position: relative; height: 180px; overflow: hidden;">
          <img src="${c.moodboard}" alt="${c.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: 1rem; left: 1rem;">
            <span class="badge badge-gold" style="font-size: 0.72rem;">${c.category.toUpperCase()}</span>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 0.75rem 1rem; background: linear-gradient(180deg, transparent, rgba(15,17,21,0.92)); display: flex; align-items: center; gap: 0.5rem;">
            <img src="${c.brandLogo}" alt="${c.brandName}" style="width: 24px; height: 24px; border-radius: 4px;">
            <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: #FFFFFF;">${c.brandName}</span>
          </div>
        </div>

        <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
          <h3 style="font-family: var(--font-display); font-size: 1.2rem; line-height: 1.3; margin-bottom: 0.5rem;">
            <a href="#campaigns/${c.id}" style="color: var(--text-main);">${c.title}</a>
          </h3>

          <p style="font-size: 0.85rem; color: var(--muted); line-height: 1.5; margin-bottom: 1rem; flex: 1;">
            ${c.description.slice(0, 110)}...
          </p>

          <div style="background: var(--ink-3); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.25rem;">
              <span style="color: var(--muted);">Fee:</span>
              <strong style="color: var(--gold);">${c.compensation}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem;">
              <span style="color: var(--muted);">Campuses:</span>
              <span style="color: var(--paper); font-size: 0.75rem;">${c.campuses.slice(0, 26)}...</span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted);">Closes ${c.deadline}</span>
            <a href="#campaigns/${c.id}" class="btn btn-sm btn-primary">View Brief & Apply →</a>
          </div>
        </div>
      </article>
    `).join('');

    // Attach campaign filter pills
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
      <div style="margin-bottom: 1.5rem;">
        <a href="#campaigns" class="btn btn-sm btn-ghost" style="padding-left: 0; color: var(--gold);">← Back to Campaigns</a>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; align-items: start;">
        
        <!-- Left: Brief Details -->
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <img src="${camp.brandLogo}" alt="${camp.brandName}" style="width: 32px; height: 32px; border-radius: 4px;">
            <span style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;">${camp.brandName}</span>
            <span class="badge badge-gold">${camp.category.toUpperCase()}</span>
          </div>

          <h1 class="hero-title-main" style="font-size: 2.5rem; margin-bottom: 1rem;">${camp.title}</h1>

          <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 2rem; border: 1px solid var(--line);">
            <img src="${camp.moodboard}" alt="Moodboard" style="width: 100%; height: 320px; object-fit: cover;">
          </div>

          <section style="margin-bottom: 2.5rem;">
            <span class="section-eyebrow">CREATIVE BRIEF</span>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 0.75rem;">Campaign Vision</h3>
            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--paper); opacity: 0.95;">
              ${camp.description}
            </p>
          </section>

          <section style="margin-bottom: 2.5rem;">
            <span class="section-eyebrow">DELIVERABLES REQUIRED</span>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 0.75rem;">Expected Assets</h3>
            <ul class="plain-bullets">
              ${camp.deliverables.map(d => `
                <li>
                  <span class="bullet-dash">—</span>
                  <span><strong>${d}</strong></span>
                </li>
              `).join('')}
            </ul>
          </section>

          <section>
            <span class="section-eyebrow">ELIGIBILITY & REQUIREMENTS</span>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 0.75rem;">Who Should Apply</h3>
            <ul class="plain-bullets">
              ${camp.requirements.map(r => `
                <li>
                  <span class="bullet-dash">—</span>
                  <span>${r}</span>
                </li>
              `).join('')}
            </ul>
          </section>
        </div>

        <!-- Right: Application Card & Sticky Summary -->
        <div style="background: var(--ink-2); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 2rem; position: sticky; top: 100px;">
          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 1.5rem;">Campaign Summary</h3>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--muted); font-family: var(--font-mono);">Compensation</span>
              <p style="font-size: 1.25rem; font-weight: 700; color: var(--gold); margin: 0.2rem 0 0;">${camp.compensation}</p>
              <p style="font-size: 0.8rem; color: var(--muted); margin: 0;">${camp.perks}</p>
            </div>

            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--muted); font-family: var(--font-mono);">Campuses Eligible</span>
              <p style="font-size: 0.95rem; margin: 0.2rem 0 0;">${camp.campuses}</p>
            </div>

            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--muted); font-family: var(--font-mono);">Shoot Location</span>
              <p style="font-size: 0.95rem; margin: 0.2rem 0 0;">${camp.location}</p>
            </div>

            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--muted); font-family: var(--font-mono);">Applications Deadline</span>
              <p style="font-size: 0.95rem; margin: 0.2rem 0 0; color: var(--orange);">${camp.deadline}</p>
            </div>
          </div>

          <button class="btn btn-primary" style="width: 100%; padding: 0.85rem;" onclick="window.fashow.openApplyModal('${camp.id}')">
            Apply to Campaign →
          </button>
          <p style="font-size: 0.75rem; color: var(--muted); text-align: center; margin-top: 0.75rem;">
            Applications are reviewed directly by ${camp.brandName}.
          </p>
        </div>

      </div>
    `;
  }

  // ============================================================================
  // RENDER: BRAND DASHBOARD & APPLICATIONS REVIEW (VIDOVO BENCHMARK)
  // ============================================================================
  function renderBrandDashboard() {
    const list = document.getElementById('brand-applications-list');
    const campList = document.getElementById('brand-campaigns-list');
    const filterStatus = document.getElementById('dash-filter-app-status')?.value || 'All';

    // Stats
    const activeCamps = campaigns.filter(c => c.brandId === 'brand-1');
    const brandApps = applications.filter(a => a.brandId === 'brand-1');
    const brandCollabs = collaborations.filter(c => c.brandId === 'brand-1');

    document.getElementById('stat-active-campaigns').textContent = activeCamps.length;
    document.getElementById('stat-total-applicants').textContent = brandApps.length;
    document.getElementById('stat-active-collabs').textContent = brandCollabs.length;
    document.getElementById('stat-saved-talent').textContent = savedTalentIds.length;
    document.getElementById('dash-app-count').textContent = brandApps.length;
    document.getElementById('dash-camp-count').textContent = activeCamps.length;

    // Filter applications
    const filteredApps = filterStatus === 'All' 
      ? brandApps 
      : brandApps.filter(a => a.status === filterStatus);

    if (list) {
      if (filteredApps.length === 0) {
        list.innerHTML = `<div style="padding: 2.5rem; text-align: center; color: var(--muted);">No applications found for "${filterStatus}".</div>`;
      } else {
        list.innerHTML = filteredApps.map(app => `
          <div class="application-item" style="background: var(--ink-2); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 1.5rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
              
              <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${app.creatorAvatar}" alt="${app.creatorName}" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 1px solid var(--line-gold);">
                <div>
                  <h4 style="font-family: var(--font-display); font-size: 1.15rem; margin: 0 0 0.2rem;">
                    <a href="#creators/${app.creatorId === 'creator-1' ? 'maya-chen' : 'jordan-williams'}">${app.creatorName}</a>
                    <span class="badge ${app.status === 'Accepted' ? 'badge-gold' : 'badge-neutral'}" style="font-size: 0.68rem; margin-left: 0.4rem;">${app.status.toUpperCase()}</span>
                  </h4>
                  <p style="font-size: 0.8rem; color: var(--muted); margin: 0;">${app.creatorSchool} · Applied for: <strong>${app.campaignTitle}</strong></p>
                </div>
              </div>

              <div style="text-align: right;">
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold); font-weight: 700;">${app.proposedRate}</span>
                <p style="font-size: 0.72rem; color: var(--muted); margin: 0.2rem 0 0;">Submitted ${app.submittedAt}</p>
              </div>

            </div>

            <div style="background: var(--ink-3); border-left: 2px solid var(--gold); padding: 0.9rem 1rem; margin: 1rem 0; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
              <p style="font-size: 0.88rem; color: var(--paper); line-height: 1.5; margin: 0;">
                "${app.pitch}"
              </p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
              <a href="${app.portfolioLink}" class="btn btn-sm btn-ghost" style="padding-left: 0; color: var(--gold);">
                View Full Lookbook Spread →
              </a>

              <div style="display: flex; gap: 0.5rem;">
                ${app.status === 'Pending' ? `
                  <button class="btn btn-sm btn-secondary" onclick="window.fashow.handleDeclineApplication('${app.id}')">Decline</button>
                  <button class="btn btn-sm btn-primary" onclick="window.fashow.handleAcceptApplication('${app.id}')">Accept & Open Collab ✓</button>
                ` : app.status === 'Accepted' ? `
                  <a href="#collaborations" class="btn btn-sm btn-secondary">Open in Collabs Workspace →</a>
                ` : `
                  <span style="font-size: 0.8rem; color: var(--muted);">Declined</span>
                `}
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Active campaigns sub-list
    if (campList) {
      campList.innerHTML = activeCamps.map(c => `
        <div style="background: var(--ink-2); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 1.25rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 0.35rem;">${c.title}</h4>
          <p style="font-size: 0.8rem; color: var(--muted); margin-bottom: 0.75rem;">Compensation: <strong style="color: var(--gold);">${c.compensation}</strong> · Closes: ${c.deadline}</p>
          <div style="display: flex; gap: 0.5rem;">
            <a href="#campaigns/${c.id}" class="btn btn-sm btn-secondary" style="flex: 1; text-align: center;">View Brief</a>
          </div>
        </div>
      `).join('');
    }

    // Attach tab switches
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

  // Handle Application Accept (1-Click acceptance creating a collaboration)
  function handleAcceptApplication(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    app.status = 'Accepted';

    // Check if collaboration already exists
    let collab = collaborations.find(c => c.campaignId === app.campaignId && c.creatorId === app.creatorId);
    if (!collab) {
      collab = {
        id: `collab-${Date.now()}`,
        campaignId: app.campaignId,
        campaignTitle: app.campaignTitle,
        brandId: app.brandId,
        brandName: app.brandName,
        brandLogo: createSvgLogo('AM', '#0F1115', '#F6C453'),
        creatorId: app.creatorId,
        creatorName: app.creatorName,
        creatorAvatar: app.creatorAvatar,
        creatorSchool: app.creatorSchool,
        fee: app.proposedRate,
        dueDate: 'Dec 01, 2026',
        stage: 2, // Briefed
        stageName: 'Briefed',
        deliverablesRequired: '2x TikTok Styling Videos, 4x Lookbook Stills',
        deliverablesSubmitted: null,
        updatedAt: 'Just now'
      };
      collaborations.unshift(collab);
    }

    saveState();
    showToast(`Accepted application from ${app.creatorName}! Collaboration opened.`);
    renderBrandDashboard();
  }

  function handleDeclineApplication(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    app.status = 'Declined';
    saveState();
    showToast(`Declined application.`);
    renderBrandDashboard();
  }

  // ============================================================================
  // RENDER: COLLABORATION WORKSPACE (VIDOVO BENCHMARK MECHANICS)
  // 6 Stages: 1. Matched -> 2. Briefed -> 3. In Production -> 4. Deliverables Submitted -> 5. Approved -> 6. Complete
  // ============================================================================
  const STAGE_LABELS = [
    'Matched',
    'Briefed',
    'In Production',
    'Deliverables Submitted',
    'Approved',
    'Complete'
  ];

  function renderCollaborationsWorkspace() {
    const container = document.getElementById('collaborations-workspace-list');
    if (!container) return;

    if (collaborations.length === 0) {
      container.innerHTML = `
        <div style="padding: 4rem; text-align: center; background: var(--ink-2); border: 1px dashed var(--line); border-radius: var(--radius-md);">
          <p style="font-size: 1.1rem; color: var(--paper); margin-bottom: 0.5rem;">No active collaborations yet.</p>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 1.5rem;">Accept an application or invite a creator to begin.</p>
          <a href="#discover" class="btn btn-primary">Scout Talent to Invite</a>
        </div>
      `;
      return;
    }

    container.innerHTML = collaborations.map(collab => {
      const isCreatorView = currentRole === 'creator';
      const isBrandView = currentRole === 'brand' || currentRole === 'guest';

      return `
        <div class="collaboration-card" style="background: var(--ink-2); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 2rem;">
          
          <!-- Top Collab Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem;">
                <img src="${collab.brandLogo}" alt="${collab.brandName}" style="width: 28px; height: 28px; border-radius: 4px;">
                <span style="font-family: var(--font-display); font-size: 1rem; font-weight: 700;">${collab.brandName}</span>
                <span style="color: var(--muted);">✕</span>
                <img src="${collab.creatorAvatar}" alt="${collab.creatorName}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                <span style="font-family: var(--font-display); font-size: 1rem; font-weight: 700;">${collab.creatorName}</span>
              </div>
              <h2 style="font-family: var(--font-display); font-size: 1.45rem; margin: 0 0 0.25rem;">${collab.campaignTitle}</h2>
              <p style="font-size: 0.85rem; color: var(--muted); margin: 0;">Deliverables: ${collab.deliverablesRequired}</p>
            </div>

            <div style="text-align: right;">
              <span class="badge badge-gold" style="font-size: 0.75rem;">STAGE ${collab.stage} / 6: ${collab.stageName.toUpperCase()}</span>
              <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold); margin: 0.35rem 0 0;">Agreed Fee: ${collab.fee}</p>
            </div>
          </div>

          <!-- 6-Stage Visual Stepper -->
          <div class="collab-stepper" style="margin-bottom: 2.5rem;">
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

          <!-- Deliverable Assets Showcase Area (If submitted) -->
          ${collab.deliverablesSubmitted ? `
            <div style="background: var(--ink-3); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 1.5rem; margin-bottom: 2rem;">
              <span class="section-eyebrow" style="color: var(--gold); margin-bottom: 0.5rem;">SUBMITTED DELIVERABLES</span>
              <div style="display: grid; grid-template-columns: 160px 1fr; gap: 1.5rem; align-items: start;">
                <img src="${collab.deliverablesSubmitted.previewImg}" alt="Preview" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: var(--radius-sm);">
                <div>
                  <h4 style="font-family: var(--font-display); font-size: 1.05rem; margin-bottom: 0.5rem;">Lookbook Asset Package</h4>
                  <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.5; margin-bottom: 1rem;">
                    "${collab.deliverablesSubmitted.notes}"
                  </p>
                  <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <a href="${collab.deliverablesSubmitted.assetsLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
                      📁 Open Drive Assets Folder ↗
                    </a>
                    ${collab.deliverablesSubmitted.socialLink ? `
                      <a href="${collab.deliverablesSubmitted.socialLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">
                        📱 View TikTok Preview ↗
                      </a>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Contextual Action Controls based on Role -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: 1.25rem; flex-wrap: wrap; gap: 1rem;">
            <div style="font-size: 0.82rem; color: var(--muted);">
              Last activity: ${collab.updatedAt} · Target Due Date: <strong>${collab.dueDate}</strong>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <button class="btn btn-sm btn-ghost" onclick="window.fashow.startDirectMessage('${collab.creatorId}')">Open Chat 💬</button>

              <!-- Creator Action: Submit Deliverables -->
              ${isCreatorView && collab.stage <= 3 ? `
                <button class="btn btn-sm btn-primary" onclick="window.fashow.openSubmitDeliverableModal('${collab.id}')">
                  Submit Deliverables →
                </button>
              ` : ''}

              <!-- Brand Actions: Approve or Request Revision -->
              ${isBrandView && collab.stage === 4 ? `
                <button class="btn btn-sm btn-secondary" onclick="window.fashow.openRequestRevisionModal('${collab.id}')">
                  Request Revision
                </button>
                <button class="btn btn-sm btn-primary" onclick="window.fashow.handleApproveDeliverables('${collab.id}')">
                  Approve Deliverables & Sign Off ✓
                </button>
              ` : ''}

              ${collab.stage >= 5 ? `
                <span class="badge badge-gold" style="font-size: 0.82rem; padding: 0.4rem 0.8rem;">Collab Approved & Completed ✓</span>
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
    showToast('Deliverables approved! Campaign marked complete.');
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
  // RENDER: SAVED TALENT ROSTER (MY TALENT)
  // ============================================================================
  function renderSavedTalent() {
    const grid = document.getElementById('saved-talent-grid');
    if (!grid) return;

    const saved = creators.filter(c => savedTalentIds.includes(c.id));

    if (saved.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem; text-align: center; background: var(--ink-2); border: 1px dashed var(--line); border-radius: var(--radius-sm);">
          <p style="font-size: 1.1rem; color: var(--paper); margin-bottom: 0.5rem;">Your talent roster is empty.</p>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 1.5rem;">Click the heart icon on any creator card to save them to your brand's lookbook roster.</p>
          <a href="#discover" class="btn btn-primary">Discover Creators</a>
        </div>
      `;
      return;
    }

    grid.innerHTML = saved.map(c => createCastingCardHtml(c)).join('');
    attachCastingCardEvents(grid);
  }

  // ============================================================================
  // RENDER: IN-PLATFORM MESSAGING
  // ============================================================================
  function renderMessages() {
    const threadsList = document.getElementById('messages-threads-list');
    const headerEl = document.getElementById('chat-active-header');
    const streamEl = document.getElementById('chat-messages-stream');
    if (!threadsList || !headerEl || !streamEl) return;

    // Render left threads list
    threadsList.innerHTML = conversations.map(conv => `
      <div class="thread-card ${conv.id === activeConversationId ? 'active' : ''}" data-conv-id="${conv.id}">
        <img src="${conv.recipientAvatar}" alt="${conv.recipientName}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
        <div style="overflow: hidden; flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h4 style="font-family: var(--font-display); font-size: 0.95rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${conv.recipientName}
            </h4>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted);">${conv.lastTime}</span>
          </div>
          <p style="font-size: 0.78rem; color: var(--muted); margin: 0.2rem 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${conv.lastMessage}
          </p>
        </div>
      </div>
    `).join('');

    // Attach thread click handlers
    threadsList.querySelectorAll('.thread-card').forEach(item => {
      item.addEventListener('click', () => {
        activeConversationId = item.getAttribute('data-conv-id');
        renderMessages();
      });
    });

    // Active conversation
    const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
    if (!activeConv) return;

    headerEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="${activeConv.recipientAvatar}" alt="${activeConv.recipientName}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
        <div>
          <h4 style="font-family: var(--font-display); font-size: 1.05rem; margin: 0;">${activeConv.recipientName}</h4>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold);">${activeConv.recipientRole}</span>
        </div>
      </div>
      <a href="#creators/${activeConv.recipientId === 'creator-1' ? 'maya-chen' : 'jordan-williams'}" class="btn btn-sm btn-ghost">View Lookbook ↗</a>
    `;

    // Render bubbles
    streamEl.innerHTML = activeConv.messages.map(msg => `
      <div class="chat-bubble ${msg.sender === 'brand' ? 'chat-bubble-sent' : 'chat-bubble-received'}">
        <p style="margin: 0; line-height: 1.5;">${msg.text}</p>
        <span style="display: block; font-family: var(--font-mono); font-size: 0.65rem; opacity: 0.7; margin-top: 0.35rem; text-align: right;">${msg.time}</span>
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
        lastMessage: 'Conversation opened',
        lastTime: 'Just now',
        unread: false,
        messages: [
          { sender: 'brand', text: `Hi ${creator.name}! We love your portfolio on Fashow and wanted to reach out regarding an upcoming campaign.`, time: 'Just now' }
        ]
      };
      conversations.unshift(conv);
      saveState();
    }
    activeConversationId = conv.id;
    window.location.hash = '#messages';
  }

  // ============================================================================
  // INVITATION MODAL
  // ============================================================================
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

  // ============================================================================
  // CREATOR 8-STEP ONBOARDING WIZARD
  // ============================================================================
  let currentOnboardStep = 1;

  function openCreatorOnboarding() {
    currentOnboardStep = 1;
    updateOnboardStepView();
    openModal('creator-onboarding-modal');
  }

  function updateOnboardStepView() {
    document.getElementById('onboard-step-num').textContent = currentOnboardStep;
    document.getElementById('onboard-progress-fill').style.width = `${(currentOnboardStep / 8) * 100}%`;

    document.querySelectorAll('.onboard-step').forEach(step => {
      const stepIdx = parseInt(step.getAttribute('data-step'), 10);
      step.style.display = stepIdx === currentOnboardStep ? 'block' : 'none';
    });

    const prevBtn = document.getElementById('onboard-prev-btn');
    const nextBtn = document.getElementById('onboard-next-btn');

    if (prevBtn) prevBtn.style.display = currentOnboardStep > 1 ? 'inline-block' : 'none';
    if (nextBtn) {
      nextBtn.textContent = currentOnboardStep === 8 ? 'Complete Profile & Launch →' : 'Continue →';
    }
  }

  // ============================================================================
  // DOM EVENT BINDINGS
  // ============================================================================
  function initEventBindings() {
    // Hash router
    window.addEventListener('hashchange', handleRoute);

    // Skip intro button
    document.getElementById('intro-skip-btn')?.addEventListener('click', () => {
      document.body.classList.add('skip-intro');
      const curtain = document.getElementById('logo-intro-curtain');
      if (curtain) curtain.style.display = 'none';
    });

    // Auto dismiss intro animation after 3.2s
    setTimeout(() => {
      document.body.classList.add('skip-intro');
      const curtain = document.getElementById('logo-intro-curtain');
      if (curtain) {
        curtain.style.opacity = '0';
        curtain.style.transition = 'opacity 0.4s ease';
        setTimeout(() => curtain.style.display = 'none', 400);
      }
    }, 3200);

    // Demo Role Switcher
    document.getElementById('demo-role-brand')?.addEventListener('click', () => setSimulatedRole('brand'));
    document.getElementById('demo-role-creator')?.addEventListener('click', () => setSimulatedRole('creator'));
    document.getElementById('demo-role-guest')?.addEventListener('click', () => setSimulatedRole('guest'));

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

    // Log In / Get Started nav triggers
    document.getElementById('nav-login-btn')?.addEventListener('click', () => openModal('login-modal'));
    document.getElementById('nav-get-started-btn')?.addEventListener('click', () => openModal('signup-choice-modal'));
    document.getElementById('nav-logout-btn')?.addEventListener('click', () => setSimulatedRole('guest'));

    // Backend DB button
    document.getElementById('nav-backend-btn')?.addEventListener('click', () => openModal('supabase-modal'));

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

    // Creator Onboarding Navigation
    document.getElementById('onboard-prev-btn')?.addEventListener('click', () => {
      if (currentOnboardStep > 1) {
        currentOnboardStep--;
        updateOnboardStepView();
      }
    });

    document.getElementById('onboard-next-btn')?.addEventListener('click', () => {
      if (currentOnboardStep < 8) {
        currentOnboardStep++;
        updateOnboardStepView();
      } else {
        // Submit onboarding form
        const newName = document.getElementById('onboard-name').value || 'New Creator';
        const newSchool = document.getElementById('onboard-school').value || 'University';
        const newAvatar = document.getElementById('onboard-avatar').value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
        const newBio = document.getElementById('onboard-bio').value || 'College model & creator.';
        const newRate = document.getElementById('onboard-rate').value || '$350 - $600';
        const newUsername = newName.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const newCreator = {
          id: `creator-${Date.now()}`,
          username: newUsername,
          name: newName,
          school: newSchool,
          major: document.getElementById('onboard-major').value || 'Fashion Design',
          gradYear: document.getElementById('onboard-grad').value || 'Class of 2028',
          location: document.getElementById('onboard-location').value || 'New York, NY',
          primaryRole: 'Model',
          roles: ['Model', 'Creator'],
          aesthetic: 'Streetwear',
          styles: ['Streetwear', 'Contemporary'],
          avatar: newAvatar,
          hoverImage: document.getElementById('onboard-hover-img').value || newAvatar,
          bio: newBio,
          tiktok: { handle: document.getElementById('onboard-tiktok-handle').value || '@creator', followers: document.getElementById('onboard-tiktok-count').value || '5K' },
          instagram: { handle: document.getElementById('onboard-ig-handle').value || '@creator', followers: document.getElementById('onboard-ig-count').value || '3K' },
          reachSummary: '8K Combined Reach',
          engagementRate: '9.2%',
          availability: document.getElementById('onboard-avail').value || 'Available',
          rates: newRate,
          collabPreferences: ['Lookbook Modeling', 'TikTok Videos'],
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
      }
    });

    // Pill Selector toggles in onboarding
    document.querySelectorAll('.pill-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
      });
    });

    // Brand Registration Form
    document.getElementById('brand-onboard-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const bname = document.getElementById('reg-brand-name').value;
      const bloc = document.getElementById('reg-brand-location').value;
      const bcat = document.getElementById('reg-brand-category').value;

      closeModal('brand-onboarding-modal');
      setSimulatedRole('brand');
      showToast(`Welcome ${bname}! Brand portal unlocked.`);
      window.location.hash = '#brand/dashboard';
    });

    // Campaign Builder Form
    document.getElementById('campaign-builder-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('cb-title').value;
      const category = document.getElementById('cb-category').value;
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
        brandLogo: createSvgLogo('AM', '#0F1115', '#F6C453'),
        title,
        category,
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
      showToast('Campaign brief published to casting board!');
      window.location.hash = '#campaigns';
    });

    // Creator Campaign Application Form
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
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
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
      showToast('Application sent to brand! You will be notified upon review.');
    });

    // Brand Invitation Form
    document.getElementById('invite-campaign-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const creatorId = document.getElementById('invite-creator-id').value;
      const campId = document.getElementById('invite-campaign-select').value;
      const msg = document.getElementById('invite-custom-message').value;

      const creator = creators.find(c => c.id === creatorId);
      const camp = campaigns.find(c => c.id === campId);

      // Create message thread with invitation
      startDirectMessage(creatorId);
      closeModal('invite-campaign-modal');
      showToast(`Campaign invitation sent to ${creator ? creator.name : 'creator'}!`);
    });

    // Deliverable Submission Form (Vidovo Workspace)
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
      collab.stage = 4;
      collab.stageName = 'Deliverables Submitted';
      collab.updatedAt = 'Just now';

      saveState();
      closeModal('submit-deliverable-modal');
      showToast('Deliverables submitted to brand for review!');
      renderCollaborationsWorkspace();
    });

    // Revision Request Form
    document.getElementById('request-revision-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const collabId = document.getElementById('revision-collab-id').value;
      const collab = collaborations.find(c => c.id === collabId);
      if (!collab) return;

      collab.stage = 3;
      collab.stageName = 'In Production';
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

    // Supabase config form
    document.getElementById('supabase-config-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('supabase-url-input').value.trim();
      const key = document.getElementById('supabase-anon-input').value.trim();

      if (window.fashowBackend && window.fashowBackend.setCredentials) {
        const ok = window.fashowBackend.setCredentials(url, key);
        if (ok) {
          showToast('Connected to Supabase PostgreSQL database!');
          closeModal('supabase-modal');
          const dot = document.getElementById('backend-status-dot');
          if (dot) dot.style.background = '#22c55e';
        } else {
          alert('Could not initialize Supabase with those credentials. Please check URL and Anon Key.');
        }
      }
    });
  }

  // ============================================================================
  // GLOBAL EXPORTS FOR INLINE EVENT HANDLERS
  // ============================================================================
  window.fashow = {
    openModal,
    closeModal,
    setView,
    setSimulatedRole,
    filterDiscoverByCampus,
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
  // APP INITIALIZATION
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initEventBindings();
    setSimulatedRole(currentRole);
    handleRoute();

    // Check backend connection status
    if (window.fashowBackend && window.fashowBackend.isConfigured()) {
      const dot = document.getElementById('backend-status-dot');
      if (dot) dot.style.background = '#22c55e';
      const desc = document.getElementById('supabase-status-desc');
      if (desc) desc.textContent = 'Connected (PostgreSQL active)';
    }
  });

})();
