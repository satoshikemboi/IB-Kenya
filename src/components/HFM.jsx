import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCORES = {
  "Regulation & Safety": 9.2,
  "Spreads & Fees": 9.5,
  "Platforms & Tools": 9.1,
  "Deposits & Withdrawals": 9.0,
  "Customer Support": 9.3,
};

const ACCOUNT_TYPES = [
  { name: "Micro", minDeposit: "$5", spread: "1.2 pips", commission: "None", best: "Beginners" },
  { name: "Premium", minDeposit: "$100", spread: "1.2 pips", commission: "None", best: "Intermediate" },
  { name: "HFcopy", minDeposit: "$100", spread: "1.2 pips", commission: "None", best: "Copy traders" },
  { name: "Zero Spread", minDeposit: "$200", spread: "0.0 pips", commission: "$6/lot", best: "Scalpers", highlight: true },
  { name: "Auto", minDeposit: "$300", spread: "1.2 pips", commission: "None", best: "Algo traders" },
  { name: "Islamic", minDeposit: "$5", spread: "1.2 pips", commission: "None", best: "Swap-free" },
];

const PROS = [
  "$5 minimum deposit",
  "M-Pesa deposits & withdrawals",
  "0.0 pip Zero Spread account",
  "FCA & DFSA regulated",
  "Copy trading via HFcopy",
  "Rich educational content",
];
const CONS = [
  "Higher base spreads on standard accounts",
  "Inactivity fee after 6 months",
];

const REGULATORS = [
  { authority: "FCA", country: "UK", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "DFSA", country: "Dubai", tier: "Tier 1", tierColor: "text-blue-300 bg-blue-500/15" },
  { authority: "FSCA", country: "South Africa", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
  { authority: "CySEC", country: "Cyprus", tier: "Tier 2", tierColor: "text-emerald-300 bg-emerald-500/15" },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", time: "Instant", fee: "Free", min: "$5", highlight: true },
  { name: "Visa / Mastercard", time: "Instant", fee: "Free", min: "$50" },
  { name: "Skrill / Neteller", time: "Instant", fee: "Free", min: "$5" },
  { name: "Bank Transfer", time: "2–5 days", fee: "Free", min: "$100" },
];

const AFFILIATE_LINK = "https://register.hfm.com/ke/en/new-live-account/?refid=30515020";

const FAQS = [
  {
    q: <>How do I open an <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> account?</>,
    a: <>Visit the <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM registration page</a>, enter your details and select Kenya as your country. Verify your identity with a valid national ID or passport. Upload your proof of adress (recommend you use KRA PIN) then deposit from as little as $10 via M-Pesa.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> safe for Kenyan traders?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> (formerly HotForex) is regulated by the FCA (UK), CMA (Kenya) and DFSA (Dubai), both Tier-1 authorities. Client funds are held in a segregated accounts with negative balance protection.</>,
  },
  {
    q: "Can I deposit and withdraw with M-Pesa?",
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> supports M-Pesa for both deposits and withdrawals in Kenya. The minimum M-Pesa deposit is $10 and processing is typically instant.</>,
  },
  {
    q: <>What is the minimum deposit for <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> in Kenya?</>,
    a: <>The Micro account starts at just $5 via M-Pesa, making <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> highly accessible for beginners. The Zero Spread and Auto accounts require upto $200.</>,
  },
  {
    q: <>What is the Zero Spread account at <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a>?</>,
    a: <>The Zero Spread account at <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> offers 0.0 pip spreads on 50+ instruments with a $6/lot commission. It requires a $200 minimum deposit and is best suited for scalpers and high-frequency traders.</>,
  },
  {
    q: <>Does <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> offer copy trading?</>,
    a: <>Yes. <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> has its own copy trading platform called HFcopy, where you can follow experienced strategy providers and automatically replicate their strategies & trades from as little as $100.</>,
  },
  {
    q: "Are there any inactivity fees?",
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> charges a monthly inactivity fee of $5 after 6 consecutive months of no trading activity. This is waived as soon as you place a trade.</>,
  },
  {
    q: <>Is <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> regulated by the CMA in Kenya?</>,
    a: <><a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] hover:underline">HFM</a> is licensed by the Kenyan Capital Markets Authority (CMA) with the licence number 155.</>,
  },
];

// ─── Components ───────────────────────────────────────────────────────────────
function ScoreBar({ label, score }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold">{score}/10</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#C9A84C]" style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-2 overflow-hidden bg-[#0D1B2E]">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-4 text-left">
        <span className="text-white font-medium text-sm">{q}</span>
        <span className={`text-[#C9A84C] transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3 leading-relaxed">{a}</div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HFMReview() {
  return (
    <div className="min-h-screen bg-[#07101E] text-gray-300 selection:bg-[#C9A84C]/30">
      <Helmet>
        <title>HFM Review 2026 — M-Pesa, Zero Spread & Copy Trading | FxBrokers.co.ke</title>
        <meta name="description" content="HFM review for Kenyan traders 2026. Compare spreads, M-Pesa support, copy trading via HFcopy, FCA regulation, and account types." />
        <link rel="canonical" href="https://fxbrokers.co.ke/brokers/hfm" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Organization", name: "HFM" },
          reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" },
          author: { "@type": "Organization", name: "FxBrokers.co.ke" },
        })}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/brokers" className="hover:text-white">Brokers</Link>
          <span>/</span>
          <span className="text-gray-400">HFM Review</span>
        </nav>

        {/* Hero */}
        <header className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center shrink-0">
              <img src="/hfm.png" alt="HFM Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-semibold text-white tracking-tight">HFM Review 2026</h1>
                <span className="bg-[#C9A84C]/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-[#C9A84C]/20">LOW SPREAD</span>
              </div>
              <p className="text-gray-500 max-w-xl font-semibold mb-4 text-md leading-relaxed">
                HFM (formerly HotForex) is a globally trusted broker with a strong presence in Kenya, offering 0.0 pip spreads, M-Pesa support, and a built-in copy trading platform.
              </p>
              <div className="flex flex-wrap justify-center py-3 md:justify-start gap-2">
                {["FCA & DFSA", "M-Pesa", "$5 Min", "Copy Trading"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <div className="w-full md:w-auto flex pt-4 gap-2">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 bg-amber-400 text-[#07101E] font-bold py-2 rounded-sm text-center hover:bg-[#b5953b] transition-all">
                  Open Account
                </a>
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored"
                  className="w-full md:w-44 border border-white/10 py-2 rounded-sm text-center text-sm hover:bg-white/5 transition-all">
                  Try Demo
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Verdict */}
            <section className="p-4 mt-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> HFM Review
              </h2>
              <p className="text-md leading-relaxed mb-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer sponsored" className="text-amber-400 hover:underline">HFM</a> is one of the most established international brokers serving Kenyan traders, with over a decade of operation and FCA regulation. The standout feature is the Zero Spread account offering 0.0 pip spreads on 50+ instruments, combined with M-Pesa support from just $5, it's a compelling option for both beginners and experienced traders.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">The Good</h4>
                  {PROS.map(p => <div key={p} className="flex items-center gap-2 text-md mb-2"><span className="text-emerald-500">✓</span> {p}</div>)}
                </div>
                <div>
                  <h4 className="text-red-400 text-sm font-bold uppercase tracking-widest mb-3">The Bad</h4>
                  {CONS.map(c => <div key={c} className="flex items-center gap-2 text-md mb-2"><span className="text-red-500">✕</span> {c}</div>)}
                </div>
              </div>
            </section>

            {/* Account Types */}
            <section className="p-6 overflow-hidden">
              <h2 className="text-white font-bold text-lg mb-4">Account Types</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm min-w-125">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Type</th><th className="pb-3">Min Dep</th><th className="pb-3">Spread</th><th className="pb-3">Commission</th><th className="pb-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ACCOUNT_TYPES.map(acc => (
                      <tr key={acc.name} className={acc.highlight ? "text-amber-400" : ""}>
                        <td className="py-4 font-medium text-white">{acc.name}</td>
                        <td className="py-4">{acc.minDeposit}</td>
                        <td className="py-4">{acc.spread}</td>
                        <td className="py-4 text-md">{acc.commission}</td>
                        <td className="py-4 text-md text-gray-500">{acc.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Payments */}
            <section className="p-6">
              <h2 className="text-white font-bold text-lg mb-4">Deposits & Withdrawals</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-100">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                      <th className="pb-3">Method</th><th className="pb-3">Processing</th><th className="pb-3">Fee</th><th className="pb-3">Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAYMENT_METHODS.map(pm => (
                      <tr key={pm.name} className={pm.highlight ? "text-amber-400" : ""}>
                        <td className="py-3 font-medium text-white flex items-center gap-2">
                          {pm.name}
                          {pm.highlight && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Recommended</span>}
                        </td>
                        <td className="py-3 text-md">{pm.time}</td>
                        <td className="py-3 text-md">{pm.fee}</td>
                        <td className="py-3 text-md">{pm.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-gray-500 text-sm">
                <p className="text-lg text-gray-200">
                  HFM offers a variety of deposit and withdrawal methods for Kenyan traders, with M-Pesa being the most popular due to its convenience and low minimum deposit of $5. Card payments and e-wallets like Skrill and Neteller are also available, while bank transfers take longer but are free of charge.
                </p>
                <img src="/hfmdeposit.png" alt="HFM Payment Methods" className="mt-6 rounded border border-white/10" />
              </div>
            </section>

            {/* Regulation */}
            <section className="p-6">
              <h2 className="text-white font-bold text-xl mb-4 tracking-tight">Safety & Regulation</h2>
              <div className="space-y-3">
                {REGULATORS.map(reg => (
                  <div key={reg.authority} className="flex justify-between items-center p-3 bg-white/5 border border-white/5">
                    <div>
                      <p className="text-white font-bold text-sm">{reg.authority}</p>
                      <p className="text-[10px] text-gray-500">{reg.country}</p>
                    </div>
                    <span className={`${reg.tierColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>{reg.tier}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-white font-bold text-lg mb-4">HFM Kenya FAQ</h2>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </section>
          </div>

          <aside className="hidden lg:block w-90 shrink-0">
  <div className="sticky top-24 space-y-6">
    {/* Highlight Cards */}
    <div className="bg-[#0D1B2E] border border-white/5 rounded-xl p-4 space-y-4">
      <div className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
        <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider mb-1">Local Support</p>
        <p className="text-white text-xs font-semibold">M-Pesa from $5</p>
      </div>

      <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
        <p className="text-blue-400 text-[9px] font-bold uppercase tracking-wider mb-1">Regulation</p>
        <p className="text-white text-xs font-semibold">FCA & DFSA Licensed</p>
      </div>

      <div className="bg-purple-500/5 p-3 rounded-lg border border-purple-500/10">
        <p className="text-purple-400 text-[9px] font-bold uppercase tracking-wider mb-1">Unique Feature</p>
        <p className="text-white text-xs font-semibold">HFcopy Trading</p>
      </div>

      <div className="pt-2">
        <a 
          href={AFFILIATE_LINK} 
          target="_blank" 
          rel="noopener noreferrer sponsored"
          className="block w-full bg-amber-400 text-[#07101E] font-bold py-3 rounded-lg text-center text-xs hover:bg-amber-500 transition-all active:scale-95"
        >
          Open HFM Account →
        </a>
        <p className="text-[9px] text-gray-500 text-center mt-3 leading-tight italic">
          Capital at risk. Min deposit: $5 via M-Pesa.
        </p>
      </div>
    </div>

    {/* HFM Skyscraper Banner */}
    <div className="flex justify-center">
      <a 
        href="https://banner-api.hfm.com/link/724b5845?regulator=HFKE&refid=30515020" 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="block group"
      >
        <img 
          src="https://banner-api.hfm.com/banner/724b5845?regulator=HFKE&refid=30515020" 
          width="160" 
          height="600" 
          alt="HFM Kenya Trading Banner"
          className="rounded-lg shadow-lg group-hover:opacity-90 transition-opacity"
        />
      </a>
    </div>
  </div>
</aside>
        </div>
      </main>
    </div>
  );
}