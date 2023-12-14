import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import Track from "./components/Track.jsx";
import Admin from "./components/Admin.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/track" element={<Track />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
