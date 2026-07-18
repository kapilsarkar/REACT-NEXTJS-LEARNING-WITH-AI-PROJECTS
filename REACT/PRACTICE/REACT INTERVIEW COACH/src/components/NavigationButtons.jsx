const NavigationButtons = ({
  isFirstQuestion,
  isLastQuestion,
  onPrevious,
  onNext,
  onSubmit,
}) => (
  <div className="flex items-center justify-between gap-4">
    <button
      type="button"
      onClick={onPrevious}
      disabled={isFirstQuestion}
      className="rounded-xl border cursor-pointer border-white/15 bg-slate-900/70 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-violet-300/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15 disabled:hover:bg-slate-900/70"
    >
      Previous
    </button>

    {isLastQuestion ? (
      <button
        type="button"
        onClick={onSubmit}
        className="rounded-xl cursor-pointer bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400"
      >
        Submit Interview
      </button>
    ) : (
      <button
        type="button"
        onClick={onNext}
        className="rounded-xl cursor-pointer bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400"
      >
        Next <span aria-hidden="true">→</span>
      </button>
    )}
  </div>
)

export default NavigationButtons