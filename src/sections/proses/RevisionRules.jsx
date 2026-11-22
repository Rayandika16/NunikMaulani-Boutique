import { Check } from "lucide-react";
import { C, serif, sans } from "../../config/site.js";
import { useContent, useText } from "../../context/ContentContext.jsx";

export default function RevisionRules() {
  const { revisi: REVISI } = useContent();
  const t = useText();
  return (
    <section className="py-16 md:py-24" style={{ background: C.ink, color: C.bg }}>
      <div className="max-w-5xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-medium leading-none" style={serif}>{t("proses.revisi.title")}</h2>
          <p className="mt-4 opacity-75" style={sans}>{t("proses.revisi.intro")}</p>
        </div>
        <ul className="space-y-4" style={sans}>
          {REVISI.map((r) => (
            <li key={r} className="flex gap-3 pb-4 border-b text-sm md:text-base" style={{ borderColor: "#ffffff22" }}>
              <Check size={20} color={C.gold} className="shrink-0 mt-0.5" /> <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
