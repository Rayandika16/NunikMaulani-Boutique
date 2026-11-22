import { STEPS } from "./process.js";
import { heroKebaya, heroBlazer, heroWedding } from "../assets/images.js";

// Teks & gambar bawaan setiap section. Kunci "halaman.section.nama".
// Nilai di CMS (tabel settings) menimpa ini; jika dikosongkan, kembali ke nilai di sini.
export const PAGE_TEXT = {
  // Beranda: Hero
  "home.hero.eyebrow": "Butik busana & custom tailoring",
  "home.hero.title": "Tradisi yang dijahit ulang untuk hari ini.",
  "home.hero.subtitle": "Kebaya, blazer pria, dan busana pernikahan dengan jahitan rapi, potongan modern, dan bahan yang nyaman dari pagi sampai resepsi usai.",
  "home.hero.cta": "Konsultasi via WhatsApp",
  "home.hero.link": "Lihat koleksi",
  "home.hero.wa": "Halo Nunik Maulani, saya ingin konsultasi desain busana untuk acara saya.",
  "home.hero.image1": heroKebaya,
  "home.hero.image2": heroBlazer,
  "home.hero.image3": heroWedding,
  // Beranda: Kategori utama
  "home.cards.title": "Tiga lini yang kami kerjakan sepenuh hati",
  "home.cards.link": "Lihat semua hasil jahitan kami",
  // Beranda: Proses ringkas
  "home.steps.title": "Dari obrolan ke busana siap pakai",
  "home.steps.link": "Baca proses lengkap dan aturan revisi",
  ...Object.fromEntries(STEPS.flatMap((s, i) => [[`home.steps.${i + 1}.title`, s.t], [`home.steps.${i + 1}.desc`, s.d]])),
  // Beranda: Banner pernikahan
  "home.wedding.title": "Paket busana pernikahan",
  "home.wedding.desc": "Untuk calon pengantin dan keluarga yang ingin tampil serasi tanpa terasa seragam.",
  "home.wedding.cta": "Atur Konsultasi Paket",
  "home.wedding.wa": "Halo Nunik Maulani, saya calon pengantin dan ingin konsultasi Paket Busana Pernikahan untuk pengantin dan keluarga.",
  // Halaman Koleksi
  "koleksi.title": "Busana yang pernah kami jahit",
  "koleksi.intro": "Pilih model untuk melihat contoh hasilnya. Semua busana bisa disesuaikan dengan ukuran, bahan, dan warna Anda.",
  // Halaman Proses Jahit
  "proses.hero.title": "Proses jahit dari awal sampai busana Anda siap",
  "proses.hero.intro": "Sepuluh tahap yang jelas, lengkap dengan perkiraan waktu dan apa yang perlu Anda siapkan. Waktu bisa berubah sesuai tingkat kerumitan busana.",
  "proses.hero.cta": "Mulai Konsultasi",
  "proses.hero.wa": "Halo Nunik Maulani, saya ingin mulai konsultasi dan memesan busana.",
  "proses.revisi.title": "Aturan revisi",
  "proses.revisi.intro": "Busana harus nyaman dipakai. Karena itu revisi adalah bagian dari proses, bukan tambahan.",
  "proses.faq.title": "Pertanyaan yang sering diajukan",
  "proses.faq.cta": "Tanya Estimasi via WA",
  "proses.faq.wa": "Halo Nunik Maulani, saya ingin bertanya tentang proses dan estimasi waktu jahit.",
};
