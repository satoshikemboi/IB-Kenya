import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CATEGORIES = {
  "best-forex-brokers-kenya": {
    title: "Best Forex Brokers in Kenya",
    metaTitle: "Best Forex Brokers in Kenya 2025 — Top 10 Ranked",
    metaDesc: "The 10 best forex brokers for Kenyan traders in 2025, ranked by our experts. Compare regulation, spreads, M-Pesa support, and minimum deposits.",
    intro: "We tested over 50 forex brokers to find the best options for Kenyan traders. Our top picks are regulated, accept M-Pesa, and offer competitive spreads.",
    brokers: ["exness", "xm-group", "hfm", "pepperstone", "ic-markets"],
  },
  "mpesa-brokers": {
    title: "Forex Brokers That Accept M-Pesa in Kenya",
    metaTitle: "Forex Brokers Accepting M-Pesa in Kenya 2025",
    metaDesc: "Find forex brokers that accept M-Pesa deposits and withdrawals in Kenya. Compare fees, processing times, and minimum amounts.",
    intro: "M-Pesa is the most convenient way for Kenyan traders to fund a forex account. These brokers all support M-Pesa deposits and fast withdrawals.",
    brokers: ["exness", "xm-group", "hfm", "fbs", "octafx"],
  },
  "lowest-spread-brokers": {
    title: "Lowest Spread Forex Brokers for Kenyan Traders",
    metaTitle: "Lowest Spread Forex Brokers Kenya 2025",
    metaDesc: "Compare the lowest spread forex brokers available in Kenya. Find ECN and raw spread accounts starting from 0.0 pips.",
    intro: "Low spreads mean lower trading costs on every trade. These brokers offer raw or near-zero spreads on major currency pairs.",
    brokers: ["exness", "pepperstone", "ic-markets", "hfm", "fp-markets"],
  },
  "mt4-mt5-brokers": {
    title: "Best MT4 & MT5 Forex Brokers in Kenya",
    metaTitle: "Best MT4 & MT5 Brokers Kenya 2025",
    metaDesc: "Find the best MetaTrader 4 and MetaTrader 5 brokers for Kenyan traders. Compare platforms, spreads, and EA compatibility.",
    intro: "MetaTrader 4 and MT5 are the most popular trading platforms in Kenya. All brokers below offer full MT4/MT5 support with competitive conditions.",
    brokers: ["exness", "xm-group", "hfm", "fbs", "avatrade"],
  },
  "regulated-brokers": {
    title: "Best Regulated Forex Brokers for Kenyan Traders",
    metaTitle: "Best Regulated Forex Brokers Kenya 2025 | FCA, ASIC, CySEC",
    metaDesc: "Only trade with regulated forex brokers. Compare FCA, ASIC, and CySEC regulated brokers available in Kenya with segregated client funds.",
    intro: "Trading with a regulated broker protects your funds. These brokers hold licences from top-tier regulators including the FCA, ASIC, and CySEC.",
    brokers: ["pepperstone", "exness", "ic-markets", "fp-markets", "fxpro"],
  },
  "brokers-for-beginners": {
    title: "Best Forex Brokers for Beginners in Kenya",
    metaTitle: "Best Forex Brokers for Beginners in Kenya 2025",
    metaDesc: "New to forex trading in Kenya? These beginner-friendly brokers offer low minimum deposits, demo accounts, educational resources, and M-Pesa support.",
    intro: "Starting your forex journey? These brokers offer the lowest minimum deposits, the best educational resources, and easy-to-use platforms for new traders in Kenya.",
    brokers: ["xm-group", "exness", "fbs", "octafx", "deriv"],
  },
};

const BROKER_SNIPPETS = {
  "exness":      { name: "Exness",     rating: 4.8, minDeposit: "$0",   spread: "0.0 pips", mpesa: true,  badge: "Top Rated" },
  "xm-group":   { name: "XM Group",   rating: 4.6, minDeposit: "$5",   spread: "0.6 pips", mpesa: true,  badge: "Best Beginners" },
  "hfm":        { name: "HFM",        rating: 4.5, minDeposit: "$5",   spread: "0.0 pips", mpesa: true,  badge: "Low Spread" },
  "pepperstone":{ name: "Pepperstone",rating: 4.7, minDeposit: "$200", spread: "0.0 pips", mpesa: false, badge: "Best ECN" },
  "ic-markets": { name: "IC Markets", rating: 4.6, minDeposit: "$200", spread: "0.0 pips", mpesa: false, badge: "Raw Spreads" },
  "fbs":        { name: "FBS",        rating: 4.2, minDeposit: "$1",   spread: "0.5 pips", mpesa: true,  badge: "$1 Deposit" },
  "octafx":     { name: "OctaFX",     rating: 4.1, minDeposit: "$25",  spread: "0.6 pips", mpesa: true,  badge: "Copy Trading" },
  "fp-markets": { name: "FP Markets", rating: 4.5, minDeposit: "$100", spread: "0.0 pips", mpesa: false, badge: "ASIC Regulated" },
  "fxpro":      { name: "FxPro",      rating: 4.4, minDeposit: "$100", spread: "0.6 pips", mpesa: false, badge: "Multi-Platform" },
  "avatrade":   { name: "AvaTrade",   rating: 4.3, minDeposit: "$100", spread: "0.9 pips", mpesa: false, badge: "Trusted Brand" },
  "deriv":      { name: "Deriv",      rating: 4.0, minDeposit: "$5",   spread: "0.5 pips", mpesa: true,  badge: "Synthetic Indices" },
};

export default function BrokerCategory() {
  const { slug } = useParams();
  const cat = CATEGORIES[slug];

  if (!cat) {
    return (
      <div className="min-h-screen bg-[#07101E] flex items-center justify-center text-white pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <Link to="/brokers" className="text-[#C9A84C] hover:underline text-sm">← Back to all brokers</Link>
        </div>
      </div>
    );
  }

  const brokers = cat.brokers.map(s => ({ slug: s, ...(BROKER_SNIPPETS[s] || { name: s, rating: 0 }) }));

  return (
    <>
      <Helmet>
        <title>{cat.metaTitle} | FxBrokers.co.ke</title>
        <meta name="description" content={cat.metaDesc} />
        <link rel="canonical" href={`https://fxbrokers.co.ke/brokers/category/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: cat.title,
          numberOfItems: brokers.length,
          itemListElement: brokers.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            url: `https://fxbrokers.co.ke/brokers/${b.slug}`,
          })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <Link to="/brokers" className="hover:text-[#C9A84C]">Brokers</Link>
            <span>/</span>
            <span className="text-gray-400">{cat.title}</span>
          </nav>

          <h1 className="text-3xl font-bold text-white mb-4">{cat.title}</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xl">{cat.intro}</p>

          <div className="flex flex-col gap-4">
            {brokers.map((broker, idx) => (
              <article
                key={broker.slug}
                className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#C9A84C]/30 transition-all"
              >
                <div className="text-gray-600 font-bold text-lg w-6 shrink-0 hidden sm:block">#{idx + 1}</div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#C9A84C] font-black text-sm shrink-0">
                  {broker.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold">{broker.name}</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/20">{broker.badge}</span>
                    {broker.mpesa && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">M-Pesa ✓</span>
                    )}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>⭐ {broker.rating}/5</span>
                    <span>Min: {broker.minDeposit}</span>
                    <span>Spread: {broker.spread}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href={`https://${broker.slug}.com`} target="_blank" rel="noopener noreferrer sponsored"
                    className="bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                    Trade Now
                  </a>
                  <Link to={`/brokers/${broker.slug}`}
                    className="border border-white/20 hover:border-[#C9A84C]/40 text-gray-300 text-xs font-medium px-4 py-2 rounded-lg transition-all">
                    Review
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="text-xs text-gray-700 italic text-center mt-8">
            Affiliate disclosure: We may receive a commission when you open an account via our links.
          </p>
        </div>
      </div>
    </>
  );
}