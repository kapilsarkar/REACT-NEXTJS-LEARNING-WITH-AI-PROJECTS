import { Outlet, NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h1 className="text-2xl font-bold text-white mb-2">About Page</h1>
      <p className="text-slate-400">This is the about page of our application.</p>

      <nav className="flex gap-4 my-4 border-b border-slate-700 pb-3">
        {/* 'to=""' points to /about itself, and 'end' ensures it doesn't stay active on /about/aboutTwo */}
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold underline"
              : "text-slate-300 hover:text-white"
          }
        >
          About One
        </NavLink>

        <NavLink
          to="aboutTwo"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold underline"
              : "text-slate-300 hover:text-white"
          }
        >
          About Two
        </NavLink>
      </nav>

      <div className="my-4 p-4 bg-slate-800 rounded-lg">
        <Outlet />
      </div>

      <p className="text-xs text-slate-500 mt-6">Welcome to About Footer</p>
    </div>
  );
};

export default About;