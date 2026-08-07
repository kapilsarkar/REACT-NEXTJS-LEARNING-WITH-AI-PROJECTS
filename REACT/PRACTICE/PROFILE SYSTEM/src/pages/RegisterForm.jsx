import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import useUserStore from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const registrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Minimum Length Should be 3")
      .max(20, "Maximum Length Should be 20"),

    contact: z
      .string()
      .trim()
      .min(1, "Contact number is required")
      .regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),

    email: z.string().min(1, "E-Mail is required").email("E-Mail is Invalid"),

    password: z
      .string()
      .min(5, "Minimum Length Should be 5")
      .max(20, "Maximum Length Should be 20")
      .regex(/[A-Z]/, "One uppercase required")
      .regex(/[a-z]/, "One lowercase required")
      .regex(/[0-9]/, "One number required"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => {
        const birthDate = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age >= 18 && age <= 60;
      }, "Age must be between 18 and 60 years old"),

    gender: z
      .string({ required_error: "Please select a gender" })
      .min(1, "Please select a gender"),

    country: z.string().min(1, "Please select a country"),

    skills: z.array(z.string()).min(1, "Select at least one skill"),

    about: z.string().trim().max(300, "Maximum 300 characters").optional(),

    profilePic: z
      .any()
      .refine((files) => files?.length > 0, "Profile picture is required")
      .refine(
        (files) => files?.[0]?.size <= 2 * 1024 * 1024,
        "Max file size is 2MB",
      )
      .refine(
        (files) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            files?.[0]?.type,
          ),
        "Only .jpg, .jpeg, .png, and .webp formats are supported",
      ),

    experience: z.coerce
      .number()
      .min(0, "Experience cannot be negative")
      .max(10, "Maximum experience is 10 years"),

    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = ({ setIsRegistered }) => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
      country: "",
      skills: [],
      about: "",
      experience: 0,
      terms: false,
    },
    resolver: zodResolver(registrationSchema),
  });

  const experienceValue = useWatch({
    control,
    name: "experience",
    defaultValue: 0,
  });

  const registrationForm = (data) => {
    const updatedData = {
      ...data,
      profilePic: data.profilePic[0],
    };

    setUser(updatedData);
    reset();
    navigate("/profile");
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center py-8 px-4">
      {/* Form Container Card */}
      <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-1">
            Create Account
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            REGISTRATION
          </h2>
        </div>

        <form onSubmit={handleSubmit(registrationForm)} className="space-y-5">
          {/* 2-Column Grid for Name & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                placeholder="10 digit mobile number"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                {...register("contact")}
              />
              {errors.contact && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.contact.message}
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Grid for Email & DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* E-Mail */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* DOB */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="dob"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all [color-scheme:dark]"
                {...register("dob")}
              />
              {errors.dob && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.dob.message}
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Grid for Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Grid for Gender & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gender */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Gender
              </label>
              <div className="flex items-center gap-6 h-[42px] px-3.5 bg-slate-800/80 border border-slate-700/80 rounded-xl">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="Male"
                    value="Male"
                    className="accent-indigo-500 cursor-pointer h-4 w-4"
                    {...register("gender")}
                  />
                  <label
                    htmlFor="Male"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="Female"
                    value="Female"
                    className="accent-indigo-500 cursor-pointer h-4 w-4"
                    {...register("gender")}
                  />
                  <label
                    htmlFor="Female"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Female
                  </label>
                </div>
              </div>
              {errors.gender && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.gender.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="country"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Country
              </label>
              <select
                id="country"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer"
                {...register("country")}
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">
                  Select Your Country
                </option>
                <option value="India" className="bg-slate-900 text-white">
                  India
                </option>
                <option value="United States" className="bg-slate-900 text-white">
                  United States
                </option>
                <option value="United Kingdom" className="bg-slate-900 text-white">
                  United Kingdom
                </option>
                <option value="Canada" className="bg-slate-900 text-white">
                  Canada
                </option>
                <option value="Australia" className="bg-slate-900 text-white">
                  Australia
                </option>
              </select>
              {errors.country && (
                <span className="text-xs text-red-400 font-medium">
                  {errors.country.message}
                </span>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Skills
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/40 border border-slate-800 p-3.5 rounded-xl">
              {["React", "Node", "JavaScript", "TypeScript"].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={skill.toLowerCase()}
                    value={skill}
                    className="accent-indigo-500 h-4 w-4 rounded border-slate-700 cursor-pointer"
                    {...register("skills")}
                  />
                  <label
                    htmlFor={skill.toLowerCase()}
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    {skill}
                  </label>
                </div>
              ))}
            </div>
            {errors.skills && (
              <span className="text-xs text-red-400 font-medium">
                {errors.skills.message}
              </span>
            )}
          </div>

          {/* About */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="about"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              About Yourself
            </label>
            <textarea
              id="about"
              rows={3}
              placeholder="Tell us a little about yourself..."
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              {...register("about")}
            />
            {errors.about && (
              <span className="text-xs text-red-400 font-medium">
                {errors.about.message}
              </span>
            )}
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="profilePic"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Choose Profile Picture
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="w-full text-xs text-slate-400
                file:mr-3 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-xs file:font-semibold
                file:bg-indigo-500/10 file:text-indigo-400
                hover:file:bg-indigo-500/20
                cursor-pointer
                bg-slate-800/80 border border-slate-700/80 rounded-xl p-1.5
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              {...register("profilePic")}
            />
            {errors.profilePic && (
              <span className="text-xs text-red-400 font-medium">
                {errors.profilePic.message}
              </span>
            )}
          </div>

          {/* Experience Range */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="experience"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Experience
              </label>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {experienceValue ?? 0} yrs
              </span>
            </div>
            <input
              id="experience"
              type="range"
              min="0"
              max="10"
              step="1"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              {...register("experience")}
            />
            <div className="flex justify-between text-[10px] text-slate-500 px-0.5 font-mono">
              <span>0 yrs</span>
              <span>10 yrs</span>
            </div>
            {errors.experience && (
              <span className="text-xs text-red-400 font-medium">
                {errors.experience.message}
              </span>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex flex-col gap-1 pt-2">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="terms"
                className="accent-indigo-500 h-4 w-4 rounded cursor-pointer"
                {...register("terms")}
              />
              <label
                htmlFor="terms"
                className="text-xs text-slate-300 cursor-pointer"
              >
                I agree to the Terms & Conditions
              </label>
            </div>
            {errors.terms && (
              <span className="text-xs text-red-400 font-medium">
                {errors.terms.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 cursor-pointer active:scale-[0.99] mt-3"
          >
            Register Account
          </button>

          {/* Login Link */}
          <p
            onClick={() => setIsRegistered?.(true)}
            className="text-center text-xs text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors mt-2"
          >
            Already Have an Account?{" "}
            <Link to="/login">
            <span className="font-semibold text-indigo-400 underline">Login</span>
            </Link>
            
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;