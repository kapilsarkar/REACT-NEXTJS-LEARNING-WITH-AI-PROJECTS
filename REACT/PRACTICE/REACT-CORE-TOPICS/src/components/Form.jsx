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
            id="first"
            {...register("name", { required: "Name can't be empty" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="second">Age :</label>
          <input id="second" {...register("age")} />
        </div>
        <div>
          <label htmlFor="third">Password :</label>
          <input id="third" {...register("password")} />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
