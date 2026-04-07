import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// ─── Shared Components ───────────────────────────────────────────────────────
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// ─── Lazy-load Pages ─────────────────────────────────────────────────────────
const BrokerList       = lazy(() => import("./pages/BrokerList"));
const BrokerReview     = lazy(() => import("./pages/BrokerReview"));
const BrokerCategory   = lazy(() => import("./pages/BrokerCategory"));
const BrokerFinder     = lazy(() => import("./pages/BrokerFinder"));
const Methodology      = lazy(() => import("./pages/Methodology"));
const About            = lazy(() => import("./pages/About"));
const Contact          = lazy(() => import("./pages/Contact"));
const TopBrokersKenya  = lazy(() => import("./pages/TopBrokersKenya"));
const Blog             = lazy(() => import("./pages/Blog"));
const BlogPost         = lazy(() => import("./pages/BlogPost"));
const NotFound         = lazy(() => import("./pages/NotFound"));

// ─── Broker-Specific Components ──────────────────────────────────────────────
const Exness           = lazy(() => import("./components/Exness"));
const JustMarkets      = lazy(() => import("./components/JustMarkets"));
const HFM              = lazy(() => import("./components/HFM"));
const XM               = lazy(() => import("./components/XM"));
const FxPro            = lazy(() => import("./components/FxPro"));
const FBS              = lazy(() => import("./components/FBS"));
const FxPesa           = lazy(() => import("./components/FxPesa"));
const FPMarkets        = lazy(() => import("./components/FpMarkets"));
const Deriv            = lazy(() => import("./components/Deriv"));
const Fusion           = lazy(() => import("./components/Fusion"));

// ─── Google Analytics Tracker ────────────────────────────────────────────────
/**
 * This component listens for route changes and sends a page_view event 
 * to Google Analytics (G-VRHV05ZYNC).
 */
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-VRHV05ZYNC', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

// ─── Loading Fallback ────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#07101E] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-500 text-sm font-sans tracking-wide">Loading...</span>
      </div>
    </div>
  );
}

// ─── Main Application ────────────────────────────────────────────────────────
export default function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Track page changes automatically */}
        <AnalyticsTracker />

        <div className="flex flex-col min-h-screen bg-[#07101E] selection:bg-amber-400/30">
          <Navbar />

          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Core ── */}
                <Route path="/" element={<Home />} />

                {/* ── Broker Listing & Specific Reviews ── */}
                <Route path="/brokers" element={<BrokerList />} />
                
                {/* Specific Broker Routes (Priority) */}
                <Route path="/brokers/exness" element={<Exness />} />
                <Route path="/brokers/justmarkets" element={<JustMarkets />} />
                <Route path="/brokers/hfm" element={<HFM />} />
                <Route path="/brokers/xm" element={<XM />} />
                <Route path="/brokers/fxpro" element={<FxPro />} />
                <Route path="/brokers/fbs" element={<FBS />} />
                <Route path="/brokers/fxpesa" element={<FxPesa />} />
                <Route path="/brokers/fpmarkets" element={<FPMarkets />} />
                <Route path="/brokers/deriv" element={<Deriv />} />
                <Route path="/brokers/fusion-markets" element={<Fusion />} />

                {/* Dynamic Review Route (Fallback for other slugs) */}
                <Route path="/brokers/:slug" element={<BrokerReview />} />

                {/* ── Category & SEO Hubs ── */}
                <Route path="/brokers/compare" element={<BrokerCategory />} />
                <Route path="/brokers/best-forex-brokers-kenya" element={<TopBrokersKenya />} />
                <Route path="/brokers/category" element={<BrokerCategory />} />
                <Route path="/brokers/category/:slug" element={<BrokerCategory />} />

                {/* ── Tools & Information ── */}
                <Route path="/broker-finder" element={<BrokerFinder />} />
                <Route path="/methodology" element={<Methodology />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* ── Blog ── */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* ── 404 Page ── */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}