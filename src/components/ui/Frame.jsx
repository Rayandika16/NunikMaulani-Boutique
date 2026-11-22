import { motion } from "framer-motion";
import { C, sans } from "../../config/site.js";

export default function Frame({ src, label, className = "", style }) {
  return (
    <motion.div style={style} className={`relative overflow-hidden ${className}`}>
      {src ? (
        <img src={src} alt={label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-end p-4" style={{ background: `linear-gradient(160deg, ${C.linen}, #E6DFD1)` }}>
          <span className="text-xs tracking-wide" style={{ ...sans, color: C.gold }}>{label}</span>
        </div>
      )}
      <div className="absolute inset-3 border pointer-events-none" style={{ borderColor: `${C.gold}88` }} />
    </motion.div>
  );
}
