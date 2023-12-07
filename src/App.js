import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Acknowledgement from "./components/acknowledgementPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/Acknowledgement" element={<Acknowledgement />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
