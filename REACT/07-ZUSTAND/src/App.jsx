import "./App.css";
import Counter from "./components/Counter.jsx";
import CounterButton from "./components/CounterButton.jsx";
import NavBar from "./components/NavBar.jsx";
import Post from "./components/Post.jsx";

function App() {
  return (
    <>
      <h2>ZUSTAND</h2>
      <Counter />
      <CounterButton />
      <NavBar />
      <Post/>
    </>
  );
}

export default App;
