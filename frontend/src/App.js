import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from './pages/LoginPage';
import HomePage from "./pages/HomePage";
import LiveCamera from "./pages/LiveCamera";
import ResultPage from "./pages/ResultPage";

function App() {
  

  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/camera" element={<LiveCamera/>}/>
        <Route path="/results" element={<ResultPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
