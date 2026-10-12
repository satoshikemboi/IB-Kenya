import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BrokerListHero from "../components/BrokerListHero";

const ALL_BROKERS = [
  { id: 1, name: "Exness Kenya Review 2026 | Best M-Pesa Broker?", slug: "exness", affiliateLink: "https://one.exnessonelink.com/a/1sh0vxrgqd", rating: 4.8, minDeposit: 10, regulation: ["FCA", "CySEC", "FSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Open Account", category: "ecn", logo: "/exness.png" },
  { id: 2, name: "XM Group Kenya Review 2026 | Best for Beginners?", slug: "xm", affiliateLink: "https://affs.click/MbQNk", rating: 4.6, minDeposit: 5, regulation: ["ASIC", "CySEC", "IFSC"], spread: 0.6, mpesa: true, platforms: ["MT4", "MT5"], badge: "Register Now", category: "market-maker", logo: "/xm.png" },
  { id: 3, name: "HFM Kenya Review | Best broker for Copy Tradingin Kenya?", slug: "hfm", affiliateLink: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020", rating: 4.5, minDeposit: 5, regulation: ["FCA", "DFSA", "FSCA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5"], badge: "Create Account", category: "ecn", logo: "/hfm.png" },
  { id: 4, name: "JustMarkets Kenya Review 2026: Is It Regulated & Legit?", slug: "justmarkets", affiliateLink: "https://one.justmarkets.link/a/17thm0lpq8", rating: 4.7, minDeposit: 5, regulation: ["FCA", "ASIC", "DFSA"], spread: 0.0, mpesa: true, platforms: ["MT4", "MT5", "cTrader"], badge: "Sign Up Now", category: "market-maker", logo: "/justmarkets.png" },
  { id: 5, name: "FBS Kenya Review 2026: $1 Minimum Deposit & Cent Account", slug: "fbs", affiliateLink: "https://fbs.partners?ibl=876040&ibp=35444511", rating: 4.2, minDeposit: 1, regulation: ["IFSC", "CySEC"], spread: 0.5, mpesa: true, platforms: ["MT4", "MT5"], badge: "Open Account", category: "market-maker", logo: "/fbs.png" },
  { id: 6, name: "FxPro Review 2026", slug: "fxpro", affiliateLink: "https://direct-fxpro.com/en/partner/2xPncqjwh", rating: 4.4, minDeposit: 100, regulation: ["FCA", "CySEC", "FSCA"], spread: 0.6, mpesa: false, platforms: ["MT4", "MT5", "cTrader"], badge: "Create Account", category: "ecn", logo: "/fxpro.png" },
  { id: 7, name: "FxPesa Review 2026", slug: "fxpesa", affiliateLink: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263", rating: 4.3, minDeposit: 10, regulation: ["CMA"], spread: 0.8, mpesa: true, platforms: ["MT4"], badge: "Open Account", category: "market-maker", logo: "/fxpesa.png" },
  { id: 8, name: "FP Markets Review 2026", slug: "fpmarkets", affiliateLink: "https://portal.fpmarkets.com/int-EN/register?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167", rating: 4.3, minDeposit: 10, regulation: ["CMA"], spread: 0.8, mpesa: true, platforms: ["MT4"], badge: "Create Account", category: "market-maker", logo: "/fpmarkets.png" },
];

// Editorial ranking: highest rated first.
const RANKED_BROKERS = [...ALL_BROKERS].sort((a, b) => b.rating - a.rating);

function BrokerCard({ broker }) {
  return (
    <Link
      to={`/brokers/${broker.slug}`}
      aria-label={`${broker.name} review`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-[#F3F3F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
    >
      {/* Image area */}
      <div className=" bg-[#E4E9EF] flex items-center justify-center">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
          {broker.logo ? (
            <img
              src={broker.logo}
              alt=""
              loading="lazy"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-gray-900 font-bold text-lg">
              {broker.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>Minimum deposit ${broker.minDeposit}</span>
        </div>

        <h2 className="text-lg font-medium text-[#151A1E] leading-snug">
          {broker.name}
        </h2>

        
<div className="mt-auto flex items-center justify-end gap-2 pt-2">
  {broker.badge && (
    <a
      href={broker.affiliateLink}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={(event) => event.stopPropagation()}
      className="rounded-full border border-gray-900 px-3 py-1.5 text-xs text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
    >
      {broker.badge}
    </a>
  )}

  <span
    aria-hidden="true"
    className="flex h-8 w-8 items-center justify-center rounded-full border border-green-600 text-green-500 transition-colors"
  >
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  </span>
</div>

      </div>
    </Link>
  );
}

export default function BrokerList() {
  return (
    <>
      <Helmet>
        <title>All Forex Brokers in Kenya 2026 | FxBrokers.co.ke</title>
        <meta name="description" content="Browse and compare all forex brokers available to Kenyan traders. Filter by M-Pesa support, regulation, platform, and more." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers" />
      </Helmet>

      <div
        className="min-h-screen bg-white pb-16 px-4"
        style={{ fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif" }}
      >
        <BrokerListHero />

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RANKED_BROKERS.map((broker) => (
              <BrokerCard key={broker.id} broker={broker} />
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-10 italic">
            Disclosure: We may earn a commission when you open an account via our links. This does not affect our ratings.
          </p>
        </div>
      </div>
    </>
  );
}