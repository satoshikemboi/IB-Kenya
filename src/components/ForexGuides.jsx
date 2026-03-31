import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react'; // Optional: Use lucide-react for cleaner icons

const ForexGuides = () => {
  const guides = [
    { title: "Best Low Spread Forex Brokers for 2026", href: "/brokers/category/lowest-spread-brokers" },
    { title: "Best Copy Trading Platforms in Kenya for 2026", href: "/brokers/category/copy-trading" },
    { title: "Compare Forex Brokers in Kenya", href: "/brokers" },
    { title: "Best Forex Brokers in Kenya for Beginners of 2026", href: "/brokers/category/brokers-for-beginners" },
    { title: "Best Forex Trading Apps for 2026", href: "/brokers" },
    { title: "Best MetaTrader 4 (MT4) Brokers for 2026", href: "/brokers/category/mt4-mt5-brokers" },
  ];

  return (
    <section className="mt-16 md:px-32 mb-12">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        Popular Forex Guides
        <div className="h-px bg-white/10 grow rounded-full" />
      </h2>

      {/* Grid of Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {guides.map((guide, index) => (
          <Link
            key={index}
            to={guide.href}
            className="group flex items-center justify-between p-4 bg-[#0D1B2E] border border-white/5 rounded-xl transition-all duration-200 hover:bg-white/5 hover:border-amber-400/20"
          >
            <span className="text-slate-300 text-sm font-medium group-hover:text-amber-400 transition-colors">
              {guide.title}
            </span>
            
            {/* Animated Chevron */}
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ForexGuides;