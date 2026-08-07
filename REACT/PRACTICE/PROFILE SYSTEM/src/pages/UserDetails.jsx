import { useLoaderData, Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const user = useLoaderData();
  const { id } = useParams();

  // Extract initials for fallback avatar
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-6 px-4">
      {/* Detail Card Container */}
      <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        {/* Navigation Link */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            User ID:
          </span>
          <h2 className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg">
            #{id}
          </h2>
        </div>
        <h2 className=" text-lg text-white">USER ID : {id}</h2>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-800/80 pb-6 mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 text-2xl font-bold border border-indigo-500/20 shadow-lg ring-1 ring-indigo-500/30 shrink-0">
            {initials || "👤"}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {user.name}
            </h1>
            <p className="text-xs font-medium text-indigo-400 mt-1">
              ✉️ {user.email}
            </p>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact Details Card */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block border-b border-slate-800/80 pb-2">
              Contact Info
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                Phone
              </span>
              <p className="text-sm font-medium text-slate-200 mt-0.5">
                📞 {user.phone}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                Website
              </span>
              <p className="text-sm font-medium text-indigo-300 mt-0.5 truncate">
                🌐 {user.website}
              </p>
            </div>
          </div>

          {/* Company Details Card */}
          <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block border-b border-slate-800/80 pb-2">
              Company
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                Company Name
              </span>
              <p className="text-sm font-medium text-slate-200 mt-0.5">
                🏢 {user.company?.name}
              </p>
            </div>
          </div>

          {/* Address Details Card */}
          <div className="sm:col-span-2 bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block border-b border-slate-800/80 pb-2">
              Address
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                  Street
                </span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  📍 {user.address?.street}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                  City
                </span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  🏙️ {user.address?.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
