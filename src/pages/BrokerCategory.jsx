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
    top10: [
      { rank: 1,  name: "Exness",         slug: "exness",      note: "Highest trading volume globally; CMA regulated" },
      { rank: 2,  name: "XM Group",        slug: "xm-group",    note: "Best for beginners; low $5 minimum deposit" },
      { rank: 3,  name: "HFM",             slug: "hfm",         note: "CMA regulated; ultra-low spreads from 0.0 pips" },
      { rank: 4,  name: "JustMarkets",     slug: "justmarkets", note: "Competitive spreads; M-Pesa support" },
      { rank: 5,  name: "FBS",             slug: "fbs",         note: "Lowest minimum deposit at $1" },
      { rank: 6,  name: "FxPro",           slug: "fxpro",       note: "Multi-platform: MT4, MT5, cTrader & more" },
      { rank: 7,  name: "FxPesa",          slug: "fxpesa",      note: "CMA licence no. 107; built for Kenyan traders" },
      { rank: 8,  name: "FP Markets",      slug: "fpmarkets",   note: "CMA licence no. 193; strong customer support" },
      { rank: 9,  name: "Deriv",       slug: "deriv",            note: "CMA licence no.20200000243; 24/7 trade on derivatives" },
      { rank: 10, name: "Fusion Markets", slug: "fusion",        note: " The Lowest Spreads" },
    ],
  },
  "best-forex-brokers-kenya": {
    title: "Best Forex Brokers in Kenya",
    metaTitle: "Best Forex Brokers in Kenya 2026 — Top 10 Ranked",
    metaDesc: "The 10 best forex brokers for Kenyan traders in 2026, ranked by our experts. Compare regulation, spreads, M-Pesa support, and minimum deposits.",
    intro: "The best forex brokers in Kenya for 2026, offering strong local regulation (CMA), M-Pesa integration, and low spreads, include JustMarkets, Exness, FXPesa, and HFM.",
    brokers: ["exness", "xm-group", "hfm", "justmarkets", "fbs"],
  },
  "mpesa-brokers": {
    title: "Forex Brokers That Accept M-Pesa in Kenya",
    metaTitle: "Forex Brokers Accepting M-Pesa in Kenya 2026",
    metaDesc: "Find forex brokers that accept M-Pesa deposits and withdrawals in Kenya. Compare fees, processing times, and minimum amounts.",
    intro: "M-Pesa is the most convenient way for Kenyan traders to fund a forex account. These brokers all support M-Pesa deposits and fast withdrawals.",
    brokers: ["exness", "xm-group", "fxpesa", "hfm", "fbs", "justmarkets"],
  },
  "lowest-spread-brokers": {
    title: "Lowest Spread Forex Brokers for Kenyan Traders",
    metaTitle: "Lowest Spread Forex Brokers Kenya 2026",
    metaDesc: "Compare the lowest spread forex brokers available in Kenya. Find ECN and raw spread accounts starting from 0.0 pips.",
    intro: "Low spreads mean lower trading costs on every trade. These brokers offer raw or near-zero spreads on major currency pairs.",
    brokers: ["exness", "justmarkets", "hfm", "fxpro"],
  },
  "mt4-mt5-brokers": { 
    title: "Best MT4 & MT5 Forex Brokers in Kenya",
    metaTitle: "Best MT4 & MT5 Brokers Kenya 2026",
    metaDesc: "Find the best MetaTrader 4 and MetaTrader 5 brokers for Kenyan traders. Compare platforms, spreads, and EA compatibility.",
    intro: "MetaTrader 4 and MT5 are the most popular trading platforms in Kenya. All brokers below offer full MT4/MT5 support with competitive conditions.",
    brokers: ["exness", "xm-group", "fpmarkets", "hfm", "fbs", "justmarkets", "fxpro"],
  },
  "regulated-brokers": {
    title: "Best Regulated Forex Brokers for Kenyan Traders",
    metaTitle: "Best Regulated Forex Brokers Kenya 2026 | FCA, ASIC, CySEC",
    metaDesc: "Only trade with regulated forex brokers. Compare FCA, ASIC, and CySEC regulated brokers available in Kenya with segregated client funds.",
    intro: "Trading with a regulated broker protects your funds. These brokers hold licences from top-tier regulators including the FCA, ASIC, and CySEC.",
    brokers: ["hfm", "exness", "fxpesa", ""],
  },
  "brokers-for-beginners": {
    title: "Best Forex Brokers for Beginners in Kenya",
    metaTitle: "Best Forex Brokers for Beginners in Kenya 2026",
    metaDesc: "New to forex trading in Kenya? These beginner-friendly brokers offer low minimum deposits, demo accounts, educational resources, and M-Pesa support.",
    intro: "Starting your forex journey? These brokers offer the lowest minimum deposits, the best educational resources, and easy-to-use platforms for new traders in Kenya.",
    brokers: ["xm-group", "exness", "fbs", "justmarkets", "hfm", "fxpro"],
  },
  "copy-trading": {
    title: "Best Copy Trading Platforms in Kenya 2026",
    metaTitle: "Best Forex Copy Trading Platforms in Kenya | 2026 Comparison",
    metaDesc: "Discover the best copy trading platforms in Kenya for 2026. Automate your trading by following expert 'Strategy Providers'.",
    intro: "Want to trade like a pro without the years of study? Copy trading allows you to automatically mirror the trades of high-performing investors.",
    brokers: ["hfm", "exness", "xm-group", "fbs", "fxpro"],
  },
};

const BROKER_SNIPPETS = {
  "exness":     { name: "Exness",     rating: 4.8, minDeposit: "$0",   spread: "0.0 pips", mpesa: true,  badge: "Top Rated",            link: "https://one.exnessonelink.com/a/1sh0vxrgqd", logo: "/exness.png" },
  "xm-group":   { name: "XM Group",   rating: 4.6, minDeposit: "$5",   spread: "0.6 pips", mpesa: true,  badge: "Best Beginners",        link: "https://affs.click/MbQNk",                  logo: "/xm.png" },
  "hfm":        { name: "HFM",        rating: 4.5, minDeposit: "$5",   spread: "0.0 pips", mpesa: true,  badge: "Low Spread",            link: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020", logo: "/hfm.png" },
  "justmarkets":{ name: "JustMarkets", rating: 4.7, minDeposit: "$5",  spread: "0.0 pips", mpesa: true,  badge: "Low Min Deposit",       link: "https://one.justmarkets.link/a/17thm0lpq8",  logo: "/justmarkets.png" },
  "fbs":        { name: "FBS",        rating: 4.2, minDeposit: "$1",   spread: "0.5 pips", mpesa: true,  badge: "$1 Deposit",            link: "https://fbs.partners?ibl=876040&ibp=35444511", logo: "/fbs.png" },
  "fxpro":      { name: "FxPro",      rating: 4.4, minDeposit: "$100", spread: "0.6 pips", mpesa: false, badge: "Multi-Platform",        link: "https://direct-fxpro.com/en/partner/2xPncqjwh", logo: "/fxpro.png" },
  "fxpesa":     { name: "FxPesa",     rating: 4.0, minDeposit: "$10",  spread: "0.8 pips", mpesa: true,  badge: "M-Pesa Support",        link: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263", logo: "/fxpesa.png" },
  "fpmarkets":  { name: "FPMarkets",  rating: 4.1, minDeposit: "$10",  spread: "0.8 pips", mpesa: false, badge: "Best Customer Support", link: "https://portal.fpmarkets.com/int-EN/register?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167", logo: "/fpmarkets.png" },
  "deriv":      { name: "Deriv",      rating: 4.3, minDeposit: "$5",   spread: "0.7 pips", mpesa: false, badge: "24/7 Trading",          link: "https://deriv.com/partner/FXBROKERSKE", logo: "/deriv.png" },
  "fusion":     { name: "Fusion Markets", rating: 4.3, minDeposit: "$10", spread: "0.4 pips", mpesa: true, badge: "Low Spreads",         link: "https://fusionmarkets.com/?refcode=111166", logo: "/fusion.png"},
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
    answer: "Based on CMA registration and global trading volume data, the top forex brokers by volume available in Kenya include Exness, XM Group, HFM, IC Markets, FP Markets, JustMarkets, FBS, FxPro, FxPesa, and Windsor Brokers.",
  },
  {
    question: "Which forex brokers are regulated by the CMA in Kenya?",
    answer: "The Capital Markets Authority (CMA) has licensed several brokers including Exness, HFM, Windsor Brokers, FxPesa, FP Markets, and IC Markets.",
  },
  {
    question: "Which top-10 brokers accept M-Pesa deposits?",
    answer: "Exness, XM Group, HFM, JustMarkets, FBS, and FxPesa all support M-Pesa deposits and withdrawals.",
  },
  {
    question: "What is the minimum deposit for the top brokers in Kenya?",
    answer: "Minimum deposits vary: FBS starts at $1, Exness has no minimum, and XM/HFM start at $5.",
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
    <div className="md:bg-[#0a1628] md:border md:border-white/8 md:rounded-2xl overflow-hidden mb-8">
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

      <ol className="divide-y divide-white/5">
        {top10.map((item) => (
          <li key={item.rank} className="flex items-center gap-4 px-3 py-3.5 hover:bg-white/2 transition-colors group">
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
                <span className="text-gray-600 text-xs ml-2 sm:inline">— {item.note}</span>
              )}
            </div>
            {item.slug && (
              <span className="text-gray-700 group-hover:text-[#C9A84C] transition-colors text-xs shrink-0">→</span>
            )}
          </li>
        ))}
      </ol>

      <p className="text-[11px] text-gray-700 px-6 py-3 border-t border-white/5">
        Rankings based on regulation, spreads, M-Pesa support, and platform quality.
      </p>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */

export default function BrokerCategory() {
  const { slug } = useParams();
  const cat = CATEGORIES[slug];

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
              We collect thousands of data points to provide the most accurate, unbiased forex broker reviews in the industry.
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
                      {c.brokers ? c.brokers.length : c.top10.length} brokers
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-16">
          <ForexGuides />
        </div>
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

  const brokers = cat.brokers 
    ? cat.brokers.map(s => ({ slug: s, ...(BROKER_SNIPPETS[s] || { name: s, rating: 0 }) }))
    : [];
    
  const isTop10 = slug === "top-10-forex-brokers-in-kenya";

  return (
    <>
      <Helmet>
        <title>{cat.metaTitle} | FxBrokers.co.ke</title>
        <meta name="description" content={cat.metaDesc} />
        <link rel="canonical" href={`https://fxbrokers.co.ke/brokers/category/${slug}`} />
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

          {/* Broker cards */}
          <div className="flex flex-col gap-4">
            {(isTop10 ? cat.top10 : brokers).map((broker, idx) => {
              const details = BROKER_SNIPPETS[broker.slug] || broker;
              return (
                <article
                  key={broker.slug || idx}
                  className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#C9A84C]/30 transition-all"
                >
                  <div className="text-gray-200 font-semibold text-lg w-6 shrink-0 hidden sm:block">{idx + 1}.</div>
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#C9A84C] font-black text-sm shrink-0">
                    {details.logo
                      ? <img src={details.logo} alt={`${details.name} logo`} className="w-12 h-12 object-contain" />
                      : details.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-white font-semibold">{details.name}</h2>
                      {details.badge && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/20">{details.badge}</span>}
                      {details.mpesa && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">M-Pesa ✓</span>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      {details.rating > 0 && <span>⭐ {details.rating}/5</span>}
                      {details.minDeposit && <span>Min: {details.minDeposit}</span>}
                      {details.spread && <span>Spread: {details.spread}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {details.link && (
                      <a
                        href={details.link}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="bg-amber-400 hover:bg-[#b8953e] text-[#07101E] text-xs font-semibold px-4 py-2 transition-colors rounded-lg"
                      >
                        Create Account
                      </a>
                    )}
                    {broker.slug && (
                      <Link
                        to={`/brokers/${broker.slug}`}
                        className="border border-white/20 hover:border-[#C9A84C]/40 text-gray-300 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                      >
                        Review
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div>
            <ForexGuides />
          </div>

          {/* FAQ Accordion — top-10 page only */}
          {isTop10 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
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