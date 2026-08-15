import "./App.css";
import Counter from "./components/Counter.jsx";
import Name from "./components/Name.jsx";
import Users from "./components/Users.jsx";

function App() {
  return (
    <>
      <div>
        <h2>REDUX TOOLKIT</h2>
        <Counter />
        <Name />
        <Users/>
      </div>
    </>
  );
}

export default App;
