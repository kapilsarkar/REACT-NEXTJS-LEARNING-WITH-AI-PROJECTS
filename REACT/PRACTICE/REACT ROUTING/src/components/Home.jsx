// src/components/Home.jsx
import { useLoaderData } from "react-router-dom";

const Home = () => {
  // Data is guaranteed to be ready when the component renders!
  const users = useLoaderData();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Home Page</h1>
        <p className="text-slate-400 text-sm mt-1">
          Users pre-loaded via React Router Data Loader:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-5 rounded-xl border border-indigo-500/20 bg-slate-900/60 shadow-lg backdrop-blur-sm hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs">
                {user.id}
              </span>
              <h3 className="font-bold text-white text-base">{user.name}</h3>
            </div>
            <p className="text-xs text-slate-400 mb-1">@{user.username}</p>
            <p className="text-xs text-indigo-300 truncate">{user.email}</p>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              🏢 {user.company?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
