/**
 * i18n Translations Dictionary
 * All copy written in clean, natural, grounded Egyptian colloquial Arabic and matching modern English.
 * Zero corporate fluff, zero cringe/cheesy lines.
 */

export const translations = {
  ar: {
    meta: {
      title: 'عمر محمد — مصمم ومطور مواقع',
      description: 'الموقع الشخصي لعمر محمد — بصمم وببرمج مواقع سريعة ومريحة في الاستخدام بدون تعقيد.'
    },
    nav: {
      brand: 'عمر محمد',
      about: 'حكايتي',
      photos: 'ورا الكواليس',
      services: 'صنعتي',
      work: 'أعمال 7P',
      contact: 'تواصل معايا',
      skipIntro: 'تخطي',
      langToggle: 'English'
    },
    dock: {
      story: 'حكايتي',
      projects: 'أعمالي',
      craft: 'صنعتي',
      contact: 'تواصل',
      chat: 'واتساب',
      status: 'متاح للتواصل',
      cairo: 'القاهرة'
    },
    intro: {
      headlineLine1Prefix: 'خلّي',
      headlineLine1Suffix: 'عمر يبني',
      headlineLine2Suffix: 'بتاعك',
      rotatingWords: ['موقع', 'متجر', 'براند', 'مشروعك'],
      meetOmarLine1: 'مين',
      meetOmarLine2: 'عمر.'
    },
    hero: {
      badge: 'مصمم ومطور ويب مستقل',
      greeting: 'أنا عمر محمد.',
      oneLinerPrefix: 'بصمم وببرمج مواقع ',
      oneLinerAccent: 'سريعة ومريحة',
      oneLinerSuffix: ' في الاستخدام',
      ctaWork: 'شوف المشاريع',
      ctaContact: 'ابعتلي واتساب',
      cardAlt: 'عمر محمد',
      scrollPrompt: 'انزل تحت وشوف التفاصيل'
    },
    marquee: [
      'واجهات سريعة ونظيفة',
      'حركة ناعمة',
      'THREE.JS & GSAP',
      'تصميم وتطوير',
      'تجارب ويب حديثة',
      'من الفكرة للإطلاق'
    ],
    about: {
      tag: 'حكايتي',
      title: 'ببساطة.. مين عمر وبعمل إيه؟',
      bio1: 'مصمم ومطور واجهات ويب — بحب التفاصيل اللي بتفرق: حركة ناعمة، تصميم رايق، وتجارب سريعة وسلسة من أول لمسة.',
      bio2: 'شغوف بالـ UI/UX وبناء مواقع تجمع بين شياكة وبساطة الشكل وسرعة الأداء على أي شاشة.',
      vibeStatus: 'مصر',
      vibeCity: 'أفكار وتجارب ويب حديثة'
    },
    gallery: {
      tag: 'ورا الكواليس',
      title: 'مش كل حياتي كود وشاشات.. دي لقطات من تفاصيل أيامي',
      subtitle: 'تقدر تقلب بالماوس أو بالسحب بين الصور:'
    },
    services: {
      tag: 'صنعتي',
      title: 'ثلاث حاجات بحط فيهم كل تركيزي',
      subtitle: 'المبادئ والمهارات اللي بحطها في كل موقع وتجربة بشتغل عليها:',
      items: [
        {
          num: '01',
          title: 'ديزاين الواجهات (UI/UX)',
          desc: 'تصميم واجهات مستخدم مريحة وأنيقة على فيجما — تركز على وضوح الفكرة، تناسق الخطوط، وسهولة الاستخدام من غير تعقيد.',
          tags: ['فيجما من الصفر', 'مريح للعين', 'سهل وبسيط']
        },
        {
          num: '02',
          title: 'برمجة وحركة سلسة (Code & Motion)',
          desc: 'برمجة واجهات سريعة جداً وخفيفة، مدعومة بحركة ناعمة 60fps ولمسات 3D خفيفة تدي الموقع روح وشياكة.',
          tags: ['حركة 60fps', 'Three.js 3D', 'كود نظيف']
        },
        {
          num: '03',
          title: 'تجارب ويب تفاعلية',
          desc: 'بناء مواقع وتجارب ويب مبتكرة تجمع بين اللمسة الفنية العصرية والأداء العالي المظبوط على كل الشاشات.',
          tags: ['أفكار مبتكرة', 'مظبوط للموبايل', 'لمسات عصرية']
        }
      ]
    },
    certificates: {
      tag: 'الاعتمادات والشهادات',
      title: 'شهادات معتمدة عالمياً من كبرى شركات التكنولوجيا',
      subtitle: 'دراسة احترافية متعمقة واعتماد رسمي موثق من شركة Meta العالمية وDeepLearning.AI:',
      items: [
        {
          id: 'meta',
          tag: 'Meta • 9 كورسات احترافية',
          title: 'Meta Front-End Developer',
          issuer: 'شركة Meta العالمية عبر Coursera',
          date: 'يناير 2025',
          desc: 'شهادة مهنية متكاملة من شركة Meta تتضمن 9 كورسات عملية مكثفة: إتقان React وAdvanced React، جافاسكريبت المتقدمة، مبادئ تصميم واجهات وتجربة المستخدم UI/UX، وأنظمة التحكم في الإصدارات Git لبناء مواقع وتطبيقات ويب حية وعالية السرعة.',
          skills: ['React', 'Advanced React', 'JavaScript (ES6+)', 'UI/UX Design', 'Git & GitHub', 'HTML5 & CSS3'],
          badge: 'شهادة مهنية معتمدة',
          btnText: 'معاينة الشهادة ↗'
        },
        {
          id: 'ai',
          tag: 'DeepLearning.AI • Andrew Ng',
          title: 'AI For Everyone',
          issuer: 'DeepLearning.AI عبر Coursera',
          date: 'يناير 2026',
          desc: 'شهادة معتمدة بإشراف رائد الذكاء الاصطناعي أندرو نج (Andrew Ng) من DeepLearning.AI؛ تغطي المفاهيم الأساسية لتعلم الآلة (ML) والشبكات العصبية، استراتيجيات بناء وتوظيف منتجات الذكاء الاصطناعي، ودمج تقنيات الـ AI الحديثة في تجارب الويب.',
          skills: ['Machine Learning', 'AI Strategy', 'Generative AI', 'Data Science', 'AI in Web Dev'],
          badge: 'اعتماد رسمي موثق',
          btnText: 'معاينة الشهادة ↗'
        }
      ],
      modalTitle: 'معاينة الشهادة الرسمية',
      modalClose: 'إغلاق'
    },
    work: {
      tag: 'أعمال 7P',
      title: 'مشاريع حقيقية خرجت للنور من الاستوديو مع بشمهندس مصطفى جاد',
      subtitle: 'دي نماذج حية لمشاريع اشتغلت عليها مع عملاء في استوديو 7P.. تقدر تفتح وتتفرج بنفسك:',
      projects: [
        {
          id: 'aya',
          title: 'متجر آية للاكسسوارات',
          tag: 'E-Commerce',
          desc: 'متجر إكسسوارات وباندانات هاندميد، مع فلاتر سريعة وسلة لطلب الأوردر على الواتساب علطول.',
          link: 'https://aya-accessories.vercel.app/',
          btnText: 'شوفه ↗'
        },
        {
          id: 'festival',
          title: 'حلواني فيستيفال فايف ستار',
          tag: 'Pastry & Sweets',
          desc: 'موقع لحلواني تورت وحلويات، بيعرض المنيو والأسعار وفروع المحل والطلب أونلاين.',
          link: 'https://festival-fivestar.vercel.app/',
          btnText: 'شوفه ↗'
        },
        {
          id: 'rawnaq',
          title: 'متجر رَوْنَـق للعطور الفاخرة 3D',
          tag: '3D WebGL Storefront',
          desc: 'متجر وتجربة تفاعلية لبراند عطور فاخرة، فيه زجاجة عطر 3D تفاعلية مع إمكانية التدوير ورشّة عطر، وسلة طلب مباشر عبر واتساب.',
          link: 'https://demo-perfume-sigma.vercel.app/',
          btnText: 'شوفه ↗'
        }
      ],
      studioNote: 'باقي المشاريع وشغل الاستوديو الكامل موجود على 7P Studio ↗'
    },
    game: {
      tag: 'استراحة كود 🎮',
      title: 'افصل شوية مع لعبة التعبان',
      subtitle: 'مبرمجها كود صافي بالـ JavaScript و Canvas. العب بالأسهم على الكيبورد أو بالتاتش لو إنت ع الموبايل وشوف هتوصل لكام نقطة!',
      scoreLabel: 'السكور:',
      bestLabel: 'أعلى سكور:',
      startBtn: 'ابدأ اللعب ▶',
      hint: '💡 على الكيبورد: الأسهم أو W, A, S, D — على الموبايل: المس الأسهم أو اسحب ع الشاشة مباشرة'
    },
    contact: {
      tag: 'خلّينا على تواصل',
      title: 'حابب تسلّم، تشارك فكرة، أو ندردش؟ مرحب بيك دايماً.',
      subtitle: 'مبسوط دايماً بمعرفة ناس جديدة ومشاركة أفكار الويب والتصميم. اختار الوسيلة الأنسب ليك:',
      whatsappLabel: 'واتساب',
      whatsappVal: '01221576360',
      whatsappSub: 'أسرع وسيلة للدردشة والمتابعة',
      emailLabel: 'الإيميل',
      emailVal: 'om058166@gmail.com',
      emailSub: 'للرسائل والأفكار المشتركة',
      instaLabel: 'إنستجرام',
      instaVal: '@omar_thegreatt',
      instaSub: 'للتواصل والمتابعة اليومية',
      copyBtn: 'نسخ',
      copiedBtn: 'تم النسخ!',
      chatBtn: 'دردشة سريعة',
      mailBtn: 'إرسال إيميل',
      profileBtn: 'حساب إنستجرام',
      studioBadge: '7P Studio • طلب المشاريع والبيزنس',
      studioTitle: 'عندك فكرة مشروع تجاري أو موقع لشركتك وحابب تنفذه؟',
      studioDesc: 'لتنفيذ المواقع والمتاجر الكبيرة وهوية البراندات المتكاملة، تقدر تطلب وتتابع مشروعك مباشرة من خلال الاستوديو على 7P Studio:',
      studioBtn: 'طلب مشروعك عبر 7pstudio.tech ↗'
    },
    footer: {
      copy: '© 2026 عمر محمد • تصميم وتطوير عمر محمد',
      backToTop: 'العودة للأعلى ↑'
    }
  },
  en: {
    meta: {
      title: 'Omar Mohamed — Web Designer & Developer',
      description: 'Personal portfolio of Omar Mohamed — Designing and building fast, clean, and intuitive web experiences.'
    },
    nav: {
      brand: 'Omar Mohamed',
      about: 'My Story',
      photos: 'Behind the Screen',
      services: 'My Craft',
      work: '7P Studio',
      contact: "Let's Connect",
      skipIntro: 'Skip',
      langToggle: 'عربي'
    },
    dock: {
      story: 'Story',
      projects: 'Projects',
      craft: 'Craft',
      contact: 'Connect',
      chat: 'Chat',
      status: 'Open to connect',
      cairo: 'Cairo'
    },
    intro: {
      headlineLine1Prefix: 'Let',
      headlineLine1Suffix: 'Omar build',
      headlineLine2Suffix: '',
      rotatingWords: ['website', 'store', 'brand', 'idea'],
      meetOmarLine1: 'Meet',
      meetOmarLine2: 'Omar.'
    },
    hero: {
      badge: 'Freelance Web Designer & Developer',
      greeting: "I'm Omar Mohamed.",
      oneLinerPrefix: 'Designing and building ',
      oneLinerAccent: 'fast and intuitive',
      oneLinerSuffix: ' web experiences',
      ctaWork: 'See Projects',
      ctaContact: 'Chat on WhatsApp',
      cardAlt: 'Omar Mohamed',
      scrollPrompt: 'Scroll down to explore'
    },
    marquee: [
      'FAST & CLEAN UI',
      'FLUID MOTION',
      'THREE.JS & GSAP',
      'DESIGN & CODE',
      'MODERN WEB EXPERIENCES',
      'FROM CONCEPT TO LAUNCH'
    ],
    about: {
      tag: 'My Story',
      title: 'In short.. who I am & what I do',
      bio1: 'UI designer & developer crafting fast, fluid, and memorable web experiences with refined details.',
      bio2: 'Obsessed with clean motion, intuitive layout, and websites that feel effortless on any device.',
      vibeStatus: 'Egypt',
      vibeCity: 'Exploring modern web & fluid motion'
    },
    gallery: {
      tag: 'Behind the Screen',
      title: "Not just code and screens.. here's a glimpse of my days",
      subtitle: 'Navigate through the photos with mouse wheel or swipe:'
    },
    services: {
      tag: 'My Craft',
      title: 'Three things I pour all my energy into',
      subtitle: 'The core principles and capabilities behind every project I build:',
      items: [
        {
          num: '01',
          title: 'Interface Design (UI/UX)',
          desc: 'Custom, thoughtful interfaces designed in Figma — crafted around crisp visual hierarchy, breathing room, and intuitive ergonomics.',
          tags: ['Figma from Scratch', 'Easy on the Eyes', 'Intuitive Flow']
        },
        {
          num: '02',
          title: 'Clean Code & Fluid Motion',
          desc: 'High-performance front-end code with organic 60fps animations, accessible typography, and lightweight 3D accents.',
          tags: ['60fps Fluidity', 'Three.js 3D', 'Clean Code']
        },
        {
          num: '03',
          title: 'Interactive Web Experiences',
          desc: 'Creative web experiments, rotatable 3D showcases, and bespoke digital experiences designed to be memorable.',
          tags: ['Creative Concept', 'Mobile Perfect', 'Modern Polish']
        }
      ]
    },
    certificates: {
      tag: 'Accreditation & Credentials',
      title: 'Certified by Industry Leaders',
      subtitle: 'Verified technical expertise and professional accreditation from Meta and DeepLearning.AI:',
      items: [
        {
          id: 'meta',
          tag: 'Meta • 9-Course Professional Program',
          title: 'Meta Front-End Developer',
          issuer: 'Authorized by Meta via Coursera',
          date: 'January 2025',
          desc: 'Comprehensive 9-course professional specialization certified by Meta, mastering React, Advanced React, modern JavaScript (ES6+), UI/UX design principles, version control with Git, and building high-performance interactive web applications.',
          skills: ['React', 'Advanced React', 'JavaScript (ES6+)', 'UI/UX Design', 'Git & GitHub', 'HTML5 & CSS3'],
          badge: 'Verified Professional Certificate',
          btnText: 'View Certificate ↗'
        },
        {
          id: 'ai',
          tag: 'DeepLearning.AI • Andrew Ng',
          title: 'AI For Everyone',
          issuer: 'DeepLearning.AI via Coursera',
          date: 'January 2026',
          desc: 'Authorized certification from DeepLearning.AI instructed by AI pioneer Andrew Ng. Covers foundational machine learning concepts, AI product strategy, data science workflows, and integrating modern AI into web solutions.',
          skills: ['Machine Learning', 'AI Strategy', 'Generative AI', 'Data Science', 'AI in Web Dev'],
          badge: 'Verified Course Certificate',
          btnText: 'View Certificate ↗'
        }
      ],
      modalTitle: 'Verified Credential Preview',
      modalClose: 'Close'
    },
    work: {
      tag: '7P Studio Work',
      title: 'Real-world projects shipped with Eng. Mostafa Gad at 7P Studio',
      subtitle: 'Live commercial projects built for clients at 7P Studio.. feel free to explore them live:',
      projects: [
        {
          id: 'aya',
          title: 'Aya Accessories Store',
          tag: 'E-Commerce',
          desc: 'Handmade accessories & bandanas store with fast filters and seamless WhatsApp cart ordering.',
          link: 'https://aya-accessories.vercel.app/',
          btnText: 'View ↗'
        },
        {
          id: 'festival',
          title: 'Festival Five Star Pastry',
          tag: 'Pastry & Sweets',
          desc: 'Bakery & cake catalog website featuring menu items, pricing, branch locations, and online orders.',
          link: 'https://festival-fivestar.vercel.app/',
          btnText: 'View ↗'
        },
        {
          id: 'rawnaq',
          title: 'Rawnaq 3D Luxury Perfumes',
          tag: '3D WebGL Storefront',
          desc: 'Interactive 3D fragrance boutique with a rotatable WebGL bottle, mist spray animation, and seamless WhatsApp orders.',
          link: 'https://demo-perfume-sigma.vercel.app/',
          btnText: 'View ↗'
        }
      ],
      studioNote: 'See all commercial projects and studio portfolio on 7P Studio ↗'
    },
    game: {
      tag: 'Code Break 🎮',
      title: 'Take a Break with Classic Snake',
      subtitle: 'Hand-coded with vanilla JavaScript and HTML5 Canvas. Play with keyboard arrows or touch controls on mobile and see your high score!',
      scoreLabel: 'Score:',
      bestLabel: 'High Score:',
      startBtn: 'Start Game ▶',
      hint: '💡 Keyboard: Arrow keys or W, A, S, D — Mobile: Touch D-pad buttons or swipe on canvas'
    },
    contact: {
      tag: "Let's Connect",
      title: "Say hello, share an idea, or just connect.",
      subtitle: "Always happy to chat with creators, developers, and curious minds. Pick whatever channel suits you best:",
      whatsappLabel: 'WhatsApp',
      whatsappVal: '01221576360',
      whatsappSub: 'Quickest for quick chats & hello',
      emailLabel: 'Email',
      emailVal: 'om058166@gmail.com',
      emailSub: 'For thoughts & thoughtful messages',
      instaLabel: 'Instagram',
      instaVal: '@omar_thegreatt',
      instaSub: 'For casual updates & behind the scenes',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      chatBtn: 'Direct Chat',
      mailBtn: 'Send Email',
      profileBtn: 'View Profile',
      studioBadge: '7P Studio • Commercial Projects',
      studioTitle: 'Looking to build a commercial project or business website?',
      studioDesc: 'For client projects, company platforms, online stores, and brand identity, connect with our studio directly at 7P Studio:',
      studioBtn: 'Visit 7pstudio.tech ↗'
    },
    footer: {
      copy: '© 2026 Omar Mohamed • Designed & Built by Omar Mohamed',
      backToTop: 'Back to top ↑'
    }
  }
};

/**
 * Returns dynamic Cairo vibe text based on actual Egypt hour (Africa/Cairo)
 */
export function getCairoVibe(lang = 'en') {
  let cairoHour = 15;
  try {
    const hourStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Cairo',
      hour: 'numeric',
      hour12: false
    }).format(new Date());
    cairoHour = parseInt(hourStr, 10);
  } catch (e) {
    cairoHour = new Date().getHours();
  }

  // 05:00 - 11:59 (Morning)
  if (cairoHour >= 5 && cairoHour < 12) {
    return lang === 'en'
      ? 'Morning, starting the day'
      : 'صباح الخير، ببدأ يومي والشغل';
  }
  // 12:00 - 16:59 (Afternoon)
  if (cairoHour >= 12 && cairoHour < 17) {
    return lang === 'en'
      ? 'Working on active projects'
      : 'شغال على المشاريع الحالية';
  }
  // 17:00 - 22:59 (Evening)
  if (cairoHour >= 17 && cairoHour < 23) {
    return lang === 'en'
      ? 'Designing and coding'
      : 'شغال على التصميم والكود';
  }
  // 23:00 - 04:59 (Late Night)
  return lang === 'en'
    ? 'Working late in the quiet'
    : 'سهران شغال في هدوء';
}
