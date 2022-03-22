import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "./pages/Style.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Submitter from "./pages/Submitter/Submitter";
import Reviewer from "./pages/Reviewer/Reviewer";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContext } from "./context/UserContext";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
    const [userData, setUserData] = useState(null);

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <UserContext.Provider value={[userData, setUserData]}>
                    <Router>
                        <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/submitter/*"
                                element={<Submitter />}
                            />
                            <Route path="/reviewer/*" element={<Reviewer />} />
                        </Routes>
                    </Router>
                </UserContext.Provider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
