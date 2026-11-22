import { Sparkles, Ruler, Scissors, Shirt } from "lucide-react";

// Ringkasan 4 langkah di beranda
export const STEPS = [
  { icon: Sparkles, t: "Konsultasi desain & bahan", d: "Ceritakan acara dan selera Anda. Kami bantu memilih model dan kain." },
  { icon: Ruler, t: "Pengukuran", d: "Ukur langsung di butik atau panduan ukur jarak jauh via WhatsApp." },
  { icon: Scissors, t: "Proses jahit & fitting", d: "Fitting bertahap agar potongan pas dan nyaman." },
  { icon: Shirt, t: "Busana siap pakai", d: "Dirapikan, disetrika, dan siap Anda kenakan di hari penting." },
];

// 10 tahap lengkap di halaman Proses Jahit
export const FULL_STEPS = [
  { t: "Konsultasi awal", time: "Hari 1", d: "Ceritakan acara, tanggal, dan selera Anda lewat WhatsApp atau datang ke butik. Bawa referensi foto jika ada.", you: "Tanggal acara, referensi model, perkiraan anggaran." },
  { t: "Pilih model & bahan", time: "Hari 1–3", d: "Kami menyarankan model dan bahan sesuai bentuk tubuh dan cuaca. Anda menerima rincian biaya sebelum lanjut.", you: "Persetujuan model, bahan, dan warna." },
  { t: "Uang muka & jadwal", time: "Hari 3–4", d: "Setelah biaya disepakati, uang muka mengunci slot jahit dan bahan dipesan. Tanggal fitting dan target selesai dicatat.", you: "Uang muka sesuai kesepakatan." },
  { t: "Pengukuran", time: "Hari 4–5", d: "Pengukuran di butik, atau panduan ukur jarak jauh dengan video call bagi yang di luar kota.", you: "Pakaian yang biasa dikenakan saat acara, termasuk alas kaki dan dalaman." },
  { t: "Pola & potong kain", time: "Hari 5–8", d: "Pola dibuat dari ukuran Anda, lalu kain dipotong dan disiapkan untuk dijahit.", you: "Tidak ada, kami yang mengerjakan." },
  { t: "Jahit & detail", time: "Hari 8–18", d: "Penjahitan utama, lalu pemasangan detail seperti bordir, manik, kancing, dan furing.", you: "Kabar bila ada perubahan rencana acara." },
  { t: "Fitting pertama", time: "Hari 18–20", d: "Anda mencoba busana yang sudah berbentuk. Kami catat semua penyesuaian pada lingkar, panjang, dan kenyamanan gerak.", you: "Datang fitting atau kirim foto dan video bila jarak jauh." },
  { t: "Revisi", time: "Hari 20–23", d: "Penyesuaian dikerjakan sesuai catatan fitting. Lihat aturan revisi di bawah.", you: "Konfirmasi bahwa revisi sudah sesuai." },
  { t: "Fitting akhir & pelunasan", time: "Hari 23–25", d: "Pengecekan terakhir, perapian, dan setrika. Pelunasan dilakukan di tahap ini.", you: "Pelunasan sisa pembayaran." },
  { t: "Busana siap pakai", time: "Hari 25+", d: "Busana diambil di butik atau dikirim dengan kemasan aman. Tips perawatan ikut kami sertakan.", you: "Mengambil atau menerima busana." },
];

// Aturan revisi
export const REVISI = [
  "Revisi ukuran gratis sampai 2 kali setelah fitting pertama, selama tidak mengubah model.",
  "Perubahan kecil seperti panjang, lingkar, atau lebar lengan dikerjakan dalam 2–3 hari.",
  "Perubahan model, bahan, atau penambahan detail setelah proses jahit berjalan bisa dikenakan biaya tambahan. Kami hitung dulu sebelum dikerjakan.",
  "Jika berat badan berubah drastis setelah pengukuran, kami ukur ulang agar hasilnya tetap pas.",
  "Informasikan revisi paling lambat 7 hari sebelum acara agar waktunya cukup.",
];

// Pertanyaan umum
export const FAQ = [
  ["Berapa lama pengerjaan paling cepat?", "Blazer atau kebaya sederhana sekitar 10–14 hari. Kebaya manik dan paket pernikahan butuh waktu lebih panjang. Tanyakan lewat WA untuk jadwal kejar tayang."],
  ["Bisa pesan dari luar kota?", "Bisa. Pengukuran lewat panduan ukur dan video call, fitting lewat foto dan video, lalu busana dikirim."],
  ["Apakah bisa membawa kain sendiri?", "Bisa. Kami cek dulu jenis kainnya agar cocok dengan model yang dipilih."],
];
