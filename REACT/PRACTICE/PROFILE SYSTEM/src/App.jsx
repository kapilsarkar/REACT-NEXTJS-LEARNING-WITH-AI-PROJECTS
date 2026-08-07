import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import "./App.css";
import UserDetails from "./pages/UserDetails.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Root Layout Component
    errorElement: <NotFound />, // Global Error Boundary (404s + Runtime errors)

    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: async () => {
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          if (!res.ok) throw new Error("Failed to Load Users");
          return res.json();
        },
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "user/:id",
        element: <UserDetails />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${params.id}`,
          );

          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }

          return res.json();
        },
      },
      {
        path: "*", // 👈 Catch-all for undefined sub-paths inside Layout
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Router Viewport Layer */}
      <div className="relative z-10">
        <RouterProvider router={appRouter} />
      </div>
    </div>
  );
}

export default App;
