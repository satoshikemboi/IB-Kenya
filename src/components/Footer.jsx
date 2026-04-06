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

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com/kemboi_me",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/fxbrokerskenya",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fxbrokers", 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z" />
      </svg>
    ),
  },
];

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

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-colors"
                >
                  {icon}
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