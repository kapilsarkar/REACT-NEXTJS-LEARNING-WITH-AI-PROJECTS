import useMyStore from "../store/store.js";

const NavBar = () => {
  const count = useMyStore((state) => state.count);
  const increment = useMyStore((state) => state.increment);
  const decrement = useMyStore((state) => state.decrement);
  const reset = useMyStore((state) => state.reset);
  const capitalizeName = useMyStore((state) => state.capitalizeName);
  const name = useMyStore((state) => state.name);
  return (
    <>
      <div>
        <h2>Nav - Bar</h2>
        <p>{name}</p>
        <p className=" text-center font-extrabold">{count}</p>
        <div className=" flex flex-wrap justify-center p-2 font-bold gap-2">
          <button
            className="bg-green-500 text-white rounded-2xl p-3 cursor-pointer"
            onClick={increment}
          >
            Increment +
          </button>
          <button
            className="bg-red-500 text-white rounded-2xl p-3 cursor-pointer"
            onClick={decrement}
          >
            Decrement -
          </button>
          <button
            className="bg-purple-500 text-white rounded-2xl p-3 cursor-pointer"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        <button
          className="bg-fuchsia-600 text-white rounded-2xl p-3 cursor-pointer"
          onClick={capitalizeName}
        >
          CapitaLize
        </button>
      </div>
    </>
  );
};

export default NavBar;
