import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Brokers", href: "/brokers" },
  { label: "Categories", href: "/brokers/category" },
  { label: "Broker Finder", href: "/broker-finder" },
  { label: "Methodology", href: "/methodology" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050D1A]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
        style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
      >
        <nav className="sticky top-0 z-50 w-full bg-[#0a0f0c]/95 border-b border-white/6 backdrop-blur-md"
          aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="FxBrokers.co.ke Home"
          >
            {/* Icon mark */}
            <div className=" flex items-center justify-center shrink-0 group-hover:bg-amber-400/15 transition-colors duration-200">
              <img
                src="/fxbrokerskenya.png"
                alt=""
                aria-hidden="true"
                className="w-12 h-12 scale-[1.3] object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              {/* Fallback fx glyph */}
              <span
                className="hidden text-amber-400 font-bold text-xs leading-none"
                aria-hidden="true"
              >
                FX
              </span>
            </div>

            {/* Wordmark */}
            <span
              className="text-white font-bold text-lg tracking-tight leading-none"
              style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
            >
              <span className="text-amber-400">Fx</span>Brokers
              <span className="text-amber-400/70 font-semibold">.co.ke</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "text-amber-400"
                      : "text-slate-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-150"
            >
              Contact
            </Link>
            <Link
              to="/broker-finder"
              className="relative group overflow-hidden bg-amber-400 hover:bg-amber-300 text-slate-900 text-sm font-bold px-4 py-2 rounded-xl transition-colors duration-200 flex items-center gap-1.5"
            >
              Find My Broker
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-white/10 hover:border-amber-400/30 transition-colors duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-4 h-px bg-white transition-all duration-200 origin-center ${
                menuOpen ? "rotate-45 translate-y-1.25" : ""
              }`}
            />
            <span
              className={`block w-4 h-px bg-white transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-4 h-px bg-white transition-all duration-200 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-1.25" : ""
              }`}
            />
          </button>
          </div>
        </nav>

{/* ── Mobile menu ── */}
<div
  className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
    menuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
  }`}
>
  <div className="h-px mx-4 bg-white/5" />

  <div
    className="px-4 py-4 flex flex-col gap-1 shadow-2xl"
    style={{ background: "rgba(5,13,26,0.98)", backdropFilter: "blur(20px)" }}
  >
    {navLinks.map((link) => (
      <NavLink
        key={link.href}
        to={link.href}
        // FIX: Close menu on click
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isActive
              ? "text-amber-400 bg-amber-400/10"
              : "text-slate-300 hover:text-white"
          }`
        }
      >
        {link.label}
        {/* Simplified dot logic for cleaner code */}
        <span className="isActive ? 'opacity-100' : 'opacity-0' transition-opacity w-1.5 h-1.5 rounded-full bg-amber-400" />
      </NavLink>
    ))}

    <Link
      to="/contact"
      onClick={() => setMenuOpen(false)} // FIX: Close menu
      className="px-4 py-3 text-slate-400 text-sm font-medium"
    >
      Contact
    </Link>

    <div className="h-px bg-white/5 my-2" />

    <Link
      to="/broker-finder"
      onClick={() => setMenuOpen(false)} // FIX: Close menu
      className="flex items-center justify-center gap-2 bg-amber-400 text-slate-900 font-bold text-sm py-4 rounded-xl active:scale-95 transition-transform"
    >
      Find My Broker
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
</div>
      </header>
    </>
  );
}