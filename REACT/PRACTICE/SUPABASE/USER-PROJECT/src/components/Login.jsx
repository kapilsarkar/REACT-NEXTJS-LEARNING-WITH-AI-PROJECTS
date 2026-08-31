import { useState, useEffect } from "react";
import { supabase } from "../supabse-client.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);
    setSuccessMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      setFormError(error.message);
      return;
    }
    console.log(data);
    console.log("USER:", data.user);
    console.log("SESSION:", data.session);
    setSuccessMessage("Login successfull");
  };

  (useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log(error);
        return;
      }
      console.log("CURRENT SESSION :", data.session);
    };
    getSession();
  }),
    []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH EVENT:", event);
      console.log("AUTH SESSION:", session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Login</h2>

        <p className="text-sm text-gray-500 mb-6">
          Sign in with your email and password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter password"
            />
          </div>

          {formError && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded">
              {formError}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
