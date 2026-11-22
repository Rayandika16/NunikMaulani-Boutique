import { MessageCircle } from "lucide-react";
import { C, sans } from "../../config/site.js";

// Tombol ajakan (CTA). `solid` = tombol gelap, selain itu outline emas.
export default function Cta({ href, children, solid = true, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 min-h-12 px-6 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      style={{ ...sans, background: solid ? C.ink : "transparent", color: solid ? C.bg : C.ink, border: `1px solid ${solid ? C.ink : C.gold}`, outlineColor: C.gold }}>
      <MessageCircle size={16} /> {children}
    </a>
  );
}
