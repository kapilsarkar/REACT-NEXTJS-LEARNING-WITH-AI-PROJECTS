import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : prev));
  };
  return (
    <div className="bg-slate-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center space-y-4">
        <h2 className="text-3xl font-bold">Counter App</h2>
        <h1 className=" text-5xl font-bold">Counter is {count}</h1>

        <div className="text-2xl font-extrabold">Count is {count}</div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setCount((prev) => prev + 1);
            }}
            className="p-3 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Increase
          </button>
          <button
            onClick={() => handleDecrement()}
            className="p-3 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Decrease
          </button>
          <button
            onClick={() => setCount(0)}
            className="p-3 bg-gray-600 hover:bg-gray-700 rounded-lg"
          >
            Reset
          </button>
        </div>

        <div className="flex gap-3 justify-center items-center">
          <input
            onChange={(e) => {
              setInputValue(Number(e.target.value));
            }}
            className="text-black w-20 border-2 border-white px-2 py-1 rounded"
            type="number"
            value={inputValue}
          />
          <button
            onClick={() => {
              setCount(Number(inputValue));
              setInputValue(0);
            }}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Set To {inputValue}
          </button>
        </div>
      </div>
    </div>
  );
}
