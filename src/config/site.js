// Pengaturan utama: nomor WhatsApp, warna, font, dan info butik.
export const WA_NUMBER = "6281234567890"; // format 62..., tanpa + atau spasi
let waNumber = WA_NUMBER;
export const setWaNumber = (n) => { if (n) waNumber = String(n).replace(/\D/g, ""); };
export const wa = (text) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

export const C = { bg: "#FAF8F5", linen: "#F2EFE9", ink: "#18181B", gold: "#A6894B" };
export const serif = { fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" };
export const sans = { fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" };

export const SITE = {
  name: "Nunik Maulani",
  tagline: "Kebaya, blazer pria, dan busana pernikahan yang dijahit dengan teliti.",
  address: "Jl. Melati No. 12, Cianjur, Jawa Barat 43211",
  hours: "Senin–Sabtu 09.00–17.00 WIB (Minggu dengan janji temu)",
  instagram: "https://instagram.com/nunikmaulani",
  tiktok: "https://tiktok.com/@nunikmaulani",
};
