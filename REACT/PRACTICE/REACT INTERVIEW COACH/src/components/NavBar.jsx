import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#about" },
];

const MenuIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    className="h-5 w-5"
  >
    {open ? (
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    ) : (
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    )}
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-19.5 max-w-6xl items-center justify-between px-5 sm:px-7"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white"
          onClick={closeMenu}
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-linear-to-br from-violet-400 to-indigo-500 text-base text-slate-950 shadow-lg shadow-violet-500/25 transition group-hover:scale-105">
            ⚡
          </span>
          DevInterview <span className="text-green-600">AI</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/setup"
          className="hidden items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400 sm:flex"
        >
          Get Started <ArrowIcon />
        </Link>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon open={isOpen} />
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-3 right-3 top-[calc(100%+0.75rem)] rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-slate-950/50 backdrop-blur-xl lg:hidden"
        >
          <ul className="grid gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#start"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25"
          >
            Get Started <ArrowIcon />
          </a>
        </div>
      )}
    </header>
  );
};

export default NavBar;
