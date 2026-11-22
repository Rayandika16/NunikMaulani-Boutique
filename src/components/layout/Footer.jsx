import { Instagram, Music2, MapPin, Clock } from "lucide-react";
import { useContent } from "../../context/ContentContext.jsx";
import { C, serif, sans } from "../../config/site.js";

export default function Footer() {
  const { settings } = useContent();
  return (
    <footer className="px-5 md:px-10 py-16" style={sans}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <p className="text-4xl font-semibold" style={serif}>{settings.name}</p>
          <p className="mt-2 text-sm opacity-70 max-w-xs">{settings.tagline}</p>
        </div>
        <div className="text-sm space-y-3">
          <p className="flex gap-2"><MapPin size={16} color={C.gold} className="shrink-0 mt-0.5" />{settings.address}</p>
          <p className="flex gap-2"><Clock size={16} color={C.gold} className="shrink-0 mt-0.5" />{settings.hours}</p>
        </div>
        <div className="flex gap-6 items-start text-sm">
          <a href={settings.instagram} className="flex items-center gap-2 min-h-11 underline underline-offset-4"><Instagram size={16} />Instagram</a>
          <a href={settings.tiktok} className="flex items-center gap-2 min-h-11 underline underline-offset-4"><Music2 size={16} />TikTok</a>
        </div>
      </div>
      <p className="max-w-7xl mx-auto mt-12 text-xs opacity-50">© {new Date().getFullYear()} {settings.name}</p>
    </footer>
  );
}
