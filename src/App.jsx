import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";

// ── Lazy-load future pages to keep initial bundle small ──────────────────────
import { lazy, Suspense } from "react";

const BrokerList       = lazy(() => import("./pages/BrokerList"));
const BrokerReview     = lazy(() => import("./pages/BrokerReview"));
const BrokerCategory   = lazy(() => import("./pages/BrokerCategory"));
const BrokerFinder     = lazy(() => import("./pages/BrokerFinder"));
const Methodology      = lazy(() => import("./pages/Methodology"));
const About            = lazy(() => import("./pages/About"));
const Contact          = lazy(() => import("./pages/Contact"));
const TopBrokersKenya  = lazy(() => import("./pages/TopBrokersKenya"));
const Exness           = lazy(() => import("./components/Exness"));
const JustMarkets      = lazy(() => import("./components/JustMarkets"));
const HFM              = lazy(() => import("./components/HFM"));
const XM               = lazy(() => import("./components/XM"));
const FxPro            = lazy(() => import("./components/FxPro"));
const FBS              = lazy(() => import("./components/FBS"));
const FxPesa           = lazy(() => import("./components/FxPesa"));
const FPMarkets         = lazy(() => import("./components/FpMarkets"));
const Deriv            = lazy(() => import("./components/Deriv"));
const Fusion      = lazy(() => import("./components/Fusion"));
const NotFound         = lazy(() => import("./pages/NotFound"));

// ── Shared layout shells (build these next) ──────────────────────────────────
import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";

// ── Full-page loading fallback ────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#07101E] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-500 text-sm font-sans">Loading…</span>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#07101E]">
          <Navbar />

          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Core ── */}
                <Route path="/"                       element={<Home />} />

                {/* ── Broker listing & reviews ── */}
                <Route path="/brokers"                element={<BrokerList />} />
                <Route path="/brokers/:slug"          element={<BrokerReview />} />
                <Route path="/brokers/exness"                  element={<Exness />} />
                <Route path="/brokers/justmarkets"           element={<JustMarkets />} />
                <Route path="/brokers/hfm"                   element={<HFM />} />
                <Route path="/brokers/xm"                    element={<XM />} />
                <Route path="/brokers/fxpro"                 element={<FxPro />} />
                <Route path="/brokers/fbs"                   element={<FBS />} />
                <Route path="/brokers/fxpesa"                element={<FxPesa />} />
                <Route path="/brokers/fpmarkets"            element={<FPMarkets />} />
                <Route path="/brokers/deriv"               element={<Deriv />} />
                <Route path="/brokers/fusion-markets"      element={<Fusion />} />

                {/* ── Category pages (SEO hub pages) ── */}
                <Route path="/brokers/compare"              element={<BrokerCategory />} />
                <Route path="/brokers/best-forex-brokers-kenya" element={<TopBrokersKenya />} />
                {/* e.g. /brokers/best-forex-brokers-kenya */}
                <Route path="/brokers/category/:slug" element={<BrokerCategory />} />
                <Route path="/brokers/category"         element={<BrokerCategory />} />

                {/* ── Tools ── */}
                <Route path="/broker-finder"          element={<BrokerFinder />} />
                <Route path="/methodology"            element={<Methodology />} />

                {/* ── Static ── */}
                <Route path="/about"                  element={<About />} />
                <Route path="/contact"                element={<Contact />} />

                {/* ── 404 ── */}
                <Route path="*"                       element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
