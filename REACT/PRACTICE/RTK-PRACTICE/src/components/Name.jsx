import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store/features/counter/counterSlice";

const Name = () => {
  const stateName = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState("");

  const handleUpdateName = () => {
    if (inputName.trim() !== "") {
      dispatch(changeName(inputName));
      setInputName("");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-6 rounded-2xl border border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-colors">
      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Name
      </h1>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Active name:{" "}
        <span className="font-medium text-slate-800 dark:text-slate-100">
          {stateName || "No name set"}
        </span>
      </p>

      <div className="mt-5">
        <label
          htmlFor="nameInput"
          className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
        >
          Update name
        </label>
        <div className="flex gap-2">
          <input
            id="nameInput"
            type="text"
            value={inputName}
            placeholder="Type a name..."
            onChange={(e) => setInputName(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 outline-none focus:border-slate-500 dark:focus:border-slate-400 focus:ring-1 focus:ring-slate-500 dark:focus:ring-slate-400"
          />
          <button
            onClick={handleUpdateName}
            className="rounded-lg cursor-pointer bg-slate-900 dark:bg-slate-100 px-4 py-2 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Name;