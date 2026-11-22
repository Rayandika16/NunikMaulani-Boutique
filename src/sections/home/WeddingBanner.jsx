import { Check } from "lucide-react";
import { C, serif, sans, wa } from "../../config/site.js";
import { useContent, useText } from "../../context/ContentContext.jsx";
import Cta from "../../components/ui/Cta.jsx";
import Watermark from "../../components/ui/Watermark.jsx";

export default function WeddingBanner() {
  const { perks: PERKS } = useContent();
  const t = useText();
  return (
    <section id="pernikahan" className="relative overflow-hidden py-20 md:py-32" style={{ background: C.ink, color: C.bg }}>
      <Watermark text="HERITAGE" from={50} to={-90} className="top-6" />
      <div className="relative max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium leading-none" style={serif}>{t("home.wedding.title")}</h2>
          <p className="mt-5 max-w-md opacity-75" style={sans}>{t("home.wedding.desc")}</p>
          <Cta href={wa(t("home.wedding.wa"))} className="mt-8 w-full sm:w-auto !bg-[#A6894B] !border-[#A6894B] !text-[#18181B]">{t("home.wedding.cta")}</Cta>
        </div>
        <ul className="space-y-4" style={sans}>
          {PERKS.map((p) => (
            <li key={p} className="flex gap-3 pb-4 border-b" style={{ borderColor: "#ffffff22" }}>
              <Check size={20} color={C.gold} className="shrink-0 mt-0.5" /> <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
