import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photos } from './photosData.js';

gsap.registerPlugin(ScrollTrigger);

export class ScrollSectionsController {
  constructor(lenisInstance) {
    this.lenis = lenisInstance;
    this.galleryCurrentIndex = 0;
    this.galleryCards = [];
    this.init();
  }

  init() {
    this.initAboutFan();
    this.initGalleryStack();
    this.initServiceCards();
    this.initWorkCards();
    this.initProcessCards();
    this.initFaqCards();
    this.initContactCopy();
    this.initBackToTop();
  }

  initAboutFan() {
    const wrapper = document.querySelector('.about-deck-wrapper');
    const fanCards = document.querySelectorAll('.about-fan-card');
    if (!wrapper || fanCards.length === 0) return;

    // Only apply subtle scroll drift on larger screens where cards float
    if (window.innerWidth <= 768) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 85%',
        end: 'bottom 45%',
        scrub: 1.5
      }
    });

    // Gentle outward micro-drift that stays completely clear of the top navbar
    fanCards.forEach((card, index) => {
      let targetX = 0;
      let targetY = 0;
      let targetRot = 0;

      if (index === 0) {
        targetX = -20;
        targetY = 12;
        targetRot = -2;
      } else if (index === 1) {
        targetX = -18;
        targetY = 15;
        targetRot = 2;
      } else if (index === 2) {
        targetX = 20;
        targetY = 12;
        targetRot = 2;
      } else if (index === 3) {
        targetX = 18;
        targetY = 15;
        targetRot = -2;
      }

      const isRtl = document.documentElement.dir === 'rtl';
      if (isRtl) {
        targetX = -targetX;
        targetRot = -targetRot;
      }

      tl.to(card, {
        x: targetX,
        y: targetY,
        rotate: `+=${targetRot}`,
        ease: 'none'
      }, 0);
    });
  }

  initGalleryStack() {
    const container = document.getElementById('gallery-stack');
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');

    if (!container || !track) return;

    track.innerHTML = '';
    this.galleryCards = [];

    // Create clean photo cards without any captions or text overlays
    photos.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `gallery-card card-idx-${idx}`;
      card.dataset.index = idx;

      const img = document.createElement('img');
      img.src = p.src;
      img.alt = document.documentElement.lang === 'en' ? p.altEn : p.altAr;
      img.loading = 'lazy';
      img.style.objectPosition = p.focalPoint;

      card.appendChild(img);
      track.appendChild(card);

      this.galleryCards.push(card);
    });

    this.updateGalleryStackLayout(false);

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.galleryPrev();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.galleryNext();
      });
    }

    // Touch / Swipe support on gallery (both X and Y)
    let startX = 0;
    let startY = 0;
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;
        const isRtl = document.documentElement.dir === 'rtl';

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
          if (diffX < 0) {
            isRtl ? this.galleryPrev() : this.galleryNext();
          } else {
            isRtl ? this.galleryNext() : this.galleryPrev();
          }
        } else if (Math.abs(diffY) > 30) {
          if (diffY < 0) {
            this.galleryNext();
          } else {
            this.galleryPrev();
          }
        }
      }
    }, { passive: true });
  }

  updateGalleryStackLayout(animate = true) {
    const total = this.galleryCards.length;

    this.galleryCards.forEach((card, idx) => {
      const offset = (idx - this.galleryCurrentIndex + total) % total;

      const isMobile = window.innerWidth <= 600;
      let zIndex = total - offset;
      let scale = 1 - offset * (isMobile ? 0.045 : 0.055);
      let yOffset = offset * (isMobile ? 12 : 20);
      let opacity = offset > 3 ? 0 : 1 - offset * 0.22;
      let pointerEvents = offset === 0 ? 'auto' : 'none';

      if (animate) {
        gsap.to(card, {
          y: yOffset,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        gsap.set(card, {
          y: yOffset,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex
        });
      }

      card.style.pointerEvents = pointerEvents;
    });

    const counter = document.getElementById('gallery-counter');
    if (counter && total > 0) {
      counter.textContent = `${String(this.galleryCurrentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }
  }

  galleryNext() {
    this.galleryCurrentIndex = (this.galleryCurrentIndex + 1) % this.galleryCards.length;
    this.updateGalleryStackLayout(true);
  }

  galleryPrev() {
    this.galleryCurrentIndex = (this.galleryCurrentIndex - 1 + this.galleryCards.length) % this.galleryCards.length;
    this.updateGalleryStackLayout(true);
  }

  initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%'
        }
      }
    );
  }

  initWorkCards() {
    const cards = document.querySelectorAll('.work-project-card, .work-studio-banner');
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-projects-grid',
          start: 'top 85%'
        }
      }
    );
  }

  initProcessCards() {
    const cards = document.querySelectorAll('.process-card');
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 85%'
        }
      }
    );
  }

  initFaqCards() {
    const cards = document.querySelectorAll('.faq-card');
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-grid',
          start: 'top 85%'
        }
      }
    );
  }

  initContactCopy() {
    const copyBtns = document.querySelectorAll('[data-copy-target]');

    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-copy-target');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const textToCopy = targetEl.textContent.trim();
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.innerHTML;
          const isEn = document.documentElement.lang === 'en';
          
          btn.classList.add('copied');
          btn.textContent = isEn ? 'Copied!' : 'تم النسخ!';

          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalText;
          }, 2000);
        } catch (err) {
          console.warn('Clipboard write failed:', err);
        }
      });
    });
  }

  initBackToTop() {
    const btn = document.getElementById('footer-back-to-top');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.lenis) {
        this.lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
