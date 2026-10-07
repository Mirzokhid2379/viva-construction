import { Link } from "react-router-dom";
import { useI18n } from "../i18n/index.jsx";
import { PageTitle } from "../seo/Head.jsx";
import { Watermark } from "../components/VivaMark.jsx";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="band tex">
      <PageTitle title={t.notFound.title} />
      <Watermark />
      <div className="wrap">
        <h1>{t.notFound.title}</h1>
        <p><Link to="/">{t.notFound.back}</Link></p>
      </div>
    </div>
  );
}
