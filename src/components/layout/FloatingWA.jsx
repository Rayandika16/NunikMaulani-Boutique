import { MessageCircle } from "lucide-react";
import { C, wa } from "../../config/site.js";

export default function FloatingWA() {
  return (
    <a href={wa("Halo Nunik Maulani, saya ingin bertanya tentang busana.")} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp"
      className="fixed z-50 right-4 bottom-4 md:right-6 md:bottom-6 w-14 h-14 rounded-full grid place-items-center shadow-lg"
      style={{ background: C.ink, color: C.bg, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <MessageCircle size={24} />
    </a>
  );
}
