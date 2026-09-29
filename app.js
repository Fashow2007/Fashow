/* ==========================================================================
   FASHOW — Application Logic & State Management
   Vanilla JS · LocalStorage Persisted · Accessible Modals & Filters
   ========================================================================== */

(function () {
  'use strict';

  // --- Initial Mock Data ---
  const INITIAL_OPPORTUNITIES = [
    {
      id: 'opp-1',
      title: 'Fashion Marketing & Social Intern',
      company: 'Zara Atelier',
      companyId: 'comp-1',
      logo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      location: 'New York, NY',
      type: 'Internship',
      term: 'Part-Time',
      paid: true,
      compensation: '$22 / hour',
      deadline: 'Oct 15, 2026',
      category: 'Marketing',
      tags: ['Marketing', 'Social Media', 'Content Creation'],
      description: 'Join our North America creative marketing team at Zara Atelier in Soho. You will assist in producing weekly editorial campaigns, analyzing viral TikTok and Instagram fashion trends, and coordinating showroom loans for editors and creators.',
      responsibilities: [
        'Assist creative team with weekly social trend reports and influencer research',
        'Help coordinate sample loans and showroom preparation for NYFW preview events',
        'Draft engaging social media copy and monitor engagement across platforms',
        'Support production logistics for seasonal digital lookbooks'
      ],
      requirements: [
        'Current undergraduate or graduate student in Marketing, Fashion, or Communications',
        'Deep appreciation for contemporary editorial fashion and digital storytelling',
        'Proficiency with TikTok, Instagram Reels, and Adobe Creative Suite / Figma is a plus',
        'Strong communication skills and attention to aesthetic detail'
      ]
    },
    {
      id: 'opp-2',
      title: 'Editorial Runway & Lookbook Model',
      company: 'Jacquemus Paris',
      companyId: 'comp-2',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      location: 'New York, NY',
      type: 'Modeling',
      term: 'Freelance',
      paid: true,
      compensation: '$650 / day',
      deadline: 'Nov 01, 2026',
      category: 'Modeling',
      tags: ['Modeling', 'Runway', 'Editorial'],
      description: 'Open casting call for college students interested in runway modeling and showroom presentations for the Jacquemus Fall/Winter capsule presentation in New York.',
      responsibilities: [
        'Participate in garment fitting and pre-show run-throughs',
        'Model ready-to-wear garments for editorial lookbook and showroom buyers',
        'Collaborate with lead stylists and hair/makeup artists professionally'
      ],
      requirements: [
        'Enrolled college student with open availability during presentation week',
        'Comfortable walking on camera and collaborating in a fast-paced environment',
        'All body types and backgrounds welcomed; strong personal style encouraged',
        'Portfolio or clear headshots/polaroids required with application'
      ]
    },
    {
      id: 'opp-3',
      title: 'Junior Fashion Styling Assistant',
      company: 'Vogue Studio',
      companyId: 'comp-3',
      logo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
      location: 'New York, NY',
      type: 'Internship',
      term: 'Part-Time',
      paid: true,
      compensation: '$24 / hour',
      deadline: 'Oct 30, 2026',
      category: 'Styling',
      tags: ['Styling', 'Editorial', 'Production'],
      description: 'Support senior stylists on high-profile magazine editorials, digital cover shoots, and video content for upcoming seasonal features.',
      responsibilities: [
        'Track couture and ready-to-wear fashion samples checking in and out of studio',
        'Prep accessories, garments, and lookboards for on-set shoot days',
        'Assist stylist during live studio shooting with swift outfit adjustments'
      ],
      requirements: [
        'Demonstrated passion for editorial styling, costume design, or fashion merchandising',
        'Organizational rigor and ability to thrive on active set environments',
        'Familiarity with luxury fashion houses and contemporary streetwear labels'
      ]
    },
    {
      id: 'opp-4',
      title: 'Fashion Design & Patternmaking Apprentice',
      company: 'Acne Studios',
      companyId: 'comp-4',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80',
      location: 'Remote / Hybrid',
      type: 'Internship',
      term: 'Part-Time',
      paid: true,
      compensation: '$25 / hour',
      deadline: 'Nov 15, 2026',
      category: 'Design',
      tags: ['Design', 'Patternmaking', 'Textiles'],
      description: 'Work directly alongside our New York atelier patternmakers and material sourcers as we construct prototypes for upcoming runway collections.',
      responsibilities: [
        'Translate conceptual sketches into digital CAD flats and muslin drapes',
        'Catalog fabric swatches and compile sustainability assessment charts',
        'Assist senior designers in refining silhouettes and technical construction specs'
      ],
      requirements: [
        'Fashion Design or Apparel Construction major with coursework in patternmaking',
        'Experience with sewing, draping, and Adobe Illustrator garment flats',
        'Portfolio demonstrating design process, sketchbooks, or finished garments'
      ]
    },
    {
      id: 'opp-5',
      title: 'Digital Editorial & Streetwear Photographer',
      company: 'Kith NYC',
      companyId: 'comp-5',
      logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      location: 'New York, NY',
      type: 'Part-Time',
      term: 'Part-Time',
      paid: true,
      compensation: '$30 / hour',
      deadline: 'Oct 25, 2026',
      category: 'Photography',
      tags: ['Photography', 'Streetwear', 'Retouching'],
      description: 'Capture street style, live sneaker launches, and studio product imagery for Kith campaigns and editorial channels.',
      responsibilities: [
        'Photograph launch events, retail drops, and on-model studio lookbooks',
        'Execute color correction, color grading, and asset delivery under tight deadlines',
        'Collaborate with art director on shoot concepts and lighting set-ups'
      ],
      requirements: [
        'Portfolio showcasing street photography, fashion portraiture, or footwear',
        'Expert command of DSLR/mirrorless cameras and Adobe Lightroom/Capture One',
        'Own equipment preferred or demonstrated experience with studio lighting'
      ]
    },
    {
      id: 'opp-6',
      title: 'Fashion PR & Influencer Relations Associate',
      company: 'Nike Culture Labs',
      companyId: 'comp-6',
      logo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
      location: 'Los Angeles, CA / Remote',
      type: 'Internship',
      term: 'Full-Time',
      paid: true,
      compensation: '$28 / hour',
      deadline: 'Dec 01, 2026',
      category: 'PR',
      tags: ['PR', 'Influencer', 'Events'],
      description: 'Connect Nike fashion collaborations with emerging college athletes, young fashion tastemakers, and creative community leaders.',
      responsibilities: [
        'Maintain media contact lists and influencer seeding databases',
        'Draft pitch notes for creative media outlets (Hypebeast, Highsnobiety, Complex)',
        'Coordinate product seeding shipments and track social coverage analytics'
      ],
      requirements: [
        'Enthusiastic relationship-builder with knowledge of youth culture and fashion',
        'Strong writing and presentation skills',
        'Able to work collaboratively in a fast-paced environment'
      ]
    }
  ];

  const INITIAL_COMPANIES = [
    {
      id: 'comp-1',
      name: 'Zara Atelier',
      category: 'Luxury High-Street & Tailoring',
      location: 'Soho, New York',
      website: 'https://zara.com',
      instagram: '@zara',
      banner: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&h=120&q=80',
      description: 'Zara Atelier produces exclusive capsule collections featuring premium fabrics, artisanal craftsmanship, and elevated silhouettes.',
      activeRoles: 3
    },
    {
      id: 'comp-2',
      name: 'Jacquemus',
      category: 'French Haute Couture & Ready-to-Wear',
      location: 'Paris & New York',
      website: 'https://jacquemus.com',
      instagram: '@jacquemus',
      banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      description: 'Celebrated for modernist minimalism, sun-drenched southern French aesthetics, and groundbreaking runway productions.',
      activeRoles: 2
    },
    {
      id: 'comp-3',
      name: 'Vogue Studio',
      category: 'Editorial Publishing & Creative Direction',
      location: 'One World Trade, New York',
      website: 'https://vogue.com',
      instagram: '@voguemagazine',
      banner: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
      description: 'The global authority in fashion journalism, styling, and cultural photography shaping the industry for over a century.',
      activeRoles: 4
    },
    {
      id: 'comp-4',
      name: 'Acne Studios',
      category: 'Contemporary Scandinavian Luxury',
      location: 'Stockholm & New York',
      website: 'https://acnestudios.com',
      instagram: '@acnestudios',
      banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      description: 'A multidisciplinary luxury fashion house known for tailored denim, avant-garde textures, and signature accessories.',
      activeRoles: 1
    },
    {
      id: 'comp-5',
      name: 'Kith NYC',
      category: 'Contemporary Streetwear & Lifestyle',
      location: 'Soho, New York',
      website: 'https://kith.com',
      instagram: '@kith',
      banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      description: 'Leading lifestyle brand bridging high fashion, athletic collaborations, and curated contemporary streetwear.',
      activeRoles: 2
    },
    {
      id: 'comp-6',
      name: 'Nike Culture Labs',
      category: 'Athletic Luxury & Brand Partnerships',
      location: 'Los Angeles & Beaverton',
      website: 'https://nike.com',
      instagram: '@nike',
      banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80',
      description: 'Spearheading future-facing fashion collaborations, limited designer capsule drops, and emerging creative talent incubators.',
      activeRoles: 3
    }
  ];

  const INITIAL_APPLICATIONS = [
    {
      id: 'app-1',
      opportunityId: 'opp-1',
      title: 'Fashion Marketing & Social Intern',
      company: 'Zara Atelier',
      appliedDate: 'Sep 24, 2026',
      status: 'Interview',
      statusLabel: 'Interview Scheduled',
      statusClass: 'status-interview',
      note: 'Interview via Zoom on Friday at 2:00 PM EST with Lead Art Director.'
    },
    {
      id: 'app-2',
      opportunityId: 'opp-3',
      title: 'Junior Fashion Styling Assistant',
      company: 'Vogue Studio',
      appliedDate: 'Sep 26, 2026',
      status: 'Under Review',
      statusLabel: 'Under Review',
      statusClass: 'status-review',
      note: 'Portfolio reviewed by senior styling coordinator.'
    },
    {
      id: 'app-3',
      opportunityId: 'opp-5',
      title: 'Digital Editorial & Streetwear Photographer',
      company: 'Kith NYC',
      appliedDate: 'Sep 19, 2026',
      status: 'Accepted',
      statusLabel: 'Offer Extended',
      statusClass: 'status-accepted',
      note: 'Congratulations! Official onboarding invitation sent to your email.'
    }
  ];

  const DEFAULT_STUDENT = {
    name: 'Alex Johnson',
    school: 'UMass Amherst',
    major: 'Fashion Marketing & Visual Arts',
    gradYear: 'Class of 2028',
    location: 'Boston & New York',
    bio: 'Aspiring fashion creative and marketing student passionate about digital campaigns, editorial styling, and sustainable luxury. Experienced in visual storytelling, photography, and social media production.',
    interests: ['Marketing', 'Social Media', 'Styling', 'Photography', 'Content Creation'],
    skills: ['Photoshop', 'InDesign', 'Lightroom', 'Trend Forecasting', 'Campaign Production', 'Social Strategy'],
    experience: [
      {
        role: 'Campus Fashion Ambassador',
        org: 'University Fashion Collective',
        period: '2025 - Present',
        description: 'Organized biannual student runway presentation and managed Instagram content reaching 8,000+ students.'
      },
      {
        role: 'Social Media Assistant',
        org: 'Amherst Vintage Studio',
        period: 'Summer 2025',
        description: 'Created daily styling reels and curated vintage apparel drops resulting in 40% growth in online inquiries.'
      }
    ],
    portfolio: [
      {
        title: 'Editorial Styling: Soho Echoes',
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        caption: 'Lookbook series styled with archival vintage and contemporary silhouettes.'
      },
      {
        title: 'Streetwear Portrait Series',
        img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        caption: '35mm analogue campaign exploring architectural outerwear in Lower Manhattan.'
      },
      {
        title: 'Capsule Collection Moodboard',
        img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        caption: 'Color theory and textile research for Spring/Summer sustainable linen exploration.'
      },
      {
        title: 'Runway Backstage Documentation',
        img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
        caption: 'Candid backstage photography capturing garment preparation and movement.'
      }
    ],
    links: {
      linkedin: 'https://linkedin.com/in/alex-johnson-fashion',
      instagram: 'https://instagram.com/alexjohnson.style',
      portfolio: 'https://alexjohnson.fashion'
    }
  };

  // --- State Initialization ---
  let opportunities = JSON.parse(localStorage.getItem('fashow_opportunities')) || INITIAL_OPPORTUNITIES;
  let companies = JSON.parse(localStorage.getItem('fashow_companies')) || INITIAL_COMPANIES;
  let applications = JSON.parse(localStorage.getItem('fashow_applications')) || INITIAL_APPLICATIONS;
  let savedOppIds = JSON.parse(localStorage.getItem('fashow_saved_opps')) || ['opp-1'];
  let currentRole = localStorage.getItem('fashow_user_role') || 'student'; // 'student' or 'company'
  let currentView = 'home'; // 'home', 'discover', 'companies', 'applications', 'profile', 'company-portal'

  function saveState() {
    localStorage.setItem('fashow_opportunities', JSON.stringify(opportunities));
    localStorage.setItem('fashow_companies', JSON.stringify(companies));
    localStorage.setItem('fashow_applications', JSON.stringify(applications));
    localStorage.setItem('fashow_saved_opps', JSON.stringify(savedOppIds));
    localStorage.setItem('fashow_user_role', currentRole);
  }

  // --- Toast Notifications ---
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<span>✓</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- Modal Helpers ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --- View Switcher ---
  function setView(viewName) {
    currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.style.display = 'none';
    });

    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) {
      targetSec.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Nav Link Active States
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Refresh contents
    if (viewName === 'discover') renderDiscoverFeed();
    if (viewName === 'companies') renderCompaniesDirectory();
    if (viewName === 'applications') renderApplicationsTracker();
    if (viewName === 'profile') renderStudentProfile();
    if (viewName === 'company-portal') renderCompanyDashboard();
  }

  // --- Render Featured on Homepage ---
  function renderHomeFeatured() {
    const featuredGrid = document.getElementById('home-featured-grid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';
    
    // Pick 3 high-impact opportunities
    const featured = opportunities.slice(0, 3);
    featured.forEach(opp => {
      featuredGrid.appendChild(createOpportunityCard(opp));
    });

    // Render Featured Brands
    const brandsGrid = document.getElementById('home-brands-grid');
    if (brandsGrid) {
      brandsGrid.innerHTML = '';
      companies.slice(0, 3).forEach(comp => {
        brandsGrid.appendChild(createCompanyCard(comp));
      });
    }
  }

  // --- Opportunity Card Component ---
  function createOpportunityCard(opp) {
    const card = document.createElement('article');
    card.className = 'opportunity-card';
    card.setAttribute('aria-labelledby', `opp-title-${opp.id}`);
    
    const isSaved = savedOppIds.includes(opp.id);

    card.innerHTML = `
      <div>
        <div class="opp-card-header">
          <div class="opp-company-brand">
            <img src="${opp.logo}" alt="Logo of ${opp.company}" class="opp-logo-img" loading="lazy">
            <div>
              <h4 class="opp-company-name">${opp.company}</h4>
              <span class="opp-location">${opp.location}</span>
            </div>
          </div>
          <button class="opp-bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${opp.id}" aria-label="${isSaved ? 'Remove from saved' : 'Save opportunity'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        
        <h3 id="opp-title-${opp.id}" class="opp-title">${opp.title}</h3>
        
        <div class="opp-badges">
          <span class="badge ${opp.paid ? 'badge-paid' : 'badge-neutral'}">${opp.paid ? 'Paid · ' + opp.compensation : 'Unpaid'}</span>
          <span class="badge badge-neutral">${opp.type}</span>
          <span class="badge badge-neutral">${opp.term}</span>
        </div>
        
        <p class="opp-tags">
          <span>${opp.tags.join(' · ')}</span>
        </p>
      </div>

      <div class="opp-footer">
        <span class="opp-deadline">Apply by <strong>${opp.deadline}</strong></span>
        <button class="btn btn-sm btn-primary view-opp-btn" data-id="${opp.id}">
          View & Apply →
        </button>
      </div>
    `;

    // Event listeners
    const viewBtn = card.querySelector('.view-opp-btn');
    viewBtn.addEventListener('click', () => showOpportunityDetail(opp.id));

    const saveBtn = card.querySelector('.opp-bookmark-btn');
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSaveOpportunity(opp.id, saveBtn);
    });

    return card;
  }

  // --- Company Card Component ---
  function createCompanyCard(comp) {
    const card = document.createElement('article');
    card.className = 'company-card';
    card.setAttribute('aria-labelledby', `comp-name-${comp.id}`);

    card.innerHTML = `
      <div class="company-card-banner">
        <img src="${comp.banner}" alt="Editorial lookbook banner for ${comp.name}" loading="lazy">
      </div>
      <div class="company-card-body">
        <img src="${comp.logo}" alt="Official brand logo of ${comp.name}" class="company-card-logo" loading="lazy">
        <div class="company-card-meta">
          <h3 id="comp-name-${comp.id}" class="company-card-name">${comp.name}</h3>
          <p class="company-card-tag">${comp.category} · ${comp.location}</p>
        </div>
        <p class="company-card-desc">${comp.description}</p>
        <div class="company-card-footer">
          <span class="badge badge-neutral">${comp.activeRoles} active positions</span>
          <button class="btn btn-sm btn-outline-dark view-company-roles-btn" data-comp-name="${comp.name}">
            View Roles
          </button>
        </div>
      </div>
    `;

    const viewBtn = card.querySelector('.view-company-roles-btn');
    viewBtn.addEventListener('click', () => {
      setView('discover');
      const searchInput = document.getElementById('search-query');
      if (searchInput) {
        searchInput.value = comp.name;
        renderDiscoverFeed();
      }
    });

    return card;
  }

  // --- Toggle Save Opportunity ---
  function toggleSaveOpportunity(oppId, btnElement) {
    const index = savedOppIds.indexOf(oppId);
    if (index > -1) {
      savedOppIds.splice(index, 1);
      btnElement.classList.remove('saved');
      btnElement.querySelector('svg').setAttribute('fill', 'none');
      showToast('Removed from saved opportunities');
    } else {
      savedOppIds.push(oppId);
      btnElement.classList.add('saved');
      btnElement.querySelector('svg').setAttribute('fill', 'currentColor');
      showToast('Saved to your profile!');
    }
    saveState();
  }

  // --- Discover Feed & Filters ---
  let selectedCategoryFilter = 'All';

  function renderDiscoverFeed() {
    const feedContainer = document.getElementById('discover-opportunities-grid');
    const resultsCount = document.getElementById('discover-results-count');
    if (!feedContainer) return;

    const query = (document.getElementById('search-query')?.value || '').toLowerCase().trim();
    const typeFilter = document.getElementById('filter-type')?.value || 'All';
    const locFilter = document.getElementById('filter-location')?.value || 'All';
    const compFilter = document.getElementById('filter-compensation')?.value || 'All';

    const filtered = opportunities.filter(opp => {
      // Search text match
      const textMatch = !query || 
        opp.title.toLowerCase().includes(query) ||
        opp.company.toLowerCase().includes(query) ||
        opp.location.toLowerCase().includes(query) ||
        opp.category.toLowerCase().includes(query) ||
        opp.tags.some(t => t.toLowerCase().includes(query));

      // Category chip match
      const catMatch = selectedCategoryFilter === 'All' || opp.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

      // Type dropdown match
      const typeMatch = typeFilter === 'All' || opp.type === typeFilter;

      // Location match
      const locMatch = locFilter === 'All' || 
        (locFilter === 'Remote' && (opp.location.includes('Remote') || opp.location.includes('Hybrid'))) ||
        opp.location.includes(locFilter);

      // Compensation match
      const payMatch = compFilter === 'All' || 
        (compFilter === 'Paid' && opp.paid) || 
        (compFilter === 'Unpaid' && !opp.paid);

      return textMatch && catMatch && typeMatch && locMatch && payMatch;
    });

    feedContainer.innerHTML = '';
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} fashion opportunities`;
    }

    if (filtered.length === 0) {
      feedContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; background: #f8f9fa; border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
          <h3 class="font-serif" style="font-size: 1.5rem; margin-bottom: 0.5rem;">No matching opportunities found</h3>
          <p>Try broadening your search query or resetting filters to discover more roles.</p>
          <button class="btn btn-secondary" id="reset-filters-btn" style="margin-top: 1rem;">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          document.getElementById('search-query').value = '';
          document.getElementById('filter-type').value = 'All';
          document.getElementById('filter-location').value = 'All';
          document.getElementById('filter-compensation').value = 'All';
          selectedCategoryFilter = 'All';
          updateCategoryPillUI();
          renderDiscoverFeed();
        });
      }
      return;
    }

    filtered.forEach(opp => {
      feedContainer.appendChild(createOpportunityCard(opp));
    });
  }

  function updateCategoryPillUI() {
    document.querySelectorAll('.filter-pill').forEach(pill => {
      if (pill.getAttribute('data-category') === selectedCategoryFilter) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // --- Companies Directory ---
  function renderCompaniesDirectory() {
    const grid = document.getElementById('companies-directory-grid');
    if (!grid) return;
    grid.innerHTML = '';
    companies.forEach(comp => {
      grid.appendChild(createCompanyCard(comp));
    });
  }

  // --- Applications Tracker (Student) ---
  function renderApplicationsTracker() {
    const list = document.getElementById('applications-tracker-list');
    if (!list) return;
    list.innerHTML = '';

    if (applications.length === 0) {
      list.innerHTML = `
        <div style="padding: 3rem; text-align: center; background: #ffffff; border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
          <p style="font-size: 1.1rem; margin-bottom: 1rem;">You have not submitted any applications yet.</p>
          <button class="btn btn-primary" onclick="window.fashow.setView('discover')">Explore Open Opportunities</button>
        </div>
      `;
      return;
    }

    applications.forEach(app => {
      const item = document.createElement('div');
      item.className = 'app-tracking-item';
      item.innerHTML = `
        <div>
          <h4 style="font-weight: 700; font-size: 1.05rem; margin-bottom: 0.2rem;">${app.title}</h4>
          <span style="font-size: 0.875rem; color: var(--color-text-muted);">${app.company}</span>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--color-text-light);">Applied Date</span>
          <p style="font-size: 0.9rem; font-weight: 500;">${app.appliedDate}</p>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--color-text-light);">Current Status</span>
          <div>
            <span class="app-status-badge ${app.statusClass}">${app.statusLabel}</span>
          </div>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--color-text-light);">Updates</span>
          <p style="font-size: 0.825rem; color: var(--color-text-muted);">${app.note || 'Application being evaluated.'}</p>
        </div>
        <div>
          <button class="btn btn-sm btn-secondary view-app-msg-btn" data-company="${app.company}">Message Brand</button>
        </div>
      `;

      item.querySelector('.view-app-msg-btn').addEventListener('click', () => {
        openMessagingModal(app.company, app.title);
      });

      list.appendChild(item);
    });
  }

  // --- Student Profile ---
  function renderStudentProfile() {
    const container = document.getElementById('student-profile-view');
    if (!container) return;

    container.innerHTML = `
      <div class="profile-cover"></div>
      <div class="container">
        <div class="profile-header-card">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80" alt="Alex Johnson professional student portrait" class="profile-avatar-large">
          <div class="profile-info">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
              <div>
                <h2 class="profile-name">${DEFAULT_STUDENT.name}</h2>
                <p class="profile-sub">${DEFAULT_STUDENT.school} · ${DEFAULT_STUDENT.major} · <strong>${DEFAULT_STUDENT.gradYear}</strong></p>
                <p style="font-size: 0.9rem; color: var(--color-text-light);">📍 ${DEFAULT_STUDENT.location}</p>
              </div>
              <div>
                <button class="btn btn-sm btn-outline-dark" id="edit-profile-btn">Edit Portfolio</button>
              </div>
            </div>

            <p style="margin: 1.25rem 0; font-size: 1rem; color: var(--color-text-main); line-height: 1.6;">${DEFAULT_STUDENT.bio}</p>

            <div style="margin-bottom: 1rem;">
              <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-light); display: block; margin-bottom: 0.4rem;">Specialized Areas</span>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${DEFAULT_STUDENT.interests.map(i => `<span class="badge badge-neutral">${i}</span>`).join('')}
              </div>
            </div>

            <div class="profile-social-links">
              <a href="${DEFAULT_STUDENT.links.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link">
                <span>LinkedIn</span> ↗
              </a>
              <a href="${DEFAULT_STUDENT.links.instagram}" target="_blank" rel="noopener noreferrer" class="social-link">
                <span>Instagram</span> ↗
              </a>
              <a href="${DEFAULT_STUDENT.links.portfolio}" target="_blank" rel="noopener noreferrer" class="social-link">
                <span>Portfolio Site</span> ↗
              </a>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 4rem;">
          <div class="section-header">
            <div>
              <span class="section-label">Visual Creative Portfolio</span>
              <h3 class="section-title">Curated Work & Lookbooks</h3>
            </div>
          </div>

          <div class="portfolio-gallery-grid">
            ${DEFAULT_STUDENT.portfolio.map(item => `
              <div class="portfolio-item">
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="portfolio-caption">
                  <h4 style="font-weight: 600; font-size: 0.95rem;">${item.title}</h4>
                  <p style="font-size: 0.8rem; opacity: 0.9;">${item.caption}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 4rem;">
          <h3 class="font-serif" style="font-size: 1.5rem; margin-bottom: 1.5rem;">Experience & Highlights</h3>
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${DEFAULT_STUDENT.experience.map(exp => `
              <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                  <h4 style="font-weight: 700;">${exp.role} · <span style="font-weight: 500; color: var(--color-text-muted);">${exp.org}</span></h4>
                  <span style="font-size: 0.85rem; color: var(--color-text-light);">${exp.period}</span>
                </div>
                <p style="font-size: 0.95rem; color: var(--color-text-muted);">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
      showToast('Profile editing mode enabled (saved locally)');
    });
  }

  // --- Company Dashboard (Employer Portal) ---
  function renderCompanyDashboard() {
    const list = document.getElementById('company-active-roles-list');
    if (!list) return;
    list.innerHTML = '';

    opportunities.forEach(opp => {
      const row = document.createElement('div');
      row.className = 'app-tracking-item';
      row.innerHTML = `
        <div>
          <h4 style="font-weight: 700; font-size: 1rem;">${opp.title}</h4>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">${opp.location} · ${opp.term}</span>
        </div>
        <div>
          <span class="badge ${opp.paid ? 'badge-paid' : 'badge-neutral'}">${opp.paid ? opp.compensation : 'Unpaid'}</span>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--color-text-light);">Deadline</span>
          <p style="font-size: 0.875rem;">${opp.deadline}</p>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--color-text-light);">Applicants</span>
          <p style="font-size: 0.9rem; font-weight: 600;">3 Under Review</p>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-dark" onclick="window.fashow.showOpportunityDetail('${opp.id}')">Inspect</button>
        </div>
      `;
      list.appendChild(row);
    });
  }

  // --- Opportunity Detail Modal ---
  let activeOpportunity = null;

  function showOpportunityDetail(oppId) {
    const opp = opportunities.find(o => o.id === oppId);
    if (!opp) return;
    activeOpportunity = opp;

    const modalBody = document.getElementById('opp-detail-modal-body');
    const modalTitle = document.getElementById('opp-detail-modal-title');
    if (!modalBody || !modalTitle) return;

    modalTitle.textContent = opp.title;
    modalBody.innerHTML = `
      <div style="display: flex; gap: 1.25rem; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border);">
        <img src="${opp.logo}" alt="Logo for ${opp.company}" style="width: 64px; height: 64px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--color-border);">
        <div>
          <h3 class="font-serif" style="font-size: 1.35rem; margin-bottom: 0.2rem;">${opp.company}</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">📍 ${opp.location} · <strong>${opp.type}</strong></p>
        </div>
      </div>

      <div class="opp-badges" style="margin-bottom: 1.5rem;">
        <span class="badge ${opp.paid ? 'badge-paid' : 'badge-neutral'}">${opp.paid ? 'Compensation: ' + opp.compensation : 'Unpaid'}</span>
        <span class="badge badge-neutral">${opp.term}</span>
        <span class="badge badge-neutral">Category: ${opp.category}</span>
        <span class="badge badge-highlight">Deadline: ${opp.deadline}</span>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">About the Opportunity</h4>
        <p style="font-size: 0.95rem; color: var(--color-text-main); line-height: 1.6;">${opp.description}</p>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Key Responsibilities</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.7;">
          ${opp.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Candidate Requirements</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.7;">
          ${opp.requirements.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `;

    openModal('opp-detail-modal');
  }

  // --- Apply Flow ---
  function openApplyModal() {
    closeModal('opp-detail-modal');
    if (!activeOpportunity) return;

    const modalTitle = document.getElementById('apply-modal-title');
    const modalSubtitle = document.getElementById('apply-modal-subtitle');
    if (modalTitle) modalTitle.textContent = `Apply to ${activeOpportunity.title}`;
    if (modalSubtitle) modalSubtitle.textContent = `${activeOpportunity.company} · ${activeOpportunity.location}`;

    openModal('apply-modal');
  }

  function handleApplicationSubmit(e) {
    e.preventDefault();
    if (!activeOpportunity) return;

    const intro = document.getElementById('apply-intro')?.value || '';
    const portfolioLink = document.getElementById('apply-portfolio')?.value || DEFAULT_STUDENT.links.portfolio;
    const consent = document.getElementById('apply-consent')?.checked;

    if (!consent) {
      alert('Please check the consent box to proceed with your application.');
      return;
    }

    const newApp = {
      id: 'app-' + Date.now(),
      opportunityId: activeOpportunity.id,
      title: activeOpportunity.title,
      company: activeOpportunity.company,
      appliedDate: 'Just now',
      status: 'Submitted',
      statusLabel: 'Submitted',
      statusClass: 'status-submitted',
      note: 'Application successfully received by brand hiring team.',
      intro: intro,
      portfolio: portfolioLink
    };

    applications.unshift(newApp);
    saveState();

    closeModal('apply-modal');
    showToast(`Application submitted to ${activeOpportunity.company}!`);
    setView('applications');
  }

  // --- Company Post Opportunity Flow ---
  function handlePostOpportunity(e) {
    e.preventDefault();
    const title = document.getElementById('post-title')?.value;
    const companyName = document.getElementById('post-company')?.value || 'Zara Atelier';
    const type = document.getElementById('post-type')?.value;
    const category = document.getElementById('post-category')?.value;
    const location = document.getElementById('post-location')?.value;
    const term = document.getElementById('post-term')?.value;
    const comp = document.getElementById('post-compensation')?.value || '$25 / hour';
    const deadline = document.getElementById('post-deadline')?.value || 'Dec 15, 2026';
    const desc = document.getElementById('post-desc')?.value;
    const resp = (document.getElementById('post-resp')?.value || '').split('\n').filter(Boolean);
    const req = (document.getElementById('post-req')?.value || '').split('\n').filter(Boolean);

    const newOpp = {
      id: 'opp-' + Date.now(),
      title,
      company: companyName,
      companyId: 'comp-1',
      logo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&h=120&q=80',
      banner: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      location,
      type,
      term,
      paid: true,
      compensation: comp,
      deadline,
      category,
      tags: [category, type, term],
      description: desc,
      responsibilities: resp.length ? resp : ['Assist in everyday team operations', 'Contribute directly to creative campaigns'],
      requirements: req.length ? req : ['Current college student with strong fashion interest']
    };

    opportunities.unshift(newOpp);
    saveState();

    closeModal('post-opp-modal');
    showToast('Opportunity published live across Fashow!');
    setView('discover');
  }

  // --- Direct Messaging Drawer ---
  function openMessagingModal(companyName, subject) {
    const title = document.getElementById('msg-modal-title');
    const recipient = document.getElementById('msg-recipient-label');
    if (title) title.textContent = `Message: ${companyName}`;
    if (recipient) recipient.textContent = `Regarding: ${subject}`;
    openModal('messaging-modal');
  }

  function handleSendMessage(e) {
    e.preventDefault();
    const input = document.getElementById('msg-input');
    if (!input || !input.value.trim()) return;

    const chatBox = document.getElementById('chat-history');
    if (chatBox) {
      const msg = document.createElement('div');
      msg.style.alignSelf = 'flex-end';
      msg.style.background = 'var(--color-primary)';
      msg.style.color = '#ffffff';
      msg.style.padding = '0.65rem 1rem';
      msg.style.borderRadius = 'var(--radius-sm)';
      msg.style.maxWidth = '80%';
      msg.style.fontSize = '0.9rem';
      msg.textContent = input.value.trim();
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    input.value = '';
    showToast('Message sent to employer representative!');
  }

  // --- Cookie Banner Consent Handling ---
  function initCookieConsent() {
    const banner = document.getElementById('cookie-consent-banner');
    const consentGiven = localStorage.getItem('fashow_cookie_consent');
    if (!consentGiven && banner) {
      banner.classList.remove('hidden');
    }

    document.getElementById('cookie-accept-btn')?.addEventListener('click', () => {
      localStorage.setItem('fashow_cookie_consent', 'accepted');
      banner?.classList.add('hidden');
      showToast('Cookies accepted. Preferences saved.');
    });

    document.getElementById('cookie-decline-btn')?.addEventListener('click', () => {
      localStorage.setItem('fashow_cookie_consent', 'declined');
      banner?.classList.add('hidden');
      showToast('Non-essential cookies declined.');
    });
  }

  // --- Auth & Role Switching ---
  function initRoleControls() {
    const roleToggleBtn = document.getElementById('nav-role-toggle');
    if (roleToggleBtn) {
      roleToggleBtn.textContent = currentRole === 'student' ? 'Switch to Company Mode' : 'Switch to Student Mode';
      roleToggleBtn.addEventListener('click', () => {
        currentRole = currentRole === 'student' ? 'company' : 'student';
        saveState();
        roleToggleBtn.textContent = currentRole === 'student' ? 'Switch to Company Mode' : 'Switch to Student Mode';
        showToast(`Switched active view to ${currentRole.toUpperCase()}`);
        setView(currentRole === 'student' ? 'discover' : 'company-portal');
      });
    }
  }

  // --- Event Binding ---
  function bindGlobalEvents() {
    // Navigation items
    document.querySelectorAll('[data-nav-view]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-nav-view');
        setView(targetView);
      });
    });

    // Close buttons for modals
    document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
      });
    });

    // Click backdrop to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });

    // Esc key closes active modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) closeModal(activeModal.id);
      }
    });

    // Search input typing
    const searchInput = document.getElementById('search-query');
    if (searchInput) {
      searchInput.addEventListener('input', () => renderDiscoverFeed());
    }

    // Filter dropdowns
    ['filter-type', 'filter-location', 'filter-compensation'].forEach(id => {
      const select = document.getElementById(id);
      if (select) select.addEventListener('change', () => renderDiscoverFeed());
    });

    // Category pills in Discover
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        selectedCategoryFilter = pill.getAttribute('data-category');
        updateCategoryPillUI();
        renderDiscoverFeed();
      });
    });

    // Apply button inside opp detail
    document.getElementById('opp-detail-apply-btn')?.addEventListener('click', openApplyModal);

    // Forms
    document.getElementById('apply-form')?.addEventListener('submit', handleApplicationSubmit);
    document.getElementById('post-opp-form')?.addEventListener('submit', handlePostOpportunity);
    document.getElementById('chat-form')?.addEventListener('submit', handleSendMessage);

    // Open Post Opportunity Modal button
    document.querySelectorAll('.open-post-opp-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal('post-opp-modal'));
    });

    // Open Auth Modals
    document.getElementById('nav-login-btn')?.addEventListener('click', () => openModal('login-modal'));
    document.getElementById('nav-signup-btn')?.addEventListener('click', () => openModal('signup-choice-modal'));
    
    document.getElementById('signup-student-choice')?.addEventListener('click', () => {
      closeModal('signup-choice-modal');
      openModal('student-signup-modal');
    });

    document.getElementById('signup-company-choice')?.addEventListener('click', () => {
      closeModal('signup-choice-modal');
      openModal('company-signup-modal');
    });

    // Footer Policy Modals
    document.getElementById('footer-privacy-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('privacy-modal');
    });
    document.getElementById('footer-terms-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('terms-modal');
    });
    document.getElementById('footer-cookies-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('cookies-modal');
    });
    document.getElementById('footer-refund-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('refund-modal');
    });

    // Fake Review / Unsupported claims prevention
    document.getElementById('student-reg-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('student-signup-modal');
      currentRole = 'student';
      saveState();
      showToast('Welcome to Fashow! Student account initialized.');
      setView('profile');
    });

    document.getElementById('company-reg-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('company-signup-modal');
      currentRole = 'company';
      saveState();
      showToast('Brand registered! Welcome to the Employer Portal.');
      setView('company-portal');
    });
  }

  // --- Init on DOM Load ---
  document.addEventListener('DOMContentLoaded', () => {
    renderHomeFeatured();
    initCookieConsent();
    initRoleControls();
    bindGlobalEvents();
    setView('home');
  });

  // Expose API for inline handler bindings if needed
  window.fashow = {
    setView,
    openModal,
    closeModal,
    showOpportunityDetail,
    openApplyModal,
    showToast
  };

})();
