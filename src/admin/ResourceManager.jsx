import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase.js";
import { C, sans } from "../config/site.js";
import { inputCls, inputStyle, btn } from "./ui.js";
import ImageField from "./ImageField.jsx";

const blank = (fields) => Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? (f.def ?? false) : ""]));

function Form({ cfg, row, nextOrder, onCancel, onSaved }) {
  const [v, setV] = useState(row ? { ...blank(cfg.fields), ...row } : blank(cfg.fields));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, val) => setV((p) => ({ ...p, [k]: val }));

  const save = async (e) => {
    e.preventDefault();
    const missing = cfg.fields.find((f) => f.required && !String(v[f.key] || "").trim());
    if (missing) return setErr(`"${missing.label}" wajib diisi.`);
    setBusy(true); setErr("");
    const payload = Object.fromEntries(cfg.fields.map((f) => [f.key, v[f.key]]));
    const { error } = row
      ? await supabase.from(cfg.table).update(payload).eq("id", row.id)
      : await supabase.from(cfg.table).insert({ ...payload, sort_order: nextOrder });
    setBusy(false);
    if (error) return setErr(error.message);
    onSaved();
  };

  return (
    <form onSubmit={save} className="p-5 mb-6 space-y-4 border" style={{ borderColor: C.gold, background: C.linen }}>
      <h3 className="text-lg font-semibold">{row ? "Ubah data" : "Tambah data"}</h3>
      {cfg.fields.map((f) => (
        <label key={f.key} className="block text-sm">
          <span className="font-medium">{f.label}{f.required && " *"}</span>
          {f.hint && <span className="block text-xs opacity-60">{f.hint}</span>}
          <div className="mt-1">
            {f.type === "textarea" && <textarea rows={3} className={inputCls} style={inputStyle} value={v[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />}
            {f.type === "text" && <input className={inputCls} style={inputStyle} value={v[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />}
            {f.type === "image" && <ImageField value={v[f.key]} onChange={(x) => set(f.key, x)} />}
            {f.type === "checkbox" && <input type="checkbox" className="w-5 h-5" checked={!!v[f.key]} onChange={(e) => set(f.key, e.target.checked)} />}
          </div>
        </label>
      ))}
      {err && <p className="text-sm text-red-700">{err}</p>}
      <div className="flex gap-3">
        <button disabled={busy} className={btn} style={{ background: C.ink, color: C.bg }}>{busy ? "Menyimpan…" : "Simpan"}</button>
        <button type="button" onClick={onCancel} className={btn} style={{ border: `1px solid ${C.gold}` }}>Batal</button>
      </div>
    </form>
  );
}

export default function ResourceManager({ cfg, onChange }) {
  const [rows, setRows] = useState(null);
  const [editing, setEditing] = useState(null); // null | "new" | row
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(cfg.table).select("*")
      .order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    if (error) setErr(error.message); else { setRows(data); setErr(""); }
  }, [cfg.table]);

  useEffect(() => { setRows(null); setEditing(null); load(); }, [load]);

  const afterChange = async () => { await load(); onChange?.(); };
  const remove = async (r) => {
    if (!window.confirm(`Hapus "${String(r[cfg.titleKey]).slice(0, 60)}"?`)) return;
    const { error } = await supabase.from(cfg.table).delete().eq("id", r.id);
    if (error) return setErr(error.message);
    afterChange();
  };
  const move = async (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    const res = await Promise.all(next.map((r, idx) => supabase.from(cfg.table).update({ sort_order: idx }).eq("id", r.id)));
    const bad = res.find((x) => x.error);
    if (bad) return setErr(bad.error.message);
    afterChange();
  };

  return (
    <div style={sans}>
      {cfg.help && <p className="mb-4 text-sm opacity-70">{cfg.help}</p>}
      {err && <p className="mb-4 text-sm text-red-700">{err}</p>}
      {editing ? (
        <Form key={editing.id || "new"} cfg={cfg} row={editing === "new" ? null : editing} nextOrder={rows?.length || 0}
          onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); afterChange(); }} />
      ) : (
        <button onClick={() => setEditing("new")} className={`${btn} mb-5`} style={{ background: C.ink, color: C.bg }}><Plus size={16} /> Tambah</button>
      )}
      {rows === null ? <p className="text-sm opacity-60">Memuat…</p> : rows.length === 0 ? (
        <p className="text-sm opacity-60">Belum ada data. Situs memakai contoh bawaan sampai Anda menambah data di sini.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r, i) => (
            <li key={r.id} className="flex items-center gap-3 p-3 border bg-white" style={{ borderColor: `${C.gold}55` }}>
              {cfg.imageKey && (r[cfg.imageKey]
                ? <img src={r[cfg.imageKey]} alt="" className="w-12 h-16 object-cover shrink-0" />
                : <div className="w-12 h-16 shrink-0" style={{ background: C.linen }} />)}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{r[cfg.titleKey]}</p>
                {cfg.subKey && <p className="text-xs opacity-60 truncate">{r[cfg.subKey]}</p>}
                {r.published === false && <p className="text-xs text-red-700">Disembunyikan</p>}
              </div>
              <button aria-label="Naik" onClick={() => move(i, -1)} disabled={i === 0} className="p-2 disabled:opacity-30"><ArrowUp size={16} /></button>
              <button aria-label="Turun" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="p-2 disabled:opacity-30"><ArrowDown size={16} /></button>
              <button aria-label="Ubah" onClick={() => setEditing(r)} className="p-2"><Pencil size={16} /></button>
              <button aria-label="Hapus" onClick={() => remove(r)} className="p-2 text-red-700"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
