import React from "react";

const Button = ({ handleClick, children }) => {
  console.log(`Rendering Button ${children}`);
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
};

export default React.memo(Button);
