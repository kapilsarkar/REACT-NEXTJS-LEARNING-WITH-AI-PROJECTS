import { useForm } from "react-hook-form";

const RegisterForm = ({ setIsRegistered }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const registrationForm = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
      <form onSubmit={handleSubmit(registrationForm)} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          REGISTRATION
        </h2>
        {/* ==========================================================
                     PERSONAL INFORMATION
========================================================== */}
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
            <span className="text-xs text-red-500">{errors?.name.message}</span>
          )}
        </div>
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
              {errors?.contact.message}
            </span>
          )}
        </div>
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
            <span className="text-xs text-red-500">
              {errors?.email.message}
            </span>
          )}
        </div>
        {/* ==========================================================
                     ACCOUNT INFORMATION
========================================================== */}
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
          {errors?.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
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
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600">Gender :</label>
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
            {errors.gender && (
              <span className="text-xs text-red-500">
                {errors.gender.message}
              </span>
            )}
            <label htmlFor="Female" className="text-sm text-gray-600">
              Female
            </label>
          </div>
        </div>
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
            defaultValue=""
            {...register("country", { required: "Please select a country" })}
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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Skills :</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="react"
                value="React"
                className="accent-blue-600 h-4 w-4"
                {...register("skills")}
              />
              <label htmlFor="react" className="text-sm text-gray-600">
                React
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="node"
                value="Node"
                className="accent-blue-600 h-4 w-4"
                {...register("skills")}
              />
              <label htmlFor="node" className="text-sm text-gray-600">
                Node
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="javascript"
                value="JavaScript"
                className="accent-blue-600 h-4 w-4"
                {...register("skills")}
              />
              <label htmlFor="javascript" className="text-sm text-gray-600">
                JavaScript
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="typescript"
                value="TypeScript"
                className="accent-blue-600 h-4 w-4"
                {...register("skills")}
              />
              <label htmlFor="typescript" className="text-sm text-gray-600">
                TypeScript
              </label>
            </div>
          </div>
          {errors.skills && (
            <span className="text-xs text-red-500">
              {errors.skills.message}
            </span>
          )}
        </div>
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
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="experience"
              className="text-sm font-medium text-gray-600"
            >
              Experience :
            </label>
            <span className="text-sm font-semibold text-blue-600">
              {watch("experience") || 0} yrs
            </span>
          </div>
          <input
            id="experience"
            type="range"
            min="0"
            max="10"
            step="1"
            defaultValue="0"
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
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="accent-blue-600 h-4 w-4"
              {...register("terms", {
                required: "You must accept the Terms & Conditions",
              })}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </label>
          </div>
          {errors.terms && (
            <span className="text-xs text-red-500">{errors.terms.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
        >
          Register
        </button>
        <p
          onClick={() => setIsRegistered(true)}
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
