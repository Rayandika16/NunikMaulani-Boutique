import { useState } from "react";
import { Menu, X } from "lucide-react";
import { C, serif, sans, wa } from "../../config/site.js";
import { ROUTES } from "../../routes.jsx";
import Cta from "../ui/Cta.jsx";
import { useContent } from "../../context/ContentContext.jsx";

const MSG = "Halo Nunik Maulani, saya ingin konsultasi busana.";

function NavLink({ r, active, className = "", onClick }) {
  return (
    <a href={`#${r.path}`} onClick={onClick} aria-current={active ? "page" : undefined}
      className={`transition-opacity hover:opacity-60 ${className}`}
      style={active ? { color: C.gold } : undefined}>
      {r.label}
    </a>
  );
}

export default function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const { settings } = useContent();
  const links = ROUTES.filter((r) => r.nav);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: `${C.bg}E6`, borderBottom: `1px solid ${C.gold}33` }}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 h-16">
        <a href="#/" className="text-2xl font-semibold" style={serif}>{settings.name}</a>
        <div className="hidden md:flex items-center gap-8 text-sm" style={sans}>
          {links.map((r) => <NavLink key={r.path} r={r} active={route === r.path} />)}
          <Cta href={wa(MSG)} className="!min-h-10 !px-4">Konsultasi WA</Cta>
        </div>
        <button className="md:hidden p-2 -mr-2" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4" style={sans}>
          {links.map((r) => <NavLink key={r.path} r={r} active={route === r.path} className="py-1" onClick={() => setOpen(false)} />)}
          <Cta href={wa(MSG)}>Konsultasi WA</Cta>
        </div>
      )}
    </header>
  );
}
