import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };
  console.log("Render");
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="first">Name :</label>
          <input
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="first"
            {...register("name", { required: "Name can't be empty" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="second">Age :</label>
          <input
            type="number"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="second"
            {...register("age", {
              min: { value: 10, message: "Minimum Age Should be 10" },
              max: { value: 80, message: "Maximum Age Should be 80" },
            })}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div>
          <label htmlFor="third">Password :</label>
          <input
            type="password"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="third"
            {...register("password", {
              min: { value: 5, message: "Minimum Length Should be 5" },
              max: { value: 80, message: "Maximum Length Should be 10" },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button className="cursor-pointer rounded-xl bg-emerald-500 px-3 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
