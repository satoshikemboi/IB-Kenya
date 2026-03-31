import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CRITERIA = [
  {
    num: "01",
    label: "Regulation & Safety",
    slug: "./brokers/category/regulated-brokers",
    screenshot: "/methodology/regulation.png",
    accent: "#C9A84C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V6l-9-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    details:
      "We only list brokers regulated by recognised authorities — FCA (UK), ASIC (Australia), CySEC (Cyprus), FSCA (South Africa), and CMA (Kenya). Each broker is checked for client fund segregation in tier-1 bank accounts, negative balance protection, and investor compensation scheme membership. Unregulated or offshore-only brokers are excluded outright.",
    checks: ["FCA / ASIC / CySEC / CMA licence verified", "Segregated client funds confirmed", "Negative balance protection active"],
  },
  {
    num: "02",
    label: "Spreads & Trading Fees",
    slug: "./brokers/category/lowest-spread-brokers",
    screenshot: "/methodology/spreads.png",
    accent: "#3B82F6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17l4-8 4 4 4-6 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    details:
      "We open funded live accounts at every broker and record real EUR/USD spreads every 30 minutes across the London and New York sessions over a two-week period. We factor in overnight swap rates, commissions, inactivity fees, and currency conversion charges. The final score reflects total cost-per-trade — not just the headline spread figure shown in marketing.",
    checks: ["Live spreads sampled — not quoted", "Commission + swap costs included", "Hidden fees stress-tested"],
  },
  {
    num: "03",
    label: "Platforms & Tools",
    slug: "./brokers/category/mt4-mt5-brokers",
    screenshot: "/methodology/platforms.png",
    accent: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 8h10M7 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    details:
      "We evaluate every platform the broker offers — MT4, MT5, cTrader, TradingView, and proprietary apps — on both desktop and mobile. We test order execution speed using timestamped trades, assess charting depth and indicator availability, and review whether algorithmic trading (EAs / cAlgo) is supported. Mobile apps are rated on Android and iOS for speed, stability, and feature parity with desktop.",
    checks: ["Execution speed measured in ms", "MT4 / MT5 / cTrader / TV tested", "Mobile app independently rated"],
  },
  {
    num: "04",
    label: "Deposits, Withdrawals & Support",
    slug: "./brokers/category/mpesa-brokers",
    screenshot: "/methodology/support.png",
    accent: "#10B981",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    details:
      "For Kenyan traders, M-Pesa support is a top priority. We personally test M-Pesa deposits and withdrawals — recording the time from initiation to funds appearing in the trading account, and from withdrawal request to M-Pesa confirmation. We also test Visa, Skrill, and bank wire. Support quality is assessed by submitting identical queries via live chat, email, and phone, then scoring accuracy and response time.",
    checks: ["M-Pesa deposit & withdrawal timed", "Support tested via 3 channels", "Weekend availability confirmed"],
  },
];

const PROCESS_STEPS = [
  { step: "1", title: "Open a live account", body: "We fund a real account at every broker we review — no demo testing." },
  { step: "2", title: "Trade for 2+ weeks", body: "We place real trades across multiple sessions to measure live conditions." },
  { step: "3", title: "Score 20+ data points", body: "Every criterion is broken into sub-metrics and scored on a 1–10 scale." },
  { step: "4", title: "Publish & update quarterly", body: "Scores are recalculated every quarter. Brokers cannot influence rankings." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Methodology() {
  return (
    <>
      <Helmet>
        <title>Our Broker Review Methodology | FxBrokers.co.ke</title>
        <meta
          name="description"
          content="Learn how FxBrokers.co.ke independently tests and rates forex brokers for Kenyan traders. Our transparent methodology covers regulation, spreads, platforms, and support."
        />
        <link rel="canonical" href="https://fxbrokers.co.ke/methodology" />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-[10px] text-gray-600 mb-8 flex items-center gap-2 uppercase tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Methodology</span>
          </nav>

          {/* Hero */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></span>
              <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Editorial Independence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              How We Review<br />
              <span className="text-[#C9A84C]">Forex Brokers</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Every score on FxBrokers.co.ke comes from a funded live account — not a demo, not a press kit.
              Our process is built for Kenyan traders, with M-Pesa, CMA regulation, and local market conditions
              at the centre of every test.
            </p>
          </div>

          {/* Process Strip */}
          <div className="grid md:grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="bg-[#0D1B2E] border border-white/5 rounded-2xl p-4 relative overflow-hidden"
              >
                <span
                  className="absolute top-3 right-4 text-5xl font-black leading-none select-none"
                  style={{ color: "rgba(201,168,76,0.06)" }}
                >
                  {s.step}
                </span>
                <p className="text-[#C9A84C] text-[10px] font-semibold uppercase tracking-widest mb-2">
                  Step {s.step}
                </p>
                <p className="text-white text-sm font-semibold mb-1 leading-snug">{s.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Criteria heading */}
          <div className="mb-8">
            <h2 className="text-white font-bold text-2xl mb-2 tracking-tight">Our 4 Scoring Criteria</h2>
            <p className="text-gray-500 text-sm">
              Each broker is scored on four weighted categories. The final rating is a weighted average
              published to one decimal place.
            </p>
          </div>

          {/* Criteria Cards */}
          <div className="space-y-5 mb-16">
            {CRITERIA.map((c) => (
              <div
                key={c.num}
                className="bg-[#0D1B2E] border border-white/5 rounded-xl overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className="flex md:flex-col-2">

                  {/* Content */}
                  <div className="flex-1 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span style={{ color: c.accent }}>{c.icon}</span>
                        <h3 className="text-white font-bold text-lg tracking-tight">{c.label}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 shrink-0">
                        <span className="text-emerald-500 text-[10px]">✔</span>
                        <span className="text-emerald-500 text-[9px] font-bold uppercase tracking-tighter">Verified</span>
                      </div>
                    </div>

                    {/* Detail copy */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.details}</p>

                    {/* Check list */}
                    <ul className="space-y-1.5 mb-5">
                      {c.checks.map((ck) => (
                        <li key={ck} className="flex items-center gap-2 text-xs text-gray-400">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]"
                            style={{ background: `${c.accent}22`, color: c.accent }}
                          >
                            ✓
                          </span>
                          {ck}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={`/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: c.accent }}
                    >
                      View full scoring rubric
                      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Independence Policy */}
          <div className="relative bg-[#0D1B2E] border border-white/8 rounded-2xl p-8 overflow-hidden">
            {/* Top glow */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent 0%, #C9A84C44 40%, #C9A84C88 50%, #C9A84C44 60%, transparent 100%)",
              }}
            />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#C9A84C]" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl mb-3 tracking-tight">Our Independence Policy</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  FxBrokers.co.ke earns revenue through affiliate commissions when traders open accounts via our links.
                  Our editorial team operates independently of our commercial team — broker scores are calculated
                  algorithmically from live testing data, not negotiated.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  No broker can pay to improve their rating, alter our review content, or be included in a top picks
                  list. Scores are updated at least once per quarter. If a broker's conditions deteriorate, their
                  score drops — regardless of any commercial relationship.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "No paid placements",
                    "Quarterly score updates",
                    "Funded live testing only",
                    "CMA-compliant disclosures",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <p className="text-gray-600 text-[11px] mt-8 leading-relaxed text-center">
            CFD trading involves a high risk of loss. Our reviews are informational only and do not constitute financial
            advice. Always verify a broker's current regulatory status on the CMA, FCA, or ASIC registers before
            depositing funds.
          </p>

        </div>
      </div>
    </>
  );
}