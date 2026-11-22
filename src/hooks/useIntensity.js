import { useEffect, useState } from "react";

// Skala intensitas parallax: 1 = penuh, 0.3 = mobile (-70%), 0 = reduce motion.
export function useIntensity() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const f = () => setM(q.matches);
    f(); q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduce ? 0 : m ? 0.3 : 1; // mobile: intensitas dikurangi 70%
}
