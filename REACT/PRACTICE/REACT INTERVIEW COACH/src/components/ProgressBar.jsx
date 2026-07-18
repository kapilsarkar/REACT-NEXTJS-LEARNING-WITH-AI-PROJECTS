const ProgressBar = ({ currentQuestion = 0, totalQuestions = 0 }) => {
  const safeTotal = Math.max(0, Number(totalQuestions) || 0)
  const safeCurrent = Math.min(Math.max(0, Number(currentQuestion) || 0), safeTotal)
  const percentage = safeTotal ? Math.round((safeCurrent / safeTotal) * 100) : 0

  return (
    <section className="w-full" aria-label="Interview progress">
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-slate-200">
          Question {safeCurrent} of {safeTotal}
        </p>
        <p className="font-bold text-violet-300">{percentage}%</p>
      </div>

      <div
        role="progressbar"
        aria-label={`Question ${safeCurrent} of ${safeTotal}`}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-valuenow={safeCurrent}
        aria-valuetext={`${percentage}% complete`}
        className="h-2.5 overflow-hidden rounded-full bg-slate-800"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  )
}

export default ProgressBar
