import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInterViewStore from "../store/interviewStore.js";

const roles = [
  "React Developer",
  "MERN Developer",
  "Frontend Developer",
  "Node.js Developer",
  "Full Stack Developer (Next.js)",
];

const experienceLevels = ["Fresher", "Junior", "Mid-Level"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

const SelectField = ({ id, label, value, onChange, options }) => (
  <label htmlFor={id} className="block">
    <span className="mb-2 block text-sm font-bold text-slate-200">{label}</span>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3.5 pr-11 text-sm font-medium text-slate-100 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </label>
);

const SetupInterview = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(roles[0]);
  const [experience, setExperience] = useState(experienceLevels[0]);
  const [difficulty, setDifficulty] = useState(difficultyLevels[0]);
  const [questionCount, setQuestionCount] = useState(5);
  const estimatedDuration = questionCount * 2;

  const setInterViewConfig = useInterViewStore(
    (state) => state.setInterviewConfig,
  );

  const handleStartInterview = () => {
    setInterViewConfig({ role, experience, difficulty, questionCount });

    navigate("/interview");
  };
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080f1f] px-5 py-16 text-white sm:px-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(109,81,220,0.2),transparent_26%),radial-gradient(circle_at_85%_90%,rgba(49,91,199,0.18),transparent_25%)]" />
      <div className="relative w-full max-w-2xl">
        <div className="mb-7 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-white"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-linear-to-br from-violet-400 to-indigo-500 text-slate-950">
              ⚡
            </span>
            DevInterview <span className="text-violet-300">AI</span>
          </Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-violet-300">
            Personalized interview practice
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Set up your interview
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Choose your preferences and let your AI coach prepare a focused
            practice session.
          </p>
        </div>

        <section
          className="rounded-3xl border border-white/10 bg-slate-900/65 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
          aria-labelledby="setup-title"
        >
          <h2 id="setup-title" className="sr-only">
            Interview preferences
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <SelectField
                id="role"
                label="Role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                options={roles}
              />
            </div>
            <SelectField
              id="experience"
              label="Experience level"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              options={experienceLevels}
            />
            <SelectField
              id="difficulty"
              label="Difficulty level"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              options={difficultyLevels}
            />
          </div>

          <fieldset className="mt-7">
            <legend className="text-sm font-bold text-slate-200">
              Number of questions
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setQuestionCount(5)}
                aria-pressed={questionCount === 5}
                className={`rounded-xl border p-4 text-left transition ${questionCount === 5 ? "border-violet-400 bg-violet-400/15 ring-2 ring-violet-500/20" : "border-white/10 bg-white/3 hover:border-violet-300/40"}`}
              >
                <span className="block text-sm font-bold">5 Questions</span>
                <span className="mt-1 block text-xs text-slate-400">
                  Quick practice round
                </span>
              </button>
              <button
                type="button"
                disabled
                className="relative cursor-not-allowed rounded-xl border border-white/5 bg-white/2 p-4 text-left opacity-60"
              >
                <span className="absolute right-3 top-3 rounded-full bg-violet-400/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-violet-200">
                  Coming soon
                </span>
                <span className="block text-sm font-bold text-slate-400">
                  10 Questions
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Extended practice round
                </span>
              </button>
            </div>
          </fieldset>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-violet-300/10 bg-violet-400/[.07] p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400/15 text-lg text-violet-200">
              ◷
            </span>
            <div>
              <p className="text-xs font-semibold text-violet-200">
                Estimated duration
              </p>
              <p className="mt-0.5 text-sm font-bold text-white">
                About {estimatedDuration} minutes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartInterview}
            className="mt-7 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400 focus:outline-none focus:ring-4 focus:ring-violet-500/30"
          >
            Start Interview <span aria-hidden="true">→</span>
          </button>
          <Link to="/">
            <button className="mt-7 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400 focus:outline-none focus:ring-4 focus:ring-violet-500/30">
              Back
            </button>
          </Link>

          <p className="mt-4 text-center text-sm text-slate-500">
            Questions will be generated specifically for your selected role and
            experience level.
          </p>
          <p className="mt-4 text-center text-xs text-slate-500">
            You can change your preferences before every session.
          </p>
        </section>
      </div>
    </main>
  );
};

export default SetupInterview;
