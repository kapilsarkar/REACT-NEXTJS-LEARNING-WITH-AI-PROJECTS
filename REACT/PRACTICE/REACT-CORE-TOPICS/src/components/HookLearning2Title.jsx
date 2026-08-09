import React from "react";
const HookLearning2Title = () => {
  console.log("Rendering Title For Hook Learning2");
  return (
    <div>
      <h2>useCallBack and useMemo Tutorial</h2>
    </div>
  );
};

export default React.memo(HookLearning2Title);
