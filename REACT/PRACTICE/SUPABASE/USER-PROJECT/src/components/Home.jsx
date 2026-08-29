import { useEffect, useState } from "react";
import { supabase } from "../supabse-client.js";
import NewUserCard from "./NewUserCard.jsx";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewUser = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("newuser").select();

      if (error) {
        setFetchError("Could not fetch data from database.");
        setNewUser(null);
        console.error(error);
      }
      if (data) {
        setNewUser(data);
        setFetchError(null);
      }
      setIsLoading(false);
    };

    fetchNewUser();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            User Directory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage, view, and monitor registered user profiles.
          </p>
        </div>

        {newUser && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Total Records: {newUser.length}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div>
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 animate-pulse shadow-sm"
              >
                <div className="h-6 bg-slate-200 rounded-md w-2/3"></div>
                <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                <div className="h-4 bg-slate-100 rounded-md w-4/5"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {fetchError && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-700">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
              !
            </div>
            <p className="text-sm font-semibold">{fetchError}</p>
            <p className="text-xs text-rose-500 mt-1">
              Please check your database connection or try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !fetchError && newUser && newUser.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
            <p className="text-base font-medium text-slate-700">No users found</p>
            <p className="text-xs text-slate-400 mt-1">
              Start by creating a new entry from the navigation bar.
            </p>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && newUser && newUser.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newUser.map((user) => (
              <NewUserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;