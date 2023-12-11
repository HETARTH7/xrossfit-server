import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Root from "./components/Root/Root.jsx";
import Home from "./components/Home/Home.jsx";
import Track from "./components/Track/Track.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
