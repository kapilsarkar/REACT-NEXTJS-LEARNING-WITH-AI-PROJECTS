import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
const QueueForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //validations
    if (!name.trim() || !service.trim()) return;
    console.log(name, service);
    onAdd({ name, service });

    setName("");
    setService("");
  };

  return (
    <>
      <div>
        <h2 className=" font-bold">Queue Form</h2>
        <form onSubmit={handleSubmit}>
          <h2>Add To Queue</h2>
          <div>
            <h3>Select Name</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h3>Select Details</h3>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select Service</option>
              <option value="consultation">consultation</option>
              <option value="payment">payment</option>
              <option value="support">support</option>
            </select>
          </div>
          <button type="submit">
            <FaUserPlus />
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default QueueForm;
