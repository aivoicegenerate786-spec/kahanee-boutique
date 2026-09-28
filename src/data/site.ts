/**
 * Business details for Kahanee Boutique Kuwait.
 * Updated to easily configure WhatsApp number and Instagram handle.
 */
export const SITE = {
  name: "Kahanee",
  nameArabic: "كاهنة",
  locationLine: "Salmiya, Block 10 — Kuwait",
  addressLine: "Block 10, Salmiya, Kuwait City",
  // WhatsApp Number (with Kuwait country code +965)
  whatsapp: "96561009697",
  whatsappDisplay: "+965 6100 9697",
  // Instagram profile handle (without @)
  instagram: "kahaneeboutique",
  // In-store hours
  hours: [
    { days: "Sunday – Thursday", time: "10:00 – 21:00" },
    { days: "Friday", time: "14:00 – 21:00" },
  ],
} as const;

/**
 * Universal WhatsApp Link generator with pre-filled message
 * Opens native WhatsApp on mobile or WhatsApp Web on desktop smoothly
 */
export const waLink = (text: string) => {
  const cleanNumber = SITE.whatsapp.replace(/[^0-9]/g, "");
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(text)}`;
};

/**
 * Direct Instagram profile link
 */
export const igLink = `https://www.instagram.com/${SITE.instagram.replace(/^@/, "")}/`;
