import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const criteria = [
  { label: "Regulation & Safety", weight: "30%", color: "#C9A84C", details: "We only list brokers regulated by recognised authorities (FCA, ASIC, CySEC, FSCA, CMA). We check for client fund segregation, negative balance protection, and compensation schemes." },
  { label: "Spreads & Trading Fees", weight: "25%", color: "#4A8FD4", details: "We open live accounts and measure real spreads on EUR/USD during London and New York sessions. We account for commissions, swap rates, and any hidden fees." },
  { label: "Platforms & Tools", weight: "25%", color: "#4AC9A8", details: "We evaluate platform stability, execution speed, available instruments, charting tools, and mobile app quality. We test MT4, MT5, and proprietary platforms." },
  { label: "Support & Deposits", weight: "20%", color: "#A84C9A", details: "We test customer support via live chat, email, and phone. For Kenyan traders we specifically test M-Pesa deposit and withdrawal speeds and minimum amounts." },
];

export default function Methodology() {
  return (
    <>
      <Helmet>
        <title>Our Broker Review Methodology | FxBrokers.co.ke</title>
        <meta name="description" content="Learn how FxBrokers.co.ke independently tests and rates forex brokers for Kenyan traders. Our transparent methodology covers regulation, spreads, platforms, and support." />
        <link rel="canonical" href="https://fxbrokers.co.ke/methodology" />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Methodology</span>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-4">How We Review Forex Brokers</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-12 max-w-xl">
            Our reviews are independent, data-driven, and built for Kenyan traders. No broker can pay to improve their ranking. Here is exactly how we score every broker.
          </p>

          <div className="flex flex-col gap-6 mb-12">
            {criteria.map((c, i) => (
              <div key={c.label} className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#07101E] font-black text-sm" style={{ background: c.color }}>
                      {i + 1}
                    </div>
                    <h2 className="text-white font-semibold text-base">{c.label}</h2>
                  </div>
                  <span className="text-2xl font-bold shrink-0" style={{ color: c.color }}>{c.weight}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{c.details}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6">
            <h2 className="text-white font-semibold text-lg mb-3">Our Independence Policy</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              FxBrokers.co.ke earns revenue through affiliate commissions when traders open accounts via our links. However, our editorial team operates independently of our commercial team.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Brokers cannot pay to improve their ratings, alter our review content, or be included in our top picks lists. Our scores are calculated algorithmically from our testing data and updated at least once per quarter.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}