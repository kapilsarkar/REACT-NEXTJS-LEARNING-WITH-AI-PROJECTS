import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "../appwrite/config.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Create account
      await account.create({
        userId: ID.unique(),
        email: email.trim(),
        password,
        name: name.trim(),
      });

      // 2. Log in (creates active session required for sending verification)
      await account.createEmailPasswordSession({
        email: email.trim(),
        password,
      });

      // 3. Send verification email pointing to your /verify route
      const verifyRedirectUrl = `${window.location.origin}/verify`;
      await account.createVerification({
        url: verifyRedirectUrl,
      });

      // 4. Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration/Verification error:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded-lg p-2 text-sm focus:outline-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded-lg p-2 text-sm focus:outline-blue-500"
        />

        <input
          type="password"
          placeholder="Password (min 8 chars)"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded-lg p-2 text-sm focus:outline-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
        >
          {loading ? "Registering & Sending Email..." : "Register"}
        </button>

        <p className="text-center text-xs text-gray-500">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;