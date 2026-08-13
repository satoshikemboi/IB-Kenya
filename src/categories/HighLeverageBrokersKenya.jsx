import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Author from "../components/Author";

/* ---------------------------------------------------------
   Links
--------------------------------------------------------- */
const LINKS = {
  fxpesa: "https://portal.fxpesa.com/live-account/?accountType=Standard&clickid=1403263",
  exness: "https://one.exnessonelink.com/a/ggaswwew8a",
  exnessBanner: "https://one.exnessonelink.com/intl/en/a/ggaswwew8a",
  hfm: "https://register.hfm.com/ke/en/new-live-account/?refid=30515020",
  xm: "https://affs.click/MbQNk",
  justmarkets: "https://one.justmarkets.link/a/17thm0lpq8",
  justmarketsBanner1: "https://one.justmarkets.link/a/17thm0lpq8/landing/global-trusted-broker?promo=5040",
  justmarketsBanner2: "https://one.justmarkets.link/a/17thm0lpq8/?promo=4005",
  fbs: "https://fbs.partners?ibl=876040&ibp=35444511",
  fxpro: "https://direct-fxpro.com/en/partner/2xPncqjwh",
  fpmarkets: "https://portal.fpmarkets.com/int-EN/register?fpm-affiliate-utm-source=IB&fpm-affiliate-agt=66167",
  deriv: "https://track.deriv.com/_QstxbfW082hZl7VyVw174GNd7ZgqdRLk/1/",
  fusionmarkets: "https://fusionmarkets.com/?refcode=111166",
};

// Real logo files from /public
const LOGOS = {
  fxpesa: "/fxpesa.png",
  exness: "/exness.png",
  hfm: "/hfm.png",
  xm: "/xm.png",
  justmarkets: "/justmarkets.png",
  fbs: "/fbs.png",
  fxpro: "/fxpro.png",
  fpmarkets: "/fpmarkets.png",
  deriv: "/deriv.png",
  fusionmarkets: "/fusion.png",
};

// Internal review page routes — adjust to match your actual review page paths/slugs
const REVIEWS = {
  fxpesa: "/brokers/fxpesa",
  exness: "/brokers/exness",
  hfm: "/brokers/hfm",
  xm: "/brokers/xm",
  justmarkets: "/brokers/justmarkets",
  fbs: "/brokers/fbs",
  deriv: "/brokers/deriv",
  fusionmarkets: "/brokers/fusion-markets",
  fxpro: "/brokers/fxpro",
  fpmarkets: "/brokers/fp-markets",
};

/* ---------------------------------------------------------
   Shared type / spacing tokens
--------------------------------------------------------- */
const cls = {
  h2: "mt-14 mb-4 font-['Fraunces',serif] text-[1.7rem] font-semibold leading-tight text-neutral-50",
  h3: "mb-3 mt-11 flex items-center gap-3 font-['Fraunces',serif] text-lg font-semibold text-neutral-50",
  p: "mb-5 text-[1.04rem] leading-[1.8] text-neutral-200",
  pTight: "mb-5 text-[0.95rem] leading-[1.7] text-neutral-400",
  th: "border-b border-amber-400 px-3 py-2.5 text-left text-[0.68rem] font-semibold uppercase tracking-wider text-emerald-400",
  td: "px-3 py-3 align-top text-neutral-200",
  tdNum: "px-3 py-3 align-top font-['IBM_Plex_Mono',monospace] text-neutral-100",
  tr: "border-b border-neutral-800/80 last:border-none",
  ul: "mb-5 list-disc space-y-1.5 pl-5 leading-[1.75] text-neutral-200 marker:text-amber-400",
  tag: "text-[0.68rem] font-['IBM_Plex_Mono',monospace] font-semibold uppercase tracking-wide",
};

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */

function LogoBadge({ src, alt }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-white/4">
      <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" />
    </div>
  );
}

function BrokerHeading({ logo, name, sub, tag, tagTone = "emerald" }) {
  return (
    <div className="mt-11 mb-3 flex items-start gap-3.5">
      {logo && <LogoBadge src={logo} alt={`${name} logo`} />}
      <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
        <div className="min-w-0">
          <h3 className="mt-0 font-['Fraunces',serif] text-lg font-semibold leading-snug text-neutral-50">
            {name}
          </h3>
          {sub && <p className="mt-0.5 text-[0.8rem] text-neutral-500">{sub}</p>}
        </div>
        {tag && (
          <span className={`${cls.tag} ${tagTone === "amber" ? "text-amber-400" : "text-emerald-400"}`}>
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}

function Cta({ href, label, reviewHref }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-linear-to-r from-amber-300 to-amber-400 px-4 py-2 text-sm font-semibold text-gray-800 no-underline transition-colors hover:bg-amber-400 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
      >
        {label} <ArrowUpRight size={14} />
      </a>
      {reviewHref && (
        <a
          href={reviewHref}
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 no-underline transition-colors hover:border-neutral-500 hover:text-neutral-50 focus-visible:outline-2 focus-visible:outline-neutral-500 focus-visible:outline-offset-2"
        >
          Read review
        </a>
      )}
    </div>
  );
}

function AdBanner({ href, src, alt, w, h, className = "" }) {
  return (
    <a
      target="_blank"
      rel="nofollow noopener noreferrer"
      href={href}
      className={`block overflow-hidden rounded-xl border border-neutral-800 transition-opacity hover:opacity-90 ${className}`}
    >
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="h-auto w-full" />
    </a>
  );
}

function FbsAdSlot({ src, scriptId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.src = src;
    script.id = scriptId;
    script.async = true;
    container.appendChild(script);
    return () => {
      container.innerHTML = "";
    };
  }, [src, scriptId]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-22.5 items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/50 text-xs text-neutral-500"
    >
      <span className="pointer-events-none">FBS banner loads here</span>
    </div>
  );
}

function FaqItem({ q, children }) {
  return (
    <details className="group border-t border-neutral-800 py-4 [&::-webkit-details-marker]:hidden marker:content-none">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-['Fraunces',serif] text-[1.02rem] font-semibold text-neutral-50">
        {q}
        <ChevronDown
          size={17}
          className="shrink-0 text-amber-400 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <p className="mb-0 mt-2.5 text-[0.95rem] leading-[1.7] text-neutral-400">{children}</p>
    </details>
  );
}

function VerifyStep({ n, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-400/40 font-['IBM_Plex_Mono',monospace] text-[0.8rem] font-semibold text-amber-400">
        {n}
      </span>
      <p className="mb-0 text-[1.02rem] leading-[1.75] text-neutral-200">
        <strong className="text-neutral-50">{title}</strong> {children}
      </p>
    </li>
  );
}

function Authorbyline({ author }) {
  if (!author) return null;
  return (
    <div className="mb-6 flex items-center gap-3">
      {author.avatar && (
        <img
          src={author.avatar}
          alt={author.name}
          className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
          loading="lazy"
        />
      )}
      <div className="min-w-0 text-sm leading-tight">
        <div className="font-medium text-neutral-200">
          {author.url ? (
            <a href={author.url} className="hover:text-amber-400 hover:underline">
              {author.name}
            </a>
          ) : (
            author.name
          )}
        </div>
        {author.title && <div className="mt-0.5 text-neutral-500">{author.title}</div>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */
export default function HighLeverageBrokersKenya() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setProgress(scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-full bg-neutral-950 font-['IBM_Plex_Sans',sans-serif] text-neutral-100">
      <Helmet>
        <title>High Leverage Forex Brokers in Kenya 2026 | CMA vs Offshore (Up to 1:3000)</title>
        <meta name="description" content="Compare high leverage forex brokers in Kenya: CMA-regulated brokers capped at 1:400 vs offshore brokers offering up to 1:3000. See which brokers fall into each category, M-Pesa support, and how to verify a license before you deposit." />
        <link rel="canonical" href="https://fxbrokers.co.ke/high-leverage-brokers-kenya" />

        <meta property="og:title" content="High Leverage Forex Brokers in Kenya | CMA-Regulated vs Offshore" />
        <meta property="og:description" content="CMA-licensed brokers cap leverage at 1:400. Offshore brokers like JustMarkets and FBS go up to 1:3000. Here's what you gain and lose with each." />
        <meta property="og:url" content="https://fxbrokers.co.ke/high-leverage-brokers-kenya" />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "High Leverage Forex Brokers in Kenya: CMA-Regulated vs Offshore Options",
            "description": "A breakdown of CMA-regulated brokers capped at 1:400 leverage and offshore brokers offering up to 1:3000 for Kenyan traders, including licensing, M-Pesa support, and risk considerations.",
            "author": {
              "@type": "Person",
              "name": "Felix Kemboi"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FxBrokers Kenya",
              "url": "https://fxbrokers.co.ke"
            },
            "datePublished": "2026-08-12",
            "dateModified": "2026-08-13",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://fxbrokers.co.ke/high-leverage-brokers-kenya"
            }
          }
        `}</script>
      </Helmet>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');`}</style>

      {/* progress bar */}
      <div className="sticky top-0 z-10 h-0.75 bg-neutral-800">
        <div
          className="relative h-full bg-amber-400 transition-[width] duration-75 ease-linear after:absolute after:right-0.75 after:top-1/2 after:h-1.75 after:w-1.75 after:-translate-y-1/2 after:rounded-full after:bg-amber-400 after:shadow-[0_0_0_3px_rgba(251,191,36,0.25)] motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="mx-auto max-w-170 px-6 pb-20 pt-12">
        {/* header */}
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-emerald-400">
          Kenya Forex Guide · Updated 2026
        </div>
        <h1 className="mb-4 mt-3 font-['Fraunces',serif] text-[clamp(2rem,5vw,2.9rem)] font-semibold leading-[1.1] text-neutral-50">
          High Leverage Forex Brokers in Kenya: CMA-Regulated vs Offshore Options
        </h1>
        <p className="mb-4 text-[1.1rem] leading-relaxed text-neutral-400">
          Kenyan traders chasing high leverage have two real paths, a CMA-licensed
          broker capped at 1:400, or an offshore broker offering anywhere from
          1:1000 to 1:3000+. Here's exactly which brokers fall into each camp,
          and what you give up by choosing one over the other.
        </p>

        <Author />

        <div className="mb-9 flex flex-wrap gap-x-3.5 gap-y-1 border-y border-neutral-800 py-3 text-[0.78rem] text-neutral-400">
          <span>9 min read</span>
          <span>·</span>
          <span>
            Contains affiliate links —{" "}
            <a href="#disclosure" className="text-emerald-400 hover:underline">
              see disclosure
            </a>
          </span>
        </div>

        <div className="mb-9">
          <AdBanner
            href={LINKS.justmarketsBanner2}
            src="https://justmarkets.com/uploads/promo_materials/jm-1200x628-leverage-3000-en.png"
            alt="JustMarkets"
            w={1200}
            h={628}
          />
        </div>

        <p className="mb-5 text-[1.04rem] leading-[1.8] text-neutral-200 first-letter:float-left first-letter:pr-2 first-letter:pt-1 first-letter:font-['Fraunces',serif] first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-amber-400">
          Kenyan traders looking for high leverage have two real paths: brokers
          licensed by the Capital Markets Authority (CMA), which cap retail
          leverage at 1:400, and offshore international brokers that accept
          Kenyan clients and offer leverage from 1:1000 up to 1:3000 or more.
          Neither path is automatically "better", it depends on how much you
          value local legal protection versus raw leverage.
        </p>
        <p className={cls.p}>
          This guide breaks down both categories, names the specific brokers
          operating in each, and explains the trade-offs so you can make an
          informed choice, because the broker offering the biggest number
          isn't always the one that keeps your money safest.
        </p>

        {/* TL;DR */}
        <div className="mb-9 mt-7 rounded-r-xl border-l-[3px] border-white/50 bg-neutral-900 p-5 text-[0.98rem] leading-[1.7] text-neutral-200">
          <p className="mb-0">
            <strong className="text-neutral-50">The quick answer:</strong> CMA-regulated
            brokers cap you at 1:400 but give you local dispute resolution, an
            investor compensation fund, and usually KES/M-Pesa accounts. Offshore
            brokers offer 1:1000–1:3000+ leverage but no CMA recourse if
            something goes wrong. For most retail traders, 1:400 is already
            more leverage than is wise to use, the bigger decision is
            regulation, not the headline number.
          </p>
        </div>

        <h2 className={cls.h2}>How Leverage Actually Works Under Kenyan Regulation</h2>
        <p className={cls.p}>
          The CMA licenses online forex brokers under the Capital Markets
          (Online Foreign Exchange Trading) Regulations, 2017. To operate
          legally as a non-dealing online forex broker serving Kenyan
          residents, a firm must hold a minimum of KES 50 million in capital,
          keep client funds in accounts segregated from company operating
          funds, provide negative balance protection, and cap retail leverage
          at 1:400 on major currency pairs, some instruments, like indices or
          metals, carry lower caps still.
        </p>
        <p className={cls.p}>
          That ceiling isn't arbitrary. It's meant to strike a balance: high
          enough that Kenyan brokers can compete with offshore alternatives,
          low enough to blunt the most catastrophic blow-ups. CMA-licensed
          brokers also participate in Kenya's Investor Compensation Fund and
          offer a formal dispute resolution channel if a broker becomes
          insolvent or acts in bad faith, protections that don't exist once
          you move your account to an offshore entity. Offshore brokers aren't
          illegal for Kenyans to use; you simply give up the CMA's oversight
          and any local escalation path.
        </p>

        {/* ============ CMA SECTION ============ */}
        <h2 className={cls.h2}>CMA-Regulated Brokers Offering Up to 1:400 Leverage</h2>
        <p className={cls.p}>
          These brokers hold an active CMA non-dealing online forex broker
          license, meaning their Kenyan entity is legally accountable to a
          local regulator.
        </p>

        <div className="mb-8 mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-[0.86rem]">
            <thead>
              <tr>
                <th className={cls.th}>Broker</th>
                <th className={cls.th}>CMA Entity</th>
                <th className={cls.th}>License No.</th>
                <th className={cls.th}>Max Leverage</th>
                <th className={cls.th}>M-Pesa</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["FXPesa", "EGM Securities Limited", "107", "1:400", "Yes"],
                ["Exness (KE)", "Exness (KE) Limited", "162", "1:400", "Yes"],
                ["Pepperstone Kenya", "Pepperstone Markets Kenya Ltd", "128", "1:400", "Yes"],
                ["Scope Markets Kenya", "SCFM Limited", "123", "1:400", "Yes"],
                ["HFM Kenya", "HFM Investments Limited", "155", "1:400", "Yes"],
                ["XM Kenya", "XM (Kenya) entity", "— (2026)", "1:400", "Yes"],
              ].map((row) => (
                <tr className={cls.tr} key={row[0]}>
                  <td className={cls.td}>{row[0]}</td>
                  <td className={cls.td}>{row[1]}</td>
                  <td className={cls.tdNum}>{row[2]}</td>
                  <td className={cls.tdNum}>{row[3]}</td>
                  <td className={cls.td}>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BrokerHeading logo={LOGOS.fxpesa} name="FXPesa (EGM Securities)" tag="CMA · 1:400" />
        <p className={cls.p}>
          FXPesa was Kenya's first CMA-licensed online forex broker and
          remains the most locally-built option, with a Nairobi head office,
          Standard and Premier accounts, and deposits via M-Pesa, Airtel
          Money, and EazzyPay. Leverage tops out at 1:400 on forex and metals,
          with a lower cap of around 1:200 on indices.
        </p>
        <Cta href={LINKS.fxpesa} label="Open a FXPesa account" reviewHref={REVIEWS.fxpesa} />

        <BrokerHeading logo={LOGOS.exness} name="Exness (KE) Limited" tag="CMA · 1:400" />
        <p className={cls.p}>
          Exness's Kenyan entity is capped at 1:400, same as every other CMA
          broker, despite Exness's global brand being associated with
          "unlimited leverage" marketing. That higher leverage exists only on
          Exness's offshore entities, and in practice Exness routes Kenyan
          residents to the CMA-regulated entity rather than the offshore one.
          If you sign up expecting unlimited leverage as a Kenyan resident,
          you won't get it here.
        </p>
        <Cta href={LINKS.exness} label="Open an Exness account" reviewHref={REVIEWS.exness} />

        <div className="mb-6">
          <AdBanner
            href={LINKS.exnessBanner}
            src="https://d3dpet1g0ty5ed.cloudfront.net/EN_GLOBAL_C1_EXT_C2_T1_PROMO_RISK_T2_PERFORMANCE_D-3-3_STATIC_1200x628.jpg"
            alt="Exness promotion"
            w={1200}
            h={628}
          />
        </div>

        <BrokerHeading logo="" name="Pepperstone Kenya" tag="CMA · 1:400" />
        <p className={cls.p}>
          Pepperstone Markets Kenya Limited brings a globally recognized
          ECN-style broker under CMA oversight, with tight spreads on its
          Razor account and platform choice across MT4, MT5, and cTrader.
          Leverage sits at 1:400 for forex and indices, dropping to around
          1:100 on metals and energy.
        </p>

        <BrokerHeading logo="" name="Scope Markets Kenya" tag="CMA · 1:400" />
        <p className={cls.p}>
          Scope Markets is notable for going beyond CFDs — Kenyan clients can
          also trade real shares listed on the Nairobi Securities Exchange
          (NSE) through a separate investment account, alongside standard
          1:400 leverage on its CFD accounts.
        </p>

        <BrokerHeading logo={LOGOS.hfm} name="HFM Kenya" sub="formerly HotForex" tag="CMA · 1:400" />
        <p className={cls.p}>
          HFM Investments Limited holds a CMA license and offers the familiar
          HFM account structure (Cent, Premium, Zero Spread, and others) with
          KES-denominated accounts. The 1:400 cap applies here; HFM's offshore
          entities in Seychelles and St. Vincent go much higher, but that's a
          separate legal entity outside CMA protection.
        </p>
        <Cta href={LINKS.hfm} label="Open a HFM account" reviewHref={REVIEWS.hfm} />

        <BrokerHeading logo={LOGOS.xm} name="XM Kenya" tag="CMA · 1:400" />
        <p className={cls.p}>
          XM secured a CMA license in early 2026, adding local regulatory
          oversight to a brand that previously served Kenyan clients only
          through offshore entities. Traders who want XM's platform and bonus
          structure can now do so under CMA protection rather than relying
          solely on XM's international regulators.
        </p>
        <Cta href={LINKS.xm} label="Open a XM account" reviewHref={REVIEWS.xm} />

        {/* ============ OFFSHORE SECTION ============ */}
        <h2 className={cls.h2}>Offshore Brokers Offering Higher Leverage</h2>
        <p className={cls.p}>
          These brokers accept Kenyan clients but are not licensed by the CMA.
          They operate under regulators in jurisdictions like Mauritius,
          Seychelles, Belize, or Australia — regimes with lighter leverage
          restrictions, and in some cases lighter enforcement than the CMA.
        </p>

        <div className="mb-2 mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-[0.86rem]">
            <thead>
              <tr>
                <th className={cls.th}>Broker</th>
                <th className={cls.th}>Regulator(s)</th>
                <th className={cls.th}>Max Leverage</th>
                <th className={cls.th}>CMA Licensed?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["JustMarkets", "FSC Mauritius, FSA Seychelles", "1:3000", "No"],
                ["FBS", "IFSC Belize, CySEC", "1:3000", "No"],
                ["RoboForex", "Offshore (IFSC/FSC)", "1:2000*", "No"],
                ["Deriv", "MFSA Malta, BVI FSC, FSA Seychelles", "1:1000", "No"],
                ["Fusion Markets", "ASIC Australia + offshore", "1:500", "No"],
                ["FxPro", "FCA, CySEC, FSCA, SCB (offshore entity)", "1:500", "No"],
                ["FP Markets (int'l)", "FSA Seychelles, FSC Mauritius", "1:500", "Separate CMA entity exists"],
              ].map((row) => (
                <tr className={cls.tr} key={row[0]}>
                  <td className={cls.td}>{row[0]}</td>
                  <td className={cls.td}>{row[1]}</td>
                  <td className={cls.tdNum}>{row[2]}</td>
                  <td className={cls.td}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="-mt-4 mb-7 text-[0.8rem] text-neutral-500">
          *RoboForex's 1:2000 applies only while account equity stays under
          roughly $10,000; it steps down to 1:1000 above that.
        </p>

        <BrokerHeading logo={LOGOS.justmarkets} name="JustMarkets" tag="Offshore · 1:3000" tagTone="amber" />
        <p className={cls.p}>
          JustMarkets advertises leverage up to 1:3000 and supports M-Pesa
          deposits, which makes it popular with Kenyan traders chasing maximum
          leverage on small accounts. It holds no CMA license, and its Kenyan
          clients are onboarded under a lighter-touch regulator (FSA
          Seychelles) rather than its CySEC-regulated European entity. Some
          independent review sites have flagged withdrawal complaints, so
          start small and read recent trader feedback before committing
          serious capital.
        </p>
        <Cta href={LINKS.justmarkets} label="Open a JustMarkets account" reviewHref={REVIEWS.justmarkets} />

        <div className="mb-6">
          <AdBanner
            href={LINKS.justmarketsBanner1}
            src="https://justmarkets.com/uploads/promo_materials/jm-banner-global-trusted-broker-en-1200x628.png"
            alt="JustMarkets — global trusted broker"
            w={1200}
            h={628}
          />
        </div>

        <BrokerHeading logo={LOGOS.fbs} name="FBS" tag="Offshore · 1:3000" tagTone="amber" />
        <p className={cls.p}>
          FBS is one of the highest-leverage options available to Kenyan
          traders, offering up to 1:3000 across its account types under its
          Belize (IFSC) and CySEC entities, with a minimum deposit as low as
          $1 and M-Pesa support. It carries no CMA license, and negative
          balance protection is offered to cushion, but not eliminate — the
          risk that comes with leverage this high.
        </p>
        <Cta href={LINKS.fbs} label="Open a FBS account" reviewHref={REVIEWS.fbs} />

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <FbsAdSlot
            scriptId="af2a648484ce369f12746976ab8d6bbe20663f35d532484329e2f194d27b9267"
            src="https://fbs.partners/banner/af2a648484ce369f12746976ab8d6bbe20663f35d532484329e2f194d27b9267/8007/script.js?ibp=35444511"
          />
          <FbsAdSlot
            scriptId="6bac06c2e2118ab2553a3e465b700a2c19b93a65430ea6b4752e0bb736525418"
            src="https://fbs.partners/banner/6bac06c2e2118ab2553a3e465b700a2c19b93a65430ea6b4752e0bb736525418/8091/script.js?ibp=35444511"
          />
        </div>

        <BrokerHeading logo="" name="RoboForex" tag="Offshore · 1:2000" tagTone="amber" />
        <p className={cls.p}>
          RoboForex offers leverage up to 1:2000 on Pro and Pro-Cent accounts,
          with a catch worth knowing: the increased leverage only applies
          while account equity stays under roughly $10,000. Cross that
          threshold and leverage automatically steps down to 1:1000. RoboForex
          operates under offshore regulation with no CMA presence and doesn't
          support KES-denominated accounts.
        </p>

        <BrokerHeading logo={LOGOS.deriv} name="Deriv" tag="Offshore · 1:1000" tagTone="amber" />
        <p className={cls.p}>
          Deriv is best known among Kenyan traders for synthetic indices,
          continuously-traded instruments that don't track live market hours,
          alongside standard forex offering leverage up to 1:1000 depending on
          the instrument and account. It's regulated across several offshore
          jurisdictions but holds no CMA license.
        </p>
        <Cta href={LINKS.deriv} label="Open a Deriv account" reviewHref={REVIEWS.deriv} />

        <div className={cls.h3}>
          <LogoBadge src={LOGOS.fusionmarkets} alt="Fusion Markets logo" />
          <LogoBadge src={LOGOS.fxpro} alt="FxPro logo" />
          Fusion Markets and FxPro
        </div>
        <p className={cls.p}>
          Both sit at the more conservative end of the offshore group, capping
          leverage around 1:500. Fusion Markets is known for very low spreads
          and Australian (ASIC) regulation alongside its offshore entity;
          FxPro is a long-standing, multi-regulated broker (FCA, CySEC, FSCA)
          whose higher leverage is only available through its offshore SCB
          entity. Neither holds a CMA license.
        </p>
        <div className="flex flex-wrap gap-3">
          <Cta href={LINKS.fusionmarkets} label="Open a Fusion Markets account" reviewHref={REVIEWS.fusionmarkets} />
          <Cta href={LINKS.fxpro} label="Open a FxPro account" reviewHref={REVIEWS.fxpro} />
        </div>

        <BrokerHeading logo={LOGOS.fpmarkets} name="FP Markets (international entity)" tag="Dual · CMA + Offshore" />
        <p className={cls.p}>
          FP Markets is a slightly unusual case, the brand actually holds a
          separate CMA license (No. 103) in Kenya, but its main international
          signup portal onboards through an offshore entity offering 1:500
          leverage rather than the CMA-capped one. Worth confirming which
          entity you land in during signup if local regulation matters to
          you.
        </p>
        <Cta href={LINKS.fpmarkets} label="Open a FP Markets account" reviewHref={REVIEWS.fpmarkets} />

        <h2 className={cls.h2}>The Real Risk Behind High Leverage</h2>
        <p className={cls.p}>
          Leverage multiplies your position size, not your skill. At 1:400, a
          $250 deposit controls a $100,000 position — a roughly 0.25% adverse
          move wipes out your entire deposit. At 1:2000 or higher, that
          threshold shrinks to a fraction of a percent, meaning ordinary daily
          volatility on a major currency pair can trigger a margin call before
          you've even had time to react.
        </p>
        <p className={cls.p}>
          Higher leverage doesn't increase your odds of winning a trade; it
          only increases how much a given price move costs or earns you. Most
          experienced traders — even on accounts that allow 1:1000 or 1:3000 —
          actually use a fraction of the leverage available, often in the
          1:10 to 1:50 range, and treat the higher number as available
          headroom rather than a default setting.
        </p>

        <h2 className={cls.h2}>CMA-Regulated or Offshore: Which Fits You?</h2>
        <p className="mb-2 text-[1.04rem] leading-[1.8] text-neutral-200">
          <strong className="text-neutral-50">Choose a CMA-regulated broker if:</strong>
        </p>
        <ul className={cls.ul}>
          <li>You want a formal channel to escalate disputes and access Kenya's Investor Compensation Fund</li>
          <li>You prefer KES-denominated accounts and M-Pesa deposits/withdrawals without conversion friction</li>
          <li>1:400 is enough leverage for your trading style — for most retail traders, it is</li>
        </ul>
        <p className="mb-2 text-[1.04rem] leading-[1.8] text-neutral-200">
          <strong className="text-neutral-50">Consider an offshore broker if:</strong>
        </p>
        <ul className={cls.ul}>
          <li>You've researched the specific regulator involved and understand you have no CMA recourse</li>
          <li>You're trading with capital you can fully afford to lose</li>
          <li>You have a specific strategy that genuinely benefits from leverage above 1:400</li>
        </ul>

        <h2 className={cls.h2}>How to Verify a Broker Before You Deposit</h2>
        <ul className="mb-5 space-y-4 pl-0">
          <VerifyStep n={1} title="Check the CMA register directly.">
            Search the firm's name on cma.or.ke to confirm an active, current
            license rather than trusting a website claim.
          </VerifyStep>
          <VerifyStep n={2} title="Match the entity, not just the brand.">
            A recognizable name like Exness or HFM operates multiple legal
            entities — confirm which one you're actually signing up with.
          </VerifyStep>
          <VerifyStep n={3} title="Read recent reviews, not old ones.">
            Regulatory status and withdrawal reliability can change year to
            year.
          </VerifyStep>
          <VerifyStep n={4} title="Start small.">
            Test deposits and withdrawals with an amount you're comfortable
            losing before committing significant capital.
          </VerifyStep>
        </ul>

        <h2 className={cls.h2}>FAQs</h2>
        <div>
          <FaqItem q="Is high leverage forex trading legal in Kenya?">
            Yes. Forex trading is legal in Kenya through either a CMA-licensed
            broker or an internationally regulated offshore broker that
            accepts Kenyan clients. Only the broker's licensing status
            changes, not the legality of trading itself.
          </FaqItem>
          <FaqItem q="What is the maximum leverage a CMA-licensed broker can offer?">
            1:400 for retail clients on major forex pairs, under the CMA's
            2017 online forex trading regulations. Some instruments, like
            indices or metals, carry a lower cap.
          </FaqItem>
          <FaqItem q="Can I get unlimited leverage in Kenya?">
            Only through an offshore entity of a broker like Exness, and
            typically only on accounts with relatively low equity — and in
            practice, Kenyan residents are often routed to the CMA-capped
            entity instead. No CMA-licensed Kenyan entity currently offers
            unlimited leverage.
          </FaqItem>
          <FaqItem q="Is it safer to use a CMA-regulated broker or an offshore one?">
            CMA regulation gives you local legal recourse, fund segregation
            requirements, and access to Kenya's Investor Compensation Fund.
            Offshore brokers may be legitimately regulated elsewhere, but you
            lose that local protection layer entirely.
          </FaqItem>
          <FaqItem q="Do offshore brokers accept M-Pesa?">
            Several do — JustMarkets, FBS, and Deriv among them — but
            KES-denominated accounts are less common offshore, so currency
            conversion costs can apply.
          </FaqItem>
          <FaqItem q="Why does the same broker show different leverage in different places?">
            Because global brands like Exness, HFM, and FP Markets run
            separate legal entities in different jurisdictions. The
            CMA-licensed Kenyan entity is capped at 1:400; a separate offshore
            entity of the same brand can offer far higher leverage but sits
            outside CMA oversight — and isn't always reachable from a Kenyan
            IP in the first place.
          </FaqItem>
        </div>

        <h2 className={cls.h2}>Bottom Line</h2>
        <p className={cls.p}>
          High leverage is available to Kenyan traders either way — the real
          decision is how much regulatory protection you're willing to trade
          for it. CMA-regulated brokers like FXPesa, Exness (KE), Pepperstone
          Kenya, Scope Markets, HFM Kenya, and XM Kenya cap you at 1:400 but
          keep you inside a system with local recourse. Offshore brokers like
          JustMarkets, FBS, RoboForex, Deriv, Fusion Markets, and FxPro offer
          far higher numbers, but you're relying entirely on foreign
          regulators — or in some cases, very limited oversight — if something
          goes wrong.
        </p>

        <div id="disclosure" className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-[0.78rem] leading-[1.65] text-neutral-400">
          <strong className="text-neutral-100">Disclosure &amp; risk warning:</strong> This
          article is for informational purposes only and isn't financial
          advice. Forex and CFD trading carries a high risk of loss, and
          leverage magnifies that risk — verify any broker's current license
          status directly with the CMA (cma.or.ke) before depositing funds.
          This page contains affiliate links; we may earn a commission if you
          open an account through them, at no extra cost to you. That
          relationship doesn't change which brokers we describe as
          CMA-regulated versus offshore, or the leverage figures reported
          above.
        </div>
      </article>
    </div>
  );
}