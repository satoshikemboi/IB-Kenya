import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.6,
  "Spreads & Fees": 8.7,
  "Platforms & Tools": 9.8,
  "Deposits & Withdrawals": 8.5,
  "Customer Support": 9.0,
};

const ACCOUNT_TYPES = [
  { name: "MT4 / MT5", minDeposit: "$100", spread: "1.6 pips", commission: "None", best: "Most traders" },
  { name: "cTrader", minDeposit: "$100", spread: "0.35 pips", commission: "$4.5/lot", best: "ECN traders", highlight: true },
  { name: "FxPro Edge", minDeposit: "$100", spread: "0.45 pips", commission: "None", best: "Spread betting" },
];

const PROS = [
  "FCA, CySEC & FSCA regulated",
  "MT4, MT5, cTrader & FxPro Edge",
  "No dealing desk execution",
  "Trusted 18+ year track record",
  "Segregated client funds",
];
const CONS = [
  "$100 minimum deposit",
  "No M-Pesa support",
  "Higher spreads on standard MT4/MT5",
  "Not ideal for beginners",
];

const REGULATORS = [
  { authority: "FCA", country: "UK", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "FSCA", country: "South Africa", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
  { authority: "SCB", country: "Bahamas", tier: "Tier 3", tierColor: "text-yellow-300 bg-yellow-500/15" },
];

const PAYMENT_METHODS = [
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$100" },
  { name: "Bank Transfer", time: "1–3 days", fee: "Free", min: "$500" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$100" },
  { name: "Crypto (BTC)", time: "~30 min", fee: "Network", min: "$100" },
];

const AFFILIATE_LINK = "https://direct-fxpro.com/en/partner/2xPncqjwh";

const FAQS = [
  {
    q: <>How do I open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> account?</>,
    a: <>Visit the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro registration page</a>, complete your personal details and KYC verification, then deposit a minimum of $100 via card or bank transfer to begin trading.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> safe for Kenyan traders?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> is one of the most regulated brokers available to Kenyan traders, holding licences from the FCA (UK), CySEC (Cyprus), and FSCA (South Africa). Client funds are fully segregated and the broker has been operating since 2006.</>,
  },
  {
    q: <>Does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> support M-Pesa?</>,
    a: <>Unfortunately, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> does not currently support M-Pesa deposits or withdrawals. Kenyan traders can fund their accounts via Visa, Mastercard, bank transfer, or Skrill/Neteller.</>,
  },
  {
    q: <>What is the minimum deposit at <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a>?</>,
    a: <>All <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> accounts require a minimum deposit of $100. This is higher than many competitors, but reflects the broker's positioning toward more experienced, serious traders.</>,
  },
  {
    q: <>Which platforms does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> offer?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> offers four trading platforms: MetaTrader 4 (MT4), MetaTrader 5 (MT5), cTrader, and their proprietary FxPro Edge platform for spread betting. This is the widest platform selection of any broker on our list.</>,
  },
  {
    q: <>What spreads does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> offer?</>,
    a: <>Spreads vary by platform. The cTrader ECN account starts from 0.35 pips with a $4.5/lot commission, while the MT4/MT5 account has spreads from 1.6 pips with no commission. The FxPro Edge platform offers spreads from 0.45 pips with no commission.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> a market maker?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> operates a No Dealing Desk (NDD) model, meaning trades are passed directly to liquidity providers without internal interference. This ensures fairer pricing and no conflict of interest between the broker and the client.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> regulated by the CMA in Kenya?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> is not licensed by the Kenyan Capital Markets Authority (CMA). Kenyan traders are served through the SCB (Bahamas) entity, while the group holds premier FCA and CySEC licences.</>,
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
      {open && <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3 leading-relaxed">{a}</div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FxProReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>FxPro Review 2026 — FCA Regulated, 4 Platforms | FxBrokers.co.ke</title>
        <meta name="description" content="FxPro review for Kenyan traders 2026. FCA & CySEC regulated broker with MT4, MT5, cTrader and FxPro Edge platforms. No dealing desk execution." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/fxpro" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Organization", name: "FxPro" },
          reviewRating: { "@type": "Rating", ratingValue: "4.4", bestRating: "5" },
          author: { "@type": "Organization", name: "FxBrokers.co.ke" },
        })}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">FxPro Review</span>
        </nav>

        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0">
              <img src="/fxpro.png" alt="FxPro Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">FxPro Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">MULTI-PLATFORM</span>
              </div>
              <p className="text-gray-500 max-w-xl font-semibold mb-4 text-sm leading-relaxed">
                FxPro is a premier FCA-regulated broker offering four trading platforms — MT4, MT5, cTrader, and its own FxPro Edge — making it the top choice for experienced Kenyan traders who prioritise regulation and platform choice over low entry costs.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["FCA & CySEC", "No Dealing Desk", "$100 Min", "4 Platforms"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <div className="w-full md:w-auto flex pt-4 gap-2">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-[#C9A84C] text-[#07101E] font-bold py-2 rounded-sm text-center hover:bg-[#b5953b] transition-all">
                  Open Account
                </a>
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 border border-white/10 py-2 rounded-sm text-center text-sm hover:bg-white/5 transition-all">
                  Try Demo
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <section className="p-4 mt-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> FxPro Review
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FxPro</a> is one of the most regulated forex brokers operating in Kenya. Founded in 2006, it has built an 18-year reputation on transparency, NDD execution, and FCA compliance. The key differentiator is its platform breadth — four platforms including the sophisticated cTrader ECN environment. The $100 minimum and lack of M-Pesa make it less accessible for beginners, but for experienced traders it stands out as a premium, trustworthy option.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => <div key={p} className="flex items-center gap-2 text-xs mb-2"><span className="text-emerald-500">✓</span> {p}</div>)}
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => <div key={c} className="flex items-center gap-2 text-xs mb-2"><span className="text-red-500">✕</span> {c}</div>)}
                </div>
              </div>
            </section>

            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-lg mb-4">Account Types</h2>
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

            <section className="p-6">
              <h2 className="text-white font-bold text-lg mb-4">Deposits & Withdrawals</h2>
              <div className="mb-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-xs">⚠️ FxPro does not support M-Pesa. Use Visa, Mastercard, or Skrill/Neteller instead.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th><th className="pb-3">Processing</th><th className="pb-3">Fee</th><th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name}>
                        <td className="py-3 font-medium text-white">{pm.name}</td>
                        <td className="py-3 text-xs">{pm.time}</td>
                        <td className="py-3 text-xs">{pm.fee}</td>
                        <td className="py-3 text-xs">{pm.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-6">
              <h2 className="text-white font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between items-center p-3 bg-white/5 border border-white/5">
                    <div>
                      <p className="text-white font-bold text-sm">{reg.authority}</p>
                      <p className="text-[10px] text-gray-500">{reg.country}</p>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>{reg.tier}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4">FxPro Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-6 sticky top-24">
              <div className="space-y-4">
                <div className="bg-red-500/5 p-4 border border-red-500/10"><p className="text-red-400 text-[10px] font-bold uppercase mb-1">⚠️ No M-Pesa</p><p className="text-white text-xs font-medium">Use Visa or Skrill instead</p></div>
                <div className="bg-blue-500/5 p-4"><p className="text-blue-400 text-[10px] font-bold uppercase mb-1">Regulation</p><p className="text-white text-xs font-medium">FCA & CySEC Licensed</p></div>
                <div className="bg-purple-500/5 p-4"><p className="text-purple-400 text-[10px] font-bold uppercase mb-1">Platforms</p><p className="text-white text-xs font-medium">MT4 · MT5 · cTrader · Edge</p></div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-[#C9A84C] text-[#07101E] font-bold py-3 rounded-sm text-center text-sm hover:bg-[#b5953b] transition-all">
                Open FxPro Account →
              </a>
              <p className="text-[10px] text-gray-600 text-center mt-2">Min deposit: $100 via card</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}