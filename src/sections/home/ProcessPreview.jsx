import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { C, serif, sans } from "../../config/site.js";
import { STEPS } from "../../data/process.js";
import { useText } from "../../context/ContentContext.jsx";

export default function ProcessPreview() {
  const t = useText();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <section id="proses" ref={ref} className="relative py-24 md:py-32" style={{ background: `${C.linen}CC` }}>
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium" style={serif}>{t("home.steps.title")}</h2>
        <a href="#/proses" className="inline-flex items-center min-h-11 mt-3 text-sm underline underline-offset-4" style={sans}>{t("home.steps.link")}</a>
        <div className="relative mt-14 pl-12 md:pl-20">
          <div className="absolute left-4 md:left-7 top-2 bottom-2 w-px" style={{ background: `${C.gold}44` }} />
          <motion.div style={{ scaleY: grow, background: C.gold, transformOrigin: "top" }} className="absolute left-4 md:left-7 top-2 bottom-2 w-px" />
          {STEPS.map(({ icon: I }, i) => (
            <div key={i} className="relative pb-12 last:pb-0">
              <span className="absolute -left-12 md:-left-20 top-0 w-9 h-9 md:w-14 md:h-14 rounded-full grid place-items-center" style={{ background: C.bg, border: `1px solid ${C.gold}` }}>
                <I size={18} color={C.gold} />
              </span>
              <h3 className="text-2xl md:text-3xl font-medium" style={serif}>{i + 1}. {t(`home.steps.${i + 1}.title`)}</h3>
              <p className="mt-1 max-w-lg text-sm md:text-base opacity-75" style={sans}>{t(`home.steps.${i + 1}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
