import { motion, useScroll, useTransform } from "framer-motion";
import { C } from "../../config/site.js";
import { useIntensity } from "../../hooks/useIntensity.js";

export default function BatikPattern() {
  const { scrollYProgress } = useScroll();
  const k = useIntensity();
  const y = useTransform(scrollYProgress, [0, 1], [0, -900 * k]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 120 * k]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 6 * k]);
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: C.bg }}>
      <motion.svg style={{ y, x, rotate, opacity: 0.06 }} className="absolute -left-[10%] -top-[20%] w-[120%] h-[260%]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kawung" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={C.gold} strokeWidth="1.2">
              <ellipse cx="30" cy="30" rx="26" ry="11" /><ellipse cx="30" cy="30" rx="11" ry="26" />
              <ellipse cx="90" cy="30" rx="26" ry="11" /><ellipse cx="90" cy="30" rx="11" ry="26" />
              <ellipse cx="30" cy="90" rx="26" ry="11" /><ellipse cx="30" cy="90" rx="11" ry="26" />
              <ellipse cx="90" cy="90" rx="26" ry="11" /><ellipse cx="90" cy="90" rx="11" ry="26" />
              <circle cx="60" cy="60" r="3" fill={C.gold} />
              <path d="M60 60 C70 44 84 44 90 52 M60 60 C50 76 36 76 30 68" strokeLinecap="round" />
              <path d="M84 47 q6 -8 12 -2 q-6 8 -12 2z M36 73 q-6 8 -12 2 q6 -8 12 -2z" fill={C.gold} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kawung)" />
      </motion.svg>
    </div>
  );
}
