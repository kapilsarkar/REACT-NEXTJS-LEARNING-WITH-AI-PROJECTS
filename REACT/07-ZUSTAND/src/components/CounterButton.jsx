import { useCounterStore } from "../store/counterStore.js";

const CounterButton = () => {
  const { increase, decrease, reset, count } = useCounterStore();
  return (
    <>
      <div>
        <h2>Counter Button</h2>
        <p>Count: {count}</p>
        <button onClick={decrease}> - </button>
        <button onClick={increase}> + </button>
        <button onClick={reset}>RESET</button>
      </div>
    </>
  );
};

export default CounterButton;
