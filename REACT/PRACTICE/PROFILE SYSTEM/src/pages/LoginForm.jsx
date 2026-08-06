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
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          LOGIN
        </h2>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
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
              {...register("userId")}
            />
            {errors.userId && (
              <span className="text-xs text-red-500">
                {errors?.userId.message}
              </span>
            )}
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
              {...register("password")}
            />
            {errors?.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          {success && (
            <p className="text-green-600 text-center">Login SuccessFull</p>
          )}

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
