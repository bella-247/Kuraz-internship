import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
