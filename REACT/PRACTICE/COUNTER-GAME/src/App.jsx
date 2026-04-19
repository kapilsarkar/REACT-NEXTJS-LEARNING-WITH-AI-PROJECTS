import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - 1, 0));
  };

  const handleSet = () => {
    if (inputValue === "") return;

    const value = Number(inputValue);

    if (!isNaN(value)) {
      setCount(value);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      
      {/* Card */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-xl w-80 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Counter App
        </h2>

        {/* Count Display */}
        <div className="bg-slate-700 rounded-xl py-4 mb-4">
          <p className="text-sm text-gray-300">Current Count</p>
          <h3 className="text-3xl font-bold">{count}</h3>
        </div>

        {/* Main Buttons */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={handleIncrement}
            className="flex-1 bg-green-600 hover:bg-green-700 transition px-3 py-2 rounded-lg"
          >
            +1
          </button>

          <button
            onClick={handleDecrement}
            className="flex-1 bg-red-600 hover:bg-red-700 transition px-3 py-2 rounded-lg"
          >
            -1
          </button>
        </div>

        {/* Step Buttons */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setCount((prev) => prev + 5)}
            className="flex-1 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg"
          >
            +5
          </button>

          <button
            onClick={() =>
              setCount((prev) => Math.max(prev - 5, 0))
            }
            className="flex-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
          >
            -5
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={() => setCount(0)}
          className="w-full bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-lg mb-3"
        >
          Reset
        </button>

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="flex-1 px-2 py-2 rounded-lg text-black outline-none"
          />

          <button
            onClick={handleSet}
            className="bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-lg"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;