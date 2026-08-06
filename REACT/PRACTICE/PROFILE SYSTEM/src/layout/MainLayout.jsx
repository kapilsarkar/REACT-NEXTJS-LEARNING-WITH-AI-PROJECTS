import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="py-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            PROFILE SYSTEM
          </h2>
        </header>

        <Navbar />

        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
