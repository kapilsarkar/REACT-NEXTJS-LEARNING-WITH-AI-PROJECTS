import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import Error from "./components/Error.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Products from "./components/Products.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Products />,
      },
    ],
  },
]);

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return <RouterProvider router={appRouter} />;
}

export default App;
