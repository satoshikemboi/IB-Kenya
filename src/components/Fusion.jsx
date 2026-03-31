import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AuthorCard from "./Authorcard";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 8.8,
  "Spreads & Fees": 9.6,
  "Platforms & Tools": 9.2,
  "Deposits & Withdrawals": 8.5,
  "Customer Support": 8.7,
};

const ACCOUNT_TYPES = [
  { name: "Classic", minDeposit: "$0", spread: "0.9 pips", commission: "None", best: "Beginners" },
  { name: "IC", minDeposit: "$200", spread: "0.0 pips", commission: "$3.0/lot", best: "Active traders", highlight: true },
  { name: "Islamic", minDeposit: "$0", spread: "0.9 pips", commission: "None", best: "Swap-free" },
];

const PROS = [
  "Spreads from 0.0 pips on IC account",
  "Low $3/lot commission — industry best",
  "ASIC & FSA regulated",
  "MT4 & MT5 supported",
  "Fast account verification",
];
const CONS = [
  "No M-Pesa native integration",
  "Withdrawals can take 1–2 business days",
  "Limited educational resources",
];

const REGULATORS = [
  { authority: "ASIC", country: "Australia", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "FSA", country: "Seychelles", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
];

const PAYMENT_METHODS = [
  { name: "Bank Transfer", time: "1–2 days", fee: "Free", min: "$100" },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$100" },
  { name: "Crypto (USDT)", time: "~20 min", fee: "Network", min: "$50", highlight: true },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$50" },
];

const AFFILIATE_LINK = "https://fusionmarkets.com/?refcode=111166";
const BROKERPAGE_LINK = "https://fusionmarkets.com/?refcode=111166";

const FAQS = [
  {
    q: <>How do I open a <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets</a> account?</>,
    a: <>Visit the <a href={BROKERPAGE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets website</a>, click "Open Account," and complete the registration form. You&apos;ll need to verify your identity (passport or national ID) and proof of address before you can fund and trade.</>
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets</a> safe for Kenyan traders?</>,
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets</a> is regulated by ASIC (Australia), one of the world&apos;s most respected financial regulators. Client funds are held in segregated accounts and negative balance protection is provided.</>
  },
  {
    q: "Can I deposit in Kenyan Shillings (KES)?",
    a: <>Most deposits are processed in USD. Kenyan traders typically deposit via international bank transfer, Visa/Mastercard, or cryptocurrency. There is no native M-Pesa integration; however, some Kenyan banks allow international USD transfers at competitive rates.</>
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets</a>?</>,
    a: <>The Classic account has no set minimum deposit. The IC account (raw spread) requires a minimum deposit of $200. Most payment methods have a minimum transaction of $50–$100.</>
  },
  {
    q: <>What spreads does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets</a> offer?</>,
    a: <>The Classic account offers spreads from 0.9 pips with no commission. The IC account offers raw interbank spreads from 0.0 pips with a low $3/lot commission — making it one of the most cost-effective accounts available globally.</>
  },
  {
    q: "Does Fusion Markets offer a swap-free (Islamic) account?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#00C2FF] hover:underline">Fusion Markets</a> offers an Islamic account with no swap or rollover fees, compliant with Sharia law. You can request this account type during registration or through live support.</>
  },
  {
    q: "Which trading platforms are available?",
    a: <>Fusion Markets supports MetaTrader 4 (MT4) and MetaTrader 5 (MT5) on desktop, web, and mobile. Both platforms support Expert Advisors (EAs), copy trading, and all major order types.</>
  },
  {
    q: "How long do withdrawals take?",
    a: <>Withdrawal requests are processed within 1 business day. Bank transfers may take an additional 1–2 banking days to reflect. E-wallet and card withdrawals are typically faster.</>
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ScoreBar({ label, score }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold">{score}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#00C2FF]" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-2 overflow-hidden bg-[#0A1628]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className="text-white font-medium text-sm">{q}</span>
        <span className={`text-[#00C2FF] transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
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
export default function FusionMarketsReview() {
  return (
    <div className="min-h-screen bg-[#060F1C] text-gray-300 selection:bg-[#00C2FF]/20">
      <Helmet>
        <title>Fusion Markets Review 2026 — Raw Spreads & Low Fees | FxBrokers.co.ke</title>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-gray-400">Fusion Markets Review</span>
        </nav>

        {/* Hero Section */}
        <header className="md:px-3 mb-8 flex gap-x-6 flex-col lg:flex-row items-center lg:items-start">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            {/* Logo */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="/fusion.png"
                alt="Fusion Markets Logo"
                className="w-24 h-24 object-contain"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    `<div class="w-24 h-24 rounded-2xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] font-black text-xl">FM</div>`;
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">
                  Fusion Markets Review 2026
                </h1>
                <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[10px] font-bold px-2 py-1 rounded border border-[#00C2FF]/20">
                  LOWEST FEES
                </span>
              </div>

              <p className="text-gray-400 max-w-xl mb-4 text-md md:text-lg leading-relaxed">
                Fusion Markets is one of the world&apos;s cheapest brokers for active forex traders. With raw spreads from 0.0 pips and a $3/lot commission, it&apos;s the go-to choice for cost-conscious traders in Kenya and across Africa.
              </p>

              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["ASIC", "Raw Spreads", "MT4 / MT5"].map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="w-full md:w-auto flex pt-4 mb-4 gap-2">
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-[#00C2FF] text-[#060F1C] font-bold py-2 rounded-sm text-center hover:bg-[#00a8db] transition-all"
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
              date="January 10, 2026"
              updatedDate="March 28, 2026"
            />
          </div>
        </header>

        {/* Banner */}
        <div className="my-6">
          <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored">
            <div className="w-full h-24 rounded-lg bg-linear-to-r from-[#00C2FF]/10 via-[#0A1628] to-[#00C2FF]/5 border border-[#00C2FF]/15 flex items-center justify-center gap-4">
              <span className="text-[#00C2FF] text-2xl font-black">0.0</span>
              <span className="text-white text-sm font-semibold">pips raw spread · $3/lot · ASIC regulated</span>
              <span className="ml-4 bg-[#00C2FF] text-[#060F1C] text-xs font-bold px-4 py-1.5 rounded-sm">Start Trading →</span>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Verdict */}
            <section className="p-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#00C2FF] rounded-full"></span> Fusion Markets Review
              </h2>
              <p className="text-md leading-relaxed mb-3">
                Fusion Markets is an ASIC-regulated Australian broker that has built a strong reputation for offering some of the lowest trading costs globally. Their IC account delivers true raw interbank spreads from <strong>0.0 pips</strong> with a flat <strong>$3/lot commission</strong> — making it among the most affordable accounts for forex traders anywhere.
              </p>
              <p className="text-md leading-relaxed mb-4 text-gray-400">
                For Kenyan traders who trade high volumes or use EAs, Fusion Markets offers exceptional value. The main trade-off is the absence of M-Pesa integration, which means local deposits require card or bank transfer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => (
                    <div key={p} className="flex items-center gap-2 text-md mb-2">
                      <span className="text-emerald-500">✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => (
                    <div key={c} className="flex items-center gap-2 text-md mb-2">
                      <span className="text-red-500">✕</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Scores */}
            <section className="p-6 bg-white/2 border border-white/5 rounded-2xl">
              <h2 className="text-white font-bold text-xl mb-5">Our Ratings</h2>
              {Object.entries(SCORES).map(([label, score]) => (
                <ScoreBar key={label} label={label} score={score} />
              ))}
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-gray-400 text-sm font-semibold">Overall Score</span>
                <span className="text-white font-black text-xl">
                  {(Object.values(SCORES).reduce((a, b) => a + b, 0) / Object.values(SCORES).length).toFixed(1)}/10
                </span>
              </div>
            </section>

            {/* Account Table */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-2xl mb-4">Account Comparison</h2>
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
                      <tr key={acc.name} className={acc.highlight ? "text-[#00C2FF]" : ""}>
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

            {/* Deposits */}
            <section className="py-4">
              <h2 className="text-white font-bold text-xl mb-4 tracking-tight">Deposits & Withdrawals</h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Fusion Markets supports multiple deposit methods. While M-Pesa is not natively supported, Kenyan traders can deposit using international Visa/Mastercard, bank wire, or cryptocurrency (USDT). All deposits and withdrawals are free of broker-side charges.
              </p>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(pm => (
                  <div
                    key={pm.name}
                    className={`flex justify-between items-center px-5 py-3 rounded-xl border ${
                      pm.highlight
                        ? "border-[#00C2FF]/30 bg-[#00C2FF]/5"
                        : "border-white/5 bg-white/2"
                    }`}
                  >
                    <div>
                      <p className={`font-semibold text-sm ${pm.highlight ? "text-[#00C2FF]" : "text-white"}`}>
                        {pm.name}
                      </p>
                      <p className="text-[10px] text-gray-500">Min: {pm.min}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xs font-medium">{pm.time}</p>
                      <p className="text-[10px] text-gray-500">Fee: {pm.fee}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Regulation */}
            <section className="py-6">
              <h2 className="text-white font-bold text-xl mb-4 tracking-tight">Safety & Regulation</h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Fusion Markets operates under the oversight of ASIC — the Australian Securities and Investments Commission — one of the strictest financial regulators globally. Client funds are segregated, and negative balance protection is standard.
              </p>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div
                    key={reg.authority}
                    className="flex justify-between rounded-full items-center px-6 py-3 bg-white/5 border border-white/5"
                  >
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
              <h2 className="text-white font-bold text-xl mb-4">Fusion Markets Kenya FAQ</h2>
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
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Regulation</p>
                      <p className="text-white text-xs font-semibold">ASIC Licensed (Tier 1)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#00C2FF]/5 border border-[#00C2FF]/10 rounded-2xl p-4 hover:bg-[#00C2FF]/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💹</span>
                    <div>
                      <p className="text-[#00C2FF] text-[10px] font-bold uppercase tracking-widest">Raw Spreads</p>
                      <p className="text-white text-xs font-semibold">From 0.0 pips · $3/lot</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Platforms</p>
                      <p className="text-white text-xs font-semibold">MT4 & MT5 Supported</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-linear-to-b from-[#00C2FF]/10 to-[#060F1C] border border-[#00C2FF]/20 rounded-2xl p-5 text-center">
                <p className="text-[10px] uppercase tracking-widest text-[#00C2FF] font-bold mb-1">Editor&apos;s Pick</p>
                <p className="text-white font-bold text-lg mb-1">Fusion Markets</p>
                <p className="text-gray-500 text-xs mb-4">Best for low-cost, high-volume forex trading</p>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-[#00C2FF] text-[#060F1C] font-bold py-2.5 rounded-lg text-sm hover:bg-[#00a8db] transition-all"
                >
                  Open Account →
                </a>
                <p className="text-[9px] text-gray-600 mt-3">CFDs are complex instruments. Capital at risk.</p>
              </div>

              {/* Overall Score Summary */}
              <div className="border border-white/5 rounded-2xl p-5 bg-white/2">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-3">Overall Score</p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-white font-black text-4xl">
                    {(Object.values(SCORES).reduce((a, b) => a + b, 0) / Object.values(SCORES).length).toFixed(1)}
                  </span>
                  <span className="text-gray-600 text-lg mb-1">/10</span>
                </div>
                {Object.entries(SCORES).map(([label, score]) => (
                  <div key={label} className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-gray-500 truncate mr-2">{label}</span>
                    <span className="text-white font-bold shrink-0">{score}</span>
                  </div>
                ))}
              </div>

            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}