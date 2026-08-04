import { useParams } from "react-router-dom";

const DetailedContact = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div>
        <h2>Detailed Contact :{params.id}</h2>
      </div>
    </>
  );
};

export default DetailedContact;
