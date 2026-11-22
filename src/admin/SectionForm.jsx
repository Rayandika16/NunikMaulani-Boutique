import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { LOCAL } from "../lib/content.js";
import { C, sans } from "../config/site.js";
import { inputCls, inputStyle, btn } from "./ui.js";
import ImageField from "./ImageField.jsx";

// Form teks/gambar satu section. Disimpan ke tabel settings (key-value).
// Nilai yang sama dengan bawaan disimpan kosong, jadi tetap mengikuti teks bawaan.
export default function SectionForm({ fields, onChange }) {
  const [v, setV] = useState(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setV(null);
    supabase.from("settings").select("*").then(({ data }) => {
      const s = { ...LOCAL.settings };
      (data || []).forEach((r) => { if (r.value) s[r.key] = r.value; });
      setV(s);
    });
  }, [fields]);

  const save = async (e) => {
    e.preventDefault(); setBusy(true); setMsg("");
    const rows = fields.map((f) => {
      const val = String(v[f.key] ?? "").trim();
      return { key: f.key, value: val === String(LOCAL.settings[f.key] ?? "") ? "" : val };
    });
    const { error } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
    setBusy(false);
    setMsg(error ? error.message : "Tersimpan. Situs sudah diperbarui.");
    if (!error) onChange?.();
  };

  if (!v) return <p className="text-sm opacity-60">Memuat…</p>;
  const set = (k, val) => setV((p) => ({ ...p, [k]: val }));
  return (
    <form onSubmit={save} className="space-y-4 max-w-2xl mb-10" style={sans}>
      {fields.map((f) => (
        <label key={f.key} className="block text-sm">
          <span className="font-medium">{f.label}</span>
          {f.hint && <span className="block text-xs opacity-60">{f.hint}</span>}
          <div className="mt-1">
            {f.type === "textarea" && <textarea rows={3} className={inputCls} style={inputStyle} value={v[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />}
            {f.type === "image" && <ImageField value={v[f.key]} onChange={(x) => set(f.key, x)} />}
            {(!f.type || f.type === "text") && <input className={inputCls} style={inputStyle} value={v[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />}
          </div>
        </label>
      ))}
      <p className="text-xs opacity-60">Mengosongkan kolom akan mengembalikan ke teks bawaan.</p>
      <button disabled={busy} className={btn} style={{ background: C.ink, color: C.bg }}>{busy ? "Menyimpan…" : "Simpan teks"}</button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
