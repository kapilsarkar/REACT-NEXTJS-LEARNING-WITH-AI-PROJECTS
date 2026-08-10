import {useCounter} from "../hooks/useCounter";

const MyCounter = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <h1>My Counter: Using Custom Hook</h1>
      <h2>Count :{count}</h2>
      <button onClick={increment}>Increment + </button>
      <button onClick={decrement}>Decrement - </button>
    </div>
  );
};

export default MyCounter;
