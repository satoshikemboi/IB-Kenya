import React from 'react';
import { ExternalLink, Shield, Smartphone, Wallet, Users, Zap } from 'lucide-react';

const BrokerCard = ({ title, name, description, link, tags, logo, featured }) => (
  <div className={`relative p-6 rounded-2xl border transition-all hover:shadow-xl ${
    featured ? 'bg-[#0D1B2E] border-[#C9A84C]/50' : 'bg-[#0F172A] border-white/10'
  }`}>
    {featured && (
      <span className="absolute -top-3 right-6 bg-[#C9A84C] text-[#07101E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Top Recommendation
      </span>
    )}
    
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-2 rounded-xl flex items-center justify-center ${featured ? 'ring-2 ring-[#C9A84C]' : ''}`}>
        {/* Fixed: Destructured 'logo' from props */}
        <img src={logo} alt={`${name} logo`} className="w-14 h-14 object-contain" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold">{title}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer sponsored" 
          className="text-xl font-bold text-white hover:text-[#C9A84C] transition-colors"
        >
          {name}
        </a>
      </div>
    </div>

    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
      {description}
    </p>

    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => (
        <span key={tag} className="text-[10px] bg-white/5 text-gray-300 px-2.5 py-1 rounded-md border border-white/5">
          {tag}
        </span>
      ))}
    </div>

    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all ${
        featured 
        ? 'bg-[#C9A84C] text-[#07101E] hover:bg-[#D4B762]' 
        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
      }`}
    >
      Sign Up with {name} <ExternalLink size={14} />
    </a>
  </div>
);

export default function TopBrokersKenya() {
  const brokers = [
    {
      title: "Best Overall Broker",
      name: "Exness",
      logo: "/exness.png",
      featured: true,
      description: "Unmatched security and instant withdrawals. The gold standard for Kenyan traders who prioritize speed and safety.",
      link: "https://one.exnessonelink.com/a/1sh0vxrgqd",
      tags: ["FCA / FSCA Regulated", "Instant M-Pesa", "0.0 Spreads"]
    },
    {
      title: "Best for Beginners & M-Pesa",
      name: "JustMarkets",
      logo: "/justmarkets.png",
      description: "Highly accessible with $10 minimum deposits and 1:∞ leverage. Perfect for those starting with small capital.",
      link: "https://one.justmarkets.link/a/17thm0lpq8",
      tags: ["1:∞ Leverage", "Low Minimum Deposit", "M-Pesa Supported"]
    },
    {
      title: "Best Local Regulatory Support",
      name: "FXPesa",
      logo: "/fxpesa.png",
      description: "The premier CMA-regulated broker in Kenya. Offers local physical support and zero hidden platform fees.",
      link: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263",
      tags: ["CMA Regulated", "Local Support", "Zero Fees"]
    },
    {
      title: "Best for Copy Trading",
      name: "HFM",
      logo: "/hfm.png",
      description: "Industry-leading copy trading platform. Follow expert strategies automatically with full risk control.",
      link: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020",
      tags: ["Copy Trading", "24/7 Support", "MT4/MT5"]
    },
    {
      title: "Best for Spreads",
      name: "Fusion Markets",
      logo: "/fusion.png",
      description: "Radically low costs with some of the tightest spreads in the industry. Ideal for high-frequency traders.",
      link: "https://fusionmarkets.com/?refcode=111166",
      tags: ["Lowest Commission", "No Minimum Deposit", "ASIC Regulated"]
    },
    {
      title: "Best Mobile App",
      name: "Deriv",
      logo: "/deriv.png",
      description: "Optimized mobile experience for trading on the go. Great for synthetic indices and traditional forex pairs.",
      link: "https://track.deriv.com/_QstxbfW082hZl7VyVw174GNd7ZgqdRLk/1/",
      tags: ["Deriv GO App", "Synthetic Indices", "24/7 Trading"]
    }
  ];

  return (
    <section className="bg-[#07101E] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className=" mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Top Forex Brokers in Kenya (2026)</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've analyzed dozens of platforms to find the safest, most cost-effective brokers that specifically support Kenyan payment methods and regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {brokers.map((broker, idx) => (
            <BrokerCard key={idx} {...broker} />
          ))}
        </div>

        {/* Educational/Trust Section */}
        <div className="bg-[#0D1B2E] border border-white/5 rounded-lg p-10">
          <h3 className="text-2xl font-bold text-gray-100 mb-8">Key Factors for Kenyan Traders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Shield size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">Regulation</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Always prioritize brokers regulated by the <strong>Kenyan Capital Markets Authority (CMA)</strong> or top-tier global bodies like the FCA or ASIC. 
                <a href={brokers[2].link} className="text-[#C9A84C] ml-1 hover:underline">Check FXPesa (CMA Regulated) →</a>
              </p>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Wallet size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">M-Pesa Support</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Avoid high conversion fees. Brokers like 
                <a href={brokers[0].link} className="text-[#C9A84C] mx-1 hover:underline">Exness</a> and 
                <a href={brokers[1].link} className="text-[#C9A84C] mx-1 hover:underline">JustMarkets</a> offer instant M-Pesa transactions.
              </p>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Smartphone size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">Platforms</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ensure your broker supports <strong>MT4, MT5, or cTrader</strong>. 
                <a href={brokers[3].link} className="text-[#C9A84C] ml-1 hover:underline">See HFM MT5 options →</a>
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium">
              High Risk Warning: Trading Forex and CFDs involves significant risk and can result in the loss of your invested capital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}