import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { isConfigured } from "../lib/supabase.js";
import { fetchContent, LOCAL } from "../lib/content.js";
import { setWaNumber } from "../config/site.js";
import { PAGE_TEXT } from "../data/pageText.js";

const Ctx = createContext(null);

// Menyediakan konten situs ke seluruh komponen. refresh() dipanggil admin setelah menyimpan.
export function ContentProvider({ children }) {
  const [content, setContent] = useState(LOCAL);
  const [ready, setReady] = useState(!isConfigured);

  const refresh = useCallback(async () => {
    const c = await fetchContent();
    setWaNumber(c.settings.wa_number);
    setContent(c);
    setReady(true);
  }, []);

  useEffect(() => { if (isConfigured) refresh(); }, [refresh]);

  return <Ctx.Provider value={{ ...content, ready, refresh }}>{children}</Ctx.Provider>;
}

export const useContent = () => useContext(Ctx);

// Ambil teks/gambar section: t("home.hero.title"). Nilai CMS menimpa bawaan.
export function useText() {
  const { settings } = useContent();
  return (key) => settings[key] ?? PAGE_TEXT[key] ?? "";
}
