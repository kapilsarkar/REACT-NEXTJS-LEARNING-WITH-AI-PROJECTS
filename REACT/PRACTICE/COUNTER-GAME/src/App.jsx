import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <h2 className="font-bold text-center px-3 py-3">
        Counter App
      </h2>

      <h3 className="font-bold text-center px-3 py-3">
        Count: {count}
      </h3>

      <div className="flex justify-center px-3 py-3 gap-2">
        <button onClick={handleIncrement}>
          Increment
        </button>

        <button onClick={handleDecrement}>
          Decrement
        </button>
      </div>
    </>
  );
}

export default App;