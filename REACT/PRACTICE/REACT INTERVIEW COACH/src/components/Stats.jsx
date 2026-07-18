const stats = [
  ["5", "interview roles supported"],
  ["5", "questions per session"],
  ["AI", "Personalized AI Roadmaps"],
];

const Stats = () => (
  <section
    id="roadmap"
    className="bg-linear-to-br from-violet-950 via-slate-950 to-indigo-950 px-5 py-20 text-white sm:px-7 lg:py-24"
  >
    
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
          Built for focused practice
        </p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          The tools to make every
          <br />
          <span className="font-serif font-semibold italic text-violet-300">
            practice session count.
          </span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
          Everything is designed to make interview preparation structured,
          personal, and easy to act on.
        </p>
        <a
          href="#start"
          className="mt-7 inline-block text-sm font-bold text-violet-200 hover:text-white"
        >
          Start practising now →
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur sm:p-7"
          >
            <strong className="text-3xl tracking-tight text-violet-200 sm:text-4xl">
              {value}
            </strong>
            <p className="mt-3 text-xs leading-5 text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
