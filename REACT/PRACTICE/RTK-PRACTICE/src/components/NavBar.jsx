import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <ul className="flex gap-2">
          <li>
            <NavLink to="/" end className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className={linkClasses}>
              Products
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;