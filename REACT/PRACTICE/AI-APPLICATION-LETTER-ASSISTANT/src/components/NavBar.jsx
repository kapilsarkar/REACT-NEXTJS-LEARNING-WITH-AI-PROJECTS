import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/", id: "top" },
  { label: "How It Works", href: "/how-it-works", id: "how-it-works" },
  { label: "Features", href: "/features", id: "features" },
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

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isHomePage) return;

    const sections = ["top", "how-it-works", "features"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px", // Triggers when section passes navbar height
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHomePage]);

  const checkIsActive = (link) => {
    if (!isHomePage) return false;
    return activeSection === link.id;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-amber-50/95 backdrop-blur">
      <nav
        className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 sm:px-7"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-950"
          onClick={closeMenu}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-700 text-sm font-extrabold text-white shadow-sm"
            aria-hidden="true"
          >
            A
          </span>
          AI WriteAssist
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link);
            const activeClasses = isActive
              ? "text-emerald-700 font-bold border-b-2 border-emerald-700 pb-1"
              : "text-slate-600 font-semibold hover:text-emerald-800";

            return (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link
                    to={link.href}
                    onClick={() => {
                      closeMenu();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`text-sm transition-colors ${activeClasses}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={isHomePage ? link.href : `/${link.href}`}
                    className={`text-sm transition-colors ${activeClasses}`}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Create Application */}
        <Link
          to="/create"
          className="hidden rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 sm:inline-flex"
        >
          Create an Application
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-800 transition hover:bg-slate-100 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon open={isOpen} />
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-3 top-[calc(100%+.5rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl lg:hidden"
        >
          <ul className="grid gap-1">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link);
              const mobileActiveClasses = isActive
                ? "bg-emerald-50 text-emerald-900 font-bold"
                : "text-slate-700 font-semibold hover:bg-emerald-50 hover:text-emerald-900";

              return (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      onClick={() => {
                        closeMenu();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`block rounded-xl px-4 py-3 text-sm ${mobileActiveClasses}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={isHomePage ? link.href : `/${link.href}`}
                      onClick={closeMenu}
                      className={`block rounded-xl px-4 py-3 text-sm ${mobileActiveClasses}`}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            to="/create"
            onClick={closeMenu}
            className="mt-2 flex justify-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white"
          >
            Create an Application
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;