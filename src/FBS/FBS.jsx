import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import FBSHero, { AFFILIATE_LINK, ScoreRing, ShieldIcon, PhoneIcon, TrendingIcon } from "./FBSHero";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 8.2,
  "Spreads & Fees": 8.5,
  "Platforms & Tools": 8.8,
  "Deposits & Withdrawals": 9.1,
  "Customer Support": 8.9,
};

const ACCOUNT_TYPES = [
  { name: "Cent", minDeposit: "$1", spread: "1.0 pips", commission: "None", leverage: "1:1000", best: "Absolute beginners", highlight: true },
  { name: "Standard", minDeposit: "$100", spread: "0.5 pips", commission: "None", leverage: "1:3000", best: "Most traders" },
  { name: "Zero Spread", minDeposit: "$500", spread: "0.0 pips", commission: "$20/lot", leverage: "1:3000", best: "Active traders" },
  { name: "ECN", minDeposit: "$1000", spread: "0.0 pips", commission: "$6/lot", leverage: "1:500", best: "Professionals" },
  { name: "Crypto", minDeposit: "$1", spread: "Varies", commission: "None", leverage: "1:5", best: "Crypto traders" },
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
];

const REGULATORS = [
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-700 bg-blue-100" },
  { authority: "ASIC", country: "Australia", tier: "Tier 1", tierColor: "text-blue-700 bg-blue-100" },
  { authority: "IFSC", country: "Belize", tier: "Tier 3", tierColor: "text-amber-700 bg-amber-100" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$1", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$50" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$1" },
  { name: "Crypto (USDT)", time: "~20 min", fee: "Network", min: "$1" },
];

// Visible FAQ content — unchanged from original (JSX, with affiliate links)
const FAQS = [
  {
    q: <>How do I open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> account?</>,
    a: <>Visit the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS registration page</a>, enter your email and choose your account type. Verify your identity with a national ID, then deposit as little as $1 via M-Pesa to start trading on the Cent account.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> safe for Kenyan traders?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> holds a CySEC licence (Tier 1) at the group level, and Kenyan clients are served through the IFSC (Belize) entity. While not the strongest regulatory framework, FBS has operated since 2009 with a strong reputation across Africa.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> fully supports M-Pesa for both deposits and withdrawals in Kenya. The minimum deposit is just $1, making it the lowest M-Pesa entry point of any broker on our list.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a>?</>,
    a: <>The <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> Cent account requires just $1 to open, making it the most accessible account in our entire broker list. The Standard account requires $100, and the ECN account requires $1,000.</>,
  },
  {
    q: <>What is the FBS Cent account?</>,
    a: <>The <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> Cent account works in US cents rather than dollars, so a $1 deposit gives you 100 cents to trade with. This dramatically reduces risk for beginners and is ideal for testing strategies with real money before scaling up.</>,
  },
  {
    q: <>What leverage does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> offer?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> offers leverage up to 1:3000 on Cent and Standard accounts — one of the highest available. This amplifies both potential profits and losses, so should only be used carefully.</>,
  },
  {
    q: "Are there inactivity fees?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> charges an inactivity fee of $5 per month after 90 consecutive days of no trading activity. To avoid this, simply log in and place a trade at least once every 90 days.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> regulated by the CMA in Kenya?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-600 hover:underline">FBS</a> is not regulated by the Kenyan Capital Markets Authority (CMA). Kenyan clients are served through the IFSC (Belize) entity. While the parent group holds CySEC and ASIC licences, these do not directly cover Kenyan clients.</>,
  },
];

const FAQ_SCHEMA = [
  { q: "How do I open an FBS account?", a: "Visit the FBS registration page, enter your email and choose your account type. Verify your identity with a national ID, then deposit as little as $1 via M-Pesa to start trading on the Cent account." },
  { q: "Is FBS safe for Kenyan traders?", a: "FBS holds a CySEC licence (Tier 1) at the group level, and Kenyan clients are served through the IFSC (Belize) entity. While not the strongest regulatory framework, FBS has operated since 2009 with a strong reputation across Africa." },
  { q: "Can I deposit and withdraw with M-Pesa?", a: "Yes. FBS fully supports M-Pesa for both deposits and withdrawals in Kenya. The minimum deposit is just $1, making it the lowest M-Pesa entry point of any broker on our list." },
  { q: "What is the minimum deposit for FBS?", a: "The FBS Cent account requires just $1 to open, making it the most accessible account in our entire broker list. The Standard account requires $100, and the ECN account requires $1,000." },
  { q: "What is the FBS Cent account?", a: "The FBS Cent account works in US cents rather than dollars, so a $1 deposit gives you 100 cents to trade with. This dramatically reduces risk for beginners and is ideal for testing strategies with real money before scaling up." },
  { q: "What leverage does FBS offer?", a: "FBS offers leverage up to 1:3000 on Cent and Standard accounts — one of the highest available. This amplifies both potential profits and losses, so should only be used carefully." },
  { q: "Are there inactivity fees?", a: "FBS charges an inactivity fee of $5 per month after 90 consecutive days of no trading activity. To avoid this, simply log in and place a trade at least once every 90 days." },
  { q: "Is FBS regulated by the CMA in Kenya?", a: "FBS is not regulated by the Kenyan Capital Markets Authority (CMA). Kenyan clients are served through the IFSC (Belize) entity. While the parent group holds CySEC and ASIC licences, these do not directly cover Kenyan clients." },
];

const QUICK_NAV = [
  { href: "#ratings", label: "Ratings" },
  { href: "#review", label: "Full Review" },
  { href: "#accounts", label: "Accounts" },
  { href: "#deposits", label: "Deposits" },
  { href: "#regulation", label: "Regulation" },
  { href: "#faq", label: "FAQ" },
];

const DATE_PUBLISHED = "2026-01-01";
const DATE_MODIFIED = "2026-08-03";

// ─── Icons ────────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
      <path d="M6 10.2l2.4 2.4L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 text-red-600 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
      <path d="M7.3 7.3l5.4 5.4M12.7 7.3l-5.4 5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────
function ScoreBar({ label, score }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="text-slate-900 font-bold tabular-nums">{score}/10</span>
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl mb-2 overflow-hidden bg-white shadow-xs">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center gap-3 p-4 text-left focus-visible:outline focus-visible:outline-amber-600"
      >
        <span className="text-slate-900 font-medium text-sm">{q}</span>
        <span className={`text-amber-600 text-lg leading-none shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`px-4 pb-4 text-slate-600 text-sm border-t border-slate-100 pt-3 leading-relaxed ${open ? "" : "hidden"}`}>
        {a}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FBSReview() {
  const overallScore = (
    Object.values(SCORES).reduce((sum, v) => sum + v, 0) / Object.values(SCORES).length
  ).toFixed(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Review",
        "name": "FBS Kenya Review 2026",
        "reviewBody": "FBS is one of the most popular brokers in Kenya thanks to its $1 minimum deposit Cent account, instant M-Pesa support, and 1:3000 leverage. Kenyan clients are served under the IFSC (Belize) entity.",
        "datePublished": DATE_PUBLISHED,
        "dateModified": DATE_MODIFIED,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": overallScore,
          "bestRating": "10",
        },
        "author": { "@type": "Person", "name": "Felix" },
        "publisher": { "@type": "Organization", "name": "FxBrokers Kenya", "url": "https://fxbrokers.co.ke" },
        "itemReviewed": {
          "@type": "FinancialService",
          "name": "FBS",
          "url": "https://fbs.com",
          "description": "Global forex broker popular in Kenya for its $1 minimum deposit Cent account and M-Pesa support.",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_SCHEMA.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fxbrokers.co.ke/" },
          { "@type": "ListItem", "position": 2, "name": "Brokers", "item": "https://fxbrokers.co.ke/brokers" },
          { "@type": "ListItem", "position": 3, "name": "FBS", "item": "https://fxbrokers.co.ke/brokers/fbs" },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 selection:bg-amber-500/20 pb-24 md:pb-0">
      <Helmet>
        <title>FBS Kenya Review 2026: $1 Minimum Deposit, Cent Account & M-Pesa</title>
        <meta name="description" content="FBS Kenya review: $1 minimum deposit via M-Pesa, the FBS Cent account explained, leverage up to 1:3000, and whether FBS is CMA-regulated in Kenya." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/fbs" />

        <meta property="og:title" content="FBS Kenya Review 2026: $1 Minimum Deposit & Cent Account" />
        <meta property="og:description" content="FBS Kenya review — $1 minimum deposit via M-Pesa, Cent account for beginners, up to 1:3000 leverage, CySEC regulated at group level." />
        <meta property="og:url" content="https://fxbrokers.co.ke/brokers/fbs" />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="max-w-full mx-auto pt-10 pb-12">

        <FBSHero
          broker={{
            name: "FBS",
            logo: "/fbs.png",
            score: overallScore,
            regulation: ["CySEC", "ASIC", "IFSC"],
            affiliateLink: AFFILIATE_LINK,
          }}
        />

        {/* ── QUICK NAV ────────────────────────────────────────────────── */}
        <nav aria-label="Review sections" className="flex gap-2 overflow-x-auto mb-8 pt-3 px-4 pb-1 [scrollbar-width:none]">
          {QUICK_NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-amber-500/50 transition-colors focus-visible:outline focus-visible:outline-amber-600 shadow-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-8">

            {/* ── FULL REVIEW ───────────────────────────────────────────── */}
            <section id="review" className="px-4">
              <h2 className="text-slate-900 font-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-600 rounded-full"></span> FBS Kenya Review
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-emerald-600 font-medium hover:underline">FBS</a> is one of the most popular forex brokers in Africa, and for good reason. Its Cent account, requiring just $1 via M-Pesa, is the most accessible way for any Kenyan to start live forex trading. While its regulation (IFSC, Belize for Kenyan clients) is not as strong as FCA-regulated competitors, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-emerald-600 font-medium hover:underline">FBS</a> has operated reliably since 2009 and has a large, satisfied client base across Kenya and East Africa.
              </p>

              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                The most common question from Kenyan traders is <strong className="text-slate-900">whether FBS is regulated in Kenya</strong>.
                FBS is not licensed by the Kenyan Capital Markets Authority (CMA), Kenyan clients are served
                under the IFSC (Belize) entity. While the parent group holds CySEC (Cyprus) and ASIC (Australia)
                licences, these do not directly cover Kenyan accounts. This is worth knowing before you deposit,
                though FBS has operated reliably across Africa since 2009.
              </p>

              <p className="text-sm leading-relaxed text-slate-600 mb-6">
                The <strong className="text-slate-900">FBS minimum deposit in Kenya</strong> is just $1 on the Cent account via M-Pesa,
                the lowest of any broker we review. The Standard account requires $100, which is the main
                jump in entry cost. The <strong className="text-slate-900">FBS Cent account</strong> is particularly useful for beginners:
                it operates in US cents rather than dollars, so $1 gives you 100 cents to trade with,
                dramatically reducing risk while using real money.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  <div className="space-y-2.5">
                    {PROS.map(p => (
                      <div key={p} className="flex items-start gap-2 text-xs text-slate-700"><CheckIcon /> <span>{p}</span></div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-red-600 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  <div className="space-y-2.5">
                    {CONS.map(c => (
                      <div key={c} className="flex items-start gap-2 text-xs text-slate-700"><XIcon /> <span>{c}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── ACCOUNT TYPES ─────────────────────────────────────────── */}
            <section id="accounts" className="px-4">
              <h2 className="text-slate-900 font-semibold text-2xl mb-4">FBS Kenya Account Types</h2>

              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                Kenyan clients trade on FBS's international offering, run under{" "}
                <strong className="text-slate-900">FBS Markets Inc.</strong> and licensed by the{" "}
                <strong className="text-slate-900">Financial Services Commission (FSC) of Belize</strong>.
                Cent and Standard accounts price purely off the spread with no separate
                commission on forex, stock CFDs carry a separate commission regardless
                of account type.
              </p>

              <div className="mb-4 p-3 bg-green-200 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-xs">
                  FBS is not currently licensed by Kenya's Capital Markets Authority (CMA).
                  Kenyan clients trade under the FSC Belize entity rather than local CMA
                  oversight, worth weighing in your due diligence.
                </p>
              </div>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-full">
                  <thead>
                    <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100">
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Min Deposit</th>
                      <th className="pb-3">Spread</th>
                      <th className="pb-3">Commission</th>
                      <th className="pb-3">Leverage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-amber-700 bg-amber-50/50" : "text-slate-700"}>
                        <td className="py-4 font-semibold text-slate-900">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-xs">{acc.commission}</td>
                        <td className="py-4 text-xs">{acc.leverage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 mt-4">
                The <strong className="text-slate-900">Cent Account</strong> converts deposits
                into cent-denominated units (a $10 deposit shows as 1,000 cents), letting
                beginners trade real market conditions at minimal risk. The{" "}
                <strong className="text-slate-900">Standard Account</strong> trades full-size
                lots with the same no-commission spread pricing and higher leverage.
              </p>
            </section>

            {/* ── DEPOSITS & WITHDRAWALS ────────────────────────────────── */}
            <section id="deposits" className=" px-4">
              <h2 className="text-slate-900 font-semibold text-2xl mb-4">Deposits & Withdrawals</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100">
                      <th className="pb-3">Method</th><th className="pb-3">Processing</th><th className="pb-3">Fee</th><th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name} className={pm.highlight ? "text-amber-700 bg-amber-50/50" : "text-slate-700"}>
                        <td className="py-3 font-semibold text-slate-900 flex items-center gap-2">
                          {pm.name}
                          {pm.highlight && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">Recommended</span>}
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
                <p className="py-3 text-sm leading-relaxed text-slate-600">
                  FBS supports multiple deposit and withdrawal methods for Kenyan traders, including M-Pesa,
                  Visa/Mastercard, Skrill, Neteller, and crypto (USDT). M-Pesa deposits are instant with a
                  minimum of just $1, the lowest M-Pesa entry point of any broker we have tested.
                </p>
                <img src="/fbsdeposits.png" alt="FBS Kenya M-Pesa deposit and withdrawal" className="mt-4 rounded-lg border border-slate-200 w-full" />
                <img src="/fbsdeposit.png" alt="FBS Kenya deposit and withdrawal payment methods including M-Pesa" className="mt-4 rounded-lg border border-slate-200 w-full" />
              </div>
            </section>

            {/* ── SAFETY & REGULATION ───────────────────────────────────── */}
            <section id="regulation" className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <h2 className="text-slate-900 font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-xs">⚠️ Kenyan clients are served under the IFSC (Belize) entity. While the group holds CySEC and ASIC licences, these do not directly cover Kenyan accounts.</p>
              </div>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-200/60 flex items-center justify-center text-slate-600">
                        <ShieldIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-sm">{reg.authority}</p>
                        <p className="text-[10px] text-slate-500">{reg.country}</p>
                      </div>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>{reg.tier}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <section id="faq">
              <h2 className="text-slate-900 font-bold text-lg mb-4">FBS Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs sticky top-24">
              <div className="flex items-center justify-center gap-3 mb-5 pb-5 border-b border-slate-100">
                <ScoreRing score={overallScore} size={96} />
                <div>
                  <p className="text-slate-900 font-bold text-sm">Overall Score</p>
                  <p className="text-[10px] text-slate-500">Based on 5 categories</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg flex items-center gap-3 border border-emerald-100">
                  <PhoneIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div><p className="text-emerald-800 text-[10px] font-bold uppercase mb-0.5">Local Support</p><p className="text-slate-900 text-xs font-medium">M-Pesa from $1</p></div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-center gap-3">
                  <ShieldIcon className="w-4 h-4 text-amber-600 shrink-0" />
                  <div><p className="text-amber-800 text-[10px] font-bold uppercase mb-0.5">Regulation</p><p className="text-slate-900 text-xs font-medium">CySEC (Group) · IFSC (KE)</p></div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-center gap-3">
                  <TrendingIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <div><p className="text-purple-800 text-[10px] font-bold uppercase mb-0.5">Unique Feature</p><p className="text-slate-900 text-xs font-medium">$1 Cent Account</p></div>
                </div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-center text-md transition-all shadow-xs">
                Open FBS Account →
              </a>
              <p className="text-[10px] text-slate-500 text-center mt-2">Min deposit: $1 via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>

      {/* ── MOBILE STICKY CTA ────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-gray-900 backdrop-blur p-3 shadow-lg">
        <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-center text-sm shadow-xs">
          Create FBS Account | $1 Min
        </a>
      </div>
    </div>
  );
}