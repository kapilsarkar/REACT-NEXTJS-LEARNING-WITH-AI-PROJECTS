import { useState } from "react";

const ReactHookForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name);
    console.log(age);
    console.log(password);
  };

  return (
    <>
      <h1 className="mt-2  text-6xl font-extrabold text-white">React Hook Form Zod Validation</h1>
      <div className=" flex justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            Name :
            <input
              type="text"
              className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            Age :
            <input
              type="number"
              className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            Password :
            <input
              className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="cursor-pointer rounded-xl bg-emerald-500 px-3 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ReactHookForm;
