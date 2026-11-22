import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { C, serif } from "../../config/site.js";
import { useIntensity } from "../../hooks/useIntensity.js";

export default function Watermark({ text, from = 20, to = -60, className = "" }) {
  const ref = useRef(null);
  const k = useIntensity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [`${from * k}%`, `${to * k}%`]);
  return (
    <div ref={ref} aria-hidden className={`absolute inset-x-0 overflow-hidden pointer-events-none select-none ${className}`}>
      <motion.div style={{ x, ...serif, color: C.gold, opacity: 0.13 }} className="whitespace-nowrap text-[26vw] md:text-[18vw] leading-none italic font-medium">
        {text}
      </motion.div>
    </div>
  );
}
