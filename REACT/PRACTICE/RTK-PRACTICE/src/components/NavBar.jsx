import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle"; // Adjust path if ThemeToggle is in another directory

const NavBar = ({ onOpenCart }) => {
  // Read cart item count from Redux store
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Navigation Links */}
        <ul className="flex items-center gap-2">
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

        {/* Right: Actions (Theme Toggle & Cart Button) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 rounded-full cursor-pointer px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <span>🛒 Cart</span>
            <span className="bg-white text-indigo-900 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums">
              {totalCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;