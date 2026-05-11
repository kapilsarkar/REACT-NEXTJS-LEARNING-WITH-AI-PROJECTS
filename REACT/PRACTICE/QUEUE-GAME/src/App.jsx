import { useState } from "react";
import QueueForm from "./components/QueueForm";

function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (customer) => {
    setQueue([...queue, { ...customer, id: Date.now(), status: "waiting" }]);
    
  };
  return (
    <>
      <header>
        <h2 className="text-center">QUEUE-GAME</h2>
      </header>
      ,
      <main>
        <QueueForm onAdd={addToQueue} />
      </main>
    </>
  );
}

export default App;
