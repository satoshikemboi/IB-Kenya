import { Link } from "react-router-dom";

const footerLinks = {
  "Top Brokers": [
    { label: "Best Forex Brokers Kenya", href: "/brokers/category/best-forex-brokers-kenya" },
    { label: "Brokers Accepting M-Pesa", href: "/brokers/category/mpesa-brokers" },
    { label: "Lowest Spread Brokers", href: "/brokers/category/lowest-spread-brokers" },
    { label: "Best MT4 & MT5 Brokers", href: "/brokers/category/mt4-mt5-brokers" },
    { label: "Best for Beginners", href: "/brokers/category/brokers-for-beginners" },
    { label: "Best Regulated Brokers", href: "/brokers/category/regulated-brokers" },
  ],
  "Broker Reviews": [
    { label: "Exness Review", href: "/brokers/exness" },
    { label: "XM Group Review", href: "/brokers/xm-group" },
    { label: "HFM Review", href: "/brokers/hfm" },
    { label: "Pepperstone Review", href: "/brokers/pepperstone" },
    { label: "IC Markets Review", href: "/brokers/ic-markets" },
    { label: "FBS Review", href: "/brokers/fbs" },
  ],
  "About": [
    { label: "All Broker Reviews", href: "/brokers" },
    { label: "Broker Finder Tool", href: "/broker-finder" },
    { label: "Our Methodology", href: "/methodology" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#040D18] border-t border-white/10 pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="FxBrokers.co.ke Home"
          >
            {/* Icon mark */}
            <div className="scale-150 mb-4 flex items-center justify-center shrink-0">
              <img
                src="/fxbrokerskenya.png"
                alt=""
                aria-hidden="true"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              {/* Fallback fx glyph */}
              <span
                className="hidden text-amber-400 font-bold text-xs leading-none"
                aria-hidden="true"
              >
                FX
              </span>
            </div>

            {/* Wordmark */}
            <span
              className="text-white font-bold text-lg tracking-tight leading-none"
              style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
            >
              <span className="text-amber-400">Fx</span>Brokers
              <span className="text-amber-400/70 font-semibold">.co.ke</span>
            </span>
          </Link>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Kenya's independent forex broker comparison site. We help Kenyan traders
              find safe, regulated brokers with transparent fees.
            </p>
            <div className="flex gap-3">
              {["Twitter/X", "Facebook", "YouTube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={platform}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-colors text-xs font-bold"
                >
                  {platform[0]}
                </a>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
             <div className="flex flex-col items-center justify-center gap-2">
             <div className="flex items-center gap-2 text-[#C9A84C]">
                  {/* Location Pin Icon */}
             <span className="text-lg">📍</span>
            </div>
    
             <div className="text-center">
              <p className="text-white font-medium text-sm">Westlands, Nairobi, Kenya</p>
               <p className="text-gray-500 text-[11px] mt-1">The Hub of Forex Trading in East Africa</p>
             </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-500 hover:text-[#C9A84C] text-xs transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Risk disclaimer */}
        <div className="border border-white/10 rounded-xl p-5 mb-8 bg-white/2">
          <p className="text-gray-600 text-xs leading-relaxed">
            <strong className="text-gray-500 font-semibold">Risk Warning:</strong>{" "}
            Trading forex and CFDs carries a high level of risk and may not be suitable for all investors.
            You could lose all of your invested capital. Leverage can work against you as well as for you.
            Before deciding to trade, ensure you understand the risks involved and seek independent financial advice if necessary.
            Past performance is not indicative of future results.
          </p>
          <p className="text-gray-600 text-xs leading-relaxed mt-3">
            <strong className="text-gray-500 font-semibold">Affiliate Disclosure:</strong>{" "}
            FxBrokers.co.ke may receive compensation when you open an account with a broker through our affiliate links.
            This compensation does not influence our ratings, reviews, or editorial content. Our rankings are based
            solely on our independent research methodology.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {year} FxBrokers.co.ke — All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-gray-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}