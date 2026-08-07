import useUserStore from "../store/useUserStore.js";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const imageUrl = user?.profilePic
    ? URL.createObjectURL(user.profilePic)
    : null;

  if (!user) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400 mb-4">
            👤
          </div>
          <h2 className="text-xl font-bold text-white">
            No User Registration
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Please register or log in to view your profile details.
          </p>
        </div>
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-[85vh] items-center justify-center py-8 px-4">
      {/* Profile Card Container */}
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        {/* Avatar + Name Header */}
        <div className="flex flex-col items-center mb-6 border-b border-slate-800/80 pb-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${user.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/50"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl font-bold border-4 border-indigo-500/20 shadow-lg ring-2 ring-indigo-500/30">
              {initials || "?"}
            </div>
          )}
          <h2 className="text-2xl font-bold text-white mt-4 tracking-tight">
            {user.name}
          </h2>
          <span className="text-xs font-medium text-slate-400 mt-0.5">
            {user.email}
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-3.5">
          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </span>
            <span className="text-sm font-medium text-slate-200">
              {user.contact}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              DOB
            </span>
            <span className="text-sm font-medium text-slate-200">
              {user.dob}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Gender
            </span>
            <span className="text-sm font-medium text-slate-200">
              {user.gender}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Country
            </span>
            <span className="text-sm font-medium text-slate-200">
              {user.country}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Experience
            </span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              {user.experience} {user.experience === 1 ? "year" : "years"}
            </span>
          </div>

          {/* Skills */}
          <div className="border-b border-slate-800/60 pb-3.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {user.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">
                  No skills added
                </span>
              )}
            </div>
          </div>

          {/* About */}
          <div className="pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              About
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 border border-slate-800 p-3 rounded-xl">
              {user.about || (
                <span className="text-slate-500 italic">
                  No bio added yet.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={clearUser}
          className="w-full mt-6 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold py-3 text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.99]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;