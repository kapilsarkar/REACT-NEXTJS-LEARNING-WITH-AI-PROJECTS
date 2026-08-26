import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID, Query } from "appwrite";
import { account, tablesDB } from "../appwrite/config.js";

const Dashboard = () => {
  // -----------------------------
  // React State
  // -----------------------------

  const [user, setUser] = useState(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // -----------------------------
  // Appwrite IDs
  // -----------------------------

  const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;

  const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

  // -----------------------------
  // Check Authentication
  // -----------------------------

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Get currently logged-in user
        const currentUser = await account.get();

        console.log("Current user:", currentUser);

        // 2. Save user in React state
        setUser(currentUser);

        // 3. Fetch this user's todos
        const response = await tablesDB.listRows({
          databaseId: DB_ID,
          tableId: TABLE_ID,
          queries: [
            Query.equal("email", currentUser.email),
            Query.orderDesc("$createdAt"),
          ],
        });

        console.log("Fetched todos:", response.rows);

        // 4. Save todos in React state
        setTodos(response.rows);
      } catch (error) {
        console.error("Authentication / Todo error:", error);

        // User is not logged in
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, DB_ID, TABLE_ID]);

  // -----------------------------
  // Add Todo
  // -----------------------------

  const addTodo = async (e) => {
    e.preventDefault();

    // Don't allow empty todo
    if (!todo.trim()) {
      alert("Please enter a todo");
      return;
    }

    // Make sure user exists
    if (!user) {
      alert("User not found");
      return;
    }

    try {
      const response = await tablesDB.createRow({
        databaseId: DB_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),

        data: {
          email: user.email,
          todo: todo.trim(),
        },
      });

      console.log("Todo created:", response);

      // Add new todo to UI
      setTodos((prev) => [response, ...prev]);

      // Clear input
      setTodo("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // -----------------------------
  // Update Todo
  // -----------------------------

  const updateTodo = async (rowId, currentText) => {
    const newText = prompt("Update your todo:", currentText);

    if (!newText || !newText.trim() || newText.trim() === currentText) {
      return;
    }

    try {
      const response = await tablesDB.updateRow({
        databaseId: DB_ID,
        tableId: TABLE_ID,
        rowId: rowId,
        data: {
          todo: newText.trim(),
        },
      });

      console.log("Todo updated successfully:", response);

      // Update state with modified todo
      setTodos((prev) =>
        prev.map((item) => (item.$id === rowId ? response : item))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // -----------------------------
  // Delete Todo
  // -----------------------------

  const deleteTodo = async (rowId) => {
    console.log("Deleting row:", rowId);

    try {
      await tablesDB.deleteRow({
        databaseId: DB_ID,
        tableId: TABLE_ID,
        rowId: rowId,
      });

      console.log("Todo deleted successfully");

      // Remove deleted todo from UI
      setTodos((prev) => prev.filter((item) => item.$id !== rowId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // -----------------------------
  // Logout
  // -----------------------------

  const handleLogout = async () => {
    try {
      await account.deleteSession({
        sessionId: "current",
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // -----------------------------
  // Loading Screen
  // -----------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  // -----------------------------
  // Dashboard UI
  // -----------------------------

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      {/* Main */}

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* User Profile */}

        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            User Profile
          </h2>

          <p className="mb-2 text-sm text-gray-600">
            <strong className="text-gray-800">Name:</strong>{" "}
            {user?.name || "N/A"}
          </p>

          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Email:</strong>{" "}
            {user?.email || "N/A"}
          </p>
        </section>

        {/* Add Todo */}

        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add New Todo
          </h2>

          <form onSubmit={addTodo} className="flex gap-2">
            <input
              type="text"
              placeholder="Add your todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 text-sm"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg"
            >
              Add Todo
            </button>
          </form>
        </section>

        {/* Todo List */}

        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Your Todos
          </h2>

          {todos.length === 0 ? (
            <p className="text-sm text-gray-400">
              No todos yet. Add one above!
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {todos.map((item) => (
                <li
                  key={item.$id}
                  className="py-3 flex justify-between items-center gap-4"
                >
                  <span className="text-sm text-gray-800 break-all">
                    {item.todo}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateTodo(item.$id, item.todo)}
                      className="text-xs text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTodo(item.$id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;