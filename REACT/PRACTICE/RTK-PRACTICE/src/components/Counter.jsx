import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  decrement,
  increment,
  reset,
  changeByValue,
} from "../store/features/counter/counterSlice";

const Counter = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter.value);

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleReset = () => dispatch(reset());

  const handleChangeByValue = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      dispatch(changeByValue(Number(inputValue)));
      setInputValue("");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 rounded-2xl border border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-colors">
      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Counter
      </h1>

      <div className="mt-4 flex items-center justify-center">
        <span className="text-5xl font-bold tabular-nums text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={handleDecrement}
          disabled={value === 0}
          className="h-10 w-10 cursor-pointer rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          −
        </button>
        <button
          onClick={handleReset}
          className="px-4 cursor-pointer h-10 rounded-full bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
        >
          Reset
        </button>
        <button
          onClick={handleIncrement}
          className="h-10 cursor-pointer w-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:bg-slate-700 dark:hover:bg-white transition"
        >
          +
        </button>
      </div>

      <form onSubmit={handleChangeByValue} className="mt-6 flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Set value..."
          className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 outline-none focus:border-slate-500 dark:focus:border-slate-400 focus:ring-1 focus:ring-slate-500 dark:focus:ring-slate-400"
        />
        <button
          type="submit"
          className="rounded-lg cursor-pointer bg-slate-900 dark:bg-slate-100 px-4 py-2 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white transition"
        >
          Set
        </button>
      </form>
    </div>
  );
};

export default Counter;