import { useForm } from "react-hook-form";

const RegisterForm = ({ setIsRegistered }) => {
  const {
    register,
    handleSubmit,
    reset,
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
