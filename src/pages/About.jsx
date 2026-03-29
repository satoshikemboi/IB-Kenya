import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LocationCard from "../components/LocationCard";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About FxBrokers.co.ke — Kenya's Independent Forex Review Site</title>
        <meta name="description" content="FxBrokers.co.ke is Kenya's leading independent forex broker review and comparison site. Learn about our mission, team, and editorial standards." />
        <link rel="canonical" href="https://fxbrokers.co.ke/about" />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span className="text-gray-400">About</span>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-4">About FxBrokers.co.ke</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xl">
            We are Kenya's independent forex broker review and comparison platform, built by traders for traders.
          </p>

          <div className="flex flex-col gap-6">
            <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-3">Our Mission</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Too many Kenyan traders have lost money with unregulated or unsuitable brokers. FxBrokers.co.ke exists to change that. We independently test every broker we list, verify their regulation, and share honest findings so you can trade with confidence.
              </p>
            </div>

            <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-3">Who We Are</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                FxBrokers.co.ke was founded by a team of Kenyan traders and financial analysts frustrated with generic, non-Africa-focused broker reviews. Our team has over 15 years of combined forex trading experience in the Kenyan market.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                We are based in Nairobi and understand the unique challenges facing Kenyan traders — from M-Pesa funding to CMA regulation and USD/KES considerations.
              </p>
            </div>

            <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-3">Editorial Standards</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every broker review is based on hands-on testing with real accounts. We open live accounts, make real deposits, test withdrawals, and contact customer support. Our scoring methodology is fully transparent. See our{" "}
                <Link to="/methodology" className="text-[#C9A84C] hover:underline">Methodology page</Link> for full details.
              </p>
            </div>

            <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-3">Affiliate Disclosure</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                We earn affiliate commissions when you open a broker account via our links. This is how we fund our research and keep the site free to use. Importantly, this never influences our ratings, reviews, or recommendations. Brokers cannot pay to improve their position.
              </p>
            </div>
          </div>
          <div className="p-6">
          <LocationCard/>
          </div>
        </div>
      </div>
    </>
  );
}