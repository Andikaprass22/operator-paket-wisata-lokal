import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { site } from "./content/site";
import HomePage from "./pages/HomePage";

const PackageDetailPage = lazy(() => import("./pages/PackageDetailPage"));

export default function App() {
  return (
    <SiteLayout site={site}>
      <Suspense
        fallback={
          <div className="px-4 py-24 text-center text-charcoal/70">Memuat…</div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paket/:slug" element={<PackageDetailPage />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  );
}
