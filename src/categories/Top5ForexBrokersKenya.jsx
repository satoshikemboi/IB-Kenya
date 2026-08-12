import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ForexGuides from "../components/ForexGuides";

/* ─── Page data ──────────────────────────────────────────────────────── */

const PAGE = {
  title: "Top 5 Forex Brokers in Kenya",
  metaTitle: "Top 5 Forex Brokers in Kenya 2026: Exness, XM, HFM, JustMarkets, FBS",
  metaDesc:
    "We compare Kenya's top 5 forex brokers: Exness, XM, HFM, JustMarkets and FBS, on CMA regulation, minimum deposit, M-Pesa support and trading platforms.",
  canonical: "https://fxbrokers.co.ke/top-5-forex-brokers-in-kenya",
  updatedLabel: "Updated Aug 2026",
  intro:
    "Kenya's most-searched forex brokers stack up very differently once you look past the marketing. Three of the five below: Exness, XM and HFM now hold licenses from the Capital Markets Authority, so disputes fall under Kenyan law. JustMarkets and FBS operate offshore instead, trading local oversight for a lower minimum deposit. Here's how all five compare on regulation, cost, M-Pesa support and platforms.",
};

const EXNESS_LINK = "https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd";

const BROKERS = [
  {
    rank: 1,
    slug: "exness",
    name: "Exness",
    founded: 2008,
    cma: true,
    cmaNote: "CMA licensed | Exness (KE) Limited, Lic. #162",
    minDeposit: "$10",
    minDepositNote: null,
    mpesa: true,
    platforms: "MT4, MT5, Exness Terminal",
    blurb:
      "Exness runs its Kenyan business through Exness (KE) Limited, a CMA-licensed non-dealing broker with a staffed Nairobi office, unusual among international brokers serving the region. M-Pesa deposits and withdrawals are typically fee-free and settle in under a minute, and live accounts open with as little as $1.",
  },
  {
    rank: 2,
    slug: "xm",
    name: "XM",
    founded: 2009,
    cma: true,
    cmaNote: "CMA licensed since Feb 2026",
    minDeposit: "$5",
    minDepositNote: null,
    mpesa: true,
    platforms: "MT4, MT5",
    blurb:
      "XM added a CMA license in February 2026, giving Kenyan clients a local regulator on top of its existing CySEC, ASIC, DFSA and FSCA authorisations. The $5 minimum deposit and M-Pesa support keep the entry bar low, and the account catalogue covers over 1,000 tradable instruments across MT4 and MT5.",
  },
  {
    rank: 3,
    slug: "hfm",
    name: "HFM",
    founded: 2010,
    cma: true,
    cmaNote: "CMA licensed",
    minDeposit: "$5",
    minDepositNote: "Most accounts have no fixed minimum; ~KES 700 in practice via M-Pesa",
    mpesa: true,
    platforms: "MT4, MT5",
    blurb:
      "HFM (formerly HotForex) has served Kenyan clients since 2010 and holds a CMA license alongside FCA, DFSA and FSCA authorisation. Its Cent, Zero and Premium accounts carry no official minimum deposit, though funding through M-Pesa in practice starts around KES 700.",
  },
  {
    rank: 4,
    slug: "justmarkets",
    name: "JustMarkets",
    founded: 2012,
    cma: false,
    cmaNote: "Not CMA licensed, regulated via CySEC & FSA Seychelles",
    minDeposit: "$10",
    minDepositNote: null,
    mpesa: true,
    platforms: "MT4, MT5",
    blurb:
      "JustMarkets rebranded from JustForex in 2022, has no CMA license, so Kenyan clients trade under its Cyprus or Seychelles entities rather than local oversight. It still takes M-Pesa deposits and opens accounts from $10, with leverage running as high as 1:3000 for traders who want it.",
  },
  {
    rank: 5,
    slug: "fbs",
    name: "FBS",
    founded: 2009,
    cma: false,
    cmaNote: "Not CMA licensed | regulated via IFSC Belize",
    minDeposit: "$5",
    minDepositNote: null,
    mpesa: true,
    platforms: "MT4, MT5, FBS app",
    blurb:
      "FBS serves Kenyan clients through its Belize IFSC entity rather than a CMA license. That trade-off buys one of the lowest entry points on this list — accounts open from around $5 via M-Pesa — but any dispute falls outside CMA jurisdiction.",
  },
];

const FAQS = [
  {
    question: "Which is the best forex broker in Kenya out of these five?",
    answer:
      "Exness ranks first here mainly on its dual CMA/FSCA licensing, $1 minimum deposit and fast M-Pesa payouts. XM and HFM follow closely for traders who want CMA-regulated accounts, while JustMarkets and FBS suit traders who'd rather prioritise a lower deposit over local oversight.",
  },
  {
    question: "Are Exness, XM and HFM actually licensed by the CMA?",
    answer:
      "Yes. Exness (KE) Limited and HFM have held CMA licenses for several years, and XM added its own CMA license in February 2026. JustMarkets and FBS are not CMA-licensed and onboard Kenyan clients through offshore entities instead.",
  },
  {
    question: "Which of the five has the lowest minimum deposit?",
    answer:
      "Exness has the lowest published minimum at $1. XM, HFM and FBS sit around $5, and JustMarkets requires $10 for a Standard account.",
  },
  {
    question: "Do all five brokers accept M-Pesa?",
    answer:
      "Yes — all five support M-Pesa deposits for Kenyan clients, though processing times and any network fees depend on the specific payment partner each broker uses.",
  },
  {
    question: "Does a CMA license actually make a broker safer?",
    answer:
      "A CMA license puts the broker under Kenyan law and gives traders a local regulator to escalate complaints to, which offshore-only brokers can't offer. It doesn't remove market risk — leverage, volatility and execution risk still apply no matter who regulates the broker.",
  },
];

/* ─── Sub-components ─────────────────────────────────────────────────── */

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-[#C9A84C] transition-colors">
          {question}
        </span>
        <span className={`text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180 text-[#C9A84C]" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && <p className="text-gray-400 text-sm leading-relaxed pb-5 -mt-1">{answer}</p>}
    </div>
  );
}

function SponsoredBanner({ variant }) {
  const isLarge = variant === "large";
  const src = isLarge
    ? "https://d3dpet1g0ty5ed.cloudfront.net/EN_GLOBAL_C1_EXT_C2_T1_PROMO_RISK_T2_PERFORMANCE_D-3-3_STATIC_1200x628.jpg"
    : "https://d3dpet1g0ty5ed.cloudfront.net/EN_GLOBAL_C1_EXT_C2_T1_PROMO_RISK_T2_PERFORMANCE_D-3-3_STATIC_320x100.jpg";
  const w = isLarge ? 1200 : 320;
  const h = isLarge ? 628 : 100;

  return (
    <div className={`flex flex-col items-center gap-2 ${isLarge ? "my-8" : "my-6"}`}>
      <a
        href={EXNESS_LINK}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="block rounded-lg overflow-hidden border border-white/8 hover:border-[#C9A84C]/40 transition-colors"
        style={{ maxWidth: w, width: "100%" }}
      >
        <img
          src={src}
          width={w}
          height={h}
          alt="Exness — open a free trading account"
          className="w-full h-auto block"
          loading="lazy"
        />
      </a>
      <span className="text-[10px] text-gray-700">Trading CFDs has risk on your capital.</span>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="mb-10">
      {/* Desktop table */}
      <div className="hidden md:block border border-white/8 rounded-xl overflow-hidden bg-[#0a1628]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-gray-500 text-xs uppercase tracking-wider">
              <th className="py-4 pl-6 pr-3 font-semibold w-10">#</th>
              <th className="py-4 px-3 font-semibold">Broker</th>
              <th className="py-4 px-3 font-semibold">CMA license</th>
              <th className="py-4 px-3 font-semibold">Min. deposit</th>
              <th className="py-4 px-3 font-semibold">M-Pesa</th>
              <th className="py-4 pr-6 pl-3 font-semibold">Platforms</th>
            </tr>
          </thead>
          <tbody>
            {BROKERS.map((b) => (
              <tr key={b.slug} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                <td className="py-4 pl-6 pr-3 text-[#C9A84C] font-bold tabular-nums">{b.rank}</td>
                <td className="py-4 px-3">
                  <a href={`#${b.slug}`} className="font-semibold text-[#7eb8d4] hover:text-[#C9A84C] underline underline-offset-2 decoration-[#7eb8d4]/30">
                    {b.name}
                  </a>
                </td>
                <td className="py-4 px-3">
                  <span className={b.cma ? "text-emerald-400" : "text-gray-500"}>
                    {b.cma ? "✓ Licensed" : "✗ Offshore only"}
                  </span>
                </td>
                <td className="py-4 px-3 text-gray-300 tabular-nums">{b.minDeposit}</td>
                <td className="py-4 px-3 text-gray-300">{b.mpesa ? "✓" : "—"}</td>
                <td className="py-4 pr-6 pl-3 text-gray-500">{b.platforms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked list */}
      <div className="md:hidden border border-white/8 rounded-2xl overflow-hidden bg-[#0a1628] divide-y divide-white/5">
        {BROKERS.map((b) => (
          <a key={b.slug} href={`#${b.slug}`} className="block p-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[#C9A84C] font-bold text-sm tabular-nums">{b.rank}.</span>
              <span className="font-semibold text-[#7eb8d4] underline underline-offset-2 decoration-[#7eb8d4]/30">
                {b.name}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-y-1 text-xs text-gray-400">
              <dt className="text-gray-600">CMA</dt>
              <dd className={b.cma ? "text-emerald-400" : "text-gray-500"}>{b.cma ? "✓ Licensed" : "✗ Offshore"}</dd>
              <dt className="text-gray-600">Min. deposit</dt>
              <dd>{b.minDeposit}</dd>
              <dt className="text-gray-600">M-Pesa</dt>
              <dd>{b.mpesa ? "✓ Supported" : "—"}</dd>
              <dt className="text-gray-600">Platforms</dt>
              <dd>{b.platforms}</dd>
            </dl>
          </a>
        ))}
      </div>
      <p className="text-[11px] text-gray-700 mt-3">
        Regulation and deposit details are checked against each broker's official disclosures at time of writing, verify current terms before funding an account, since brokers update pricing and licensing without notice.
      </p>
    </div>
  );
}

function BrokerProfile({ broker }) {
  return (
    <div id={broker.slug} className="py-8 border-b border-white/8 last:border-0 scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-[#C9A84C] font-bold text-2xl tabular-nums leading-none">{broker.rank}</span>
        <h3 className="text-white font-bold text-xl">{broker.name}</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">{broker.blurb}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-600">
        <span>Founded {broker.founded}</span>
        <span className={broker.cma ? "text-emerald-400/80" : ""}>{broker.cmaNote}</span>
        <span>Min. deposit {broker.minDeposit}</span>
      </div>
      {broker.minDepositNote && <p className="text-[11px] text-gray-700 mt-1">{broker.minDepositNote}</p>}
      <Link
        to={`/brokers/${broker.slug}`}
        className="inline-block mt-3 text-xs font-semibold text-[#7eb8d4] hover:text-[#C9A84C] transition-colors"
      >
        Full {broker.name} review →
      </Link>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */

export default function Top5ForexBrokersKenya() {
  return (
    <>
      <Helmet>
        <title>{PAGE.metaTitle} | FxBrokers.co.ke</title>
        <meta name="description" content={PAGE.metaDesc} />
        <link rel="canonical" href={PAGE.canonical} />
        <meta property="og:title" content={`${PAGE.metaTitle} | FxBrokers.co.ke`} />
        <meta property="og:description" content={PAGE.metaDesc} />
        <meta property="og:url" content={PAGE.canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "${PAGE.title}",
            "description": "${PAGE.metaDesc}",
            "url": "${PAGE.canonical}",
            "numberOfItems": ${BROKERS.length},
            "itemListElement": ${JSON.stringify(
              BROKERS.map((b) => ({
                "@type": "ListItem",
                position: b.rank,
                name: b.name,
                url: `https://fxbrokers.co.ke/brokers/${b.slug}`,
              }))
            )}
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": ${JSON.stringify(
              FAQS.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              }))
            )}
          }
        `}</script>
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span className="text-gray-400">{PAGE.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C]/70">Broker Comparison</span>
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/80 bg-emerald-500/8 border border-emerald-500/15 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {PAGE.updatedLabel}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">{PAGE.title}</h1>
          <p className="text-gray-400 text-md max-w-xl">{PAGE.intro}</p>

          {/* Quick jump */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-5 mb-8">
            <span className="text-gray-700">Jump to:</span>
            {BROKERS.map((b, i) => (
              <span key={b.slug} className="flex items-center gap-3">
                <a href={`#${b.slug}`} className="hover:text-[#C9A84C] transition-colors">{b.name}</a>
                {i < BROKERS.length - 1 && <span className="text-gray-800">·</span>}
              </span>
            ))}
          </div>

          <SponsoredBanner variant="large" />

          <ComparisonTable />

          <div>
            {BROKERS.slice(0, 1).map((b) => (
              <BrokerProfile key={b.slug} broker={b} />
            ))}
          </div>

          <SponsoredBanner variant="small" />

          <div>
            {BROKERS.slice(1).map((b) => (
              <BrokerProfile key={b.slug} broker={b} />
            ))}
          </div>

          <div className="mt-8 mb-4 p-5 rounded-2xl border border-white/8 bg-[#0a1628]">
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white font-semibold">Which one should you pick? </span>
              If a locally accountable regulator matters most, stick to the CMA-licensed three, Exness, XM or HFM. If your priority is trading with the least starting capital and you're comfortable relying on offshore protections instead, JustMarkets and FBS are the cheaper entry points. Either way, test execution speed and withdrawal times on a small deposit before committing more.
            </p>
          </div>

          <div>
            <ForexGuides />
          </div>

          {/* FAQ Accordion */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <div className="bg-[#0a1628] border border-white/8 rounded-2xl px-6">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-700 leading-relaxed text-center mt-8 max-w-xl mx-auto">
            Advertiser disclosure: we may earn a commission if you open an account through links on this page; this does not affect our rankings. Trading forex and CFDs carries a high level of risk and may not be suitable for every investor, only trade with money you can afford to lose.
          </p>
        </div>
      </div>
    </>
  );
}