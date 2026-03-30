import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.1,
  "Spreads & Fees": 8.8,
  "Platforms & Tools": 9.3,
  "Deposits & Withdrawals": 9.0,
  "Customer Support": 9.4,
};

const ACCOUNT_TYPES = [
  { name: "Micro", minDeposit: "$5", spread: "1.0 pips", commission: "None", best: "Beginners" },
  { name: "Standard", minDeposit: "$5", spread: "1.0 pips", commission: "None", best: "Most traders" },
  { name: "XM Ultra Low", minDeposit: "$50", spread: "0.6 pips", commission: "None", best: "Cost-conscious", highlight: true },
  { name: "Shares", minDeposit: "$10,000", spread: "Market", commission: "Variable", best: "Stock traders" },
];

const PROS = [
  "$5 minimum deposit",
  "M-Pesa deposits supported",
  "Free Forex education & webinars",
  "ASIC & CySEC regulated",
  "No deposit or withdrawal fees",
  "Loyalty rewards program",
];
const CONS = [
  "Standard spreads higher than ECN brokers",
  "No cTrader platform",
  "Shares account requires $10,000",
];

const REGULATORS = [
  { authority: "ASIC", country: "Australia", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "DFSA", country: "Dubai", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
  { authority: "IFSC", country: "Belize", tier: "Tier 3", tierColor: "text-yellow-300 bg-yellow-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$5", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$5" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$5" },
  { name: "Bank Transfer", time: "2–5 days", fee: "Free", min: "$200" },
];

const AFFILIATE_LINK = "https://affs.click/MbQNk";

const FAQS = [
  {
    q: <>How do I open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">XM</a> account?</>,
    a: <>Go to the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">XM registration page</a>, fill in your email and personal details, choose your account type, verify your identity and submit proof of adress.Once the verification is done, you can deposit from $5 via M-Pesa to start trading immediately.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> safe for Kenyan traders?</>,
    a: <>Yes, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> is regulated by ASIC (Australia) and CySEC (Cyprus), two of the most respected financial regulators globally. Kenyan clients are served through the IFSC (Belize) entity with full negative balance protection.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> supports M-Pesa for deposits in Kenya. The minimum via M-Pesa is just $5 and there are no internal deposit fees. Withdrawals via M-Pesa are also supported.</>,
  },
  {
    q: <>What is the minimum deposit at <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a>?</>,
    a: <>The Micro and Standard accounts both require a minimum of just $5, making <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> one of the most accessible brokers for Kenyan traders starting out.</>,
  },
  {
    q: <>What is the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> Ultra Low account?</>,
    a: <>The Ultra Low account offers spreads from 0.6 pips with no commission, available from $50. It sits between standard and ECN accounts and is ideal for traders who want lower costs without paying per-lot commissions.</>,
  },
  {
    q: <>Does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> offer educational resources?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> has one of the best educational offerings among retail brokers, including live webinars, video tutorials, trading seminars, and a comprehensive research section updated daily. This is a key reason why it is our top pick for beginners.</>,
  },
  {
    q: "What leverage does XM offer?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> offers leverage up to 1:1000 on Micro and Standard accounts for clients under the IFSC entity. CySEC and ASIC-regulated accounts are capped at 1:400 per regulatory requirements.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> regulated by the CMA in Kenya?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> is not yet licensed by the Kenyan Capital Markets Authority (CMA). Kenyan clients are onboarded through XM Global Limited, regulated by the IFSC in Belize. The group holds ASIC and CySEC licences.</>,
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
export default function XMReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>XM Group Review 2026 — Best Broker for Beginners in Kenya | FxBrokers.co.ke</title>
        <meta name="description" content="XM Group review for Kenyan traders 2026. Compare spreads, M-Pesa support, education, ASIC regulation, and $5 minimum deposit accounts." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/xm-group" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Organization", name: "XM Group" },
          reviewRating: { "@type": "Rating", ratingValue: "4.6", bestRating: "5" },
          author: { "@type": "Organization", name: "FxBrokers.co.ke" },
        })}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">XM Group Review</span>
        </nav>

        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0">
              <img src="/xm.png" alt="XM Group Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">XM Group Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">BEST FOR BEGINNERS</span>
              </div>
              <p className="text-gray-500 max-w-xl font-semibold mb-4 text-md leading-relaxed">
                XM Group is our top pick for beginner Kenyan traders, combining a $5 minimum deposit, free education, M-Pesa support, and a trusted ASIC-regulated reputation built over 15+ years.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["ASIC & CySEC", "M-Pesa", "$5 Min", "Free Education"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <div className="w-full md:w-auto flex pt-4 gap-2">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-amber-400 text-[#07101E] font-bold py-2 rounded-sm text-center hover:bg-[#b5953b] transition-all">
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
                <span className="w-1 h-5 bg-amber-400 rounded-full"></span> XM Group Review
              </h2>
              <p className="text-md leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">XM Group</a> has been serving retail traders since 2009 and has grown to over 10 million clients globally. For Kenyan traders, its appeal is straightforward: a $5 minimum deposit via M-Pesa, no withdrawal fees, and the most comprehensive free education suite of any broker on this list. If you are new to forex, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">XM</a> is where we recommend starting.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-md font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => <div key={p} className="flex items-center gap-2 text-md mb-2"><span className="text-emerald-500">✓</span> {p}</div>)}
                </div>
                <div>
                  <h4 className="text-red-400 text-md font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => <div key={c} className="flex items-center gap-2 text-md mb-2"><span className="text-red-500">✕</span> {c}</div>)}
                </div>
              </div>
            </section>

            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-xl mb-4">Account Types</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-125">
                  <thead>
                    <tr className="text-gray-500 text-sm uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Type</th><th className="pb-3">Min Dep</th><th className="pb-3">Spread</th><th className="pb-3">Commission</th><th className="pb-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-amber-400" : ""}>
                        <td className="py-4 font-medium text-white">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-md">{acc.commission}</td>
                        <td className="py-4 text-md text-gray-500">{acc.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-6">
              <h2 className="text-white font-bold text-xl mb-4">Deposits & Withdrawals</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-gray-500 text-sm uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th><th className="pb-3">Processing</th><th className="pb-3">Fee</th><th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name} className={pm.highlight ? "text-amber-400" : ""}>
                        <td className="py-3 font-medium text-white flex items-center gap-2">
                          {pm.name}
                          {pm.highlight && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Recommended</span>}
                        </td>
                        <td className="py-3 text-md">{pm.time}</td>
                        <td className="py-3 text-md">{pm.fee}</td>
                        <td className="py-3 text-md">{pm.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="py-4 mt-6">
                  <p className="text-gray-200 text-md mb-4 leading-relaxed">
                    XM accepts M-Pesa deposits with instant processing and no fees, making it ideal for Kenyan traders. Additional deposit methods include Visa, Mastercard, Skrill, Astropay, Neteller, Bank Transfer, and Binance Pay for maximum flexibility.
                  </p>
                <img src="/xmdeposit.png" alt="XM Payment Methods" className="mt-6 rounded border border-white/5" />
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
              <h2 className="text-white font-bold text-lg mb-4">XM Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-6 sticky top-24">
              <div className="space-y-4">
                <div className="bg-emerald-500/5 p-4"><p className="text-emerald-400 text-[10px] font-bold uppercase mb-1">Local Support</p><p className="text-white text-xs font-medium">M-Pesa from $5</p></div>
                <div className="bg-blue-500/5 p-4"><p className="text-blue-400 text-[10px] font-bold uppercase mb-1">Regulation</p><p className="text-white text-xs font-medium">ASIC & CySEC Licensed</p></div>
                <div className="bg-purple-500/5 p-4"><p className="text-purple-400 text-[10px] font-bold uppercase mb-1">Unique Feature</p><p className="text-white text-xs font-medium">Free Education & Webinars</p></div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-amber-400 text-[#07101E] font-bold py-3 rounded-sm text-center text-sm hover:bg-[#b5953b] transition-all">
                Open XM Account →
              </a>
              <p className="text-[10px] text-gray-600 text-center mt-2">Min deposit: $5 via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}