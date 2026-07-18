/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { generateInterviewQuestions } from "../services/geminiService";
import useInterviewStore from "../store/interviewStore";

const Interview = () => {
  const {
    role,
    experience,
    difficulty,
    questionCount,

    questions,
    loading,
    error,

    setQuestions,
    setLoading,
    setError,
  } = useInterviewStore();

  // ===============================
  // Generate Interview Questions
  // ===============================
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const generatedQuestions = await generateInterviewQuestions({
          role,
          experience,
          difficulty,
          questionCount,
        });

        setQuestions(generatedQuestions);
      } catch (err) {
        console.error(err);
        setError("Failed to generate interview questions.");
      } finally {
        setLoading(false);
      }
    };

    if (questions.length === 0) {
      loadQuestions();
    }
  }, []);

  // ===============================
  // Route Protection
  // ===============================
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
    <main className="min-h-screen bg-[#080f1f] px-5 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-bold uppercase tracking-[.18em] text-violet-300">
          Interview Session
        </p>

        <h1 className="mt-3 text-center text-4xl font-extrabold">
          AI Interview
        </h1>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-200">
            {role}
          </span>

          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-200">
            {experience}
          </span>

          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-200">
            {difficulty}
          </span>

          <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-200">
            {questionCount} Questions
          </span>
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-16 text-center">
            <p className="animate-pulse text-xl text-violet-300">
              🤖 AI is generating interview questions...
            </p>
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-10 rounded-xl bg-red-500/10 p-5 text-center text-red-300">
            {error}
          </div>
        )}

        {/* Questions */}

        {!loading && !error && questions.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-8 text-2xl font-bold">
              Generated Interview Questions
            </h2>

            <div className="space-y-5">
              {questions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-semibold text-violet-300">
                    Question {item.id}
                  </h3>

                  <p className="mt-3 text-slate-200">
                    {item.question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/setup"
            className="rounded-xl border border-white/10 px-6 py-3 font-semibold hover:bg-white/5"
          >
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Interview;