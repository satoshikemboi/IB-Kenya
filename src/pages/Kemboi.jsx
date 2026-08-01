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
  location: "Nairobi, Kenya", // TODO: confirm or remove
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
    linkedin: "#", // TODO: add real LinkedIn URL
    twitter: "#",  // TODO: add real X/Twitter URL
    email: "mailto:satoshikemboi@gmail.com", // TODO: real contact email
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
    // TODO: add more reviews Felix has authored
  ],
};

/* SEO meta — update the domain before publishing */
const siteUrl = "https://fxbrokers.co.ke";
const pageUrl = `${siteUrl}/felix-kemboi`;

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function Avatar() {
  const initials = author.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="w-36 h-40 rounded-full overflow-hidden bg-white/4 border border-white/8 shrink-0 flex items-center justify-center">
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

function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-1.5 rounded-full border border-white/10 bg-white/2 text-xs font-medium text-zinc-300 no-underline hover:border-green-500/30 hover:text-green-400 transition-colors"
    >
      {label}
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
      sameAs: [author.social.linkedin, author.social.twitter].filter(
        (url) => url && url !== "#"
      ),
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
          <div className="flex items-center gap-2 text-[0.7rem] text-zinc-600 mb-6">
            <Link to="/" className="hover:text-zinc-400 transition-colors no-underline">Home</Link>
            <span>›</span>
            <Link to="/authors" className="hover:text-zinc-400 transition-colors no-underline">Authors</Link>
            <span>›</span>
            <span className="text-zinc-400">{author.name}</span>
          </div>

          <div className="flex items-start gap-6 flex-wrap">
            <Avatar />

            <div className="flex-1 min-w-0">
              <h1 className="font-playfair text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-zinc-50 mb-1">
                {author.name}
              </h1>
              <p className="text-green-400 text-sm font-medium mb-3">{author.title}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.78rem] text-zinc-500 mb-5">
                <span>Experience: <span className="text-zinc-300">{author.yearsExperience}</span></span>
                {author.location && (
                  <span>Based in: <span className="text-zinc-300">{author.location}</span></span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <SocialLink href={author.social.linkedin} label="LinkedIn" />
                <SocialLink href={author.social.twitter} label="X / Twitter" />
                <SocialLink href={author.social.email} label="Email" />
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
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Articles ── */}
        <section>
          <SectionTitle>Reviews by {author.name}</SectionTitle>
          <div className="flex flex-col gap-3">
            {author.articles.map((a, i) => (
              <Link
                key={i}
                to={a.href}
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/6 bg-white/2 hover:border-green-500/20 transition-all duration-200 no-underline"
              >
                <span className="text-sm font-medium text-zinc-100">{a.title}</span>
                <span className="text-zinc-600 text-xs">→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}