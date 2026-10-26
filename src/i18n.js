/**
 * i18n Translations Dictionary
 * All copy written in clean, natural, grounded Egyptian colloquial Arabic and matching modern English.
 * Zero corporate fluff, zero cringe/cheesy lines.
 */

export const translations = {
  ar: {
    meta: {
      title: 'عمر يحيى — مصمم ومطور مواقع',
      description: 'الموقع الشخصي لعمر يحيى — بصمم وببرمج مواقع سريعة ومريحة في الاستخدام بدون تعقيد.'
    },
    nav: {
      brand: 'عمر يحيى',
      about: 'حكايتي',
      photos: 'ورا الكواليس',
      services: 'صنعتي',
      work: 'أعمال 7P',
      contact: 'يلا نتكلم',
      skipIntro: 'تخطي',
      langToggle: 'English'
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
      greeting: 'أنا عمر يحيى.',
      oneLinerPrefix: 'بصمم وببرمج مواقع ',
      oneLinerAccent: 'سريعة ومريحة',
      oneLinerSuffix: ' في الاستخدام',
      ctaWork: 'شوف المشاريع',
      ctaContact: 'ابعتلي واتساب',
      cardAlt: 'عمر يحيى',
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
      title: 'ليه بحب الويب وبدأت إزاي؟',
      bio1: 'أنا عمر، مصمم ومطور ويب من مصر. بدايتي مع الويب كانت من كتر ما كنت بشوف مواقع تقيلة وكلامها مش مظبوط على الموبايل. اتعلمت المجال عشان أعمل مواقع شكلها نضيف، سريعة، وسهلة في الاستخدام من غير تعقيد.',
      bio2: 'بهتم بالتفاصيل اللي بتفرق في تجربة اللي بيفتح الموقع: حركة ناعمة، خطوط واضحة، وسرعة في التحميل بحيث يشتغل مظبوط وسلس على أي شاشة.',
      vibeStatus: 'متاح حالياً لمشاريع جديدة',
      vibeCity: 'مصر'
    },
    gallery: {
      tag: 'ورا الكواليس',
      title: 'مش كل حياتي كود وشاشات.. دي لقطات من تفاصيل أيامي',
      subtitle: 'تقدر تقلب بالماوس أو بالسحب بين الصور:'
    },
    services: {
      tag: 'صنعتي',
      title: 'ثلاث حاجات بحط فيهم كل تركيزي',
      subtitle: 'بلسان بسيط ومن غير كلام معقد.. ده اللي هتاخده وإزاي هيفرق معاك:',
      items: [
        {
          num: '01',
          title: 'ديزاين الواجهات (UI/UX)',
          desc: 'إيه اللي هتاخده: ديزاين مريح وشيك على فيجما متفصل على فكرتك ومش شبه حد.\nإزاي ده هيفرق معاك: اللي هيدخل موقعك هيفهم كل حاجة في ثواني ويوصل للي عايزه من غير ما يتوه.',
          tags: ['فيجما من الصفر', 'مريح للعين', 'سهل وبسيط']
        },
        {
          num: '02',
          title: 'برمجة وحركة سلسة (Code & Motion)',
          desc: 'إيه اللي هتاخده: كود نظيف وسريع، مع أنيميشن ناعم ولمسات 3D خفيفة على الموبايل واللابتوب.\nإزاي ده هيفرق معاك: موقعك مش هيكون مجرد كلام وصور، هيكون مرتب وشيك ويعلّم مع الزائر.',
          tags: ['حركة 60fps', 'Three.js 3D', 'كود نظيف']
        },
        {
          num: '03',
          title: 'تظبيط وترقية المواقع القائمة',
          desc: 'إيه اللي هتاخده: بنمسك موقعك القديم ننضف كوده، نسرع تحميله، ونعدل شكله لستايل عصري.\nإزاي ده هيفرق معاك: بدل ما الزائر يقفل الموقع من بطئه، هيفتح بسرعة ويشتغل مظبوط على أي شاشة.',
          tags: ['سرعة عالية', 'تظبيط الموبايل', 'شياكة عصرية']
        }
      ]
    },
    work: {
      tag: 'أعمال 7P',
      title: 'مشاريع حقيقية خرجت للنور من الاستوديو',
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
          id: 'elmo7taref',
          title: 'مطعم المحترف',
          tag: 'Food & Grill',
          desc: 'موقع لمطعم وجبات ومشويات، فيه فلاتر سريعة للأكل ومعاينة للساندوتشات وحساب الفاتورة للواتساب.',
          link: 'https://elmo7taref.vercel.app/',
          btnText: 'شوفه ↗'
        }
      ],
      studioNote: 'باقي المشاريع وشغل الاستوديو الكامل موجود على 7P Studio ↗'
    },
    process: {
      tag: 'الخطوات',
      title: 'إزاي بنشتغل سوا؟',
      subtitle: 'من غير تعقيد، الموضوع بيمشي في 4 خطوات واضحة ومباشرة:',
      steps: [
        {
          num: '01',
          title: 'نتكلم ونفهم',
          desc: 'بنتكلم نفهم فكرتك إيه ومين جمهورك والشكل اللي بتدور عليه.'
        },
        {
          num: '02',
          title: 'أصمم الواجهة',
          desc: 'بعمل ديزاين كامل على فيجما بتشوفه وتعدل عليه لحد ما تكون راضي عنه.'
        },
        {
          num: '03',
          title: 'أبرمج وأحرك',
          desc: 'بحول الديزاين لكود حقيقي سريع ومرن مع حركة خفيفة ومظبوطة على الموبايل والكمبيوتر.'
        },
        {
          num: '04',
          title: 'نطلق الموقع',
          desc: 'بنرفع الموقع لايف على الدومين ونتأكد إنه شغال تمام وسريع بدون مشاكل.'
        }
      ]
    },
    faq: {
      tag: 'سؤال وجواب',
      title: 'أسئلة بتيجي في البال علطول',
      subtitle: 'إجابات سريعة ومباشرة على أكتر تساؤلات بتتسأل:',
      items: [
        {
          q: 'المشروع بياخد وقت قد إيه؟',
          a: 'على حسب حجم الشغل، المواقع البسيطة عادة من أسبوع لأسبوعين، والمشاريع الأكبر من 3 لـ 4 أسابيع، وبنحدد ميعاد واضح من البداية.'
        },
        {
          q: 'بتشتغل مع مين؟',
          a: 'مع أصحاب المشاريع والشركات الناشئة، المتاجر والمطاعم، أو أي حد محتاج موقع شخصي أو بورتفوليو نظيف.'
        },
        {
          q: 'لو عندي موقع قديم ومحتاج يتجدد؟',
          a: 'بنشوف المشاكل الموجودة ونعيد تصميمه وبرمجته من الصفر بحيث يكون سريع وعصري على كل الأجهزة.'
        }
      ]
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
      tag: 'يلا نتكلم',
      title: 'عندك فكرة أو مشروع؟ تعالى ندردش.',
      subtitle: 'الواتساب أسرع وسيلة للرد، والإيميل ممتاز لو معاك تفاصيل أو ملفات حابب تبعتها.',
      whatsappLabel: 'واتساب',
      whatsappVal: '01221576360',
      whatsappSub: 'أسرع رد ومتاح أغلب الوقت',
      emailLabel: 'الإيميل',
      emailVal: 'om058166@gmail.com',
      emailSub: 'للتفاصيل والملفات',
      instaLabel: 'إنستجرام',
      instaVal: '@omar_thegreatt',
      instaSub: 'للتواصل والمتابعة',
      copyBtn: 'نسخ',
      copiedBtn: 'تم النسخ!',
      chatBtn: 'محادثة فورية',
      mailBtn: 'إرسال إيميل',
      profileBtn: 'فتح البروفايل'
    },
    footer: {
      copy: '© 2026 عمر يحيى • تصميم وتطوير عمر يحيى',
      backToTop: 'العودة للأعلى ↑'
    }
  },
  en: {
    meta: {
      title: 'Omar Yahia — Web Designer & Developer',
      description: 'Personal portfolio of Omar Yahia — Designing and building fast, clean, and intuitive web experiences.'
    },
    nav: {
      brand: 'Omar Yahia',
      about: 'My Story',
      photos: 'Behind the Screen',
      services: 'My Craft',
      work: '7P Studio',
      contact: "Let's Talk",
      skipIntro: 'Skip',
      langToggle: 'عربي'
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
      greeting: "I'm Omar Yahia.",
      oneLinerPrefix: 'Designing and building ',
      oneLinerAccent: 'fast and intuitive',
      oneLinerSuffix: ' web experiences',
      ctaWork: 'See Projects',
      ctaContact: 'Chat on WhatsApp',
      cardAlt: 'Omar Yahia',
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
      title: 'How I got started in web design',
      bio1: "I'm Omar, a web designer and developer from Egypt. I got into web design because I was tired of clunky, slow sites that look broken on mobile. I build clean, fast, and easy-to-use websites without unnecessary complexity.",
      bio2: "I care about the details that actually matter: smooth motion, crisp typography, and instant loading times so your site works seamlessly on any device.",
      vibeStatus: 'Available for new projects',
      vibeCity: 'Egypt'
    },
    gallery: {
      tag: 'Behind the Screen',
      title: "Not just code and screens.. here's a glimpse of my days",
      subtitle: 'Navigate through the photos with mouse wheel or swipe:'
    },
    services: {
      tag: 'My Craft',
      title: 'Three things I pour all my energy into',
      subtitle: 'Plain English, no buzzwords: what you get and how it moves the needle:',
      items: [
        {
          num: '01',
          title: 'Interface Design (UI/UX)',
          desc: 'What you get: Clean, custom Figma designs tailored specifically to your idea.\nHow it helps you: Visitors understand your offering within seconds and navigate without friction.',
          tags: ['Figma from Scratch', 'Easy on the Eyes', 'Intuitive Flow']
        },
        {
          num: '02',
          title: 'Clean Code & Fluid Motion',
          desc: 'What you get: Fast, semantic code with smooth 60fps motion and lightweight 3D accents.\nHow it helps you: Your website feels alive, responsive, and memorable to everyone who visits.',
          tags: ['60fps Fluidity', 'Three.js 3D', 'Clean Code']
        },
        {
          num: '03',
          title: 'Revamping Outdated Websites',
          desc: 'What you get: We take your slow legacy site, clean up the codebase, accelerate loading, and modernize the visual style.\nHow it helps you: Instead of bouncing from slow loads, customers stay and engage.',
          tags: ['High Speed', 'Mobile Perfect', 'Modern Refresh']
        }
      ]
    },
    work: {
      tag: '7P Studio Work',
      title: 'Real-world projects shipped from the studio',
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
          id: 'elmo7taref',
          title: 'Elmo7taref Restaurant',
          tag: 'Food & Grill',
          desc: 'Grill & meal restaurant platform with quick food categories, sandwich previews, and WhatsApp billing.',
          link: 'https://elmo7taref.vercel.app/',
          btnText: 'View ↗'
        }
      ],
      studioNote: 'See all commercial projects and studio portfolio on 7P Studio ↗'
    },
    process: {
      tag: 'How We Work',
      title: 'How do we build together?',
      subtitle: 'No corporate runaround. Just 4 straightforward, collaborative steps:',
      steps: [
        {
          num: '01',
          title: 'Chat & Align',
          desc: 'We sit down, discuss your vision, who your audience is, and what you are looking for.'
        },
        {
          num: '02',
          title: 'Figma Design',
          desc: 'I draft a complete design in Figma for you to review and tweak until you are happy with it.'
        },
        {
          num: '03',
          title: 'Code & Animate',
          desc: 'I turn the design into performant, responsive code with subtle motion that runs smooth on mobile and desktop.'
        },
        {
          num: '04',
          title: 'Launch & Verify',
          desc: 'We push the site live to your domain and ensure everything runs fast without issues.'
        }
      ]
    },
    faq: {
      tag: 'Quick FAQ',
      title: 'Common questions asked upfront',
      subtitle: 'Quick and honest answers to the things people ask most:',
      items: [
        {
          q: 'How long does a website take?',
          a: 'Depends on scope, standard landing pages usually take 1 to 2 weeks, while larger stores or custom projects take 3 to 4 weeks. We agree on a clear delivery date from day one.'
        },
        {
          q: 'Who do you work with?',
          a: 'Founders, startups, local businesses, fashion brands, restaurants, or anyone looking for a clean, standout portfolio.'
        },
        {
          q: 'What if I already have an old site?',
          a: 'We pinpoint the issues and rebuild it cleanly from the ground up so it runs fast and modern across all devices.'
        }
      ]
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
      tag: "Let's Talk",
      title: 'Have a project idea in mind? Let’s talk.',
      subtitle: 'WhatsApp is quickest for an instant reply, and email is great if you have files or a project brief.',
      whatsappLabel: 'WhatsApp',
      whatsappVal: '01221576360',
      whatsappSub: 'Quickest response throughout the day',
      emailLabel: 'Email',
      emailVal: 'om058166@gmail.com',
      emailSub: 'For briefs and asset files',
      instaLabel: 'Instagram',
      instaVal: '@omar_thegreatt',
      instaSub: 'For updates and casual chats',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      chatBtn: 'Direct Chat',
      mailBtn: 'Send Email',
      profileBtn: 'View Profile'
    },
    footer: {
      copy: '© 2026 Omar Yahia • Designed & Built by Omar Yahia',
      backToTop: 'Back to top ↑'
    }
  }
};

/**
 * Returns dynamic Cairo vibe text based on actual Egypt hour (Africa/Cairo)
 */
export function getCairoVibe(lang = 'ar') {
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
