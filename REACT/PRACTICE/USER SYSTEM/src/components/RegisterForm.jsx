import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

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

    // --- UPDATED DOB SCHEMA (MIN AGE 18, MAX AGE 60) ---
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => {
        const birthDate = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if birthday hasn't occurred yet this year
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
  const {
    register,
    handleSubmit,
    reset,
    control, // 1. Extract control
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

  // 2. Use useWatch for reliable slider updates
  const experienceValue = useWatch({
    control,
    name: "experience",
    defaultValue: 0,
  });
  
  const registrationForm = (data) => {
    console.log("Form Data Submitted:", data);
    reset();
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
      <form onSubmit={handleSubmit(registrationForm)} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          REGISTRATION
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            Name :
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="contact"
            className="text-sm font-medium text-gray-600"
          >
            Contact Number :
          </label>
          <input
            id="contact"
            type="tel"
            placeholder="Enter Your contact Number"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("contact")}
          />
          {errors.contact && (
            <span className="text-xs text-red-500">
              {errors.contact.message}
            </span>
          )}
        </div>

        {/* E-Mail */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            E-Mail :
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter Your E-Mail"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
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
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-600"
          >
            Confirm Password :
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Your Password"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* DOB */}
        <div className="flex flex-col gap-1">
          <label htmlFor="dob" className="text-sm font-medium text-gray-600">
            DOB :
          </label>
          <input
            id="dob"
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("dob")}
          />
          {errors.dob && (
            <span className="text-xs text-red-500">{errors.dob.message}</span>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-600">
              Gender :
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="radio"
                id="Male"
                value="Male"
                className="accent-blue-600"
                {...register("gender")}
              />
              <label htmlFor="Male" className="text-sm text-gray-600">
                Male
              </label>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="radio"
                id="Female"
                value="Female"
                className="accent-blue-600"
                {...register("gender")}
              />
              <label htmlFor="Female" className="text-sm text-gray-600">
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <span className="text-xs text-red-500">
              {errors.gender.message}
            </span>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="country"
            className="text-sm font-medium text-gray-600"
          >
            Country :
          </label>
          <select
            id="country"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("country")}
          >
            <option value="" disabled>
              Select Your Country
            </option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && (
            <span className="text-xs text-red-500">
              {errors.country.message}
            </span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Skills :</label>
          <div className="grid grid-cols-2 gap-2">
            {["React", "Node", "JavaScript", "TypeScript"].map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={skill.toLowerCase()}
                  value={skill}
                  className="accent-blue-600 h-4 w-4"
                  {...register("skills")}
                />
                <label
                  htmlFor={skill.toLowerCase()}
                  className="text-sm text-gray-600"
                >
                  {skill}
                </label>
              </div>
            ))}
          </div>
          {errors.skills && (
            <span className="text-xs text-red-500">
              {errors.skills.message}
            </span>
          )}
        </div>

        {/* About */}
        <div className="flex flex-col gap-1">
          <label htmlFor="about" className="text-sm font-medium text-gray-600">
            About Yourself :
          </label>
          <textarea
            id="about"
            rows={4}
            placeholder="Tell us a little about yourself..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("about")}
          />
          {errors.about && (
            <span className="text-xs text-red-500">{errors.about.message}</span>
          )}
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="profilePic"
            className="text-sm font-medium text-gray-600"
          >
            Choose Profile Picture :
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="text-sm text-gray-600
              file:mr-3 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-600
              hover:file:bg-blue-100
              cursor-pointer
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("profilePic")}
          />
          {errors.profilePic && (
            <span className="text-xs text-red-500">
              {errors.profilePic.message}
            </span>
          )}
        </div>

        {/* Experience Range */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="experience"
              className="text-sm font-medium text-gray-600"
            >
              Experience :
            </label>
            <span className="text-sm font-semibold text-blue-600">
              {experienceValue ?? 0} yrs
            </span>
          </div>
          <input
            id="experience"
            type="range"
            min="0"
            max="10"
            step="1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            {...register("experience")}
          />
          <div className="flex justify-between text-xs text-gray-400 px-0.5">
            <span>0</span>
            <span>10</span>
          </div>
          {errors.experience && (
            <span className="text-xs text-red-500">
              {errors.experience.message}
            </span>
          )}
        </div>

        {/* Terms */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="accent-blue-600 h-4 w-4"
              {...register("terms")}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </label>
          </div>
          {errors.terms && (
            <span className="text-xs text-red-500">{errors.terms.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
        >
          Register
        </button>

        <p
          onClick={() => setIsRegistered?.(true)}
          className="text-center text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
        >
          Already Have an Account -{" "}
          <span className="font-medium underline">Login</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
