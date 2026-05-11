import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const QueueForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !service.trim()) return;

    onAdd({
      name: name.trim(),
      service: service.trim(),
    });

    setName("");
    setService("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Add Customer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Customer Name
          </label>

          <input
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Select Service
          </label>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose Service</option>
            <option value="consultation">Consultation</option>
            <option value="payment">Payment</option>
            <option value="support">Support</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaUserPlus />
          Add To Queue
        </button>
      </form>
    </div>
  );
};

export default QueueForm;