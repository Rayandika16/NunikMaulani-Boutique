import { supabase } from "../lib/supabase.js";
import { uploadImage } from "../lib/storage.js";
import { LOCAL } from "../lib/content.js";

// Menyalin data contoh (src/data) ke Supabase, termasuk mengunggah gambar contohnya.
// Hanya mengisi tabel yang masih kosong, jadi aman dijalankan berulang.
export async function seedSample(log = () => {}) {
  const cache = new Map();
  const up = async (url, name) => {
    if (!url) return "";
    if (cache.has(url)) return cache.get(url);
    const blob = await (await fetch(url)).blob();
    const out = await uploadImage(new File([blob], `${name}.svg`, { type: blob.type || "image/svg+xml" }));
    cache.set(url, out);
    return out;
  };
  const isEmpty = async (t) => {
    const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
    if (error) throw new Error(`${t}: ${error.message}`);
    return !count;
  };
  const insert = async (t, rows) => {
    const { error } = await supabase.from(t).insert(rows);
    if (error) throw new Error(`${t}: ${error.message}`);
  };
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (await isEmpty("works")) {
    log("Mengunggah katalog…");
    const rows = [];
    for (const [i, w] of LOCAL.works.entries())
      rows.push({ title: w.t, category: w.c, description: w.d, suitable_for: w.w, duration: w.time, image_url: await up(w.src, slug(w.t)), sort_order: i });
    await insert("works", rows);
  }
  if (await isEmpty("collections")) {
    log("Mengunggah kategori beranda…");
    const rows = [];
    for (const [i, c] of LOCAL.collections.entries())
      rows.push({ title: c.title, note: c.note, message: c.msg, tall: c.tall, image_url: await up(c.src, "beranda-" + slug(c.title)), sort_order: i });
    await insert("collections", rows);
  }
  if (await isEmpty("process_steps"))
    await insert("process_steps", LOCAL.fullSteps.map((s, i) => ({ title: s.t, time: s.time, description: s.d, client_task: s.you, sort_order: i })));
  if (await isEmpty("revisions")) await insert("revisions", LOCAL.revisi.map((text, i) => ({ text, sort_order: i })));
  if (await isEmpty("faqs")) await insert("faqs", LOCAL.faq.map(([question, answer], i) => ({ question, answer, sort_order: i })));
  if (await isEmpty("perks")) await insert("perks", LOCAL.perks.map((text, i) => ({ text, sort_order: i })));
  // Pengaturan: upsert (isi yang belum ada, jangan bentrok dengan yang sudah tersimpan)
  const { data: existing } = await supabase.from("settings").select("key");
  const have = new Set((existing || []).map((r) => r.key));
  const missing = Object.entries(LOCAL.settings).filter(([key]) => !key.includes(".") && !have.has(key)).map(([key, value]) => ({ key, value }));
  if (missing.length) {
    const { error } = await supabase.from("settings").upsert(missing, { onConflict: "key" });
    if (error) throw new Error(`settings: ${error.message}`);
  }
  log("Selesai.");
}
