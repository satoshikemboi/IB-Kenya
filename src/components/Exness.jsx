import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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

const PROS = ["No minimum deposit", "Instant 24/7 M-Pesa", "Spreads from 0.0 pips", "FCA & CySEC regulated"];
const CONS = ["No cTrader platform", "Not available to US clients"];

const REGULATORS = [
  { authority: "FCA", country: "UK", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "FSCA", country: "South Africa", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$1", highlight: true },
  { name: "Visa", time: "Instant", fee: "Free", min: "$10" },
  { name: "Crypto", time: "~30 min", fee: "Network", min: "$10" },
];

const AFFILIATE_LINK = "https://one.exnessonelink.com/a/1sh0vxrgqd";
const BROKERPAGE_LINK = "https://www.exnesspromo.com/en/trade-on-the-go-app/?partner_id=1sh0vxrgqd";

const FAQS = [
  { 
    q: <>How to register an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> account</>, 
    a: <>To open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> account, go to <a href={BROKERPAGE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness official page</a>. Enter your personal details and proceed to verify your identity and proof of adress. Once verified, you can proceed to deposit and trade.</>
  },
  { 
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> safe for Kenyan traders?</>, 
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> is highly regulated by the FCA (UK), CySEC (Cyprus), and the FSCA (South Africa). They provide negative balance protection and hold client funds in segregated top-tier bank accounts.</>
  },
  { 
    q: "Can I deposit and withdraw with M-Pesa?", 
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> offers native M-Pesa integration. Deposits are instant, and withdrawals are typically processed within seconds to minutes, 24/7. The minimum deposit via M-Pesa is $1.</>
  },
  { 
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> in Kenya?</>, 
    a: <>For Standard and Standard Cent accounts, there is no fixed minimum deposit (as low as $1 via M-Pesa). Professional accounts like Raw Spread, Pro, and Zero require a minimum initial deposit of $200.</>
  },
  { 
    q: <>Does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> offer a No Deposit Bonus?</>, 
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> generally does not offer traditional &apos;No Deposit Bonuses.&apos; Instead, they focus on providing the industry&apos;s lowest spreads and instant withdrawal technology to provide better long-term value for traders.</>
  },
  { 
    q: "What is the maximum leverage available?", 
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> offers &apos;Unlimited Leverage&apos; for experienced traders meeting specific criteria (less than 10 closed positions and 5 lots traded). Standard accounts typically access up to 1:2000 leverage.</>
  },
  { 
    q: "Which trading platforms can I use?", 
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> supports MetaTrader 4 (MT4), MetaTrader 5 (MT5), the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> Web Terminal, and the highly-rated <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> Trade mobile app available on Android and iOS.</>
  },
  { 
    q: "Are there any withdrawal fees?", 
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> does not charge any internal fees for M-Pesa or E-wallet withdrawals. However, M-Pesa users may incur standard mobile money transaction charges when sending or receiving funds from their line.</>
  },
  { 
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> regulated by the CMA in Kenya?</>, 
    a: <>While <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Exness</a> is not currently licensed by the Kenyan Capital Markets Authority (CMA), they serve Kenyan traders via their FSA (Seychelles) and FSCA (South Africa) licenses, which are widely respected global regulations.</>
  }
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
export default function ExnessReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>Exness Review 2025 — M-Pesa & Low Spreads | FxBrokers.co.ke</title>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-gray-400">Exness Review</span>
        </nav>

        {/* Hero Section */}
        <header className="  p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className=" flex items-center justify-center text-[#07101E] font-black text-2xl shrink-0 shadow-xl">
              <img src="/exness.png" alt="Exness Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">Exness Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">#1 KENYA PICK</span>
              </div>
              <p className="text-gray-400 max-w-xl mb-4 text-md leading-relaxed">The best all-rounder for Kenyans: Instant M-Pesa, $10 minimum deposit, and Tier-1 regulation from the FCA.Exness offers favourable trading conditions by allowing fast trade executions and fast deposits & withdrawals</p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["FCA", "M-Pesa", "Instant"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              
            <div className="w-full md:w-auto flex pt-4 gap-2">
              <a href="https://one.exnessonelink.com/a/1sh0vxrgqd" target="_blank" rel="noopener noreferrer sponsored" className="w-full md:w-44 bg-amber-400 text-[#07101E] font-bold py-2 rounded-sm text-center hover:bg-[#b5953b] transition-all">Open Account</a>
              <a href="https://one.exnessonelink.com/a/1sh0vxrgqd" target="_blank" rel="noopener noreferrer sponsored" className="w-full md:w-44 border border-white/10 py-2 rounded-sm text-center text-sm hover:bg-white/5 transition-all">Try Demo</a>
            </div>
            </div>
          </div>
        </header>

        <div className="my-6">
          <a href="https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd">
          <img src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Take_control_1200x628.png" width="1200" height="628" alt="" />
        </a>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Verdict */}
            <section className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Exness Review
              </h2>
              <p className="text-md leading-relaxed mb-4">Exness is currently our top-rated broker for Kenyan traders. Unlike most international brokers, they have mastered local needs by providing <strong>Native M-Pesa integration</strong> that actually works 24/7.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => <div key={p} className="flex items-center gap-2 text-md mb-2"> <span className="text-emerald-500">✓</span> {p}</div>)}
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => <div key={c} className="flex items-center gap-2 text-md mb-2"> <span className="text-red-500">✕</span> {c}</div>)}
                </div>
              </div>
            </section>

            {/* Account Table */}
            <section className=" p-6 overflow-hidden">
              <h2 className="text-white font-bold text-2xl mb-4">Account Comparison</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-125">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Min Dep</th>
                      <th className="pb-3">Spread</th>
                      <th className="pb-3">Commission</th>
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

            <div className="my-6 items-center">
              <p className="font-semibold py-3 mb-3 text-md">Exness offers multiple means of deposit. They include M-Pesa, Airtel money, Skrill, Neteller and Bank Card. This ensures fast deposit and withdrwals with zero fees.</p>
              <img src="/exnessdeposit.png" width="1200" height="628" alt="exness deposit" className="rounded-xs shadow-xl mx-auto" />
            </div>

            {/* Regulation */}
            <section className="py-6">
              <h2 className="text-white font-bold text-xl mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between rounded-full items-center px-6 py-3 bg-white/5 border border-white/5">
                    <div>
                      <p className="text-white font-bold text-sm">{reg.authority}</p>
                      <p className="text-[10px] text-gray-500">{reg.country}</p>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>{reg.tier}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-white font-bold text-xl mb-4">Exness Kenya FAQ</h2>
              {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-full max-w-70">
  <div className="sticky top-24 space-y-6">
    {/* Trust Badges */}
    <div className="space-y-3">
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 transition-hover hover:bg-emerald-500/10">
        <div className="flex items-center gap-3">
          <span className="text-xl">📲</span>
          <div>
            <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Local Support</p>
            <p className="text-white text-xs font-semibold">M-Pesa Native Deposits</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 transition-hover hover:bg-blue-500/10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🛡️</span>
          <div>
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Regulation</p>
            <p className="text-white text-xs font-semibold">FCA & CySEC Licensed</p>
          </div>
        </div>
      </div>
    </div>

    {/* Exness Banner Section */}
    <div className="flex flex-col items-center">
      <a 
        href="https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd"
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block transition-transform hover:scale-[1.01]"
      >
        <img 
          src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Take_control_120x600.png" 
          width="120" 
          height="600" 
          alt="Exness Forex Trading Banner - Take Control" 
          className="rounded-lg shadow-xl mx-auto"
        />
      </a>
    </div>
  </div>
</aside>
        </div>
      </main>
    </div>
  );
}