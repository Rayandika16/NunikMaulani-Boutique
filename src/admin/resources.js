// Definisi bagian CMS. Tambah kolom/bagian baru cukup dengan mengedit daftar ini
// (dan menambah kolomnya di supabase/schema.sql).
// type: text | textarea | image | checkbox
export const RESOURCES = [
  {
    id: "works", label: "Katalog Jahitan", table: "works", titleKey: "title", subKey: "category", imageKey: "image_url",
    help: "Tampil di halaman Koleksi. Kategori yang Anda ketik otomatis menjadi tombol filter.",
    fields: [
      { key: "title", label: "Nama model", type: "text", required: true },
      { key: "category", label: "Kategori", type: "text", required: true, hint: "Contoh: Kebaya Modern, Blazer Pria" },
      { key: "image_url", label: "Foto", type: "image" },
      { key: "description", label: "Deskripsi singkat", type: "textarea" },
      { key: "suitable_for", label: "Cocok untuk", type: "text", hint: "Contoh: Wisuda, lamaran" },
      { key: "duration", label: "Estimasi pengerjaan", type: "text", hint: "Contoh: 10–14 hari" },
      { key: "published", label: "Tampilkan di situs", type: "checkbox", def: true },
    ],
  },
  {
    id: "collections", label: "Kategori Beranda", table: "collections", titleKey: "title", imageKey: "image_url",
    help: "Kartu kategori utama di beranda (disarankan 3).",
    fields: [
      { key: "title", label: "Judul", type: "text", required: true },
      { key: "note", label: "Keterangan", type: "textarea" },
      { key: "image_url", label: "Foto", type: "image" },
      { key: "message", label: "Pesan WhatsApp otomatis", type: "textarea", hint: "Terisi otomatis saat pengunjung menekan tombol tanya" },
      { key: "tall", label: "Foto tinggi (3:4)", type: "checkbox", def: true },
    ],
  },
  {
    id: "steps", label: "Tahap Proses", table: "process_steps", titleKey: "title", subKey: "time",
    help: "Tahap pada halaman Proses Jahit, sesuai urutan.",
    fields: [
      { key: "title", label: "Nama tahap", type: "text", required: true },
      { key: "time", label: "Perkiraan waktu", type: "text", hint: "Contoh: Hari 1–3" },
      { key: "description", label: "Penjelasan", type: "textarea" },
      { key: "client_task", label: "Yang perlu dari pelanggan", type: "textarea" },
    ],
  },
  { id: "revisions", label: "Aturan Revisi", table: "revisions", titleKey: "text", fields: [{ key: "text", label: "Aturan", type: "textarea", required: true }] },
  {
    id: "faqs", label: "FAQ", table: "faqs", titleKey: "question",
    fields: [
      { key: "question", label: "Pertanyaan", type: "text", required: true },
      { key: "answer", label: "Jawaban", type: "textarea", required: true },
    ],
  },
  { id: "perks", label: "Fasilitas Paket Nikah", table: "perks", titleKey: "text", fields: [{ key: "text", label: "Fasilitas", type: "text", required: true }] },
];

// Pengaturan umum (tabel settings, pasangan key-value)
export const SETTINGS_FIELDS = [
  { key: "name", label: "Nama butik" },
  { key: "wa_number", label: "Nomor WhatsApp", hint: "Format 62..., tanpa + dan spasi. Contoh: 6281234567890" },
  { key: "tagline", label: "Tagline footer" },
  { key: "address", label: "Alamat" },
  { key: "hours", label: "Jam operasional" },
  { key: "instagram", label: "Tautan Instagram" },
  { key: "tiktok", label: "Tautan TikTok" },
];
