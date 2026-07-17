import { Link } from "react-router-dom";
const Sparkle = () => <span aria-hidden="true">✦</span>;

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden bg-[#08101f] px-5 pb-20 pt-20 text-white sm:px-7 lg:pb-28 lg:pt-28"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(109,81,220,0.25),transparent_26%),radial-gradient(circle_at_14%_90%,rgba(40,113,186,0.18),transparent_25%)]" />
    <div
      id="how-it-works"
      className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]"
    >
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-violet-200">
          <Sparkle /> Your AI-powered interview coach
        </p>
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
          Practice smarter.
          <br />
          <span className="font-serif font-semibold italic text-violet-300">
            Interview stronger.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
          Practice realistic technical interviews, receive instant AI feedback,
          and get a personalized learning roadmap.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/setup"
            className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3.5 text-sm font-bold text-white"
          >
            Start Mock Interview →
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-bold text-slate-200 transition hover:text-violet-200"
          >
            Watch Demo
          </a>
        </div>
        <p className="mt-7 text-xs text-slate-400">
          No credit card required · Free forever plan
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-lg">
        <div className="absolute -inset-8 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate-400">
            <span className="flex items-center gap-2 text-violet-200">
              <i className="h-2 w-2 rounded-full bg-violet-400" /> Live mock
              interview
            </span>
            <span>12:43</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-60 overflow-hidden rounded-xl bg-linear-to-br from-slate-600 via-slate-800 to-indigo-950">
              <div className="absolute bottom-0 left-1/2 h-36 w-32 -translate-x-1/2 rounded-t-[60px] bg-slate-600" />
              <div className="absolute bottom-28 left-1/2 h-20 w-16 -translate-x-1/2 rounded-[45%] bg-amber-200" />
              <div className="absolute bottom-42 left-1/2 h-14 w-20 -translate-x-1/2 rounded-t-[50%] bg-slate-950" />
              <span className="absolute bottom-3 left-3 rounded bg-slate-950/50 px-2 py-1 text-[10px]">
                You
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-400 text-slate-900">
                  ✦
                </span>
                <div>
                  <p className="text-xs font-bold text-white">AI Coach</p>
                  <p className="text-[10px] text-violet-200">Listening…</p>
                </div>
              </div>
              <p className="mt-7 text-sm leading-6 text-slate-100">
                Tell me about a time you led a team through a challenge.
              </p>
              <div className="mt-8 flex h-7 items-center gap-1">
                {[8, 16, 24, 12, 20, 9, 15, 25, 13, 7, 18, 23, 10, 16, 7].map(
                  (height, index) => (
                    <i
                      key={index}
                      className="w-1 rounded bg-violet-400"
                      style={{ height }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-950/40 p-3">
            <div className="h-1.5 flex-1 rounded-full bg-slate-700">
              <div className="h-full w-2/3 rounded-full bg-violet-400" />
            </div>
            <span className="text-[10px] text-slate-300">65% complete</span>
          </div>
        </div>
        <div className="absolute -bottom-5 -right-2 rounded-xl border border-white/10 bg-slate-800/95 px-4 py-3 shadow-xl backdrop-blur">
          <p className="text-xs font-bold text-violet-200">
            92/100 — Great answer!
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Clear and confident delivery
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
