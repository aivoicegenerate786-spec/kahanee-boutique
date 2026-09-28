import { type Product } from "../data/products";
import { waLink } from "../data/site";
import { IconBag, IconClose, IconMinus, IconPlus, IconWhatsApp } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export interface CartLine {
  product: Product;
  size: string;
  qty: number;
}

interface CartDrawerProps {
  lines: CartLine[];
  onClose: () => void;
  onUpdateQty: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
  onBrowse: () => void;
}

export default function CartDrawer({
  lines,
  onClose,
  onUpdateQty,
  onRemove,
  onBrowse,
}: CartDrawerProps) {
  const { t, formatCurrency, isRTL, lang } = useLanguage();
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);

  const orderMessage =
    lang === "ar"
      ? `✨ *طلب شراء جديد — بوتيك كاهاني* ✨\n\nمرحباً، أود إتمام طلب هذه القطع الفاخرة:\n\n` +
        lines
          .map(
            (l, idx) =>
              `${idx + 1}. 🛍️ *${l.product.name}*\n   • المقاس: ${l.size}\n   • الكمية: ${l.qty}\n   • السعر: ${formatCurrency(l.product.price * l.qty)}`
          )
          .join("\n\n") +
        `\n\n━━━━━━━━━━━━━━━━━━\n💰 *المجموع الإجمالي: ${formatCurrency(subtotal)}*\n📍 *التسليم:* السالمية، الكويت\n━━━━━━━━━━━━━━━━━━\n\nيرجى تأكيد التوفر وخيارات التوصيل والدفع.`
      : lang === "hi"
      ? `✨ *नया ऑर्डर इन्क्वायरी — कहानी बुटीक* ✨\n\nनमस्ते, मुझे निम्नलिखित परिधान ऑर्डर करने हैं:\n\n` +
        lines
          .map(
            (l, idx) =>
              `${idx + 1}. 🛍️ *${l.product.name}*\n   • साइज़: ${l.size}\n   • संख्या: ${l.qty}\n   • कुल मूल्य: ${formatCurrency(l.product.price * l.qty)}`
          )
          .join("\n\n") +
        `\n\n━━━━━━━━━━━━━━━━━━\n💰 *कुल देय राशि: ${formatCurrency(subtotal)}*\n📍 *पिकअप/डिलीवरी:* सालमिया, कुवैत\n━━━━━━━━━━━━━━━━━━\n\nकृपया उपलब्धता और डिलीवरी की पुष्टि करें।`
      : `✨ *NEW ORDER INQUIRY — KAHANEE BOUTIQUE* ✨\n\nHello! I would like to place an order for the following boutique pieces:\n\n` +
        lines
          .map(
            (l, idx) =>
              `${idx + 1}. 🛍️ *${l.product.name}*\n   • Size: ${l.size}\n   • Qty: ${l.qty}\n   • Price: ${formatCurrency(l.product.price * l.qty)}`
          )
          .join("\n\n") +
        `\n\n━━━━━━━━━━━━━━━━━━\n💰 *Total Amount: ${formatCurrency(subtotal)}*\n📍 *Location:* Salmiya, Kuwait City\n━━━━━━━━━━━━━━━━━━\n\nPlease confirm availability and delivery options.`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      {/* Blurred Backdrop */}
      <div
        className="anim-fade fixed inset-0 bg-night/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside
        className={`anim-drawer fixed inset-y-0 flex h-full w-full sm:max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isRTL ? "left-0 border-r border-line" : "right-0 border-l border-line"
        }`}
      >
        {/* Header */}
        <header className="flex h-16 sm:h-20 items-center justify-between border-b border-line px-5 sm:px-7">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-[22px] sm:text-[24px] font-semibold tracking-wide">
              {t.cart.title}
            </h2>
            <span className="text-[13px] font-semibold text-maroon tabular-nums">
              ({count})
            </span>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Close bag"
            className="grid h-10 w-10 place-items-center border border-line bg-paper transition-colors hover:border-maroon hover:bg-maroon hover:text-cream cursor-pointer"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </header>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 divide-y divide-line-soft">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-paper border border-line">
                <IconBag className="h-7 w-7 text-ink-soft opacity-60" />
              </div>
              <p className="mt-5 font-display text-[22px] sm:text-[24px] font-medium text-ink">
                {t.cart.emptyTitle}
              </p>
              <p className="mt-2 max-w-[28ch] text-[13px] sm:text-[14px] text-ink-soft leading-relaxed">
                {t.cart.emptyDesc}
              </p>
              <button
                onClick={onBrowse}
                className="mt-6 border border-ink bg-ink px-8 py-3.5 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-cream transition-all hover:bg-maroon-deep shadow-xs active:scale-[0.98] cursor-pointer"
              >
                {t.cart.browseBtn}
              </button>
            </div>
          ) : (
            lines.map((l) => (
              <div
                key={`${l.product.id}__${l.size}`}
                className="flex gap-4 py-5 items-start"
              >
                <img
                  src={l.product.image}
                  alt={l.product.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-[76px] shrink-0 object-cover border border-line bg-paper-deep shadow-xs"
                />

                <div className="min-w-0 flex-1 pt-0.5 text-start rtl:text-right">
                  <p className="truncate text-[13.5px] font-medium text-ink">
                    {l.product.name}
                  </p>
                  
                  <p className="mt-0.5 text-[11.5px] text-ink-soft">
                    {t.cart.sizePrefix} <span className="font-semibold text-ink">{l.size}</span>
                  </p>

                  <div className="mt-3 inline-flex items-center border border-line bg-paper/70 h-8">
                    <button
                      onClick={() => onUpdateQty(l.product.id, l.size, -1)}
                      aria-label={`Decrease quantity of ${l.product.name}`}
                      className="grid h-8 w-8 place-items-center text-ink hover:text-maroon transition-colors cursor-pointer"
                    >
                      <IconMinus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-[12.5px] font-medium tabular-nums">
                      {l.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(l.product.id, l.size, 1)}
                      aria-label={`Increase quantity of ${l.product.name}`}
                      className="grid h-8 w-8 place-items-center text-ink hover:text-maroon transition-colors cursor-pointer"
                    >
                      <IconPlus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end rtl:items-start justify-between h-full">
                  <p className="text-[14px] font-semibold tabular-nums text-maroon">
                    {formatCurrency(l.product.price * l.qty)}
                  </p>
                  <button
                    onClick={() => onRemove(l.product.id, l.size)}
                    className="mt-6 text-[11px] text-ink-soft underline underline-offset-4 transition-colors hover:text-maroon cursor-pointer"
                  >
                    {t.cart.remove}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout via WhatsApp */}
        {lines.length > 0 && (
          <footer className="border-t border-line bg-cream p-5 sm:p-6 shadow-lg">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink-soft">
                {t.cart.subtotal}
              </span>
              <span className="font-display text-[26px] font-semibold tabular-nums text-maroon">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
              {t.cart.whatsappNote}
            </p>

            <a
              href={waLink(orderMessage)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-[50px] w-full items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-[12px] font-semibold tracking-[0.16em] uppercase text-white shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <IconWhatsApp className="h-5 w-5 fill-current" />
              <span>{t.cart.whatsappBtn}</span>
            </a>

            <button
              onClick={onClose}
              className="mt-2.5 w-full py-2.5 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-ink-soft transition-colors hover:text-ink cursor-pointer"
            >
              {t.cart.keepBrowsing}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
