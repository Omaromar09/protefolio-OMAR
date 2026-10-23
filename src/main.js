import './styles/main.css';
import './styles/intro.css';
import './styles/hero.css';
import './styles/sections.css';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { translations } from './i18n.js';
import { IntroController } from './intro.js';
import { HeroWheelController } from './heroWheel.js';
import { ScrollSectionsController } from './scrollSections.js';
import { initMagneticButtons } from './magnetic.js';

gsap.registerPlugin(ScrollTrigger);

class App {
  constructor() {
    this.currentLang = this.getSavedLanguage();
    this.lenis = null;
    this.intro = null;
    this.heroWheel = null;
    this.scrollSections = null;

    this.init();
  }

  getSavedLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'en' || urlLang === 'ar') return urlLang;

      const saved = localStorage.getItem('omar_portfolio_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch (e) {}
    return 'ar'; // Arabic default as requested
  }

  saveLanguage(lang) {
    try {
      localStorage.setItem('omar_portfolio_lang', lang);
    } catch (e) {}
  }

  init() {
    // 1. Initialize Lenis Smooth Scroll
    this.initLenis();

    // 2. Apply initial language & dir
    this.applyLanguage(this.currentLang, false);

    // 3. Initialize Intro Controller
    this.intro = new IntroController({
      lang: this.currentLang,
      onHandOff: (immediate = false) => {
        this.runHeroHandOff(immediate);
      },
      onComplete: () => {
        if (this.lenis) this.lenis.start();
      }
    });

    // 4. Initialize Hero Wheel (Centerpiece)
    this.heroWheel = new HeroWheelController();

    // 5. Initialize Scroll Sections (About fan, Gallery stack, Services, Work, Contact, Footer)
    this.scrollSections = new ScrollSectionsController(this.lenis);

    // 6. Initialize Magnetic Hover Buttons
    initMagneticButtons();

    // 7. Live Cairo Clock Ticker
    this.initCairoClock();

    // 8. Navigation & Language Events
    this.bindGlobalEvents();

    // 9. Test / URL parameters (?t=2.5, ?skip=1)
    this.checkUrlParams();

    // Check visibility change to pause loops
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.lenis) this.lenis.stop();
      } else {
        if (this.lenis && this.intro && this.intro.isComplete) this.lenis.start();
      }
    });
  }

  checkUrlParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const testTime = urlParams.get('t');
      const testSkip = urlParams.get('skip');

      if (testSkip === '1') {
        this.intro.skipToHero(false);
      } else if (testTime !== null) {
        const timeVal = parseFloat(testTime);
        if (!isNaN(timeVal)) {
          setTimeout(() => {
            if (this.intro && this.intro.timeline) {
              this.intro.timeline.pause(timeVal);
              if (timeVal >= 5.0) {
                const landingCard = document.getElementById('intro-landing-card');
                if (landingCard) landingCard.classList.add('has-orange-border');
              }
              if (timeVal >= 5.3) {
                this.runHeroHandOff(true);
              }
            }
          }, 50);
        }
      }

      const testScroll = urlParams.get('scroll');
      if (testScroll) {
        setTimeout(() => {
          const target = document.getElementById(testScroll);
          if (target) {
            target.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        }, 400);
      }
    } catch (e) {}
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  runHeroHandOff(immediate = false) {
    const nav = document.getElementById('site-nav');
    const heroTitle = document.getElementById('hero-title');
    const heroBadge = document.getElementById('hero-badge');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');

    if (immediate) {
      if (nav) gsap.set(nav, { y: 0, opacity: 1, pointerEvents: 'auto' });
      if (heroTitle) gsap.set(heroTitle, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)' });
      if (heroBadge) gsap.set(heroBadge, { y: 0, opacity: 1 });
      if (heroSubtitle) gsap.set(heroSubtitle, { y: 0, opacity: 1 });
      if (heroActions) gsap.set(heroActions, { scale: 1, opacity: 1 });
      return;
    }

    const handOffTl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Nav drops in from top
    if (nav) {
      handOffTl.fromTo(nav,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, pointerEvents: 'auto' },
        0
      );
    }

    // Hero Badge fades & slides
    if (heroBadge) {
      handOffTl.fromTo(heroBadge,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.15
      );
    }

    // Hero Title unfolds with mask
    if (heroTitle) {
      handOffTl.fromTo(heroTitle,
        { y: 40, opacity: 0, clipPath: 'inset(100% 0 0% 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)', duration: 0.7 },
        0.25
      );
    }

    // Hero Subtitle unfolds
    if (heroSubtitle) {
      handOffTl.fromTo(heroSubtitle,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.35
      );
    }

    // Buttons grow
    if (heroActions) {
      handOffTl.fromTo(heroActions,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
        0.45
      );
    }
  }

  applyLanguage(lang, refreshScroll = true) {
    this.currentLang = lang;
    this.saveLanguage(lang);

    const t = translations[lang];
    const isEn = lang === 'en';

    // Update root attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';
    document.title = t.meta.title;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t.meta.description;

    // Skip Button
    const skipLabel = document.getElementById('skip-btn-label');
    if (skipLabel) skipLabel.textContent = t.nav.skipIntro;

    // Intro Texts
    const introL1Pre = document.getElementById('intro-line1-prefix');
    const introL1Suf = document.getElementById('intro-line1-suffix');
    const introL2Suf = document.getElementById('intro-line2-suffix');
    if (introL1Pre) introL1Pre.textContent = t.intro.headlineLine1Prefix;
    if (introL1Suf) introL1Suf.textContent = t.intro.headlineLine1Suffix;
    if (introL2Suf) introL2Suf.textContent = t.intro.headlineLine2Suffix;

    const rollerTrack = document.getElementById('intro-roller-track');
    if (rollerTrack) {
      const items = rollerTrack.querySelectorAll('.intro-roller-item');
      t.intro.rotatingWords.forEach((word, idx) => {
        if (items[idx]) items[idx].textContent = word;
      });
    }

    const meetL1 = document.getElementById('intro-meet-l1');
    const meetL2 = document.getElementById('intro-meet-l2');
    if (meetL1) meetL1.textContent = t.intro.meetOmarLine1;
    if (meetL2) meetL2.innerHTML = `${t.intro.meetOmarLine2}<span class="highlight-dot">.</span>`;

    // Nav
    const navBrand = document.getElementById('nav-brand-text');
    if (navBrand) navBrand.textContent = t.nav.brand;
    const linkAbout = document.getElementById('nav-link-about');
    const linkPhotos = document.getElementById('nav-link-photos');
    const linkServices = document.getElementById('nav-link-services');
    const linkWork = document.getElementById('nav-link-work');
    const linkContact = document.getElementById('nav-link-contact');
    if (linkAbout) linkAbout.textContent = t.nav.about;
    if (linkPhotos) linkPhotos.textContent = t.nav.photos;
    if (linkServices) linkServices.textContent = t.nav.services;
    if (linkWork) linkWork.textContent = t.nav.work;
    if (linkContact) linkContact.textContent = t.nav.contact;

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const mobileLangBtn = document.getElementById('mobile-lang-btn');
    if (langToggleBtn) langToggleBtn.textContent = t.nav.langToggle;
    if (mobileLangBtn) mobileLangBtn.textContent = t.nav.langToggle;

    // Hero
    const heroBadge = document.getElementById('hero-badge-text');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitlePre = document.getElementById('hero-subtitle-prefix');
    const heroSubtitleAcc = document.getElementById('hero-subtitle-accent');
    const heroCtaWorkText = document.getElementById('hero-cta-work-text');
    const heroCtaContactText = document.getElementById('hero-cta-contact-text');
    const wheelHintText = document.getElementById('wheel-hint-text');

    if (heroBadge) heroBadge.textContent = t.hero.badge;
    if (heroTitle) heroTitle.textContent = t.hero.greeting;
    if (heroSubtitlePre) heroSubtitlePre.textContent = t.hero.oneLinerPrefix;
    if (heroSubtitleAcc) heroSubtitleAcc.textContent = t.hero.oneLinerAccent;
    if (heroCtaWorkText) heroCtaWorkText.textContent = t.hero.ctaWork;
    if (heroCtaContactText) heroCtaContactText.textContent = t.hero.ctaContact;
    if (wheelHintText) wheelHintText.textContent = isEn ? 'Navigate with mouse wheel, drag, or arrow keys' : 'تقدر تقلب بالماوس أو بالسحب أو بالأسهم';

    // About
    const aboutKicker = document.getElementById('about-kicker');
    const aboutTitle = document.getElementById('about-title');
    const aboutBio = document.getElementById('about-bio');
    const aboutPlaceholder = document.getElementById('about-placeholder');
    const aboutFocal = document.getElementById('about-focal-note');
    const aboutVibeStatus = document.getElementById('about-vibe-status');
    if (aboutKicker) aboutKicker.textContent = t.about.tag;
    if (aboutTitle) aboutTitle.textContent = t.about.title;
    if (aboutBio) aboutBio.textContent = t.about.bio;
    if (aboutPlaceholder) aboutPlaceholder.textContent = t.about.placeholder;
    if (aboutFocal) aboutFocal.textContent = t.about.focalNote;
    if (aboutVibeStatus) aboutVibeStatus.textContent = `${t.about.vibeStatus} • ${t.about.vibeCity}`;

    // Gallery / Behind the Scenes
    const galleryKicker = document.getElementById('gallery-kicker');
    const galleryTitle = document.getElementById('gallery-title');
    const gallerySubtitle = document.getElementById('gallery-subtitle');
    if (galleryKicker) galleryKicker.textContent = t.gallery.tag;
    if (galleryTitle) galleryTitle.textContent = t.gallery.title;
    if (gallerySubtitle) gallerySubtitle.textContent = t.gallery.subtitle;

    // Services / Craft
    const servicesKicker = document.getElementById('services-kicker');
    const servicesTitle = document.getElementById('services-title');
    const servicesSubtitle = document.getElementById('services-subtitle');
    if (servicesKicker) servicesKicker.textContent = t.services.tag;
    if (servicesTitle) servicesTitle.textContent = t.services.title;
    if (servicesSubtitle) servicesSubtitle.textContent = t.services.subtitle;
    const s1Title = document.getElementById('service-1-title');
    const s1Desc = document.getElementById('service-1-desc');
    const s2Title = document.getElementById('service-2-title');
    const s2Desc = document.getElementById('service-2-desc');
    const s3Title = document.getElementById('service-3-title');
    const s3Desc = document.getElementById('service-3-desc');
    if (s1Title) s1Title.textContent = t.services.items[0].title;
    if (s1Desc) s1Desc.textContent = t.services.items[0].desc;
    if (s2Title) s2Title.textContent = t.services.items[1].title;
    if (s2Desc) s2Desc.textContent = t.services.items[1].desc;
    if (s3Title) s3Title.textContent = t.services.items[2].title;
    if (s3Desc) s3Desc.textContent = t.services.items[2].desc;

    // Work / 7P Studio
    const workKicker = document.getElementById('work-kicker');
    const workTitle = document.getElementById('work-title');
    const workSubtitle = document.getElementById('work-subtitle');
    const workCardTitle = document.getElementById('work-card-title');
    const workCardDesc = document.getElementById('work-card-desc');
    const workLinkText = document.getElementById('work-link-text');
    const workPreviewNote = document.getElementById('work-preview-note');
    if (workKicker) workKicker.textContent = t.work.tag;
    if (workTitle) workTitle.textContent = t.work.title;
    if (workSubtitle) workSubtitle.textContent = t.work.subtitle;
    if (workCardTitle) workCardTitle.textContent = t.work.cardTitle;
    if (workCardDesc) workCardDesc.textContent = t.work.cardDesc;
    if (workLinkText) workLinkText.textContent = t.work.cardLinkText;
    if (workPreviewNote) workPreviewNote.textContent = isEn ? 'External client studio portfolio' : 'موقع استوديو العملاء الخارجي';

    // Contact
    const contactKicker = document.getElementById('contact-kicker');
    const contactTitle = document.getElementById('contact-title');
    const contactSubtitle = document.getElementById('contact-subtitle');
    if (contactKicker) contactKicker.textContent = t.contact.tag;
    if (contactTitle) contactTitle.textContent = t.contact.title;
    if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;

    const waLabel = document.getElementById('contact-wa-label');
    const emailLabel = document.getElementById('contact-email-label');
    const instaLabel = document.getElementById('contact-insta-label');
    if (waLabel) waLabel.textContent = t.contact.whatsappLabel;
    if (emailLabel) emailLabel.textContent = t.contact.emailLabel;
    if (instaLabel) instaLabel.textContent = t.contact.instaLabel;

    // Footer
    const footerRights = document.getElementById('footer-rights');
    const footerBack = document.getElementById('footer-back-to-top-text');
    if (footerRights) footerRights.textContent = t.footer.copy;
    if (footerBack) footerBack.textContent = t.footer.backToTop;

    // Re-render gallery captions if initialized
    if (this.scrollSections) {
      this.scrollSections.initGalleryStack();
    }

    if (refreshScroll) {
      ScrollTrigger.refresh();
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.applyLanguage(nextLang, true);
  }

  bindGlobalEvents() {
    // Language toggle in nav
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguage();
      });
    }

    const mobileLangBtn = document.getElementById('mobile-lang-btn');
    if (mobileLangBtn) {
      mobileLangBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguage();
        this.closeMobileDrawer();
      });
    }

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        mobileDrawer.classList.toggle('is-open');
      });

      const drawerLinks = mobileDrawer.querySelectorAll('.mobile-drawer-link');
      drawerLinks.forEach((link) => {
        link.addEventListener('click', () => {
          this.closeMobileDrawer();
        });
      });
    }
  }

  closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('is-open');
  }

  initCairoClock() {
    const clockEl = document.getElementById('cairo-clock');
    if (!clockEl) return;
    const update = () => {
      try {
        const now = new Intl.DateTimeFormat('ar-EG', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        clockEl.textContent = now;
      } catch (e) {
        const d = new Date();
        clockEl.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
      }
    };
    update();
    setInterval(update, 15000);
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.__omar_app = new App();
});
