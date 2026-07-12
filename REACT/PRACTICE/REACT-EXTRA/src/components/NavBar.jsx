import useMyStore from "../store/store.js";

const NavBar = () => {
  const state = useMyStore();

  const handleIncrement = () => {
    state.increment();
  };
  const handleDecrement = () => {
    state.decrement();
  };
  const handleReset = () => {
    state.reset();
  };
  return (
    <>
      <div>
        <h2>Nav - Bar</h2>
        <p>{state.name}</p>
        <p className=" text-center font-extrabold">{state.count}</p>
        <div className=" flex flex-wrap justify-center p-2 font-bold gap-2">
          <button
            className="bg-green-500 text-white rounded-2xl p-3 cursor-pointer"
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            className="bg-red-500 text-white rounded-2xl p-3 cursor-pointer"
            onClick={handleDecrement}
          >
            Decrement
          </button>
          <button
            className="bg-purple-500 text-white rounded-2xl p-3 cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
