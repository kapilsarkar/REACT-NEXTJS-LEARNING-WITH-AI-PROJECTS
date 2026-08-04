import { Outlet, NavLink } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of our application.</p>

      <nav className="flex gap-4 my-4">
        <NavLink
          to="aboutOne"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "text-slate-300"
          }
        >
          About One
        </NavLink>
        <NavLink
          to="aboutTwo"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "text-slate-300"
          }
        >
          About Two
        </NavLink>
      </nav>

      <Outlet />
      <p>Welcome to About Footer</p>
    </div>
  );
};

export default About;