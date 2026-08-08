import { useEffect, useRef } from "react";
import { useLoaderData, Link } from "react-router-dom";

const DashBoard = () => {
  // Safely fallback to an empty array if data isn't loaded yet
  const users = useLoaderData() || [];

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header & Overview Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Overview of user accounts loaded via React Router Loader.
          </p>
        </div>
        <input
          ref={focusRef}
          type="text"
          placeholder="Search Users By Name..."
          className="border border-slate-700  rounded-lg px-3 py-2 text-black font-bold"
        />
        <div className="flex items-center gap-2.5 self-start sm:self-auto bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
            Total Users
          </span>
          <span className="text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
            {users.length}
          </span>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/50 hover:bg-slate-900 hover:shadow-indigo-500/10"
          >
            <div>
              {/* ID Badge & Username */}
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                  #{user.id}
                </span>
                {user.username && (
                  <span className="text-xs text-slate-500 font-mono">
                    @{user.username}
                  </span>
                )}
              </div>

              {/* Name & Primary Info */}
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                {user.name}
              </h3>

              {user.email && (
                <p className="text-xs text-slate-400 mt-1 truncate">
                  {user.email}
                </p>
              )}

              {user.company?.name && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <span>🏢</span>
                  <span className="truncate">{user.company.name}</span>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
              <Link
                to={`/user/${user.id}`}
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                View Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
