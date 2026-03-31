import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react'; // Added ExternalLink for a nice UI touch

const BrokerStrengths = () => {
  const brokerStrengths = [
    { name: "Fusion Markets", desc: "The lowest spread forex broker in Kenya in 2026. Low trading and non-trading fees. Fast and easy account opening. Great customer service.", link: "https://fusionmarkets.com/?refcode=111166" },
    { name: "Exness", desc: "Low forex & CFD fees. Easy account opening process. No deposit or withdrawal fees.", link: "https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd" },
    { name: "FP Markets", desc: "Low forex fees. Easy and fast account opening and funding. Great education tools.", link: "https://www.fpmarkets.com/switch-to-fp-markets/?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167" },
  ];

  return (
    <section className="my-12 p-8 bg-[#0D1B2E]/30 border border-white/5 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">
          Broker Strengths at a Glance
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Find below the strengths of the lowest spread forex brokers available in Kenya, updated for 2026:
        </p>

        <ol className="space-y-6">
          {brokerStrengths.map((broker, i) => (
            <li key={i} className="flex gap-4 group">
              {/* Numbering Circle */}
              <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-xs font-bold">
                {i + 1}
              </div>

              <div className="grow">
                <p className="text-gray-300 text-[15px] leading-relaxed">
                  {/* Clickable Broker Name */}
                  <a 
                    href={broker.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 text-white font-bold border-b border-amber-400/30 hover:border-amber-400 hover:text-amber-400 transition-all cursor-pointer"
                  >
                    {broker.name}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </a>
                  {" "}&ndash; {broker.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BrokerStrengths;