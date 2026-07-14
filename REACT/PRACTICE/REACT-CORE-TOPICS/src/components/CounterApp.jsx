import useCounterStore from "../store/counter.js";

const CounterApp = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <>
      <div>
        <h2>Counter-App(Zustand)</h2>
        <h3>{count}</h3>
        <div>
          <button onClick={increment}>Increment(+)</button>
          <button onClick={decrement}>Decrement(-)</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default CounterApp;
