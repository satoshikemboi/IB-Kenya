import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Static data ─────────────────────────────────────────────────────────────

const featuredBrokers = [
  {
    id: 1,
    name: "Exness",
    logo: "/exness.png",
    rating: 4.8,
    minDeposit: "$10",
    regulation: "FCA, CySEC, FSA",
    spread: "From 0.0 pips",
    badge: "Top Rated",
    badgeColor: "gold",
    affiliate: "https://one.exnessonelink.com/a/1sh0vxrgqd",
    change: "+2.4%",
    positive: true,
  },
  {
    id: 2,
    name: "XM",
    logo: "/xm.png",
    rating: 4.6,
    minDeposit: "$5",
    regulation: "ASIC, CySEC, IFSC",
    spread: "From 0.6 pips",
    badge: "Best for Beginners",
    badgeColor: "blue",
    affiliate: "https://affs.click/MbQNk",
    change: "+1.1%",
    positive: true,
  },
  {
    id: 3,
    name: "HFM (HotForex)",
    logo: "/hfm.png",
    rating: 4.5,
    minDeposit: "$5",
    regulation: "FCA, DFSA, FSCA",
    spread: "From 0.0 pips",
    badge: "Low Spread",
    badgeColor: "green",
    affiliate: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020",
    change: "-0.3%",
    positive: false,
  },
  {
    id: 4,
    name: "JustMarkets",
    logo: "/justmarkets.png",
    rating: 4.7,
    minDeposit: "$5",
    regulation: "FCA, ASIC, DFSA",
    spread: "From 0.0 pips",
    badge: "Best ECN",
    badgeColor: "blue",
    affiliate: "https://one.justmarkets.link/a/17thm0lpq8",
    change: "+3.2%",
    positive: true,
  },
];

const whyTrustUs = [
  {
    icon: "🛡️",
    title: "Independent Reviews",
    desc: "Our analysts test each broker with real funds. No paid placements skew our rankings.",
  },
  {
    icon: "📊",
    title: "50+ Data Points",
    desc: "Every broker is scored on spreads, regulation, deposits, platforms, and support.",
  },
  {
    icon: "🇰🇪",
    title: "Kenya-Focused",
    desc: "We prioritise brokers that accept M-Pesa, support KES accounts, and serve Kenyan traders.",
  },
  {
    icon: "🔄",
    title: "Regularly Updated",
    desc: "Broker conditions change. We review and refresh scores every quarter.",
  },
];

const categories = [
  { label: "Best Forex Brokers Kenya", slug: "best-forex-brokers-kenya"},
  { label: "Lowest Spread Brokers", slug: "lowest-spread-brokers"},
  { label: "Best MT4 & MT5 Brokers", slug: "mt4-mt5-brokers"},
  { label: "Brokers Accepting M-Pesa", slug: "mpesa-brokers"},
  { label: "Best Regulated Brokers", slug: "regulated-brokers" },
  { label: "Best for Beginners", slug: "brokers-for-beginners" },
];

const faqs = [
  {
    q: "Is forex trading legal in Kenya?",
    a: "Yes. Forex trading is legal in Kenya. While the Capital Markets Authority (CMA) regulates some brokers locally, Kenyan traders also legally trade with internationally regulated brokers under FCA, ASIC, and CySEC.",
  },
  {
    q: "Which forex broker is best for Kenyan traders?",
    a: "Exness and XM are consistently top-rated for Kenyan traders due to M-Pesa support, low minimum deposits, and strong regulation. See our full rankings for a detailed comparison.",
  },
  {
    q: "Can I deposit with M-Pesa?",
    a: "Yes. Several top brokers including Exness, HFM, and XM support M-Pesa deposits and withdrawals, making it easy to fund your account without a bank transfer.",
  },
  {
    q: "How do I choose a safe forex broker?",
    a: "Look for brokers regulated by Tier-1 authorities (FCA, ASIC, CySEC), check their client fund segregation policy, and verify their history of payouts. Our reviews cover all these factors.",
  },
];

// ─── Ticker data ──────────────────────────────────────────────────────────────
const tickerItems = [
  { pair: "EUR/USD", price: "1.0842", change: "+0.12%" },
  { pair: "GBP/USD", price: "1.2731", change: "-0.08%" },
  { pair: "USD/KES", price: "129.45", change: "+0.34%" },
  { pair: "XAU/USD", price: "2,318.40", change: "+0.65%" },
  { pair: "USD/JPY", price: "151.82", change: "-0.21%" },
  { pair: "BTC/USD", price: "68,420", change: "+1.42%" },
  { pair: "EUR/GBP", price: "0.8514", change: "+0.05%" },
  { pair: "USD/ZAR", price: "18.62", change: "-0.18%" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < full ? "text-amber-400" : i === full && half ? "text-amber-400/50" : "text-slate-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-amber-400 text-xs font-bold ml-1">{rating}</span>
    </div>
  );
}

function MiniSparkline({ positive }) {
  const points = positive
    ? "0,18 8,15 16,12 24,14 32,9 40,6 48,3"
    : "0,3 8,6 16,5 24,9 32,11 40,14 48,16";
  return (
    <svg width="48" height="20" className="opacity-80">
      <defs>
        <linearGradient id={`sg-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive ? "#22c55e" : "#ef4444"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={positive ? "#22c55e" : "#ef4444"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,20 ${points} 48,20`}
        fill={`url(#sg-${positive})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroBrokerCard({ broker, index }) {
  const badgeStyles = {
    gold: "bg-amber-400/15 text-amber-400 border-amber-400/25",
    blue: "bg-sky-400/15 text-sky-400 border-sky-400/25",
    green: "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
    purple: "bg-violet-400/15 text-violet-400 border-violet-400/25",
  };

  return (
    <div
      className="group relative bg-[#0D1E35]/80 backdrop-blur-sm border border-white/8 rounded-2xl p-4 hover:border-amber-400/30 transition-all duration-300 hover:bg-[#0D1E35]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Rank badge */}
      <div className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-[#0A1628] border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-bold">
        {index + 1}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className=" bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
            <img
              src={broker.logo}
              alt={broker.name}
              className="w-10 h-10 object-contain"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <span className="text-white font-bold text-xs hidden w-6 h-6 items-center justify-center">
              {broker.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{broker.name}</p>
            <StarRating rating={broker.rating} />
          </div>
        </div>
        <MiniSparkline positive={broker.positive} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs">
          <div>
            <p className="text-slate-500 uppercase tracking-wider text-[10px]">Deposit</p>
            <p className="text-white font-medium mt-0.5">{broker.minDeposit}</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider text-[10px]">Spread</p>
            <p className="text-white font-medium mt-0.5">{broker.spread}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeStyles[broker.badgeColor]}`}>
          {broker.badge}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <a
          href={broker.affiliate}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold text-center py-2 rounded-lg transition-colors duration-200"
        >
          Open Account
        </a>
        <Link
          to={`/brokers/${broker.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="border border-white/12 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium text-center py-2 rounded-lg transition-all duration-200"
        >
          Read Review
        </Link>
      </div>
    </div>
  );
}

function FullBrokerCard({ broker }) {
  const badgeStyles = {
    gold: "bg-amber-400/12 text-amber-400 border-amber-400/25",
    blue: "bg-sky-400/12 text-sky-400 border-sky-400/25",
    green: "bg-emerald-400/12 text-emerald-400 border-emerald-400/25",
    purple: "bg-violet-400/12 text-violet-400 border-violet-400/25",
  };

  return (
    <article className="group relative bg-[#0B1929] border border-white/8 rounded-2xl p-5 flex flex-col gap-4 hover:border-amber-400/35 transition-all duration-300">
      <span className={`absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full border font-medium ${badgeStyles[broker.badgeColor]}`}>
        {broker.badge}
      </span>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/8 shrink-0">
          <img src={broker.logo} alt={`${broker.name} logo`} className="w-7 h-7 object-contain" loading="lazy"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
          <span className="text-white font-bold text-xs hidden w-7 h-7 items-center justify-center">
            {broker.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-white font-semibold text-base">{broker.name}</h3>
          <StarRating rating={broker.rating} />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-white/4 rounded-xl p-2.5">
          <dt className="text-slate-500 text-[10px] uppercase tracking-wider">Min. Deposit</dt>
          <dd className="text-white font-semibold mt-0.5">{broker.minDeposit}</dd>
        </div>
        <div className="bg-white/4 rounded-xl p-2.5">
          <dt className="text-slate-500 text-[10px] uppercase tracking-wider">Spread</dt>
          <dd className="text-white font-semibold mt-0.5">{broker.spread}</dd>
        </div>
        <div className="bg-white/4 rounded-xl p-2.5 col-span-2">
          <dt className="text-slate-500 text-[10px] uppercase tracking-wider">Regulation</dt>
          <dd className="text-white font-semibold mt-0.5">{broker.regulation}</dd>
        </div>
      </dl>

      <div className="flex gap-2 mt-auto">
        <a href={broker.affiliate} target="_blank" rel="noopener noreferrer sponsored"
          className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-900 text-sm font-bold text-center py-2.5 rounded-xl transition-colors duration-200">
          Open Account
        </a>
        <Link to={`/brokers/${broker.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="flex-1 border border-white/15 hover:border-amber-400/40 text-slate-400 hover:text-white text-sm font-medium text-center py-2.5 rounded-xl transition-all duration-200">
          Read Review
        </Link>
      </div>
    </article>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-amber-400/30 bg-[#0B1929]" : "border-white/8 bg-[#0B1929]/50"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left"
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        <span className={`text-amber-400 text-xl font-light shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
        <p className="px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/8 pt-4">{a}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Best Forex Brokers in Kenya 2026 | FxBrokers.co.ke</title>
        <meta name="description" content="Compare the top forex brokers in Kenya rated by expert analysts. Find regulated brokers that accept M-Pesa, offer low spreads, and suit Kenyan traders." />
        <meta name="keywords" content="forex brokers Kenya, best forex broker Kenya, M-Pesa forex, forex trading Kenya, regulated forex brokers" />
        <link rel="canonical" href="https://fxbrokers.co.ke/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best Forex Brokers in Kenya 2025 | FxBrokers.co.ke" />
        <meta property="og:description" content="Compare top-rated forex brokers for Kenyan traders. Expert reviews, live spreads, and M-Pesa support." />
        <meta property="og:url" content="https://fxbrokers.co.ke/" />
        <meta property="og:image" content="https://fxbrokers.co.ke/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Best Forex Brokers in Kenya",
          description: "Independent forex broker reviews and comparisons for Kenyan traders.",
          url: "https://fxbrokers.co.ke/",
          publisher: { "@type": "Organization", name: "FxBrokers.co.ke", url: "https://fxbrokers.co.ke" },
        })}</script>
      </Helmet>

      <main
        className="text-white min-h-screen"
        style={{
          background: "#050D1A",
          fontFamily: "'DM Sans', 'Inter', sans-serif",
        }}
      >
        {/* ── LIVE TICKER ── */}
        <div className="border-b border-white/6 bg-[#06101E] overflow-hidden pt-16 py-2 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-[#06101E] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-[#06101E] to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap gap-8 px-4" style={{
            animation: "marquee 30s linear infinite",
          }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-xs shrink-0">
                <span className="text-slate-500 font-medium">{item.pair}</span>
                <span className="text-white font-mono font-semibold">{item.price}</span>
                <span className={`font-medium ${item.change.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                  {item.change}
                </span>
                <span className="text-white/10 ml-2">|</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-20 pb-16 px-4 lg:px-8" aria-label="Hero section">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Fine grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
            {/* Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[60vh] rounded-full bg-amber-400/5 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[10%] w-[40vw] h-[50vh] rounded-full bg-sky-500/4 blur-[100px]" />
            {/* Decorative diagonal line */}
            <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
              <line x1="0" y1="100%" x2="60%" y2="0" stroke="url(#lineGrad)" strokeWidth="1" />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col">
              {/* Trust pill */}
              <div className="inline-flex self-start items-center gap-2 bg-amber-400/8 border border-amber-400/20 rounded-full px-4 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                  Kenya's Most Trusted Forex Review Site
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
                Find the{" "}
                <span className="relative inline-block">
                  <span className="text-amber-400">Best Broker</span>
                  {/* Underline accent */}
                  <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 200 4">
                    <path d="M0 2 Q100 0 200 2" stroke="#FBBF24" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="4 3" />
                  </svg>
                </span>
                <br />
                for Kenyan Traders
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Independent, data-driven reviews of every major forex broker available in Kenya.
                We compare spreads, regulation, M-Pesa support, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/brokers"
                  className="group relative overflow-hidden bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-all duration-200 text-base text-center">
                  <span className="relative z-10">Compare All Brokers</span>
                </Link>
                <Link to="/brokers/best-forex-brokers-kenya"
                  className="group border border-white/12 hover:border-amber-400/35 text-slate-300 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 text-base text-center flex items-center justify-center gap-2">
                  2025 Top Picks
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-6">
                {[
                  { num: "50+", label: "Brokers Reviewed", icon: "📋" },
                  { num: "10K+", label: "Traders Helped", icon: "👥" },
                  { num: "100%", label: "Independent", icon: "🛡️" },
                ].map(({ num, label, icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-base shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-none">{num}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN — Broker cards ── */}
            <div className="relative">
              {/* Panel heading */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">Live Rankings</span>
                </div>
                <Link to="/brokers" className="text-amber-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1">
                  View all
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Card stack */}
              <div className="flex flex-col gap-3">
                {featuredBrokers.map((broker, i) => (
                  <HeroBrokerCard key={broker.id} broker={broker} index={i} />
                ))}
              </div>

              {/* Disclosure */}
              <p className="text-slate-600 text-[10px] text-center mt-3 leading-relaxed">
                Disclosure: We may earn a commission via affiliate links. Rankings are editorially independent.
              </p>

              {/* Floating glow behind panel */}
              <div className="absolute -inset-4 rounded-3xl bg-amber-400/3 blur-2xl -z-10 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="py-14 px-4 lg:px-8 border-t border-white/6" aria-labelledby="categories-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="categories-heading" className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <Link key={cat.slug} to={`/brokers/${cat.slug}`}
                  className="group flex items-center gap-3 bg-[#0B1929] border border-white/8 hover:border-amber-400/35 rounded-2xl px-5 py-4 transition-all duration-200">
                  <span className="text-xl shrink-0">{cat.icon}</span>
                  <span className="text-slate-300 group-hover:text-white text-sm font-medium transition-colors">{cat.label}</span>
                  <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL BROKER GRID ── */}
        <section className="py-16 px-4 lg:px-8 bg-[#070F1C]" aria-labelledby="brokers-heading">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2 id="brokers-heading" className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Sora', sans-serif" }}>
                  Top Forex Brokers — 2025
                </h2>
                <p className="text-slate-400 text-sm">Hand-picked and independently verified. Updated quarterly.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Updated March 2025
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredBrokers.map((broker) => (
                <FullBrokerCard key={broker.id} broker={broker} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/brokers"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-amber-400/30 text-slate-300 hover:text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200">
                View all 50+ broker reviews →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY TRUST US ── */}
        <section className="py-16 px-4 lg:px-8 border-t border-white/6" aria-labelledby="trust-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="trust-heading" className="text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}>
                Why Trust FxBrokers.co.ke?
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                We exist to protect Kenyan traders from unregulated brokers and hidden fees.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyTrustUs.map((item) => (
                <div key={item.title} className="flex gap-4 bg-[#0B1929] border border-white/8 rounded-2xl p-5">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METHODOLOGY ── */}
        <section className="py-14 px-4 lg:px-8 bg-[#070F1C]" aria-labelledby="methodology-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="methodology-heading" className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}>
                How We Rank Forex Brokers
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Transparent, data-driven scoring. No broker can buy a higher position.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Regulation & Safety", weight: "30%", color: "#FBBF24", bg: "rgba(251,191,36,0.07)" },
                { label: "Spreads & Fees", weight: "25%", color: "#38BDF8", bg: "rgba(56,189,248,0.07)" },
                { label: "Platforms & Tools", weight: "25%", color: "#34D399", bg: "rgba(52,211,153,0.07)" },
                { label: "Support & Deposits", weight: "20%", color: "#A78BFA", bg: "rgba(167,139,250,0.07)" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-5 text-center border border-white/8 relative overflow-hidden"
                  style={{ background: item.bg }}>
                  <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${item.color}15` }} />
                  <div className="text-3xl font-bold mb-2 font-mono" style={{ color: item.color }}>{item.weight}</div>
                  <p className="text-slate-400 text-xs leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/methodology" className="text-amber-400 hover:underline text-sm font-medium">
                Read our full methodology →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 px-4 lg:px-8 border-t border-white/6" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="text-3xl font-bold text-white text-center mb-8"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-16 px-4 lg:px-8 pb-24" aria-label="Call to action">
          <div className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl p-px"
            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.25) 0%, rgba(251,191,36,0.05) 50%, rgba(56,189,248,0.15) 100%)" }}>
            <div className="relative rounded-3xl p-10 text-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0D1E35 0%, #070F1C 100%)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
              <h2 className="relative text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}>
                Not sure which broker to choose?
              </h2>
              <p className="relative text-slate-400 text-sm mb-7 max-w-md mx-auto leading-relaxed">
                Answer 3 quick questions and we'll match you with the best broker for your trading style and budget.
              </p>
              <Link to="/broker-finder"
                className="relative inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-colors duration-200 text-base">
                Find My Broker — Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Inline keyframes for ticker */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}