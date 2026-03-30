import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ALL_BROKERS = [
  { id: 1, name: "Exness", slug: "exness", affiliateLink: "https://one.exnessonelink.com/a/1sh0vxrgqd", rating: 4.8, minDeposit: 10, regulation: ["FCA", "CySEC", "FSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Top Rated", category: "ecn", logo:"/exness.png" },
  { id: 2, name: "XM Group", slug: "xm", affiliateLink: "https://affs.click/MbQNk", rating: 4.6, minDeposit: 5, regulation: ["ASIC", "CySEC", "IFSC"], spread: 0.6, mpesa: true, platforms: ["MT4", "MT5"], badge: "Best for Beginners", category: "market-maker", logo:"/xm.png" },
  { id: 3, name: "HFM", slug: "hfm", affiliateLink: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020", rating: 4.5, minDeposit: 5, regulation: ["FCA", "DFSA", "FSCA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Low Spread", category: "ecn", logo:"/hfm.png" },
  { id: 4, name: "Justmarkets", slug: "justmarkets", affiliateLink: "https://one.justmarkets.link/a/17thm0lpq8", rating: 4.7, minDeposit: 5, regulation: ["FCA", "ASIC", "DFSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5", "cTrader"], badge: "Low min deposit", category: "market-maker", logo:"/justmarkets.png" },
  { id: 5, name: "FBS", slug: "fbs", affiliateLink: "https://fbs.partners?ibl=876040&ibp=35444511", rating: 4.2, minDeposit: 1, regulation: ["IFSC", "CySEC"], spread: 0.5, mpesa: true, platforms: ["MT4", "MT5"], badge: "$1 Min Deposit", category: "market-maker", logo:"/fbs.png" },
  { id: 6, name: "FxPro", slug: "fxpro", affiliateLink: "https://direct-fxpro.com/en/partner/2xPncqjwh", rating: 4.4, minDeposit: 100, regulation: ["FCA", "CySEC", "FSCA"], spread: 0.6, mpesa: false, platforms: ["MT4", "MT5", "cTrader"], badge: "Multi-Platform", category: "ecn", logo:"fxpro.png" },
  { id: 7, name: "FxPesa", slug: "fxpesa", affiliateLink: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263", rating: 4.3, minDeposit: 10, regulation: ["CMA"], spread: 0.8, mpesa: true, platforms: ["MT4"], badge: "Kenya's Own", category: "market-maker", logo:"/fxpesa.png" },
  { id: 8, name: "FP Markets", slug: "fpmarkets", affiliateLink: "https://www.fpmarkets.com/switch-to-fp-markets/?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167", rating: 4.3, minDeposit: 10, regulation: ["CMA"], spread: 0.8, mpesa: true, platforms: ["MT4"], badge: "Kenya's Own", category: "market-maker", logo:"/fpmarkets.png" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "minDeposit", label: "Lowest Deposit" },
  { value: "spread", label: "Lowest Spread" },
  { value: "name", label: "A–Z" },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xs ${i < Math.floor(rating) ? "text-[#C9A84C]" : "text-gray-700"}`}>★</span>
      ))}
      <span className="text-[#C9A84C] text-sm font-semibold ml-1">{rating}</span>
    </div>
  );
}

export default function BrokerList() {
  const [search, setSearch] = useState("");
  const [mpesaOnly, setMpesaOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [platform, setPlatform] = useState("all");

  const filtered = useMemo(() => {
    let list = [...ALL_BROKERS];
    if (search) list = list.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    if (mpesaOnly) list = list.filter(b => b.mpesa);
    if (platform !== "all") list = list.filter(b => b.platforms.includes(platform));
    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "minDeposit") return a.minDeposit - b.minDeposit;
      if (sortBy === "spread") return a.spread - b.spread;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return list;
  }, [search, mpesaOnly, sortBy, platform]);

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
          <div className="mb-12 max-w-4xl">
  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
    Forex Brokers in <span className="text-amber-400">Kenya</span> (2026)
  </h1>
  
  <div className="border-l-2 border-amber-400/30 pl-6">
    <p className="text-gray-400 text-lg leading-relaxed">
      Compare and filter top-rated forex brokers in Kenya on{" "}
      <Link to="/" className="text-white underline hover:text-amber-400 transition-colors font-medium border-b border-white/10">
        FxBrokers.co.ke
      </Link>. 
      Our real-time resources allows you to filter by <strong>CMA regulation</strong>, 
      <strong>M-Pesa deposit speed</strong>, and <strong>low spreads</strong> to find 
      the safest platform for your trading style.
    </p>
  </div>
</div>

                {/* Filters */}
          <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-center">
            <input
              type="search"
              placeholder="Search broker…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm rounded-lg px-3 py-2 flex-1 min-w-40 outline-none focus:border-[#C9A84C]/50"
              aria-label="Search brokers"
            />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#C9A84C]/50"
              aria-label="Sort brokers"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-[#0D1B2E]">{o.label}</option>)}
            </select>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#C9A84C]/50"
              aria-label="Filter by platform"
            >
              {["all", "MT4", "MT5", "cTrader"].map(p => (
                <option key={p} value={p} className="bg-[#0D1B2E]">{p === "all" ? "All Platforms" : p}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={mpesaOnly}
                onChange={e => setMpesaOnly(e.target.checked)}
                className="accent-[#C9A84C] w-4 h-4"
              />
              <span className="text-gray-300 text-sm">M-Pesa only</span>
            </label>
          </div>

          {/* Results count */}
          <p className="text-gray-500 text-xs mb-4">{filtered.length} broker{filtered.length !== 1 ? "s" : ""} found</p>

          {/* Broker rows */}
          <div className="flex flex-col gap-3">
            {filtered.map((broker, idx) => (
              <article
                key={broker.id}
                className="bg-[#0D1B2E] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#C9A84C]/30 transition-all duration-200"
              >
                {/* Rank */}
                <div className="hidden sm:flex w-8 shrink-0 text-gray-200 text-sm font-semibold justify-center">
                  {idx + 1}.
                </div>

                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
  {broker.logo
    ? <img src={broker.logo} alt={broker.name} className="w-10 h-10 object-contain" />
    : <span className="text-[#C9A84C] font-black text-sm">{broker.name.slice(0, 2).toUpperCase()}</span>
  }
</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold text-base">{broker.name}</h2>
                    {broker.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/20 font-medium">
                        {broker.badge}
                      </span>
                    )}
                    {broker.mpesa && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                        M-Pesa ✓
                      </span>
                    )}
                  </div>
                  <StarRating rating={broker.rating} />
                  <p className="text-gray-500 text-xs mt-1">{broker.regulation.join(" · ")}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-center shrink-0">
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wide">Min. Deposit</p>
                    <p className="text-white text-sm font-semibold">${broker.minDeposit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wide">Spread</p>
                    <p className="text-white text-sm font-semibold">{broker.spread === 0 ? "0.0" : broker.spread} pips</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2 shrink-0">
                  <a
                    href={broker.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    Trade Now
                  </a>
                  <Link
                    to={`/brokers/${broker.slug}`}
                    className="border border-white/20 hover:border-[#C9A84C]/40 text-gray-300 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
                  >
                    Review
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-sm">
              No brokers match your filters. Try adjusting your search.
            </div>
          )}

          {/* Disclosure */}
          <p className="text-center text-xs text-gray-700 mt-8 italic">
            Disclosure: We may earn a commission when you open an account via our links. This does not affect our ratings.
          </p>
        </div>
      </div>
    </>
  );
}