import Login from "./components/Login.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          USER SYSTEM
        </h2>
      </header>
      <Login />
    </div>
  );
}

export default App;