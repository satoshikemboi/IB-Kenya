import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Brokers", href: "/brokers" },
  { label: "Categories", href: "/brokers/category" },
  { label: "Methodology", href: "/methodology" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-base transition-colors ${isActive ? "text-black font-semibold" : "text-zinc-800 hover:text-zinc-500"}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="font-[Manrope] bg-white">
      {/* Risk warning */}
      <p className="bg-[#0b1426] px-4 py-3 text-center text-xs font-medium leading-snug text-white">
        Trading forex and CFDs involves a high risk of loss and may not suit every investor. Prices can move
        quickly, and you can lose more than your initial deposit. Only trade with money you can afford to lose.
      </p>

      <nav className="sticky top-0 z-50 bg-white" aria-label="Main navigation">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-3">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-bold tracking-tight text-black no-underline">
              <span className="rounded bg-[#FFE600] px-1.5">fx</span>brokers.co.ke
            </Link>
            <div className="hidden items-center gap-3 md:flex">
              {links.map((l) => (
                <NavLink key={l.href} to={l.href} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/brokers"
              className="rounded-md bg-[#FFE600] px-5 py-2.5 text-base font-semibold text-black no-underline hover:brightness-95"
            >
              Find my broker
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-md bg-zinc-100 md:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="flex flex-col border-t border-zinc-200 bg-white px-6 py-3 md:hidden">
            {links.map((l) => (
              <NavLink key={l.href} to={l.href} onClick={() => setOpen(false)} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}