import { useState } from "react";
import { IconBag, IconClose, IconInstagram, IconWhatsApp } from "./Icons";
import { SITE, igLink, waLink } from "../data/site";
import type { Category } from "../data/products";
import { cn } from "../utils/cn";
import { useLanguage, type Language } from "../context/LanguageContext";

interface HeaderProps {
  cartCount: number;
  menuOpen: boolean;
  onMenu: (open: boolean) => void;
  onCartOpen: () => void;
  onShop: (filter: Category | "all") => void;
  onVisit: () => void;
}

export default function Header({
  cartCount,
  menuOpen,
  onMenu,
  onCartOpen,
  onShop,
  onVisit,
}: HeaderProps) {
  const { lang, setLang, t, isRTL } = useLanguage();

  const navItems: { label: string; filter: Category | "all"; enSubtitle: string }[] = [
    { label: t.nav.shop, filter: "all", enSubtitle: "Complete Boutique Rack" },
    { label: t.nav.sarees, filter: "sarees", enSubtitle: "Pure Georgette, Silk & Linen" },
    { label: t.nav.frocks, filter: "frocks", enSubtitle: "Tailored & Stitched Ready-to-Wear" },
    { label: t.nav.occasion, filter: "occasion", enSubtitle: "Weddings, Receptions & Festivals" },
    { label: t.nav.kids, filter: "kids", enSubtitle: "Little Occasion Sets" },
  ];

  const handleMenuPick = (filter: Category | "all" | "visit") => {
    onMenu(false);
    if (filter === "visit") onVisit();
    else onShop(filter);
  };

  const menuLabel = lang === "ar" ? "القائمة" : lang === "hi" ? "मेन्यू" : "MENU";

  return (
    <>
      {/* Top Announcement Strip */}
      <div className="bg-night px-3 py-1.5 sm:py-2 text-center border-b border-cream/10">
        <p className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-cream/90 font-medium truncate px-2">
          {t.announcement}
        </p>
      </div>

      {/* Main Luxury Header — Award-Winning Hamburger Layout */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 md:px-10 max-w-7xl">
          
          {/* LEFT: Award-Winning Hamburger Button (Desktop + Mobile) */}
          <div className="flex items-center">
            <button
              onClick={() => onMenu(true)}
              aria-label="Open boutique menu"
              className="group flex items-center gap-2.5 sm:gap-3 py-2 px-1 text-ink transition-colors hover:text-maroon cursor-pointer select-none"
            >
              <div className="flex flex-col justify-center items-start gap-[5px] w-6 h-5">
                <span className="h-[1.5px] w-6 bg-ink transition-all duration-300 group-hover:bg-maroon group-hover:w-5" />
                <span className="h-[1.5px] w-4 bg-ink transition-all duration-300 group-hover:bg-maroon group-hover:w-6" />
                <span className="h-[1.5px] w-5 bg-ink transition-all duration-300 group-hover:bg-maroon group-hover:w-4" />
              </div>
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] uppercase text-ink group-hover:text-maroon transition-colors hidden xs:inline-block">
                {menuLabel}
              </span>
            </button>
          </div>

          {/* CENTER: Wordmark Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Kahanee Boutique — Home"
              className="group flex flex-col items-center cursor-pointer"
            >
              <span className="font-display text-[22px] sm:text-[27px] font-semibold tracking-[0.28em] sm:tracking-[0.34em] uppercase text-ink transition-colors group-hover:text-maroon">
                {t.brandName}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-ink-soft opacity-70 -mt-0.5 hidden sm:block">
                Salmiya · Kuwait
              </span>
            </button>
          </div>

          {/* RIGHT: Language Switcher (Desktop only) + Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Multilingual Switcher Pill — Visible on Desktop, Hidden on Mobile */}
            <div
              className="hidden md:flex items-center rounded-full border border-line bg-paper-deep/80 p-0.5 text-[10.5px] sm:text-[11px] font-medium shadow-2xs"
              role="group"
              aria-label="Language selector"
            >
              {(
                [
                  ["en", "EN"],
                  ["ar", "عربي"],
                  ["hi", "हिंदी"],
                ] as [Language, string][]
              ).map(([code, label]) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={cn(
                      "rounded-full px-2.5 py-1 transition-all duration-200 cursor-pointer",
                      active
                        ? "bg-maroon text-cream font-semibold shadow-xs"
                        : "text-ink-soft hover:text-ink hover:bg-cream/50"
                    )}
                    aria-pressed={active}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={onCartOpen}
              aria-label={`Open shopping bag, ${cartCount} items`}
              className="relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center text-ink hover:text-maroon transition-colors cursor-pointer"
            >
              <IconBag className="h-[21px] w-[21px] sm:h-[22px] sm:w-[22px]" />
              {cartCount > 0 && (
                <span className="absolute top-1 end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-maroon px-1 text-[9px] font-semibold text-cream tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* AWARD-WINNING FULL-EXPERIENCE HAMBURGER DRAWER */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Boutique Navigation Menu"
        >
          {/* Backdrop with Blur */}
          <div
            className="anim-fade fixed inset-0 bg-night/70 backdrop-blur-sm transition-opacity"
            onClick={() => onMenu(false)}
          />

          {/* Slide-in Luxury Panel */}
          <div
            className={cn(
              "anim-drawer fixed inset-y-0 flex h-full w-full max-w-2xl flex-col bg-paper shadow-2xl transition-transform duration-500 ease-out",
              isRTL ? "right-0 border-l border-line" : "left-0 border-r border-line"
            )}
          >
            {/* Drawer Header */}
            <div className="flex h-16 sm:h-20 items-center justify-between border-b border-line px-5 sm:px-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[22px] font-semibold tracking-[0.28em] uppercase text-ink">
                  {t.brandName}
                </span>
                <span className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">
                  {SITE.locationLine}
                </span>
              </div>

              <button
                onClick={() => onMenu(false)}
                aria-label="Close menu"
                className="group grid h-10 w-10 place-items-center border border-line bg-cream text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream cursor-pointer"
              >
                <IconClose className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Language Switcher inside Drawer */}
            <div className="border-b border-line bg-paper-deep/50 px-5 sm:px-8 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-ink-soft">
                  {lang === "ar" ? "اختر اللغة" : lang === "hi" ? "भाषा चुनें" : "Select Language"}
                </span>
                <div className="flex gap-1.5">
                  {(
                    [
                      ["en", "English"],
                      ["ar", "العربية (الكويت)"],
                      ["hi", "हिंदी"],
                    ] as [Language, string][]
                  ).map(([code, title]) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={cn(
                        "rounded px-3 py-1.5 text-[11.5px] font-medium transition-all cursor-pointer",
                        lang === code
                          ? "bg-maroon text-cream font-semibold shadow-2xs"
                          : "bg-cream border border-line text-ink hover:border-ink"
                      )}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Links with Luxury Editorial Styling */}
            <nav className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-1">
              {navItems.map((item, i) => (
                <button
                  key={item.filter}
                  onClick={() => handleMenuPick(item.filter)}
                  className="group flex w-full items-baseline justify-between border-b border-line-soft py-4 text-start rtl:text-right transition-colors hover:border-maroon cursor-pointer"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="w-6 text-[11px] font-medium tracking-[0.2em] text-maroon tabular-nums">
                      0{i + 1}
                    </span>
                    <div>
                      <span className="font-display text-[28px] sm:text-[36px] font-normal leading-tight text-ink transition-colors group-hover:text-maroon">
                        {item.label}
                      </span>
                      <span className="block text-[11px] text-ink-soft tracking-wider mt-0.5 opacity-80">
                        {item.enSubtitle}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-maroon opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline-block">
                    Explore →
                  </span>
                </button>
              ))}

              {/* Boutique Visit Link */}
              <button
                onClick={() => handleMenuPick("visit")}
                className="group flex w-full items-baseline justify-between border-b border-line-soft py-4 text-start rtl:text-right transition-colors hover:border-maroon cursor-pointer"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="w-6 text-[11px] font-medium tracking-[0.2em] text-maroon tabular-nums">
                    06
                  </span>
                  <div>
                    <span className="font-display text-[28px] sm:text-[36px] font-normal leading-tight text-ink transition-colors group-hover:text-maroon">
                      {t.nav.visit}
                    </span>
                    <span className="block text-[11px] text-ink-soft tracking-wider mt-0.5 opacity-80">
                      Fitting Room &amp; Custom Stitching Workshop
                    </span>
                  </div>
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-maroon opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline-block">
                  Visit →
                </span>
              </button>
            </nav>

            {/* Drawer Bottom Quick Concierge & Details */}
            <div className="border-t border-line bg-cream/70 px-5 sm:px-8 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink-soft">
                    Boutique Hours
                  </p>
                  <p className="text-[12px] text-ink mt-1">
                    Sun – Thu: 10:00 – 21:00 · Fri: 14:00 – 21:00
                  </p>
                  <p className="text-[11.5px] text-ink-soft mt-0.5">
                    {SITE.addressLine}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={waLink(
                      lang === "ar"
                        ? "مرحباً بوتيك كاهاني! 👋 أود الاستفسار عن تشكيلات الساري والفساتين المخيطة."
                        : lang === "hi"
                        ? "नमस्ते कहानी बुटीक! 👋 मैं साड़ी व सिले हुए फ्रॉक्स के बारे में पूछताछ करना चाहता/चाहती हूँ।"
                        : "Hello Kahanee Boutique! 👋 I would like to ask about sarees & stitched frocks."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 text-[12px] font-semibold tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
                  >
                    <IconWhatsApp className="h-4 w-4 fill-current" />
                    <span>WhatsApp {SITE.whatsappDisplay}</span>
                  </a>

                  <a
                    href={igLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-line hover:border-ink py-2 px-4 text-[11.5px] font-medium text-ink transition-colors cursor-pointer"
                  >
                    <IconInstagram className="h-4 w-4 text-pink-600" />
                    <span>@{SITE.instagram}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
