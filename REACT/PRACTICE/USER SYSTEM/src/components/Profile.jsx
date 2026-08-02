import useUserStore from "../store/useUserStore.js";
const Profile = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const imageUrl = user?.profilePic
    ? URL.createObjectURL(user.profilePic)
    : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            No User Registration
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please register to view your profile.
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${user.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-4 border-blue-50">
              {initials || "?"}
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Contact</span>
            <span className="text-sm text-gray-800">{user.contact}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">DOB</span>
            <span className="text-sm text-gray-800">{user.dob}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Gender</span>
            <span className="text-sm text-gray-800">{user.gender}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Country</span>
            <span className="text-sm text-gray-800">{user.country}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">
              Experience
            </span>
            <span className="text-sm text-gray-800">
              {user.experience} {user.experience === 1 ? "year" : "years"}
            </span>
          </div>

          {/* Skills */}
          <div className="border-b border-gray-100 pb-3">
            <span className="text-sm font-medium text-gray-500 block mb-2">
              Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">No skills added</span>
              )}
            </div>
          </div>

          {/* About */}
          <div className="pb-1">
            <span className="text-sm font-medium text-gray-500 block mb-1">
              About
            </span>
            <p className="text-sm text-gray-700 leading-relaxed">
              {user.about || (
                <span className="text-gray-400">No bio added yet.</span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={clearUser}
          className="w-full mt-6 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
