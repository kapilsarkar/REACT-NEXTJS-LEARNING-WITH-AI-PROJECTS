const AboutTwo = () => {
  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-950/30 p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 font-bold text-sm">
          02
        </span>
        <h2 className="text-xl font-bold text-white">Our Vision</h2>
      </div>
      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
        Welcome to <span className="text-violet-400 font-semibold">About Two</span>. Our focus is on building resilient front-end architecture, mastering data routing, and crafting clean, maintainable user interfaces.
      </p>
    </div>
  );
};

export default AboutTwo;