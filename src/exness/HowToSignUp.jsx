import { useState } from "react";
import { Mail, Link2, Check, ShieldCheck } from "lucide-react";

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6v8h2.9Z" />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.3 2H21l-6.7 7.6L22.2 22h-6.9l-5.4-7-6.2 7H1l7.2-8.2L1.1 2h7l4.9 6.4L18.3 2Zm-1.2 18h1.9L7 4h-2l12.1 16Z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.5v6.3h-3.4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9V9Z" />
  </svg>
);

// Shared bullet list so every step list gets the same look with plain Tailwind utilities
// (no ::before pseudo-elements, since those can't be expressed as utility classes).
function BulletList({ items }) {
  return (
    <ul className="mb-5 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-300 sm:text-base">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HowToSignUp({
  reviewUrl = "./brokers/exness",
  pageUrl = "https://fxbrokers.co.ke/exness-sign-up-guide-kenya",
  pageTitle = "How to Sign Up for Exness in Kenya: Step-by-Step Guide (2026)",
  signupUrl = "https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd",
}) {

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(pageTitle);

  const faqs = [
    {
      q: "Is Exness legal in Kenya?",
      a: "Yes. Exness (KE) Limited is licensed by the Capital Markets Authority under licence No. 162, and Kenyan client funds are held in accounts segregated from Exness's own operating capital.",
    },
    {
      q: "How long does verification take?",
      a: "Usually about 20 mins once you submit clear, valid proof of identity and residence, though it can occasionally take uoto a day.",
    },
    {
      q: "What's the minimum deposit?",
      a: "It depends on the account type. Entry-level accounts can start from roughly $10 via M-Pesa; Pro-tier accounts usually need a minimum of $200. Check current limits in your Personal Area before depositing.",
    },
    {
      q: "Can I trade from my phone?",
      a: "Yes, MT4, MT5, and the Exness Terminal are all available as mobile apps.",
    },
  ];

  return (
    <div className="bg-neutral-950">
      <article className="mx-auto max-w-2xl px-4 pb-28 pt-8 text-neutral-100 sm:px-6 sm:pb-32 sm:pt-10">
        <span className="inline-block border-b-4 border-amber-400 pb-1 font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
          Broker Guides
        </span>

        <h1 className="mb-5 mt-4 font-serif text-2xl font-bold leading-tight text-white sm:text-4xl">
          How to Sign Up for Exness in Kenya: Step-by-Step Guide (2026)
        </h1>

        <a
          href={signupUrl}
          className="mb-5 block overflow-hidden rounded-lg border border-neutral-800"
        >
          <img
            src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Take_control_1200x628.png"
            width="1200"
            height="628"
            alt=""
            className="h-auto w-full"
          />
        </a>

        <div className="mb-5 flex flex-wrap gap-x-2 gap-y-1 border-y border-neutral-800 py-3 text-sm text-neutral-400">
          <span>
            By the <strong className="font-semibold text-neutral-100">FX Brokers KE</strong> Team
          </span>
          <span>· Updated August 2026</span>
          <span>· 7 min read</span>
        </div>

        <span className="mb-5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400 ring-1 ring-emerald-500/20">
          <ShieldCheck className="h-3 w-3" /> CMA licence No. 162
        </span>

        <p className="mb-5 text-base leading-relaxed text-neutral-300">
          Exness has grown into one of the world's largest multi-asset brokers by trading volume since it was
          founded in 2008 and it's one of the few international brokers with a locally licensed Kenyan
          entity. If you're still deciding whether it's the right broker for you, our{" "}
          <a
            href={reviewUrl}
            className="text-amber-400 underline decoration-amber-400/40 underline-offset-2 hover:text-amber-300"
          >
            full Exness review
          </a>{" "}
          covers spreads, fees, and platforms in detail. This guide walks through the practical part: getting
          registered, verified, funded, and trading.
        </p>

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          Is Exness Regulated in Kenya?
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-neutral-300 sm:text-base">
          Yes. Exness (KE) Limited operates under CMA licence No. 162 as a non-dealing online forex broker,
          meaning it can't take the other side of your trades. Kenyan client funds are held in segregated
          bank accounts, separate from Exness's own operating capital, and leverage on CMA-regulated accounts
          is capped in line with Kenyan rules treat "unlimited leverage" marketing elsewhere with caution,
          as it usually applies to Exness's offshore entity rather than the Kenyan one.
        </p>

        <h2 className="mb-4 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          How to Register and Open a Free Exness Account
        </h2>
        <a href="https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd">
          <img src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Take_control_990x250.png" width="990" height="250" alt="" />
        </a>
        <p className="mt-5 py-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
          Registering itself takes only a few minutes. Just follow these steps:
        </p>
        <BulletList
          items={[
            "Go to the Exness site or app, and enter your country of residence, email, and password.",
            "Your password should be 8–15 characters, mixing upper and lower case letters, numbers, and symbols.",
            "Confirm your email from the verification link Exness sends you.",
            "Your Personal Area opens with a free MT5 demo account preloaded with virtual funds which is useful for practising before risking real money.",
            'Select "Open Account," then choose your account type, base currency, and leverage.',
            "Give the account a nickname and set a trading password, separate from your login password.",
          ]}
        />

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          How to Verify Your Exness Account
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
          Kenyan regulation requires brokers to confirm who they're dealing with before you can deposit or
          trade. You'll need to submit two documents.
        </p>

        <h3 className="mb-2 mt-4 text-sm font-semibold text-neutral-100">Tips for your Proof of Identity (POI)</h3>
        <BulletList
          items={[
            "Use a national ID, passport, or driver's licence.",
            "Make sure all four corners of the document are visible.",
            "Submit the original document, no screenshots of the document image.",
            "The document should not be expired.",
          ]}
        />

        <h3 className="mb-2 mt-4 text-sm font-semibold text-neutral-100">Tips for your Proof of Residence (POR)</h3>
        <BulletList
          items={[
            "Use a recent utility bill or bank statement, issued by a recognised authority.",
            "Make sure your full name and current address are clearly visible.",
            "Accepted formats are PNG, JPEG, and PDF, up to 15MB per file.",
          ]}
        />

        <p className="mb-5 text-sm leading-relaxed text-neutral-300 sm:text-base">
          Verification is usually processed within a day, but an unverified account can't deposit or trade,
          so it's worth doing this immediately after registering. ( Exness recently added an automatic proof of residence by detecting the IP used on sign up)
        </p>

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          How to Make Your First Deposit (M-Pesa and More)
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
          This is where a Kenyan-licensed broker shows its advantage, Exness supports direct M-Pesa deposits.
        </p>
        <BulletList
          items={[
            'In your Personal Area, select "Deposit" and choose M-Pesa (or a card, e-wallet, or bank transfer).',
            "Select the trading account you're funding, enter the amount, and confirm.",
            "For M-Pesa, enter your Safaricom number and authorise the payment on your phone, funds typically land within seconds.",
            "Minimum deposits vary by account type: entry-level accounts can start around $10 (roughly KES 1,300), while Pro, Zero, and Raw Spread accounts often need closer to $200.",
          ]}
        />

        <div className="mb-5 mt-6 flex justify-center p-3">
        <a href="https://one.exnessonelink.com/intl/en/a/1sh0vxrgqd">
          <img src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Take_control_320x50.png" width="320" height="50" alt="" />
        </a>
        </div>

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          Choosing a Trading Platform
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
          Most new Kenyan traders start on MT5 or the Exness Terminal, since neither requires installing
          desktop software.
        </p>
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <h4 className="mb-1 font-mono text-xs font-semibold text-amber-400">MT4</h4>
            <p className="text-sm text-neutral-400">
              Requires download and installation. Best if you rely on MT4-specific indicators or expert
              advisors.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <h4 className="mb-1 font-mono text-xs font-semibold text-amber-400">MT5</h4>
            <p className="text-sm text-neutral-400">
              Browser-based, no install needed. More asset classes, timeframes, and order types.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <h4 className="mb-1 font-mono text-xs font-semibold text-amber-400">Exness Terminal</h4>
            <p className="text-sm text-neutral-400">
              Exness's own app. The simplest, most streamlined starting point for beginners.
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          How to Place Your First Trade
        </h2>
        <BulletList
          items={[
            'Right-click the trading window (or tap "New Order" on mobile) to open the order ticket.',
            "Select the instrument you want to trade from your Market Watch list.",
            "Choose market execution, or set a pending order to trigger at a price you choose.",
            "Enter your trade volume, start small while you're learning how margin and leverage work.",
            "Choose to buy or sell, then confirm, and set a stop-loss on every trade for risk management.",
          ]}
        />

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          How to Withdraw Your Funds
        </h2>
        <BulletList
          items={[
            'In your Personal Area, go to "Withdraw" and select your preferred payment method.',
            "Choose the trading account you're withdrawing from, then enter the currency and amount.",
            "Withdrawals return to the same method and name used to deposit, Exness doesn't pay out to a third party.",
            "Confirm with the one-time confirmation code sent to you either via mobile or email, in other cases Google authenticator app.",
          ]}
        />
        <p className="mb-5 text-sm leading-relaxed text-neutral-300 sm:text-base">
          Most e-wallet and M-Pesa withdrawals are processed automatically and can arrive in minutes, while
          bank transfers may take one to three business days.
        </p>

        <div className="my-6 rounded border-l-4 border-amber-400 bg-amber-500/10 p-4 text-sm leading-relaxed text-neutral-300">
          <strong className="text-amber-300">A note on risk:</strong> forex and CFD trading is leveraged, so
          both profits and losses are magnified relative to your deposit, it's possible to lose your full
          balance. Practise on the demo account first, and only trade with money you can afford to lose. This
          guide is educational, not financial advice.
        </div>

        <h2 className="mb-3 mt-8 font-serif text-xl font-semibold text-white sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="mb-6">
          {faqs.map((f) => (
            <div key={f.q} className="mb-4">
              <h3 className="mb-1 text-sm font-semibold text-neutral-100 sm:text-base">{f.q}</h3>
              <p className="text-sm text-neutral-400">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-400">
            Want spreads, fees, and our hands-on testing notes before you sign up?
          </p>
          <a
            href={reviewUrl}
            className="whitespace-nowrap rounded-full bg-amber-400 px-4 py-2 font-mono text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
          >
            Read the full review
          </a>
        </div>
      </article>

      

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <span className="hidden text-sm text-neutral-400 sm:block">
            Ready to get started? It only takes a few minutes.
          </span>
          <a
            href={signupUrl}
            className="w-full whitespace-nowrap rounded-full bg-amber-300 px-4 py-2.5 text-center text-lg font-semibold text-neutral-950 transition hover:bg-amber-300 sm:w-auto sm:py-2.5"
          >
            Create an Exness Account
          </a>
        </div>
      </div>
    </div>
  );
}