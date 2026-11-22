import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { C, serif, sans } from "../../config/site.js";
import { useContent } from "../../context/ContentContext.jsx";

export default function Timeline() {
  const { fullSteps: FULL_STEPS } = useContent();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <section ref={ref} className="relative py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <div className="relative pl-12 md:pl-20">
          <div className="absolute left-4 md:left-7 top-2 bottom-2 w-px" style={{ background: `${C.gold}44` }} />
          <motion.div style={{ scaleY: grow, background: C.gold, transformOrigin: "top" }} className="absolute left-4 md:left-7 top-2 bottom-2 w-px" />
          {FULL_STEPS.map((s, i) => (
            <div key={s.t} className="relative pb-10 last:pb-0">
              <span className="absolute -left-12 md:-left-20 top-0 w-9 h-9 md:w-14 md:h-14 rounded-full grid place-items-center text-sm md:text-xl font-semibold" style={{ background: C.bg, border: `1px solid ${C.gold}`, ...serif }}>{i + 1}</span>
              <p className="text-xs" style={{ ...sans, color: C.gold }}>{s.time}</p>
              <h3 className="text-2xl md:text-3xl font-medium" style={serif}>{s.t}</h3>
              <p className="mt-1 max-w-xl text-sm md:text-base opacity-80" style={sans}>{s.d}</p>
              <p className="mt-2 max-w-xl text-sm" style={sans}><span style={{ color: C.gold }}>Dari Anda:</span> {s.you}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
