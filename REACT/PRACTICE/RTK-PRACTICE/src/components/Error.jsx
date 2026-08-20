import { useRouteError, Link } from "react-router";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-sm text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {error?.statusText || error?.message || "An unexpected error occurred."}
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full px-4 py-2 text-sm font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;