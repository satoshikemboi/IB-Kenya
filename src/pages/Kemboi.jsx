import { Link } from "react-router-dom";
import { useEffect } from "react";

/* ── Author data ──────────────────────────────────────────────────────────
   Update `bio`, `credentials`, `social`, and `articles` with real details
   as they become available (education, specific certifications, notable
   past roles, etc). The placeholders below only use facts you've confirmed
   (name, title, years of experience) — everything else is generic framing
   you should personalize before publishing.                            ── */
const author = {
  name: "Felix Kemboi",
  title: "Senior Forex Analyst",
  photo: "/kemboi.png",
  yearsExperience: "3+ years",
  location: "Nairobi, Kenya",
  bio: [
    "Felix Kemboi is a Senior Forex Analyst with 3+ years of hands-on trading experience across major and exotic currency pairs.",
    "He focuses on evaluating broker regulation, spreads, execution quality and withdrawal reliability, helping traders across Africa cut through marketing claims and choose platforms they can actually trust.",
  ],
  credentials: [
    "3+ years of active forex trading experience",
    "Specializes in broker regulation & licensing analysis",
    "Focus areas: spreads, execution quality, deposit/withdrawal reliability",
  ],
  social: {
    linkedin: "www.linkedin.com/in/felix-kemboi-33b757369",
    tiktok: "https://www.tiktok.com/@_.kemboi._?_r=1&_t=ZS-98WOAD4OYs5",
    instagram: "https://www.instagram.com/_.kemboi._?igsh=MWdrY250Zms2anIx",
    email: "mailto:satoshikemboi@gmail.com",
  },
  articles: [
    { title: "Exness Review", href: "/brokers/exness" },
    { title: "JustMarkets Review", href: "/brokers/justmarkets" },
    { title: "HFM Review", href: "/brokers/hfm" },
    { title: "XM Review", href: "/brokers/xm" },
    { title: "FxPro Review", href: "/brokers/fxpro" },
    { title: "FBS Review", href: "/brokers/fbs" },
    { title: "FxPesa Review", href: "/brokers/fxpesa" },
    { title: "FP Markets Review", href: "/brokers/fpmarkets" },
    { title: "Deriv Review", href: "/brokers/deriv" },
    { title: "Fusion Markets Review", href: "/brokers/fusion-markets" },
  ],
};

/* SEO meta — update the domain before publishing */
const siteUrl = "https://fxbrokers.co.ke";
const pageUrl = `${siteUrl}/felix-kemboi`;

/* ── URL helper ───────────────────────────────────────────────────────────
   Fixes links like "www.linkedin.com/..." which the browser would otherwise
   treat as a relative path (e.g. /felix-kemboi/www.linkedin.com/...) instead
   of navigating out to LinkedIn. mailto: links are left untouched.        ── */
function normalizeUrl(url) {
  if (!url) return "#";
  if (url.startsWith("mailto:") || url.startsWith("tel:")) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

/* ── Icons (inline, single-color, inherit currentColor) ──────────────────── */
function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.83v1.98h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V23h-4v-6.75c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.59 1.76-2.59 3.56V23h-4V8.5z" />
    </svg>
  );
}

function IconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.9-.78-1.44-1.9-1.5-3.14h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3s-1.88.09-3.25-1.48h.44z" />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12.5 9.5 18 20 6" />
    </svg>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function Avatar() {
  const initials = author.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="relative shrink-0">
      <div className="absolute -inset-2 rounded-full bg-green-500/10 blur-xl" aria-hidden="true" />
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-white/4 ring-1 ring-white/10 ring-offset-4 ring-offset-[#0d1117] shrink-0 flex items-center justify-center">
        <img
          src={author.photo}
          alt={author.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = `<span style="font-size:2rem;font-weight:700;color:#4ade80">${initials}</span>`;
          }}
        />
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-6">
      <h2 className="font-playfair text-xl font-semibold text-zinc-50 mb-2">{children}</h2>
      <div className="w-8 h-0.5 bg-green-500 rounded-full" />
    </div>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  const url = normalizeUrl(href);
  const isMail = url.startsWith("mailto:");
  return (
    <a
      href={url}
      {...(!isMail && { target: "_blank", rel: "noopener noreferrer" })}
      title={label}
      aria-label={label}
      className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/2 text-zinc-400 no-underline transition-all duration-200 hover:border-green-500/40 hover:bg-green-500/5 hover:text-green-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Icon className="w-[18px] h-[18px]" />
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[0.65rem] font-medium text-zinc-200 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

/* ── SEO: inject meta tags + Person structured data ──────────────────────── */
function useAuthorSeo() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${author.name} — ${author.title} | YourSiteName`;

    const description = `${author.name} is a ${author.title.toLowerCase()} with ${author.yearsExperience} of trading experience, covering broker reviews, spreads and regulation.`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const createdMeta = !metaDesc;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    const prevDescContent = metaDesc.content;
    metaDesc.content = description;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      description,
      image: `${siteUrl}${author.photo}`,
      url: pageUrl,
      sameAs: [author.social.linkedin, author.social.tiktok, author.social.instagram]
        .filter(Boolean)
        .map(normalizeUrl),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (createdMeta) {
        metaDesc.remove();
      } else {
        metaDesc.content = prevDescContent;
      }
      document.head.removeChild(script);
    };
  }, []);
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function Kemboi() {
  useAuthorSeo();

  return (
    <div className="bg-[#080c0e] text-zinc-300 min-h-screen font-dm">

      {/* ── Hero ── */}
      <div className="border-b border-white/6 bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-[5vw] py-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.7rem] text-zinc-600 mb-8">
            <Link to="/" className="hover:text-zinc-400 transition-colors no-underline">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/authors" className="hover:text-zinc-400 transition-colors no-underline">Authors</Link>
            <span aria-hidden="true">›</span>
            <span className="text-zinc-400">{author.name}</span>
          </nav>

          <div className="flex items-start gap-7 flex-wrap sm:flex-nowrap">
            <Avatar />

            <div className="flex-1 min-w-0">
              <h1 className="font-playfair text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-zinc-50 mb-1 leading-tight">
                {author.name}
              </h1>
              <p className="text-green-400 text-sm font-medium mb-4">{author.title}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[0.78rem] text-zinc-500 mb-6">
                <span>Experience: <span className="text-zinc-300">{author.yearsExperience}</span></span>
                {author.location && (
                  <span>Based in: <span className="text-zinc-300">{author.location}</span></span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <SocialLink href={author.social.linkedin} label="LinkedIn" icon={IconLinkedIn} />
                <SocialLink href={author.social.tiktok} label="TikTok" icon={IconTikTok} />
                <SocialLink href={author.social.instagram} label="Instagram" icon={IconInstagram} />
                <SocialLink href={author.social.email} label="Email" icon={IconMail} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-[5vw] py-12 flex flex-col gap-14">

        {/* ── About ── */}
        <section>
          <SectionTitle>About {author.name}</SectionTitle>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-400">
            {author.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ── Credentials ── */}
        <section>
          <SectionTitle>Expertise</SectionTitle>
          <ul className="flex flex-col gap-3">
            {author.credentials.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/10 text-green-400 shrink-0 mt-0.5">
                  <IconCheck className="w-3 h-3" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Articles ── */}
        <section>
          <SectionTitle>Reviews by {author.name}</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {author.articles.map((a, i) => (
              <Link
                key={i}
                to={a.href}
                className="group flex items-center justify-between px-5 py-4 rounded-xl border border-white/6 bg-white/2 hover:border-green-500/20 hover:bg-white/3 transition-all duration-200 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
              >
                <span className="text-sm font-medium text-zinc-100">{a.title}</span>
                <span className="text-zinc-600 text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-green-400">→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}