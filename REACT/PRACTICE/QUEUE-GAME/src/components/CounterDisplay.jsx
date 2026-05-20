import { FaUserFriends } from "react-icons/fa";

const CounterDisplay = ({ queue }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-3 text-center">
      <div className="flex justify-center mb-3">
        <FaUserFriends className="text-5xl text-blue-600" />
      </div>

      <h2 className="text-xl font-semibold text-slate-600">Total Customers</h2>

      <h1 className="text-5xl font-bold text-blue-600 mt-3">{queue.length}</h1>
    </div>
  );
};

export default CounterDisplay;
