import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ExnessHero, { AFFILIATE_LINK, BROKERPAGE_LINK, ScoreRing, ShieldIcon, PhoneIcon, TrendingIcon } from "./ExnessHero";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.5,
  "Spreads & Fees": 9.8,
  "Platforms & Tools": 9.0,
  "Deposits & Withdrawals": 9.7,
  "Customer Support": 9.2,
};

const ACCOUNT_TYPES = [
  { name: "Standard", minDeposit: "$10", spread: "0.3 pips", commission: "None", best: "Beginners" },
  { name: "Standard Cent", minDeposit: "$10", spread: "0.3 pips", commission: "None", best: "Practice" },
  { name: "Pro", minDeposit: "$200", spread: "0.1 pips", commission: "None", best: "Intermediate" },
  { name: "Raw Spread", minDeposit: "$200", spread: "0.0 pips", commission: "$3.5/lot", best: "Active traders", highlight: true },
  { name: "Zero", minDeposit: "$200", spread: "0.0 pips", commission: "$0.05/lot", best: "Scalpers" },
];

const PROS = [
  "No minimum deposit",
  "Instant 24/7 M-Pesa deposits & withdrawals",
  "Spreads from 0.0 pips",
  "FCA, CySEC & CMA regulated",
  "Unlimited leverage available",
  "MT4, MT5 & Exness Trade app",
];
const CONS = [
  "No cTrader platform",
  "Not available to US clients",
];

const REGULATORS = [
  { authority: "FCA", country: "UK", tier: "Tier 1", tierColor: "text-blue-700 bg-blue-100" },
  { authority: "CySEC", country: "Cyprus", tier: "Tier 1", tierColor: "text-blue-700 bg-blue-100" },
  { authority: "CMA", country: "Kenya", tier: "Tier 1", tierColor: "text-blue-700 bg-blue-100" },
  { authority: "FSCA", country: "South Africa", tier: "Tier 2", tierColor: "text-emerald-700 bg-emerald-100" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$10", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$10" },
  { name: "Airtel Money", time: "Instant", fee: "Free", min: "$10" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$10" },
  { name: "Crypto", time: "~30 min", fee: "Network", min: "$10" },
];

const FAQS = [
  {
    q: <>How to register an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> account</>,
    a: <>To open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> account, go to <a href={BROKERPAGE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness official page</a>. Enter your personal details and proceed to verify your identity and proof of address. Once verified, you can proceed to deposit and trade.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> safe for Kenyan traders?</>,
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> is highly regulated by the FCA (UK), CySEC (Cyprus), and the FSCA (South Africa). They provide negative balance protection and hold client funds in segregated top-tier bank accounts.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> offers native M-Pesa integration. Deposits are instant, and withdrawals are typically processed within seconds to minutes, 24/7. The minimum deposit via M-Pesa is $1.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> in Kenya?</>,
    a: <>For Standard and Standard Cent accounts, there is no fixed minimum deposit (as low as $1 via M-Pesa). Professional accounts like Raw Spread, Pro, and Zero require a minimum initial deposit of $200.</>,
  },
  {
    q: <>Does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> offer a No Deposit Bonus?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> generally does not offer traditional &apos;No Deposit Bonuses.&apos; Instead, they focus on providing the industry&apos;s lowest spreads and instant withdrawal technology to provide better long-term value for traders.</>,
  },
  {
    q: "What is the maximum leverage available?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> offers &apos;Unlimited Leverage&apos; for experienced traders meeting specific criteria (less than 10 closed positions and 5 lots traded). Standard accounts typically access up to 1:2000 leverage.</>,
  },
  {
    q: "Which trading platforms can I use?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> supports MetaTrader 4 (MT4), MetaTrader 5 (MT5), the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> Web Terminal, and the highly-rated <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> Trade mobile app available on Android and iOS.</>,
  },
  {
    q: "Are there any withdrawal fees?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> does not charge any internal fees for M-Pesa or E-wallet withdrawals. However, M-Pesa users may incur standard mobile money transaction charges when sending or receiving funds from their line.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> regulated by the CMA in Kenya?</>,
    a: <>Yes, <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> is currently licensed by the Kenyan Capital Markets Authority (CMA).</>,
  },
];

const QUICK_NAV = [
  { href: "#ratings", label: "Ratings" },
  { href: "#review", label: "Full Review" },
  { href: "#accounts", label: "Accounts" },
  { href: "#deposits", label: "Deposits" },
  { href: "#regulation", label: "Regulation" },
  { href: "#faq", label: "FAQ" },
];

// ─── Icons (inline, no external deps) ─────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
      <path d="M6 10.2l2.4 2.4L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 text-red-500 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
      <path d="M7.3 7.3l5.4 5.4M12.7 7.3l-5.4 5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────
function ScoreBar({ label, score }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-stone-500">{label}</span>
        <span className="text-stone-600 font-semibold tabular-nums">{score}/10</span>
      </div>
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#FFE535] rounded-full" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-stone-200 rounded-xl mb-2 overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center gap-3 p-4 text-left focus-visible:outline focus-visible:outline-amber-700"
      >
        <span className="text-stone-900 font-medium text-sm">{q}</span>
        <span className={`text-amber-700 text-lg leading-none shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-4 pb-4 text-stone-600 text-sm border-t border-stone-200 pt-3 leading-relaxed">{a}</div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExnessReview() {
  const overallScore = (
    Object.values(SCORES).reduce((sum, v) => sum + v, 0) / Object.values(SCORES).length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-700 selection:bg-[#C9A84C]/30 pb-12 md:pb-0">
      <Helmet>
        <title>Exness Kenya Review 2026 | M-Pesa, No Min Deposit & CMA Regulated</title>
        <meta name="description" content="Is Exness a good broker for Kenyan traders? Our 2026 review covers Exness M-Pesa deposits, minimum deposit in Kenya, CMA regulation, spreads from 0.0 pips, and how to open an Exness account." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/exness" />

        <meta property="og:title" content="Exness Kenya Review 2026 | M-Pesa & Zero Spread" />
        <meta property="og:description" content="Exness Kenya review — instant M-Pesa deposits, no minimum deposit on standard accounts, spreads from 0.0 pips, FCA and CMA regulated." />
        <meta property="og:url" content="https://fxbrokers.co.ke/brokers/exness" />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Exness Kenya Review 2026",
            "reviewBody": "Exness is our top-rated broker for Kenyan traders in 2026, offering instant M-Pesa deposits, no minimum deposit on standard accounts, spreads from 0.0 pips, and regulation from the FCA, CySEC and Kenya's CMA.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.8",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Felix"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FxBrokers Kenya",
              "url": "https://fxbrokers.co.ke"
            },
            "itemReviewed": {
              "@type": "FinancialService",
              "name": "Exness",
              "url": "https://exness.com",
              "description": "Global forex broker offering M-Pesa deposits, zero spread accounts, and CMA regulation for Kenyan traders."
            }
          }
        `}</script>
      </Helmet>

      <main className="max-w-full mx-auto pt-10 pb-12">

        <ExnessHero
          broker={{
            name: "Exness",
            logo: "/exness.png",
            score: overallScore,
            regulation: ["FCA", "CySEC", "CMA"],
            affiliateLink: AFFILIATE_LINK,
          }}
        />

        {/* ── QUICK NAV ────────────────────────────────────────────────── */}
        <nav aria-label="Review sections" className="flex gap-2 md:justify-center overflow-x-auto pt-4 mb-8 px-4 pb-1 [scrollbar-width:none]">
          {QUICK_NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs px-3 md:px-4 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:border-[#C9A84C]/40 transition-colors focus-visible:outline focus-visible:outline-amber-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="grid md:px-64 grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* ── RATINGS BREAKDOWN ─────────────────────────────────────── */}
            <section id="ratings" className="p-6 md:rounded-xl bg-white border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#FFE535] rounded-full"></span> Rating Breakdown
                </h2>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest">Score: {overallScore}/10</span>
              </div>
              {Object.entries(SCORES).map(([label, score]) => (
                <ScoreBar key={label} label={label} score={score} />
              ))}
            </section>

            {/* ── FULL REVIEW ───────────────────────────────────────────── */}
            <section id="review" className="p-4">
              <h2 className="text-stone-900 font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Exness Kenya Review
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline">Exness</a> is currently our top-rated broker for Kenyan traders. Unlike most international brokers, they have mastered local needs by providing <strong>native M-Pesa integration</strong> that actually works 24/7.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                A question we get often is <strong>whether Exness is regulated in Kenya</strong>, yes it is.
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-700 hover:underline"> Exness</a> holds a CMA licence, making it one of the few international brokers fully authorised
                to operate locally. This means Kenyan traders have regulatory protection both locally and
                internationally through the FCA.
              </p>
              <p className="text-sm leading-relaxed mb-6">
                The <strong>minimum deposit for Exness in Kenya</strong> is effectively zero on Standard accounts,
                you can start with as little as $10 via M-Pesa. Professional accounts (Raw Spread, Pro, Zero)
                require $200. Withdrawals via M-Pesa are processed in seconds, 24/7, with no fees charged
                by Exness.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                <div>
                  <h4 className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest mb-3">The Good</h4>
                  <div className="space-y-2.5">
                    {PROS.map(p => (
                      <div key={p} className="flex items-start gap-2 text-xs"><CheckIcon /> <span>{p}</span></div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-red-700 text-[10px] font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  <div className="space-y-2.5">
                    {CONS.map(c => (
                      <div key={c} className="flex items-start gap-2 text-xs"><XIcon /> <span>{c}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── ACCOUNT TYPES ─────────────────────────────────────────── */}
            {/* Exness Account Types SEO Section */}
<section id="account-types" className="my-8 p-6 sm:p-8">
  <header className="mb-6 border-b border-stone-200 pb-4">
    <h2 className="font-playfair text-xl sm:text-2xl font-bold text-stone-900">
      Exness Account Types in Kenya: Minimum Deposits & Spreads
    </h2>
    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
      Choosing the right Exness account type in Kenya depends on your trading experience, strategy, and starting capital. Exness categorizes its offerings into two main tiers: <strong>Standard Accounts</strong> and <strong>Professional Accounts</strong>, both operating under strict regulatory standards including Kenya&apos;s Capital Markets Authority (CMA) framework.
    </p>
  </header>

  <div className="space-y-8">
    {/* Standard Accounts Tier */}
    <div className=" p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
          Tier 1
        </span>
        <h3 className="text-lg font-semibold text-stone-900">
          Standard Accounts (For Beginners &amp; Daily Traders)
        </h3>
      </div>
      <p className="mb-4 text-xs text-stone-600 leading-relaxed">
        Standard accounts feature zero trading commissions and flexible execution options, making them accessible to everyday retail traders looking to deposit via local Kenyan payment gateways.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className=" ">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-700 text-lg">Standard Account</h4>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Min. $10
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            The most popular choice for retail investors. The minimum deposit via M-Pesa or local bank transfers depends on the payment system minimum—typically starting as low as <strong> $10</strong> (~130 KES to 1,300 KES). It features stable spreads starting from 0.2 pips with zero commission.
          </p>
          <img
            src="/standard.png"
            alt="Exness Standard Account screenshot showing spreads and minimum deposit for Kenyan traders"
            loading="lazy"
            className="mt-3 w-full rounded-md border border-stone-200"
          />
        </div>

        <div className=" ">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-700 text-lg">Standard Cent Account</h4>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Min. $10
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Tailored specifically for beginners testing strategies with micro-lots. Like the Standard account, the minimum deposit depends on the selected local payment provider, starting at <strong>$1</strong> with spreads starting from 0.3 pips.
          </p>
          <img
            src="/cent.png"
            alt="Exness Standard Cent Account screenshot showing micro-lot trading details"
            loading="lazy"
            className="mt-3 w-full rounded-md border border-stone-200"
          />
        </div>
      </div>
    </div>

    {/* Professional Accounts Tier */}
    <div className=" ">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
          Tier 2
        </span>
        <h3 className="text-lg font-semibold text-stone-900">
          Professional Accounts (For Experienced &amp; High-Volume Traders)
        </h3>
      </div>
      <p className="mb-4 text-xs text-stone-600 leading-relaxed">
        Professional accounts require a fixed initial deposit threshold of $500 (~65,000 KES) but offer ultra-low spreads, raw execution, and dedicated order types for scalpers and algorithmic traders.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className=" ">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-700 text-lg">Raw Spread Account</h4>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Min. $200
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Requires a fixed minimum deposit of <strong>$200</strong>. Features raw spreads from 0.0 pips plus a fixed commission of up to $3.50 per lot per side ($7 round-turn).
          </p>
          <img
            src="/rawspread.png"
            alt="Exness Raw Spread Account screenshot showing raw spreads and commission structure"
            loading="lazy"
            className="mt-3 w-full rounded-md border border-stone-200"
          />
        </div>

        <div className=" ">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-700 text-lg">Zero Account</h4>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Min. $200
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Requires a minimum deposit of <strong>$200</strong>. Offers zero pips spread on the top 30 instruments for 95% of the trading day, with no commissions.
          </p>
          <img
            src="/zero.png"
            alt="Exness Zero Account screenshot showing zero-pip spreads on top instruments"
            loading="lazy"
            className="mt-3 w-full rounded-md border border-stone-200"
          />
        </div>

        <div className="">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-700 text-lg">Pro Account</h4>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Min. $200
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Requires a minimum deposit of <strong>$200</strong>. Features instant execution with zero commissions and spreads starting from 0.1 pips.
          </p>
          <img
            src="/pro.png"
            alt="Exness Pro Account screenshot showing instant execution and spread details"
            loading="lazy"
            className="mt-3 w-full rounded-md border border-stone-200"
          />
        </div>
      </div>
    </div>
  </div>
</section>
            <section id="accounts" className="px-2 border border-stone-200 bg-white shadow-sm overflow-hidden">
              <h2 className="text-stone-900 font-bold text-lg mb-4">Exness Kenya Account Types</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-full">
                  <thead>
                    <tr className="text-stone-500 text-[10px] uppercase tracking-widest border-b border-stone-200">
                      <th className="pb-3">Type</th><th className="pb-3">Min Dep</th><th className="pb-3">Spread</th><th className="pb-3">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-amber-700" : ""}>
                        <td className="py-4 font-medium text-stone-900">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-xs">{acc.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── DEPOSITS & WITHDRAWALS ────────────────────────────────── */}
            {/* Exness Deposits & Withdrawals SEO Section */}
<section id="deposits-guide" className="my-8 p-6 sm:p-8">
  <header className="mb-6 border-b border-stone-200 pb-4">
    <h2 className="font-playfair text-2xl sm:text-2xl font-semibold text-stone-900">
      Exness Deposits & Withdrawals in Kenya: M-Pesa, Fees & Processing Times
    </h2>
    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
      One of the main reasons Kenyan traders choose Exness is how well the broker handles local money movement. Instead of routing everything through slow international wire transfers, <strong>Exness settles M-Pesa deposits and withdrawals in seconds</strong>, at any hour, including weekends and public holidays. Here&apos;s exactly how funding and cashing out works.
    </p>
  </header>

  <div className="space-y-8">
    {/* Depositing */}
    <div className="">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-2xl font-semibold text-stone-900">
          How to Deposit Into Exness From Kenya
        </h3>
      </div>
      <p className="mb-4 text-xs text-stone-600 leading-relaxed">
        Open the Exness Personal Area or the Exness Trade app, select Deposit, and choose the method that suits your account currency. Most Kenyan traders fund their account the same day they register, since local methods post almost immediately.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h4 className="font-bold text-amber-700 text-sm">M-Pesa Deposits</h4>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            Select M-Pesa, enter your registered Safaricom number, and confirm the STK push prompt with your M-Pesa PIN. Funds typically land in your trading account within seconds. There a minimum deposit starting with as little as <strong>$10 (roughly KES 1300)</strong>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h4 className="font-bold text-amber-700 text-sm">Cards & E-Wallets</h4>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            Visa and Mastercard deposits also post instantly, though your issuing bank may apply its own currency conversion margin. Skrill and Neteller suit traders who already hold a balance in either wallet, while crypto deposits (USDT, BTC, ETH) usually clear in around 30 minutes depending on network congestion.
          </p>
        </div>
      </div>
      <img src="/deposit.png" alt="Exness Payment Methods" className="mt-4 rounded-lg border border-stone-200 w-full" />
      
    </div>

    {/* Withdrawing */}
    <div className=" ">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-2xl font-semibold text-stone-900">
          How to Withdraw From Exness to M-Pesa
        </h3>
      </div>
      <p className="mb-4 text-xs text-stone-600 leading-relaxed">
        Exness processes withdrawal requests on its side 24 hours a day, seven days a week, including weekends and Kenyan public holidays, when many other brokers pause processing until the next business day.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h4 className="font-bold text-amber-700 text-sm">Processing Time</h4>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            M-Pesa withdrawals are usually credited within minutes of approval, since Exness doesn&apos;t batch requests or wait for a daily cut-off window.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h4 className="font-bold text-amber-700 text-sm">Withdrawal Fees</h4>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            Exness does not charge an internal fee on M-Pesa or e-wallet withdrawals. Standard Safaricom M-Pesa charges may still apply on the receiving end, the same as any other M-Pesa transfer.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h4 className="font-bold text-amber-700 text-sm">Minimum & Limits</h4>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            The minimum withdrawal via M-Pesa is $10. Larger amounts may be split into multiple M-Pesa transactions to fit Safaricom&apos;s per-transaction limits, Exness handles this split automatically.
          </p>
        </div>
      </div>

      <img src="/withdrawal.png" alt="Exness Withdrawal Methods" className="mt-4 rounded-lg border border-stone-200 w-full" />

      <p className="mt-4 text-xs text-stone-500 leading-relaxed">
        As with most regulated brokers, Exness generally requires withdrawals to go back through the same method used to deposit, up to the amount deposited, before any remaining profit can be sent to a different channel. This is a standard anti-fraud measure, not an Exness-specific restriction.
      </p>
    </div>
  </div>
</section>
            <section id="deposits" className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
              <h2 className="text-stone-900 font-semibold text-lg mb-4">Deposits & Withdrawals</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-stone-500 text-[10px] uppercase tracking-widest border-b border-stone-200">
                      <th className="pb-3">Method</th><th className="pb-3">Processing</th><th className="pb-3">Fee</th><th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name} className={pm.highlight ? "text-amber-700" : ""}>
                        <td className="py-3 font-medium text-stone-900 flex items-center gap-2">
                          {pm.name}
                          {pm.highlight && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Recommended</span>}
                        </td>
                        <td className="py-3 text-xs">{pm.time}</td>
                        <td className="py-3 text-xs">{pm.fee}</td>
                        <td className="py-3 text-xs">{pm.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4">
                <p className="py-3 text-sm leading-relaxed text-stone-600">
                  Exness offers multiple means of deposit for Kenyan traders, including M-Pesa, Airtel Money,
                  Skrill, Neteller, and bank cards. This ensures fast deposits and withdrawals with zero
                  internal fees charged by Exness.
                </p>
                <img src="/exnessdeposit.png" alt="Exness Payment Methods" className="mt-4 rounded-lg border border-stone-200 w-full" />
              </div>
            </section>

            {/* ── SAFETY & REGULATION ───────────────────────────────────── */}
            <section id="regulation" className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
              <h2 className="text-stone-900 font-bold text-lg mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-700 text-xs">✓ Exness holds licences from top-tier regulators including the FCA (UK), and is also authorised by Kenya's own Capital Markets Authority (CMA) — giving Kenyan traders both local and international protection.</p>
              </div>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between items-center p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500">
                        <ShieldIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-stone-900 font-bold text-sm">{reg.authority}</p>
                        <p className="text-[10px] text-stone-500">{reg.country}</p>
                      </div>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>{reg.tier}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <section id="faq">
              <h2 className="text-stone-900 font-bold text-lg mb-4">Exness Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm sticky top-24">
              <div className="flex items-center justify-center gap-3 mb-5 pb-5 border-b border-stone-200">
                <ScoreRing score={overallScore} size={96} />
                <div>
                  <p className="text-stone-900 font-bold text-sm">Overall Score</p>
                  <p className="text-[10px] text-stone-500">Based on 5 categories</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg flex items-center gap-3">
                  <PhoneIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div><p className="text-emerald-700 text-[10px] font-bold uppercase mb-0.5">Local Support</p><p className="text-stone-900 text-xs font-medium">M-Pesa, Instant</p></div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-3">
                  <ShieldIcon className="w-4 h-4 text-blue-600 shrink-0" />
                  <div><p className="text-blue-700 text-[10px] font-bold uppercase mb-0.5">Regulation</p><p className="text-stone-900 text-xs font-medium">FCA · CySEC · CMA</p></div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3">
                  <TrendingIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <div><p className="text-purple-700 text-[10px] font-bold uppercase mb-0.5">Unique Feature</p><p className="text-stone-900 text-xs font-medium">Spreads from 0.0 pips</p></div>
                </div>
              </div>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                className="mt-6 block w-full bg-[#FFE535] text-gray-900 font-bold py-3 rounded-lg text-center text-md hover:bg-[#b5953b] transition-all">
                Open Exness Account →
              </a>
              <p className="text-[10px] text-stone-500 text-center mt-2">No minimum deposit via M-Pesa</p>
            </div>
          </aside>
        </div>
      </main>

      {/* ── MOBILE STICKY CTA ────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-gray-800 backdrop-blur border-t border-stone-200 p-3">
        <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-[#FFE535] text-gray-800 font-semibold py-3 rounded-sm text-center text-md">
          Open Exness Account (Instant M-Pesa) →
        </a>
      </div>
    </div>
  );
}