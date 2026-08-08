import { useEffect, useRef, useState } from "react";

const HookLearning = () => {
  const inputRef = useRef(null);
  const renderCountRef = useRef(0);
  const previousCount = useRef();

  const [isDivClicked, setIsDivClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  // Safely mutate and read ref inside an effect
  useEffect(() => {
    renderCountRef.current += 1;
    console.log(`Component rendered ${renderCountRef.current} times`);
  });

  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100);
    setRandomNumber(number);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleDivClick = () => {
    setIsDivClicked((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="font-extrabold text-4xl">Hook Learning : useRef</h1>

      {/* Input Focus Section */}
      <div className="flex gap-2 items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Name"
          className="border border-gray-400 p-2 rounded-lg"
        />
        <button
          onClick={handleFocus}
          className="bg-amber-500 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-amber-600 text-white"
        >
          Focus
        </button>
      </div>

      {/* State-Driven Styling Section */}
      <div className="space-y-2">
        <div
          onClick={handleDivClick}
          className={`w-32 h-32 cursor-pointer transition-all duration-300 ${
            isDivClicked
              ? "bg-blue-600 rounded-full"
              : "bg-green-600 rounded-none"
          }`}
        ></div>

        <button
          onClick={handleDivClick}
          className="bg-amber-500 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-amber-600 text-white"
        >
          Toggle Div State
        </button>

        {isDivClicked && (
          <p className="font-extrabold text-blue-600">DIV HAS BEEN CLICKED</p>
        )}
      </div>

      {/* Counter Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Count: {count}</h1>
        <button
          className="bg-amber-500 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-amber-600 text-white"
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>

      {/* Random Number Section */}
      <div className="space-y-2">
        <h1 className="text-xl">Random Number: {randomNumber}</h1>
        <button
          onClick={generateRandomNumber}
          className="bg-amber-500 px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-amber-600 text-white"
        >
          Generate Random Number
        </button>
      </div>
      
    </div>
  );
};

export default HookLearning;
