import { useEffect, useState } from "react";
import { supabase } from "../supabse-client.js";
import NewUserCard from "./NewUserCard.jsx";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    const fetchNewUser = async () => {
      const { data, error } = await supabase.from("newuser").select();

      if (error) {
        setFetchError("Could not fetch data");
        setNewUser(null);
        console.error(error);
      }
      if (data) {
        setNewUser(data);
        setFetchError(null);
      }
    };

    fetchNewUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Simple Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Smoothies</h2>
        <p className="text-sm text-gray-500">All available smoothie recipes.</p>
      </div>

      {/* Error Message */}
      {fetchError && <p className="text-red-500 text-sm mb-4">{fetchError}</p>}

      {/* Grid of Cards */}
      {newUser ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newUser.map((user) => (
            <NewUserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        !fetchError && <p className="text-gray-400 text-sm">Loading...</p>
      )}
    </div>
  );
};

export default Home;
