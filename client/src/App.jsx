import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questionnaire from "./components/Questionnair";
import Home from "./components/Home";
import RequiredForms from "./components/RequiredForms";
import Login from "./components/Login";
import PreForm from "./components/Preform";
import Reservation from "./components/Reservation";
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
          <Route exact path ="/preform" Component={PreForm}/>
          <Route exact path ="/reservation" Component={Reservation}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
