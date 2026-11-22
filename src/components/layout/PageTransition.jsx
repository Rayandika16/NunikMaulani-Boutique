import { AnimatePresence, motion } from "framer-motion";
import { C } from "../../config/site.js";

// Transisi antar halaman: halaman lama memudar, halaman baru naik halus,
// plus garis emas tipis yang menyapu di atas layar.
const page = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.28, ease: "easeIn" } },
};

export default function PageTransition({ routeKey, children }) {
  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={routeKey} variants={page} initial="initial" animate="animate" exit="exit">
          {children}
        </motion.div>
      </AnimatePresence>
      <motion.div
        key={`bar-${routeKey}`}
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left pointer-events-none"
        style={{ background: C.gold }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </>
  );
}
