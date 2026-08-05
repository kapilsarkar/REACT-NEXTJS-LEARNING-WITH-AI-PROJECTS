import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Help from "./components/Help.jsx";
import Registration from "./components/Registration.jsx";
import Layout from "./Layout.jsx";
import AboutOne from "./components/AboutOne.jsx";
import AboutTwo from "./components/AboutTwo.jsx";
import DetailedContact from "./components/DetailedContact.jsx";
import { Navigate } from "react-router-dom";
import ErrorPage from "./components/Error.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />, // 👈 Catches loader/runtime errors and bad URLs
      children: [
        {
          path: "/",
          element: <Home />,
          loader: async () => {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/users",
            );
            if (!response.ok) {
              throw new Error("Failed to fetch users");
            }
            return response.json();
          },
        },
        {
          path: "/about",
          element: <About />,
          children: [
            { index: true, element: <AboutOne /> }, // Shows at /about by default
            { path: "aboutOne", element: <AboutOne /> }, // ✅ Matches /about/aboutOne
            { path: "aboutTwo", element: <AboutTwo /> }, // ✅ Matches /about/aboutTwo
          ],
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "contact/:id", // Added dynamic route for /contact/a, /contact/b, etc.
          element: <DetailedContact />,
        },
        {
          path: "/help",
          element: <Help />,
        },
        {
          path: "/registration",
          element: <Registration />,
        },
        {
          path: "/login",
          element: <Navigate to="/registration" replace />, // 👈 Redirects URL to /registration
        },
        {
          path: "*", // 👈 Catch-all for undefined sub-paths inside Layout
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center  text-white px-2 py-3 bg-black">
        REACT ROUTING
      </h2>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
