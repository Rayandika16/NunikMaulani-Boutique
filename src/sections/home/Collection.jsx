import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { serif, sans } from "../../config/site.js";
import { useIntensity } from "../../hooks/useIntensity.js";
import { useContent, useText } from "../../context/ContentContext.jsx";
import Watermark from "../../components/ui/Watermark.jsx";
import CollectionCard from "./CollectionCard.jsx";

export default function Collection() {
  const { collections: COLLECTIONS } = useContent();
  const t = useText();
  const ref = useRef(null);
  const k = useIntensity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yL = useTransform(scrollYProgress, [0, 1], [120 * k, -120 * k]);
  const yR = useTransform(scrollYProgress, [0, 1], [-60 * k, 260 * k]);
  const right = COLLECTIONS.filter((_, i) => i % 3 === 2);
  const left = COLLECTIONS.filter((_, i) => i % 3 !== 2);
  return (
    <section id="koleksi" ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <Watermark text="BESPOKE" from={60} to={-80} className="top-10" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium max-w-2xl" style={serif}>{t("home.cards.title")}</h2>
        <a href="#/koleksi" className="inline-flex items-center min-h-11 mt-6 text-sm underline underline-offset-4" style={sans}>{t("home.cards.link")}</a>
        <div className="mt-6 md:mt-8 grid md:grid-cols-12 gap-8 md:gap-10 md:pb-40">
          <motion.div style={{ y: yL }} className="md:col-span-7 grid sm:grid-cols-2 gap-8 md:gap-8">
            {left.map((c, i) => <div key={c.id} className={i === 1 ? "sm:mt-24" : ""}><CollectionCard c={c} /></div>)}
          </motion.div>
          <motion.div style={{ y: yR }} className="md:col-span-5 md:mt-10">
            {right.map((c) => <CollectionCard key={c.id} c={c} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
