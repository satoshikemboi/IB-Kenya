import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ExnessHero, { AFFILIATE_LINK, BROKERPAGE_LINK, ScoreRing, ShieldIcon, PhoneIcon, TrendingIcon } from "./ExnessHero";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.5,
  "Spreads & Fees": 9.8,
  "Platforms & Tools": 9.0,
  "Deposits & Withdrawals": 9.7,
  "Customer Support": 9.2,
};

const ACCOUNT_TYPES = [
  { name: "Standard", minDeposit: "$0", spread: "0.3 pips", commission: "None", best: "Beginners" },
  { name: "Standard Cent", minDeposit: "$0", spread: "0.3 pips", commission: "None", best: "Practice" },
  { name: "Pro", minDeposit: "$200", spread: "0.1 pips", commission: "None", best: "Intermediate" },
  { name: "Raw Spread", minDeposit: "$200", spread: "0.0 pips", commission: "$3.5/lot", best: "Active traders", highlight: true },
  { name: "Zero", minDeposit: "$200", spread: "0.0 pips", commission: "$3.5/lot", best: "Scalpers" },
];

const PROS = [
  "No minimum deposit",
  "Instant 24/7 M-Pesa deposits & withdrawals",
  "Spreads from 0.0 pips",
  "FCA, CySEC & CMA regulated",
  "Unlimited leverage available",
  "MT4, MT5 & Exness Trade app",
];
const CONS = [
  "No cTrader platform",
  "Not available to US clients",
];

const REGULATORS = [
  { authority: "FCA", country: "UK", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "CMA", country: "Kenya", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "FSCA", country: "South Africa", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$1", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$10" },
  { name: "Airtel Money", time: "Instant", fee: "Free", min: "$1" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$10" },
  { name: "Crypto", time: "~30 min", fee: "Network", min: "$10" },
];

const FAQS = [
  {
    q: <>How to register an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> account</>,
    a: <>To open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> account, go to <a href={BROKERPAGE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness official page</a>. Enter your personal details and proceed to verify your identity and proof of address. Once verified, you can proceed to deposit and trade.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> safe for Kenyan traders?</>,
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> is highly regulated by the FCA (UK), CySEC (Cyprus), and the FSCA (South Africa). They provide negative balance protection and hold client funds in segregated top-tier bank accounts.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> offers native M-Pesa integration. Deposits are instant, and withdrawals are typically processed within seconds to minutes, 24/7. The minimum deposit via M-Pesa is $1.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> in Kenya?</>,
    a: <>For Standard and Standard Cent accounts, there is no fixed minimum deposit (as low as $1 via M-Pesa). Professional accounts like Raw Spread, Pro, and Zero require a minimum initial deposit of $200.</>,
  },
  {
    q: <>Does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> offer a No Deposit Bonus?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> generally does not offer traditional &apos;No Deposit Bonuses.&apos; Instead, they focus on providing the industry&apos;s lowest spreads and instant withdrawal technology to provide better long-term value for traders.</>,
  },
  {
    q: "What is the maximum leverage available?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> offers &apos;Unlimited Leverage&apos; for experienced traders meeting specific criteria (less than 10 closed positions and 5 lots traded). Standard accounts typically access up to 1:2000 leverage.</>,
  },
  {
    q: "Which trading platforms can I use?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> supports MetaTrader 4 (MT4), MetaTrader 5 (MT5), the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> Web Terminal, and the highly-rated <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> Trade mobile app available on Android and iOS.</>,
  },
  {
    q: "Are there any withdrawal fees?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> does not charge any internal fees for M-Pesa or E-wallet withdrawals. However, M-Pesa users may incur standard mobile money transaction charges when sending or receiving funds from their line.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> regulated by the CMA in Kenya?</>,
    a: <>Yes, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> is currently licensed by the Kenyan Capital Markets Authority (CMA).</>,
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

// ─── Components ───────────────────────────────────────────────────────────────
function ScoreBar({ label, score }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-400 font-semibold tabular-nums">{score}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${score * 10}%` }} />
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
        className="w-full flex justify-between items-center gap-3 p-4 text-left focus-visible:outline focus-visible:outline-[#C9A84C]"
      >
        <span className="text-white font-medium text-sm">{q}</span>
        <span className={`text-[#C9A84C] text-lg leading-none shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3 leading-relaxed">{a}</div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExnessReview() {
  const overallScore = (
    Object.values(SCORES).reduce((sum, v) => sum + v, 0) / Object.values(SCORES).length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30 pb-12 md:pb-0">
      <Helmet>
        <title>Exness Kenya Review 2026 | M-Pesa, No Min Deposit & CMA Regulated</title>
        <meta name="description" content="Is Exness a good broker for Kenyan traders? Our 2026 review covers Exness M-Pesa deposits, minimum deposit in Kenya, CMA regulation, spreads from 0.0 pips, and how to open an Exness account." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/exness" />

        <meta property="og:title" content="Exness Kenya Review 2026 | M-Pesa & Zero Spread" />
        <meta property="og:description" content="Exness Kenya review — instant M-Pesa deposits, no minimum deposit on standard accounts, spreads from 0.0 pips, FCA and CMA regulated." />
        <meta property="og:url" content="https://fxbrokers.co.ke/brokers/exness" />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Exness Kenya Review 2026",
            "reviewBody": "Exness is our top-rated broker for Kenyan traders in 2026, offering instant M-Pesa deposits, no minimum deposit on standard accounts, spreads from 0.0 pips, and regulation from the FCA, CySEC and Kenya's CMA.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.8",
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
              "name": "Exness",
              "url": "https://exness.com",
              "description": "Global forex broker offering M-Pesa deposits, zero spread accounts, and CMA regulation for Kenyan traders."
            }
          }
        `}</script>
      </Helmet>

      <main className="max-w-full mx-auto pt-10 pb-12">

        <ExnessHero
          broker={{
            name: "Exness",
            logo: "/exness.png",
            score: overallScore,
            regulation: ["FCA", "CySEC", "CMA"],
            affiliateLink: AFFILIATE_LINK,
          }}
        />

        {/* ── QUICK NAV ────────────────────────────────────────────────── */}
        <nav aria-label="Review sections" className="flex gap-2 md:justify-center overflow-x-auto pt-4 mb-8 px-4 pb-1 [scrollbar-width:none]">
          {QUICK_NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs px-3 md:px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-[#C9A84C]/40 transition-colors focus-visible:outline focus-visible:outline-[#C9A84C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="grid md:px-64 grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* ── RATINGS BREAKDOWN ─────────────────────────────────────── */}
            <section id="ratings" className="p-6 md:rounded-xl bg-[#0D1B2E]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-amber-600 rounded-full"></span> Rating Breakdown
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
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Exness Kenya Review
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-500 hover:underline">Exness</a> is currently our top-rated broker for Kenyan traders. Unlike most international brokers, they have mastered local needs by providing <strong>native M-Pesa integration</strong> that actually works 24/7.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                A question we get often is <strong>whether Exness is regulated in Kenya</strong>, yes it is.
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-500 hover:underline"> Exness</a> holds a CMA licence, making it one of the few international brokers fully authorised
                to operate locally. This means Kenyan traders have regulatory protection both locally and
                internationally through the FCA.
              </p>
              <p className="text-sm leading-relaxed mb-6">
                The <strong>minimum deposit for Exness in Kenya</strong> is effectively zero on Standard accounts,
                you can start with as little as $10 via M-Pesa. Professional accounts (Raw Spread, Pro, Zero)
                require $200. Withdrawals via M-Pesa are processed in seconds, 24/7, with no fees charged
                by Exness.
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
            <section id="accounts" className="px-2 border border-white/10 bg-[#0D1B2E] overflow-hidden">
              <h2 className="text-white font-bold text-lg mb-4">Exness Kenya Account Types</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-full">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Type</th><th className="pb-3">Min Dep</th><th className="pb-3">Spread</th><th className="pb-3">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-[#C9A84C]" : ""}>
                        <td className="py-4 font-medium text-white">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-xs">{acc.commission}</td>
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
                  Exness offers multiple means of deposit for Kenyan traders, including M-Pesa, Airtel Money,
                  Skrill, Neteller, and bank cards. This ensures fast deposits and withdrawals with zero
                  internal fees charged by Exness.
                </p>
                <img src="/exnessdeposit.png" alt="Exness Payment Methods" className="mt-4 rounded-lg border border-white/10 w-full" />
              </div>
            </section>

            {/* ── SAFETY & REGULATION ───────────────────────────────────── */}
            <section id="regulation" className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E]">
              <h2 className="text-white font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="mb-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                <p className="text-emerald-400 text-xs">✓ Exness holds licences from top-tier regulators including the FCA (UK), and is also authorised by Kenya's own Capital Markets Authority (CMA) — giving Kenyan traders both local and international protection.</p>
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
              <h2 className="text-white font-bold text-lg mb-4">Exness Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0D1B2E] sticky top-24">
              <div className="flex items-center justify-center gap-3 mb-5 pb-5 border-b border-white/5">
                <ScoreRing score={overallScore} size={96} />
                <div>
                  <p className="text-white font-bold text-sm">Overall Score</p>
                  <p className="text-[10px] text-gray-500">Based on 5 categories</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-500/5 p-4 rounded-lg flex items-center gap-3">
                  <PhoneIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div><p className="text-emerald-400 text-[10px] font-bold uppercase mb-0.5">Local Support</p><p className="text-white text-xs font-medium">M-Pesa, Instant</p></div>
                </div>
                <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 flex items-center gap-3">
                  <ShieldIcon className="w-4 h-4 text-blue-400 shrink-0" />
                  <div><p className="text-blue-400 text-[10px] font-bold uppercase mb-0.5">Regulation</p><p className="text-white text-xs font-medium">FCA · CySEC · CMA</p></div>
                </div>
                <div className="bg-purple-500/5 p-4 rounded-lg flex items-center gap-3">
                  <TrendingIcon className="w-4 h-4 text-purple-400 shrink-0" />
                  <div><p className="text-purple-400 text-[10px] font-bold uppercase mb-0.5">Unique Feature</p><p className="text-white text-xs font-medium">Spreads from 0.0 pips</p></div>
                </div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-linear-to-r from-yellow-600 to-amber-500 text-gray-900 font-bold py-3 rounded-lg text-center text-md hover:bg-[#b5953b] transition-all">
                Open Exness Account →
              </a>
              <p className="text-[10px] text-gray-600 text-center mt-2">No minimum deposit via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>

      {/* ── MOBILE STICKY CTA ────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#07101E]/95 backdrop-blur border-t border-white/10 p-3">
        <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-amber-500 text-gray-800 font-bold py-3 rounded-lg text-center text-md">
          Register Now
        </a>
      </div>
    </div>
  );
}