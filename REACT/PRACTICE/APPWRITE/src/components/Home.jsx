import { Link } from "react-router-dom";

const Home = () => {
  const navItems = [
    {
      to: "/register",
      title: "Register",
      badge: "Auth",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      description: "Create a new user account with automated verification email.",
      icon: "👤",
    },
    {
      to: "/login",
      title: "Login",
      badge: "Auth",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      description: "Sign in using email and password session management.",
      icon: "🔐",
    },
    {
      to: "/dashboard",
      title: "Dashboard",
      badge: "Database",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      description: "Manage your profile and perform full CRUD on your todos.",
      icon: "📋",
    },
    {
      to: "/storage",
      title: "File Storage",
      badge: "Storage",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
      description: "Upload, preview, download, and delete binary files via buckets.",
      icon: "📁",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Appwrite + React
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Appwrite Full-Stack Hub
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md mx-auto">
            Explore Authentication, Realtime Database Tables, and Cloud File Storage.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl" role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 flex items-center text-xs font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                Explore section &rarr;
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mt-10">
          React &bull; React Router &bull; Appwrite SDK &bull; Tailwind CSS
        </footer>
      </div>
    </div>
  );
};

export default Home;