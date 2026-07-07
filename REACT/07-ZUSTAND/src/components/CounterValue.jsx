import { useCounterStore } from "../store/counterStore.js";

const CounterValue = () => {
  const count = useCounterStore((state) => state.count);

  return (
    <>
      <div>
        <h2>Count : {count}</h2>
      </div>
    </>
  );
};

export default CounterValue;
