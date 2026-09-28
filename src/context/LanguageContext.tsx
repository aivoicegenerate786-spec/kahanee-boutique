import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ar" | "hi";

export interface Translations {
  announcement: string;
  brandName: string;
  brandTagline: string;
  nav: {
    shop: string;
    sarees: string;
    frocks: string;
    occasion: string;
    kids: string;
    visit: string;
    bag: string;
  };
  hero: {
    boutiqueLocation: string;
    headlinePart1: string;
    headlinePart2: string;
    description: string;
    shopBtn: string;
    whatsAppLabel: string;
    onTheRackThisWeek: string;
    fabrics: string;
  };
  shop: {
    sectionTag: string;
    weeklyTag: string;
    heading: string;
    all: string;
    sarees: string;
    frocks: string;
    occasion: string;
    kids: string;
    freeSize: string;
    newBadge: string;
    addToBag: string;
    viewProduct: string;
  };
  collection: {
    tag: string;
    heading: string;
    fittingTitle: string;
    fittingDesc: string;
    fittingCaption: string;
    bookFitting: string;
    stitchingTag: string;
    stitchingTitle: string;
    stitchingDesc: string;
    stitchingBtn: string;
    stitchingCaption: string;
  };
  quickView: {
    sizeLabel: string;
    addToBag: string;
    askWhatsApp: string;
    storePickupNote: string;
    close: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    browseBtn: string;
    sizePrefix: string;
    remove: string;
    subtotal: string;
    whatsappNote: string;
    whatsappBtn: string;
    keepBrowsing: string;
  };
  footer: {
    desc: string;
    shopTitle: string;
    visitTitle: string;
    talkTitle: string;
    orderNote: string;
    rights: string;
    disclaimer: string;
    createdBy: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    announcement: "New saree collection in store · Salmiya, Block 10 · WhatsApp 6100 9697",
    brandName: "Kahanee",
    brandTagline: "Sarees, stitched frocks and custom stitching. Salmiya, Kuwait.",
    nav: {
      shop: "Shop",
      sarees: "Sarees",
      frocks: "Frocks",
      occasion: "Occasion",
      kids: "Kids",
      visit: "Visit",
      bag: "Bag",
    },
    hero: {
      boutiqueLocation: "Kahanee Boutique · Salmiya, Block 10 — Kuwait",
      headlinePart1: "Sarees & stitched frocks,",
      headlinePart2: "made to be worn.",
      description:
        "A boutique in Salmiya for authentic Indian luxury. Pure georgette, raw silk, crepe and linen; expert custom stitching and tailoring in-house. Browse the rack, book a fitting, or WhatsApp us.",
      shopBtn: "Shop the rack",
      whatsAppLabel: "6100 9697",
      onTheRackThisWeek: "On the rack this week",
      fabrics: "Georgette · Crepe · Linen · Silk",
    },
    shop: {
      sectionTag: "01 — Shop",
      weeklyTag: "New drops most weeks",
      heading: "This week on the rack",
      all: "Everything",
      sarees: "Sarees",
      frocks: "Frocks",
      occasion: "Occasion",
      kids: "Kids",
      freeSize: "Free size",
      newBadge: "New",
      addToBag: "Add to bag",
      viewProduct: "View product",
    },
    collection: {
      tag: "02 — The boutique",
      heading: "Come try before you decide.",
      fittingTitle: "The fitting room",
      fittingDesc:
        "Sarees drape differently on every body — the counter is best in person. Come through, drape a few, and take photos of the rest for the next visit.",
      fittingCaption: "At the counter, Salmiya, Block 10, Kuwait City",
      bookFitting: "Book a fitting — 6100 9697",
      stitchingTag: "In the back of the shop",
      stitchingTitle: "Custom stitching",
      stitchingDesc:
        "Bring your own fabric or pick from the counter. Made-to-measure frocks, designer blouses and alterations are part of the shop — WhatsApp us a photo and we'll quote you back.",
      stitchingBtn: "Ask about stitching",
      stitchingCaption: "Frocks and alterations, stitched in shop",
    },
    quickView: {
      sizeLabel: "Size",
      addToBag: "Add to bag",
      askWhatsApp: "Ask about this piece on WhatsApp",
      storePickupNote:
        "Picked up in store — Block 10, Salmiya, Kuwait City. Delivery options confirmed on WhatsApp before packing.",
      close: "Close",
    },
    cart: {
      title: "Your bag",
      emptyTitle: "Your bag is empty.",
      emptyDesc: "The rack is waiting — fresh pieces most weeks.",
      browseBtn: "Browse the rack",
      sizePrefix: "Size",
      remove: "Remove",
      subtotal: "Subtotal",
      whatsappNote:
        "Delivery and payment are arranged on WhatsApp — nothing is charged on this page.",
      whatsappBtn: "Send order on WhatsApp",
      keepBrowsing: "Keep browsing",
    },
    footer: {
      desc: "Sarees, stitched frocks and custom stitching. A boutique in Salmiya, Block 10, Kuwait.",
      shopTitle: "Shop",
      visitTitle: "Visit",
      talkTitle: "Talk to us",
      orderNote:
        "Order over WhatsApp or DM — we confirm sizes, delivery and payment with you first.",
      rights: "Kahanee Boutique — Salmiya, Kuwait",
      disclaimer: "Prices in KWD",
      createdBy: "Created by MT Growth Labs",
    },
  },
  ar: {
    announcement: "تشكيلة ساري جديدة متوفرة في المحل · السالمية، قطعة ١٠ · واتساب ٦١٠٠ ٩٦٩٧",
    brandName: "كاهاني",
    brandTagline: "ساري، فساتين مخيطة وخياطة وتفصيل راقٍ. السالمية، الكويت.",
    nav: {
      shop: "التسوق",
      sarees: "ساري",
      frocks: "فساتين",
      occasion: "مناسبات",
      kids: "أطفال",
      visit: "زيارة المحل",
      bag: "الحقيبة",
    },
    hero: {
      boutiqueLocation: "بوتيك كاهاني · السالمية، قطعة ١٠ — الكويت",
      headlinePart1: "ساري وفساتين مخيطة،",
      headlinePart2: "صُنعت لتُلبس بكل فخامة.",
      description:
        "بوتيك هندي فاخر في السالمية. جورجيت، كريب وحرير على الرف؛ وخياطة وتفصيل خاص في مشغلنا. تصفحي التشكيلة، احجزي موعد قياس، أو تواصلي معنا عبر واتساب.",
      shopBtn: "تسوق التشكيلة",
      whatsAppLabel: "٦١٠٠ ٩٦٩٧",
      onTheRackThisWeek: "المتوفر هذا الأسبوع",
      fabrics: "جورجيت · كريب · كتان · حرير",
    },
    shop: {
      sectionTag: "٠١ — المتجر",
      weeklyTag: "قطع حصرية جديدة أسبوعياً",
      heading: "تشكيلة هذا الأسبوع الفاخرة",
      all: "الكل",
      sarees: "ساري",
      frocks: "فساتين",
      occasion: "مناسبات",
      kids: "أطفال",
      freeSize: "مقاس موحد",
      newBadge: "جديد",
      addToBag: "أضف للحقيبة",
      viewProduct: "معاينة المنتج",
    },
    collection: {
      tag: "٠٢ — البوتيك",
      heading: "تفضلي بالتجربة والقياس قبل الشراء.",
      fittingTitle: "غرفة القياس والتجربة",
      fittingDesc:
        "الساري يبدو مختلفاً على كل قوام — التجربة في المحل هي الخيار الأفضل. تفضلي بزيارتنا وقياس القطع واختيار ما يناسب إطلالتك.",
      fittingCaption: "في المحل، السالمية، قطعة ١٠، مدينة الكويت",
      bookFitting: "حجز موعد قياس — ٦١٠٠ ٩٦٩٧",
      stitchingTag: "في مشغل البوتيك",
      stitchingTitle: "خياطة وتفصيل خاص",
      stitchingDesc:
        "أحضري قماشك الخاص أو اختاري من أقمشتنا الراقية. خياطة الفساتين والبلوزات حسب مقاساتك بدقة — أرسلي لنا الصورة عبر واتساب وسنوافيك بالسعر فوراً.",
      stitchingBtn: "استفسر عن التفصيل",
      stitchingCaption: "فساتين وتعديلات مخيطة داخل المحل",
    },
    quickView: {
      sizeLabel: "المقاس",
      addToBag: "أضف للحقيبة",
      askWhatsApp: "استفسر عن هذه القطعة عبر واتساب",
      storePickupNote:
        "الاستلام من المحل — قطعة ١٠، السالمية، الكويت. يتم تأكيد خيارات التوصيل عبر واتساب قبل تجهيز طلبك.",
      close: "إغلاق",
    },
    cart: {
      title: "حقيبة التسوق",
      emptyTitle: "حقيبتك فارغة حالياً.",
      emptyDesc: "التشكيلة بانتظارك — تشكيلات متجددة باستمرار.",
      browseBtn: "تصفح التشكيلة",
      sizePrefix: "المقاس",
      remove: "حذف",
      subtotal: "المجموع الفرعي",
      whatsappNote:
        "يتم ترتيب الدفع والتوصيل عبر واتساب مباشرة — لا يتم خصم أي مبالغ على هذا الموقع.",
      whatsappBtn: "إرسال الطلب عبر واتساب",
      keepBrowsing: "متابعة التصفح",
    },
    footer: {
      desc: "ساري هندي فاخر، فساتين مخيطة وتفصيل خاص. بوتيك في السالمية، قطعة ١٠، الكويت.",
      shopTitle: "التسوق",
      visitTitle: "الزيارة",
      talkTitle: "تواصل معنا",
      orderNote:
        "الطلب عبر واتساب أو رسائل إنستغرام — نؤكد المقاسات والتوصيل والدفع معك مباشرة.",
      rights: "بوتيك كاهاني — السالمية، الكويت",
      disclaimer: "الأسعار بالدينار الكويتي (د.ك)",
      createdBy: "Created by MT Growth Labs",
    },
  },
  hi: {
    announcement: "स्टोर में नया साड़ी कलेक्शन उपलब्ध · सालमिया, ब्लॉक 10 · व्हाट्सएप 6100 9697",
    brandName: "कहानी",
    brandTagline: "साड़ियाँ, सिले हुए फ्रॉक्स और कस्टम सिलाई। सालमिया, कुवैत।",
    nav: {
      shop: "शॉप",
      sarees: "साड़ियाँ",
      frocks: "फ्रॉक्स",
      occasion: "पार्टी वियर",
      kids: "किड्स",
      visit: "स्टोर विजिट",
      bag: "बैग",
    },
    hero: {
      boutiqueLocation: "कहानी बुटीक · सालमिया, ब्लॉक 10 — कुवैत",
      headlinePart1: "साड़ियाँ और सिले हुए फ्रॉक्स,",
      headlinePart2: "पहनने के लिए खास।",
      description:
        "सालमिया में एक प्रीमियम बुटीक। जॉर्जेट, सिल्क और लिनेन काउंटर पर; एक्सपर्ट कस्टम सिलाई और फिटिंग। कलेक्शन देखें, फिटिंग बुक करें, या जो पसंद हो उसका फोटो व्हाट्सएप करें।",
      shopBtn: "कलेक्शन देखें",
      whatsAppLabel: "6100 9697",
      onTheRackThisWeek: "इस हफ्ते के नए डिज़ाइन्स",
      fabrics: "जॉर्जेट · क्रेप · लिनेन · सिल्क",
    },
    shop: {
      sectionTag: "01 — शॉप",
      weeklyTag: "हर हफ्ते नए परिधान",
      heading: "इस हफ्ते के खास परिधान",
      all: "सभी",
      sarees: "साड़ियाँ",
      frocks: "फ्रॉक्स",
      occasion: "पार्टी वियर",
      kids: "किड्स",
      freeSize: "फ्री साइज़",
      newBadge: "नया",
      addToBag: "बैग में जोड़ें",
      viewProduct: "देखें",
    },
    collection: {
      tag: "02 — बुटीक",
      heading: "खरीदने से पहले आकर पहन कर देखें।",
      fittingTitle: "फिटिंग रूम",
      fittingDesc:
        "साड़ी हर किसी पर अलग अंदाज में फबती है — स्टोर आकर देखना सबसे बेहतरीन है। आइए, पहन कर देखिए और अपनी पसंद चुनिए।",
      fittingCaption: "काउंटर पर, ब्लॉक 10, सालमिया, कुवैत सिटी",
      bookFitting: "फिटिंग बुक करें — 6100 9697",
      stitchingTag: "स्टोर के अंदर",
      stitchingTitle: "कस्टम सिलाई",
      stitchingDesc:
        "अपना फैब्रिक लाएं या हमारे काउंटर से चुनें। परफेक्ट फिटिंग फ्रॉक्स, ब्लाउज और अल्टरेशन — हमें फोटो व्हाट्सएप करें और हम आपको रेट बताएंगे।",
      stitchingBtn: "सिलाई की जानकारी लें",
      stitchingCaption: "फ्रॉक्स और अल्टरेशन, स्टोर में तैयार",
    },
    quickView: {
      sizeLabel: "साइज़",
      addToBag: "बैग में जोड़ें",
      askWhatsApp: "व्हाट्सएप पर इस डिज़ाइन के बारे में पूछें",
      storePickupNote:
        "स्टोर पिकअप — ब्लॉक 10, सालमिया, कुवैत सिटी। ऑर्डर पैक करने से पहले डिलीवरी व्हाट्सएप पर कन्फर्म की जाएगी।",
      close: "बंद करें",
    },
    cart: {
      title: "आपका बैग",
      emptyTitle: "आपका बैग खाली है।",
      emptyDesc: "कलेक्शन आपका इंतजार कर रहा है — हर हफ्ते नए स्टाइल्स।",
      browseBtn: "कलेक्शन देखें",
      sizePrefix: "साइज़",
      remove: "हटाएं",
      subtotal: "कुल राशि",
      whatsappNote:
        "डिलीवरी और पेमेंट व्हाट्सएप पर तय की जाती है — यहाँ कोई चार्ज नहीं काटा जाएगा।",
      whatsappBtn: "व्हाट्सएप पर ऑर्डर भेजें",
      keepBrowsing: "शॉपिंग जारी रखें",
    },
    footer: {
      desc: "साड़ियाँ, सिले फ्रॉक्स और कस्टम सिलाई। सालमिया, ब्लॉक 10, कुवैत।",
      shopTitle: "शॉप",
      visitTitle: "विजिट",
      talkTitle: "संपर्क करें",
      orderNote:
        "व्हाट्सएप या डीएम पर ऑर्डर करें — हम पहले साइज़, डिलीवरी और पेमेंट कन्फर्म करते हैं।",
      rights: "कहानी बुटीक — सालमिया, कुवैत",
      disclaimer: "कीमतें KWD (कुवैती दिनार) में",
      createdBy: "Created by MT Growth Labs",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
  formatCurrency: (price: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("kahanee_lang");
    return saved === "ar" || saved === "hi" || saved === "en" ? saved : "en";
  });

  const isRTL = lang === "ar";

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("kahanee_lang", newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    if (isRTL) {
      document.body.classList.add("font-arabic");
    } else {
      document.body.classList.remove("font-arabic");
    }
  }, [lang, isRTL]);

  const formatCurrency = (price: number) => {
    const numStr = Number.isInteger(price) ? `${price}` : price.toFixed(2);
    if (lang === "ar") {
      return `${numStr} د.ك`;
    }
    return `KD ${numStr}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: TRANSLATIONS[lang],
        isRTL,
        formatCurrency,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
