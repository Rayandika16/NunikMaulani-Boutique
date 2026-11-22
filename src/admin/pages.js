import { SETTINGS_FIELDS } from "./resources.js";

// Susunan panel admin: Halaman -> Section. Tiap section punya:
//   form:     daftar teks/gambar (disimpan di tabel settings, kunci = "halaman.section.nama")
//   resource: id daftar data (lihat resources.js) yang tampil di section itu
const wa = { key: "", label: "Pesan WhatsApp otomatis", type: "textarea", hint: "Terisi otomatis saat pengunjung menekan tombol" };
const f = (key, label, type = "text", hint) => ({ key, label, type, hint });

export const ADMIN_PAGES = [
  {
    id: "home", label: "Beranda",
    sections: [
      { id: "hero", label: "Hero (bagian atas)", form: [
        f("home.hero.eyebrow", "Teks kecil di atas judul"),
        f("home.hero.title", "Judul besar", "textarea"),
        f("home.hero.subtitle", "Subjudul", "textarea"),
        f("home.hero.cta", "Tombol utama (WhatsApp)"),
        { ...wa, key: "home.hero.wa" },
        f("home.hero.link", "Tautan ke halaman koleksi"),
        f("home.hero.image1", "Foto 1 (kiri atas)", "image"),
        f("home.hero.image2", "Foto 2 (kanan)", "image"),
        f("home.hero.image3", "Foto 3 (bawah)", "image"),
      ] },
      { id: "cards", label: "Kategori Utama", form: [
        f("home.cards.title", "Judul section"),
        f("home.cards.link", "Teks tautan ke katalog"),
      ], resource: "collections" },
      { id: "steps", label: "Proses Ringkas", form: [
        f("home.steps.title", "Judul section"),
        f("home.steps.link", "Teks tautan ke halaman proses"),
        ...[1, 2, 3, 4].flatMap((n) => [f(`home.steps.${n}.title`, `Langkah ${n}: judul`), f(`home.steps.${n}.desc`, `Langkah ${n}: penjelasan`, "textarea")]),
      ] },
      { id: "wedding", label: "Banner Pernikahan", form: [
        f("home.wedding.title", "Judul"),
        f("home.wedding.desc", "Deskripsi", "textarea"),
        f("home.wedding.cta", "Teks tombol"),
        { ...wa, key: "home.wedding.wa" },
      ], resource: "perks" },
    ],
  },
  {
    id: "koleksi", label: "Koleksi",
    sections: [
      { id: "header", label: "Judul Halaman", form: [f("koleksi.title", "Judul"), f("koleksi.intro", "Pengantar", "textarea")] },
      { id: "katalog", label: "Katalog Jahitan", resource: "works" },
    ],
  },
  {
    id: "proses", label: "Proses Jahit",
    sections: [
      { id: "header", label: "Judul Halaman", form: [
        f("proses.hero.title", "Judul", "textarea"), f("proses.hero.intro", "Pengantar", "textarea"),
        f("proses.hero.cta", "Teks tombol"), { ...wa, key: "proses.hero.wa" },
      ] },
      { id: "tahap", label: "Tahap Proses", resource: "steps" },
      { id: "revisi", label: "Aturan Revisi", form: [f("proses.revisi.title", "Judul"), f("proses.revisi.intro", "Pengantar", "textarea")], resource: "revisions" },
      { id: "faq", label: "FAQ", form: [
        f("proses.faq.title", "Judul"), f("proses.faq.cta", "Teks tombol"), { ...wa, key: "proses.faq.wa" },
      ], resource: "faqs" },
    ],
  },
  {
    id: "umum", label: "Umum",
    sections: [{ id: "identitas", label: "Identitas & Kontak", form: SETTINGS_FIELDS.map((s) => f(s.key, s.label, "text", s.hint)) }],
  },
];
