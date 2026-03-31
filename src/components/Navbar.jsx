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
        <nav className="w-full bg-[#0a0f0c]/95 border-b border-white/6 backdrop-blur-md" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="FxBrokers.co.ke Home">
              <div className="flex items-center justify-center shrink-0">
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
                <span className="hidden text-amber-400 font-bold text-xs leading-none" aria-hidden="true">
                  FX
                </span>
              </div>

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
                      isActive ? "text-amber-400" : "text-slate-400 hover:text-white"
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
              <Link to="/contact" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-150">
                Contact
              </Link>
              <Link
                to="/broker-finder"
                className="relative group overflow-hidden bg-amber-400 hover:bg-amber-300 text-slate-900 text-sm font-bold px-4 py-2 rounded-xl transition-colors duration-200 flex items-center gap-1.5"
              >
                Find My Broker
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* ── Mobile Toggle Button ── */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white hover:border-amber-400/30 transition-all active:scale-90"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="px-4 min-h-screen py-6 flex flex-col gap-1 shadow-2xl"
            style={{ background: "rgba(5,13,26,0.98)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all ${
                    isActive ? "text-amber-400 bg-amber-400/10" : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.label}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-0 transition-opacity" />
              </NavLink>
            ))}

            <Link to="/contact" onClick={() => setMenuOpen(false)} className="px-4 py-4 text-slate-400 text-base font-medium">
              Contact
            </Link>

            <div className="h-px bg-white/5 my-4" />

            <Link
              to="/broker-finder"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-amber-400 text-slate-900 font-bold text-base py-4 rounded-xl active:scale-95 transition-transform"
            >
              Find My Broker
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}