import Button from "./Button";

const Card = ({
  title = "Default",
  buttonText,
  imageURL,
  alt = "Card Image",
}) => {
  return (
    <>
      <div className=" max-w-sm bg-white rounded-xl mt-5 border-gray-500 shadow-2xl transition-shadow">
        <h1>This is a Card Component</h1>
        <img className=" w-full h-56 object-cover" src={imageURL} alt={alt} />
        <div className=" p-3">
          <h2 className=" text-lg font-semibold text-gray-900">{title}</h2>
          <p className="mt-2 p-3 text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            odio iste vel officiis enim quod veritatis, quisquam asperiores
            aliquam illum esse illo similique nesciunt, amet saepe tenetur
            quibusdam facilis! Ab.
          </p>
          {/* Button (only if exists) */}
          {buttonText && <Button buttonText={buttonText} />}
        </div>
      </div>
    </>
  );
};

export default Card;
