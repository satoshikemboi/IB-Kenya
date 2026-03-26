import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// ── Mock broker data (replace with API / CMS later) ──────────────────────────
const BROKER_DATA = {
  exness: {
    name: "Exness",
    tagline: "Industry-leading low spreads with instant withdrawals",
    rating: 4.8,
    scores: { regulation: 9.5, spreads: 9.8, platforms: 9.0, support: 9.2, deposits: 9.7 },
    verdict: "Exness is our top-rated broker for Kenyan traders thanks to its ultra-low spreads, M-Pesa support, and instant withdrawals. With regulation from the FCA and CySEC, your funds are in safe hands.",
    pros: ["Instant withdrawals 24/7", "M-Pesa deposits & withdrawals", "Spreads from 0.0 pips on Standard accounts", "No minimum deposit on Standard accounts", "FCA and CySEC regulated"],
    cons: ["Limited educational resources", "No cTrader platform", "US clients not accepted"],
    minDeposit: "$0 (Standard) / $200 (Pro)",
    maxLeverage: "1:2000 (retail)", 
    regulation: "FCA (UK), CySEC (Cyprus), FSA (Seychelles), FSCA (South Africa)",
    platforms: ["MT4", "MT5", "Exness Terminal", "Exness Trade App"],
    paymentMethods: ["M-Pesa", "Visa/Mastercard", "Bank Transfer", "Skrill", "Neteller", "Crypto"],
    spreadFrom: "0.0 pips",
    commission: "$0 (Standard) / $3.5 per lot (Raw Spread)",
    founded: 2008,
    headquarters: "Limassol, Cyprus",
    affiliateUrl: "https://exness.com/?ref=YOUR_ID",
    accountTypes: [
      { name: "Standard", minDeposit: "$0", spread: "0.3 pips avg", commission: "None", best: "Beginners" },
      { name: "Standard Cent", minDeposit: "$0", spread: "0.3 pips avg", commission: "None", best: "Practice" },
      { name: "Pro", minDeposit: "$200", spread: "0.1 pips avg", commission: "None", best: "Intermediate" },
      { name: "Raw Spread", minDeposit: "$200", spread: "0.0 pips", commission: "$3.5/lot", best: "Active traders" },
      { name: "Zero", minDeposit: "$200", spread: "0.0 pips", commission: "$3.5/lot", best: "Scalpers" },
    ],
  },
};

const FALLBACK = {
  name: "Broker",
  tagline: "Review coming soon",
  rating: 0,
  scores: { regulation: 0, spreads: 0, platforms: 0, support: 0, deposits: 0 },
  verdict: "We are currently working on this broker review. Check back soon.",
  pros: [],
  cons: [],
  minDeposit: "—",
  maxLeverage: "—",
  regulation: "—",
  platforms: [],
  paymentMethods: [],
  spreadFrom: "—",
  commission: "—",
  founded: "—",
  headquarters: "—",
  affiliateUrl: "#",
  accountTypes: [],
};

function ScoreBar({ label, score }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{score}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C9A84C] rounded-full transition-all duration-700"
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

export default function BrokerReview() {
  const { slug } = useParams();
  const broker = BROKER_DATA[slug] || { ...FALLBACK, name: slug?.replace(/-/g, " ") };
  const overallRating = broker.rating;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${broker.name} Review ${new Date().getFullYear()}`,
    reviewBody: broker.verdict,
    reviewRating: {
      "@type": "Rating",
      ratingValue: overallRating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Organization", name: "FxBrokers.co.ke" },
    itemReviewed: { "@type": "FinancialProduct", name: broker.name },
  };

  return (
    <>
      <Helmet>
        <title>{broker.name} Review {new Date().getFullYear()} — Is It Safe? | FxBrokers.co.ke</title>
        <meta name="description" content={`Read our in-depth ${broker.name} review for Kenyan traders. We test spreads, regulation, M-Pesa support, and withdrawal speed. Rating: ${overallRating}/5.`} />
        <link rel="canonical" href={`https://fxbrokers.co.ke/brokers/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/brokers" className="hover:text-[#C9A84C] transition-colors">Brokers</Link>
            <span>/</span>
            <span className="text-gray-400">{broker.name}</span>
          </nav>

          {/* Hero card */}
          <div className="bg-[#0D1B2E] border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#C9A84C] font-black text-lg shrink-0">
                {broker.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-1">{broker.name} Review {new Date().getFullYear()}</h1>
                <p className="text-gray-400 text-sm mb-4">{broker.tagline}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="text-[#C9A84C]">★</span>
                    <span className="text-white font-bold">{overallRating}</span>/5
                  </span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400">Founded {broker.founded}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400">{broker.headquarters}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                <a
                  href={broker.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] font-bold text-sm text-center px-6 py-3 rounded-xl transition-colors"
                >
                  Open Account →
                </a>
                <p className="text-gray-600 text-[10px] text-center">CFDs are risky. Capital at risk.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Verdict */}
              <section className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5">
                <h2 className="text-white font-semibold text-lg mb-3">Our Verdict</h2>
                <p className="text-gray-300 text-sm leading-relaxed">{broker.verdict}</p>
              </section>

              {/* Pros & Cons */}
              <section className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5">
                <h2 className="text-white font-semibold text-lg mb-4">Pros & Cons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">Pros</p>
                    <ul className="flex flex-col gap-2">
                      {broker.pros.map(p => (
                        <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">Cons</p>
                    <ul className="flex flex-col gap-2">
                      {broker.cons.map(c => (
                        <li key={c} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Account Types */}
              {broker.accountTypes.length > 0 && (
                <section className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5">
                  <h2 className="text-white font-semibold text-lg mb-4">Account Types</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-125">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Account", "Min. Deposit", "Spread", "Commission", "Best For"].map(h => (
                            <th key={h} className="text-gray-500 text-xs uppercase text-left pb-2 pr-4 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {broker.accountTypes.map(acc => (
                          <tr key={acc.name} className="border-b border-white/5 hover:bg-white/2">
                            <td className="py-3 pr-4 text-white font-medium">{acc.name}</td>
                            <td className="py-3 pr-4 text-gray-300">{acc.minDeposit}</td>
                            <td className="py-3 pr-4 text-gray-300">{acc.spread}</td>
                            <td className="py-3 pr-4 text-gray-300">{acc.commission}</td>
                            <td className="py-3 text-[#C9A84C] text-xs">{acc.best}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Payment Methods */}
              <section className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5">
                <h2 className="text-white font-semibold text-lg mb-4">Deposits & Withdrawals</h2>
                <div className="flex flex-wrap gap-2">
                  {broker.paymentMethods.map(method => (
                    <span
                      key={method}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        method === "M-Pesa"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                          : "bg-white/5 text-gray-300 border-white/10"
                      }`}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">

              {/* Quick facts */}
              <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Quick Facts</h3>
                <dl className="flex flex-col gap-3 text-xs">
                  {[
                    ["Min. Deposit", broker.minDeposit],
                    ["Spread From", broker.spreadFrom],
                    ["Commission", broker.commission],
                    ["Max Leverage", broker.maxLeverage],
                    ["Regulation", broker.regulation],
                    ["Platforms", broker.platforms?.join(", ")],
                  ].map(([label, val]) => (
                    <div key={label} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <dt className="text-gray-600 uppercase tracking-wide mb-0.5">{label}</dt>
                      <dd className="text-gray-200">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Scores */}
              <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Our Scores</h3>
                <div className="flex flex-col gap-3">
                  {Object.entries(broker.scores).map(([key, val]) => (
                    <ScoreBar
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      score={val}
                    />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl p-5 text-center">
                <p className="text-white font-semibold text-sm mb-1">Ready to start?</p>
                <p className="text-gray-400 text-xs mb-4">Open a free account with {broker.name} today.</p>
                <a
                  href={broker.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] font-bold text-sm py-2.5 rounded-lg transition-colors"
                >
                  Open Account
                </a>
                <p className="text-gray-700 text-[10px] mt-2">CFDs are complex instruments. Capital at risk.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}