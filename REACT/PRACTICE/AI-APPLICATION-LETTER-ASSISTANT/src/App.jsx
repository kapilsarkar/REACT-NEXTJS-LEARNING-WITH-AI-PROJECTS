import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Layout from "./pages/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreateApplication from "./pages/CreateApplication.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, //Root Layout Component
    errorElement: <ErrorPage />, // Global Error Boundary (404s + Runtime errors)
    children: [
      {
        index: true, // Default view for "/"
        element: <LandingPage />,
      },
      {
        path: "create",
        element: <CreateApplication />,
      },
      
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
