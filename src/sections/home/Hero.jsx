import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { C, serif, sans, wa } from "../../config/site.js";
import { useIntensity } from "../../hooks/useIntensity.js";
import { useText } from "../../context/ContentContext.jsx";
import Cta from "../../components/ui/Cta.jsx";
import Frame from "../../components/ui/Frame.jsx";
import Watermark from "../../components/ui/Watermark.jsx";

export default function Hero() {
  const t = useText();
  const ref = useRef(null);
  const k = useIntensity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -160 * k]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -380 * k]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, 120 * k]);
  const yT = useTransform(scrollYProgress, [0, 1], [0, 90 * k]);
  return (
    <section ref={ref} className="relative md:min-h-[100svh] overflow-hidden pb-12 md:pb-0">
      <Watermark text="NUNIK MAULANI" from={10} to={-70} className="top-[8%]" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-10 md:pt-20 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
        <motion.div style={{ y: yT }} className="md:col-span-6 z-10">
          <p className="text-sm mb-5" style={{ ...sans, color: C.gold }}>{t("home.hero.eyebrow")}</p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl leading-[0.98] font-medium" style={serif}>{t("home.hero.title")}</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed opacity-75" style={sans}>
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <Cta href={wa(t("home.hero.wa"))} className="w-full sm:w-auto">{t("home.hero.cta")}</Cta>
            <a href="#/koleksi" className="inline-flex items-center min-h-12 px-4 text-sm underline underline-offset-4" style={sans}>{t("home.hero.link")}</a>
          </div>
        </motion.div>
        <div className="md:col-span-6 relative h-[400px] sm:h-[480px] md:h-[640px] w-full max-w-md mx-auto md:max-w-none">
          <Frame src={t("home.hero.image1")} label="Kebaya kontemporer" style={{ y: yA }} className="absolute left-0 top-0 w-[56%] h-[62%]" />
          <Frame src={t("home.hero.image2")} label="Blazer pria" style={{ y: yB }} className="absolute right-0 top-[10%] w-[40%] h-[48%]" />
          <Frame src={t("home.hero.image3")} label="Sarimbit pernikahan" style={{ y: yC }} className="absolute left-[22%] bottom-0 w-[50%] h-[44%]" />
        </div>
      </div>
    </section>
  );
}
