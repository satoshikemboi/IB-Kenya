import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ForexGuides from "../components/ForexGuides";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const CATEGORIES = {
  "top-10-forex-brokers-in-kenya": {
    title: "Top 10 Forex Brokers in Kenya",
    metaTitle: "Top 10 Forex Brokers in Kenya 2026 — Ranked & Reviewed",
    metaDesc: "Discover the top 10 forex brokers in Kenya for 2026, ranked by regulation, spreads, M-Pesa support, and trading conditions. Updated by our expert team.",
    intro: "Here is our ranking of the top 10 forex brokers available to Kenyan traders in 2026, based on hands-on testing, regulatory verification, and real trading-cost analysis.",
    editorNote: "We evaluated over 50 brokers and narrowed the list to 10 that stand out for Kenyan traders — considering CMA regulation, M-Pesa support, spreads, platform quality, and customer service. Rankings are based on real account testing, not marketing claims.",
    brokers: ["exness", "xm-group", "hfm", "justmarkets", "fbs", "fxpro", "fxpesa", "fpmarkets", "deriv"],
    top10: [
      { rank: 1,  name: "Exness",         slug: "exness",      note: "Highest trading volume globally; CMA regulated" },
      { rank: 2,  name: "XM Group",        slug: "xm-group",    note: "Best for beginners; low $5 minimum deposit" },
      { rank: 3,  name: "HFM",             slug: "hfm",         note: "CMA regulated; ultra-low spreads from 0.0 pips" },
      { rank: 4,  name: "JustMarkets",     slug: "justmarkets", note: "Competitive spreads; M-Pesa support" },
      { rank: 5,  name: "FBS",             slug: "fbs",         note: "Lowest minimum deposit at $1" },
      { rank: 6,  name: "FxPro",           slug: "fxpro",       note: "Multi-platform: MT4, MT5, cTrader & more" },
      { rank: 7,  name: "FxPesa",          slug: "fxpesa",      note: "CMA licence no. 107; built for Kenyan traders" },
      { rank: 8,  name: "FP Markets",      slug: "fpmarkets",   note: "CMA licence no. 193; strong customer support" },
      { rank: 9,  name: "Deriv",      slug: "deriv",          note: "CMA licence no.20200000243; 24/7 trade on derivatives" },
      { rank: 10, name: "Windsor Brokers", slug: null,          note: "CMA licence no. 156; regulated since 1988" },
    ],
  },
  "best-forex-brokers-kenya": {
    title: "Best Forex Brokers in Kenya",
    metaTitle: "Best Forex Brokers in Kenya 2026 — Top 10 Ranked",
    metaDesc: "The 10 best forex brokers for Kenyan traders in 2026, ranked by our experts. Compare regulation, spreads, M-Pesa support, and minimum deposits.",
    intro: "We tested over 50 forex brokers to find the best options for Kenyan traders. Our top picks are regulated, accept M-Pesa, and offer competitive spreads.",
    editorNote: "I've spent years analysing forex brokers available to Kenyan traders — testing platforms hands-on, verifying regulatory licences, and comparing real trading costs including spreads, commissions, and swap rates. Every broker on this list has been scored across more than 30 data points so you can trade with confidence.",
    brokers: ["exness", "xm-group", "hfm", "justmarkets", "fbs"],
  },
  "mpesa-brokers": {
    title: "Forex Brokers That Accept M-Pesa in Kenya",
    metaTitle: "Forex Brokers Accepting M-Pesa in Kenya 2026",
    metaDesc: "Find forex brokers that accept M-Pesa deposits and withdrawals in Kenya. Compare fees, processing times, and minimum amounts.",
    intro: "M-Pesa is the most convenient way for Kenyan traders to fund a forex account. These brokers all support M-Pesa deposits and fast withdrawals.",
    editorNote: "I personally tested each broker's M-Pesa deposit and withdrawal flow — checking processing times, minimum amounts, and any hidden fees. Only brokers with seamless M-Pesa integration made this list.",
    brokers: ["exness", "xm-group", "fxpesa", "hfm", "fbs", "justmarkets"],
  },
  "lowest-spread-brokers": {
    title: "Lowest Spread Forex Brokers for Kenyan Traders",
    metaTitle: "Lowest Spread Forex Brokers Kenya 2026",
    metaDesc: "Compare the lowest spread forex brokers available in Kenya. Find ECN and raw spread accounts starting from 0.0 pips.",
    intro: "Low spreads mean lower trading costs on every trade. These brokers offer raw or near-zero spreads on major currency pairs.",
    editorNote: "Spread costs compound over hundreds of trades. I tracked live spreads during London and New York sessions across all brokers below to give you real-world numbers, not just advertised minimums.",
    brokers: ["exness", "justmarkets", "hfm", "fxpro"],
  },
  "mt4-mt5-brokers": { 
    title: "Best MT4 & MT5 Forex Brokers in Kenya",
    metaTitle: "Best MT4 & MT5 Brokers Kenya 2026",
    metaDesc: "Find the best MetaTrader 4 and MetaTrader 5 brokers for Kenyan traders. Compare platforms, spreads, and EA compatibility.",
    intro: "MetaTrader 4 and MT5 are the most popular trading platforms in Kenya. All brokers below offer full MT4/MT5 support with competitive conditions.",
    editorNote: "I tested each broker's MT4 and MT5 implementation — checking execution speed, EA compatibility, available indicators, and mobile app quality. These are the strongest MetaTrader offerings for Kenyan traders.",
    brokers: ["exness", "xm-group", "fpmarkets", "hfm", "fbs", "justmarkets", "fxpro"],
  },
  "regulated-brokers": {
    title: "Best Regulated Forex Brokers for Kenyan Traders",
    metaTitle: "Best Regulated Forex Brokers Kenya 2026 | FCA, ASIC, CySEC",
    metaDesc: "Only trade with regulated forex brokers. Compare FCA, ASIC, and CySEC regulated brokers available in Kenya with segregated client funds.",
    intro: "Trading with a regulated broker protects your funds. These brokers hold licences from top-tier regulators including the FCA, ASIC, and CySEC. Such brokers include Exness (CMA licence no. 162), HFM (CMA licence no. 155), Windsor Brokers (CMA licence no. 156), FxPesa (CMA licence no. 107), FP Markets (CMA licence no. 193) and IC Markets (CMA licence no. 199) all of which are regulated and offer segregated client accounts for added security.",
    editorNote: "I hand-verified every regulatory licence listed here — cross-checking CMA Kenya, FCA, ASIC, and CySEC registers. Never trade with a broker you haven't confirmed holds a valid, active licence.",
    brokers: ["hfm", "exness"],
  },
  "brokers-for-beginners": {
    title: "Best Forex Brokers for Beginners in Kenya",
    metaTitle: "Best Forex Brokers for Beginners in Kenya 2026",
    metaDesc: "New to forex trading in Kenya? These beginner-friendly brokers offer low minimum deposits, demo accounts, educational resources, and M-Pesa support.",
    intro: "Starting your forex journey? These brokers offer the lowest minimum deposits, the best educational resources, and easy-to-use platforms for new traders in Kenya.",
    editorNote: "As a beginner, your broker choice matters more than your strategy. I evaluated each broker's onboarding experience, demo account quality, educational content, and customer support responsiveness specifically through the lens of a first-time trader.",
    brokers: ["xm-group", "exness", "fbs", "justmarkets", "hfm", "fxpro"],
  },
  "copy-trading": {
    title: "Best Copy Trading Platforms in Kenya 2026",
    metaTitle: "Best Forex Copy Trading Platforms in Kenya | 2026 Comparison",
    metaDesc: "Discover the best copy trading platforms in Kenya for 2026. Automate your trading by following expert 'Strategy Providers' with M-Pesa support and low entry costs.",
    intro: "Want to trade like a pro without the years of study? Copy trading (Social Trading) allows you to automatically mirror the trades of high-performing investors. We’ve ranked the best platforms in Kenya based on their 'Strategy Provider' transparency, ease of use, and local deposit options.",
    editorNote: "When reviewing copy trading platforms, I look beyond the high-profit percentages. I specifically analyze the 'Maximum Drawdown' and 'Risk Scores' of the traders you can follow. A broker is only as good as the quality and honesty of the experts on its leaderboard.",
    brokers: ["hfm", "exness", "xm-group", "fbs", "fxpro"],
  },
};

const BROKER_SNIPPETS = {
  "exness":      { name: "Exness",     rating: 4.8, minDeposit: "$0",   spread: "0.0 pips", mpesa: true,  badge: "Top Rated",            link: "https://one.exnessonelink.com/a/1sh0vxrgqd", logo: "/exness.png" },
  "xm-group":   { name: "XM Group",   rating: 4.6, minDeposit: "$5",   spread: "0.6 pips", mpesa: true,  badge: "Best Beginners",        link: "https://affs.click/MbQNk",                  logo: "/xm.png" },
  "hfm":        { name: "HFM",        rating: 4.5, minDeposit: "$5",   spread: "0.0 pips", mpesa: true,  badge: "Low Spread",            link: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020", logo: "/hfm.png" },
  "justmarkets":{ name: "JustMarkets", rating: 4.7, minDeposit: "$5",  spread: "0.0 pips", mpesa: true,  badge: "Low Min Deposit",       link: "https://one.justmarkets.link/a/17thm0lpq8",  logo: "/justmarkets.png" },
  "fbs":        { name: "FBS",        rating: 4.2, minDeposit: "$1",   spread: "0.5 pips", mpesa: true,  badge: "$1 Deposit",            link: "https://fbs.partners?ibl=876040&ibp=35444511", logo: "/fbs.png" },
  "fxpro":      { name: "FxPro",      rating: 4.4, minDeposit: "$100", spread: "0.6 pips", mpesa: false, badge: "Multi-Platform",        link: "https://direct-fxpro.com/en/partner/2xPncqjwh", logo: "/fxpro.png" },
  "fxpesa":     { name: "FxPesa",     rating: 4.0, minDeposit: "$10",  spread: "0.8 pips", mpesa: true,  badge: "M-Pesa Support",        link: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263", logo: "/fxpesa.png" },
  "fpmarkets":  { name: "FPMarkets",  rating: 4.1, minDeposit: "$10",  spread: "0.8 pips", mpesa: false, badge: "Best Customer Support", link: "https://portal.fpmarkets.com/int-EN/register?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167", logo: "/fpmarkets.png" },
  "deriv":     { name: "Deriv",      rating: 4.3, minDeposit: "$5",   spread: "0.7 pips", mpesa: false, badge: "24/7 Trading",          link: "https://deriv.com/partner/FXBROKERSKE", logo: "/deriv.png" },
};

const CATEGORY_META = {
  "top-10-forex-brokers-in-kenya": { desc: "Our definitive ranking of the 10 best forex brokers available to Kenyan traders in 2026." },
  "best-forex-brokers-kenya":      { desc: "Our top-ranked picks for Kenyan traders, tested on spreads, regulation & M-Pesa support." },
  "mpesa-brokers":                 { desc: "Deposit and withdraw instantly using M-Pesa. No bank account needed." },
  "lowest-spread-brokers":         { desc: "Raw and ECN accounts starting from 0.0 pips. Pay less on every trade." },
  "mt4-mt5-brokers":               { desc: "Full MT4 and MT5 support with EA compatibility and fast execution." },
  "regulated-brokers":             { desc: "FCA, ASIC & CySEC licensed brokers with segregated client funds." },
  "brokers-for-beginners":         { desc: "Low minimum deposits, demo accounts, and education for new traders." },
  "copy-trading":                 { desc: "Follow and copy expert traders with transparent performance stats." },
};

const TOP10_FAQS = [
  {
    question: "What are the top 10 forex brokers by trading volume in Kenya?",
    answer: "Based on CMA registration and global trading volume data, the top forex brokers by volume available in Kenya include Exness (ranked #1 globally), XM Group, HFM, IC Markets, FP Markets, JustMarkets, FBS, FxPro, FxPesa, and Windsor Brokers. Exness alone processes over $4 trillion in monthly trading volume.",
  },
  {
    question: "Which forex brokers are regulated by the CMA in Kenya?",
    answer: "The Capital Markets Authority (CMA) of Kenya has licensed several brokers including Exness (no. 162), HFM (no. 155), Windsor Brokers (no. 156), FxPesa (no. 107), FP Markets (no. 193), and IC Markets (no. 199). Always verify a broker's CMA licence directly on the CMA website before depositing funds.",
  },
  {
    question: "Which top-10 brokers accept M-Pesa deposits?",
    answer: "Among the top 10, Exness, XM Group, HFM, JustMarkets, FBS, and FxPesa all support M-Pesa deposits and withdrawals. Exness and JustMarkets offer the fastest M-Pesa processing, often completing withdrawals within minutes.",
  },
  {
    question: "What is the minimum deposit for the top brokers in Kenya?",
    answer: "Minimum deposits vary widely: FBS requires just $1, while Exness has no minimum deposit at all. XM, HFM, and JustMarkets all start at $5. FxPro requires a higher $100 minimum, making it better suited to more experienced traders.",
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-[#C9A84C] transition-colors">
          {question}
        </span>
        <span className={`text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180 text-[#C9A84C]" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-gray-400 text-sm leading-relaxed pb-5 -mt-1">
          {answer}
        </p>
      )}
    </div>
  );
}

function Top10List({ top10 }) {
  return (
    <div className="bg-[#0a1628] border border-white/8 rounded-2xl overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C]/70 mb-1">Expert Ranking · 2026</p>
          <h2 className="text-white font-bold text-lg leading-tight">Top 10 Forex Brokers in Kenya</h2>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/80 bg-emerald-500/8 border border-emerald-500/15 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Updated Mar 2026
        </span>
      </div>

      {/* Ranked list */}
      <ol className="divide-y divide-white/5">
        {top10.map((item) => (
          <li key={item.rank} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/2 transition-colors group">
            <span className={`text-sm font-bold w-6 shrink-0 tabular-nums ${item.rank <= 3 ? "text-[#C9A84C]" : "text-gray-600"}`}>
              {item.rank}.
            </span>
            <div className="flex-1 min-w-0">
              {item.slug ? (
                <Link
                  to={`/brokers/${item.slug}`}
                  className="text-sm font-semibold text-[#7eb8d4] hover:text-[#C9A84C] underline underline-offset-2 decoration-[#7eb8d4]/30 hover:decoration-[#C9A84C]/50 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-gray-300">{item.name}</span>
              )}
              {item.note && (
                <span className="text-gray-600 text-xs ml-2 hidden sm:inline">— {item.note}</span>
              )}
            </div>
            {item.slug && (
              <span className="text-gray-700 group-hover:text-[#C9A84C] transition-colors text-xs shrink-0">→</span>
            )}
          </li>
        ))}
      </ol>

      <p className="text-[11px] text-gray-700 px-6 py-3 border-t border-white/5">
        Rankings based on regulation, spreads, M-Pesa support, and platform quality. Updated quarterly.
      </p>
    </div>
  );
}

function EditorialIntro({ cat, brokers }) {
  return (
    <div className="bg-[#0a1628] border border-white/8 rounded-2xl p-6 sm:p-8 mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] font-bold text-sm shrink-0">
          FX
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none mb-0.5">FxBrokers Editorial Team</p>
          <p className="text-gray-500 text-xs">Updated March 2026 · {brokers.length} brokers reviewed</p>
        </div>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[10px] font-medium text-[#C9A84C]/80 bg-[#C9A84C]/8 border border-[#C9A84C]/15 rounded-full px-3 py-1">
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 3 10.5l.5-3.5L1 4.5 4.5 4z" fill="currentColor"/>
          </svg>
          Expert Verified
        </span>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-[#C9A84C]/40 pl-4">
        {cat.editorNote}
      </p>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Brokers in this guide</p>
        <ol className="flex flex-col gap-2">
          {brokers.map((broker, idx) => (
            <li key={broker.slug} className="flex items-center gap-3 group">
              <span className="text-[#C9A84C]/50 text-xs font-mono w-4 shrink-0">{idx + 1}.</span>
              <Link
                to={`/brokers/${broker.slug}`}
                className="text-sm text-gray-200 hover:text-[#C9A84C] transition-colors font-medium underline underline-offset-2 decoration-white/10 hover:decoration-[#C9A84C]/40"
              >
                {broker.name}
              </Link>
              {broker.badge && (
                <span className="text-[10px] text-gray-500 hidden sm:inline">— {broker.badge}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */

export default function BrokerCategory() {
  const { slug } = useParams();
  const cat = CATEGORIES[slug];

  /* ── Index / no-slug view ── */
  if (!slug) {
    return (
      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="py-10 mb-8 text-left">
            <span className="text-xs font-medium tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-full px-4 py-1">
              Kenya Forex Guide
            </span>
            <h1 className="text-4xl font-bold text-white mt-4 mb-3">Find the right broker for you</h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              To help forex traders find the right broker to trade with, we publish hundreds of thousands of words of research. We collect thousands of data points in pursuit of our mission to provide the most accurate, unbiased forex broker reviews in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 pl-6 gap-3">
            {Object.entries(CATEGORIES).map(([key, c]) => {
              const meta = CATEGORY_META[key] || {};
              return (
                <div key={key}>
                  <Link to={`/brokers/category/${key}`} className="group">
                    <div className="text-lg underline font-semibold text-gray-200 mb-1.5 leading-snug">{c.title}</div>
                  </Link>
                  <div className="text-xs text-gray-400 leading-relaxed mb-4">{meta.desc}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#C9A84C]/80 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-2.5 py-0.5">
                      {c.brokers.length} brokers
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <ForexGuides />
        </div>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4 flex items-center justify-center">
        <p className="text-gray-500">Category not found.</p>
      </div>
    );
  }

  const brokers = cat.brokers.map(s => ({ slug: s, ...(BROKER_SNIPPETS[s] || { name: s, rating: 0 }) }));
  const isTop10 = slug === "top-10-forex-brokers-in-kenya";

  return (
    <>
      <Helmet>
        <title>{cat.metaTitle} | FxBrokers.co.ke</title>
        <meta name="description" content={cat.metaDesc} />
        <link rel="canonical" href={`https://fxbrokers.co.ke/brokers/category/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: cat.title,
          numberOfItems: isTop10 ? cat.top10.length : brokers.length,
          itemListElement: (isTop10 ? cat.top10 : brokers).map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            url: b.slug ? `https://fxbrokers.co.ke/brokers/${b.slug}` : undefined,
          })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <Link to="/brokers" className="hover:text-[#C9A84C]">Brokers</Link>
            <span>/</span>
            <span className="text-gray-400">{cat.title}</span>
          </nav>

          <h1 className="text-3xl font-bold text-white mb-4">{cat.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">{cat.intro}</p>

          {/* Top-10 ranked list — only on this slug */}
          {isTop10 && <Top10List top10={cat.top10} />}

          {/* Editorial intro */}
          <EditorialIntro cat={cat} brokers={brokers} />

          {/* Broker cards */}
          <div className="flex flex-col gap-4">
            {brokers.map((broker, idx) => (
              <article
                key={broker.slug}
                className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#C9A84C]/30 transition-all"
              >
                <div className="text-gray-200 font-semibold text-lg w-6 shrink-0 hidden sm:block">{idx + 1}.</div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#C9A84C] font-black text-sm shrink-0">
                  {broker.logo
                    ? <img src={broker.logo} alt={`${broker.name} logo`} className="w-12 h-12 object-contain" />
                    : broker.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold">{broker.name}</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/20">{broker.badge}</span>
                    {broker.mpesa && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">M-Pesa ✓</span>
                    )}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>⭐ {broker.rating}/5</span>
                    <span>Min: {broker.minDeposit}</span>
                    <span>Spread: {broker.spread}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={broker.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-amber-400 hover:bg-[#b8953e] text-[#07101E] text-xs font-semibold px-4 py-2 transition-colors"
                  >
                    Create Account
                  </a>
                  <Link
                    to={`/brokers/${broker.slug}`}
                    className="border border-white/20 hover:border-[#C9A84C]/40 text-gray-300 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                  >
                    Review
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* FAQ Accordion — top-10 page only */}
          {isTop10 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-sm mb-6">Common questions about the top forex brokers in Kenya.</p>
              <div className="bg-[#0a1628] border border-white/8 rounded-2xl px-6">
                {TOP10_FAQS.map((faq, i) => (
                  <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-700 italic text-center mt-8">
            Affiliate disclosure: We may receive a commission when you open an account via our links.
          </p>
        </div>
      </div>
    </>
  );
}