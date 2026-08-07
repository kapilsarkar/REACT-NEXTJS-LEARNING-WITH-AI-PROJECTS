import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Header Banner */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md py-6 text-center shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-1">
            Management Portal
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
            PROFILE SYSTEM
          </h2>
        </div>
      </header>

      {/* Navigation Bar */}
      <Navbar />

      {/* Dynamic Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <Outlet />
        </div>
      </main>

      {/* Footer Anchor */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/30 py-4 text-center text-xs text-slate-500">
        Profile System • React Router & Tailwind CSS Architecture
      </footer>
    </div>
  );
};

export default MainLayout;