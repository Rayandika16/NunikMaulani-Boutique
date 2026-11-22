import { C, serif, sans, wa } from "../../config/site.js";
import Cta from "../../components/ui/Cta.jsx";
import Frame from "../../components/ui/Frame.jsx";

export default function CollectionCard({ c }) {
  return (
    <article className="p-3 sm:p-4 md:p-5" style={{ background: C.linen }}>
      <Frame src={c.src} label={c.title} className={c.tall ? "aspect-[3/4]" : "aspect-[4/4.2]"} />
      <h3 className="mt-5 text-3xl font-medium" style={serif}>{c.title}</h3>
      <p className="mt-1 text-sm opacity-70" style={sans}>{c.note}</p>
      <Cta href={wa(c.msg)} solid={false} className="mt-5 w-full">Tanya Detail & Harga via WA</Cta>
    </article>
  );
}
