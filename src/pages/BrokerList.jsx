import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BrokerStrengths from "../components/BrokerStrengths";

const ALL_BROKERS = [
  { id: 1, name: "Exness", slug: "exness", affiliateLink: "https://one.exnessonelink.com/a/1sh0vxrgqd", rating: 4.8, minDeposit: 10, regulation: ["FCA", "CySEC", "FSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Top Rated", category: "ecn", logo: "/exness.png" },
  { id: 2, name: "XM Group", slug: "xm", affiliateLink: "https://affs.click/MbQNk", rating: 4.6, minDeposit: 5, regulation: ["ASIC", "CySEC", "IFSC"], spread: 0.6, mpesa: true, platforms: ["MT4", "MT5"], badge: "Best for Beginners", category: "market-maker", logo: "/xm.png" },
  { id: 3, name: "HFM", slug: "hfm", affiliateLink: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020", rating: 4.5, minDeposit: 5, regulation: ["FCA", "DFSA", "FSCA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Low Spread", category: "ecn", logo: "/hfm.png" },
  { id: 4, name: "Justmarkets", slug: "justmarkets", affiliateLink: "https://one.justmarkets.link/a/17thm0lpq8", rating: 4.7, minDeposit: 5, regulation: ["FCA", "ASIC", "DFSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5", "cTrader"], badge: "Low min deposit", category: "market-maker", logo: "/justmarkets.png" },
  { id: 5, name: "FBS", slug: "fbs", affiliateLink: "https://fbs.partners?ibl=876040&ibp=35444511", rating: 4.2, minDeposit: 1, regulation: ["IFSC", "CySEC"], spread: 0.5, mpesa: true, platforms: ["MT4", "MT5"], badge: "$1 Min Deposit", category: "market-maker", logo: "/fbs.png" },
  { id: 6, name: "FxPro", slug: "fxpro", affiliateLink: "https://direct-fxpro.com/en/partner/2xPncqjwh", rating: 4.4, minDeposit: 100, regulation: ["FCA", "CySEC", "FSCA"], spread: 0.6, mpesa: false, platforms: ["MT4", "MT5", "cTrader"], badge: "Multi-Platform", category: "ecn", logo: "fxpro.png" },
  { id: 7, name: "FxPesa", slug: "fxpesa", affiliateLink: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263", rating: 4.3, minDeposit: 10, regulation: ["CMA"], spread: 0.8, mpesa: true, platforms: ["MT4"], badge: "Kenya's Own", category: "market-maker", logo: "/fxpesa.png" },
  { id: 8, name: "FP Markets", slug: "fpmarkets", affiliateLink: "https://portal.fpmarkets.com/int-EN/register?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167", rating: 4.3, minDeposit: 10, regulation: ["CMA"], spread: 0.8, mpesa: true, platforms: ["MT4"], badge: "Kenya's Own", category: "market-maker", logo: "/fpmarkets.png" },
  { id: 9, name: "Deriv", slug: "deriv", affiliateLink: "https://track.deriv.com/_QstxbfW082hZl7VyVw174GNd7ZgqdRLk/1/", rating: 4.0, minDeposit: 5, regulation: ["FCA", "CySEC", "IFSC"], spread: 0.7, mpesa: true, platforms: ["MT5"], badge: "Unique Assets", category: "market-maker", logo: "/deriv.png" },
  { id: 10, name: "Fusion Markets", slug: "fusion-markets", affiliateLink: "https://fusionmarkets.com/?refcode=111166", rating: 4.4, minDeposit: 10, regulation: ["ASIC"], spread: 0.2, mpesa: false, platforms: ["MT4", "MT5"], badge: "Low Spread", category: "ecn", logo: "/fusion.png" },
];

// Editorial ranking — highest rated first. This is the order the page presents.
const RANKED_BROKERS = [...ALL_BROKERS].sort((a, b) => b.rating - a.rating);

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xs ${i < Math.floor(rating) ? "text-[#C9A84C]" : "text-gray-700"}`}>★</span>
      ))}
      <span className="text-[#C9A84C] text-sm font-semibold ml-1.5 tabular-nums">{rating}</span>
    </div>
  );
}

export default function BrokerList() {
  return (
    <>
      <Helmet>
        <title>All Forex Brokers in Kenya 2025 | FxBrokers.co.ke</title>
        <meta name="description" content="Browse and compare all forex brokers available to Kenyan traders. Filter by M-Pesa support, regulation, platform, and more." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers" />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14 max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#C9A84C]/50" />
              <span className="text-[#C9A84C] text-[11px] font-semibold uppercase tracking-[0.2em]">Broker Rankings · Kenya</span>
            </div>
            <h1 className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
              Forex Brokers in <span className="text-amber-400">Kenya</span> (2026)
            </h1>
            <p className="text-gray-400 text-md leading-relaxed">
              Compare and filter top-rated forex brokers in Kenya on{" "}
              <Link to="/" className="text-white underline hover:text-amber-400 transition-colors font-medium border-b border-white/10">
                fxBrokers.co.ke
              </Link>.
              Our real-time resources allows you to filter by <strong>CMA regulation</strong>,
              <strong> M-Pesa deposit speed</strong>, and <strong>low spreads</strong> to find
              the safest platform for your trading style. The major forex brokers we recommend for Kenyan traders include Exness, XM Group, HFM, Justmarkets, FBS, FxPro, FxPesa, FP Markets, Fusion Markets and Deriv for synthetics. Each broker is vetted for reliability, security, and user experience to ensure you have the best trading journey possible.
            </p>
          </div>

          {/* Ranking meta */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
            <p className="text-gray-500 text-[11px] uppercase tracking-widest">
              {RANKED_BROKERS.length} brokers, ranked by trader rating
            </p>
          </div>

          {/* Broker ledger */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1B2E]/40 divide-y divide-white/5 px-4 sm:px-6">
            {RANKED_BROKERS.map((broker, idx) => (
              <article
                key={broker.id}
                className="group flex flex-wrap sm:flex-nowrap items-center gap-x-5 gap-y-3 py-6 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors hover:bg-white/[0.025]"
              >
                {/* Rank */}
                <span className="hidden sm:block w-8 shrink-0 text-center font-playfair text-2xl text-white/15 group-hover:text-[#C9A84C]/50 tabular-nums transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Logo */}
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {broker.logo
                    ? <img src={broker.logo} alt={broker.name} className="w-8 h-8 object-contain" />
                    : <span className="text-[#C9A84C] font-black text-xs">{broker.name.slice(0, 2).toUpperCase()}</span>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-[11rem]">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold text-base tracking-tight">{broker.name}</h2>
                    {broker.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 font-medium uppercase tracking-wide">
                        {broker.badge}
                      </span>
                    )}
                    {broker.mpesa && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        M-Pesa
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <StarRating rating={broker.rating} />
                    <span className="text-gray-600 text-xs">{broker.regulation.join(" · ")}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 shrink-0 order-3 sm:order-none">
                  <div className="text-right">
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Min. deposit</p>
                    <p className="text-white text-sm font-semibold tabular-nums">${broker.minDeposit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Spread</p>
                    <p className="text-white text-sm font-semibold tabular-nums">{broker.spread === 0 ? "0.0" : broker.spread} pips</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2 shrink-0 w-full sm:w-auto order-4 sm:order-none">
                  <a
                    href={broker.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex-1 sm:flex-none text-center bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Trade now
                  </a>
                  <Link
                    to={`/brokers/${broker.slug}`}
                    className="flex-1 sm:flex-none text-center border border-white/15 hover:border-[#C9A84C]/40 text-gray-300 hover:text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Review
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Disclosure */}
          <p className="text-center text-xs text-gray-700 mt-8 italic">
            Disclosure: We may earn a commission when you open an account via our links. This does not affect our ratings.
          </p>
        </div>
        <BrokerStrengths />
      </div>
    </>
  );
}