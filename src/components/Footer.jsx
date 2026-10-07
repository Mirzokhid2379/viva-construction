import { Link } from "react-router-dom";
import { Brand } from "./Header.jsx";
import { useI18n, useProjects } from "../i18n/index.jsx";
import { SocialIcons } from "./SocialLinks.jsx";
import { CONTACTS } from "../data/company.js";

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
            <p style={{ margin: "16px 0 16px", maxWidth: "38ch" }}>{t.footer.about}</p>
            <div className="f-contact">
              <a className="f-tel" href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`}>{CONTACTS.phone}</a>
              <a href={CONTACTS.map} target="_blank" rel="noopener noreferrer">{t.contact.officeAddress}</a>
            </div>
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
