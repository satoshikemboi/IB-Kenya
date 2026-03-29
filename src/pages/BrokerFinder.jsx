import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const QUESTIONS = [
  {
    id: "experience",
    question: "What is your trading experience?",
    options: [
      { label: "Complete Beginner", value: "beginner"},
      { label: "Some Experience", value: "intermediate"},
      { label: "Experienced Trader", value: "advanced" },
    ],
  },
  {
    id: "deposit",
    question: "How much are you looking to deposit?",
    options: [
      { label: "Under $50", value: "micro" },
      { label: "$50 – $500", value: "small" },
      { label: "Over $500", value: "large" },
    ],
  },
  {
    id: "payment",
    question: "How will you fund your account?",
    options: [
      { label: "M-Pesa", value: "mpesa"},
      { label: "Bank Transfer", value: "bank"},
      { label: "Card / e-Wallet", value: "card" },
    ],
  },
  {
    id: "style",
    question: "What best describes your trading style?",
    options: [
      { label: "Long-term / Swing", value: "swing"},
      { label: "Day Trading", value: "day"},
      { label: "Scalping", value: "scalp"},
    ],
  },
];

const RESULTS = {
  beginner_mpesa: { slug: "xm", name: "XM Group", reason: "Lowest minimum deposit ($5), M-Pesa support, and excellent educational resources make XM ideal for beginners.", link: "https://affs.click/MbQNk" },
  beginner_default: { slug: "hfm", name: "HFM", reason: "Fast Execution, free demo account, and 24/7 support are perfect for new traders.", link: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020" },
  micro_mpesa: { slug: "fbs", name: "FBS", reason: "FBS accepts deposits as low as $1 and supports M-Pesa, making it the most accessible option.", link: "https://fbs.partners?ibl=876040&ibp=35444511" },
  micro_default: { slug: "fbs", name: "FBS", reason: "FBS's $1 minimum deposit is the lowest available, ideal for traders starting small.", link: "https://fbs.partners?ibl=876040&ibp=35444511" },
  scalp_default: { slug: "exness", name: "Exness", reason: "Exness offers 0.0 pip spreads and instant execution — perfect conditions for scalpers.", link: "https://one.exnessonelink.com/a/1sh0vxrgqd" },
  advanced_large: { slug: "justmarkets", name: "JustMarkets", reason: "JustMarkets' raw spread ECN accounts and deep liquidity suit experienced traders with larger capital.", link: "https://one.justmarkets.link/a/17thm0lpq8" },
  default: { slug: "exness", name: "Exness", reason: "Exness is our top overall pick: M-Pesa support, 0.0 pip spreads, and instant withdrawals.", link: "https://one.exnessonelink.com/a/1sh0vxrgqd" },
};

function pickResult(answers) {
  const { experience, deposit, payment, style } = answers;
  if (style === "scalp") return RESULTS.scalp_default;
  if (experience === "beginner" && payment === "mpesa") return RESULTS.beginner_mpesa;
  if (experience === "beginner") return RESULTS.beginner_default;
  if (deposit === "micro" && payment === "mpesa") return RESULTS.micro_mpesa;
  if (deposit === "micro") return RESULTS.micro_default;
  if (experience === "advanced" && deposit === "large") return RESULTS.advanced_large;
  return RESULTS.default;
}

export default function BrokerFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const current = QUESTIONS[step];
  // Fixed progress calculation to show 0% on start and 100% on last question
  const progress = (step / (QUESTIONS.length - 1)) * 100;

  function handleAnswer(value) {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setResult(pickResult(updated));
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  return (
    <>
      <Helmet>
        <title>Broker Finder — Find the Best Forex Broker for You | FxBrokers.co.ke</title>
        <meta name="description" content="Answer 4 quick questions and we'll match you with the best forex broker for your experience level in Kenya." />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {!result ? (
            <div className="bg-[#0D1B2E] border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                  <span>Step {step + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C9A84C] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-6 text-center">{current.question}</h2>

              <div className="flex flex-col gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 text-white text-left px-5 py-4 rounded-xl transition-all group"
                  >
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>
                    <span className="font-medium text-sm group-hover:text-[#C9A84C]">{opt.label}</span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-6 text-gray-500 hover:text-white text-xs w-full text-center">
                  ← Previous Question
                </button>
              )}
            </div>
          ) : (
            <div className="bg-[#0D1B2E] border border-white/10 rounded-2xl p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Recommended for you</p>
              <h2 className="text-3xl font-bold text-white mb-4">{result.name}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">{result.reason}</p>

              <div className="flex flex-col gap-3">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block bg-[#C9A84C] hover:bg-[#D4B762] text-[#07101E] font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Visit {result.name} Website →
                </a>
                <Link
                  to={`/brokers/${result.slug}`}
                  className="block border border-white/10 hover:bg-white/5 text-gray-300 text-sm py-3.5 rounded-xl transition-all"
                >
                  Read Full Review
                </Link>
                <button onClick={reset} className="text-gray-600 hover:text-gray-400 text-xs mt-4 underline underline-offset-4">
                  Start Quiz Over
                </button>
              </div>

              <p className="text-gray-700 text-[9px] mt-8 leading-tight uppercase tracking-tight">
                Trading involves risk. We may receive a commission if you sign up through our links.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}