const CounterDisplay = ({ queue }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-slate-600">
        Total Customers
      </h2>

      <h1 className="text-5xl font-bold text-blue-600 mt-3">
        {queue.length}
      </h1>
    </div>
  );
};

export default CounterDisplay;