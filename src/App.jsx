import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { SiteHead } from "./seo/Head.jsx";

// Bosh sahifadan boshqa sahifalar faqat ochilganda yuklanadi — birinchi ochilish tezroq
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const Company = lazy(() => import("./pages/Company.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/xarita") window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <SiteHead />
      <ScrollToTop />
      <Header />
      <main className="page" key={pathname}>
        <Suspense fallback={<div style={{ minHeight: "70vh" }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/xarita" element={<Home />} />
            <Route path="/loyihalar" element={<Projects />} />
            <Route path="/loyiha/:id" element={<ProjectDetail />} />
            <Route path="/kompaniya" element={<Company />} />
            <Route path="/aloqa" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
