import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Minimum Length Should be 3")
      .max(20, "Maximum Length Should be 20"),
    age: z.coerce
      .number()
      .min(10, "Minimum Age Should be 10")
      .max(80, "Maximum Age should be 80"),
    password: z
      .string()
      .min(5, "Minimum Length Should be 5")
      .max(20, "Maximum Length Should be 20")
      .regex(/[A-Z]/, "One uppercase required")
      .regex(/[a-z]/, "One lowercase required")
      .regex(/[0-9]/, "One number required"),
    confirm: z.string(),
    email: z.email("E-Mail is Invalid"),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ["confirm"], // path of error
  });

const ZodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

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
            type="text"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="first"
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="fourth">E-Mail :</label>
          <input
            type="email"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="fourth"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="second">Age :</label>
          <input
            type="number"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="second"
            {...register("age")}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div>
          <label htmlFor="third">Password :</label>
          <input
            type="password"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="third"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="fifth">Confirm Password :</label>
          <input
            type="password"
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-lg font-semibold text-white outline-none placeholder:text-indigo-200/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            id="fifth"
            {...register("confirm")}
          />
          {errors.confirm && <span>{errors.confirm.message}</span>}
        </div>
        <button className="cursor-pointer rounded-xl bg-emerald-500 px-3 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40">
          Submit
        </button>
      </form>
    </>
  );
};

export default ZodForm;
