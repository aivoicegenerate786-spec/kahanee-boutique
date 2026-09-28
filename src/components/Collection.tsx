import { SITE, waLink } from "../data/site";
import { STITCH_IMAGE, VISIT_IMAGE } from "../data/products";
import { IconClock, IconPin, IconWhatsApp } from "./Icons";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

export default function Collection() {
  const { t, lang } = useLanguage();

  return (
    <section id="visit" className="scroll-mt-20 border-t border-line bg-cream/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-20 lg:py-28">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-start rtl:text-right">
            <span className="text-[11px] tracking-[0.26em] uppercase text-maroon font-semibold">
              {t.collection.tag}
            </span>
            <h2 className="mt-3 font-display text-[32px] sm:text-[44px] lg:text-[50px] leading-tight font-medium text-ink max-w-[24ch]">
              {t.collection.heading}
            </h2>
          </div>
        </Reveal>

        {/* Part 1: The Fitting Room */}
        <div className="mt-10 sm:mt-16 grid gap-8 sm:gap-12 md:grid-cols-12 items-center">
          
          {/* Fitting Room Photo */}
          <Reveal className="md:col-span-5">
            <figure className="group">
              <div className="overflow-hidden border border-line bg-paper-deep shadow-md transition-shadow duration-500 group-hover:shadow-xl">
                <img
                  src={VISIT_IMAGE}
                  alt="Draping a saree during a boutique fitting in Salmiya"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 text-[10.5px] sm:text-[11px] tracking-[0.16em] uppercase text-ink-soft text-start rtl:text-right">
                {t.collection.fittingCaption}
              </figcaption>
            </figure>
          </Reveal>

          {/* Fitting Room Details & Booking */}
          <Reveal delay={100} className="md:col-span-7 md:ps-4 lg:ps-10 text-start rtl:text-right">
            <h3 className="font-display text-[28px] sm:text-[34px] leading-tight font-medium text-ink">
              {t.collection.fittingTitle}
            </h3>
            
            <p className="mt-4 max-w-[48ch] text-[14.5px] sm:text-[15.5px] leading-relaxed text-ink-soft">
              {t.collection.fittingDesc}
            </p>

            <ul className="mt-7 sm:mt-9 space-y-4 text-[13.5px] sm:text-[14px]">
              {/* Address */}
              <li className="flex items-start gap-3.5">
                <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-maroon" />
                <span className="text-ink font-medium leading-relaxed">
                  {SITE.addressLine}
                </span>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3.5">
                <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-maroon" />
                <span className="text-ink-soft leading-relaxed">
                  {SITE.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
                </span>
              </li>

              {/* WhatsApp Booking */}
              <li className="pt-2">
                <a
                  href={waLink(
                    lang === "ar"
                      ? "مرحباً بوتيك كاهاني — أود حجز موعد لتجربة وقياس القطع الفاخرة في فرع السالمية."
                      : lang === "hi"
                      ? "नमस्ते कहानी बुटीक — मैं सालमिया बुटीक में फिटिंग रूम सेशन बुक करना चाहता/चाहती हूँ।"
                      : "Hello Kahanee Boutique — I would like to book a private fitting room session at your Salmiya boutique."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[46px] items-center gap-3 border border-line bg-paper px-6 text-[12.5px] font-semibold tracking-wider uppercase text-ink transition-all duration-300 hover:border-maroon hover:bg-maroon hover:text-cream shadow-2xs active:scale-[0.98] cursor-pointer"
                >
                  <IconWhatsApp className="h-4 w-4 text-green-700 group-hover:text-cream" />
                  <span>{t.collection.bookFitting}</span>
                </a>
              </li>
            </ul>
          </Reveal>

        </div>

        {/* Part 2: Custom Stitching Workshop */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-line grid gap-8 sm:gap-12 md:grid-cols-12 items-center">
          
          {/* Custom Stitching Details */}
          <Reveal className="md:col-span-6 text-start rtl:text-right order-2 md:order-1">
            <span className="text-[11px] tracking-[0.24em] uppercase text-maroon font-semibold">
              {t.collection.stitchingTag}
            </span>

            <h3 className="mt-3 font-display text-[28px] sm:text-[34px] leading-tight font-medium text-ink">
              {t.collection.stitchingTitle}
            </h3>

            <p className="mt-4 max-w-[46ch] text-[14.5px] sm:text-[15.5px] leading-relaxed text-ink-soft">
              {t.collection.stitchingDesc}
            </p>

            <div className="mt-7">
              <a
                href={waLink(
                  lang === "ar"
                    ? "مرحباً بوتيك كاهاني — أود الاستفسار عن خدمة الخياطة والتفصيل الخاص للفساتين والبلوزات في مشغلكم."
                    : lang === "hi"
                    ? "नमस्ते कहानी बुटीक — मैं कस्टम सिलाई और फ्रॉक/ब्लाउज टेलरिंग सर्विस के बारे में बात करना चाहता/चाहती हूँ।"
                    : "Hello Kahanee Boutique — I would like to inquire about your custom stitching and tailoring service for frocks / blouses."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[48px] items-center gap-3 bg-ink px-7 text-[12px] font-semibold tracking-[0.16em] uppercase text-cream transition-all duration-300 hover:bg-maroon-deep shadow-xs active:scale-[0.98] cursor-pointer"
              >
                <span>{t.collection.stitchingBtn}</span>
                <IconWhatsApp className="h-4 w-4 text-green-400" />
              </a>
            </div>
          </Reveal>

          {/* Stitching Workshop Image */}
          <Reveal delay={120} className="md:col-span-6 order-1 md:order-2">
            <figure className="group">
              <div className="overflow-hidden border border-line bg-paper-deep shadow-md transition-shadow duration-500 group-hover:shadow-xl">
                <img
                  src={STITCH_IMAGE}
                  alt="Seamstress stitching fabric at workshop"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 text-[10.5px] sm:text-[11px] tracking-[0.16em] uppercase text-ink-soft text-start rtl:text-right">
                {t.collection.stitchingCaption}
              </figcaption>
            </figure>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
