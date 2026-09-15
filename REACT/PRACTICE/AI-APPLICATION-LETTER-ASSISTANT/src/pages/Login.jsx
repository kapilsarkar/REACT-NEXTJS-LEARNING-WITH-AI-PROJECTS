import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginSchema } from "../validation/authSchema.js";
import { supabase } from "../services/supabaseClient.js";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const returnPath = location.state?.from || "/create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onValidSubmit = async (data) => {
    setAuthError("");
    setLoading(true);

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setAuthError(
          "Your email address has not been confirmed yet. Please check your inbox and click the verification link."
        );
      } else {
        setAuthError(error.message);
      }
      return;
    }

    // Capture user metadata for the popup and open the modal
    setAuthenticatedUser(authData?.user);
    setShowSuccessModal(true);
  };

  const handleModalProceed = () => {
    setShowSuccessModal(false);
    navigate(returnPath, { replace: true });
  };

  return (
    <div className="relative mx-auto my-12 max-w-md rounded-lg border border-gray-300 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Log In</h2>

      {/* Error alert banner */}
      {authError && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          {authError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onValidSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={`rounded border p-2 text-sm outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`rounded border p-2 text-sm outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded bg-emerald-600 py-2 font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-emerald-600 hover:underline"
        >
          Create an account
        </Link>
      </p>

      {/* POPUP LOGIN SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl">
            {/* Checkmark Icon */}
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
              ✓
            </div>

            <h3 className="text-lg font-extrabold text-slate-950">
              Login Successful!
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Welcome back
              {authenticatedUser?.user_metadata?.full_name ? (
                <>
                  ,{" "}
                  <span className="font-bold text-slate-900">
                    {authenticatedUser.user_metadata.full_name}
                  </span>
                </>
              ) : null}
              !
            </p>

            <p className="mt-1 text-xs text-slate-500">
              You are signed in as{" "}
              <span className="font-medium text-slate-700">
                {authenticatedUser?.email}
              </span>
              .
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleModalProceed}
                className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 transition"
              >
                Continue to Application →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;