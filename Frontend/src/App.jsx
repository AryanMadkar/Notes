import { useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashbord" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

function App() {
  const [count, setCount] = useState(0);

  return <div>{routes}</div>;
}

export default App;
