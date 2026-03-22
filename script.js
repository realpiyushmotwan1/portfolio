const events = [
  {
    id: "corporate-events",
    title: "Corporate & Formal Hosting",
    image: "educational_events_data/276A2201.jpg",
    ctaColor: "#0F172A", // Corporate dark theme
    ctaGradient: "linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)"
  },
  {
    id: "icc-world-cup",
    title: "Video Presenter - ICC Women's ODI World Cup 2025",
    image: "world_cup_logo//landscape_logo.png",
    // type: "logo",
    ctaColor: "#5B2D8E", // Purple theme from ICC
    ctaGradient: "linear-gradient(135deg, #5B2D8E 0%, #7C3AED 100%)"
  },

  {
    id: "educational-kids",
    title: "Educational & Kids Events",
    image: "educational_events_data/WixKids_2024_Cam 01_0067.jpg",
    ctaColor: "#059669", // Fresh green theme
    ctaGradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)"
  },
  {
    id: "g20-summit",
    title: "The G20 Interfaith Summit",
    image: "g20_images//g20-logo.png",
    type: "logo",
    ctaColor: "#B45309", // Gold/amber theme
    ctaGradient: "linear-gradient(135deg, #B45309 0%, #D97706 100%)"
  },

  {
    id: "college-fests",
    title: "College Cultural Fests",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-ZdeDqMgiv5Ov2ymU4vPE5ds8rbCpJM.jpg",
    ctaColor: "#DC2626", // Energetic red theme
    ctaGradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)"
  },
  {
    id: "star-sports-ipl",
    title: "Star Sports Dream Job - Tata IPL 2024",
    image: "star_sports_data//tata_ipl_logo.webp",
    ctaColor: "#1E3A5F", // IPL dark blue theme
    ctaGradient: "linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
  }

];

// Video carousel data - SAMPLE LINKS (replace with your local video paths)
// To use local videos: change src to "videos/your-video.mp4" and set placeholder: false
const videoCarouselData = [
  { type: 'local', src: 'videos//syntropy.mp4', placeholder: false },  // REPLACE: videos/video1.mp4
  { type: 'local', src: 'videos//CorporateHostingSample.mp4', placeholder: false },  // REPLACE: videos/video1.mp4
  { type: 'local', src: 'videos//IMG_1279.mp4', placeholder: false },  // REPLACE: videos/video2.mp4
  { type: 'local', src: 'videos//g20.mp4', placeholder: false },  // REPLACE: videos/video3.mp4
  { type: 'local', src: 'videos//pronite.mp4', placeholder: false },  // REPLACE: videos/video4.mp4
  { type: 'local', src: 'videos//female_cricket.mp4', placeholder: false },  // REPLACE: videos/video5.mp4
];

// Navigation scroll effect with logo visibility
function initNavScroll() {
  const nav = document.getElementById('nav');
  const logo = document.getElementById('navLogo');
  const heroSection = document.getElementById('home');

  function checkScroll() {
    const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 300;

    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (window.scrollY > heroBottom - 100) {
      logo.classList.add('visible');
    } else {
      logo.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
}

// Mobile navigation
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  if (!mobileMenuBtn || !mobileNav) return;

  const mobileNavLinks = mobileNav.querySelectorAll('a');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
  });

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });
}

// Animated Counter
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeOutQuart);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Initialize counters when they come into view
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          const suffix = stat.dataset.suffix || '';
          animateCounter(stat, target, suffix);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function renderVideoCarousel() {
  const track = document.querySelector('.video-track');
  if (!track) return;

  const createVideoItem = (video) => {
    const div = document.createElement('div');
    div.className = 'video-item';

    const videoEl = document.createElement('video');

    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    videoEl.autoplay = true;

    // ✅ BEST PRACTICE
    videoEl.preload = "metadata"; // don't load until needed (huge bandwidth save)
    videoEl.poster = video.poster || "thumbnails/default.jpg";

    videoEl.setAttribute('webkit-playsinline', '');
    videoEl.setAttribute('playsinline', '');

    // ✅ MULTIPLE FORMATS (fixes blank issue on Safari/older browsers)
    const sourceMp4 = document.createElement('source');
    sourceMp4.src = video.src;
    sourceMp4.type = "video/mp4";

    const sourceWebm = document.createElement('source');
    sourceWebm.src = video.src.replace('.mp4', '.webm');
    sourceWebm.type = "video/webm";

    videoEl.appendChild(sourceWebm);
    videoEl.appendChild(sourceMp4);

    // ✅ fallback text (SEO + accessibility)
    videoEl.innerHTML += "Your browser does not support HTML5 video.";

    div.appendChild(videoEl);
    return div;
  };

  // Add videos twice (for smooth loop)
  // Add videos ONLY once
  [...videoCarouselData, ...videoCarouselData].forEach((video) => {
    track.appendChild(createVideoItem(video));
  });
}

// function initSmartVideoCarousel() {
//   const track = document.querySelector('.video-track');
//   const items = document.querySelectorAll('.video-item');

//   const visibleCount = 3;
//   let index = 0;

//   function playVideo(video) {
//     video.play().catch(() => { });
//   }

//   function pauseVideo(video) {
//     video.pause(); // ✅ just pause, don’t reset
//   }

//   function updateCarousel() {
//     track.style.transform = `translate3d(-${index * (100 / visibleCount)}%, 0, 0)`;

//     items.forEach((item, i) => {
//       const video = item.querySelector('video');
//       if (!video) return;

//       if (i >= index && i < index + visibleCount) {
//         if (video.preload === "none") {
//           video.load(); // load only when needed
//         }
//         video.play().catch(() => { });
//       } else {
//         video.pause();
//         // video.currentTime = 0;
//       }
//     });
//   }

// updateCarousel();

// setInterval(() => {
//   index++;

//   if (index > items.length - visibleCount) {
//     index = items.length - visibleCount; // stop at end
//   }

//   updateCarousel();
// }, 3500); // slightly slower = smoother perception
// }

// Render event cards
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  events.forEach((event, index) => {
    const card = document.createElement('a');
    card.className = `event-card card-shine scale-up stagger-${(index % 6) + 1} ${event.id === "icc-world-cup" ? "icc-purple" : ""
      }`;
    card.href = `events/${event.id}`;

    card.innerHTML = `
  <div class="event-image-wrapper ${event.type === 'logo' ? 'logo-card' : ''}">
    <picture>
  ${event.id === "icc-world-cup" ? `
    <source media="(max-width: 768px)" srcset="world_cup_logo/small_logo.png">
    <img class="event-image" src="${event.image}" alt="${event.title}" loading="lazy">
  ` : `
    <img class="event-image" src="${event.image}" alt="${event.title}" loading="lazy">
  `}
</picture>
  </div>

  <div class="event-content">
    <h3 class="event-title">${event.title}</h3>
    <div class="event-arrow">
      View More
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
      </svg>
    </div>
  </div>
`;

    grid.appendChild(card);
  });
}

// Advanced scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .animate-on-scroll, .slide-left, .slide-right, .scale-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('events-grid') ||
          entry.target.classList.contains('about-badges') ||
          entry.target.classList.contains('contact-cards')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            child.classList.add('visible');
          });
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

function initVideoVisibility() {
  const videos = document.querySelectorAll('video');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        if (video.readyState === 0) {
          video.load(); // load only when needed
        }
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(video => observer.observe(video));
}

// Mouse move effect for hero section
function initHeroMouseEffect() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const bubbles = document.querySelectorAll('.bubble');

  if (!hero || !heroContent) return;

  // Only on desktop
  if (window.innerWidth < 768) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroContent.style.transform = `translate(${x * 10}px, ${y * 10}px)`;

    bubbles.forEach((bubble, index) => {
      const depth = (index % 3 + 1) * 0.5;
      const bubbleX = x * 20 * depth;
      const bubbleY = y * 20 * depth;
      bubble.style.setProperty('--mouse-x', `${bubbleX}px`);
      bubble.style.setProperty('--mouse-y', `${bubbleY}px`);
    });
  });

  hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0, 0)';
    bubbles.forEach(bubble => {
      bubble.style.setProperty('--mouse-x', '0px');
      bubble.style.setProperty('--mouse-y', '0px');
    });
  });
}

// Progress indicator on scroll
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${scrollProgress}%`;
  }, { passive: true });
}

function animateCarousel() {
  const track = document.querySelector('.video-track');
  if (!track) return;

  let position = 0;
  const speed = 0.4; // adjust speed here

  function step() {
    position += speed;

    track.style.transform = `translateX(-${position}px)`;

    // seamless loop
    if (position >= track.scrollWidth / 2) {
      position = 0;
    }

    requestAnimationFrame(step);
  }

  step();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderVideoCarousel();

  animateCarousel();        // ✅ smooth infinite scroll
  initVideoVisibility();    // ✅ smart play/pause

  renderEvents();
  initNavScroll();
  initMobileNav();
  initCounters();
  initScrollAnimations();
  initHeroMouseEffect();
  initScrollProgress();
});

// Export events for use in event pages
if (typeof window !== 'undefined') {
  window.eventsData = events;
}
