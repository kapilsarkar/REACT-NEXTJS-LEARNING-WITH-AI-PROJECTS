import Counter from "./Counter.jsx";
import Name from "./Name.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Home = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-sm mx-auto mb-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Redux Toolkit Playground
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Counter and name state, managed with RTK
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row md:justify-center gap-6">
        <Counter />
        <Name />
      </div>
    </div>
  );
};

export default Home;