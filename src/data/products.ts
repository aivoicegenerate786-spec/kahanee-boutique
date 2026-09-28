export type Category = "sarees" | "frocks" | "occasion" | "kids";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // KD — PLACEHOLDER prices, update to the current in-store list
  note: string;
  sizes: string[];
  image: string;
  alt: string;
  isNew?: boolean;
}

const img = (id: number, w = 800, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const HERO_IMAGE = "/images/hero-model.jpg";
export const VISIT_IMAGE = img(8751525, 1000, 1250);
export const STITCH_IMAGE = img(7147652, 1600, 1067);

export const CATEGORY_LABELS: Record<Category, string> = {
  sarees: "Sarees",
  frocks: "Frocks",
  occasion: "Occasion",
  kids: "Kids",
};

export const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "sarees", label: "Sarees" },
  { id: "frocks", label: "Frocks" },
  { id: "occasion", label: "Occasion" },
  { id: "kids", label: "Kids" },
];

export const PRODUCTS: Product[] = [
  // ——— Sarees ———
  {
    id: "saree-georgette-green",
    name: "Green Georgette Saree",
    category: "sarees",
    price: 34,
    note: "Light fabric, soft drape — an easy every-day drape.",
    sizes: ["Free size"],
    image: img(39771898),
    alt: "Woman in a green georgette saree, smiling outdoors",
    isNew: true,
  },
  {
    id: "saree-silkblend-red",
    name: "Red Silk-Blend Saree",
    category: "sarees",
    price: 52,
    note: "A rich, plain red that pairs with anything you already own.",
    sizes: ["Free size"],
    image: img(28924760),
    alt: "Woman in a deep red silk-blend saree",
  },
  {
    id: "saree-linenclay",
    name: "Linen-Cotton Saree — Clay",
    category: "sarees",
    price: 38,
    note: "Breathable weave for hot days, holds its shape till evening.",
    sizes: ["Free size"],
    image: img(38850343),
    alt: "Woman in a linen-cotton saree against a brick wall",
    isNew: true,
  },
  {
    id: "saree-crepe-natural",
    name: "HO Crepe Saree — Natural",
    category: "sarees",
    price: 29,
    note: "Lightweight crepe that drapes clean without heavy pleats.",
    sizes: ["Free size"],
    image: img(33359448),
    alt: "Woman in a soft crepe saree, seated outdoors",
  },
  {
    id: "saree-georgette-day",
    name: "Day Georgette Saree",
    category: "sarees",
    price: 36,
    note: "Understated colour, works for work and weekend alike.",
    sizes: ["Free size"],
    image: img(33359453),
    alt: "Woman in a traditional saree on a street",
  },
  // ——— Frocks ———
  {
    id: "frock-marigold",
    name: "Marigold Stitched Frock",
    category: "frocks",
    price: 28,
    note: "A-line cut, lined bodice. Stitched in the shop.",
    sizes: ["S", "M", "L", "XL"],
    image: img(8771006),
    alt: "Woman in a marigold-yellow stitched frock on a white background",
    isNew: true,
  },
  {
    id: "frock-anarkali",
    name: "Anarkali Frock",
    category: "frocks",
    price: 42,
    note: "Flares from the waist, full sleeves. Pairs with a plain dupatta.",
    sizes: ["S", "M", "L", "XL"],
    image: img(18380705),
    alt: "Woman in an anarkali frock, looking up",
  },
  {
    id: "frock-plum-aline",
    name: "Plum A-Line Frock",
    category: "frocks",
    price: 34,
    note: "Simple silhouette, easy to dress up or down.",
    sizes: ["S", "M", "L", "XL"],
    image: img(34673582),
    alt: "Woman in a plum dress under a banyan tree",
  },
  {
    id: "frock-festive-set",
    name: "Festive Frock Set",
    category: "frocks",
    price: 46,
    note: "Frock with matching dupatta, ready to wear as a set.",
    sizes: ["S", "M", "L", "XL"],
    image: img(31567623),
    alt: "Woman in a festive frock set with jewellery",
  },
  // ——— Occasion ———
  {
    id: "occasion-festive-set",
    name: "Festive Occasion Set",
    category: "occasion",
    price: 58,
    note: "Made for weddings and functions — try it before you book it.",
    sizes: ["M", "L", "XL"],
    image: img(38998845),
    alt: "Woman in a colourful festive saree with a peacock feather",
    isNew: true,
  },
  {
    id: "occasion-celebration-saree",
    name: "Celebration Saree",
    category: "occasion",
    price: 48,
    note: "Bright, festive colour for Eids, housewarmings and parties.",
    sizes: ["Free size"],
    image: img(8819333),
    alt: "Woman in a vibrant saree celebrating indoors",
  },
  {
    id: "occasion-reception-saree",
    name: "Reception Saree",
    category: "occasion",
    price: 64,
    note: "Our heaviest occasion piece on the rack this week.",
    sizes: ["Free size"],
    image: img(17040892),
    alt: "Woman in a reception saree in front of historic architecture",
  },
  // ——— Kids ———
  {
    id: "kids-frock",
    name: "Little Girl's Frock",
    category: "kids",
    price: 22,
    note: "Stitched for little functions — soft lining, no hard trims.",
    sizes: ["3–4 Y", "5–6 Y"],
    image: img(12100637),
    alt: "Little girl in a traditional stitched frock",
  },
  {
    id: "kids-occasion-set",
    name: "Toddler Occasion Set",
    category: "kids",
    price: 19,
    note: "A matching set for the smallest guest in the family.",
    sizes: ["2–3 Y", "4–5 Y"],
    image: img(34236936),
    alt: "Toddler in a black traditional occasion set",
  },
];

export const formatPrice = (n: number) =>
  `KD ${Number.isInteger(n) ? n : n.toFixed(2)}`;
