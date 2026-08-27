import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Storage from "./components/Storage.jsx";
import Verify from "./components/Verify.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/verify" element={<Verify/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;