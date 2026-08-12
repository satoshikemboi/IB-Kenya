import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ForexGuides from "../components/ForexGuides";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const CATEGORIES = {

  "best-forex-brokers-kenya": {
    title: "Best Forex Brokers in Kenya",
    metaTitle: "Best Forex Brokers in Kenya 2026 — Top Picks Ranked",
    metaDesc: "The best forex brokers for Kenyan traders in 2026, ranked by our experts. Compare CMA regulation, spreads, M-Pesa support, and minimum deposits.",
    intro: "The best forex brokers in Kenya for 2026 offer a combination of local CMA regulation, instant M-Pesa deposits, low minimum deposits, and competitive spreads. Our team has tested each broker's deposit process, spread conditions, and customer support to bring you this shortlist. Exness, HFM, and JustMarkets top our rankings for most Kenyan traders.",
    brokers: ["exness", "xm", "hfm", "justmarkets", "fbs"],
    faqs: [
      {
        question: "Which forex broker is best for Kenyan traders in 2026?",
        answer: "Exness is our top overall pick for Kenyan traders in 2026, thanks to its CMA regulation, instant M-Pesa deposits, zero minimum deposit on standard accounts, and spreads from 0.0 pips. HFM and JustMarkets are strong alternatives.",
      },
      {
        question: "Which forex brokers are CMA regulated in Kenya?",
        answer: "The Capital Markets Authority (CMA) of Kenya has licensed Exness, HFM, FxPesa, FP Markets, Windsor Brokers, and IC Markets as of 2026. Always verify a broker's CMA licence number on the official CMA Kenya website before depositing.",
      },
      {
        question: "Can I trade forex in Kenya using M-Pesa?",
        answer: "Yes. Several regulated brokers accept M-Pesa deposits and withdrawals in Kenya, including Exness, HFM, JustMarkets, FBS, FxPesa, and XM Group. Exness offers the fastest M-Pesa withdrawals, typically processed within seconds.",
      },
      {
        question: "What is the minimum deposit to start forex trading in Kenya?",
        answer: "FBS has the lowest minimum deposit at $1 via M-Pesa on the Cent account. Exness has no fixed minimum on standard accounts. XM and HFM start from $5. Most professional ECN accounts require $100–$200.",
      },
    ],
  },

  "mpesa-brokers": {
    title: "Forex Brokers That Accept M-Pesa in Kenya",
    metaTitle: "Forex Brokers Accepting M-Pesa in Kenya 2026",
    metaDesc: "Find forex brokers that accept M-Pesa deposits and withdrawals in Kenya. Compare fees, processing times, and minimum amounts.",
    intro: "M-Pesa is the most convenient way for Kenyan traders to fund a forex account. These brokers all support M-Pesa deposits and fast withdrawals with no internal fees.",
    brokers: ["exness", "xm", "fxpesa", "hfm", "fbs", "justmarkets", "deriv"],
    faqs: [
      {
        question: "Which forex brokers accept M-Pesa in Kenya?",
        answer: "Exness, HFM, JustMarkets, FBS, FxPesa, Deriv, and XM Group all accept M-Pesa deposits and withdrawals in Kenya. Exness offers the fastest processing — typically within seconds.",
      },
      {
        question: "Is there a fee for M-Pesa forex deposits?",
        answer: "Most brokers do not charge internal fees for M-Pesa deposits. Standard Safaricom transaction charges may apply on your end. Always check the broker's payment page for the most current fee schedule.",
      },
    ],
  },

  "lowest-spread-brokers": {
    title: "Lowest Spread Forex Brokers for Kenyan Traders",
    metaTitle: "Lowest Spread Forex Brokers Kenya 2026",
    metaDesc: "Compare the lowest spread forex brokers available in Kenya in 2026. Raw and ECN accounts from 0.0 pips. Includes Exness Raw Spread, HFM Zero, and JustMarkets Pro accounts — all with M-Pesa support.",
    intro: "Low spreads mean lower trading costs on every trade. These brokers offer raw or near-zero spreads on major currency pairs, making them ideal for scalpers and high-frequency traders in Kenya.",
    brokers: ["exness", "justmarkets", "hfm", "fxpro"],
    faqs: [
      {
        question: "Which broker has the lowest spread in Kenya?",
        answer: "Exness offers spreads from 0.0 pips on its Raw Spread account with a $3.5/lot commission. HFM's Zero Spread account also offers 0.0 pips with a $6/lot commission. JustMarkets Raw Spread is competitive at $3/lot.",
      },
      {
        question: "What is a raw spread account?",
        answer: "A raw spread account passes the interbank spread directly to the trader with no markup, charging a fixed commission per lot instead. This is typically cheaper for active traders and scalpers who execute many trades.",
      },
    ],
  },

  "mt4-mt5-brokers": {
    title: "Best MT4 & MT5 Forex Brokers in Kenya",
    metaTitle: "Best MT4 & MT5 Brokers Kenya 2026",
    metaDesc: "Find the best MetaTrader 4 and MetaTrader 5 brokers for Kenyan traders. Compare platforms, spreads, and EA compatibility.",
    intro: "MetaTrader 4 and MT5 are the most popular trading platforms in Kenya. All brokers below offer full MT4/MT5 support with competitive conditions, Expert Advisor (EA) compatibility, and M-Pesa deposits.",
    brokers: ["exness", "xm", "fpmarkets", "hfm", "fbs", "justmarkets", "fxpro"],
    faqs: [
      {
        question: "Which brokers offer both MT4 and MT5 in Kenya?",
        answer: "Exness, HFM, XM Group, FBS, JustMarkets, and FP Markets all offer both MetaTrader 4 and MetaTrader 5. JustMarkets additionally offers cTrader.",
      },
      {
        question: "Is MT4 or MT5 better for Kenyan traders?",
        answer: "MT4 is better for forex-only traders who want simplicity and a large library of EAs. MT5 supports more asset classes including stocks and futures, has more timeframes, and is the future-facing platform. Both are widely supported in Kenya.",
      },
    ],
  },

  "regulated-brokers": {
    title: "Best Regulated Forex Brokers for Kenyan Traders",
    metaTitle: "Best Regulated Forex Brokers Kenya 2026 | FCA, ASIC, CySEC",
    metaDesc: "Only trade with regulated forex brokers. Compare FCA, ASIC, CySEC and CMA regulated brokers available in Kenya with segregated client funds.",
    intro: "Trading with a regulated broker protects your funds. These brokers hold licences from top-tier regulators including Kenya's own CMA, the FCA (UK), ASIC (Australia), and CySEC (Cyprus).",
    brokers: ["hfm", "exness", "fxpesa", "deriv", "fbs"],
    faqs: [
      {
        question: "Is forex trading legal and regulated in Kenya?",
        answer: "Yes. Forex trading is legal in Kenya and regulated by the Capital Markets Authority (CMA). The CMA licenses and supervises forex brokers operating in Kenya. Always check that your broker holds a valid CMA licence before depositing.",
      },
      {
        question: "What does CMA regulated mean for Kenyan traders?",
        answer: "A CMA-regulated broker is licensed by Kenya's Capital Markets Authority to offer forex and CFD trading locally. This means the broker must segregate client funds, maintain minimum capital requirements, and submit to local oversight — giving Kenyan traders stronger legal protection.",
      },
    ],
  },

  "brokers-for-beginners": {
    title: "Best Forex Brokers for Beginners in Kenya",
    metaTitle: "Best Forex Brokers for Beginners in Kenya 2026",
    metaDesc: "New to forex trading in Kenya? These beginner-friendly brokers offer low minimum deposits, demo accounts, educational resources, and M-Pesa support.",
    intro: "Starting your forex journey? These brokers offer the lowest minimum deposits, the best educational resources, and easy-to-use platforms for new traders in Kenya. All support M-Pesa and offer free demo accounts.",
    brokers: ["xm", "exness", "fbs", "justmarkets", "hfm", "fxpro"],
    faqs: [
      {
        question: "Which broker is best for forex beginners in Kenya?",
        answer: "XM Group is our top pick for beginners in Kenya due to its free daily webinars, video tutorials, $5 minimum deposit, and M-Pesa support. FBS is also popular for beginners thanks to its $1 Cent account which lets you trade with minimal risk.",
      },
      {
        question: "Do I need a lot of money to start forex trading in Kenya?",
        answer: "No. FBS lets you start with just $1 on its Cent account via M-Pesa. Exness has no fixed minimum on standard accounts, and XM and HFM start from $5. Always start with a demo account before trading real money.",
      },
    ],
  },

  "copy-trading": {
    title: "Best Copy Trading Platforms in Kenya 2026",
    metaTitle: "Best Forex Copy Trading Platforms in Kenya | 2026 Comparison",
    metaDesc: "Discover the best copy trading platforms in Kenya for 2026. Automate your trading by following expert strategy providers with M-Pesa deposit support.",
    intro: "Copy trading lets you automatically mirror the trades of experienced traders. These platforms offer transparent performance stats, low minimum allocations, and M-Pesa support for Kenyan traders.",
    brokers: ["hfm", "exness", "xm", "fbs", "fxpro"],
    faqs: [
      {
        question: "Which broker has the best copy trading in Kenya?",
        answer: "HFM's HFcopy platform is our top pick for copy trading in Kenya — it has a large pool of strategy providers, transparent stats, and a $100 minimum allocation with M-Pesa support. Exness Social Trading is also strong for Kenyan traders.",
      },
      {
        question: "Is copy trading profitable in Kenya?",
        answer: "Copy trading can be profitable but carries risk. Past performance of strategy providers does not guarantee future results. Always check a provider's maximum drawdown, win rate, and trading history before allocating funds.",
      },
    ],
  },
};

const BROKER_SNIPPETS = {
  "exness":         { name: "Exness",         rating: 4.8, minDeposit: "$0",   spread: "0.0 pips", mpesa: true,  badge: "Top Rated",            link: "https://one.exnessonelink.com/a/1sh0vxrgqd",                                                    logo: "/exness.png" },
  "xm":             { name: "XM Group",        rating: 4.6, minDeposit: "$5",   spread: "0.6 pips", mpesa: true,  badge: "Best Beginners",        link: "https://affs.click/MbQNk",                                                                       logo: "/xm.png" },
  "hfm":            { name: "HFM",             rating: 4.5, minDeposit: "$5",   spread: "0.0 pips", mpesa: true,  badge: "Low Spread",            link: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020",                                logo: "/hfm.png" },
  "justmarkets":    { name: "JustMarkets",     rating: 4.7, minDeposit: "$1",   spread: "0.0 pips", mpesa: true,  badge: "Low Min Deposit",       link: "https://one.justmarkets.link/a/17thm0lpq8",                                                     logo: "/justmarkets.png" },
  "fbs":            { name: "FBS",             rating: 4.2, minDeposit: "$1",   spread: "0.5 pips", mpesa: true,  badge: "$1 Deposit",            link: "https://fbs.partners?ibl=876040&ibp=35444511",                                                  logo: "/fbs.png" },
  "fxpro":          { name: "FxPro",           rating: 4.4, minDeposit: "$100", spread: "0.6 pips", mpesa: false, badge: "Multi-Platform",        link: "https://direct-fxpro.com/en/partner/2xPncqjwh",                                                 logo: "/fxpro.png" },
  "fxpesa":         { name: "FxPesa",          rating: 4.3, minDeposit: "$5",   spread: "0.8 pips", mpesa: true,  badge: "Kenya's Own",           link: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263",                  logo: "/fxpesa.png" },
  "fpmarkets":      { name: "FP Markets",      rating: 4.1, minDeposit: "$10",  spread: "0.8 pips", mpesa: false, badge: "Best Customer Support", link: "https://portal.fpmarkets.com/int-EN/register?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167", logo: "/fpmarkets.png" },
  "deriv":          { name: "Deriv",           rating: 4.0, minDeposit: "$5",   spread: "0.7 pips", mpesa: true,  badge: "Synthetic Indices",     link: "https://track.deriv.com/_QstxbfW082hZl7VyVw174GNd7ZgqdRLk/1/",                                 logo: "/deriv.png" },
  "fusion-markets": { name: "Fusion Markets",  rating: 4.3, minDeposit: "$10",  spread: "0.2 pips", mpesa: true,  badge: "Lowest Spreads",        link: "https://fusionmarkets.com/?refcode=111166",                                                     logo: "/fusion.png" },
};

const CATEGORY_META = {
  "best-forex-brokers-kenya":      { desc: "Our top-ranked picks for Kenyan traders, tested on spreads, regulation & M-Pesa support." },
  "mpesa-brokers":                 { desc: "Deposit and withdraw instantly using M-Pesa. No bank account needed." },
  "lowest-spread-brokers":         { desc: "Raw and ECN accounts starting from 0.0 pips. Pay less on every trade." },
  "mt4-mt5-brokers":               { desc: "Full MT4 and MT5 support with EA compatibility and fast execution." },
  "regulated-brokers":             { desc: "FCA, ASIC, CySEC & CMA licensed brokers with segregated client funds." },
  "brokers-for-beginners":         { desc: "Low minimum deposits, demo accounts, and education for new traders." },
  "copy-trading":                  { desc: "Follow and copy expert traders with transparent performance stats." },
};

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
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-gray-400 text-sm leading-relaxed pb-5 -mt-1">{answer}</p>
      )}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */

export default function BrokerCategory() {
  const { slug } = useParams();
  const cat = CATEGORIES[slug];

  /* ── No slug: show all categories ── */
  if (!slug) {
    return (
      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <Helmet>
          <title>Forex Broker Categories — Kenya 2026 | FxBrokers.co.ke</title>
          <meta name="description" content="Browse forex broker categories for Kenyan traders — best brokers, M-Pesa brokers, lowest spreads, regulated brokers, MT4/MT5 brokers, and more." />
          <link rel="canonical" href="https://fxbrokers.co.ke/brokers/category" />
        </Helmet>
        <div className="max-w-3xl mx-auto">
          <div className="py-10 mb-8 text-left">
            <span className="text-xs font-medium tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-full px-4 py-1">
              Kenya Forex Guide
            </span>
            <h1 className="text-4xl font-bold text-white mt-4 mb-3">Find the right broker for you</h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We collect thousands of data points to provide the most accurate, unbiased forex broker reviews in Kenya.
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

  /* ── Bad slug: 404 ── */
  if (!cat) {
    return (
      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4 flex items-center justify-center">
        <p className="text-gray-500">Category not found.</p>
      </div>
    );
  }

  const isTop10 = slug === "top-10-forex-brokers-in-kenya";

  const brokers = cat.brokers
    ? cat.brokers.map(s => ({ slug: s, ...(BROKER_SNIPPETS[s] || { name: s, rating: 0 }) }))
    : [];

  /* ── Category page ── */
  return (
    <>
      <Helmet>
        <title>{cat.metaTitle} | FxBrokers.co.ke</title>
        <meta name="description" content={cat.metaDesc} />
        <link rel="canonical" href={`https://fxbrokers.co.ke/brokers/category/${slug}`} />
        <meta property="og:title" content={`${cat.metaTitle} | FxBrokers.co.ke`} />
        <meta property="og:description" content={cat.metaDesc} />
        <meta property="og:url" content={`https://fxbrokers.co.ke/brokers/category/${slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "${cat.title}",
            "description": "${cat.metaDesc}",
            "url": "https://fxbrokers.co.ke/brokers/category/${slug}",
            "numberOfItems": ${(cat.brokers || cat.top10 || []).length}
          }
        `}</script>
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
                      : details.name?.[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-white font-semibold">{details.name}</h2>
                      {details.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/20">
                          {details.badge}
                        </span>
                      )}
                      {details.mpesa && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          M-Pesa ✓
                        </span>
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

          {/* FAQ Accordion — on any category that has faqs */}
          {cat.faqs && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
              <div className="bg-[#0a1628] border border-white/8 rounded-2xl px-6">
                {cat.faqs.map((faq, i) => (
                  <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-700 italic text-center mt-8">
            Affiliate disclosure: We may receive a commission when you open an account via our links. This does not affect our rankings.
          </p>

        </div>
      </div>
    </>
  );
}