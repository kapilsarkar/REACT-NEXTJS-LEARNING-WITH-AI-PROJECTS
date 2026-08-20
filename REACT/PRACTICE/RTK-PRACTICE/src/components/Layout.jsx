import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;