import {
  PRODUCTS,
  type Category,
  type Product,
} from "../data/products";
import Reveal from "./Reveal";
import { IconPlus } from "./Icons";
import { cn } from "../utils/cn";
import { useLanguage } from "../context/LanguageContext";

interface ShopProps {
  filter: Category | "all";
  onFilter: (filter: Category | "all") => void;
  onOpen: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function Shop({ filter, onFilter, onOpen, onQuickAdd }: ShopProps) {
  const { t, formatCurrency } = useLanguage();

  const filterTabs: { id: Category | "all"; label: string }[] = [
    { id: "all", label: t.shop.all },
    { id: "sarees", label: t.shop.sarees },
    { id: "frocks", label: t.shop.frocks },
    { id: "occasion", label: t.shop.occasion },
    { id: "kids", label: t.shop.kids },
  ];

  const items =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const countFor = (id: Category | "all") =>
    id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length;

  return (
    <section id="shop" className="scroll-mt-20 border-t border-line bg-paper/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-16 pb-16 sm:pb-24">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 text-start rtl:text-right">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-[0.24em] uppercase text-maroon font-semibold">
                {t.shop.sectionTag}
              </span>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase text-ink-soft">
              {t.shop.weeklyTag}
            </p>
          </div>

          <h2 className="mt-3 font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-tight font-medium text-ink text-start rtl:text-right">
            {t.shop.heading}
          </h2>

          {/* Filter Bar with Horizontal Scroll for Mobile */}
          <div className="no-scrollbar -mx-4 sm:-mx-6 md:mx-0 mt-6 sm:mt-8 flex gap-3 sm:gap-6 overflow-x-auto border-b border-line px-4 sm:px-6 md:px-0 pb-1">
            {filterTabs.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onFilter(f.id)}
                  aria-pressed={active}
                  className={cn(
                    "relative flex shrink-0 items-baseline gap-2 pb-3.5 pt-1 px-1 text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer",
                    active ? "text-maroon" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span>{f.label}</span>
                  <span className={cn(
                    "text-[10px] tabular-nums rounded-full px-1.5 py-0.5",
                    active ? "bg-maroon/10 text-maroon font-bold" : "text-ink-soft/70"
                  )}>
                    {countFor(f.id)}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[2px] bg-maroon transition-all duration-300",
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Product Grid — Perfectly Spaced 2-Columns on Mobile */}
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-12 pt-8 sm:pt-12 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 60}>
              <ProductCard
                product={p}
                onOpen={onOpen}
                onQuickAdd={onQuickAdd}
                formatCurrency={formatCurrency}
              />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function ProductCard({
  product,
  onOpen,
  onQuickAdd,
  formatCurrency,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  formatCurrency: (n: number) => string;
}) {
  const { t } = useLanguage();
  const oneSize = product.sizes.length === 1;

  const categoryLabel =
    t.shop[product.category as keyof typeof t.shop] || product.category;

  return (
    <div className="group relative flex flex-col h-full">
      {/* Product Image Frame */}
      <button
        onClick={() => onOpen(product)}
        className="block w-full text-start rtl:text-right cursor-pointer"
        aria-label={`${t.shop.viewProduct} ${product.name}`}
      >
        <div className="relative overflow-hidden bg-paper-deep border border-line-soft transition-all duration-300 group-hover:border-maroon/40 shadow-xs">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* New Badge */}
          {product.isNew && (
            <span className="pointer-events-none absolute top-2.5 start-2.5 bg-paper/95 backdrop-blur-xs border border-line-soft px-2 py-0.5 text-[9px] sm:text-[9.5px] font-semibold tracking-[0.2em] uppercase text-maroon shadow-xs">
              {t.shop.newBadge}
            </span>
          )}

          {/* Touch-Friendly Quick View Overlay on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 hidden sm:flex items-center justify-center bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream bg-ink/80 px-4 py-2 backdrop-blur-xs border border-cream/20">
              {t.shop.viewProduct}
            </span>
          </div>
        </div>

        {/* Product Details with Precise Spacing */}
        <div className="mt-3 sm:mt-3.5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[13px] sm:text-[14px] font-medium leading-snug text-ink group-hover:text-maroon transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="shrink-0 text-[13px] sm:text-[14px] font-semibold tabular-nums text-maroon">
              {formatCurrency(product.price)}
            </span>
          </div>

          <p className="mt-1 text-[11px] sm:text-[11.5px] text-ink-soft">
            {categoryLabel} ·{" "}
            {oneSize ? t.shop.freeSize : product.sizes.join(" · ")}
          </p>
        </div>
      </button>

      {/* Quick Add To Bag Button — Mobile Optimized */}
      {oneSize && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          aria-label={`${t.shop.addToBag} ${product.name}`}
          className="absolute top-2.5 end-2.5 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-line bg-paper/95 backdrop-blur-xs text-ink shadow-sm transition-all duration-300 hover:bg-maroon hover:text-cream hover:border-maroon active:scale-90 cursor-pointer"
        >
          <IconPlus className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
