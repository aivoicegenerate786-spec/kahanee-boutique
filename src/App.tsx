import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import QuickView from "./components/QuickView";
import CartDrawer, { type CartLine } from "./components/CartDrawer";
import Collection from "./components/Collection";
import Footer from "./components/Footer";
import { PRODUCTS, type Category, type Product } from "./data/products";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { SITE, waLink } from "./data/site";
import { IconWhatsApp } from "./components/Icons";

type CartItem = { id: string; size: string; qty: number };

function MainContent() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const { lang, isRTL } = useLanguage();

  const quickView = PRODUCTS.find((p) => p.id === quickViewId) ?? null;

  const lines: CartLine[] = cart.flatMap((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return product ? [{ product, size: item.size, qty: item.qty }] : [];
  });
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const goShop = useCallback((f: Category | "all") => {
    setFilter(f);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const goVisit = useCallback(() => {
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addToCart = useCallback(
    (product: Product, size: string, qty: number) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.id === product.id && l.size === size);
        if (existing) {
          return prev.map((l) =>
            l.id === product.id && l.size === size
              ? { ...l, qty: Math.min(9, l.qty + qty) }
              : l,
          );
        }
        return [...prev, { id: product.id, size, qty }];
      });
      showToast(`${product.name} · ${size}`);
    },
    [showToast],
  );

  const updateQty = useCallback((id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.id === id && l.size === size
            ? { ...l, qty: Math.min(9, l.qty + delta) }
            : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((id: string, size: string) => {
    setCart((prev) => prev.filter((l) => !(l.id === id && l.size === size)));
  }, []);

  // Lock body scroll while any overlay is open
  useEffect(() => {
    const anyOpen = menuOpen || cartOpen || quickView !== null;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen, quickView]);

  // Escape closes the topmost layer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (quickView) setQuickViewId(null);
      else if (cartOpen) setCartOpen(false);
      else if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quickView, cartOpen, menuOpen]);

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  return (
    <div className="min-h-dvh flex flex-col bg-paper text-ink transition-colors selection:bg-maroon selection:text-cream">
      <Header
        cartCount={cartCount}
        menuOpen={menuOpen}
        onMenu={setMenuOpen}
        onCartOpen={() => setCartOpen(true)}
        onShop={goShop}
        onVisit={goVisit}
      />

      <main className="flex-1">
        <Hero onShop={goShop} />
        <Shop
          filter={filter}
          onFilter={setFilter}
          onOpen={(p) => setQuickViewId(p.id)}
          onQuickAdd={(p) => addToCart(p, p.sizes[0], 1)}
        />
        <Collection />
      </main>

      <Footer onShop={goShop} />

      {/* Floating WhatsApp Quick Action Button (Ideal for Kuwait Mobile Users) */}
      <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 sm:bottom-6 end-5 sm:end-6 z-40 print:hidden">
        <a
          href={waLink(
            lang === "ar"
              ? "مرحباً بوتيك كاهاني! 👋 أتصفح موقعكم وأود الاستفسار عن أحدث تشكيلات الساري والفساتين المخيطة المتوفرة في السالمية، الكويت."
              : lang === "hi"
              ? "नमस्ते कहानी बुटीक! 👋 मैं आपकी वेबसाइट देख रहा/रही हूँ और आपके नए साड़ी व फ्रॉक कलेक्शन के बारे में जानकारी चाहता/चाहती हूँ।"
              : "Hello Kahanee Boutique! 👋 I am browsing your website and would like to explore your latest saree & stitched frock collections in Kuwait."
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Kahanee on WhatsApp"
          className="group flex items-center gap-2.5 rounded-full bg-emerald-700 px-4 py-3 sm:py-3.5 sm:px-5 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-emerald-800 hover:shadow-2xl active:scale-95 cursor-pointer border border-emerald-500/30"
        >
          <IconWhatsApp className="h-5 w-5 fill-current shrink-0 animate-bounce duration-1000" />
          <span className="hidden xs:inline-block text-[11.5px] sm:text-[12px] font-semibold tracking-wider uppercase">
            {lang === "ar" ? "تواصل عبر واتساب" : lang === "hi" ? "व्हाट्सएप करें" : "WhatsApp"}
          </span>
        </a>
      </aside>

      {quickView && (
        <QuickView
          key={quickView.id}
          product={quickView}
          onClose={() => setQuickViewId(null)}
          onAdd={(p, size, qty) => {
            setQuickViewId(null);
            addToCart(p, size, qty);
          }}
        />
      )}

      {cartOpen && (
        <CartDrawer
          lines={lines}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeLine}
          onBrowse={() => {
            setCartOpen(false);
            goShop(filter);
          }}
        />
      )}

      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex justify-center px-5">
          <div className="anim-sheet pointer-events-auto flex items-center gap-5 bg-ink py-3.5 pr-4 pl-5 text-cream shadow-xl">
            <p className="text-[12.5px]">
              {lang === "ar" ? "تمت الإضافة — " : lang === "hi" ? "बैग में जोड़ा गया — " : "Added to bag — "}
              <span className="font-medium">{toast}</span>
            </p>
            <button
              onClick={() => setCartOpen(true)}
              className="text-[11px] font-semibold tracking-[0.16em] uppercase underline underline-offset-4 transition-colors hover:text-cream/70 cursor-pointer"
            >
              {lang === "ar" ? "عرض الحقيبة" : lang === "hi" ? "बैग देखें" : "View bag"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
