import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 8.2,
  "Spreads & Fees": 8.5,
  "Platforms & Tools": 8.8,
  "Deposits & Withdrawals": 9.1,
  "Customer Support": 8.9,
};

const ACCOUNT_TYPES = [
  { name: "Cent", minDeposit: "$1", spread: "1.0 pips", commission: "None", best: "Absolute beginners", highlight: true },
  { name: "Standard", minDeposit: "$100", spread: "0.5 pips", commission: "None", best: "Most traders" },
  { name: "Zero Spread", minDeposit: "$500", spread: "0.0 pips", commission: "$20/lot", best: "Active traders" },
  { name: "ECN", minDeposit: "$1000", spread: "0.0 pips", commission: "$6/lot", best: "Professionals" },
  { name: "Crypto", minDeposit: "$1", spread: "Varies", commission: "None", best: "Crypto traders" },
];

const PROS = [
  "$1 minimum deposit (Cent account)",
  "M-Pesa deposits & withdrawals",
  "Up to 1:3000 leverage",
  "MT4 & MT5 platforms",
  "FBS Trader proprietary app",
  "Local 24/7 customer support",
];
const CONS = [
  "IFSC (Belize) regulation for Kenyan clients",
  "High commission on Zero Spread ($20/lot)",
  "Inactivity fee after 90 days",
  "Standard account requires $100",
];

const REGULATORS = [
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "ASIC", country: "Australia", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "IFSC", country: "Belize", tier: "Tier 3", tierColor: "text-yellow-300 bg-yellow-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$1", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$50" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$1" },
  { name: "Crypto (USDT)", time: "~20 min", fee: "Network", min: "$1" },
];

const AFFILIATE_LINK = "https://fbs.partners?ibl=876040&ibp=35444511";

const FAQS = [
  {
    q: <>How do I open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> account?</>,
    a: <>Visit the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS registration page</a>, enter your email and choose your account type. Verify your identity with a national ID, then deposit as little as $1 via M-Pesa to start trading on the Cent account.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> safe for Kenyan traders?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> holds a CySEC licence (Tier 1) at the group level, and Kenyan clients are served through the IFSC (Belize) entity. While not the strongest regulatory framework, FBS has operated since 2009 with a strong reputation across Africa.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> fully supports M-Pesa for both deposits and withdrawals in Kenya. The minimum deposit is just $1, making it the lowest M-Pesa entry point of any broker on our list.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a>?</>,
    a: <>The <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> Cent account requires just $1 to open, making it the most accessible account in our entire broker list. The Standard account requires $100, and the ECN account requires $1,000.</>,
  },
  {
    q: <>What is the FBS Cent account?</>,
    a: <>The <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> Cent account works in US cents rather than dollars, so a $1 deposit gives you 100 cents to trade with. This dramatically reduces risk for beginners and is ideal for testing strategies with real money before scaling up.</>,
  },
  {
    q: <>What leverage does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> offer?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> offers leverage up to 1:3000 on Cent and Standard accounts — one of the highest available. This amplifies both potential profits and losses, so should only be used carefully.</>,
  },
  {
    q: "Are there inactivity fees?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> charges an inactivity fee of $5 per month after 90 consecutive days of no trading activity. To avoid this, simply log in and place a trade at least once every 90 days.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> regulated by the CMA in Kenya?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> is not regulated by the Kenyan Capital Markets Authority (CMA). Kenyan clients are served through the IFSC (Belize) entity. While the parent group holds CySEC and ASIC licences, these do not directly cover Kenyan clients.</>,
  },
];

const QUICK_NAV = [
  { href: "#ratings", label: "Ratings" },
  { href: "#review", label: "Full Review" },
  { href: "#accounts", label: "Accounts" },
  { href: "#deposits", label: "Deposits" },
  { href: "#regulation", label: "Regulation" },
  { href: "#faq", label: "FAQ" },
];

// ─── Icons (inline, no external deps) ─────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
      <path d="M6 10.2l2.4 2.4L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 text-red-500 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
      <path d="M7.3 7.3l5.4 5.4M12.7 7.3l-5.4 5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v5c0 4.5-2.9 8.3-7 9.5-4.1-1.2-7-5-7-9.5V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function TrendingIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 17l6-6 4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HeadsetIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 19v1a3 3 0 01-3 3h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const QUICK_STATS = [
  { label: "Min. Deposit", value: "$1", icon: PhoneIcon },
  { label: "Max Leverage", value: "1:3000", icon: TrendingIcon },
  { label: "Group Regulator", value: "CySEC", icon: ShieldIcon },
  { label: "Support", value: "24/7 Local", icon: HeadsetIcon },
];

// ─── Components ───────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 104 }) {
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(score / 10, 0), 1);
  const offset = circumference * (1 - pct);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#C9A84C"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-bold text-2xl tabular-nums leading-none">{score}</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider mt-1">out of 10</span>
      </div>
    </div>
  );
}

function ScoreBar({ label, score }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold tabular-nums">{score}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-2 overflow-hidden bg-[#0D1B2E]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A84C]"
      >
        <span className="text-white font-medium text-sm">{q}</span>
        <span className={`text-[#C9A84C] text-lg leading-none shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3 leading-relaxed">{a}</div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FBSReview() {
  const overallScore = (
    Object.values(SCORES).reduce((sum, v) => sum + v, 0) / Object.values(SCORES).length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30 pb-24 md:pb-0">
      <Helmet>
  <title>FBS Kenya Review 2026 | $1 Min Deposit, M-Pesa & Cent Account</title>
  <meta name="description" content="Is FBS a good broker for Kenyan traders? Our 2026 review covers FBS minimum deposit ($1), M-Pesa support, the FBS Cent account, regulation, and whether FBS is regulated in Kenya by the CMA." />
  <link rel="canonical" href="https://fxbrokers.co.ke/brokers/fbs" />

  <meta property="og:title" content="FBS Kenya Review 2026 | $1 Cent Account & M-Pesa" />
  <meta property="og:description" content="FBS Kenya review — $1 minimum deposit via M-Pesa, Cent account for beginners, up to 1:3000 leverage, CySEC regulated at group level." />
  <meta property="og:url" content="https://fxbrokers.co.ke/brokers/fbs" />
  <meta property="og:type" content="article" />

  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Review",
      "name": "FBS Kenya Review 2026",
      "reviewBody": "FBS is one of the most popular brokers in Kenya thanks to its $1 minimum deposit Cent account, instant M-Pesa support, and 1:3000 leverage. Kenyan clients are served under the IFSC (Belize) entity.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.2",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Felix"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FxBrokers Kenya",
        "url": "https://fxbrokers.co.ke"
      },
      "itemReviewed": {
        "@type": "FinancialService",
        "name": "FBS",
        "url": "https://fbs.com",
        "description": "Global forex broker popular in Kenya for its $1 minimum deposit Cent account and M-Pesa support."
      }
    }
  `}</script>
</Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">FBS Kenya Review</span>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1626] mb-6">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C9A84C]/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl" />

          <div className="relative p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-3">
                  <img src="/fbs.png" alt="FBS Logo" className="w-full h-full object-contain" />
                </div>
                <ScoreRing score={overallScore} />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">$1 DEPOSIT</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Updated for 2026</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">FBS Kenya Review 2026 — Best $1 Broker?</h1>

                <p className="text-gray-400 max-w-xl font-semibold mb-4 text-sm leading-relaxed mx-auto md:mx-0">
                  FBS Kenya offers the lowest entry point of any broker on our list — start trading with just
                  $1 via M-Pesa on the Cent account. One of the most popular forex brokers across Kenya and
                  East Africa, FBS is best suited to beginners who want real market exposure with minimal risk.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {["CySEC Licensed", "M-Pesa", "$1 Min", "1:3000 Leverage"].map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">{tag}</span>
                  ))}
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                  <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                    className="w-full sm:w-44 bg-amber-400 text-[#07101E] font-bold py-2.5 rounded-lg text-center hover:bg-[#b5953b] transition-all">
                    Open Account
                  </a>
                  <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                    className="w-full sm:w-44 border border-white/15 py-2.5 rounded-lg text-center text-sm hover:bg-white/5 transition-all">
                    Try Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Quick stat strip */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
              {QUICK_STATS.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center shrink-0">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">{value}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── QUICK NAV ────────────────────────────────────────────────── */}
        <nav aria-label="Review sections" className="flex gap-2 overflow-x-auto mb-8 pb-1 [scrollbar-width:none]">
          {QUICK_NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-[#C9A84C]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A84C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* ── RATINGS BREAKDOWN ─────────────────────────────────────── */}
            <section id="ratings" className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Rating Breakdown
                </h2>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Score: {overallScore}/10</span>
              </div>
              {Object.entries(SCORES).map(([label, score]) => (
                <ScoreBar key={label} label={label} score={score} />
              ))}
            </section>

            {/* ── FULL REVIEW ───────────────────────────────────────────── */}
            <section id="review" className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> FBS Kenya Review
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> is one of the most popular forex brokers in Africa, and for good reason. Its Cent account — requiring just $1 via M-Pesa — is the most accessible way for any Kenyan to start live forex trading. While its regulation (IFSC, Belize for Kenyan clients) is not as strong as FCA-regulated competitors, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> has operated reliably since 2009 and has a large, satisfied client base across Kenya and East Africa.
              </p>

              <p className="text-sm leading-relaxed mb-4">
                The most common question from Kenyan traders is <strong>whether FBS is regulated in Kenya</strong>.
                FBS is not licensed by the Kenyan Capital Markets Authority (CMA) — Kenyan clients are served
                under the IFSC (Belize) entity. While the parent group holds CySEC (Cyprus) and ASIC (Australia)
                licences, these do not directly cover Kenyan accounts. This is worth knowing before you deposit,
                though FBS has operated reliably across Africa since 2009.
              </p>

              <p className="text-sm leading-relaxed mb-6">
                The <strong>FBS minimum deposit in Kenya</strong> is just $1 on the Cent account via M-Pesa —
                the lowest of any broker we review. The Standard account requires $100, which is the main
                jump in entry cost. The <strong>FBS Cent account</strong> is particularly useful for beginners:
                it operates in US cents rather than dollars, so $1 gives you 100 cents to trade with,
                dramatically reducing risk while using real money.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  <div className="space-y-2.5">
                    {PROS.map(p => (
                      <div key={p} className="flex items-start gap-2 text-xs"><CheckIcon /> <span>{p}</span></div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  <div className="space-y-2.5">
                    {CONS.map(c => (
                      <div key={c} className="flex items-start gap-2 text-xs"><XIcon /> <span>{c}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── ACCOUNT TYPES ─────────────────────────────────────────── */}
            <section id="accounts" className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E] overflow-hidden">
              <h2 className="text-white font-bold text-lg mb-4">FBS Kenya Account Types</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-125">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Type</th><th className="pb-3">Min Dep</th><th className="pb-3">Spread</th><th className="pb-3">Commission</th><th className="pb-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-[#C9A84C]" : ""}>
                        <td className="py-4 font-medium text-white">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-xs">{acc.commission}</td>
                        <td className="py-4 text-xs text-gray-500">{acc.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── DEPOSITS & WITHDRAWALS ────────────────────────────────── */}
            <section id="deposits" className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E]">
              <h2 className="text-white font-bold text-lg mb-4">Deposits & Withdrawals</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th><th className="pb-3">Processing</th><th className="pb-3">Fee</th><th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name} className={pm.highlight ? "text-[#C9A84C]" : ""}>
                        <td className="py-3 font-medium text-white flex items-center gap-2">
                          {pm.name}
                          {pm.highlight && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Recommended</span>}
                        </td>
                        <td className="py-3 text-xs">{pm.time}</td>
                        <td className="py-3 text-xs">{pm.fee}</td>
                        <td className="py-3 text-xs">{pm.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4">
                <p className="py-3 text-sm leading-relaxed text-gray-400">
                  FBS supports multiple deposit and withdrawal methods for Kenyan traders, including M-Pesa,
                  Visa/Mastercard, Skrill, Neteller, and crypto (USDT). M-Pesa deposits are instant with a
                  minimum of just $1 — the lowest M-Pesa entry point of any broker we have tested.
                </p>
                <img src="/fbsdeposit.png" alt="FBS Payment Methods" className="mt-4 rounded-lg border border-white/10 w-full" />
              </div>
            </section>

            {/* ── SAFETY & REGULATION ───────────────────────────────────── */}
            <section id="regulation" className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E]">
              <h2 className="text-white font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="mb-4 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-xs">⚠️ Kenyan clients are served under the IFSC (Belize) entity. While the group holds CySEC and ASIC licences, these do not directly cover Kenyan accounts.</p>
              </div>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                        <ShieldIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{reg.authority}</p>
                        <p className="text-[10px] text-gray-500">{reg.country}</p>
                      </div>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>{reg.tier}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <section id="faq">
              <h2 className="text-white font-bold text-lg mb-4">FBS Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E] sticky top-24">
              <div className="flex items-center justify-center gap-3 mb-5 pb-5 border-b border-white/5">
                <ScoreRing score={overallScore} size={72} />
                <div>
                  <p className="text-white font-bold text-sm">Overall Score</p>
                  <p className="text-[10px] text-gray-500">Based on 5 categories</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-500/5 p-4 rounded-lg flex items-center gap-3">
                  <PhoneIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div><p className="text-emerald-400 text-[10px] font-bold uppercase mb-0.5">Local Support</p><p className="text-white text-xs font-medium">M-Pesa from $1</p></div>
                </div>
                <div className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/10 flex items-center gap-3">
                  <ShieldIcon className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div><p className="text-yellow-400 text-[10px] font-bold uppercase mb-0.5">Regulation</p><p className="text-white text-xs font-medium">CySEC (Group) · IFSC (KE)</p></div>
                </div>
                <div className="bg-purple-500/5 p-4 rounded-lg flex items-center gap-3">
                  <TrendingIcon className="w-4 h-4 text-purple-400 shrink-0" />
                  <div><p className="text-purple-400 text-[10px] font-bold uppercase mb-0.5">Unique Feature</p><p className="text-white text-xs font-medium">$1 Cent Account</p></div>
                </div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-amber-400 text-[#07101E] font-bold py-3 rounded-lg text-center text-md hover:bg-[#b5953b] transition-all">
                Open FBS Account →
              </a>
              <p className="text-[10px] text-gray-600 text-center mt-2">Min deposit: $1 via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>

      {/* ── MOBILE STICKY CTA ────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#07101E]/95 backdrop-blur border-t border-white/10 p-3">
        <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-amber-400 text-[#07101E] font-bold py-3 rounded-lg text-center text-sm">
          Open FBS Account — $1 Min
        </a>
      </div>
    </div>
  );
}