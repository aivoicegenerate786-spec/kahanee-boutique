import { useState } from "react";
import { type Product } from "../data/products";
import { SITE, waLink } from "../data/site";
import { IconClose, IconMinus, IconPlus, IconWhatsApp } from "./Icons";
import { cn } from "../utils/cn";
import { useLanguage } from "../context/LanguageContext";

interface QuickViewProps {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, size: string, qty: number) => void;
}

export default function QuickView({ product, onClose, onAdd }: QuickViewProps) {
  const { t, formatCurrency, lang } = useLanguage();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [qty, setQty] = useState(1);

  const categoryLabel =
    t.shop[product.category as keyof typeof t.shop] || product.category;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      {/* Blurred Backdrop */}
      <div
        className="anim-fade fixed inset-0 bg-night/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet Container for Mobile & Modal for Desktop */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center p-0 sm:p-4 md:p-6 pointer-events-none">
        <div className="anim-sheet pointer-events-auto w-full max-h-[92dvh] sm:max-h-[88dvh] sm:max-w-4xl bg-cream rounded-t-3xl sm:rounded-none overflow-hidden shadow-2xl flex flex-col sm:grid sm:grid-cols-2">
          
          {/* Mobile Sheet Drag Handle Indicator */}
          <div className="w-12 h-1.5 bg-line rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

          {/* Left / Top: Product Photo */}
          <div className="relative bg-paper-deep shrink-0">
            <img
              src={product.image}
              alt={product.alt}
              className="h-[32dvh] sm:h-full w-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-3 start-3 bg-paper/95 backdrop-blur-xs border border-line-soft px-2.5 py-1 text-[9.5px] font-semibold tracking-[0.2em] uppercase text-maroon shadow-xs">
                {t.shop.newBadge}
              </span>
            )}
          </div>

          {/* Right / Bottom: Product Details with Safe Mobile Padding */}
          <div className="relative p-5 sm:p-8 md:p-10 overflow-y-auto text-start rtl:text-right flex-1 flex flex-col justify-between">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label={t.quickView.close}
              className="absolute top-3 end-3 sm:top-5 sm:end-5 grid h-10 w-10 place-items-center rounded-full sm:rounded-none border border-line bg-paper text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream cursor-pointer"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <div>
              {/* Category */}
              <p className="pe-12 text-[11px] tracking-[0.24em] uppercase text-maroon font-semibold">
                {categoryLabel}
              </p>

              {/* Title */}
              <h3 className="mt-2 pe-8 font-display text-[26px] sm:text-[32px] leading-tight font-medium text-ink">
                {product.name}
              </h3>

              {/* Price */}
              <p className="mt-2 text-[18px] font-semibold tabular-nums text-maroon">
                {formatCurrency(product.price)}
              </p>

              {/* Note / Description */}
              <p className="mt-3.5 max-w-[42ch] text-[13.5px] sm:text-[14px] leading-relaxed text-ink-soft">
                {product.note}
              </p>

              {/* Sizes Selection */}
              <div className="mt-6">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink-soft">
                  {t.quickView.sizeLabel}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = size === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        aria-pressed={isSelected}
                        className={cn(
                          "min-w-[58px] h-10 border px-4 text-[12.5px] font-medium transition-all cursor-pointer",
                          isSelected
                            ? "border-maroon bg-maroon text-cream font-semibold shadow-2xs"
                            : "border-line bg-paper/60 hover:border-ink text-ink"
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Add to Bag Controls */}
              <div className="mt-6 flex flex-col xs:flex-row items-stretch gap-3">
                
                {/* Quantity */}
                <div className="flex items-center justify-between border border-line bg-paper/60 h-[48px] px-2 min-w-[120px]">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-8 w-8 place-items-center text-ink hover:text-maroon transition-colors cursor-pointer"
                  >
                    <IconMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[14px] font-medium tabular-nums px-2">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    aria-label="Increase quantity"
                    className="grid h-8 w-8 place-items-center text-ink hover:text-maroon transition-colors cursor-pointer"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  disabled={!size}
                  onClick={() => size && onAdd(product, size, qty)}
                  className="flex-1 h-[48px] bg-ink hover:bg-maroon-deep disabled:bg-line disabled:cursor-not-allowed text-cream px-6 text-[12px] font-semibold tracking-[0.16em] uppercase transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  {t.quickView.addToBag}
                </button>
              </div>

              {/* Direct WhatsApp Question */}
              <div className="mt-5">
                <a
                  href={waLink(
                    lang === "ar"
                      ? `مرحباً بوتيك كاهاني! ✨\nأود الاستفسار عن هذه القطعة الفاخرة:\n• المنتج: ${product.name}\n• السعر: ${formatCurrency(product.price)}\n• المقاس المختار: ${size || "مقاس موحد"}\n\nهل القطعة متوفرة حالياً للاستلام أو التوصيل في الكويت؟`
                      : lang === "hi"
                      ? `नमस्ते कहानी बुटीक! ✨\nमुझे इस डिज़ाइनर परिधान के बारे में जानकारी चाहिए:\n• प्रोडक्ट: ${product.name}\n• कीमत: ${formatCurrency(product.price)}\n• साइज़: ${size || "फ्री साइज़"}\n\nक्या यह अभी आपके सालमिया स्टोर में उपलब्ध है?`
                      : `Hello Kahanee Boutique! ✨\nI am inquiring about this piece:\n• Item: ${product.name}\n• Price: ${formatCurrency(product.price)}\n• Size: ${size || "Standard"}\n\nCould you please let me know if this is currently available in the Salmiya boutique?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[12.5px] font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 transition-colors"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  <span>{t.quickView.askWhatsApp}</span>
                </a>
              </div>
            </div>

            {/* In-Store Pickup Line */}
            <p className="mt-5 pt-3 border-t border-line-soft text-[11px] leading-relaxed text-ink-soft">
              {t.quickView.storePickupNote}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
