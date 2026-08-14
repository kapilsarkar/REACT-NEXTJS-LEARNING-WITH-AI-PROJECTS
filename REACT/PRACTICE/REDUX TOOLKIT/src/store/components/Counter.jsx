import { useDispatch, useSelector } from "react-redux";
import {
  changeByValue,
  decrement,
  increment,
  reset,
} from "../features/counter/counterSlice";
import { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const storeValue = useSelector((state) => state.counter.value);

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleReset = () => dispatch(reset());

  const handleChangeByValue = (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(changeByValue(value));
      setValue("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl transition-all">
      <h2 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-800 pb-3">
        Counter Dashboard
      </h2>

      {/* Main Counter Display */}
      <div className="text-center py-6 bg-slate-950 rounded-xl border border-slate-800/80 mb-6">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Current Count
        </span>
        <div className="text-6xl font-extrabold text-indigo-400 mt-2 transition-all">
          {storeValue}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={handleDecrement}
          disabled={storeValue <= 0}
          className="px-3 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-rose-600 disabled:active:scale-100"
        >
          Decrement (-)
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-150 active:scale-95"
        >
          Reset
        </button>

        <button
          onClick={handleIncrement}
          className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-150 active:scale-95"
        >
          Increment (+)
        </button>
      </div>

      {/* Custom Value Form */}
      <form onSubmit={handleChangeByValue} className="flex gap-2">
        <input
          type="number"
          min="0"
          placeholder="Enter target number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap"
        >
          Set Value
        </button>
      </form>
    </div>
  );
};

export default Counter;