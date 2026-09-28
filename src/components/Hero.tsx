import { HERO_IMAGE, PRODUCTS, type Category } from "../data/products";
import { SITE, waLink } from "../data/site";
import { IconArrowDown, IconArrowRight, IconWhatsApp } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  onShop: (filter: Category | "all") => void;
}

export default function Hero({ onShop }: HeroProps) {
  const { t, isRTL, lang } = useLanguage();
  const countFor = (c: Category) => PRODUCTS.filter((p) => p.category === c).length;

  const indexItems: { label: string; filter: Category }[] = [
    { label: t.shop.sarees, filter: "sarees" },
    { label: t.shop.frocks, filter: "frocks" },
    { label: t.shop.occasion, filter: "occasion" },
    { label: t.shop.kids, filter: "kids" },
  ];

  return (
    <section className="relative px-4 sm:px-6 md:px-10 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-24 max-w-7xl mx-auto">
      <div className="grid items-start gap-8 sm:gap-10 md:grid-cols-12 md:gap-8 lg:gap-14">
        
        {/* LEFT COLUMN: Editorial Text & Actions */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center text-start rtl:text-right">
          
          {/* Subtle Location Tag */}
          <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] tracking-[0.24em] uppercase text-ink-soft font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-maroon animate-pulse" />
            <span>{t.hero.boutiqueLocation}</span>
          </div>

          {/* Award-Winning Main Heading */}
          <h1 className="mt-4 sm:mt-5 font-display text-[34px] xs:text-[40px] sm:text-[50px] md:text-[56px] lg:text-[66px] leading-[1.04] font-medium tracking-tight text-ink">
            {t.hero.headlinePart1}{" "}
            <em className="font-normal text-maroon not-italic italic block sm:inline">
              {t.hero.headlinePart2}
            </em>
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-6 max-w-[48ch] text-[14.5px] sm:text-[15.5px] leading-relaxed text-ink-soft">
            {t.hero.description}
          </p>

          {/* Action Buttons — Mobile Friendly Touch Targets */}
          <div className="mt-7 sm:mt-9 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-5">
            <button
              onClick={() => onShop("all")}
              className="inline-flex h-[50px] items-center justify-center gap-3 bg-ink px-8 text-[12px] font-semibold tracking-[0.18em] uppercase text-cream transition-all duration-300 hover:bg-maroon-deep active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <span>{t.hero.shopBtn}</span>
              <IconArrowDown className="h-4 w-4 shrink-0" />
            </button>

            <a
              href={waLink(
                lang === "ar"
                  ? "مرحباً بوتيك كاهاني — أود الاطلاع على أحدث تصاميم الساري والفساتين المتوفرة في البوتيك هذا الأسبوع."
                  : lang === "hi"
                  ? "नमस्ते कहानी बुटीक — मैं इस हफ्ते के नए साड़ी व फ्रॉक कलेक्शंस देखना चाहता/चाहती हूँ।"
                  : "Hello Kahanee Boutique — I would like to see what is new on the rack this week."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[50px] items-center justify-center gap-2.5 border border-line bg-cream/70 px-6 text-[13px] font-medium text-ink transition-all duration-300 hover:border-maroon hover:bg-cream hover:text-maroon shadow-2xs cursor-pointer"
            >
              <IconWhatsApp className="h-[19px] w-[19px] text-green-700 shrink-0" />
              <span>{t.hero.whatsAppLabel}</span>
            </a>
          </div>

          {/* Luxury Category Quick Index List */}
          <div className="mt-10 sm:mt-14 border-t border-line">
            {indexItems.map((item) => (
              <button
                key={item.filter}
                onClick={() => onShop(item.filter)}
                className="group flex w-full items-center justify-between border-b border-line-soft py-3 sm:py-3.5 text-start rtl:text-right transition-colors hover:bg-paper-deep/40 px-1 cursor-pointer"
              >
                <span className="text-[12px] sm:text-[12.5px] font-semibold tracking-[0.16em] uppercase text-ink group-hover:text-maroon transition-colors">
                  {item.label}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-display text-[16px] sm:text-[17px] text-ink-soft tabular-nums group-hover:text-ink transition-colors">
                    0{countFor(item.filter)}
                  </span>
                  <IconArrowRight
                    className={`h-4 w-4 text-maroon opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                      isRTL
                        ? "rotate-180 translate-x-1 group-hover:translate-x-0"
                        : "-translate-x-1 group-hover:translate-x-0"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Hero Photo with Award-Winning Presentation */}
        <div className="md:col-span-6 lg:col-span-6 md:pt-2">
          <figure className="relative group">
            
            {/* Outer Luxury Border Frame */}
            <div className="relative overflow-hidden border border-line bg-paper-deep shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="Bollywood style model in royal designer saree"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                fetchPriority="high"
              />
              
              {/* Subtle Luxury Corner Badging */}
              <div className="absolute top-3.5 end-3.5 bg-paper/95 backdrop-blur-xs px-3 py-1.5 border border-line-soft shadow-xs">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-maroon">
                  Kuwait Boutique Collection
                </span>
              </div>
            </div>

            {/* Caption */}
            <figcaption className="mt-3.5 flex items-baseline justify-between text-[10.5px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft px-1">
              <span className="font-medium text-ink flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-maroon" />
                {t.hero.onTheRackThisWeek}
              </span>
              <span className="text-ink-soft/90">{t.hero.fabrics}</span>
            </figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
}
