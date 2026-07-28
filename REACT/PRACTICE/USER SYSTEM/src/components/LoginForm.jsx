const LoginForm = ({ setIsRegistered }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          LOGIN
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="userId"
              className="text-sm font-medium text-gray-600"
            >
              User ID :
            </label>
            <input
              id="userId"
              type="text"
              placeholder="Enter Your User-ID"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password :
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Login
          </button>

          <p
            onClick={() => setIsRegistered(false)}
            className="text-center text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
          >
            Don't have an Account -{" "}
            <span className="font-medium underline">Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
