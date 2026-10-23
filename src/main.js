import './styles/main.css';
import './styles/intro.css';
import './styles/hero.css';
import './styles/sections.css';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { translations, getCairoVibe } from './i18n.js';
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

    // 7. Live Cairo Clock Ticker & Vibe
    this.initCairoClock();

    // 8. Easter Egg Interaction & Console Greeting
    this.initEasterEgg();

    // 9. Navigation & Language Events
    this.bindGlobalEvents();

    // 10. Test / URL parameters (?t=2.5, ?skip=1)
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
    const aboutBio1 = document.getElementById('about-bio-1');
    const aboutBio2 = document.getElementById('about-bio-2');
    const aboutVibeStatus = document.getElementById('about-vibe-status');
    if (aboutKicker) aboutKicker.textContent = t.about.tag;
    if (aboutTitle) aboutTitle.textContent = t.about.title;
    if (aboutBio1) aboutBio1.textContent = t.about.bio1;
    if (aboutBio2) aboutBio2.textContent = t.about.bio2;
    if (aboutVibeStatus) aboutVibeStatus.textContent = `${t.about.vibeStatus} • ${t.about.vibeCity}`;

    // Update Cairo clock & vibe text for current language
    this.updateCairoClock();

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
    if (s1Desc) s1Desc.innerHTML = t.services.items[0].desc.replace(/\n/g, '<br />');
    if (s2Title) s2Title.textContent = t.services.items[1].title;
    if (s2Desc) s2Desc.innerHTML = t.services.items[1].desc.replace(/\n/g, '<br />');
    if (s3Title) s3Title.textContent = t.services.items[2].title;
    if (s3Desc) s3Desc.innerHTML = t.services.items[2].desc.replace(/\n/g, '<br />');

    // Work / 7P Studio
    const workKicker = document.getElementById('work-kicker');
    const workTitle = document.getElementById('work-title');
    const workSubtitle = document.getElementById('work-subtitle');
    const workStudioNote = document.getElementById('work-studio-note');
    if (workKicker) workKicker.textContent = t.work.tag;
    if (workTitle) workTitle.textContent = t.work.title;
    if (workSubtitle) workSubtitle.textContent = t.work.subtitle;
    if (workStudioNote) workStudioNote.textContent = t.work.studioNote;

    const p1Title = document.getElementById('p1-title');
    const p1Desc = document.getElementById('p1-desc');
    const p1Btn = document.getElementById('p1-btn-text');
    if (p1Title) p1Title.textContent = t.work.projects[0].title;
    if (p1Desc) p1Desc.textContent = t.work.projects[0].desc;
    if (p1Btn) p1Btn.textContent = t.work.projects[0].btnText;

    const p2Title = document.getElementById('p2-title');
    const p2Desc = document.getElementById('p2-desc');
    const p2Btn = document.getElementById('p2-btn-text');
    if (p2Title) p2Title.textContent = t.work.projects[1].title;
    if (p2Desc) p2Desc.textContent = t.work.projects[1].desc;
    if (p2Btn) p2Btn.textContent = t.work.projects[1].btnText;

    const p3Title = document.getElementById('p3-title');
    const p3Desc = document.getElementById('p3-desc');
    const p3Btn = document.getElementById('p3-btn-text');
    if (p3Title) p3Title.textContent = t.work.projects[2].title;
    if (p3Desc) p3Desc.textContent = t.work.projects[2].desc;
    if (p3Btn) p3Btn.textContent = t.work.projects[2].btnText;

    // Process ("إزاي بنشتغل سوا")
    const processKicker = document.getElementById('process-kicker');
    const processTitle = document.getElementById('process-title');
    const processSubtitle = document.getElementById('process-subtitle');
    if (processKicker) processKicker.textContent = t.process.tag;
    if (processTitle) processTitle.textContent = t.process.title;
    if (processSubtitle) processSubtitle.textContent = t.process.subtitle;

    const pr1Title = document.getElementById('pr-1-title');
    const pr1Desc = document.getElementById('pr-1-desc');
    const pr2Title = document.getElementById('pr-2-title');
    const pr2Desc = document.getElementById('pr-2-desc');
    const pr3Title = document.getElementById('pr-3-title');
    const pr3Desc = document.getElementById('pr-3-desc');
    const pr4Title = document.getElementById('pr-4-title');
    const pr4Desc = document.getElementById('pr-4-desc');
    if (pr1Title) pr1Title.textContent = t.process.steps[0].title;
    if (pr1Desc) pr1Desc.textContent = t.process.steps[0].desc;
    if (pr2Title) pr2Title.textContent = t.process.steps[1].title;
    if (pr2Desc) pr2Desc.textContent = t.process.steps[1].desc;
    if (pr3Title) pr3Title.textContent = t.process.steps[2].title;
    if (pr3Desc) pr3Desc.textContent = t.process.steps[2].desc;
    if (pr4Title) pr4Title.textContent = t.process.steps[3].title;
    if (pr4Desc) pr4Desc.textContent = t.process.steps[3].desc;

    // FAQ ("أسئلة بتيجي في البال علطول")
    const faqKicker = document.getElementById('faq-kicker');
    const faqTitle = document.getElementById('faq-title');
    const faqSubtitle = document.getElementById('faq-subtitle');
    if (faqKicker) faqKicker.textContent = t.faq.tag;
    if (faqTitle) faqTitle.textContent = t.faq.title;
    if (faqSubtitle) faqSubtitle.textContent = t.faq.subtitle;

    const faqQ1 = document.getElementById('faq-q1');
    const faqA1 = document.getElementById('faq-a1');
    const faqQ2 = document.getElementById('faq-q2');
    const faqA2 = document.getElementById('faq-a2');
    const faqQ3 = document.getElementById('faq-q3');
    const faqA3 = document.getElementById('faq-a3');
    if (faqQ1) faqQ1.textContent = t.faq.items[0].q;
    if (faqA1) faqA1.textContent = t.faq.items[0].a;
    if (faqQ2) faqQ2.textContent = t.faq.items[1].q;
    if (faqA2) faqA2.textContent = t.faq.items[1].a;
    if (faqQ3) faqQ3.textContent = t.faq.items[2].q;
    if (faqA3) faqA3.textContent = t.faq.items[2].a;

    // Contact ("يلا نتكلم")
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

    // Footer & Easter Egg
    const footerRights = document.getElementById('footer-rights');
    const footerBack = document.getElementById('footer-back-to-top-text');
    if (footerRights) {
      footerRights.innerHTML = `${t.footer.copy} <button id="easter-egg-btn" class="easter-egg-coffee" aria-label="Easter Egg">☕</button>`;
      this.bindEasterEgg();
    }
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
    this.updateCairoClock();
    setInterval(() => {
      this.updateCairoClock();
    }, 15000);
  }

  updateCairoClock() {
    const clockEl = document.getElementById('cairo-clock');
    const vibeEl = document.getElementById('cairo-vibe-phrase');
    if (!clockEl && !vibeEl) return;

    try {
      const locale = this.currentLang === 'en' ? 'en-US' : 'ar-EG';
      const now = new Intl.DateTimeFormat(locale, {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date());
      if (clockEl) clockEl.textContent = now;
    } catch (e) {
      const d = new Date();
      if (clockEl) clockEl.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    }

    if (vibeEl) {
      vibeEl.textContent = getCairoVibe(this.currentLang);
    }
  }

  initEasterEgg() {
    // Console Greeting
    console.log(
      '%c👋 أهلاً بيك في كواليس الموقع!\nأنا عمر يحيى.. لو عجبك الشغل وعايز نعمل حاجة سوا، كلمني على الواتساب: 01221576360',
      'color: #E8552B; font-size: 14px; font-weight: bold; padding: 4px;'
    );
    this.bindEasterEgg();
  }

  bindEasterEgg() {
    const btn = document.getElementById('easter-egg-btn');
    const toast = document.getElementById('easter-egg-toast');
    if (!btn || !toast) return;

    btn.onclick = (e) => {
      e.preventDefault();
      const t = translations[this.currentLang];
      toast.textContent = t.footer.easterEggToast;
      toast.classList.add('is-visible');
      toast.setAttribute('aria-hidden', 'false');

      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.classList.remove('is-visible');
        toast.setAttribute('aria-hidden', 'true');
      }, 3500);
    };
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.__omar_app = new App();
});
