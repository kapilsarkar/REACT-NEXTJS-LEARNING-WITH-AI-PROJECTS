import { Link } from "react-router-dom";
import useInterviewStore from "../store/interviewStore";

const Interview = () => {
  const role = useInterviewStore((state) => state.role);
  const experience = useInterviewStore((state) => state.experience);
  const difficulty = useInterviewStore((state) => state.difficulty);
  const questionCount = useInterviewStore((state) => state.questionCount);

  // Protect route access
  if (!role) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080f1f] px-5 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Interview configuration missing
          </h1>

          <p className="mt-4 text-slate-400">
            Please set up your interview first.
          </p>

          <Link
            to="/setup"
            className="mt-6 inline-block rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-6 py-3 font-bold"
          >
            Go to Setup
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#080f1f] px-5 text-center text-white">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-violet-300">
          Interview Session
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">
          Your interview is ready.
        </h1>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200">
            {role}
          </span>

          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200">
            {experience}
          </span>

          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200">
            {difficulty}
          </span>

          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200">
            {questionCount} Questions
          </span>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          AI generated interview questions will appear here next.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/setup"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/5"
          >
            Back to Setup
          </Link>

          <button className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25">
            Start Question 1
          </button>
        </div>
      </div>
    </main>
  );
};

export default Interview;
