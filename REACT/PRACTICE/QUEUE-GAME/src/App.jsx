import { useState } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";
import CounterDisplay from "./components/CounterDisplay";

function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (customer) => {
    setQueue((prevQueue) => [
      ...prevQueue,
      {
        ...customer,
        id: Date.now(),
        status: "waiting",
      },
    ]);
  };

  const updateQueueStatus = (id, newStatus) => {
    setQueue((prevQueue) =>
      prevQueue.map((customer) =>
        customer.id === id
          ? { ...customer, status: newStatus }
          : customer
      )
    );
  };

  const removeFromQueue = (id) => {
    setQueue((prevQueue) =>
      prevQueue.filter(
        (customer) => customer.id !== id
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-slate-800 text-center">
            Queue Management Game
          </h1>

          <p className="text-slate-500 text-center mt-2">
            Manage customer queues efficiently
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Counter Section */}
        <section className="mb-8">
          <CounterDisplay queue={queue} />
        </section>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Side */}
          <section>
            <QueueForm onAdd={addToQueue} />
          </section>

          {/* Right Side */}
          <section>
            <QueueDisplay
              queue={queue}
              onRemove={removeFromQueue}
              onUpdateStatus={updateQueueStatus}
            />
          </section>

        </main>
      </div>
    </div>
  );
}

export default App;