import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store/features/counter/counterSlice";

const Name = () => {
  const stateName = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl transition-all">
      <h2 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-800 pb-3">
        User Profile
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Active Name
          </label>
          <div className="text-lg font-semibold text-indigo-400 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800">
            {stateName || "No name set"}
          </div>
        </div>

        <div>
          <label
            htmlFor="nameInput"
            className="block text-xs font-medium text-slate-300 mb-1.5"
          >
            Update Name
          </label>
          <input
            id="nameInput"
            type="text"
            value={stateName}
            placeholder="Type a name..."
            onChange={(e) => dispatch(changeName(e.target.value))}
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Name;