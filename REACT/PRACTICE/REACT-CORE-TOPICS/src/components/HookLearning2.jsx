import { useState, useCallback, useMemo } from "react"; // Fixed import
import HookLearning2Title from "./HookLearning2Title";
import Button from "./Button";
import ShowCount from "./ShowCount";

const HookLearning2 = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const incrementByOne = useCallback(() => {
    setCount1((prevCount) => prevCount + 1);
  }, []);

  const incrementByFive = useCallback(() => {
    setCount2((prevCount) => prevCount + 5);
  }, []);

  const isEvenOrOdd = useMemo(() => {
    let i = 0;
    while (i < 1000) i += 1;
    return count1 % 2 === 0;
  }, [count1]);

  return (
    <div>
      <h1>Hook Learning 2</h1>
      <HookLearning2Title />

      <div className="flex justify-center px-2 py-3 gap-1">
        <ShowCount count={count1} title="Counter-1" />
        <span>{isEvenOrOdd ? "Even" : "Odd"}</span>
        {/* Added button text */}
        <Button handleClick={incrementByOne}>Increment By One</Button>
        <ShowCount count={count2} title="Counter-2" />
        <Button handleClick={incrementByFive}>Increment By Five</Button>
      </div>
    </div>
  );
};

export default HookLearning2;
