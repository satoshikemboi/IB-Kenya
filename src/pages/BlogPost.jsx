import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ForexGuides from "../components/ForexGuides";
import { blogPosts } from "../data/blogData";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "rgba(201,168,76,0.15)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "#C9A84C",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

function ShareBar({ title }) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "40px",
      }}
    >
      <span style={{ color: "#6b7280", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
        Share
      </span>
      {[
        {
          label: "Twitter / X",
          href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
          icon: (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
        },
        {
          label: "WhatsApp",
          href: `https://wa.me/?text=${text}%20${url}`,
          icon: (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          ),
        },
        {
          label: "Copy link",
          href: null,
          icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          ),
          onClick: () => navigator.clipboard?.writeText(window.location.href),
        },
      ].map((btn) =>
        btn.href ? (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            title={btn.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#9ca3af",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.15)";
              e.currentTarget.style.color = "#C9A84C";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#9ca3af";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {btn.icon}
          </a>
        ) : (
          <button
            key={btn.label}
            onClick={btn.onClick}
            title={btn.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#9ca3af",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.15)";
              e.currentTarget.style.color = "#C9A84C";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#9ca3af";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {btn.icon}
          </button>
        )
      )}
    </div>
  );
}

function RelatedPosts({ current, all }) {
  const related = all
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section style={{ marginTop: "72px" }}>
      <h2
        style={{
          color: "#fff",
          fontSize: "18px",
          fontWeight: 700,
          marginBottom: "24px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        More in{" "}
        <span style={{ color: "#C9A84C" }}>{current.category}</span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {related.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article
              style={{
                background: "#0d1e35",
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: "14px",
                overflow: "hidden",
                transition: "transform 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)";
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "100%", height: "140px", objectFit: "cover", opacity: 0.8 }}
              />
              <div style={{ padding: "16px" }}>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    margin: "0 0 8px",
                  }}
                >
                  {p.title}
                </p>
                <span style={{ color: "#C9A84C", fontSize: "12px", fontWeight: 500 }}>
                  {p.readTime}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BrokerOrderedList({ affiliateLinks }) {
  if (!affiliateLinks) return null;

  // Define the display order and descriptions
  const brokers = [
    { id: "Exness", text: "Exness - best for beginners" },
    { id: "XM", text: "XM - Low minimum deposits" },
    { id: "JustMarkets", text: "JustMarkets - high leverage" },
    { id: "HFM", text: "HFM - M-Pesa deposits" },
    { id: "FxPro", text: "FxPro - tight spreads" },
    { id: "FBS", text: "FBS - great bonuses" },
    { id: "FPMarkets", text: "FP Markets - advanced platforms" },
    { id: "Deriv", text: "Deriv - versatile assets" },
    { id: "FusionMarkets", text: "Fusion Markets - low commissions" },
    { id: "FxPesa", text: "FxPesa - local Kenyan broker" },
  ];

  return (
    <ol style={{ paddingLeft: "20px", color: "#9ca3af", marginBottom: "32px" }}>
      {brokers.map((b) => {
        const link = affiliateLinks[b.id];
        // Only show brokers that are actually in this post's affiliateLinks object
        if (!link) return null;

        const [name, description] = b.text.split(" - ");

        return (
          <li key={b.id} style={{ marginBottom: "12px", fontSize: "16px" }}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#C9A84C",
                fontWeight: 700,
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,168,76,0.2)",
              }}
              onMouseEnter={(e) => (e.target.style.borderBottom = "1px solid #C9A84C")}
              onMouseLeave={(e) => (e.target.style.borderBottom = "1px solid rgba(201,168,76,0.2)")}
            >
              {name}
            </a>
            {description && <span> — {description}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post)
    return (
      <div
        style={{
          background: "#07101E",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: "16px",
        }}
      >
        Article not found.
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{post.title} | FxBrokers Kenya</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <ReadingProgress />

      <div
        style={{
          background: "#07101E",
          minHeight: "100vh",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Hero image — full bleed with overlay */}
        <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
          {/* Dark overlay fading to page bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(7,16,30,0.4) 0%, rgba(7,16,30,0.7) 60%, #07101E 100%)",
            }}
          />

          {/* Back link inside hero */}
          <div
            style={{
              position: "absolute",
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "780px",
              padding: "0 24px",
            }}
          >
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#C9A84C",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                background: "rgba(7,16,30,0.6)",
                border: "1px solid rgba(201,168,76,0.25)",
                padding: "7px 14px",
                borderRadius: "8px",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Category + title overlaid on hero bottom */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "780px",
              padding: "0 24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span
                style={{
                  background: "#C9A84C",
                  color: "#07101E",
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                {post.readTime}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.15,
                margin: 0,
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              {post.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <article
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "0 24px 80px",
          }}
        >
          {/* Author meta strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              padding: "20px 0",
              marginBottom: "40px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Author avatar initials */}
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#C9A84C",
                  flexShrink: 0,
                }}
              >
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p style={{ color: "#fff", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                  {post.author}
                </p>
                <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>
                  {post.authorRole}
                </p>
              </div>
            </div>
            <div style={{ color: "#6b7280", fontSize: "13px" }}>
              {formatDate(post.date)}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "#C9A84C",
                  letterSpacing: "0.3px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share bar */}
          <ShareBar title={post.title} />

          {/* Lead / excerpt */}
<p style={{ fontSize: "19px", color: "#d1d5db", lineHeight: 1.75 }}>
{post.excerptParts.map((part, index) => (
  part.link ? (
    <a 
      key={index} 
      href={part.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ color: "#C9A84C", fontWeight: "700" }}
    >
      {part.text}
    </a>
  ) : (
    <span key={index}>{part.text}</span>
  )
))}
</p>

      {/*---------------- Youtube video after lead ------------------------*/}

          {/* Body content */}
          <div
            style={{
              color: "#9ca3af",
              fontSize: "16px",
              lineHeight: 1.85,
            }}
          >
            <p style={{ marginBottom: "24px", paddingTop: "24px" }}>
              Forex trading in Kenya has seen an explosion in popularity over the last few
              years, largely due to the accessibility provided by M-Pesa and local regulation
              by the Capital Markets Authority (CMA).
            </p>

            {/* Pull quote example */}
            <blockquote
              style={{
                margin: "36px 0",
                padding: "24px 28px",
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.18)",
                borderLeft: "4px solid #C9A84C",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontFamily: "'DM Serif Display', serif",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                "A CMA-regulated broker ensures your funds are protected in segregated
                accounts — it's the single most important factor for Kenyan traders."
              </p>
            </blockquote>

            <h2
  style={{
    color: "#fff",
    fontSize: "22px",
    fontWeight: 700,
    marginTop: "44px",
    marginBottom: "16px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  }}
>
  Top Recommended Brokers for Kenyan Traders
</h2>

{/* RENDER THE ORDERED LIST IF MULTIPLE LINKS EXIST */}
{post.affiliateLinks && Object.keys(post.affiliateLinks).length > 1 && (
  <BrokerOrderedList affiliateLinks={post.affiliateLinks} />
)}

{/* RENDER A BUTTON IF ONLY ONE LINK EXISTS (For Review Pages) */}
{post.affiliateLinks && Object.keys(post.affiliateLinks).length === 1 && (
  <div style={{ margin: "32px 0" }}>
    <a
      href={Object.values(post.affiliateLinks)[0]}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        background: "#C9A84C",
        color: "#07101E",
        padding: "14px 28px",
        borderRadius: "8px",
        fontWeight: 800,
        fontSize: "14px",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
    >
      Start Trading with {Object.keys(post.affiliateLinks)[0]}
    </a>
  </div>
)}
    
            <ForexGuides/>
            <h2
              style={{
                color: "#fff",
                fontSize: "22px",
                fontWeight: 700,
                marginTop: "44px",
                marginBottom: "16px",
                paddingBottom: "10px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Why Regulation Matters
            </h2>
            <p style={{ marginBottom: "24px" }}>
              When choosing a broker in Kenya, the first thing you should check is their CMA
              status. A regulated broker ensures that your funds are kept in segregated
              accounts, away from the broker's operational money, giving you legal recourse
              if anything goes wrong.
            </p>

            {/* Info callout box */}
            <div
              style={{
                background: "rgba(14,36,64,0.8)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "28px",
              }}
            >
              <p
                style={{
                  color: "#C9A84C",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Quick Tip
              </p>
              <p style={{ color: "#d1d5db", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                You can verify any broker's CMA licence directly on the{" "}
                <a
                  href="https://www.cma.or.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C9A84C", textDecoration: "underline" }}
                >
                  Capital Markets Authority website
                </a>
                . Always do this before depositing funds.
              </p>
            </div>
          </div>

          {/* Related posts */}
          <RelatedPosts current={post} all={blogPosts} />
        </article>
      </div>
    </>
  );
}