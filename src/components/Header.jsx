import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import VivaMark from "./VivaMark.jsx";
import { LangSwitch, useI18n } from "../i18n/index.jsx";
import { SocialIcons } from "./SocialLinks.jsx";

export function Brand({ size = 34 }) {
  const { t } = useI18n();
  return (
    <>
      <VivaMark size={size} />
      <span>
        <b>VIVA CONSTRUCTION</b>
        <small>{t.brandSub}</small>
      </span>
    </>
  );
}

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    ["/loyihalar", t.nav.projects],
    ["/jarayon", t.process.nav],
    ["/xarita", t.nav.map],
    ["/kompaniya", t.nav.company],
    ["/aloqa", t.nav.contact],
  ];
  const isProjects = pathname.startsWith("/loyiha");

  return (
    <>
      <header className="top">
        <div className="wrap">
          <Link className="brand" to="/" aria-label={`VIVA Construction — ${t.nav.home}`}>
            <Brand />
          </Link>
          <nav className="nav" aria-label="Main">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive || (to === "/loyihalar" && isProjects) ? "on" : "")}>
                {label}
              </NavLink>
            ))}
          </nav>
          <LangSwitch className="top-langs" />
          <Link className="cta amber sm" to="/aloqa">{t.nav.cta}</Link>
          <button className="burger" type="button" aria-label={t.nav.open} onClick={() => setOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16" /></svg>
          </button>
        </div>
      </header>
      {open && (
        <div className="drawer">
          <div className="drawer-top">
            <LangSwitch className="drawer-langs" />
            <button className="burger x" type="button" aria-label={t.nav.close} style={{ display: "grid" }} onClick={() => setOpen(false)}>×</button>
          </div>
          <Link to="/">{t.nav.home}</Link>
          {links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
          <SocialIcons />
        </div>
      )}
    </>
  );
}
