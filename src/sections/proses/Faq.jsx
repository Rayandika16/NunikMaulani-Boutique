import { useState } from "react";
import { C, serif, sans, wa } from "../../config/site.js";
import { useContent, useText } from "../../context/ContentContext.jsx";
import Cta from "../../components/ui/Cta.jsx";

export default function Faq() {
  const { faq: FAQ } = useContent();
  const t = useText();
  const [open, setOpen] = useState(0);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5 md:px-10" style={sans}>
        <h2 className="text-4xl md:text-5xl font-medium mb-6" style={serif}>{t("proses.faq.title")}</h2>
        {FAQ.map(([q, a], i) => (
          <div key={q} className="border-b" style={{ borderColor: `${C.gold}55` }}>
            <button className="w-full min-h-14 py-3 flex justify-between items-center text-left gap-4" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="font-medium">{q}</span><span style={{ color: C.gold }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="pb-4 text-sm opacity-75">{a}</p>}
          </div>
        ))}
        <Cta href={wa(t("proses.faq.wa"))} className="mt-8 w-full sm:w-auto">{t("proses.faq.cta")}</Cta>
      </div>
    </section>
  );
}
