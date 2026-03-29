import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.0,
  "Spreads & Fees": 9.4,
  "Platforms & Tools": 9.6,
  "Deposits & Withdrawals": 9.3,
  "Customer Support": 9.1,
};

const ACCOUNT_TYPES = [
  { name: "Standard", minDeposit: "$1", spread: "0.3 pips", commission: "None", best: "Beginners" },
  { name: "Standard Cent", minDeposit: "$1", spread: "0.3 pips", commission: "None", best: "Practice" },
  { name: "Pro", minDeposit: "$200", spread: "0.1 pips", commission: "None", best: "Intermediate" },
  { name: "Raw Spread", minDeposit: "$200", spread: "0.0 pips", commission: "$3/lot", best: "Active traders", highlight: true },
  { name: "Islamic", minDeposit: "$1", spread: "0.3 pips", commission: "None", best: "Swap-free" },
];

const PROS = [
  "$1 minimum deposit",
  "M-Pesa deposits & withdrawals",
  "MT4, MT5 & cTrader supported",
  "FCA & ASIC regulated",
  "Up to 1:3000 leverage",
];
const CONS = [
  "Relatively newer brand vs Exness",
  "Fewer educational resources",
];

const REGULATORS = [
  { authority: "FCA", country: "UK", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "ASIC", country: "Australia", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "DFSA", country: "Dubai", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
  { authority: "FSC", country: "Mauritius", tier: "Tier 3", tierColor: "text-yellow-300 bg-yellow-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$1", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$10" },
  { name: "Crypto (USDT)", time: "~20 min", fee: "Network", min: "$10" },
  { name: "Bank Transfer", time: "1–3 days", fee: "Free", min: "$50" },
];

const AFFILIATE_LINK = "https://one.justmarkets.link/a/17thm0lpq8";

const FAQS = [
  {
    q: <>How do I open a <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> account?</>,
    a: <>Visit the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets registration page</a>, fill in your email and country, verify your identity with a national ID or passport, submit your proof of residency(Use KRA pin for faster verification) .Deposit as little as $10 via M-Pesa to start trading.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> safe for Kenyan traders?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> is regulated by the FCA (UK) and ASIC (Australia) which are two of the world's most stringent regulators. Client funds are held in segregated accounts and the broker provides negative balance protection.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> supports M-Pesa deposits and withdrawals for Kenyan traders. Deposits are typically instant and the minimum is just $10, making it one of the most accessible brokers in Kenya.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a>?</>,
    a: <>The minimum deposit is just $5 for Standard and Standard Cent accounts via M-Pesa. Professional accounts (Raw Spread, Pro) require a minimum of $200.</>,
  },
  {
    q: <>What leverage does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">JustMarkets</a> offer?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> offers leverage up to 1:3000 on Standard accounts, among the highest available. Professional accounts are capped at lower levels per regulatory requirements.</>,
  },
  {
    q: "Which platforms are supported?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> supports MetaTrader 4 (MT4), MetaTrader 5 (MT5), and cTrader, a major advantage over many brokers that skip cTrader. All platforms are available on desktop, web, and mobile.</>,
  },
  {
    q: "Are there withdrawal fees in Justmarkets?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> does not charge internal withdrawal fees for M-Pesa or card withdrawals. Standard mobile money charges from Safaricom may apply on the M-Pesa side.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> regulated by the CMA in Kenya?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">JustMarkets</a> is not currently licensed by the Kenyan Capital Markets Authority (CMA). Kenyan clients are served under the FSC (Mauritius) entity. The broker is, however, overseen by the FCA and ASIC at a group level.</>,
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function ScoreBar({ label, score }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold">{score}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#C9A84C]" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-2 overflow-hidden bg-[#0D1B2E]">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-4 text-left">
        <span className="text-white font-medium text-sm">{q}</span>
        <span className={`text-[#C9A84C] transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3 leading-relaxed">{a}</div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JustMarketsReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>JustMarkets Review 2026 — M-Pesa, cTrader & Low Spreads | FxBrokers.co.ke</title>
        <meta
          name="description"
          content="JustMarkets review for Kenyan traders in 2026. Compare spreads, M-Pesa support, platforms (MT4, MT5, cTrader), regulation, and minimum deposits."
        />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/justmarkets" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Organization", name: "JustMarkets" },
          reviewRating: { "@type": "Rating", ratingValue: "4.7", bestRating: "5" },
          author: { "@type": "Organization", name: "FxBrokers.co.ke" },
        })}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">JustMarkets Review</span>
        </nav>

        {/* Hero */}
        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0">
              <img src="/justmarkets.png" alt="JustMarkets Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">JustMarkets Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">
                  LOW MIN DEPOSIT
                </span>
              </div>
              <p className="text-gray-500 max-w-xl font-semibold mb-4 text-sm leading-relaxed">
                JustMarkets is a fast-growing broker ideal for both beginners and active traders in Kenya. It offers favorable trading conditions, including low minimum deposits, competitive spreads, and access to multiple trading platforms like MT4, MT5, and cTrader.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["FCA & ASIC", "M-Pesa", "$5 Min", "cTrader"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-full md:w-auto flex pt-4 gap-2">
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-amber-400 text-[#07101E] font-bold py-2 rounded-lg text-center hover:bg-amber-300 transition-all"
                >
                  Open Account
                </a>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 border font-semibold border-white/10 py-2 rounded-sm text-center text-sm hover:bg-white/5 transition-all"
                >
                  Try Demo
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Banner Ad */}
        <a target="_blank" rel="nofollow" href="https://one.justmarkets.link/a/17thm0lpq8/landing/global-trusted-broker?promo=5040"><img alt="JustMarkets" width="1200" height="628" src="https://justmarkets.com/uploads/promo_materials/jm-banner-global-trusted-broker-en-1200x628.png"/></a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Review */}
            <section className="p-4 mt-4">
              <h2 className="text-white font-bold text-3xl pt-3 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-amber-400 rounded-full"></span> JustMarkets Review
              </h2>
              <p className="text-md leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 font-semibold hover:underline">JustMarkets</a> is one of the best value-for-money brokers available to Kenyan traders. With a $1 minimum deposit via M-Pesa, three trading platforms including cTrader, and FCA regulation at the group level, it punches well above its weight. It's our top pick for traders who want low entry barriers without sacrificing platform quality.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-lg font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => (
                    <div key={p} className="flex items-center gap-2 text-md mb-2">
                      <span className="text-emerald-500">✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-red-400 text-lg font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => (
                    <div key={c} className="flex items-center gap-2 text-md mb-2">
                      <span className="text-red-500">✕</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Account Types */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-lg mb-4">Account Types</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-125">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Min Dep</th>
                      <th className="pb-3">Spread</th>
                      <th className="pb-3">Commission</th>
                      <th className="pb-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-amber-400" : ""}>
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

            {/* Payment Methods */}
            <section className="p-6">
              <h2 className="text-white font-bold text-lg mb-4">Deposits & Withdrawals</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th>
                      <th className="pb-3">Processing</th>
                      <th className="pb-3">Fee</th>
                      <th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name} className={pm.highlight ? "text-amber-400" : ""}>
                        <td className="py-3 font-medium text-white flex items-center gap-2">
                          {pm.name}
                          {pm.highlight && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                              Recommended
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-xs">{pm.time}</td>
                        <td className="py-3 text-xs">{pm.fee}</td>
                        <td className="py-3 text-xs">{pm.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="p-6">
              <p>
                Justmarkets Kenya offers many ways of depositing and withdrawing.They include, M-Pesa, Bank Card, Mobile money, Crypto, SticPay, wire Transfer and even Sirfintech. All these increases the deposit method and ensures quick deposit and withdrawals.
              </p>
  <div className="mb-4">
    <p className="text-gray-500 text-[11px] mt-1">
      Verified on March 29, 2026 — Instant M-Pesa Integration
    </p>
  </div>

  <div className="relative group">
    <img 
      src="/justmarketsdeposit.png" 
      alt="JustMarkets M-Pesa deposit interface screenshot showing local payment options in Kenya" 
      className="w-full rounded-lg object-cover border border-white/5 group-hover:border-amber-400/30 transition-colors" 
    />
    {/* Optional: Add a "Verified" watermark style overlay */}
    <div className="absolute top-2 right-2 bg-emerald-500/90 text-[#07101E] text-[9px] font-bold px-2 py-1 rounded shadow-lg uppercase">
      Tested by FxBrokers
    </div>
  </div>

  <p className="mt-4 text-gray-400 text-xs italic leading-relaxed">
    "Our team tested the JustMarkets M-Pesa gateway; funds appeared in the MT5 terminal in under 2 minutes."
  </p>
</div>

            {/* Regulation */}
            <section className="p-6">
              <h2 className="text-white font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between items-center p-3 bg-white/5 border border-white/5">
                    <div>
                      <p className="text-white font-bold text-sm">{reg.authority}</p>
                      <p className="text-[10px] text-gray-500">{reg.country}</p>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>
                      {reg.tier}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-white font-bold text-lg mb-4">JustMarkets Kenya FAQ</h2>
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 sticky top-24">

              <div className="space-y-4">
                <div className="bg-emerald-500/5 p-4 rounded-full text-center">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase mb-1">Local Support</p>
                  <p className="text-white text-xs font-medium">M-Pesa Deposits & Withdrawals</p>
                </div>
                <div className="bg-blue-500/5 p-4 rounded-full text-center">
                  <p className="text-blue-400 text-[10px] font-bold uppercase mb-1">Regulation</p>
                  <p className="text-white text-xs font-medium">FCA & ASIC Licensed</p>
                </div>
                <div className="bg-purple-500/5 p-4 rounded-full text-center">
                  <p className="text-purple-400 text-[10px] font-bold uppercase mb-1">Platforms</p>
                  <p className="text-white text-xs font-medium">MT4 · MT5 · cTrader</p>
                </div>
              </div>

              <a
                href={AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-amber-400 text-[#07101E] font-bold py-3 rounded-full text-center text-md hover:bg-amber-500 transition-all"
              >
                Open JustMarkets Account →
              </a>
              <p className="text-[10px] text-gray-600 text-center mt-2">Min deposit: $1 via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}