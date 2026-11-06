import { Link } from "react-router-dom";
import Author from "../components/Author";

export const AFFILIATE_LINK = "https://one.exnessonelink.com/a/ggaswwew8a";
export const BROKERPAGE_LINK ="https://www.exnesspromo.com/en-ke/exness-terminal/?partner_id=ggaswwew8a";

/* Shared exports used by Exness.jsx */
const Icon = ({ className = "w-4 h-4", children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);
export const ShieldIcon = (p) => (
  <Icon {...p}><path d="M12 3l7 3v5c0 4.5-2.9 8.3-7 9.5-4.1-1.2-7-5-7-9.5V6l7-3z" /><path d="M9 12l2 2 4-4" /></Icon>
);
export const PhoneIcon = (p) => (
  <Icon {...p}><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></Icon>
);
export const TrendingIcon = (p) => (
  <Icon {...p}><path d="M3 17l6-6 4 4 8-9" /><path d="M15 6h6v6" /></Icon>
);

export function ScoreRing({ score, size = 104 }) {
  const r = (size - 7) / 2;
  const c = 2 * Math.PI * r;
  const ring = (stroke, extra) => (
    <circle cx={size / 2} cy={size / 2} r={r} stroke={stroke} strokeWidth="7" fill="none" {...extra} />
  );
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {ring("rgba(0,0,0,0.08)")}
        {ring("#C9A84C", {
          strokeDasharray: c,
          strokeDashoffset: c * (1 - Math.min(Math.max(score / 10, 0), 1)),
          strokeLinecap: "round",
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none tabular-nums text-zinc-900">{score}</span>
        <span className="mt-1 text-[9px] uppercase tracking-wider text-zinc-500">out of 10</span>
      </div>
    </div>
  );
}

const defaultBroker = {
  name: "Exness",
  score: 9.4,
  regulation: ["FCA", "CySEC", "CMA"],
  affiliateLink: AFFILIATE_LINK,
};

export default function ExnessHero({ broker = defaultBroker }) {
  const stars = Math.round(broker.score / 2);

  return (
    <section className="font-[Manrope] bg-white text-[#141414]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav className="py-6 text-base text-zinc-500">
          <Link to="/" className="no-underline hover:text-black">Home</Link>
          {" / "}
          <Link to="/brokers" className="no-underline hover:text-black">Brokers</Link>
          {" / "}
          <span className="text-black">{broker.name}</span>
        </nav>

        <div className="grid gap-12 py-10 lg:grid-cols-[1fr_380px] lg:py-20">
          <div>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.15] tracking-tight">
              Exness Kenya Review 2026 | Best M-Pesa Broker?
            </h1>
            <div className="mt-6">
              <Author />
            </div>
          </div>

          <aside>
            <a
              href={broker.affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block rounded-md bg-[#FFE600] px-6 py-3 font-semibold text-black no-underline hover:brightness-95"
            >
              Start trading with Exness
            </a>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              This review does not constitute investment advice. Past performance is not indicative of future
              results. Fees, spreads and market conditions may change over time. Your capital is at risk. Please
              trade responsibly.
            </p>
            <div className="mt-6 space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
              <p>
                Rating:{" "}
                <span className="text-base tracking-wide text-amber-500">
                  {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                </span>{" "}
                <span className="font-semibold text-black">{broker.score}/10</span>
              </p>
              <p>
                Regulated by:{" "}
                <span className="font-semibold text-black">{broker.regulation.join(", ")}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Intro band */}
<div className="bg-[#eff0f0] py-14">
  <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center">
    <a
      href={AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block overflow-hidden rounded-lg bg-white no-underline lg:w-3/5 lg:shrink-0"
    >
      <img
        src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Take_control_1200x628.png"
        width="1200"
        height="628"
        alt="Exness - Take control of your trades"
        className="block h-auto w-full"
      />
      <span className="flex justify-between px-4 py-2 text-xs text-zinc-500">
        <b>Partner offer</b>
        <span>Exness Ltd.</span>
      </span>
    </a>

    <div className="space-y-4">
      <p className="text-xl leading-relaxed">
        Exness Kenya offers the lowest barrier to entry of any broker on our list, with no minimum deposit
        and instant 24/7 M-Pesa deposits and withdrawals. Regulated by the FCA, CySEC, and Kenya's own
        Capital Markets Authority (CMA), it is our #1 pick for Kenyan traders in 2026.
      </p>
      <p className="text-sm leading-relaxed text-zinc-500">
        At Exness, over 98% of withdrawals are processed automatically. "Fastest withdrawals" refers to a
        comparison of Exness' withdrawal processing time vs. three other brokers, last updated on 7 May 2025.
        Processing times may vary depending on the chosen payment method.
      </p>
    </div>
  </div>
</div>
    </section>
  );
}