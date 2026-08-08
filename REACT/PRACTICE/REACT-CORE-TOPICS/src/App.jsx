import "./App.css";
import CapitalizeName from "./components/CapitalizeName";
import CounterApp from "./components/CounterApp";
import ReactHookForm from "./components/ReactHookForm";
import Form from "./components/Form";
import ZodForm from "./components/ZodForm";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Help from "./components/Help.jsx";
import DetailedContact from "./components/DetailedContact.jsx";
import { Navigate } from "react-router-dom";
import Registration from "./components/Registration.jsx";
import AboutOne from "./components/AboutOne.jsx";
import AboutTwo from "./components/AboutTwo.jsx";
import HookLearning from "./components/HookLearning.jsx";

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white p-5 rounded-2xl">
      <div className="absolute inset-0 p-5 rounded-2xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-5 sm:px-8">
        <header className="mb-5 flex items-center justify-between border-b border-white/10 pb-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">
              React Extra Topics
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              State Management{" "}
              <span className="text-indigo-400">with Zustand</span>
            </h1>
          </div>

          <div className="hidden rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 sm:block">
            Zustand Demo
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center">
          <CounterApp />
        </section>
        <section className="min-h-screen  from-slate-950 via-indigo-950 to-violet-950 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <CapitalizeName />
          </div>
        </section>
        <section className="min-h-screen  from-slate-950 via-indigo-950 to-violet-950 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <h1 className="mt-2  text-6xl font-extrabold text-white">
              React Simple Form
            </h1>
          </div>
          <div className="mx-auto flex max-w-6xl justify-center">
            <ReactHookForm />
          </div>
        </section>
        <section className="min-h-screen  from-slate-950 via-indigo-950 to-violet-950 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <h1 className="mt-2  text-6xl font-extrabold text-white">
              React Hook Form
            </h1>
          </div>
          <Form />
        </section>
        <section className="min-h-screen  from-slate-950 via-indigo-950 to-violet-950 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <h1 className="mt-2  text-6xl font-extrabold text-white">
              React Hook Form/ZOD Validation
            </h1>
          </div>
          <ZodForm />
        </section>
        <section className="min-h-screen  from-slate-950 via-indigo-950 to-violet-950 px-4 py-12 sm:px-6 lg:px-8">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />}>
              <Route index element={<AboutOne />} />
              <Route path="aboutOne" element={<AboutOne />} />
              <Route path="aboutTwo" element={<AboutTwo />} />
            </Route>
            <Route path="/contact/" element={<Contact />} />
            <Route path="/contact/:id" element={<DetailedContact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/login"
              element={<Navigate to={"/registration"} replace />}
            />
          </Routes>
        </section>
        <section className="min-h-screen  from-slate-950 via-indigo-950 to-violet-950 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <HookLearning />
          </div>
        </section>
        <footer className="mt-10 text-center text-sm text-slate-400">
          A simple, fast, and elegant state-management example.
        </footer>
      </div>
    </main>
  );
}

export default App;
