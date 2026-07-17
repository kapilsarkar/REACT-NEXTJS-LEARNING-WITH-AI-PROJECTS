import { Link } from "react-router-dom";

const Results = () => (
  <main className="grid min-h-screen place-items-center bg-[#080f1f] px-5 text-center text-white">
    <div>
      <p className="text-xs font-bold uppercase tracking-[.18em] text-violet-300">
        Interview results
      </p>
      <h1 className="mt-3 text-4xl font-extrabold">Your progress report.</h1>
      <p className="mt-4 text-sm text-slate-400">
        Your detailed feedback and report will appear here after an interview.
      </p>
      <Link
        to="/"
        className="mt-7 inline-block rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold"
      >
        Return home
      </Link>
    </div>
  </main>
);

export default Results;
