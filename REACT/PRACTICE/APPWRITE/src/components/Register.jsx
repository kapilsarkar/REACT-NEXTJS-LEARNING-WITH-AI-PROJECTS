import { useState } from "react";
import { ID } from "appwrite";
import { account } from "../appwrite/config.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert("Please fill in all details");
      return;
    }

    setLoading(true);

    try {
      // 1. Create account
      const response = await account.create(ID.unique(), email, password, name);
      console.log("Account created:", response);

      // 2. Create session (log in)
      await account.createEmailPasswordSession(email, password);
      alert("Registered successfully!");
    } catch (err) {
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
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2 text-sm focus:outline-blue-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2 text-sm focus:outline-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 8 chars)"
          minLength={8}
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2 text-sm focus:outline-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
        >
          {loading ? "Signing up..." : "Register"}
        </button>

        <p className="text-center text-xs text-gray-500">
          Already registered?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
