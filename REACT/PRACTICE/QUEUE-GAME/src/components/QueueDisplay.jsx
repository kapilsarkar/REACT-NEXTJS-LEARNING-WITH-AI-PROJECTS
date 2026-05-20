import {
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaPlay,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

const QueueDisplay = ({
  queue,
  onRemove,
  onUpdateStatus,
}) => {

  // Dynamic Status Icons
  const getStatusIcon = (status) => {
    switch (status) {
      case "waiting":
        return <FaClock />;

      case "in-progress":
        return <FaSpinner className="animate-spin" />;

      case "completed":
        return <FaCheckCircle />;

      default:
        return null;
    }
  };

  // Dynamic Status Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-700";

      case "in-progress":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Current Queue
      </h2>

      {/* Empty Queue */}
      {queue.length === 0 ? (
        <p className="text-slate-500 text-center">
          No Customer Data
        </p>
      ) : (

        /* Queue List */
        <div className="space-y-4">

          {queue.map((customer) => (
            <div
              key={customer.id}
              className="border-l-4 border-yellow-500 bg-slate-50 p-4 rounded-lg"
            >

              {/* Customer Name */}
              <h3 className="text-lg font-semibold text-slate-800">
                {customer.name}
              </h3>

              {/* Service */}
              <p className="text-slate-600 mt-1">
                <span className="font-medium">
                  Service:
                </span>{" "}
                {customer.service}
              </p>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm ${getStatusStyle(
                  customer.status
                )}`}
              >
                {getStatusIcon(customer.status)}

                {customer.status.replace("-", " ")}
              </span>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">

                {/* Start Service Button */}
                {customer.status === "waiting" && (
                  <button
                    onClick={() =>
                      onUpdateStatus(
                        customer.id,
                        "in-progress"
                      )
                    }
                    className="bg-blue-600 flex items-center gap-2 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaPlay />
                    Start Service
                  </button>
                )}

                {/* Complete Service Button */}
                {customer.status === "in-progress" && (
                  <button
                    onClick={() =>
                      onUpdateStatus(
                        customer.id,
                        "completed"
                      )
                    }
                    className="bg-green-600 flex items-center gap-2 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaCheck />
                    Complete Service
                  </button>
                )}

                {/* Remove Button */}
                <button
                  onClick={() =>
                    onRemove(customer.id)
                  }
                  className="bg-red-600 flex items-center gap-2 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaTrash />
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueDisplay;