import { Link } from "react-router-dom";

const UPDATED = "Oct 2026";

const CMA_REGISTER = "https://licensees.cma.or.ke/licenses/5/";

const BROKERS = [
  {
    name: "FXPesa",
    legal: "EGM Securities",
    href: "https://www.fxpesa.com/ke-en/",
    license: "107",
    summary:
      "Local office in Westlands, Nairobi, M-Pesa support and Kenyan Shilling account options, with MetaTrader 4, MetaTrader 5 and the Equiti Trader App.",
  },
  {
    name: "Exness KE",
    legal: "Exness KE Limited",
    href: "https://www.exness.ke/",
    license: "162",
    summary:
      "Negative balance protection, instant withdrawals and local payment integration, with MetaTrader 4, MetaTrader 5, Exness Terminal and Exness Trade.",
  },
  {
    name: "Pepperstone Markets Kenya",
    href: "https://pepperstone.com/en-af/", // TODO: swap for the Kenya-specific page
    license: "128",
    summary:
      "Raw spreads from 0.0 pips and fast execution, on MetaTrader 4, MetaTrader 5, cTrader and TradingView.",
  },
  {
    name: "Scope Markets",
    legal: "SCFM Limited",
    href: "https://www.scopemarkets.co.ke/",
    license: "123",
    summary:
      "M-Pesa deposits, fractional stocks and a diverse range of CFDs on MetaTrader 5.",
  },
  {
    name: "HFM Kenya",
    legal: "HF Investments Ltd",
    href: "https://www.hfm.com/ke/en/",
    license: "155",
    summary:
      "Cent, Zero and Pro accounts, with zero-commission and swap-free options on MetaTrader 4 and MetaTrader 5.",
  },
];

const extLink =
  "font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors";

export default function BrokerListHero() {
  return (
    <header
      className="max-w-5xl mx-auto pt-24 pb-12"
      style={{ fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-gray-900 transition-colors">
              fbrokers.co.ke
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li>
            <Link to="/brokers" className="hover:text-gray-900 transition-colors">
              Brokers
            </Link>
          </li>
        </ol>
      </nav>

      {/* Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="rounded-full border border-gray-700 px-5 py-1.5 text-sm text-gray-900 bg-gray-100">
          Updated {UPDATED}
        </span>
        <span className="rounded-full border border-gray-700 px-5 py-1.5 text-sm text-gray-900 bg-gray-100">
          All Brokers
        </span>
      </div>

      {/* Title */}
      <h1 className="max-w-3xl text-4xl md:text-6xl font-semibold text-gray-800 leading-[0.9] tracking-tight mb-8">
        Best Forex Brokers in Kenya (2026)
      </h1>

      {/* Intro */}
      <div className="max-w-2xl space-y-5 text-base md:text-lg leading-relaxed text-gray-600">
        

        <p>
          This guide covers the{" "}
          <strong className="font-semibold text-gray-800">
            top CMA-licensed forex brokers in Kenya
          </strong>
          . Each is listed on the{" "}
          <a
            href={CMA_REGISTER}
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            CMA's official licensee register
          </a>
          , and each offers something different:
        </p>

        <ul className="space-y-3 text-base">
          {BROKERS.map((b) => (
            <li key={b.name}>
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className={extLink}
              >
                {b.name}
              </a>{" "}
              <span className="text-gray-500">
                (CMA License No. {b.license}
                {b.legal ? `, ${b.legal}` : ""}):
              </span>{" "}
              {b.summary}
            </li>
          ))}
        </ul>

        <p>We look at{" "}
          <strong className="font-semibold text-gray-800">
            regulation, platforms, fees, deposit and withdrawal methods and
            account types
          </strong>
          , so you can pick a broker with confidence.
        </p>

        <p className="text-sm leading-relaxed text-green-500">
          Risk warning: Forex and CFD trading carries a high risk of loss and
          may not be suitable for all investors. Only trade with money you can
          afford to lose.
        </p>
      </div>
    </header>
  );
}