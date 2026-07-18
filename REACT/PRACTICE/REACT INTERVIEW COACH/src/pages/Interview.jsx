import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";
import NavigationButtons from "../components/NavigationButtons";

import { generateInterviewQuestions } from "../services/geminiService";
import useInterviewStore from "../store/interviewStore";

const Interview = () => {
  const navigate = useNavigate();

  const {
    role,
    experience,
    difficulty,
    questionCount,

    questions,
    currentQuestionIndex,
    answers,

    loading,
    error,

    setQuestions,
    setLoading,
    setError,
    nextQuestion,
    previousQuestion,
    updateAnswer,
  } = useInterviewStore();

  useEffect(() => {
    if (!role || questions.length > 0) {
      return;
    }

    let ignore = false;

    async function loadQuestions() {
      setLoading(true);
      setError(null);

      try {
        const generatedQuestions = await generateInterviewQuestions({
          role,
          experience,
          difficulty,
          questionCount,
        });

       

        if (!ignore) {
          setQuestions(generatedQuestions);
        }
      } catch (err) {
        console.error(err);

        if (!ignore) {
          setError("Failed to generate interview questions.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();

    return () => {
      ignore = true;
    };
  }, [
    role,
    experience,
    difficulty,
    questionCount,
    questions.length,
    setQuestions,
    setLoading,
    setError,
  ]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion =
    totalQuestions > 0 && currentQuestionIndex === totalQuestions - 1;

  // Derived from Zustand: no local state and no synchronization effect needed.
  const answer = answers[currentQuestionIndex] ?? "";

  const setAnswer = (nextAnswer) => {
    updateAnswer(currentQuestionIndex, nextAnswer);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      previousQuestion();
    }
  };

  const handleSubmit = () => {
    navigate("/results");
  };

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

        {loading && (
          <div className="mt-16 text-center">
            <p className="animate-pulse text-xl text-violet-300">
              AI is generating interview questions...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-10 rounded-xl bg-red-500/10 p-5 text-center text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && currentQuestion && (
          <div className="mt-12 space-y-8">
            <ProgressBar
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />

            <QuestionCard
              questionNumber={currentQuestionIndex + 1}
              question={currentQuestion.question}
            />

            <AnswerBox answer={answer} setAnswer={setAnswer} />

            <NavigationButtons
              isFirstQuestion={isFirstQuestion}
              isLastQuestion={isLastQuestion}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <p className="mt-12 text-center text-slate-400">
            No interview questions are available yet.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/setup"
            className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/5"
          >
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Interview;
