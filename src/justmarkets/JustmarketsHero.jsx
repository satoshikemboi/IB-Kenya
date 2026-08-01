import { Link } from "react-router-dom";
import Author from "../components/Author";

/* ── Shared exports reused elsewhere on the JustMarkets review page ─────── */
export const AFFILIATE_LINK = "https://one.justmarkets.link/a/17thm0lpq8";
export const BANNER_LINK =
  "https://one.justmarkets.link/a/17thm0lpq8/landing/global-trusted-broker?promo=5040";

export function ShieldIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v5c0 4.5-2.9 8.3-7 9.5-4.1-1.2-7-5-7-9.5V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function PhoneIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function TrendingIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 17l6-6 4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function ScoreRing({ score, size = 104 }) {
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(score / 10, 0), 1);
  const offset = circumference * (1 - pct);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#C9A84C"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-bold text-2xl tabular-nums leading-none">{score}</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider mt-1">out of 10</span>
      </div>
    </div>
  );
}

/* ── Default data (used if no `broker` prop is passed) ──────────────────── */
const defaultBroker = {
  name: "JustMarkets",
  logo: "/justmarkets.png",
  score: "9.3",
  regulation: ["FCA", "ASIC"],
  affiliateLink: AFFILIATE_LINK,
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function Stars({ score }) {
  const filled = Math.round((parseFloat(score) / 10) * 5);
  return (
    <span className="text-amber-400 text-base tracking-wide">
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </span>
  );
}

/* ── Component ────────────────────────────────────────────────────────────── */
export default function JustmarketsHero({ broker = defaultBroker }) {
  return (
    <div className="border-b border-white/6 bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-[5vw] py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.7rem] text-zinc-600 mb-6">
          <Link to="/" className="hover:text-zinc-400 transition-colors no-underline">Home</Link>
          <span>›</span>
          <Link to="/brokers" className="hover:text-zinc-400 transition-colors no-underline">Brokers</Link>
          <span>›</span>
          <span className="text-zinc-400">{broker.name}</span>
        </div>

        <div className="flex items-start gap-6 flex-wrap">

          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white/4 border border-white/8 shrink-0 overflow-hidden">
            <img
              src={broker.logo}
              alt={`${broker.name} Logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span style="font-size:1.8rem;font-weight:700;color:#4ade80">${broker.name.charAt(0)}</span>`;
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="font-playfair text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-zinc-50">
                {broker.name} Kenya Review 2026 | High leverage Broker?
              </h1>
              <span className="text-[0.62rem] font-bold px-2.5 py-0.5 rounded-full bg-linear-to-r from-amber-600 to-amber-400 text-black tracking-wide">
                High leverage broker
              </span>
            </div>

            <Stars score={broker.score} />

            <Author />

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.78rem] text-zinc-500 mb-5">
              <span>Regulated by: <span className="text-zinc-300">{broker.regulation.join(", ")}</span></span>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={broker.affiliateLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-cente leading-relaxed gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-gray-100 text-md font-semibold rounded-lg no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.4)] transition-all duration-200"
              >
                Visit {broker.name}
                <span className="text-md font-bold">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* SEO copy — unchanged wording from the original review, only relocated */}
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
          JustMarkets Kenya is a fast-growing broker popular with both beginners and active traders.
          With a $5 minimum deposit via M-Pesa, access to MT4, MT5 and cTrader, and FCA regulation
          at group level, it offers strong value for Kenyan traders looking for low entry barriers
          without sacrificing platform quality.
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          A question we get often is <strong>whether JustMarkets is regulated in Kenya</strong>.
          JustMarkets is not currently licensed by the Kenyan Capital Markets Authority (CMA) —
          Kenyan clients are served under the FSC (Mauritius) entity. However, the group is
          regulated by the FCA (UK) and ASIC (Australia), two of the world's strictest regulators,
          providing strong investor protection at the group level.
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          The <strong>JustMarkets minimum deposit in Kenya</strong> is just $5 on Standard accounts
          via M-Pesa, making it one of the most accessible brokers available. Previously known as
          JustForex, the rebrand to JustMarkets came with expanded regulation and improved trading
          conditions across all account types.
        </p>
      </div>

      {/* Partner offer banner */}
      <div className="flex justify-center items-center my-4 px-2">
        <a
          href={BANNER_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block overflow-hidden rounded-lg border border-white/10 bg-[#0d1117] shadow-2xl transition-all hover:border-yellow-500/30"
        >
          <img
            src="https://justmarkets.com/uploads/promo_materials/jm-banner-global-trusted-broker-en-1200x628.png"
            width="1200"
            height="628"
            alt="JustMarkets - global trusted broker"
            className="w-full h-64 max-w-4xl transform transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="py-2 px-4 border-t border-white/5 flex justify-between items-center bg-black/20">
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Partner Offer</span>
            <span className="text-[10px] text-zinc-500">JustMarkets Ltd.</span>
          </div>
        </a>
      </div>
    </div>
  );
}