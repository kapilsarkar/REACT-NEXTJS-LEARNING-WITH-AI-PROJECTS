const QuestionCard = ({ question, questionNumber }) => (
  <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/15 backdrop-blur sm:p-8">
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
      Question {questionNumber}
    </p>
    <h2 className="mt-4 text-xl font-bold leading-relaxed text-white sm:text-2xl">
      {question}
    </h2>
  </article>
);

export default QuestionCard;
