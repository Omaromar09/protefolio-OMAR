import './styles/main.css';
import './styles/intro.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/game.css';
import './styles/dock.css';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { translations, getCairoVibe } from './i18n.js';
import { IntroController } from './intro.js';
import { HeroWheelController } from './heroWheel.js';
import { ScrollSectionsController } from './scrollSections.js';
import { SnakeGame } from './snakeGame.js';
import { initMagneticButtons } from './magnetic.js';

gsap.registerPlugin(ScrollTrigger);

class App {
  constructor() {
    this.currentLang = this.getSavedLanguage();
    this.lenis = null;
    this.intro = null;
    this.heroWheel = null;
    this.scrollSections = null;
    this.snakeGame = null;

    this.init();
  }

  getSavedLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'en' || urlLang === 'ar') return urlLang;

      const pref = localStorage.getItem('omar_portfolio_lang_pref');
      if (pref === 'en' || pref === 'ar') return pref;
    } catch (e) {}
    return 'en'; // English is the primary / default language
  }

  saveLanguage(lang) {
    try {
      localStorage.setItem('omar_portfolio_lang_pref', lang);
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

    // 6. Initialize Mini Snake Game ("لعبة التعبان")
    this.snakeGame = new SnakeGame();

    // 7. Initialize Magnetic Hover Buttons
    initMagneticButtons();

    // 7. Live Cairo Clock Ticker & Vibe
    this.initCairoClock();

    // 8. Initialize Floating Liquid Glass Bottom Dock
    this.initFloatingDock();

    // 9. Initialize Certificates Lightbox Modal
    this.initCertificatesModal();

    // 10. Navigation & Language Events
    this.bindGlobalEvents();

    // 11. Test / URL parameters (?t=2.5, ?skip=1)
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
              if (timeVal >= 8.75) {
                const landingCard = document.getElementById('intro-landing-card');
                if (landingCard) landingCard.classList.add('has-orange-border');
              }
              if (timeVal >= 10.0) {
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

    // Meta tags
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t.meta.description;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = t.meta.title;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = t.meta.description;
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = t.meta.title;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = t.meta.description;

    // Skip Button
    const skipBtn = document.getElementById('intro-skip-btn');
    if (skipBtn) skipBtn.setAttribute('aria-label', isEn ? 'Skip intro' : 'تخطي المقدمة');
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

    const drawerLinks = document.querySelectorAll('.mobile-drawer-link');
    drawerLinks.forEach((link) => {
      const key = link.getAttribute('data-nav');
      if (key && t.nav[key]) {
        link.textContent = t.nav[key];
      }
    });

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const mobileLangBtn = document.getElementById('mobile-lang-btn');
    if (langToggleBtn) {
      langToggleBtn.textContent = t.nav.langToggle;
      langToggleBtn.setAttribute('aria-label', isEn ? 'Switch to Arabic' : 'تبديل إلى الإنجليزية');
    }
    if (mobileLangBtn) {
      mobileLangBtn.textContent = t.nav.langToggle;
    }

    // Hero
    const heroBadge = document.getElementById('hero-badge-text');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitlePre = document.getElementById('hero-subtitle-prefix');
    const heroSubtitleAcc = document.getElementById('hero-subtitle-accent');
    const heroSubtitleSuf = document.getElementById('hero-subtitle-suffix');
    const heroCtaWorkText = document.getElementById('hero-cta-work-text');
    const heroCtaContactText = document.getElementById('hero-cta-contact-text');
    const wheelHintText = document.getElementById('wheel-hint-text');

    if (heroBadge) heroBadge.textContent = t.hero.badge;
    if (heroTitle) heroTitle.textContent = t.hero.greeting;
    if (heroSubtitlePre) heroSubtitlePre.textContent = t.hero.oneLinerPrefix;
    if (heroSubtitleAcc) heroSubtitleAcc.textContent = t.hero.oneLinerAccent;
    if (heroSubtitleSuf) heroSubtitleSuf.textContent = t.hero.oneLinerSuffix;
    if (heroCtaWorkText) heroCtaWorkText.textContent = t.hero.ctaWork;
    if (heroCtaContactText) heroCtaContactText.textContent = t.hero.ctaContact;
    if (wheelHintText) wheelHintText.textContent = isEn ? 'Navigate with mouse wheel, drag, or arrow keys' : 'تقدر تقلب بالماوس أو بالسحب أو بالأسهم';

    const wheelPrev = document.getElementById('wheel-btn-prev');
    const wheelNext = document.getElementById('wheel-btn-next');
    if (wheelPrev) wheelPrev.setAttribute('aria-label', isEn ? 'Previous photo' : 'الصورة السابقة');
    if (wheelNext) wheelNext.setAttribute('aria-label', isEn ? 'Next photo' : 'الصورة التالية');

    // Marquee Ribbon
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack && t.marquee) {
      const marqueeList = [...t.marquee, ...t.marquee];
      marqueeTrack.innerHTML = marqueeList.map(item => `<span>✦ ${item}</span>`).join('');
    }

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

    const galPrev = document.getElementById('gallery-prev-btn');
    const galNext = document.getElementById('gallery-next-btn');
    if (galPrev) galPrev.setAttribute('aria-label', isEn ? 'Previous' : 'السابق');
    if (galNext) galNext.setAttribute('aria-label', isEn ? 'Next' : 'التالي');

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

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, idx) => {
      const item = t.services.items[idx];
      if (item && item.tags) {
        const tagsWrap = card.querySelector('.service-tags');
        if (tagsWrap) {
          tagsWrap.innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
        }
      }
    });

    // Certificates & Accreditations (Meta & DeepLearning.AI)
    if (t.certificates) {
      const certKicker = document.getElementById('cert-kicker');
      const certTitle = document.getElementById('cert-title');
      const certSubtitle = document.getElementById('cert-subtitle');
      if (certKicker) certKicker.textContent = t.certificates.tag;
      if (certTitle) certTitle.textContent = t.certificates.title;
      if (certSubtitle) certSubtitle.textContent = t.certificates.subtitle;

      // Meta
      const metaItem = t.certificates.items[0];
      const certTagMeta = document.getElementById('cert-tag-meta');
      const certBadgeMeta = document.getElementById('cert-badge-meta');
      const certTitleMeta = document.getElementById('cert-title-meta');
      const certIssuerMeta = document.getElementById('cert-issuer-meta');
      const certDateMeta = document.getElementById('cert-date-meta');
      const certDescMeta = document.getElementById('cert-desc-meta');
      const certBtnMeta = document.getElementById('cert-btn-meta');
      const certZoomMeta = document.getElementById('cert-zoom-meta');

      if (certTagMeta) certTagMeta.textContent = metaItem.tag;
      if (certBadgeMeta) certBadgeMeta.textContent = metaItem.badge;
      if (certTitleMeta) certTitleMeta.textContent = metaItem.title;
      if (certIssuerMeta) certIssuerMeta.textContent = metaItem.issuer;
      if (certDateMeta) certDateMeta.textContent = metaItem.date;
      if (certDescMeta) certDescMeta.textContent = metaItem.desc;
      if (certBtnMeta) certBtnMeta.textContent = metaItem.btnText;
      if (certZoomMeta) certZoomMeta.textContent = metaItem.btnText;

      // DeepLearning.AI
      const aiItem = t.certificates.items[1];
      const certTagAi = document.getElementById('cert-tag-ai');
      const certBadgeAi = document.getElementById('cert-badge-ai');
      const certTitleAi = document.getElementById('cert-title-ai');
      const certIssuerAi = document.getElementById('cert-issuer-ai');
      const certDateAi = document.getElementById('cert-date-ai');
      const certDescAi = document.getElementById('cert-desc-ai');
      const certBtnAi = document.getElementById('cert-btn-ai');
      const certZoomAi = document.getElementById('cert-zoom-ai');

      if (certTagAi) certTagAi.textContent = aiItem.tag;
      if (certBadgeAi) certBadgeAi.textContent = aiItem.badge;
      if (certTitleAi) certTitleAi.textContent = aiItem.title;
      if (certIssuerAi) certIssuerAi.textContent = aiItem.issuer;
      if (certDateAi) certDateAi.textContent = aiItem.date;
      if (certDescAi) certDescAi.textContent = aiItem.desc;
      if (certBtnAi) certBtnAi.textContent = aiItem.btnText;
      if (certZoomAi) certZoomAi.textContent = aiItem.btnText;
    }

    // Work / 7P Studio
    const workKicker = document.getElementById('work-kicker');
    const workTitle = document.getElementById('work-title');
    const workSubtitle = document.getElementById('work-subtitle');
    const workStudioNote = document.getElementById('work-studio-note');
    if (workKicker) workKicker.textContent = t.work.tag;
    if (workTitle) workTitle.textContent = t.work.title;
    if (workSubtitle) workSubtitle.textContent = t.work.subtitle;
    if (workStudioNote) workStudioNote.textContent = t.work.studioNote;

    const p1Tag = document.getElementById('p1-tag');
    const p1Title = document.getElementById('p1-title');
    const p1Desc = document.getElementById('p1-desc');
    const p1Btn = document.getElementById('p1-btn-text');
    const p1Link = document.getElementById('p1-btn');
    if (p1Tag) p1Tag.textContent = t.work.projects[0].tag;
    if (p1Title) p1Title.textContent = t.work.projects[0].title;
    if (p1Desc) p1Desc.textContent = t.work.projects[0].desc;
    if (p1Btn) p1Btn.textContent = t.work.projects[0].btnText;
    if (p1Link) p1Link.href = t.work.projects[0].link;

    const p2Tag = document.getElementById('p2-tag');
    const p2Title = document.getElementById('p2-title');
    const p2Desc = document.getElementById('p2-desc');
    const p2Btn = document.getElementById('p2-btn-text');
    const p2Link = document.getElementById('p2-btn');
    if (p2Tag) p2Tag.textContent = t.work.projects[1].tag;
    if (p2Title) p2Title.textContent = t.work.projects[1].title;
    if (p2Desc) p2Desc.textContent = t.work.projects[1].desc;
    if (p2Btn) p2Btn.textContent = t.work.projects[1].btnText;
    if (p2Link) p2Link.href = t.work.projects[1].link;

    const p3Tag = document.getElementById('p3-tag');
    const p3Title = document.getElementById('p3-title');
    const p3Desc = document.getElementById('p3-desc');
    const p3Btn = document.getElementById('p3-btn-text');
    const p3Link = document.getElementById('p3-btn');
    if (p3Tag) p3Tag.textContent = t.work.projects[2].tag;
    if (p3Title) p3Title.textContent = t.work.projects[2].title;
    if (p3Desc) p3Desc.textContent = t.work.projects[2].desc;
    if (p3Btn) p3Btn.textContent = t.work.projects[2].btnText;
    if (p3Link) p3Link.href = t.work.projects[2].link;

    // Mini-game ("لعبة التعبان")
    const gameKicker = document.getElementById('game-kicker');
    const gameTitle = document.getElementById('game-title');
    const gameSubtitle = document.getElementById('game-subtitle');
    const gameScoreLabel = document.getElementById('game-score-label');
    const gameBestLabel = document.getElementById('game-best-label');
    const gameHint = document.getElementById('game-controls-hint');

    if (gameKicker) gameKicker.textContent = t.game.tag;
    if (gameTitle) gameTitle.textContent = t.game.title;
    if (gameSubtitle) gameSubtitle.textContent = t.game.subtitle;
    if (gameScoreLabel) gameScoreLabel.textContent = t.game.scoreLabel;
    if (gameBestLabel) gameBestLabel.textContent = t.game.bestLabel;
    if (gameHint) gameHint.textContent = t.game.hint;

    if (this.snakeGame) {
      this.snakeGame.updateControlsUI();
    }

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

    const contactCards = document.querySelectorAll('.contact-card');
    if (contactCards[0]) {
      const btn = contactCards[0].querySelector('.contact-action-link span');
      if (btn) btn.textContent = t.contact.chatBtn;
    }
    if (contactCards[1]) {
      const btn = contactCards[1].querySelector('.contact-action-link span');
      if (btn) btn.textContent = t.contact.mailBtn;
    }
    if (contactCards[2]) {
      const btn = contactCards[2].querySelector('.contact-action-link span');
      if (btn) btn.textContent = t.contact.profileBtn;
    }

    const copyBtns = document.querySelectorAll('.btn-copy');
    copyBtns.forEach(btn => {
      if (!btn.classList.contains('copied')) {
        btn.textContent = t.contact.copyBtn;
      }
    });

    // 7P Studio Commercial Card
    const studioBadge = document.getElementById('studio-card-badge');
    const studioTitle = document.getElementById('studio-card-title');
    const studioDesc = document.getElementById('studio-card-desc');
    const studioBtn = document.getElementById('studio-card-btn-text');
    if (studioBadge && t.contact.studioBadge) studioBadge.textContent = t.contact.studioBadge;
    if (studioTitle && t.contact.studioTitle) studioTitle.textContent = t.contact.studioTitle;
    if (studioDesc && t.contact.studioDesc) studioDesc.textContent = t.contact.studioDesc;
    if (studioBtn && t.contact.studioBtn) studioBtn.textContent = t.contact.studioBtn;

    // Footer
    const footerRights = document.getElementById('footer-rights');
    const footerBack = document.getElementById('footer-back-to-top-text');
    if (footerRights) footerRights.textContent = t.footer.copy;
    if (footerBack) footerBack.textContent = t.footer.backToTop;

    // Floating Liquid Glass Bottom Dock
    if (t.dock) {
      const dockStatus = document.getElementById('dock-status-text');
      const dockLblStory = document.getElementById('dock-lbl-story');
      const dockLblProjects = document.getElementById('dock-lbl-projects');
      const dockLblCraft = document.getElementById('dock-lbl-craft');
      const dockLblContact = document.getElementById('dock-lbl-contact');
      const dockAction = document.getElementById('dock-action-btn');

      if (dockStatus) dockStatus.textContent = t.dock.status;
      if (dockLblStory) dockLblStory.textContent = t.dock.story;
      if (dockLblProjects) dockLblProjects.textContent = t.dock.projects;
      if (dockLblCraft) dockLblCraft.textContent = t.dock.craft;
      if (dockLblContact) dockLblContact.textContent = t.dock.contact;
      if (dockAction) {
        dockAction.setAttribute('data-tooltip', t.dock.chat);
        dockAction.setAttribute('aria-label', `${t.dock.chat} on WhatsApp`);
      }
      this.updateDockTime();
    }

    // Re-render gallery if initialized
    if (this.scrollSections) {
      this.scrollSections.initGalleryStack();
    }

    if (refreshScroll) {
      ScrollTrigger.refresh();
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.saveLanguage(nextLang);
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

    // Mobile Navigation Drawer Toggle & Close
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        mobileDrawer.classList.toggle('is-open');
        const isOpen = mobileDrawer.classList.contains('is-open');
        mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        document.body.classList.toggle('drawer-open', isOpen);
      });

      if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeMobileDrawer();
        });
      }

      // Close when clicking directly on the backdrop
      mobileDrawer.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) {
          this.closeMobileDrawer();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
          this.closeMobileDrawer();
        }
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
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
    }
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

  initFloatingDock() {
    const dock = document.getElementById('floating-dock');
    if (!dock) return;

    // Smooth scroll on dock link click
    const dockLinks = dock.querySelectorAll('.dock-item');
    dockLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            if (this.lenis) {
              this.lenis.scrollTo(target, { offset: -30 });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    });

    // Scroll Spy for Dock items
    const sections = [
      { id: 'about', el: document.getElementById('about'), dock: document.getElementById('dock-item-about') },
      { id: 'work', el: document.getElementById('work'), dock: document.getElementById('dock-item-work') },
      { id: 'services', el: document.getElementById('services'), dock: document.getElementById('dock-item-services') },
      { id: 'contact', el: document.getElementById('contact'), dock: document.getElementById('dock-item-contact') }
    ];

    const updateActiveDock = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      let activeSec = null;
      for (const s of sections) {
        if (s.el) {
          const top = s.el.offsetTop;
          const height = s.el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            activeSec = s;
          }
        }
      }

      sections.forEach((s) => {
        if (s.dock) {
          s.dock.classList.toggle('is-active', activeSec && activeSec.id === s.id);
        }
      });
    };

    // On mobile screens, hide dock when viewing hero top so wheel controls are unobstructed
    const handleDockVisibility = () => {
      const isMobile = window.innerWidth <= 680;
      if (isMobile && window.scrollY < 120) {
        dock.classList.add('is-hidden');
      } else {
        dock.classList.remove('is-hidden');
      }
    };

    window.addEventListener('scroll', () => {
      updateActiveDock();
      handleDockVisibility();
    }, { passive: true });
    window.addEventListener('resize', handleDockVisibility, { passive: true });
    updateActiveDock();
    handleDockVisibility();

    // Live clock in top status pill
    this.updateDockTime();
    setInterval(() => {
      this.updateDockTime();
    }, 15000);
  }

  updateDockTime() {
    const timeEl = document.getElementById('dock-time-text');
    if (!timeEl) return;

    try {
      const isEn = this.currentLang === 'en';
      const locale = isEn ? 'en-US' : 'ar-EG';
      const cairoLabel = isEn ? 'Cairo' : 'القاهرة';
      const timeStr = new Intl.DateTimeFormat(locale, {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date());

      timeEl.textContent = `${cairoLabel} ${timeStr}`;
    } catch (e) {
      const d = new Date();
      timeEl.textContent = `Cairo ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }

  initCertificatesModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const modalImg = document.getElementById('cert-modal-img');
    const modalHeading = document.getElementById('cert-modal-heading');
    const modalSub = document.getElementById('cert-modal-sub');
    const closeBtn = document.getElementById('cert-modal-close');
    const backdrop = document.getElementById('cert-modal-backdrop');

    const certData = {
      meta: {
        src: '/assets/certificates/cert-meta-frontend.webp',
        titleEn: 'Meta Front-End Developer — Professional Certificate',
        titleAr: 'مطور واجهات أمامية معتمد من Meta — شهادة مهنية احترافية (9 دورات)',
        issuerEn: 'Issued by Meta via Coursera • Verified Credential (Jan 4, 2025)',
        issuerAr: 'معتمدة وموثقة من شركة Meta العالمية عبر كورسيرا (4 يناير 2025)'
      },
      ai: {
        src: '/assets/certificates/cert-ai-for-everyone.webp',
        titleEn: 'AI For Everyone — DeepLearning.AI',
        titleAr: 'الذكاء الاصطناعي للجميع — DeepLearning.AI (أندرو نج)',
        issuerEn: 'Authorized by DeepLearning.AI & Andrew Ng via Coursera (Jan 28, 2026)',
        issuerAr: 'معتمدة من DeepLearning.AI بإشراف أندرو نج عبر كورسيرا (28 يناير 2026)'
      }
    };

    const openModal = (certKey) => {
      const data = certData[certKey];
      if (!data) return;

      const isEn = this.currentLang === 'en';
      if (modalImg) modalImg.src = data.src;
      if (modalHeading) modalHeading.textContent = isEn ? data.titleEn : data.titleAr;
      if (modalSub) modalSub.textContent = isEn ? data.issuerEn : data.issuerAr;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const triggers = document.querySelectorAll('[data-cert-view]');
    triggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const certKey = btn.getAttribute('data-cert-view');
        openModal(certKey);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const certKey = btn.getAttribute('data-cert-view');
          openModal(certKey);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.__omar_app = new App();
});
