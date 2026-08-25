import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/config.js";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
        if (isMounted) {
          setUser(currentUser);
          setLoading(false);
        }
      } catch (error) {
        console.log("Auth check error:", error);
        if (isMounted) {
          navigate("/login");
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-6 max-w-4xl w-full mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            User Profile
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm font-medium text-gray-500">Name</span>
              <span className="text-sm font-semibold text-gray-800">
                {user?.name || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <span className="text-sm font-semibold text-gray-800">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
