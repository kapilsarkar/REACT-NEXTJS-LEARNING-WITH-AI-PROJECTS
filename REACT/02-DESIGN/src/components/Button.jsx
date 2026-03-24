const Button = ({buttonText}) => {
  return (
    <>
      <button className=" mt-5 px-5 py-2 bg-violet-600 text-white font-semibold rounded-xl">
        {buttonText}
      </button>
    </>
  );
};

export default Button;
