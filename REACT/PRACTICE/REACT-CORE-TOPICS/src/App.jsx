import "./App.css";
import CounterApp from "./components/CounterApp";

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white p-5 rounded-2xl">
      <div className="absolute inset-0 p-5 rounded-2xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-5 sm:px-8">
        <header className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">
              React Extra Topics
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              State Management <span className="text-indigo-400">with Zustand</span>
            </h1>
          </div>

          <div className="hidden rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 sm:block">
            Zustand Demo
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center">
          <CounterApp />
        </section>

        <footer className="mt-10 text-center text-sm text-slate-400">
          A simple, fast, and elegant state-management example.
        </footer>
      </div>
    </main>
  );
}

export default App;