const QueueDisplay = ({ queue }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Current Queue
      </h2>

      {queue.length === 0 ? (
        <p className="text-slate-500 text-center">
          No Customer Data
        </p>
      ) : (
        <div className="space-y-4">
          {queue.map((customer) => (
            <div
              key={customer.id}
              className="border-l-4 border-yellow-500 bg-slate-50 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-slate-800">
                {customer.name}
              </h3>

              <p className="text-slate-600 mt-1">
                <span className="font-medium">Service:</span>{" "}
                {customer.service}
              </p>

              <span className="inline-block mt-3 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                {customer.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueDisplay;