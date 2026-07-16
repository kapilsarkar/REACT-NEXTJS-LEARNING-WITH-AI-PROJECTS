import useNameStore from "../store/name.js";

const CapitalizeName = () => {
  const name = useNameStore((state) => state.name);
  const capitalizeName = useNameStore((state) => state.capitalizeName);
  const noCapitalizeName = useNameStore((state) => state.noCapitalizeName);

  return (
    <main className="flex items-center justify-center overflow-hidden  from-indigo-700 via-violet-700 to-fuchsia-700 p-6">
      {/* Decorative background circles */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

      <section className="relative w-full max-w-xl rounded-3xl border border-white/30 bg-white/15 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl  from-yellow-300 to-orange-400 text-3xl shadow-lg">
          Aa
        </div>

        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-indigo-100">
          Zustand State Demo
        </p>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Name Formatter
        </h2>

        <div className="my-8 rounded-2xl border border-white/20 bg-slate-950/20 p-6 shadow-inner">
          <p className="mb-3 text-sm font-medium text-indigo-100">
            Your current name
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-4xl">
            {name}
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={capitalizeName}
            className=" cursor-pointer rounded-xl  px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/30 transition duration-200 hover:-translate-y-1 hover:from-emerald-500 hover:to-teal-600 hover:shadow-xl active:translate-y-0"
          >
            ↑ Capitalize
          </button>

          <button
            type="button"
            onClick={noCapitalizeName}
            className="cursor-pointer rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 font-bold text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl active:translate-y-0"
          >
            ↓ UnCapitalize
          </button>
        </div>

        <p className="mt-7 text-xs text-indigo-100/80">
          Click a button to update the global Zustand state.
        </p>
      </section>
    </main>
  );
};

export default CapitalizeName;