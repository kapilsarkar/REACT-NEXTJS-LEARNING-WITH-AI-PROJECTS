import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const increment = () => {
    setCount(count + inputValue);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
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
          <h3 className=" text-center px-2 py-3 font-bold">{inputValue}</h3>
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
        </div>
      </div>
    </>
  );
}

export default App;
