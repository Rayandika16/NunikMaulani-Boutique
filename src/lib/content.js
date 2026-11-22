import { supabase } from "./supabase.js";
import { WA_NUMBER, SITE } from "../config/site.js";
import { WORKS, CATS } from "../data/works.js";
import { COLLECTIONS, PERKS } from "../data/collections.js";
import { FULL_STEPS, REVISI, FAQ } from "../data/process.js";
import { PAGE_TEXT } from "../data/pageText.js";

// Konten bawaan (dipakai jika Supabase belum diatur / tabel masih kosong).
export const LOCAL = {
  works: WORKS, cats: CATS, collections: COLLECTIONS, fullSteps: FULL_STEPS,
  revisi: REVISI, faq: FAQ, perks: PERKS,
  settings: { ...SITE, wa_number: WA_NUMBER, ...PAGE_TEXT },
};

const table = async (name, build) => {
  let q = supabase.from(name).select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
  if (build) q = build(q);
  const { data, error } = await q;
  return error || !data?.length ? null : data;
};

// Ambil semua konten dari Supabase dan ubah ke bentuk yang dipakai komponen.
export async function fetchContent() {
  try {
    const [w, c, s, r, f, p, st] = await Promise.all([
      table("works", (q) => q.eq("published", true)),
      table("collections"), table("process_steps"), table("revisions"),
      table("faqs"), table("perks"),
      supabase.from("settings").select("*").then(({ data }) => data),
    ]);
    const works = w ? w.map((x) => ({ t: x.title, c: x.category, src: x.image_url || "", d: x.description, w: x.suitable_for, time: x.duration })) : LOCAL.works;
    const cats = w ? ["Semua", ...new Set(w.map((x) => x.category))] : LOCAL.cats;
    const settings = { ...LOCAL.settings };
    (st || []).forEach(({ key, value }) => { if (value) settings[key] = value; });
    return {
      works, cats,
      collections: c ? c.map((x) => ({ id: x.id, title: x.title, note: x.note, src: x.image_url || "", tall: x.tall, msg: x.message })) : LOCAL.collections,
      fullSteps: s ? s.map((x) => ({ t: x.title, time: x.time, d: x.description, you: x.client_task })) : LOCAL.fullSteps,
      revisi: r ? r.map((x) => x.text) : LOCAL.revisi,
      faq: f ? f.map((x) => [x.question, x.answer]) : LOCAL.faq,
      perks: p ? p.map((x) => x.text) : LOCAL.perks,
      settings,
    };
  } catch {
    return LOCAL;
  }
}
