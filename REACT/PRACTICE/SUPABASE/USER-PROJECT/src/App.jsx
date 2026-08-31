import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./supabse-client.js";
import Home from "./components/Home.jsx";
import Create from "./components/Create.jsx";
import Update from "./components/Update.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }

      console.log("GET SESSION:", data.session);
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("AUTH SESSION:", session);

        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("APP SESSION:", session);
  }, [session]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BrowserRouter>
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-indigo-600">
                User Data
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                USER-SYSTEM
              </span>
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/"
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                to="/signup"
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Sign Up
              </Link>
              <Link
                to="/create"
                className="px-3.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-500/20 transition-colors"
              >
                Create New Smoothie
              </Link>
              {!session && (
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-500/20 transition-colors"
                >
                  Login
                </Link>
              )}
              {session && (
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:id" element={<Update />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
