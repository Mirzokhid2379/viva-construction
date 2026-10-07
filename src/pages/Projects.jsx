import { PROJECTS } from "../data/projects.js";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { ProjectGrid } from "../components/ProjectCard.jsx";
import MapSection from "../components/UzMap.jsx";
import { Closing, PageBand } from "../components/Blocks.jsx";

export default function Projects() {
  const { t } = useI18n();
  const done = PROJECTS.filter((p) => p.st === "done").length;
  const now = PROJECTS.length - done;
  return (
    <>
      <PageTitle title={t.nav.projects} />
      <PageBand crumb={t.nav.projects} title={t.projectsPage.title}>
        {t.projectsPage.lead(PROJECTS.length, done, now)}
      </PageBand>
      <section>
        <div className="wrap"><ProjectGrid /></div>
      </section>
      <MapSection />
      <Closing />
    </>
  );
}
