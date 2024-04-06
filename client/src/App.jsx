import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questionnaire from "./components/Questionnair";
import Home from "./components/Home";
import RequiredForms from "./components/RequiredForms";
import Login from "./components/Login";
import PreForm from "./components/Preform";
import Reservation from "./components/Reservation";
import DemographicForm from "./components/Demographic";
import "./App.css";
import { LocationsContextProvider } from "./context/LocationsContext";
import RemindersPage from "./components/Reminders";
import Intake from "./components/Intake";
import LocationPicker from "./components/LocationPicker";
function App() {
  return (
    <>
      <LocationsContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/questionnaire" Component={Questionnaire} />
            <Route exact path="/forms" Component={RequiredForms} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/preform" Component={PreForm} />
            <Route exact path="/reservation" Component={LocationPicker} />
            <Route exact path="/demographic" Component={DemographicForm}/>
            <Route exact path="/reminders" Component={RemindersPage}/>
            <Route exact path="/intake" Component={Intake}/>
          

          </Routes>
        </Router>
      </LocationsContextProvider>
    </>
  );
}

export default App;
