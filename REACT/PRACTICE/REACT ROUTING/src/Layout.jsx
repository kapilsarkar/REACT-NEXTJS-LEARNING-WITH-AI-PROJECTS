import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <NavBar />
      
      {/* Page content container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-800">
        React Router Architecture Demo
      </footer>
    </div>
  );
};

export default Layout;