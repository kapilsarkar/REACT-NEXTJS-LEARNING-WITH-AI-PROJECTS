import { Link } from "react-router-dom";
import useInterviewStore from "../store/interviewStore";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
    className="h-4 w-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
  </svg>
);

const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
    />
  </svg>
);

const ProgressBar = ({ value, className = "" }) => {
  const score = Math.max(0, Math.min(Number(value) || 0, 100));

  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-slate-800 ${className}`}
    >
      <div
        className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-400 transition-all duration-500"
        style={{ width: `${score}%` }}
      />
    </div>
  );
};

const SectionHeading = ({ eyebrow, title, description }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
      {eyebrow}
    </p>
    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
      {title}
    </h2>
    {description && (
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    )}
  </div>
);

const Results = () => {
  const { evaluation } = useInterviewStore();

  if (!evaluation) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#080f1f] px-5 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(109,81,220,0.22),transparent_28%),radial-gradient(circle_at_80%_85%,rgba(49,91,199,0.15),transparent_25%)]" />
        <section className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/65 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-400/15 text-2xl text-violet-200">
            ✦
          </span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
            Performance report
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
            Interview Results
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Your detailed feedback will appear here after completing an
            interview.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400"
          >
            Return Home
          </Link>
        </section>
      </main>
    );
  }

  const skillScores = [
    { title: "Communication", score: evaluation.communication },
    { title: "Technical Knowledge", score: evaluation.technicalKnowledge },
    { title: "Problem Solving", score: evaluation.problemSolving },
  ];

  return (
    <main className="min-h-screen bg-[#080f1f] px-5 py-14 text-white sm:px-7 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            AI Generated Performance Report
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Interview Results
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
            A clear breakdown of your interview performance and the next steps
            to grow with confidence.
          </p>
        </header>

        <section className="relative mt-12 overflow-hidden rounded-3xl border border-violet-300/15 bg-linear-to-br from-violet-500/15 via-slate-900/80 to-indigo-500/10 p-7 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
                Overall Score
              </p>
              <h2 className="mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">
                {evaluation.overallScore}
                <span className="text-2xl text-violet-300 sm:text-3xl">
                  /100
                </span>
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Your combined interview performance score.
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="mb-3 flex justify-between text-sm font-semibold">
                <span className="text-slate-300">Performance</span>
                <span className="text-violet-200">
                  {evaluation.overallScore}%
                </span>
              </div>
              <ProgressBar value={evaluation.overallScore} />
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Score breakdown"
            title="Skill scores"
            description="A focused view of the areas assessed in this interview."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {skillScores.map(({ title, score }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-900/65 p-6 shadow-lg shadow-black/10 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-violet-300/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold text-slate-200">{title}</h3>
                  <span className="text-2xl font-extrabold text-violet-200">
                    {score ?? 0}
                  </span>
                </div>
                <ProgressBar value={score} className="mt-6" />
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What worked well" title="Strengths" />
            <div className="mt-6 space-y-3">
              {evaluation.strengths?.map((strength, index) => (
                <article
                  key={`${strength}-${index}`}
                  className="flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-400/[.06] p-4 text-sm leading-6 text-slate-200 transition hover:border-emerald-300/25"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <CheckIcon />
                  </span>
                  <p>{strength}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Areas to improve" title="Weaknesses" />
            <div className="mt-6 space-y-3">
              {evaluation.weaknesses?.map((weakness, index) => (
                <article
                  key={`${weakness}-${index}`}
                  className="flex gap-3 rounded-2xl border border-amber-300/10 bg-amber-400/6 p-4 text-sm leading-6 text-slate-200 transition hover:border-amber-300/25"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300">
                    <WarningIcon />
                  </span>
                  <p>{weakness}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Your next steps"
            title="Learning roadmap"
            description="Prioritized practice tasks based on this interview."
          />
          <ol className="mt-6 grid gap-3">
            {evaluation.learningRoadmap?.map((step, index) => (
              <li
                key={`${step}-${index}`}
                className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/65 p-5 text-sm leading-6 text-slate-200 shadow-lg shadow-black/10 backdrop-blur transition hover:border-violet-300/30"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-400/15 text-xs font-extrabold text-violet-200">
                  {index + 1}
                </span>
                <p className="pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-slate-900/65 p-7 shadow-xl shadow-black/15 backdrop-blur sm:p-9">
          <SectionHeading eyebrow="Coach's note" title="AI summary" />
          <p className="mt-5 max-w-4xl text-sm leading-8 text-slate-300">
            {evaluation.summary ?? "No summary was provided."}
          </p>
        </section>

        <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/setup"
            className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400"
          >
            Start New Interview
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-white/15 bg-slate-900/70 px-6 py-3.5 text-center text-sm font-bold text-slate-200 transition hover:border-violet-300/40 hover:bg-white/5"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Results;
