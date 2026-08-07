import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(3, "Minimum Length Should be three")
    .max(20, "Maximum Length should be 20"),
  password: z
    .string()
    .min(5, "Minimum Length Should be 5")
    .max(20, "Maximum Length Should be 20")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[a-z]/, "One lowercase required")
    .regex(/[0-9]/, "One number required"),
});

const LoginForm = ({ setIsRegistered }) => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const submitForm = (data) => {
    console.log(data);
    setSuccess(true);
    reset();
    navigate("/dashboard");
  };

  useEffect(() => {
    if (success === true) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  return (
    <div className="flex min-h-[75vh] items-center justify-center py-8 px-4">
      {/* Login Card Container */}
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-6 tracking-wide">
          LOGIN
        </h2>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* User ID */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="userId"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              User ID :
            </label>
            <input
              id="userId"
              type="text"
              placeholder="Enter Your User-ID"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              {...register("userId")}
            />
            {errors.userId && (
              <span className="text-xs text-red-400 font-medium">
                {errors?.userId.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Password :
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              {...register("password")}
            />
            {errors?.password && (
              <span className="text-xs text-red-400 font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Success Banner */}
          {success && (
            <p className="text-xs font-semibold text-emerald-400 text-center bg-emerald-500/10 border border-emerald-500/20 py-2.5 rounded-xl">
              Login Successful
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 cursor-pointer active:scale-[0.99] mt-2"
          >
            Login
          </button>

          {/* Register Link */}
          <p
            onClick={() => setIsRegistered(false)}
            className="text-center text-xs text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors mt-3"
          >
            Don't have an Account -{" "}
            <span className="font-semibold text-indigo-400 underline">Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;