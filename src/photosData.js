/**
 * Photos configuration
 * Curated personal photography of Omar Yahia
 * All photos cropped to 3:4 portrait ratio, max 1200px, WebP + fallback JPG + thumb WebP
 * 
 * photo-1: Beach silhouette at sunset
 * photo-2: B&W seated portrait (Landing photo - wheel stops here at 5.00s)
 * photo-3: Artistic mirror reflection with painted wave
 * photo-4: B&W full length standing leaning against window
 * photo-5: Cafe portrait with smile & glasses
 * photo-6: Night outdoor portrait with crossed arms
 * photo-7: Low-angle night portrait in white linen shirt
 * photo-8: Mirror selfie in white shirt
 */

export const photos = [
  {
    id: 'photo-1',
    src: '/assets/photos/photo-1.webp',
    fallbackSrc: '/assets/photos/photo-1.jpg',
    thumb: '/assets/photos/photo-1-thumb.webp',
    focalPoint: '50% 35%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'فصلان دماغ قدام البحر.. المكان اللي بيفضي الرام 🌊',
    captionEn: 'Clearing my head by the sea.. freeing up some RAM 🌊'
  },
  {
    id: 'photo-2',
    src: '/assets/photos/photo-2.webp',
    fallbackSrc: '/assets/photos/photo-2.jpg',
    thumb: '/assets/photos/photo-2-thumb.webp',
    focalPoint: '48% 28%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'القعدة الرايقة دي وراها 10 باجات اتحلت بعد صراع ☕',
    captionEn: 'This calm look is right after squashing 10 stubborn bugs ☕'
  },
  {
    id: 'photo-3',
    src: '/assets/photos/photo-3.webp',
    fallbackSrc: '/assets/photos/photo-3.jpg',
    thumb: '/assets/photos/photo-3-thumb.webp',
    focalPoint: '50% 45%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'مراية في كافيه وموجة مرسومة.. لقيتها لقطة متتفوتش 🎨',
    captionEn: 'Cafe mirror with a painted wave.. had to capture it 🎨'
  },
  {
    id: 'photo-4',
    src: '/assets/photos/photo-4.webp',
    fallbackSrc: '/assets/photos/photo-4.jpg',
    thumb: '/assets/photos/photo-4-thumb.webp',
    focalPoint: '52% 22%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'وقفة تأمل بعد ما كود الأنيميشن اشتغل من أول مرة 🕶️',
    captionEn: 'That proud feeling when complex animation works on first try 🕶️'
  },
  {
    id: 'photo-5',
    src: '/assets/photos/photo-5.webp',
    fallbackSrc: '/assets/photos/photo-5.jpg',
    thumb: '/assets/photos/photo-5-thumb.webp',
    focalPoint: '48% 32%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'الابتسامة دي بعد ما شربت أول فنجان قهوة ورجعت بني آدم ☕',
    captionEn: 'First coffee of the day kicked in and restored my humanity ☕'
  },
  {
    id: 'photo-6',
    src: '/assets/photos/photo-6.webp',
    fallbackSrc: '/assets/photos/photo-6.jpg',
    thumb: '/assets/photos/photo-6-thumb.webp',
    focalPoint: '50% 28%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'تمشية بالليل وسكون الشوارع.. أحسن وقت بتيجي فيه الأفكار 🌙',
    captionEn: 'Late-night walks where the best creative ideas hit 🌙'
  },
  {
    id: 'photo-7',
    src: '/assets/photos/photo-7.webp',
    fallbackSrc: '/assets/photos/photo-7.jpg',
    thumb: '/assets/photos/photo-7-thumb.webp',
    focalPoint: '50% 38%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'خروجة رايقة تفصلني شوية عن الشاشات والسطور ✌️',
    captionEn: 'A quick real-world detour away from screens and terminal logs ✌️'
  },
  {
    id: 'photo-8',
    src: '/assets/photos/photo-8.webp',
    fallbackSrc: '/assets/photos/photo-8.jpg',
    thumb: '/assets/photos/photo-8-thumb.webp',
    focalPoint: '50% 32%',
    altAr: 'عمر يحيى',
    altEn: 'Omar Yahia',
    captionAr: 'سيلفي سريع وأنا نازل مشوار مهم 📱',
    captionEn: 'Quick snapshot on the go 📱'
  }
];

export const LANDING_PHOTO_INDEX = 1; // 0-indexed: photo-2 is index 1
