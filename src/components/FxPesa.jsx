import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 8.8,
  "Spreads & Fees": 7.5,
  "Platforms & Tools": 8.2,
  "Deposits & Withdrawals": 8.6,
  "Customer Support": 8.0,
};

const ACCOUNT_TYPES = [
  {
    name: "Standard",
    minDeposit: "$5",
    spread: "1.4 pips",
    commission: "None",
    best: "Beginners",
  },
  {
    name: "Premier",
    minDeposit: "$100",
    spread: "0.0 pips",
    commission: "$3.5/lot/side",
    best: "Active traders",
    highlight: true,
  },
];

const PROS = [
  "CMA-licensed (Kenya) & FCA (UK)",
  "M-Pesa deposits & withdrawals",
  "30% Karibu welcome bonus",
  "Free trading education & workshops",
  "MT4, MT5 & Equiti Trader app",
];

const CONS = [
  "Higher spreads on Standard account (1.4 pips)",
  "No KES account currency",
  "Inactivity fee after 180 days",
  "Max 3 trading accounts per client",
];

const REGULATORS = [
  {
    authority: "CMA",
    country: "Kenya",
    license: "No. 107",
    tier: "Local Tier 1",
    tierColor: "text-emerald-300 bg-emerald-500/15",
  },
  {
    authority: "FCA",
    country: "UK (via Equiti Group)",
    license: "No. 528328",
    tier: "Tier 1",
    tierColor: "text-blue-300 bg-blue-500/15",
  },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "KES 500" },
  { name: "Local Bank", time: "24 hrs", fee: "Free", min: "$50" },
  { name: "Visa / MC", time: "Instant", fee: "Free", min: "$5" },
  { name: "Skrill / Neteller", time: "~1 hr", fee: "1% withdraw", min: "$5" },
];

const AFFILIATE_LINK = "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263";

const FAQS = [
  {
    q: (
      <>
        How do I open an{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        account?
      </>
    ),
    a: (
      <>
        Visit the{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa website
        </a>
        , click &apos;Open Account&apos;, fill in your personal details, then
        upload your Kenyan government ID and proof of residence. Once verified,
        fund your account via M-Pesa or bank transfer and start trading.
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
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
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
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        (EGM Securities Limited) holds CMA license number 107, making it one of
        the first CMA-regulated non-dealing forex brokers in Kenya. Its parent
        company, Equiti Group, is also regulated by the UK&apos;s FCA. Client
        funds are held in segregated bank accounts.
      </>
    ),
  },
  {
    q: "What is the minimum deposit for FxPesa?",
    a: (
      <>
        The minimum deposit is <strong>$5</strong> via card or e-wallet (KES 800
        equivalent), <strong>KES 500</strong> via M-Pesa, or{" "}
        <strong>$50 / KES 8,000</strong> via local bank transfer. The Premier
        Account requires a minimum initial deposit of $100.
      </>
    ),
  },
  {
    q: "What is the 30% Karibu Bonus?",
    a: (
      <>
        The{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        Karibu Bonus gives new clients 30% extra on their first deposit, up to a
        maximum of $150. For example, a $200 initial deposit earns you $60
        bonus. The bonus is only available on the first funding of a new
        account.
      </>
    ),
  },
  {
    q: "Can I deposit and withdraw via M-Pesa?",
    a: (
      <>
        Yes. M-Pesa is the fastest way to deposit and withdraw at{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>
        . Deposits are instant and withdrawals are processed quickly.
        FxPesa does not charge internal withdrawal fees for M-Pesa, though
        standard Safaricom transaction charges may apply.
      </>
    ),
  },
  {
    q: "What leverage does FxPesa offer?",
    a: (
      <>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        offers fixed leverage up to <strong>1:400</strong>. Unlike some
        brokers, the leverage does not decrease during high volatility periods,
        which gives traders predictable margin requirements at all times.
      </>
    ),
  },
  {
    q: "Which platforms does FxPesa support?",
    a: (
      <>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        supports MetaTrader 4 (MT4), MetaTrader 5 (MT5), and the Equiti Trader
        mobile app. All platforms are available on desktop, web browser, iOS,
        and Android — allowing you to trade from anywhere in Kenya.
      </>
    ),
  },
  {
    q: "Does FxPesa charge inactivity fees?",
    a: (
      <>
        Yes.{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        charges an inactivity fee if a live trading account has no activity for
        180 consecutive days. To avoid this fee, ensure you log in and place at
        least one trade within every six-month period.
      </>
    ),
  },
  {
    q: "Does FxPesa offer Islamic (swap-free) accounts?",
    a: (
      <>
        Yes. You can request a swap-free Islamic account by ticking the
        swap-free checkbox during registration, or by contacting{" "}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[#00A86B] hover:underline"
        >
          FxPesa
        </a>{" "}
        support to convert your existing account. Note that swap-free status
        does not apply to all tradable instruments.
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
          className="h-full bg-[#00A86B]"
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
          className={`text-[#00A86B] transition-transform ${open ? "rotate-45" : ""}`}
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
export default function FxPesaReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#00A86B]/30">
      <Helmet>
        <title>FxPesa Review 2026 — CMA-Regulated & M-Pesa | FxBrokers.co.ke</title>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">FxPesa Review</span>
        </nav>

        {/* Hero Section */}
        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0 shadow-xl">
              <img
                src="/fxpesa.png"
                alt="FxPesa Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">
                  FxPesa Review 2026
                </h1>
                <span className="bg-[#00A86B]/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-[#00A86B]/20">
                  #1 CMA PICK
                </span>
              </div>
              <p className="text-gray-400 max-w-xl mb-4 text-md leading-relaxed">
                Kenya&apos;s home-grown forex broker. FxPesa (EGM Securities) is
                the first CMA-licensed non-dealing broker in Kenya, offering
                M-Pesa deposits, a 30% welcome bonus, and up to 1:400 leverage
                on MT4, MT5, and the Equiti Trader app.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["CMA", "FCA", "M-Pesa", "Karibu Bonus"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="w-full md:w-auto flex pt-4 gap-2">
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-[#00A86B] text-white font-bold py-2 rounded-sm text-center hover:bg-[#008f5a] transition-all"
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
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#00A86B] rounded-full"></span>{" "}
                FxPesa Review
              </h2>
              <p className="text-md leading-relaxed mb-4">
                FxPesa is Kenya&apos;s most trusted locally-regulated broker.
                As one of the first brokers licensed by the Capital Markets
                Authority (CMA), it stands out for its deep local roots —
                including free in-person trading education workshops across
                Kenya and Uganda, a dedicated Swahili support line, and
                seamless M-Pesa integration for instant deposits and
                withdrawals.
              </p>
              <p className="text-md leading-relaxed mb-4">
                The 30% Karibu Bonus (up to $150) makes it an attractive entry
                point for new traders. Spreads on the Standard account are
                higher than some international brokers at 1.4 pips, but the
                Premier account brings them down to 0.0 pips with a competitive
                $3.5/lot commission — ideal for active traders.
              </p>

              {/* Scores */}
              <div className="mt-6 p-4 bg-white/3 rounded-xl border border-white/5">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
                  Our Ratings
                </h3>
                {Object.entries(SCORES).map(([label, score]) => (
                  <ScoreBar key={label} label={label} score={score} />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5 mt-6">
                <div>
                  <h4 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                    The Good
                  </h4>
                  {PROS.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-2 text-md mb-2"
                    >
                      <span className="text-emerald-500">✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                    The Bad
                  </h4>
                  {CONS.map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 text-md mb-2"
                    >
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
                      <tr
                        key={acc.name}
                        className={acc.highlight ? "text-[#00A86B]" : ""}
                      >
                        <td className="py-4 font-medium text-white">
                          {acc.name}
                        </td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-xs">{acc.commission}</td>
                        <td className="py-4 text-xs text-gray-400">
                          {acc.best}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                * Swap-free (Islamic) accounts available on request for both
                account types.
              </p>
            </section>

            {/* Payments Table */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-xl mb-4">
                Deposits & Withdrawals
              </h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                FxPesa supports multiple local and international funding
                methods. M-Pesa is the fastest and most popular option for
                Kenyan traders, with instant deposits from as little as KES 500.
              </p>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th>
                      <th className="pb-3">Processing</th>
                      <th className="pb-3">Fee</th>
                      <th className="pb-3">Min Deposit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map((m) => (
                      <tr key={m.name}>
                        <td className="py-3 font-medium text-white">
                          {m.name}
                        </td>
                        <td className="py-3 text-xs">{m.time}</td>
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
              <h2 className="text-white font-bold text-xl mb-4 tracking-tight">
                Safety & Regulation
              </h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                FxPesa (EGM Securities Limited) was among the first forex
                brokers to receive a non-dealing license from the Capital
                Markets Authority of Kenya. Its parent company, Equiti Group,
                holds licences from the FCA (UK), SCA (UAE), and CySEC
                (Cyprus), providing an additional layer of global oversight.
              </p>
              <div className="space-y-3">
                {REGULATORS.map((reg) => (
                  <div
                    key={reg.authority}
                    className="flex justify-between rounded-full items-center px-6 py-3 bg-white/5 border border-white/5"
                  >
                    <div>
                      <p className="text-white font-bold text-sm">
                        {reg.authority}
                      </p>
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
                FxPesa Kenya FAQ
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
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 transition-hover hover:bg-emerald-500/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🇰🇪</span>
                    <div>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        Kenya's Own
                      </p>
                      <p className="text-white text-xs font-semibold">
                        CMA License No. 107
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 transition-hover hover:bg-blue-500/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                        Global Regulation
                      </p>
                      <p className="text-white text-xs font-semibold">
                        FCA via Equiti Group
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 transition-hover hover:bg-amber-500/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎁</span>
                    <div>
                      <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                        Welcome Bonus
                      </p>
                      <p className="text-white text-xs font-semibold">
                        30% Karibu Bonus (up to $150)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-4 transition-hover hover:bg-purple-500/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📚</span>
                    <div>
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                        Free Education
                      </p>
                      <p className="text-white text-xs font-semibold">
                        In-person workshops across Kenya
                      </p>
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
                    { label: "Founded", value: "2018" },
                    { label: "Min Deposit", value: "KES 500 (M-Pesa)" },
                    { label: "Max Leverage", value: "1:400" },
                    { label: "Platforms", value: "MT4, MT5, Equiti Trader" },
                    { label: "Instruments", value: "Forex, Indices, CFDs" },
                    { label: "Support", value: "Phone, WhatsApp, Email" },
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
              <div className="bg-[#00A86B]/5 border border-[#00A86B]/15 rounded-2xl p-5 text-center">
                <p className="text-white text-sm font-semibold mb-1">
                  Ready to trade?
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  Get your 30% Karibu Bonus on your first deposit
                </p>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-[#00A86B] text-white font-bold py-2.5 rounded-lg text-sm hover:bg-[#008f5a] transition-all"
                >
                  Open FxPesa Account
                </a>
                <p className="text-gray-600 text-[10px] mt-3">
                  Trading CFDs involves significant risk of loss
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}