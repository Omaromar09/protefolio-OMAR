import gsap from 'gsap';
import { photos, LANDING_PHOTO_INDEX } from './photosData.js';

export class HeroWheelController {
  constructor(options = {}) {
    this.options = options;
    this.currentIndex = LANDING_PHOTO_INDEX; // starts at photo-2 (index 1)
    this.isAnimating = false;

    // DOM Elements
    this.stage = document.getElementById('hero-card-stage');
    this.card3D = document.getElementById('hero-card-3d');
    this.cardImg = document.getElementById('hero-card-img');
    this.counterText = document.getElementById('wheel-counter-text');
    this.dotsContainer = document.getElementById('wheel-dots');
    this.btnPrev = document.getElementById('wheel-btn-prev');
    this.btnNext = document.getElementById('wheel-btn-next');
    this.checkBadge = document.getElementById('hero-check-badge');
    this.threeCanvasContainer = document.getElementById('three-canvas-container');

    // Background blobs for subtle parallax
    this.blobTop = document.querySelector('.bg-blob-top');
    this.blobBottom = document.querySelector('.bg-blob-bottom');

    // High-fidelity CSS 3D Card Engine with 8deg cursor tilt & 3D X-axis flip
    // Matches exact 28px card radius, 3px orange border, corner checkmark, and crisp WebP focal points
    this.threeCard = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.renderDots();
    this.updateCardDisplay(this.currentIndex, false);
    this.bindEvents();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    photos.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `wheel-dot ${idx === this.currentIndex ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Photo ${idx + 1}`);
      dot.addEventListener('click', () => {
        this.goTo(idx);
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  bindEvents() {
    // Buttons
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        this.prev();
      });
    }
    if (this.btnNext) {
      this.btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        this.next();
      });
    }

    // Keyboard navigation (Arrow Up / Down)
    window.addEventListener('keydown', (e) => {
      // Only when hero is in view or user has scrolled near top
      if (window.scrollY < window.innerHeight * 0.8) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        }
      }
    });

    // Mouse wheel over the card stage
    if (this.stage) {
      let wheelTimeout = null;
      this.stage.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (this.isAnimating) return;
        if (wheelTimeout) return;

        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 120);

        if (e.deltaY > 15) {
          this.next();
        } else if (e.deltaY < -15) {
          this.prev();
        }
      }, { passive: false });
    }

    // Touch Swipe & Mouse Drag (supports vertical AND horizontal swipes)
    if (this.stage) {
      let startX = 0;
      let startY = 0;
      let isDragging = false;

      const onTouchStart = (clientX, clientY) => {
        startX = clientX;
        startY = clientY;
        isDragging = true;
      };

      const onTouchEnd = (clientX, clientY) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = clientX - startX;
        const diffY = clientY - startY;
        const isRtl = document.documentElement.dir === 'rtl';

        // Detect swipe based on dominant axis
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
          if (diffX < 0) {
            isRtl ? this.prev() : this.next();
          } else {
            isRtl ? this.next() : this.prev();
          }
        } else if (Math.abs(diffY) > 30) {
          if (diffY < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      };

      this.stage.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) onTouchStart(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });

      this.stage.addEventListener('touchend', (e) => {
        if (e.changedTouches.length > 0) onTouchEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }, { passive: true });

      this.stage.addEventListener('mousedown', (e) => {
        onTouchStart(e.clientX, e.clientY);
      });

      window.addEventListener('mouseup', (e) => {
        onTouchEnd(e.clientX, e.clientY);
      });
    }

    // Cursor Parallax on background blobs and CSS card tilt
    window.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth) - 0.5;
      const yRatio = (e.clientY / window.innerHeight) - 0.5;

      // Blob Parallax
      if (this.blobTop) {
        gsap.to(this.blobTop, {
          x: xRatio * 40,
          y: yRatio * 30,
          duration: 1.2,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
      if (this.blobBottom) {
        gsap.to(this.blobBottom, {
          x: -xRatio * 50,
          y: -yRatio * 40,
          duration: 1.4,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }

      // CSS 3D tilt (8 degrees max)
      if (this.card3D && !this.isReducedMotion) {
        const tiltX = -yRatio * 8;
        const tiltY = xRatio * 8;
        gsap.to(this.card3D, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    if (this.stage) {
      this.stage.addEventListener('mouseleave', () => {
        if (this.card3D && !this.isReducedMotion) {
          gsap.to(this.card3D, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    }
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % photos.length;
    this.goTo(nextIndex, 1);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + photos.length) % photos.length;
    this.goTo(prevIndex, -1);
  }

  goTo(newIndex, direction = 1) {
    if (newIndex === this.currentIndex || this.isAnimating) return;
    this.isAnimating = true;

    const oldIndex = this.currentIndex;
    this.currentIndex = newIndex;

    // Trigger Three.js 3D card flip
    if (this.threeCard) {
      this.threeCard.flipTo(newIndex, direction);
    }

    // Fast blurred vertical motion animation & 3D X-axis flip
    if (this.cardImg) {
      const tl = gsap.timeline({
        onComplete: () => {
          this.isAnimating = false;
        }
      });

      // 3D Card X-axis flip & vertical motion blur
      if (this.card3D && !this.isReducedMotion) {
        tl.to(this.card3D, {
          rotateX: direction > 0 ? -18 : 18,
          duration: 0.18,
          ease: 'power2.in'
        }, 0);
        tl.to(this.card3D, {
          rotateX: 0,
          duration: 0.38,
          ease: 'power3.out'
        }, 0.18);
      }

      // Quick flip out with vertical motion blur
      tl.to(this.cardImg, {
        y: direction > 0 ? -40 : 40,
        filter: 'blur(0px 8px)',
        opacity: 0.6,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          this.cardImg.src = photos[this.currentIndex].src;
          this.cardImg.style.objectPosition = photos[this.currentIndex].focalPoint;
          gsap.set(this.cardImg, { y: direction > 0 ? 40 : -40 });
        }
      }, 0);

      // Flip in and settle with exponential ease
      tl.to(this.cardImg, {
        y: 0,
        filter: 'blur(0px 0px)',
        opacity: 1,
        duration: 0.38,
        ease: 'power3.out'
      }, 0.18);

      // Spring checkmark badge pop
      if (this.checkBadge) {
        tl.fromTo(this.checkBadge,
          { scale: 0.4, opacity: 0.5, rotation: direction * 15 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.35, ease: 'back.out(2.5)' },
          '-=0.2'
        );
      }
    } else {
      this.isAnimating = false;
    }

    this.updateCardDisplay(this.currentIndex);
  }

  updateCardDisplay(index, animateBadge = true) {
    const p = photos[index];

    // Counter "02 / 06"
    if (this.counterText) {
      const curStr = String(index + 1).padStart(2, '0');
      const totalStr = String(photos.length).padStart(2, '0');
      this.counterText.textContent = `${curStr} / ${totalStr}`;
    }

    // Active Dot
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.wheel-dot');
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === index);
      });
    }

    // Image & Focal Point
    if (this.cardImg) {
      this.cardImg.src = p.src;
      this.cardImg.alt = document.documentElement.lang === 'en' ? p.altEn : p.altAr;
      this.cardImg.style.objectPosition = p.focalPoint;
    }

    // Border and check badge
    if (this.card3D) {
      this.card3D.style.borderColor = 'var(--accent)';
    }

    if (this.checkBadge && animateBadge) {
      gsap.fromTo(this.checkBadge,
        { scale: 0.6 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      );
    }
  }
}
