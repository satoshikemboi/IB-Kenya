import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AuthorCard from "./Authorcard";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.0,
  "Spreads & Fees": 8.7,
  "Platforms & Tools": 9.3,
  "Deposits & Withdrawals": 8.9,
  "Customer Support": 8.5,
};

const ACCOUNT_TYPES = [
  { name: "Standard",      minDeposit: "$5",   spread: "0.5 pips", commission: "None",       best: "Beginners" },
  { name: "Derived",       minDeposit: "$5",   spread: "0.5 pips", commission: "None",       best: "Synthetic indices" },
  { name: "Financial",     minDeposit: "$100", spread: "0.1 pips", commission: "None",       best: "Forex traders",   highlight: true },
  { name: "Financial STP", minDeposit: "$100", spread: "0.1 pips", commission: "$5/lot",     best: "Pro traders" },
];

const PROS = [
  "Synthetic indices — trade 24/7 even on weekends",
  "M-Pesa deposits & withdrawals supported",
  "Proprietary DTrader, DBot & SmartTrader platforms",
  "Regulated by MFSA, LFSA & VFSC",
];
const CONS = [
  "Higher minimum deposit on Financial accounts ($100)",
  "No MetaTrader 5 on standard accounts",
  "Customer support can be slow during peak hours",
];

const REGULATORS = [
  { authority: "MFSA",  country: "Malta",         tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "LFSA",  country: "Labuan, Malaysia", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
  { authority: "VFSC",  country: "Vanuatu",       tier: "Tier 3", tierColor: "text-yellow-300 bg-yellow-500/15" },
  { authority: "BVIFSC",country: "British Virgin Islands", tier: "Tier 3", tierColor: "text-yellow-300 bg-yellow-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa",  time: "Instant",  fee: "Free",    min: "$5",   highlight: true },
  { name: "Visa",    time: "Instant",  fee: "Free",    min: "$10" },
  { name: "Skrill",  time: "Instant",  fee: "Free",    min: "$5" },
  { name: "Neteller",time: "Instant",  fee: "Free",    min: "$5" },
  { name: "Crypto",  time: "~30 min",  fee: "Network", min: "$5" },
];

const AFFILIATE_LINK = "https://track.deriv.com/_QstxbfW082hZl7VyVw174GNd7ZgqdRLk/1/";

const FAQS = [
  {
    q: <>How do I open a <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> account?</>,
    a: <>Visit the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv sign-up page</a>, enter your email and country, then verify your identity with a government-issued ID. Once approved you can fund your account and start trading.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> safe for Kenyan traders?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> is regulated by the MFSA (Malta), LFSA (Labuan), and VFSC (Vanuatu). Client funds are held in segregated accounts and the platform has operated continuously since 1999 (formerly Binary.com).</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa on Deriv?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> supports M-Pesa for both deposits and withdrawals in Kenya. Deposits are processed instantly with a minimum of $5, and withdrawals are typically completed within minutes.</>,
  },
  {
    q: <>What are synthetic indices on <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a>?</>,
    a: <>Synthetic indices are proprietary instruments available exclusively on <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a>. They simulate real market movements using a cryptographically secure random number generator, meaning you can trade 24/7 including weekends and holidays.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> in Kenya?</>,
    a: <>Standard and Derived accounts require a minimum deposit of just $5. Financial and Financial STP accounts require $100 to access tighter raw spreads and ECN-style execution.</>,
  },
  {
    q: <>Which platforms does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> offer?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> offers DTrader (web-based options & multipliers), DBot (drag-and-drop trading bot builder), SmartTrader (classic binary options), and MetaTrader 5 (MT5) for forex and CFDs. All platforms are available on desktop and mobile.</>,
  },
  {
    q: "Does Deriv charge withdrawal fees?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> does not charge internal withdrawal fees for M-Pesa, e-wallets, or card withdrawals. Standard M-Pesa transaction charges from Safaricom may apply on your end.</>,
  },
  {
    q: <>What leverage does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> offer?</>,
    a: <>Leverage on <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">Deriv</a> MT5 accounts goes up to 1:1000 on Standard accounts and 1:100 on Financial accounts. Synthetic indices also support high leverage up to 1:1000 depending on the instrument.</>,
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
export default function DerivReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>Deriv Review 2026 — M-Pesa, Synthetic Indices & MT5 | FxBrokers.co.ke</title>
        <meta name="description" content="In-depth Deriv review for Kenyan traders in 2026. Compare account types, spreads, M-Pesa support, synthetic indices, and regulation." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/deriv" />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">Deriv Review</span>
        </nav>

        {/* Hero */}
        <header className="md:px-3 mb-8 flex gap-x-6 flex-col lg:flex-row items-center lg:items-start">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center text-[#07101E] font-black text-2xl shrink-0 shadow-xl">
              <img src="/deriv.png" alt="Deriv Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">Deriv Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">SYNTHETIC INDICES</span>
              </div>
              <p className="text-gray-400 max-w-xl mb-4 text-md md:text-lg leading-relaxed">
                Deriv (formerly Binary.com) is the only broker offering proprietary synthetic indices you can trade 24/7 — including weekends. With M-Pesa support, a $5 minimum deposit, and multiple platforms including MT5 and DBot, it's a strong choice for Kenyan traders.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["MFSA", "M-Pesa", "Synthetic Indices", "MT5", "DBot"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">{tag}</span>
                ))}
              </div>

              <div className="w-full md:w-auto flex pt-4 mb-4 gap-2">
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-amber-400 text-[#07101E] font-bold py-2 rounded-sm text-center hover:bg-[#b5953b] transition-all"
                >
                  Open Account
                </a>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 border border-white/10 py-2 rounded-sm text-center text-sm hover:bg-white/5 transition-all"
                >
                  Try Demo
                </a>
              </div>
            </div>
          </div>
          <div className="md:max-w-lg md:pl-4 gap-4">
            <AuthorCard
              name="Felix"
              role="Lead Forex Analyst & Editor"
              date="March 31, 2026"
              updatedDate="March 31, 2026"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Verdict */}
            <section className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                Deriv Review
              </h2>
              <p className="text-md leading-relaxed mb-4">
                Deriv stands out in the Kenyan market primarily because of its <strong>synthetic indices</strong> — instruments you won't find at any other broker. These allow you to trade volatility, crash, and boom indices around the clock, making it popular among traders who want exposure beyond traditional forex pairs.
              </p>
              <p className="text-md leading-relaxed mb-4">
                The broker has been operating since 1999 under the Binary.com brand, giving it a long track record. The platform suite — DTrader, DBot, SmartTrader, and MT5 — covers everything from manual trading to fully automated bot strategies.
              </p>

              {/* Score Bars */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="font-semibold text-sm mb-4 uppercase tracking-widest text-[10px] text-gray-500">Our Scores</h3>
                {Object.entries(SCORES).map(([label, score]) => (
                  <ScoreBar key={label} label={label} score={score} />
                ))}
              </div>

              {/* Pros / Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5 mt-2">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => (
                    <div key={p} className="flex items-start gap-2 text-md mb-2">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => (
                    <div key={c} className="flex items-start gap-2 text-md mb-2">
                      <span className="text-red-500 mt-0.5 shrink-0">✕</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Account Table */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-2xl mb-1">Account Types</h2>
              <p className="text-gray-500 text-sm mb-4">Deriv offers four main account types suited to different trading styles.</p>
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

            {/* Platforms */}
            <section className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                Trading Platforms
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                Deriv offers a broader platform suite than most brokers. Beyond MT5, they have built their own proprietary tools that are genuinely useful.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "DTrader",      desc: "Web-based platform for options, multipliers & digital contracts. Simple and fast.",          icon: "📊" },
                  { name: "DBot",         desc: "Drag-and-drop bot builder — create automated strategies without writing code.",              icon: "🤖" },
                  { name: "MetaTrader 5", desc: "Full MT5 for forex, commodities & CFDs. Supports EAs and advanced charting.",               icon: "📈" },
                  { name: "SmartTrader",  desc: "Classic binary options interface. Familiar to existing Binary.com users.",                   icon: "⚡" },
                ].map(p => (
                  <div key={p.name} className="bg-[#0D1B2E] border border-white/8 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{p.icon}</span>
                      <p className="text-white font-semibold text-sm">{p.name}</p>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deposits & Withdrawals */}
            <section className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                Deposits & Withdrawals
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                Deriv supports M-Pesa natively for Kenyan traders. Deposits are instant and the minimum is just $5. Withdrawals are processed within 1 business day for most methods.
              </p>
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
                    {PAYMENT_METHODS.map(m => (
                      <tr key={m.name} className={m.highlight ? "text-[#C9A84C]" : ""}>
                        <td className="py-3 font-medium text-white flex items-center gap-2">
                          {m.highlight && <span className="text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-1.5 py-0.5">KE</span>}
                          {m.name}
                        </td>
                        <td className="py-3">{m.time}</td>
                        <td className="py-3 text-xs">{m.fee}</td>
                        <td className="py-3 text-xs">{m.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Regulation */}
            <section className="py-6">
              <h2 className="text-white font-bold text-xl mb-4 tracking-tight">Safety & Regulation</h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Deriv operates under multiple regulatory licences. Kenyan clients are typically served under the LFSA (Labuan) entity. Client funds are held in segregated accounts at reputable banks.
              </p>
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
              <h2 className="text-white font-bold text-xl mb-4">Deriv Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>

          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-full max-w-70">
            <div className="sticky top-24 space-y-6">

              {/* Quick stats */}
              <div className="bg-[#0a1628] border border-white/8 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Quick Facts</p>
                {[
                  { label: "Min Deposit",   value: "$5" },
                  { label: "Max Leverage",  value: "1:1000" },
                  { label: "Spreads From",  value: "0.1 pips" },
                  { label: "Platforms",     value: "MT5, DTrader, DBot" },
                  { label: "Founded",       value: "1999" },
                  { label: "M-Pesa",        value: "✓ Supported" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-500 text-xs">{item.label}</span>
                    <span className="text-white text-xs font-semibold">{item.value}</span>
                  </div>
                ))}
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block mt-4 bg-amber-400 hover:bg-[#b5953b] text-[#07101E] font-bold text-sm py-2.5 rounded-sm text-center transition-all"
                >
                  Open Deriv Account
                </a>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📲</span>
                    <div>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Local Support</p>
                      <p className="text-white text-xs font-semibold">M-Pesa Deposits & Withdrawals</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Unique Feature</p>
                      <p className="text-white text-xs font-semibold">Synthetic Indices 24/7</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Regulation</p>
                      <p className="text-white text-xs font-semibold">MFSA & LFSA Licensed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score summary */}
              <div className="bg-[#0a1628] border border-white/8 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Our Scores</p>
                {Object.entries(SCORES).map(([label, score]) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-white font-bold">{score}</span>
                    </div>
                    <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C9A84C]" style={{ width: `${score * 10}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-white/8 flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Overall</span>
                  <span className="text-[#C9A84C] font-bold text-lg">
                    {(Object.values(SCORES).reduce((a, b) => a + b, 0) / Object.values(SCORES).length).toFixed(1)}/10
                  </span>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}