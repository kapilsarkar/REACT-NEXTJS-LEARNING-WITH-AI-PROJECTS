import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : prev));
  };
  return (
    <>
      <h1 className=" text-center">Counter Game</h1>
      <div className=" w-full px-2 py-3 mt-2">
        <h2 className=" text-center px-2 py-3 font-bold">
          Current Count:{count}
        </h2>
        <div className="mt-2 flex justify-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="px-2 py-3 rounded-md mt-2 shadow-lg border-2"
          />
          <button
            onClick={() => {
              setCount(Number(inputValue));
              setInputValue(0);
            }}
            className=" rounded-md text-white bg-violet-700  text-center px-2 py-3 font-bold"
          >
            Set To {inputValue}
          </button>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <button
            onClick={() => increment()}
            className=" border bg-green-900 text-white px-2 py-3 rounded-md"
          >
            Increment
          </button>
          <button
            onClick={() => decrement()}
            className=" border bg-red-600 text-white px-2 py-3 rounded-md"
          >
            Decrement
          </button>
          <button
            onClick={() => setCount(0)}
            className="border bg-red-600 text-white px-2 py-3 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
