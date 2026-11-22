import { motion } from "framer-motion";
import { C, serif, sans, wa } from "../../config/site.js";
import Cta from "../../components/ui/Cta.jsx";
import Frame from "../../components/ui/Frame.jsx";

export default function WorkCard({ work: w, offset }) {
  return (
    <motion.article layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 md:p-4 ${offset ? "lg:mt-12" : ""}`} style={{ background: C.linen }}>
      <Frame src={w.src} label={w.t} className="aspect-[3/4]" />
      <p className="mt-4 text-sm" style={{ ...sans, color: C.gold }}>{w.c}</p>
      <h3 className="text-2xl font-medium leading-tight" style={serif}>{w.t}</h3>
      <p className="mt-1 text-sm opacity-75" style={sans}>{w.d}</p>
      <p className="mt-3 text-xs opacity-70" style={sans}>Cocok untuk: {w.w}. Estimasi: {w.time}</p>
      <Cta href={wa(`Halo Nunik Maulani, saya tertarik dengan model "${w.t}" (${w.c}). Boleh tanya bahan, harga, dan estimasi waktunya?`)} solid={false} className="mt-4 w-full">Pesan Model Serupa</Cta>
    </motion.article>
  );
}
