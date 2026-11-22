import { serif, sans, wa } from "../../config/site.js";
import { useText } from "../../context/ContentContext.jsx";
import Cta from "../../components/ui/Cta.jsx";
import Watermark from "../../components/ui/Watermark.jsx";

export default function ProsesHero() {
  const t = useText();
  return (
    <section className="relative overflow-hidden pt-14 pb-10 md:pt-20">
      <Watermark text="PROSES" from={40} to={-80} className="top-4" />
      <div className="relative max-w-5xl mx-auto px-5 md:px-10">
        <h1 className="text-5xl md:text-7xl font-medium max-w-3xl" style={serif}>{t("proses.hero.title")}</h1>
        <p className="mt-4 max-w-xl opacity-75" style={sans}>{t("proses.hero.intro")}</p>
        <Cta href={wa(t("proses.hero.wa"))} className="mt-7 w-full sm:w-auto">{t("proses.hero.cta")}</Cta>
      </div>
    </section>
  );
}
