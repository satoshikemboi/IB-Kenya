import { Link } from "react-router-dom";
import Author from "../components/Author";

/* ── Shared exports reused elsewhere on the FBS review page (sidebar, ────────
   regulation section) — kept here so FBS.jsx's existing imports keep working. */
export const AFFILIATE_LINK = "https://fbs.partners?ibl=876040&ibp=35444511";

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
  name: "FBS",
  logo: "/fbs.png",
  score: "8.7",
  founded: "2009",
  headquarters: "Belize",
  regulation: ["CySEC", "ASIC", "IFSC"],
  affiliateLink: AFFILIATE_LINK,
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function Stars({ score }) {
  const filled = Math.round((parseFloat(score) / 10) * 5);
  return (
    <span className="text-amber-400 text-base tracking-wide">
      {"★".repeat(filled)}{"☆".repeat(5 - filled)}
    </span>
  );
}

/* ── Component ────────────────────────────────────────────────────────────── */
export default function FBSHero({ broker = defaultBroker }) {
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
              alt={`${broker.name} Kenya broker logo`}
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
  {broker.name} Kenya Review 2026: $1 Minimum Deposit & Cent Account
</h1>
              <span className="text-[0.62rem] font-bold px-2.5 py-0.5 rounded-full bg-linear-to-r from-amber-600 to-amber-400 text-black tracking-wide">
                $1 Min Deposit
              </span>
            </div>

            <Stars score={broker.score} />

            <Author />

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.78rem] text-zinc-500 mb-5">
              <span>Regulated by: <span className="text-zinc-300">{broker.regulation.join(", ")}</span></span>
            </div>

            <a
              href={broker.affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-gray-100 text-md font-semibold rounded-lg no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.4)] transition-all duration-200"
            >
              Create {broker.name} Account
              <span className="text-md font-bold">→</span>
            </a>
          </div>
        </div>

        {/* SEO intro paragraph — copy unchanged from the previous hero */}
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
          FBS Kenya offers the lowest entry point of any broker on our list. Start trading with just
          $1 via M-Pesa on the Cent account. One of the most popular forex brokers across Kenya and
          East Africa, FBS is best suited to beginners who want real market exposure with minimal risk.
        </p>
      </div>

      {/* Affiliate Banner */}
      <div className="flex justify-center items-center my-4 px-4">
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block overflow-hidden rounded-lg border border-white/10 bg-[#0d1117] shadow-2xl transition-all hover:border-yellow-500/30"
        >
          <img
            src="/fbsbanner.png"
            alt="FBS Kenya - trade from $1 minimum deposit via M-Pesa"
            className="w-full h-auto max-w-3xl transform transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="py-2 px-4 border-t border-white/5 flex justify-between items-center bg-black/20">
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Partner Offer</span>
            <span className="text-[10px] text-zinc-500">FBS Markets Inc.</span>
          </div>
        </a>
      </div>
    </div>
  );
}