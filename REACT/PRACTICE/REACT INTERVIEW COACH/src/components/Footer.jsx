const Footer = () => (
  <footer
    id="about"
    className="bg-[#060b15] px-5 pb-8 pt-16 text-slate-400 sm:px-7"
  >
    <div
      id="start"
      className="mx-auto max-w-6xl rounded-2xl border border-violet-300/15 bg-linear-to-r from-violet-500/15 to-indigo-500/10 px-6 py-10 text-center sm:px-10"
    >
      <p className="text-xs font-bold uppercase tracking-[.18em] text-violet-300">
        Your next opportunity starts here
      </p>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Ready to ace your next interview?
      </h2>
      <a
        href="#top"
        className="mt-6 inline-block rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5"
      >
        Get Started Free →
      </a>
    </div>
    <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-5 border-t border-white/10 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 DevInterview AI. Practice with purpose.</p>
      <div className="flex gap-5">
        <a href="#top" className="hover:text-white">
          Privacy
        </a>
        <a href="#top" className="hover:text-white">
          Terms
        </a>
        <a href="#top" className="hover:text-white">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
