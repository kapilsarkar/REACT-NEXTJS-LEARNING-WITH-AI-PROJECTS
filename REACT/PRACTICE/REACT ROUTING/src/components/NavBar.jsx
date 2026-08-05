import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;

  const handleNavigateToAbout = () => {
    if (isLoggedIn) navigate("/about");
  };

  const products = ["a", "b", "c", "d", "e"];

  // Helper function for NavLink styling to avoid repeating code
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white shadow-lg rounded-xl mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Title */}
          <div className="shrink-0">
            <h2 className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              React Router DOM
            </h2>
          </div>

          {/* Main Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2">
            {/* Added 'end' prop here */}
            <NavLink to="/" end className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/help" className={getNavLinkClass}>
              Help
            </NavLink>
            <NavLink to="/registration" className={getNavLinkClass}>
              Registration
            </NavLink>
            <NavLink to="/login" className={getNavLinkClass}>
              Login
            </NavLink>

            {/* Dynamic Product Links */}
            <div className="flex items-center border-l border-slate-700 pl-2 space-x-1">
              {products.map((item) => (
                <NavLink
                  key={item}
                  to={`/contact/${item}`}
                  className={getNavLinkClass}
                >
                  {item.toUpperCase()}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Programmatic Navigation Button */}
          <button
            className="hidden lg:block bg-yellow-500 hover:bg-yellow-600 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0"
            onClick={handleNavigateToAbout}
          >
            Go to About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;