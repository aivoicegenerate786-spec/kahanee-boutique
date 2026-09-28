import { SITE, igLink, waLink } from "../data/site";
import type { Category } from "../data/products";
import { IconInstagram, IconWhatsApp } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onShop: (filter: Category | "all") => void;
}

export default function Footer({ onShop }: FooterProps) {
  const year = new Date().getFullYear();
  const { t, lang } = useLanguage();

  const shopLinks: [string, Category | "all"][] = [
    [t.shop.all, "all"],
    [t.shop.sarees, "sarees"],
    [t.shop.frocks, "frocks"],
    [t.shop.occasion, "occasion"],
    [t.shop.kids, "kids"],
  ];

  return (
    <footer className="bg-night text-cream/85 border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-14 sm:pt-20 pb-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 text-start rtl:text-right">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-5">
            <p className="font-display text-[26px] sm:text-[28px] font-semibold tracking-[0.32em] uppercase text-cream">
              {t.brandName}
            </p>
            <p className="mt-4 max-w-[36ch] text-[13.5px] sm:text-[14px] leading-relaxed text-cream/70">
              {t.footer.desc}
            </p>
            <p
              className="mt-6 font-display text-[26px] text-cream/40"
              dir="rtl"
              aria-hidden
            >
              {SITE.nameArabic}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="sm:col-span-1 md:col-span-2" aria-label="Footer Shop">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-cream/45">
              {t.footer.shopTitle}
            </p>
            <ul className="mt-5 space-y-3 text-[13.5px]">
              {shopLinks.map(([label, f]) => (
                <li key={f}>
                  <button
                    onClick={() => {
                      onShop(f);
                      window.scrollTo({ top: document.getElementById("shop")?.offsetTop || 0, behavior: "smooth" });
                    }}
                    className="transition-colors hover:text-cream cursor-pointer text-start rtl:text-right"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Boutique Visit Info */}
          <div className="sm:col-span-1 md:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-cream/45">
              {t.footer.visitTitle}
            </p>
            <ul className="mt-5 space-y-3.5 text-[13px] sm:text-[13.5px] leading-relaxed">
              <li className="font-medium text-cream/90">{SITE.addressLine}</li>
              {SITE.hours.map((h) => (
                <li key={h.days} className="text-cream/60">
                  {h.days}
                  <br />
                  <span className="text-cream/80">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="sm:col-span-2 md:col-span-3">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-cream/45">
              {t.footer.talkTitle}
            </p>
            <ul className="mt-5 space-y-3 text-[13.5px]">
              <li>
                <a
                  href={waLink(
                    lang === "ar"
                      ? "مرحباً بوتيك كاهاني! 👋 أود التواصل مع خدمة العملاء للاستفسار عن البوتيك والتصاميم."
                      : lang === "hi"
                      ? "नमस्ते कहानी बुटीक! 👋 मैं आपकी टीम से संपर्क करना चाहता/चाहती हूँ।"
                      : "Hello Kahanee Boutique! 👋 I would like to connect with your concierge team regarding your boutique pieces."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 py-1 transition-colors hover:text-cream group cursor-pointer"
                >
                  <IconWhatsApp className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp {SITE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 py-1 transition-colors hover:text-cream group cursor-pointer"
                >
                  <IconInstagram className="h-5 w-5 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>@{SITE.instagram}</span>
                </a>
              </li>
              <li className="pt-2 text-[12px] leading-relaxed text-cream/55">
                {t.footer.orderNote}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Currency */}
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-cream/15 pt-6 text-[11px] tracking-[0.1em] text-cream/50 sm:flex-row sm:items-center text-center sm:text-start">
          <span>© {year} {t.footer.rights}</span>
          <span>{t.footer.disclaimer} · Salmiya, Kuwait</span>
        </div>

        {/* User Requested: Award-Winning 'Created by MT Growth Labs' Centered Badge */}
        <div className="mt-10 border-t border-cream/10 pt-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/5 px-6 py-2.5 backdrop-blur-xs transition-all duration-300 hover:border-amber-400/40 hover:bg-cream/10 shadow-xs">
            <span className="text-[11px] tracking-[0.26em] uppercase text-cream/70 font-medium">
              Created by
            </span>
            <span className="text-[12px] font-bold tracking-[0.22em] uppercase text-cream transition-colors">
              MT Growth Labs
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
