import { C, sans } from "../../config/site.js";

export default function CategoryTabs({ cats, active, onChange }) {
  return (
    <div role="tablist" className="mt-8 -mx-5 px-5 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2" style={sans}>
      {cats.map((c) => (
        <button key={c} role="tab" aria-selected={active === c} onClick={() => onChange(c)}
          className="shrink-0 min-h-11 px-4 text-sm transition-colors"
          style={{ border: `1px solid ${C.gold}`, background: active === c ? C.ink : "transparent", color: active === c ? C.bg : C.ink }}>
          {c}
        </button>
      ))}
    </div>
  );
}
