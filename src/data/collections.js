import { colKebaya, colBlazer, colWedding } from "../assets/images.js";

// 3 kategori utama di beranda. `src` kosong = bingkai linen.
export const COLLECTIONS = [
  { id: "kebaya", title: "Kebaya Kontemporer", note: "Siluet modern, detail payet dan bordir halus.", src: colKebaya, tall: true,
    msg: "Halo Nunik Maulani, saya tertarik dengan Kebaya Kontemporer. Boleh tanya detail model, bahan, dan harganya?" },
  { id: "blazer", title: "Blazer Pria", note: "Bahu tegas, bahan nyaman dipakai seharian.", src: colBlazer, tall: false,
    msg: "Halo Nunik Maulani, saya ingin menjahit Blazer Pria. Boleh tanya pilihan bahan, estimasi waktu, dan harganya?" },
  { id: "nikah", title: "Paket Acara Pernikahan", note: "Busana pengantin, sarimbit, dan keluarga serasi.", src: colWedding, tall: true,
    msg: "Halo Nunik Maulani, saya merencanakan pernikahan dan tertarik Paket Busana Pernikahan. Boleh minta detail paket dan harganya?" },
];

// Fasilitas pada banner paket pernikahan
export const PERKS = ["Custom fitting untuk pengantin dan keluarga", "Konsultasi padu padan warna seluruh rombongan", "Pilihan sewa perdana atau jahit hak milik", "Jadwal fitting fleksibel menuju hari acara"];
