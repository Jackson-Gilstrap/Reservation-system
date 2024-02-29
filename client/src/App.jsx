import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questionnaire from "./components/Questionnair";
import Home from "./components/Home";
import RequiredForms from "./components/RequiredForms";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/questionnaire" Component={Questionnaire} />
          <Route exact path="/forms" Component={RequiredForms} />
          <Route exact path="/login" Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
