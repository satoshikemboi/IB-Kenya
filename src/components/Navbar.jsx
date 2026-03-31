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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050D1A]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      <nav className="w-full border-b border-white/5" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex scale-[1.5] items-center justify-center shrink-0">
              <img
                src="/fxbrokerskenya.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <span className="text-white font-bold text-lg tracking-tight leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="text-amber-400">Fx</span>Brokers
              <span className="text-amber-400/70 font-semibold">.co.ke</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
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
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
              Contact
            </Link>
            <Link
              to="/broker-finder"
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 text-sm font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95"
            >
              Find My Broker
            </Link>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 top-16 bg-[#050D1A] z-40 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-all ${
                  isActive ? "bg-amber-400/10 text-amber-400" : "text-slate-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <div className={`w-2 h-2 rounded-full bg-amber-400 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                </>
              )}
            </NavLink>
          ))}
          
          <div className="h-px bg-white/5 my-4" />
          
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="p-4 text-slate-300 text-lg font-medium"
          >
            Contact
          </Link>

          <Link
            to="/broker-finder"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center justify-center bg-amber-400 text-slate-900 font-bold text-lg py-4 rounded-2xl active:scale-95 transition-transform"
          >
            Find My Broker
          </Link>
        </div>
      </div>
    </header>
  );
}