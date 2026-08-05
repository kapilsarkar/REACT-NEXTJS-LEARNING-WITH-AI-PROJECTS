const AboutOne = () => {
  return (
    <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-sm">
          01
        </span>
        <h2 className="text-xl font-bold text-white">Our Mission</h2>
      </div>
      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
        Welcome to <span className="text-indigo-400 font-semibold">About One</span>. We build modern, accessible, and high-performance Web applications using cutting-edge technologies like React 19, Zustand, and Tailwind CSS.
      </p>
    </div>
  );
};

export default AboutOne;