import { useState } from "react";
import { motion } from "framer-motion";
import { serif, sans } from "../config/site.js";
import { useContent, useText } from "../context/ContentContext.jsx";
import Watermark from "../components/ui/Watermark.jsx";
import CategoryTabs from "../sections/koleksi/CategoryTabs.jsx";
import WorkCard from "../sections/koleksi/WorkCard.jsx";

export default function KoleksiPage() {
  const { works: WORKS, cats: CATS } = useContent();
  const t = useText();
  const [cat, setCat] = useState("Semua");
  const list = WORKS.filter((w) => cat === "Semua" || w.c === cat);
  return (
    <section className="relative overflow-hidden pt-14 pb-24 md:pt-20">
      <Watermark text="PORTOFOLIO" from={40} to={-80} className="top-4" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <h1 className="text-5xl md:text-7xl font-medium max-w-3xl" style={serif}>{t("koleksi.title")}</h1>
        <p className="mt-4 max-w-xl opacity-75" style={sans}>{t("koleksi.intro")}</p>
        <CategoryTabs cats={CATS} active={cat} onChange={setCat} />
        <motion.div layout className="mt-8 grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {list.map((w, i) => <WorkCard key={w.t} work={w} offset={i % 3 === 1} />)}
        </motion.div>
      </div>
    </section>
  );
}
