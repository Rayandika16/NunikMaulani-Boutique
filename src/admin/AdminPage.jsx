import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { isConfigured, supabase } from "../lib/supabase.js";
import { useContent } from "../context/ContentContext.jsx";
import { C, serif, sans } from "../config/site.js";
import { RESOURCES } from "./resources.js";
import { ADMIN_PAGES } from "./pages.js";
import { inputCls, inputStyle, btn } from "./ui.js";
import ResourceManager from "./ResourceManager.jsx";
import SectionForm from "./SectionForm.jsx";
import { seedSample } from "./seed.js";

const Wrap = ({ children }) => (
  <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" style={sans}>{children}</section>
);

function Setup() {
  return (
    <Wrap>
      <h1 className="text-4xl font-medium mb-4" style={serif}>CMS belum terhubung ke Supabase</h1>
      <p className="max-w-xl text-sm opacity-80">
        Salin <code>.env.example</code> menjadi <code>.env</code>, isi <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code>,
        jalankan <code>supabase/schema.sql</code> di SQL Editor, lalu mulai ulang <code>npm run dev</code>. Langkah lengkap ada di README.md.
      </p>
    </Wrap>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr("Email atau kata sandi salah.");
  };
  return (
    <Wrap>
      <form onSubmit={submit} className="max-w-sm space-y-4">
        <h1 className="text-4xl font-medium" style={serif}>Masuk admin</h1>
        <input type="email" required placeholder="Email" autoComplete="username" className={inputCls} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required placeholder="Kata sandi" autoComplete="current-password" className={inputCls} style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <p className="text-sm text-red-700">{err}</p>}
        <button disabled={busy} className={`${btn} w-full`} style={{ background: C.ink, color: C.bg }}>{busy ? "Masuk…" : "Masuk"}</button>
      </form>
    </Wrap>
  );
}

function Dashboard({ email }) {
  const { refresh } = useContent();
  const [pageId, setPageId] = useState(ADMIN_PAGES[0].id);
  const [secId, setSecId] = useState(ADMIN_PAGES[0].sections[0].id);
  const [seedMsg, setSeedMsg] = useState("");
  const [version, setVersion] = useState(0);
  const page = ADMIN_PAGES.find((p) => p.id === pageId);
  const section = page.sections.find((x) => x.id === secId) || page.sections[0];
  const cfg = RESOURCES.find((r) => r.id === section.resource);

  const goPage = (id) => { setPageId(id); setSecId(ADMIN_PAGES.find((p) => p.id === id).sections[0].id); };
  const seed = async () => {
    if (!window.confirm("Salin data contoh ke database? Hanya tabel yang masih kosong yang diisi.")) return;
    try { await seedSample(setSeedMsg); await refresh(); setVersion((n) => n + 1); }
    catch (e) { setSeedMsg("Gagal: " + e.message); }
  };
  const tab = (active) => ({ border: `1px solid ${C.gold}`, background: active ? C.ink : "transparent", color: active ? C.bg : C.ink });

  return (
    <Wrap>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-4xl font-medium" style={serif}>Panel admin</h1>
          <p className="text-xs opacity-60">{email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={seed} className={btn} style={{ border: `1px solid ${C.gold}` }}>Impor data contoh</button>
          <button onClick={() => supabase.auth.signOut()} className={btn} style={{ border: `1px solid ${C.gold}` }}><LogOut size={16} /> Keluar</button>
        </div>
      </div>
      {seedMsg && <p className="mb-4 text-sm">{seedMsg}</p>}

      <p className="text-xs uppercase tracking-wide opacity-60 mb-2">Halaman</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {ADMIN_PAGES.map((p) => (
          <button key={p.id} onClick={() => goPage(p.id)} className="shrink-0 min-h-11 px-5 text-sm font-semibold" style={tab(pageId === p.id)}>{p.label}</button>
        ))}
      </div>
      <p className="text-xs uppercase tracking-wide opacity-60 mb-2">Bagian di halaman {page.label}</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {page.sections.map((x) => (
          <button key={x.id} onClick={() => setSecId(x.id)} className="shrink-0 min-h-10 px-4 text-sm" style={tab(section.id === x.id)}>{x.label}</button>
        ))}
      </div>

      <div key={`${pageId}-${section.id}-${version}`}>
        {section.form && (
          <>
            {cfg && <h2 className="text-2xl font-medium mb-4" style={serif}>Teks bagian ini</h2>}
            <SectionForm fields={section.form} onChange={refresh} />
          </>
        )}
        {cfg && (
          <>
            {section.form && <h2 className="text-2xl font-medium mb-4" style={serif}>{cfg.label}</h2>}
            <ResourceManager cfg={cfg} onChange={refresh} />
          </>
        )}
      </div>
    </Wrap>
  );
}

function Gate() {
  const [session, setSession] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setIsAdmin(null);
    if (session) supabase.rpc("is_admin").then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  if (session === undefined) return <Wrap><p className="text-sm opacity-60">Memuat…</p></Wrap>;
  if (!session) return <Login />;
  if (isAdmin === null) return <Wrap><p className="text-sm opacity-60">Memeriksa akses…</p></Wrap>;
  if (!isAdmin) return (
    <Wrap>
      <h1 className="text-3xl font-medium mb-3" style={serif}>Akun ini bukan admin</h1>
      <p className="text-sm opacity-80 mb-4">Tambahkan {session.user.email} ke tabel <code>admins</code> di Supabase.</p>
      <button onClick={() => supabase.auth.signOut()} className={btn} style={{ border: `1px solid ${C.gold}` }}>Keluar</button>
    </Wrap>
  );
  return <Dashboard email={session.user.email} />;
}

export default function AdminPage() {
  return isConfigured ? <Gate /> : <Setup />;
}
