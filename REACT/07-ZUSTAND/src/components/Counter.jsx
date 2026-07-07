import { useCounterStore } from "../store/counterStore.js";

const Counter = () => {
  const increase = useCounterStore((state)=> state.increase);
  const decrease = useCounterStore((state)=> state.decrease);
  return (
    <>
      <div>
       
        <button onClick={decrease}> - </button>
        <button onClick={increase}> + </button>
        
      </div>
    </>
  );
};

export default Counter;
