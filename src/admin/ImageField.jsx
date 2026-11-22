import { useState } from "react";
import { Upload } from "lucide-react";
import { uploadImage } from "../lib/storage.js";
import { C } from "../config/site.js";
import { inputCls, inputStyle } from "./ui.js";

export default function ImageField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return setErr("Ukuran maksimal 5 MB.");
    setBusy(true); setErr("");
    try { onChange(await uploadImage(file)); }
    catch (x) { setErr(x.message || "Gagal mengunggah."); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-2">
      {value && <img src={value} alt="Pratinjau" className="h-32 w-auto border" style={{ borderColor: `${C.gold}66` }} />}
      <label className="inline-flex items-center gap-2 min-h-10 px-4 text-sm border cursor-pointer" style={{ borderColor: C.gold }}>
        <Upload size={16} /> {busy ? "Mengunggah…" : "Unggah gambar"}
        <input type="file" accept="image/*" className="hidden" onChange={pick} disabled={busy} />
      </label>
      <input className={inputCls} style={inputStyle} placeholder="atau tempel URL gambar" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      {err && <p className="text-sm text-red-700">{err}</p>}
    </div>
  );
}
