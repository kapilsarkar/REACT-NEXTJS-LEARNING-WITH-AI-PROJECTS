import { useEffect, useState } from "react";
import { supabase } from "../supabse-client.js";
import NewUserCard from "./NewUserCard.jsx";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setNewUser((prevNewUser) => prevNewUser.filter((item) => item.id !== id));
  };

  useEffect(() => {
  const fetchNewUser = async () => {
    const {
      data: { user },
      error: useError,
    } = await supabase.auth.getUser();

    if (useError || !user) {
      setFetchError("You must be logged in to view your data.");
      setNewUser(null);
      return;
    }

    const { data, error } = await supabase
      .from("newuser")
      .select()
      .eq("user_id", user.id)
      .order(orderBy, { ascending: false });

    if (error) {
      setFetchError("Could not fetch data");
      setNewUser(null);
      console.error(error);
      return;
    }

    setNewUser(data);
    setFetchError(null);
  };

  fetchNewUser();
}, [orderBy]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Smoothies</h2>
        <p className="text-sm text-gray-500">
          All available data is listed below.
        </p>
      </div>

      {/* Order By Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
          Order by:
        </span>
        <button
          type="button"
          onClick={() => setOrderBy("created_at")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
            orderBy === "created_at"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Time Created
        </button>
        <button
          type="button"
          onClick={() => setOrderBy("title")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
            orderBy === "title"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Title
        </button>
        <button
          type="button"
          onClick={() => setOrderBy("rating")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
            orderBy === "rating"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Rating
        </button>
      </div>

      {/* Error Message */}
      {fetchError && <p className="text-red-500 text-sm mb-4">{fetchError}</p>}

      {/* List / Cards */}
      {newUser ? (
        newUser.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newUser.map((user) => (
              <NewUserCard key={user.id} user={user} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No Data found. Add one to get started!
          </p>
        )
      ) : (
        !fetchError && <p className="text-gray-400 text-sm">Loading...</p>
      )}
    </div>
  );
};

export default Home;