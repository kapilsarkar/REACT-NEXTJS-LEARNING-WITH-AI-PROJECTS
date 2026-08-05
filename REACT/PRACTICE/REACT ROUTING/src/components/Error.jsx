// src/components/ErrorPage.jsx
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 shadow-2xl">
        <span className="text-5xl font-extrabold text-red-500 mb-4 block">
          {error?.status || "404"}
        </span>
        <h1 className="text-2xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">
          {error?.statusText || error?.message || "The page you are looking for does not exist."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer"
        >
          Return to Safety (Home)
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;