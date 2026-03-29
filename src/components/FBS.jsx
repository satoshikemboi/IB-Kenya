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
export default function FBSReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>FBS Review 2026 — $1 Min Deposit & M-Pesa Kenya | FxBrokers.co.ke</title>
        <meta name="description" content="FBS review for Kenyan traders 2026. $1 minimum deposit, M-Pesa support, Cent account for beginners, and up to 1:3000 leverage. Full review." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/fbs" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Organization", name: "FBS" },
          reviewRating: { "@type": "Rating", ratingValue: "4.2", bestRating: "5" },
          author: { "@type": "Organization", name: "FxBrokers.co.ke" },
        })}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">FBS Review</span>
        </nav>

        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0">
              <img src="/fbs.png" alt="FBS Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">FBS Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">$1 DEPOSIT</span>
              </div>
              <p className="text-gray-500 max-w-xl font-semibold mb-4 text-sm leading-relaxed">
                FBS offers the lowest entry point of any broker we review — start trading with just $1 via M-Pesa on the Cent account. Popular across Africa for its accessibility and high leverage options.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["CySEC Licensed", "M-Pesa", "$1 Min", "1:3000 Leverage"].map(tag => (
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
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> FBS Review
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> is one of the most popular forex brokers in Africa, and for good reason. Its Cent account — requiring just $1 via M-Pesa — is the most accessible way for any Kenyan to start live forex trading. While its regulation (IFSC, Belize for Kenyan clients) is not as strong as FCA-regulated competitors, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">FBS</a> has operated reliably since 2009 and has a large, satisfied client base across Kenya and East Africa.
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
            </section>

            <section className="p-6">
              <h2 className="text-white font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="mb-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-xs">⚠️ Kenyan clients are served under the IFSC (Belize) entity. While the group holds CySEC and ASIC licences, these do not directly cover Kenyan accounts.</p>
              </div>
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
              <h2 className="text-white font-bold text-lg mb-4">FBS Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-6 sticky top-24">
              <div className="space-y-4">
                <div className="bg-emerald-500/5 p-4"><p className="text-emerald-400 text-[10px] font-bold uppercase mb-1">Local Support</p><p className="text-white text-xs font-medium">M-Pesa from $1</p></div>
                <div className="bg-yellow-500/5 p-4 border border-yellow-500/10"><p className="text-yellow-400 text-[10px] font-bold uppercase mb-1">Regulation</p><p className="text-white text-xs font-medium">CySEC (Group) · IFSC (KE)</p></div>
                <div className="bg-purple-500/5 p-4"><p className="text-purple-400 text-[10px] font-bold uppercase mb-1">Unique Feature</p><p className="text-white text-xs font-medium">$1 Cent Account</p></div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-amber-400 text-[#07101E] font-bold py-3 rounded-sm text-center text-md hover:bg-[#b5953b] transition-all">
                Open FBS Account →
              </a>
              <p className="text-[10px] text-gray-600 text-center mt-2">Min deposit: $1 via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}