import { useState } from "react";
import useCounterStore from "../store/counter.js";

const CounterApp = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);
  const incrementByAmount = useCounterStore(
    (state) => state.incrementByAmount
  );
  const decrementByAmount = useCounterStore(
    (state) => state.decrementByAmount
  );
  const multiplyByAmount = useCounterStore(
    (state) => state.multiplyByAmount
  );
  const divideByAmount = useCounterStore((state) => state.divideByAmount);

  const [amount, setAmount] = useState(1);

  const numericAmount = Number(amount);
  const isValidAmount = Number.isFinite(numericAmount);
  const cannotDivide = !isValidAmount || numericAmount === 0;
 
  return (
    <main className="w-full max-w-md rounded-3xl  p-1 shadow-2xl">
      <section className="rounded-[22px] border border-white/20 bg-slate-950/30 p-6 text-center backdrop-blur-xl sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-200">
          Zustand State
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">Counter App</h1>

        <div className="my-7 rounded-2xl border border-white/15 bg-white/10 py-6">
          <p className="text-sm font-medium text-indigo-100">Current count</p>
          <h2 className="mt-2  text-6xl font-extrabold text-white">
            {count}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={decrement}
            className="cursor-pointer rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            − Decrement
          </button>

          <button
            type="button"
            onClick={increment}
            className="cursor-pointer rounded-xl bg-white px-4 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            + Increment
          </button>

          <button
            type="button"
            onClick={reset}
            className="cursor-pointer col-span-2 rounded-xl border border-white/25 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Reset counter
          </button>
        </div>

        <div className="mt-7 border-t border-white/15 pt-6">
          <h3 className="text-lg font-bold text-white">Calculate by amount</h3>
          <p className="mt-1 text-sm text-indigo-100">
            Enter a number, then choose an action.
          </p>

          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
          />

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => incrementByAmount(numericAmount)}
              disabled={!isValidAmount}
              className="cursor-pointer rounded-xl bg-emerald-500 px-3 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add amount
            </button>

            <button
              type="button"
              onClick={() => decrementByAmount(numericAmount)}
              disabled={!isValidAmount}
              className="cursor-pointer rounded-xl bg-rose-500 px-3 py-3 font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Subtract amount
            </button>

            <button
              type="button"
              onClick={() => multiplyByAmount(numericAmount)}
              disabled={!isValidAmount}
              className="cursor-pointer rounded-xl bg-amber-400 px-3 py-3 font-semibold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              × Multiply
            </button>

            <button
              type="button"
              onClick={() => divideByAmount(numericAmount)}
              disabled={cannotDivide}
              className="cursor-pointer rounded-xl bg-sky-500 px-3 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ÷ Divide
            </button>
          </div>

          {numericAmount === 0 && (
            <p className="mt-3 text-xs font-medium text-amber-200">
              Division by zero is not allowed.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default CounterApp;