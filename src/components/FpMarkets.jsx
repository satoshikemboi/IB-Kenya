import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.2,
  "Spreads & Fees": 9.4,
  "Platforms & Tools": 9.6,
  "Deposits & Withdrawals": 7.8,
  "Customer Support": 8.5,
};

const ACCOUNT_TYPES = [
  {
    name: "Standard",
    minDeposit: "$100",
    spread: "1.0 pips",
    commission: "None",
    best: "Beginners",
  },
  {
    name: "Raw",
    minDeposit: "$100",
    spread: "0.0 pips",
    commission: "$3/lot/side",
    best: "Active traders",
    highlight: true,
  },
  {
    name: "Islamic",
    minDeposit: "$100",
    spread: "1.0 pips",
    commission: "None",
    best: "Swap-free traders",
  },
];

const PROS = [
  "CMA (Kenya), ASIC & CySEC regulated",
  "Raw spreads from 0.0 pips",
  "MT4, MT5, cTrader & TradingView",
  "10,000+ tradable instruments",
  "Free Autochartist & Trading Central",
  "VPS hosting for algo traders",
  "Lightning-fast 29ms execution",
];

const CONS = [
  "No native M-Pesa integration",
  "No KES account currency",
  "$100 minimum deposit",
  "Inactivity fee on dormant accounts",
  "No cTrader on Standard account",
];

const REGULATORS = [
  {
    authority: "ASIC",
    country: "Australia",
    license: "No. 286354",
    tier: "Tier 1",
    tierColor: "text-blue-300 bg-blue-500/15",
  },
  {
    authority: "CySEC",
    country: "Cyprus",
    license: "No. 371/18",
    tier: "Tier 1",
    tierColor: "text-blue-300 bg-blue-500/15",
  },
  {
    authority: "CMA",
    country: "Kenya",
    license: "Non-Dealing",
    tier: "Tier 2",
    tierColor: "text-emerald-300 bg-emerald-500/15",
  },
  {
    authority: "FSCA",
    country: "South Africa",
    license: "FSP No. 50926",
    tier: "Tier 2",
    tierColor: "text-emerald-300 bg-emerald-500/15",
  },
];

const PAYMENT_METHODS = [
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$100" },
  { name: "Skrill", time: "Instant", fee: "Free", min: "$100" },
  { name: "Neteller", time: "Instant", fee: "Free", min: "$100" },
  { name: "Crypto", time: "~30 min", fee: "Network fee", min: "$100" },
  { name: "Bank Wire", time: "2–5 days", fee: "Bank charges", min: "$100" },
];

const PLATFORMS = [
  {
    name: "MetaTrader 4",
    tag: "MT4",
    desc: "Industry standard. Ideal for EA automation and custom indicators.",
  },
  {
    name: "MetaTrader 5",
    tag: "MT5",
    desc: "Multi-asset powerhouse with depth-of-market and economic calendar.",
  },
  {
    name: "cTrader",
    tag: "cTrader",
    desc: "Raw account only. Level II pricing, cAlgo automation & slick UI.",
  },
  {
    name: "TradingView",
    tag: "TV",
    desc: "Raw account only. Best-in-class charting directly in your browser.",
  },
];

const AFFILIATE_LINK = "https://www.fpmarkets.com/switch-to-fp-markets/?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167";

const FAQS = [
  {
    q: (
      <>
        How do I open an{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        account as a Kenyan trader?
      </>
    ),
    a: (
      <>
        Visit the{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets website
        </a>{" "}
        and click &apos;Open Live Account.&apos; Fill in your personal details,
        upload a valid Kenyan government ID and proof of address, then fund your
        account via card, Skrill, Neteller, or bank wire. Verification is
        usually completed within minutes.
      </>
    ),
  },
  {
    q: (
      <>
        Is{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        safe and regulated in Kenya?
      </>
    ),
    a: (
      <>
        Yes.{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        holds a non-dealing licence from the Capital Markets Authority of Kenya
        (CMA), making it fully legal to operate and serve Kenyan clients. On top
        of that, its parent company is regulated by ASIC (Australia) and CySEC
        (Cyprus) — two of the world&apos;s most respected Tier-1 regulators.
        Client funds are held in segregated accounts at top-tier banks.
      </>
    ),
  },
  {
    q: "What is the minimum deposit for FP Markets?",
    a: (
      <>
        The minimum deposit for both the Standard and Raw accounts is{" "}
        <strong>$100</strong> (approximately KES 13,000). There is no higher
        entry requirement for any forex account type — both beginners and
        advanced traders start at the same $100 threshold.
      </>
    ),
  },
  {
    q: "Does FP Markets support M-Pesa?",
    a: (
      <>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        does not currently offer direct M-Pesa integration. Kenyan traders
        should fund their accounts using Visa/Mastercard, Skrill, Neteller,
        cryptocurrency, or international bank wire. For traders who require
        M-Pesa, Exness or FxPesa may be more suitable alternatives.
      </>
    ),
  },
  {
    q: "What is the difference between the Standard and Raw accounts?",
    a: (
      <>
        The <strong>Standard account</strong> is commission-free with spreads
        starting from 1.0 pips — ideal for beginners who prefer simple, all-in
        pricing. The <strong>Raw account</strong> passes on the raw interbank
        spread (from 0.0 pips) and charges a low commission of $3 per lot per
        side ($6 round trip). The Raw account also unlocks cTrader and
        TradingView access.
      </>
    ),
  },
  {
    q: "What leverage does FP Markets offer Kenyan traders?",
    a: (
      <>
        Through the CMA-regulated entity, Kenyan clients can access leverage up
        to{" "}
        <strong>1:500</strong> on forex pairs. Leverage limits are lower on
        indices, equities, and cryptocurrencies. Always use leverage
        responsibly — higher leverage amplifies both profits and losses.
      </>
    ),
  },
  {
    q: "Which platforms are available on FP Markets?",
    a: (
      <>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        supports four trading platforms: <strong>MT4</strong>,{" "}
        <strong>MT5</strong>, <strong>cTrader</strong>, and{" "}
        <strong>TradingView</strong>. MT4 and MT5 are available on both
        accounts. cTrader and TradingView are exclusive to the Raw account.
        All platforms are accessible on desktop, web, iOS, and Android.
      </>
    ),
  },
  {
    q: "What tools and research does FP Markets provide?",
    a: (
      <>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        provides free access to <strong>Autochartist</strong> (automated pattern
        recognition) and <strong>Trading Central</strong> (institutional-grade
        analysis) on all live accounts. Active traders can also access free VPS
        hosting for uninterrupted 24/7 algorithmic trading with ultra-low
        latency.
      </>
    ),
  },
  {
    q: "Does FP Markets offer Islamic (swap-free) accounts?",
    a: (
      <>
        Yes. Swap-free Islamic accounts are available on request for both
        Standard and Raw account types. Contact{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        support after registration to have your account converted. Note that the
        Islamic account terms do not apply to all instruments.
      </>
    ),
  },
  {
    q: "How many instruments can I trade on FP Markets?",
    a: (
      <>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#E8491D] hover:underline"
        >
          FP Markets
        </a>{" "}
        offers over <strong>10,000 tradable instruments</strong> including 60+
        forex pairs, global indices, commodities, metals, shares, ETFs, bonds,
        and cryptocurrencies (where permitted). This makes it one of the
        broadest instrument ranges available to Kenyan traders.
      </>
    ),
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
        <div
          className="h-full bg-[#E8491D]"
          style={{ width: `${score * 10}%` }}
        />
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
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className="text-white font-medium text-sm">{q}</span>
        <span
          className={`text-[#E8491D] transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FpMarketsReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#E8491D]/30">
      <Helmet>
        <title>FP Markets Review 2026 — Raw Spreads & CMA Regulated | FxBrokers.co.ke</title>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">FP Markets Review</span>
        </nav>

        {/* Hero Section */}
        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0 shadow-xl">
              <img
                src="/fpmarkets.png"
                alt="FP Markets Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">
                  FP Markets Review 2026
                </h1>
                <span className="bg-[#E8491D]/10 text-orange-400 text-[10px] font-bold px-2 py-1 rounded border border-[#E8491D]/20">
                  BEST FOR TOOLS
                </span>
              </div>
              <p className="text-gray-400 max-w-xl mb-4 text-md leading-relaxed">
                An ASIC & CMA-regulated powerhouse with raw spreads from 0.0 pips,
                four world-class platforms (MT4, MT5, cTrader, TradingView), and
                over 10,000 instruments. The go-to choice for Kenyan traders who
                want professional-grade tools and rock-solid regulation.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["ASIC", "CMA", "CySEC", "0.0 pip Spreads", "cTrader"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="w-full md:w-auto flex pt-4 gap-2">
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-[#E8491D] text-white font-bold py-2 rounded-sm text-center hover:bg-[#c93d18] transition-all"
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
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Verdict */}
            <section className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#E8491D] rounded-full"></span> FP Markets Review
              </h2>
              <p className="text-md leading-relaxed mb-3">
                Founded in Australia in 2005, FP Markets has grown into one of
                the most respected ECN brokers in the world. For Kenyan traders,
                the headline attraction is its dual-tier regulatory standing —
                a CMA non-dealing licence locally, backed by the gold-standard
                ASIC licence from Australia and CySEC from Europe.
              </p>
              <p className="text-md leading-relaxed mb-4">
                Where FP Markets truly separates itself from the competition is
                its platform depth. Offering MT4, MT5, cTrader, and TradingView
                simultaneously is rare — and pairing that with free Autochartist
                signals, Trading Central analysis, and a VPS for algo traders
                makes this the most tool-rich broker available to Kenyan clients.
                The only notable gap: no direct M-Pesa support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5 mt-6">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                    The Good
                  </h4>
                  {PROS.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-md mb-2">
                      <span className="text-emerald-500">✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                    The Bad
                  </h4>
                  {CONS.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-md mb-2">
                      <span className="text-red-500">✕</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Account Table */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-2xl mb-4">
                Account Comparison
              </h2>
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
                    {ACCOUNT_TYPES.map((acc) => (
                      <tr key={acc.name} className={acc.highlight ? "text-[#E8491D]" : ""}>
                        <td className="py-4 font-medium text-white">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-xs">{acc.commission}</td>
                        <td className="py-4 text-xs text-gray-400">{acc.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                * Raw account unlocks cTrader and TradingView. VPS hosting available free for active traders.
              </p>
            </section>

            {/* Platforms */}
            <section className="p-6">
              <h2 className="text-white font-bold text-xl mb-2">
                Trading Platforms
              </h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                FP Markets is one of the only brokers globally to offer all four
                of the most popular trading platforms simultaneously. Each caters
                to a different trading style.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORMS.map((p) => (
                  <div
                    key={p.name}
                    className="p-4 rounded-xl bg-white/3 border border-white/5 flex gap-3 items-start"
                  >
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E8491D]/10 text-[#E8491D] border border-[#E8491D]/20 shrink-0 mt-0.5">
                      {p.tag}
                    </span>
                    <div>
                      <p className="text-white text-sm font-semibold mb-0.5">{p.name}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Payments Table */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-xl mb-2">
                Deposits & Withdrawals
              </h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                FP Markets does not support M-Pesa. Kenyan traders must fund
                accounts via international card, e-wallet, crypto, or bank wire.
                FP Markets charges no internal deposit fees on e-wallets and
                cards. Standard Safaricom or bank charges may apply on your side.
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th>
                      <th className="pb-3">Processing</th>
                      <th className="pb-3">Broker Fee</th>
                      <th className="pb-3">Min Deposit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map((m) => (
                      <tr key={m.name}>
                        <td className="py-3 font-medium text-white">{m.name}</td>
                        <td className="py-3 text-xs">{m.time}</td>
                        <td className="py-3 text-xs">{m.fee}</td>
                        <td className="py-3 text-xs">{m.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4">
                <p className="text-gray-400 text-md  py-4">
                    FPMarkets offers limited payment options for Kenyan traders, with no direct M-Pesa support. Kenyan users must rely on international methods like cards, Skrill, Neteller, crypto, or bank wire, all of which require a minimum $100 deposit. While the broker itself charges no fees on card and e-wallet deposits, users should be aware of potential charges from their payment providers.
                </p>
                    <img src="/fpdeposit.png" alt="FP Markets Deposit Methods" className="w-full max-w-md" />
               </div>
            </section>

            {/* Regulation */}
            <section className="py-6">
              <h2 className="text-white font-bold text-xl mb-2 tracking-tight">
                Safety & Regulation
              </h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                FP Markets (First Prudential Markets) operates multiple regulated
                entities worldwide. Kenyan clients are serviced through the
                CMA-licensed subsidiary. The broker segregates all client funds
                in top-tier bank accounts and undergoes independent third-party
                audits annually.
              </p>
              <div className="space-y-3">
                {REGULATORS.map((reg) => (
                  <div
                    key={reg.authority}
                    className="flex justify-between rounded-full items-center px-6 py-3 bg-white/5 border border-white/5"
                  >
                    <div>
                      <p className="text-white font-bold text-sm">{reg.authority}</p>
                      <p className="text-[10px] text-gray-500">
                        {reg.country} · {reg.license}
                      </p>
                    </div>
                    <span
                      className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}
                    >
                      {reg.tier}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-white font-bold text-xl mb-4">
                FP Markets Kenya FAQ
              </h2>
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-full max-w-70">
            <div className="sticky top-24 space-y-6">

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 hover:bg-blue-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Top-Tier Safety</p>
                      <p className="text-white text-xs font-semibold">ASIC + CySEC + CMA</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E8491D]/5 border border-[#E8491D]/10 rounded-2xl p-4 hover:bg-[#E8491D]/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">Execution Speed</p>
                      <p className="text-white text-xs font-semibold">29ms average fill time</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <div>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Free Research</p>
                      <p className="text-white text-xs font-semibold">Autochartist + Trading Central</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-4 hover:bg-purple-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🖥️</span>
                    <div>
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Free VPS</p>
                      <p className="text-white text-xs font-semibold">For algo & EA traders</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
                <h3 className="text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Founded", value: "2005 (Australia)" },
                    { label: "Min Deposit", value: "$100" },
                    { label: "Max Leverage", value: "1:500 (Kenya)" },
                    { label: "Instruments", value: "10,000+" },
                    { label: "Platforms", value: "MT4, MT5, cTrader, TV" },
                    { label: "Execution", value: "ECN / NDD, 29ms" },
                    { label: "Support", value: "24/6 Live Chat & Phone" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center text-xs"
                    >
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-white font-medium text-right max-w-[55%]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#E8491D]/5 border border-[#E8491D]/15 rounded-2xl p-5 text-center">
                <p className="text-white text-sm font-semibold mb-1">
                  Ready for raw spreads?
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  0.0 pip spreads with $3/lot commission on the Raw account
                </p>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-[#E8491D] text-white font-bold py-2.5 rounded-lg text-sm hover:bg-[#c93d18] transition-all"
                >
                  Open FP Markets Account
                </a>
                <p className="text-gray-600 text-[10px] mt-3">
                  Trading CFDs involves significant risk of loss
                </p>
              </div>

            </div>
          </aside>
        </div>
        <div className="flex justify-center my-8">
  <a 
    href="https://www.fpmarkets.com/?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167" 
    target="_blank" 
    rel="noopener noreferrer sponsored"
    className="block group transition-transform hover:scale-[1.01]"
  >
    <img 
      src="/fpmarkets-banner.png"  // <-- Download the image and save it here!
      alt="Trade with FP Markets - Tight Spreads and Fast Execution" 
      className="rounded-xl shadow-lg border border-white/5 group-hover:border-amber-400/20"
      width={728} // Standard leaderboard width, or adjust to your layout
      height={90}
    />
  </a>
</div>
      </main>
    </div>
  );
}