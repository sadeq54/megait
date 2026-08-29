import { createContext, useContext, useEffect, useState } from 'react'

/* Lightweight bilingual layer. English is the default and primary
   language; Arabic flips the document to RTL and the type stack to
   Cairo. The choice persists per visitor. */
const DICT = {
  en: {
    nav: { work: 'Work', services: 'Services', process: 'Process', pricing: 'Pricing' },
    cta: 'Start your project',
    seeWork: 'View our work',
    hero: {
      h1a: 'Digital experiences',
      h1b: 'engineered to convert.',
      sub: 'MEGA IT designs and engineers high-performance landing pages for ambitious brands. Cinematic motion, measurable speed, delivered in seven business days.',
    },
    stats: [
      { n: 2, suffix: '×', label: 'international first-place awards' },
      { n: 5, suffix: '+', label: 'products delivered to production' },
      { n: 95, suffix: '+', label: 'Google Lighthouse performance' },
      { n: 48, suffix: 'h', label: 'turnaround on change requests' },
    ],
    services: {
      title: 'What we build',
      cards: [
        { title: 'Launch pages', body: 'One page with one job: convert. Structured around your offer, written to be scanned, built to be felt.' },
        { title: '3D and motion', body: 'WebGL scenes and scroll choreography that earn their frame budget.' },
        { title: 'Web apps', body: 'Dashboards, portals and tools when the page needs a product behind it.' },
        { title: 'Performance and SEO', body: 'Core Web Vitals, schema, open graph. Speed is part of the design.' },
      ],
    },
    work: {
      title: 'Built, shipped, measured',
      sub: 'Live products, not mockups. Every case below opens the real site.',
      cases: [
        { title: 'Kormzi', body: 'Full brand site for a performance affiliate network serving MENA and APAC: 3D hero, pinned case studies, smooth scroll choreography.', facts: ['kormzi.com', 'React + GSAP + Three.js'] },
        { title: 'Gold Prices Arabia', body: 'Bilingual gold-market platform on Next.js: live pricing, i18n routing, SEO engineered for English and Arabic in parallel.', facts: ['goldpricesarabia.com', 'Arabic RTL native'] },
        { title: 'BLK Coffee', body: 'Cinematic scroll-film landing page for a specialty coffee brand: scroll-driven film scrubbing, pinned menu rail, editorial pacing.', facts: ['Live preview', 'React + Lenis'] },
      ],
    },
    process: {
      title: 'Seven days, start to live',
      sub: 'Fixed scope, fixed price, fixed date. The schedule holds because the scope does.',
      day: 'Day',
      steps: [
        { day: '00', title: 'Brief and direction', body: 'One call. Your offer, your buyer, your deadline. We reply with a fixed quote the same day.' },
        { day: '02', title: 'Design approved', body: 'You approve the design direction before a line of animation code is written.' },
        { day: '05', title: 'Build and motion', body: 'Sections land in order of importance. Motion goes in last, where it earns attention.' },
        { day: '07', title: 'Live on your domain', body: 'Deployed, measured, handed over. Source code and commercial rights included.' },
      ],
    },
    pricing: {
      eyebrow: 'Fixed price, stated first',
      title: 'Three ways in',
      tiers: [
        {
          name: 'Launch', price: '$1,200', for: 'A single product or app launch page.',
          items: ['1 page, up to 6 sections', 'Custom scroll motion', 'Responsive + reduced-motion support', '95+ Lighthouse performance', 'Contact form to your inbox', 'SEO and Open Graph set up', 'Deployed to your domain'],
          meta: '7 business days · 2 revision rounds',
        },
        {
          name: 'Signature', price: '$2,450', flag: 'Most popular', for: 'Brands that need to look expensive.',
          items: ['Everything in Launch', '3D hero scene or scroll-scrub sequence', 'Up to 10 sections + one sub-page', 'Page transitions and micro-interactions', 'Bilingual EN + AR with RTL', 'Analytics and conversion events', 'CMS hookup for one content section'],
          meta: '10 business days · 3 revision rounds',
        },
        {
          name: 'Flagship', price: '$4,900+', for: 'Funded startups and end-clients.',
          items: ['Everything in Signature', 'Up to 5 pages or a 3D configurator', 'Custom illustration and motion direction', 'A/B test variant of the hero', 'Performance and accessibility report', '30 days post-launch support'],
          meta: '3 weeks · unlimited revisions in scope',
        },
      ],
      partner: {
        title: 'Growth partner',
        body: 'Unlimited requests, one active at a time. Two to three pages a month, 48-hour turnaround on small changes. Pause or cancel anytime.',
        price: '$2,200', per: '/month',
      },
      terms: '50% up front. You send content by day 2 or the timeline pauses. Extra revision rounds are $150. Full IP transfer on final payment.',
    },
    answers: {
      title: 'Asked before every deal',
      qa: [
        { q: 'Will it be slow?', a: '95+ Lighthouse on launch, or we fix it free. Heavy 3D ships with an automatic fallback for phones without WebGL.' },
        { q: 'Will it look like a template?', a: 'Every build is custom, written from a blank file. Scroll the work above and find the template.' },
        { q: 'What if I do not like it?', a: 'You approve the design direction before any animation is coded. Two revision rounds are inside every price.' },
      ],
    },
    contact: {
      h1: 'Tell us about', h2: 'your launch.',
      sub: 'If we are not the right fit, we will say so in the first five minutes.',
      alt: 'or write to',
    },
    footer: {
      tagline: 'Big tech · bigger possibilities',
      location: 'Amman, Jordan (GMT+3)',
      rights: '© 2026 MEGA IT. All rights reserved.',
    },
    menu: 'Menu', close: 'Close',
  },
  ar: {
    nav: { work: 'أعمالنا', services: 'الخدمات', process: 'آلية العمل', pricing: 'الأسعار' },
    cta: 'ابدأ مشروعك',
    seeWork: 'شاهد أعمالنا',
    hero: {
      h1a: 'تجارب رقمية',
      h1b: 'تحوّل الزوار إلى عملاء.',
      sub: 'ميجا آي تي تصمّم وتبني صفحات هبوط عالية الأداء للعلامات الطموحة: حركة سينمائية، وسرعة قابلة للقياس، وتسليم خلال سبعة أيام عمل.',
    },
    stats: [
      { n: 2, suffix: '×', label: 'جائزة مركز أول دولية' },
      { n: 5, suffix: '+', label: 'منتجات مُسلّمة للإنتاج' },
      { n: 95, suffix: '+', label: 'أداء Google Lighthouse' },
      { n: 48, suffix: 'س', label: 'زمن الاستجابة لطلبات التعديل' },
    ],
    services: {
      title: 'ماذا نبني',
      cards: [
        { title: 'صفحات الإطلاق', body: 'صفحة واحدة بهدف واحد: التحويل. مبنية حول عرضك، ومكتوبة لتُقرأ بسرعة، ومصنوعة لتترك أثراً.' },
        { title: 'ثلاثي الأبعاد والحركة', body: 'مشاهد WebGL وحركة مرتبطة بالتمرير تستحق كل إطار.' },
        { title: 'تطبيقات الويب', body: 'لوحات تحكم وبوابات وأدوات عندما تحتاج الصفحة إلى منتج خلفها.' },
        { title: 'الأداء وتحسين الظهور', body: 'Core Web Vitals والبيانات المنظمة وOpen Graph. السرعة جزء من التصميم.' },
      ],
    },
    work: {
      title: 'بُني، أُطلق، قُيس',
      sub: 'منتجات حيّة وليست نماذج. كل بطاقة أدناه تفتح الموقع الحقيقي.',
      cases: [
        { title: 'Kormzi', body: 'موقع كامل لشبكة تسويق بالأداء تخدم الشرق الأوسط وآسيا: واجهة ثلاثية الأبعاد ودراسات حالة مثبّتة وتمرير سلس.', facts: ['kormzi.com', 'React + GSAP + Three.js'] },
        { title: 'أسعار الذهب أرابيا', body: 'منصة ثنائية اللغة لأسعار الذهب على Next.js: أسعار مباشرة وتوجيه لغوي وSEO مبني للعربية والإنجليزية معاً.', facts: ['goldpricesarabia.com', 'عربي RTL أصيل'] },
        { title: 'BLK Coffee', body: 'صفحة هبوط سينمائية لعلامة قهوة مختصة: فيلم يُقرأ بالتمرير وقائمة مثبّتة وإيقاع تحريري.', facts: ['معاينة حيّة', 'React + Lenis'] },
      ],
    },
    process: {
      title: 'سبعة أيام من البداية إلى الإطلاق',
      sub: 'نطاق ثابت، سعر ثابت، تاريخ ثابت. يصمد الجدول لأن النطاق يصمد.',
      day: 'اليوم',
      steps: [
        { day: '00', title: 'الموجز والاتجاه', body: 'مكالمة واحدة: عرضك، وجمهورك، وموعدك النهائي. نرد بعرض سعر ثابت في اليوم نفسه.' },
        { day: '02', title: 'اعتماد التصميم', body: 'تعتمد اتجاه التصميم قبل كتابة سطر واحد من كود الحركة.' },
        { day: '05', title: 'البناء والحركة', body: 'تصل الأقسام بحسب أهميتها، وتأتي الحركة أخيراً حيث تستحق الانتباه.' },
        { day: '07', title: 'مباشر على نطاقك', body: 'نشر، وقياس، وتسليم كامل مع الكود المصدري وحقوق الاستخدام التجاري.' },
      ],
    },
    pricing: {
      eyebrow: 'سعر ثابت ومعلن من البداية',
      title: 'ثلاث باقات',
      tiers: [
        {
          name: 'Launch', price: '$1,200', for: 'صفحة إطلاق واحدة لمنتج أو تطبيق.',
          items: ['صفحة واحدة حتى 6 أقسام', 'حركة تمرير مخصصة', 'متجاوب + دعم تقليل الحركة', 'أداء Lighthouse ‎95+', 'نموذج تواصل إلى بريدك', 'إعداد SEO وOpen Graph', 'نشر على نطاقك'],
          meta: '7 أيام عمل · جولتا مراجعة',
        },
        {
          name: 'Signature', price: '$2,450', flag: 'الأكثر طلباً', for: 'للعلامات التي تريد مظهراً فاخراً.',
          items: ['كل ما في Launch', 'مشهد ثلاثي الأبعاد أو فيلم يُقرأ بالتمرير', 'حتى 10 أقسام + صفحة فرعية', 'انتقالات صفحات وتفاعلات دقيقة', 'ثنائي اللغة عربي + إنجليزي مع RTL', 'تحليلات وأحداث تحويل', 'ربط CMS لقسم محتوى واحد'],
          meta: '10 أيام عمل · 3 جولات مراجعة',
        },
        {
          name: 'Flagship', price: '$4,900+', for: 'للشركات الممولة والعملاء النهائيين.',
          items: ['كل ما في Signature', 'حتى 5 صفحات أو مُجسّم ثلاثي الأبعاد', 'إخراج فني وحركة مخصصة', 'نسخة A/B للواجهة', 'تقرير أداء وإتاحة', 'دعم 30 يوماً بعد الإطلاق'],
          meta: '3 أسابيع · مراجعات غير محدودة ضمن النطاق',
        },
      ],
      partner: {
        title: 'شريك النمو',
        body: 'طلبات غير محدودة، طلب واحد نشط في كل مرة. صفحتان إلى ثلاث شهرياً، وتنفيذ التعديلات الصغيرة خلال 48 ساعة. أوقف أو ألغِ في أي وقت.',
        price: '$2,200', per: '/شهرياً',
      },
      terms: '50% مقدماً. ترسل المحتوى بحلول اليوم الثاني أو يتوقف الجدول مؤقتاً. جولة المراجعة الإضافية $150. نقل كامل للملكية الفكرية عند الدفعة الأخيرة.',
    },
    answers: {
      title: 'يُسأل قبل كل صفقة',
      qa: [
        { q: 'هل سيكون بطيئاً؟', a: '‎95+ في Lighthouse عند الإطلاق أو نصلحه مجاناً. المشاهد الثقيلة تأتي مع بديل تلقائي للهواتف بلا WebGL.' },
        { q: 'هل سيبدو كقالب جاهز؟', a: 'كل بناء مخصص ويكتب من ملف فارغ. تصفّح الأعمال أعلاه وحاول أن تجد القالب.' },
        { q: 'ماذا لو لم يعجبني؟', a: 'تعتمد اتجاه التصميم قبل كتابة أي كود حركة، وجولتا مراجعة داخل كل سعر.' },
      ],
    },
    contact: {
      h1: 'حدّثنا عن', h2: 'إطلاقك القادم.',
      sub: 'إن لم نكن الخيار المناسب، سنخبرك بذلك في الدقائق الخمس الأولى.',
      alt: 'أو راسلنا على',
    },
    footer: {
      tagline: 'تقنية كبيرة · إمكانات أكبر',
      location: 'عمّان، الأردن (GMT+3)',
      rights: '© 2026 ميجا آي تي. جميع الحقوق محفوظة.',
    },
    menu: 'القائمة', close: 'إغلاق',
  },
}

const I18nContext = createContext({ lang: 'en', t: DICT.en, setLang: () => {} })

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('megait-lang') === 'ar' ? 'ar' : 'en'
    } catch {
      return 'en'
    }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('megait-lang', lang)
    } catch {
      /* private mode */
    }
  }, [lang])
  return (
    <I18nContext.Provider value={{ lang, t: DICT[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
