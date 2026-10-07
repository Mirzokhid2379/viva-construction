import { useState } from "react";
import { PageTitle } from "../seo/Head.jsx";
import { CONTACTS } from "../data/company.js";
import { useI18n } from "../i18n/index.jsx";
import { Arrow, PageBand } from "../components/Blocks.jsx";

function CopyButton({ text }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }, () => {});
    } catch { /* clipboard mavjud emas */ }
  };
  return <button className="copy" type="button" onClick={copy}>{done ? t.contact.copied : t.contact.copy}</button>;
}

export default function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const empty = { name: "", contact: "", type: 0, power: "", scope: "" };
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.contact.trim().length < 5) {
      setMsg("err");
      return;
    }
    // TODO: so‘rovni backend, pochta yoki Telegram botga yuboring. Obyekt turi: c.types[form.type]
    setMsg("ok");
    setForm(empty);
  };

  return (
    <>
      <PageTitle title={t.nav.contact} />
      <PageBand crumb={t.nav.contact} title={c.title}>{c.lead}</PageBand>
      <section>
        <div className="wrap">
          <div className="cgrid">
            <div className="cc">
              <h3>VIVA Construction</h3>
              <div className="r"><span>{c.director}</span><b>{c.directorName}</b></div>
              <div className="r"><span>{c.phone}</span><div className="row"><b className="num">{CONTACTS.phone}</b><CopyButton text={CONTACTS.phone} /></div></div>
              <div className="r"><span>{c.email}</span><div className="row"><b>{CONTACTS.email}</b><CopyButton text={CONTACTS.email} /></div></div>
              <div className="r"><span>{c.instagram}</span><b><a href={CONTACTS.instagramUrl} target="_blank" rel="noopener noreferrer">{CONTACTS.instagram}</a></b></div>
              <div className="r"><span>{c.address}</span><b>{c.vivaAddress}</b></div>
            </div>
            <div className="cc">
              <h3>OMEGA Energy Group</h3>
              <div className="r"><span>{c.address}</span><b>{c.omegaAddress}</b></div>
              <div className="r"><span>{c.activity}</span><b>{c.omegaActivity}</b></div>
              <div className="r"><span>{c.docs}</span><b>{c.omegaDocs}</b></div>
            </div>
          </div>

          <form className="form" noValidate onSubmit={submit}>
            <div className="full"><h3 style={{ fontSize: 24 }}>{c.formTitle}</h3></div>
            <div><label htmlFor="n">{c.name}</label><input id="n" autoComplete="organization" value={form.name} onChange={set("name")} /></div>
            <div><label htmlFor="ph">{c.contact}</label><input id="ph" autoComplete="tel" value={form.contact} onChange={set("contact")} /></div>
            <div>
              <label htmlFor="tp">{c.type}</label>
              <select id="tp" value={form.type} onChange={set("type")}>
                {c.types.map((x, i) => <option key={i} value={i}>{x}</option>)}
              </select>
            </div>
            <div><label htmlFor="mw">{c.power}</label><input id="mw" placeholder={c.powerPh} value={form.power} onChange={set("power")} /></div>
            <div className="full"><label htmlFor="tx">{c.scope}</label><textarea id="tx" placeholder={c.scopePh} value={form.scope} onChange={set("scope")} /></div>
            <div className="full"><button className="cta amber" type="submit">{c.send} <Arrow /></button></div>
            {msg && <div className={`full msg ${msg === "ok" ? "ok" : "warn"}`}>{msg === "ok" ? c.ok : c.err}</div>}
          </form>
        </div>
      </section>
    </>
  );
}
