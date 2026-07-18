const AnswerBox = ({ answer = '', setAnswer }) => {
  const handleChange = (event) => {
    setAnswer(event.target.value)
  }

  return (
    <div className="w-full">
      <label htmlFor="interview-answer" className="sr-only">
        Your interview answer
      </label>
      <textarea
        id="interview-answer"
        maxLength={3000}
        value={answer}
        onChange={handleChange}
        placeholder="Type your answer here..."
        className="min-h-45 w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-500 transition duration-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 sm:px-5"
      />
      <p className="mt-2 text-right text-xs text-slate-400">
        Characters: {answer.length}/3000
      </p>
    </div>
  )
}

export default AnswerBox