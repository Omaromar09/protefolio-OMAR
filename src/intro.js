import gsap from 'gsap';
import { photos, LANDING_PHOTO_INDEX } from './photosData.js';

export class IntroController {
  constructor(options = {}) {
    this.options = options;
    this.onComplete = options.onComplete || (() => {});
    this.lang = options.lang || 'ar';
    this.timeline = null;
    this.isComplete = false;

    this.overlay = document.getElementById('intro-overlay');
    this.skipBtn = document.getElementById('intro-skip-btn');
    
    // Stage elements
    this.centerStage = document.getElementById('intro-center-stage');
    this.dotWrapper = document.getElementById('intro-dot-wrapper');
    this.dot = document.getElementById('intro-dot');
    this.pulseRing = document.getElementById('intro-pulse-ring');
    this.pill = document.getElementById('intro-pill');
    this.pillAvatars = document.querySelectorAll('.intro-pill .intro-avatar');
    
    this.headlineStage = document.getElementById('intro-headline-stage');
    this.rollerTrack = document.getElementById('intro-roller-track');
    
    this.meetStage = document.getElementById('intro-meet-stage');
    this.meetHeading = document.getElementById('intro-meet-heading');
    this.wheelViewport = document.querySelector('.intro-wheel-viewport');
    this.wheelTrack = document.getElementById('intro-wheel-track');
    this.landingCard = document.getElementById('intro-landing-card');
    this.checkBadge = document.getElementById('intro-check-badge');
    this.progressLine = document.getElementById('intro-progress-line');
    this.pillShimmer = document.querySelector('.pill-shimmer');
    this.snapRipple = document.getElementById('intro-snap-ripple');

    // Expose for testing & scrubbing
    window.__introController = this;

    this.init();
  }

  init() {
    // Check if session has already seen the intro
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem('omar_portfolio_intro_seen') === 'true';
    } catch (e) {
      hasSeen = false;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      this.skipToHero(false);
      return;
    }

    this.bindEvents();
    this.buildMasterTimeline();
  }

  bindEvents() {
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.skipToHero(true);
      });
    }

    window.addEventListener('resize', () => {
      if (this.timeline && !this.isComplete && this.wheelTrack && this.landingCard) {
        this.adjustLandingPosition();
      }
    });
  }

  getLandingTargetY() {
    if (!this.wheelTrack || !this.landingCard) return 0;
    const cardRect = this.landingCard.getBoundingClientRect();
    const cardHeight = cardRect.height || 420;
    const gap = 24;

    const cards = Array.from(this.wheelTrack.children);
    const landingIndex = cards.indexOf(this.landingCard);
    const idx = landingIndex >= 0 ? landingIndex : 5;

    // Target Y so that the landing card's center aligns with the viewport center
    const targetY = - (idx * (cardHeight + gap) + cardHeight / 2);
    return targetY;
  }

  adjustLandingPosition() {
    if (!this.wheelTrack) return;
    const targetY = this.getLandingTargetY();
    if (this.timeline && this.timeline.time() >= 5.0) {
      gsap.set(this.wheelTrack, { y: targetY });
    }
  }

  buildMasterTimeline() {
    const targetY = this.getLandingTargetY();
    const startY = targetY - 2600; // Scrolls rapidly downwards to target

    this.timeline = gsap.timeline({
      paused: false,
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        this.finishIntro();
      }
    });

    window.__introTimeline = this.timeline;

    // Minimalist Timeline Progress Bar (0.00 to 5.00s)
    if (this.progressLine) {
      this.timeline.fromTo(this.progressLine,
        { width: '0%' },
        { width: '100%', duration: 5.00, ease: 'none' },
        0
      );
    }

    // ----------------------------------------------------
    // Phase 1: 0.00 to 0.50s - Orange Dot & Pulse Ring
    // ----------------------------------------------------
    this.timeline.set(this.dotWrapper, { opacity: 1, scale: 1 }, 0);
    this.timeline.fromTo(this.dot, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)' }, 
      0
    );
    this.timeline.fromTo(this.pulseRing,
      { scale: 1, opacity: 0.9 },
      { scale: 2.8, opacity: 0, duration: 0.45, ease: 'power2.out' },
      0.08
    );

    // ----------------------------------------------------
    // Phase 2: 0.50 to 0.85s - Dot grows into white rounded pill
    // ----------------------------------------------------
    this.timeline.to(this.dot, {
      scale: 0.2,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, 0.50);

    this.timeline.fromTo(this.pill,
      { scale: 0.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      0.50
    );

    // Subtle glossy shimmer across the pill
    if (this.pillShimmer) {
      this.timeline.fromTo(this.pillShimmer,
        { left: '-120%' },
        { left: '120%', duration: 0.6, ease: 'power2.inOut' },
        0.65
      );
    }

    // ----------------------------------------------------
    // Phase 3: 0.85 to 1.20s - Avatars pop into pill one by one
    // ----------------------------------------------------
    if (this.pillAvatars.length > 0) {
      this.timeline.fromTo(this.pillAvatars,
        { scale: 0, opacity: 0, rotation: (i) => [-8, 6, -5, 7][i] || 0 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0,
          duration: 0.28, 
          stagger: 0.07, 
          ease: 'back.out(2.2)' 
        },
        0.85
      );
    }

    // ----------------------------------------------------
    // Phase 4: 1.20 to 2.00s - Pill dissolves, headline blurs in
    // ----------------------------------------------------
    this.timeline.to(this.pill, {
      scale: 1.15,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 1.20);

    this.timeline.fromTo(this.headlineStage,
      { opacity: 0, filter: 'blur(16px)', y: 24 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.55, ease: 'power3.out' },
      1.25
    );

    // ----------------------------------------------------
    // Phase 5: 2.00 to 3.20s - Word roller spins 4 times
    // ----------------------------------------------------
    if (this.rollerTrack) {
      this.timeline.to(this.rollerTrack, {
        filter: 'blur(0px 4px)',
        duration: 0.1
      }, 2.00);

      this.timeline.to(this.rollerTrack, {
        yPercent: -75,
        duration: 1.12,
        ease: 'power3.inOut'
      }, 2.05);

      this.timeline.to(this.rollerTrack, {
        filter: 'blur(0px 0px)',
        duration: 0.15
      }, 3.12);
    }

    // ----------------------------------------------------
    // Phase 6: 3.20 to 3.50s - Headline blurs & slides out
    // Meet Omar appears on start side
    // ----------------------------------------------------
    const slideDir = this.lang === 'ar' ? -60 : 60;

    this.timeline.to(this.headlineStage, {
      opacity: 0,
      filter: 'blur(14px)',
      x: slideDir,
      duration: 0.30,
      ease: 'power3.in'
    }, 3.20);

    this.timeline.set(this.meetStage, { opacity: 1 }, 3.20);
    this.timeline.fromTo(this.meetHeading,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.40, ease: 'power3.out' },
      3.22
    );

    // ----------------------------------------------------
    // Phase 7: 3.30 to 5.00s - Vertical Photo Wheel Fast Scroll
    // Decelerates exponentially and STOPS AT EXACTLY t = 5.00s on photo-2!
    // ----------------------------------------------------
    if (this.wheelTrack) {
      this.timeline.fromTo(this.wheelTrack,
        { y: startY, filter: 'blur(0px 10px)' },
        {
          y: targetY,
          filter: 'blur(0px 0px)',
          duration: 1.70, // 3.30 + 1.70 = 5.00s exactly
          ease: 'power4.out'
        },
        3.30
      );
    }

    // ----------------------------------------------------
    // Phase 8: 5.00s - Stopped card gets orange border & check badge
    // ----------------------------------------------------
    this.timeline.call(() => {
      if (this.landingCard) {
        this.landingCard.classList.add('has-orange-border');
      }
    }, null, 5.00);

    if (this.checkBadge) {
      this.timeline.fromTo(this.checkBadge,
        { scale: 0, opacity: 0, rotation: -20 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          duration: 0.30, 
          ease: 'back.out(2.5)' 
        },
        5.00
      );
    }

    // Hold 0.3s (5.00 to 5.30s)

    // ----------------------------------------------------
    // Phase 9: 5.30 to 6.00s - Seamless Hand-off to Hero
    // ----------------------------------------------------
    this.timeline.call(() => {
      this.triggerHeroHandOff();
    }, null, 5.30);

    this.timeline.to(this.overlay, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out'
    }, 5.55);
  }

  triggerHeroHandOff() {
    if (this.options.onHandOff) {
      this.options.onHandOff();
    }
  }

  finishIntro() {
    if (this.isComplete) return;
    this.isComplete = true;

    try {
      sessionStorage.setItem('omar_portfolio_intro_seen', 'true');
    } catch (e) {}

    if (this.overlay) {
      this.overlay.classList.add('intro-complete');
    }

    this.onComplete();
  }

  skipToHero(setStorage = true) {
    if (this.timeline) {
      this.timeline.kill();
    }
    
    if (this.landingCard) {
      this.landingCard.classList.add('has-orange-border');
    }

    if (this.checkBadge) {
      gsap.set(this.checkBadge, { scale: 1, opacity: 1, rotation: 0 });
    }

    if (this.options.onHandOff) {
      this.options.onHandOff(true);
    }

    if (this.overlay) {
      this.overlay.classList.add('intro-complete');
    }

    if (setStorage) {
      try {
        sessionStorage.setItem('omar_portfolio_intro_seen', 'true');
      } catch (e) {}
    }

    this.isComplete = true;
    this.onComplete();
  }

  seek(t) {
    if (this.timeline) {
      this.timeline.pause(t);
    }
  }
}
