import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SetUpInterview from "./pages/SetUpInterview.jsx";
import Interview from "./pages/Interview.jsx";
import Results from "./pages/Results.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100 antialiased selection:bg-violet-500/40 selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<SetUpInterview />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;