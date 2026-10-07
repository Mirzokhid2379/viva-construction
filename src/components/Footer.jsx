import { Link } from "react-router-dom";
import { Brand } from "./Header.jsx";
import { useI18n, useProjects } from "../i18n/index.jsx";
import { SocialIcons } from "./SocialLinks.jsx";

const FOOTER_PROJECTS = ["fargona-bess", "nurobod", "sazagan", "buxoro", "tolimarjon"];

export default function Footer() {
  const { t } = useI18n();
  const projects = useProjects();
  return (
    <footer className="tex">
      <div className="wrap">
        <div className="g">
          <div>
            <div className="brand" style={{ color: "var(--night-ink)" }}><Brand size={40} /></div>
            <p style={{ margin: "16px 0 20px", maxWidth: "38ch" }}>{t.footer.about}</p>
            <SocialIcons />
          </div>
          <div>
            <h4>{t.footer.site}</h4>
            <Link to="/loyihalar">{t.nav.projects}</Link>
            <Link to="/xarita">{t.footer.mapLink}</Link>
            <Link to="/kompaniya">{t.nav.company}</Link>
            <Link to="/aloqa">{t.nav.contact}</Link>
          </div>
          <div>
            <h4>{t.footer.projects}</h4>
            {FOOTER_PROJECTS.map((id) => {
              const p = projects.find((x) => x.id === id);
              return <Link key={id} to={`/loyiha/${id}`}>{p.t}</Link>;
            })}
          </div>
        </div>
        <div className="b">
          <span>© 2026 VIVA Construction</span>
          <span>{t.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
