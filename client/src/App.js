import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "./pages/Style.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
