// Sample catalog data (beginner-friendly and editable)
function deriveMerchandising(products) {
  return products.map((product, index) => {
    const discountPercent = 18 + ((index * 7) % 23);
    const ratingValue = 3.8 + (((index * 13) % 12) / 10);
    const rating = Math.min(4.9, Number(ratingValue.toFixed(1)));
    const originalPrice = product.price > 0
      ? Math.round(product.price / (1 - discountPercent / 100))
      : 0;

    return {
      ...product,
      discountPercent,
      originalPrice,
      rating
    };
  });
}

window.VED_VIGYAN_DATA = {
  store: {
    name: "Ved Vigyan",
    phone: "+91 7900811101",
    email: "Vedvigyanindia@gmail.com",
    address: "India"
  },
  categories: [
    { id: "all", label: "All" },
    { id: "rudraksha", label: "Rudraksha" },
    { id: "rudraksha-mala", label: "Rudraksha Mala" },
    { id: "mala", label: "Mala" },
    { id: "bracelet", label: "Bracelet" },
    { id: "gem-stone", label: "Gem Stone" },
    { id: "astrology", label: "Astrology" },
    { id: "puja-items", label: "Puja Items" }
  ],
  products: deriveMerchandising([
    {
      id: "p_rud_5m",
      category: "rudraksha",
      slug: "5-mukhi",
      name: "5 Mukhi Rudraksha (Panchmukhi)",
      price: 599,
      tags: ["beginner", "calm", "focus", "daily-wear", "jaap"],
      image: "/public/images/products/rudraksha-5-mukhi.png",
      imageAlt: "Authentic 5 Mukhi Rudraksha bead",
      short: "Everyday spiritual support for peace, balance & clarity.",
      description:
        "This 5 Mukhi Rudraksha is a popular choice for daily wear. Traditionally associated with calmness and inner balance, it is worn by students, working professionals and seekers.",
      bullets: [
        "Benefits: peace of mind, focus, emotional balance",
        "Usage: wear as a pendant or mala (after energizing/cleaning)",
        "Authenticity: natural bead pattern; source verified"
      ],
      seoTitle: "5 Mukhi Rudraksha - Buy Original Panchmukhi Online | Ved Vigyan",
      seoDescription:
        "Buy original 5 Mukhi Rudraksha (Panchmukhi) online. Trusted spiritual products with authenticity guidance and fast delivery.",
      url: "/rudraksha/5-mukhi.html"
    },
    {
      id: "p_rud_7m",
      category: "rudraksha",
      slug: "7-mukhi",
      name: "7 Mukhi Rudraksha",
      price: 1299,
      tags: ["prosperity", "confidence", "ritual", "gifting"],
      image: "/public/images/products/rudraksha-7-mukhi.png",
      imageAlt: "Original 7 Mukhi Rudraksha bead",
      short: "Traditionally linked with prosperity and stability.",
      description:
        "7 Mukhi Rudraksha is traditionally worn for stability, abundance mindset and disciplined growth. A meaningful gift for new beginnings.",
      bullets: [
        "Benefits: stability, confidence, disciplined effort",
        "Usage: wear as pendant; keep away from harsh chemicals",
        "Authenticity: examine mukhi lines; prefer lab testing if needed"
      ],
      seoTitle: "7 Mukhi Rudraksha - Buy Original Online | Ved Vigyan",
      seoDescription:
        "Shop authentic 7 Mukhi Rudraksha online. Learn benefits, usage and authenticity basics before buying.",
      url: "/rudraksha/7-mukhi.html"
    },
    {
      id: "p_rud_1m",
      category: "rudraksha",
      slug: "1-mukhi",
      name: "1 Mukhi Rudraksha",
      price: 5100,
      tags: ["clarity", "ritual", "focus", "special"],
      image: "/public/images/products/rudraksha-1-mukhi.png",
      imageAlt: "1 Mukhi Rudraksha bead",
      short: "A rare-looking bead often chosen for focused spiritual practice.",
      description:
        "1 Mukhi Rudraksha is traditionally associated with deep focus, discipline and inward spiritual practice. It is usually chosen by seekers looking for a special-purpose bead.",
      bullets: [
        "Traditional focus: concentration, clarity and disciplined sadhana",
        "Usage: best worn with guidance or kept respectfully in puja space",
        "Authenticity: prefer trusted sourcing and multi-angle inspection"
      ],
      seoTitle: "1 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Explore 1 Mukhi Rudraksha with beginner-friendly authenticity guidance and product details from Ved Vigyan.",
      url: "/rudraksha/product.html?slug=1-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_2m",
      category: "rudraksha",
      slug: "2-mukhi",
      name: "2 Mukhi Rudraksha",
      price: 1399,
      tags: ["relationship", "balance", "beginner", "daily-wear"],
      image: "/public/images/products/rudraksha-2-mukhi.png",
      imageAlt: "2 Mukhi Rudraksha bead",
      short: "Traditionally linked with harmony, balance and emotional steadiness.",
      description:
        "2 Mukhi Rudraksha is commonly chosen for balance in relationships and emotional grounding. It is a gentle option for people building a simple daily practice.",
      bullets: [
        "Traditional focus: harmony, emotional steadiness and balance",
        "Usage: suitable for regular wear after basic cleaning and energizing",
        "Authenticity: look for natural mukhi lines and a healthy bead surface"
      ],
      seoTitle: "2 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Shop 2 Mukhi Rudraksha online with simple guidance on traditional use and authenticity.",
      url: "/rudraksha/product.html?slug=2-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_3m",
      category: "rudraksha",
      slug: "3-mukhi",
      name: "3 Mukhi Rudraksha",
      price: 1499,
      tags: ["confidence", "energy", "daily-wear", "beginner"],
      image: "/public/images/products/rudraksha-3-mukhi.png",
      imageAlt: "3 Mukhi Rudraksha bead",
      short: "Traditionally worn for confidence, fresh energy and a reset mindset.",
      description:
        "3 Mukhi Rudraksha is often selected by people who want renewed confidence and a lighter emotional approach in daily life.",
      bullets: [
        "Traditional focus: confidence, fresh energy and positive momentum",
        "Usage: can be worn as a pendant or kept in personal altar space",
        "Authenticity: choose clear product photos and even mukhi structure"
      ],
      seoTitle: "3 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Discover 3 Mukhi Rudraksha with traditional-use guidance and easy buying details.",
      url: "/rudraksha/product.html?slug=3-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_4m",
      category: "rudraksha",
      slug: "4-mukhi",
      name: "4 Mukhi Rudraksha",
      price: 1599,
      tags: ["clarity", "focus", "students", "daily-wear"],
      image: "/public/images/products/rudraksha-4-mukhi.png",
      imageAlt: "4 Mukhi Rudraksha bead",
      short: "A popular pick for clarity, study focus and thoughtful communication.",
      description:
        "4 Mukhi Rudraksha is traditionally connected with intellect, learning and clear expression, making it a common choice for students and professionals.",
      bullets: [
        "Traditional focus: study support, memory and expression",
        "Usage: helpful for students, teachers and knowledge workers",
        "Authenticity: inspect natural grooves and overall bead symmetry"
      ],
      seoTitle: "4 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Buy 4 Mukhi Rudraksha online with beginner-friendly clarity on use and authenticity.",
      url: "/rudraksha/product.html?slug=4-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_6m",
      category: "rudraksha",
      slug: "6-mukhi",
      name: "6 Mukhi Rudraksha",
      price: 999,
      tags: ["confidence", "comfort", "daily-wear", "grounding"],
      image: "/public/images/products/rudraksha-6-mukhi.png",
      imageAlt: "6 Mukhi Rudraksha bead",
      short: "A balanced everyday bead traditionally linked with confidence and discipline.",
      description:
        "6 Mukhi Rudraksha is often worn for steady confidence and practical discipline. It suits people who prefer a simple, wearable bead for everyday use.",
      bullets: [
        "Traditional focus: discipline, confidence and grounded action",
        "Usage: comfortable for daily wear in pendant or bracelet form",
        "Authenticity: natural lines should appear consistent and uncarved"
      ],
      seoTitle: "6 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Explore 6 Mukhi Rudraksha online with simple authenticity and usage guidance.",
      url: "/rudraksha/product.html?slug=6-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_8m",
      category: "rudraksha",
      slug: "8-mukhi",
      name: "8 Mukhi Rudraksha",
      price: 1799,
      tags: ["success", "confidence", "ritual", "focus"],
      image: "/public/images/products/rudraksha-8-mukhi.png",
      imageAlt: "8 Mukhi Rudraksha bead",
      short: "Traditionally chosen for confidence, smoother progress and focus.",
      description:
        "8 Mukhi Rudraksha is often selected by people who want focused effort and fewer internal distractions in their daily routine.",
      bullets: [
        "Traditional focus: confidence, smoother progress and focus",
        "Usage: suitable for regular wear or special prayer routines",
        "Authenticity: verify clear mukhi definition and natural texture"
      ],
      seoTitle: "8 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Shop 8 Mukhi Rudraksha online with trusted product guidance from Ved Vigyan.",
      url: "/rudraksha/product.html?slug=8-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_9m",
      category: "rudraksha",
      slug: "9-mukhi",
      name: "9 Mukhi Rudraksha",
      price: 1999,
      tags: ["strength", "confidence", "protection", "ritual"],
      image: "/public/images/products/rudraksha-9-mukhi.png",
      imageAlt: "9 Mukhi Rudraksha bead",
      short: "A strong spiritual bead traditionally linked with courage and strength.",
      description:
        "9 Mukhi Rudraksha is traditionally associated with courage, inner strength and a steady spiritual mindset during demanding phases.",
      bullets: [
        "Traditional focus: courage, strength and mental steadiness",
        "Usage: often chosen for special personal practice and prayer",
        "Authenticity: prefer strong natural texture and reliable sourcing"
      ],
      seoTitle: "9 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Discover 9 Mukhi Rudraksha online with practical buying and authenticity guidance.",
      url: "/rudraksha/product.html?slug=9-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_10m",
      category: "rudraksha",
      slug: "10-mukhi",
      name: "10 Mukhi Rudraksha",
      price: 2299,
      tags: ["protection", "focus", "ritual", "special"],
      image: "/public/images/products/rudraksha-10-mukhi.png",
      imageAlt: "10 Mukhi Rudraksha bead",
      short: "Traditionally worn for protection, stability and spiritual confidence.",
      description:
        "10 Mukhi Rudraksha is often chosen by people seeking a bead for stability and a more protected, centered daily routine.",
      bullets: [
        "Traditional focus: protection, stability and confident presence",
        "Usage: ideal for pendant wear or personal altar placement",
        "Authenticity: inspect natural faces carefully and avoid over-polished pieces"
      ],
      seoTitle: "10 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Buy 10 Mukhi Rudraksha online with authenticity basics and everyday guidance.",
      url: "/rudraksha/product.html?slug=10-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_11m",
      category: "rudraksha",
      slug: "11-mukhi",
      name: "11 Mukhi Rudraksha",
      price: 2599,
      tags: ["confidence", "discipline", "ritual", "special"],
      image: "/public/images/products/rudraksha-11-mukhi.png",
      imageAlt: "11 Mukhi Rudraksha bead",
      short: "A strong bead traditionally linked with discipline, courage and spiritual energy.",
      description:
        "11 Mukhi Rudraksha is often chosen by seekers who want a bead associated with courage, discipline and committed spiritual practice.",
      bullets: [
        "Traditional focus: courage, discipline and energized practice",
        "Usage: suited for intentional daily sadhana and ritual use",
        "Authenticity: choose detailed images with clear natural mukhi formation"
      ],
      seoTitle: "11 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Explore 11 Mukhi Rudraksha with product details and authenticity guidance.",
      url: "/rudraksha/product.html?slug=11-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_12m",
      category: "rudraksha",
      slug: "12-mukhi",
      name: "12 Mukhi Rudraksha",
      price: 2899,
      tags: ["leadership", "confidence", "clarity", "special"],
      image: "/public/images/products/rudraksha-12-mukhi.png",
      imageAlt: "12 Mukhi Rudraksha bead",
      short: "Traditionally linked with leadership, vitality and confident self-expression.",
      description:
        "12 Mukhi Rudraksha is commonly selected by those who resonate with leadership, personal radiance and clear decision-making.",
      bullets: [
        "Traditional focus: leadership, vitality and confident action",
        "Usage: often worn as a pendant for regular personal practice",
        "Authenticity: prefer visible natural lines and balanced bead structure"
      ],
      seoTitle: "12 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Shop 12 Mukhi Rudraksha online with beginner-friendly product guidance.",
      url: "/rudraksha/product.html?slug=12-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_13m",
      category: "rudraksha",
      slug: "13-mukhi",
      name: "13 Mukhi Rudraksha",
      price: 3299,
      tags: ["confidence", "attraction", "special", "ritual"],
      image: "/public/images/products/rudraksha-13-mukhi.png",
      imageAlt: "13 Mukhi Rudraksha bead",
      short: "A special-purpose bead traditionally linked with confidence and magnetic presence.",
      description:
        "13 Mukhi Rudraksha is often chosen by people seeking a spiritually meaningful bead associated with confidence, attraction and inner steadiness.",
      bullets: [
        "Traditional focus: confidence, attraction and poised presence",
        "Usage: suited for occasional ritual wear or respected storage",
        "Authenticity: look for strong natural texture and clear mukhi lines"
      ],
      seoTitle: "13 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Discover 13 Mukhi Rudraksha online with authenticity and usage basics.",
      url: "/rudraksha/product.html?slug=13-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_14m",
      category: "rudraksha",
      slug: "14-mukhi",
      name: "14 Mukhi Rudraksha",
      price: 3799,
      tags: ["clarity", "intuition", "special", "ritual"],
      image: "/public/images/products/rudraksha-14-mukhi.png",
      imageAlt: "14 Mukhi Rudraksha bead",
      short: "Traditionally respected for deep clarity, intuition and strong spiritual focus.",
      description:
        "14 Mukhi Rudraksha is often viewed as a special bead for serious seekers who value clarity, intuition and strong personal discipline.",
      bullets: [
        "Traditional focus: intuition, clarity and steady decision-making",
        "Usage: best handled with respect as a special-practice bead",
        "Authenticity: use trusted sources and close-up inspection before buying"
      ],
      seoTitle: "14 Mukhi Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Explore 14 Mukhi Rudraksha with product details and authenticity guidance.",
      url: "/rudraksha/product.html?slug=14-mukhi&category=rudraksha"
    },
    {
      id: "p_rud_ganesha",
      category: "rudraksha",
      slug: "ganesha-rudraksha",
      name: "Ganesha Rudraksha",
      price: 2699,
      tags: ["success", "protection", "special", "ritual"],
      image: "/public/images/products/rudraksha-ganesha.png",
      imageAlt: "Ganesha Rudraksha bead",
      short: "A distinctive bead traditionally chosen for auspicious beginnings and support.",
      description:
        "Ganesha Rudraksha is recognized by its trunk-like natural formation and is traditionally associated with auspicious starts, confidence and obstacle-clearing energy.",
      bullets: [
        "Traditional focus: auspicious beginnings, support and confidence",
        "Usage: ideal for personal altar, pendant wear or gifting",
        "Authenticity: natural formation should look organic, not carved"
      ],
      seoTitle: "Ganesha Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Buy Ganesha Rudraksha online with helpful guidance on natural formation and authenticity.",
      url: "/rudraksha/product.html?slug=ganesha-rudraksha&category=rudraksha"
    },
    {
      id: "p_rud_gauri",
      category: "rudraksha",
      slug: "gauri-shankar-rudraksha",
      name: "Gauri Shankar Rudraksha",
      price: 3199,
      tags: ["relationship", "balance", "special", "ritual"],
      image: "/public/images/products/rudraksha-gauri-shankar.png",
      imageAlt: "Gauri Shankar Rudraksha bead",
      short: "A naturally joined bead traditionally linked with harmony and togetherness.",
      description:
        "Gauri Shankar Rudraksha is a naturally joined formation often chosen for harmony, togetherness and a balanced home or relationship-focused spiritual practice.",
      bullets: [
        "Traditional focus: harmony, unity and balanced relationships",
        "Usage: often kept in puja space or worn with guidance",
        "Authenticity: natural joining should look organic and unforced"
      ],
      seoTitle: "Gauri Shankar Rudraksha Online | Ved Vigyan",
      seoDescription:
        "Explore Gauri Shankar Rudraksha online with practical authenticity guidance.",
      url: "/rudraksha/product.html?slug=gauri-shankar-rudraksha&category=rudraksha"
    },
    {
      id: "p_rud_mala_5m_108",
      category: "rudraksha-mala",
      slug: "5-mukhi-mala-108",
      name: "5 Mukhi Rudraksha Mala (108 Beads)",
      price: 1999,
      tags: ["jaap", "focus", "ritual", "serious-practice"],
      image: "/public/images/products/rudraksha-mala-5m.svg",
      imageAlt: "5 Mukhi Rudraksha mala with 108 beads",
      short: "A complete mala for daily jaap and spiritual routine.",
      description:
        "This 5 Mukhi Rudraksha mala (108 beads) is ideal for mantra jaap and daily practice. It is designed to be comfortable and practical for regular use.",
      bullets: [
        "Benefits: supports consistent jaap and focus",
        "Usage: use during mantra practice; store respectfully",
        "Authenticity: natural bead patterns; clear photos recommended"
      ],
      seoTitle: "5 Mukhi Rudraksha Mala 108 Beads - Buy Online | Ved Vigyan",
      seoDescription:
        "Buy 5 Mukhi Rudraksha mala (108 beads) online. Ideal for daily jaap with beginner-friendly guidance.",
      url: "/rudraksha-mala/5-mukhi-mala-108.html"
    },
    {
      id: "p_mala_tulsi",
      category: "mala",
      slug: "tulsi-mala",
      name: "Tulsi Japa Mala (108 Beads)",
      price: 399,
      tags: ["beginner", "jaap", "devotion", "lightweight"],
      image: "/public/images/products/mala-tulsi.svg",
      imageAlt: "Tulsi japa mala with 108 beads",
      short: "Lightweight mala for daily mantra jaap and devotion.",
      description:
        "Tulsi mala is widely used for mantra jaap and bhakti practices. It is lightweight and comfortable for daily wear.",
      bullets: [
        "Benefits: supports a focused japa routine",
        "Usage: keep clean and dry; store respectfully",
        "Authenticity: made from genuine tulsi wood beads"
      ],
      seoTitle: "Tulsi Mala 108 Beads - Buy Online | Ved Vigyan",
      seoDescription:
        "Buy Tulsi japa mala (108 beads) online for daily mantra practice. Beginner-friendly spiritual essentials from Ved Vigyan.",
      url: "/mala/tulsi-mala.html"
    },
    {
      id: "p_br_rudraksha",
      category: "bracelet",
      slug: "rudraksha-bracelet",
      name: "Rudraksha Bracelet (Adjustable)",
      price: 499,
      tags: ["daily-wear", "beginner", "gifting", "comfort"],
      image: "/public/images/products/bracelet-rudraksha.svg",
      imageAlt: "Rudraksha bracelet beads on adjustable thread",
      short: "Simple daily-wear bracelet with a minimal spiritual look.",
      description:
        "A lightweight Rudraksha bracelet for daily wear. Designed to be comfortable and easy to pair with everyday outfits.",
      bullets: [
        "Usage: wear daily; avoid harsh chemicals and water exposure",
        "Comfort: adjustable thread for easy fit",
        "Note: natural beads can vary slightly in texture"
      ],
      seoTitle: "Rudraksha Bracelet - Buy Adjustable Bracelet Online | Ved Vigyan",
      seoDescription:
        "Shop Rudraksha bracelet online. Adjustable daily-wear bracelet with simple authenticity guidance from Ved Vigyan.",
      url: "/bracelet/rudraksha-bracelet.html"
    },
    {
      id: "p_gem_amethyst",
      category: "gem-stone",
      slug: "amethyst-bracelet",
      name: "Amethyst Bracelet (Natural Crystal)",
      price: 799,
      tags: ["calm", "clarity", "daily-wear", "gifting"],
      image: "/public/images/products/gem-amethyst.svg",
      imageAlt: "Amethyst crystal bracelet beads",
      short: "Traditionally used for calmness, clarity and focus.",
      description:
        "Amethyst is a popular crystal in wellness traditions. This bracelet is designed for daily wear with a simple, minimal look.",
      bullets: [
        "Traditional benefits: calmness, clarity, balanced mood",
        "Usage: wear daily; avoid harsh chemicals and water exposure",
        "Quality note: natural stones can vary in shade and texture"
      ],
      seoTitle: "Amethyst Bracelet - Natural Crystal Bracelet Online | Ved Vigyan",
      seoDescription:
        "Buy amethyst bracelet online. A natural crystal bracelet traditionally used for calmness and clarity. Shop Ved Vigyan.",
      url: "/gem-stone/amethyst-bracelet.html"
    },
    {
      id: "p_gem_tiger",
      category: "gem-stone",
      slug: "tiger-eye-bracelet",
      name: "Tiger Eye Bracelet (Natural Crystal)",
      price: 699,
      tags: ["confidence", "grounding", "daily-wear", "gifting"],
      image: "/public/images/products/gem-tiger-eye.svg",
      imageAlt: "Tiger eye crystal bracelet beads",
      short: "Traditionally linked with confidence and grounding.",
      description:
        "Tiger Eye is a well-known stone in crystal traditions. This bracelet is a simple daily-wear option for people who prefer a grounded style.",
      bullets: [
        "Traditional benefits: confidence, grounding, steady mindset",
        "Usage: wear daily; store separately to avoid scratches",
        "Quality note: natural banding patterns vary by stone"
      ],
      seoTitle: "Tiger Eye Bracelet - Natural Crystal Bracelet Online | Ved Vigyan",
      seoDescription:
        "Shop Tiger Eye bracelet online. Natural crystal bracelet traditionally linked with confidence and grounding.",
      url: "/gem-stone/tiger-eye-bracelet.html"
    },
    {
      id: "p_astrology_kundli",
      category: "astrology",
      slug: "kundli-report",
      name: "Personalized Kundli Report (PDF)",
      price: 0,
      tags: ["guidance", "beginner", "prosperity", "clarity"],
      image: "/public/images/products/astrology-kundli.svg",
      imageAlt: "Astrology kundli report illustration",
      short: "Free lead service: share details to receive guidance (demo).",
      description:
        "Get a personalized Kundli report and basic guidance (demo). This is designed as a lead-generation service page for SEO.",
      bullets: [
        "Includes: basic insights + suggested remedies (demo content)",
        "Delivery: WhatsApp/email (placeholder)",
        "Note: This is for informational purposes"
      ],
      seoTitle: "Kundli Report Online - Personalized Astrology Guidance | Ved Vigyan",
      seoDescription:
        "Request a personalized Kundli report online. Share details to receive beginner-friendly astrology guidance from Ved Vigyan.",
      url: "/astrology/kundli-report.html"
    },
    {
      id: "p_puja_gangajal",
      category: "puja-items",
      slug: "gangajal",
      name: "Gangajal (Puja Water) - 250ml",
      price: 149,
      tags: ["ritual", "puja", "home-temple", "beginner"],
      image: "/public/images/products/puja-gangajal.svg",
      imageAlt: "Gangajal puja water bottle",
      short: "Essential for home puja, sankalp and rituals.",
      description:
        "Gangajal is commonly used in home puja and traditional rituals. Store in a clean place and use with devotion.",
      bullets: [
        "Usage: sprinkle during puja; mix small amounts as per tradition",
        "Storage: keep sealed, away from heat and direct sunlight",
        "Quality: sealed packaging for cleanliness"
      ],
      seoTitle: "Gangajal for Puja - Buy Online | Ved Vigyan",
      seoDescription:
        "Shop Gangajal for puja online. Clean packaging and quick delivery for your spiritual needs.",
      url: "/puja-items/gangajal.html"
    }
  ]),
  blogPosts: [
    {
      slug: "benefits-of-wearing-rudraksha",
      title: "Benefits of Wearing Rudraksha",
      date: "2026-04-03",
      seoTitle: "Benefits of Wearing Rudraksha | Ved Vigyan Blog",
      seoDescription:
        "Explore traditional benefits of wearing Rudraksha, how people use it daily, and beginner-friendly tips for choosing the right bead.",
      excerpt:
        "Rudraksha has been used in spiritual traditions for centuries. Here are beginner-friendly ways people traditionally approach its benefits and daily usage.",
      content: [
        "Rudraksha is traditionally associated with calmness, discipline and a steady spiritual routine.",
        "Many people wear it as a pendant or mala during mantra practice, meditation or daily life.",
        "When buying, focus on authenticity, comfort for daily wear, and a simple routine you can follow consistently."
      ]
    },
    {
      slug: "how-to-identify-original-rudraksha",
      title: "How to Identify Original Rudraksha",
      date: "2026-04-03",
      seoTitle: "How to Identify Original Rudraksha | Ved Vigyan Blog",
      seoDescription:
        "Learn beginner-friendly tips to identify original Rudraksha: natural mukhi lines, bead structure, and when to consider lab testing.",
      excerpt:
        "Authenticity matters. Here are simple checks people use to understand whether a Rudraksha is likely natural and genuine.",
      content: [
        "Look for natural mukhi (face) lines that appear continuous and not artificially carved.",
        "Prefer sellers who share clear photos from multiple angles and offer basic guidance.",
        "For higher-value beads, consider reputable lab testing and documentation."
      ]
    }
  ]
};
