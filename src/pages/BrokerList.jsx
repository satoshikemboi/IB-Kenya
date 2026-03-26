import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ALL_BROKERS = [
  { id: 1, name: "Exness", slug: "exness", rating: 4.8, minDeposit: 10, regulation: ["FCA", "CySEC", "FSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Top Rated", category: "ecn" },
  { id: 2, name: "XM Group", slug: "xm-group", rating: 4.6, minDeposit: 5, regulation: ["ASIC", "CySEC", "IFSC"], spread: 0.6, mpesa: true, platforms: ["MT4", "MT5"], badge: "Best for Beginners", category: "market-maker" },
  { id: 3, name: "HFM", slug: "hfm", rating: 4.5, minDeposit: 5, regulation: ["FCA", "DFSA", "FSCA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Low Spread", category: "ecn" },
  { id: 4, name: "Pepperstone", slug: "pepperstone", rating: 4.7, minDeposit: 200, regulation: ["FCA", "ASIC", "DFSA"], spread: 0.0, mpesa: false, platforms: ["MT4", "MT5", "cTrader"], badge: "Best ECN", category: "ecn" },
  { id: 5, name: "IC Markets", slug: "ic-markets", rating: 4.6, minDeposit: 200, regulation: ["ASIC", "CySEC", "FSA"], spread: 0.0, mpesa: false, platforms: ["MT4", "MT5", "cTrader"], badge: "Raw Spreads", category: "ecn" },
  { id: 6, name: "FBS", slug: "fbs", rating: 4.2, minDeposit: 1, regulation: ["IFSC", "CySEC"], spread: 0.5, mpesa: true, platforms: ["MT4", "MT5"], badge: "$1 Min Deposit", category: "market-maker" },
  { id: 7, name: "OctaFX", slug: "octafx", rating: 4.1, minDeposit: 25, regulation: ["CySEC", "SVG FSA"], spread: 0.6, mpesa: true, platforms: ["MT4", "MT5"], badge: "Copy Trading", category: "market-maker" },
  { id: 8, name: "FxPro", slug: "fxpro", rating: 4.4, minDeposit: 100, regulation: ["FCA", "CySEC", "FSCA"], spread: 0.6, mpesa: false, platforms: ["MT4", "MT5", "cTrader"], badge: "Multi-Platform", category: "ecn" },
  { id: 9, name: "AvaTrade", slug: "avatrade", rating: 4.3, minDeposit: 100, regulation: ["Central Bank Ireland", "ASIC", "FSA"], spread: 0.9, mpesa: false, platforms: ["MT4", "MT5", "AvaTradeGO"], badge: "Trusted Brand", category: "market-maker" },
  { id: 10, name: "Deriv", slug: "deriv", rating: 4.0, minDeposit: 5, regulation: ["Malta FSA", "VFSC"], spread: 0.5, mpesa: true, platforms: ["MT5", "DTrader"], badge: "Synthetic Indices", category: "market-maker" },
  { id: 11, name: "EightCap", slug: "eightcap", rating: 4.3, minDeposit: 100, regulation: ["ASIC", "SCB"], spread: 0.0, mpesa: false, platforms: ["MT4", "MT5"], badge: "Tight Spreads", category: "ecn" },
  { id: 12, name: "FP Markets", slug: "fp-markets", rating: 4.5, minDeposit: 100, regulation: ["ASIC", "CySEC"], spread: 0.0, mpesa: false, platforms: ["MT4", "MT5", "IRESS"], badge: "ASIC Regulated", category: "ecn" },
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
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">All Forex Brokers in Kenya</h1>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              {ALL_BROKERS.length} brokers independently reviewed and ranked for Kenyan traders.
            </p>
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
                <div className="hidden sm:flex w-8 shrink-0 text-gray-600 text-sm font-semibold justify-center">
                  #{idx + 1}
                </div>

                {/* Logo */}
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[#C9A84C] font-black text-sm shrink-0">
                  {broker.name.slice(0, 2).toUpperCase()}
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
                    href={`https://${broker.slug}.com`}
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