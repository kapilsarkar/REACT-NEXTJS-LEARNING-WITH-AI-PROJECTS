import { useState } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";

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

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Queue Management System
        </h1>

        <p className="text-slate-600 mt-2">
          Manage customer queues efficiently
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <QueueForm onAdd={addToQueue} />

        <QueueDisplay queue={queue} />
      </main>
    </div>
  );
}

export default App;