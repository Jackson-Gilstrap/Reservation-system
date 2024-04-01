import { Link } from "react-router-dom";
import RemindersPage from "./Reminders";

const ConfirmClient = ({ first_name, last_name, contact_number, zipcode }) => {
  return (
    <>
      <div>
        <h2>
          Welcome back {first_name} {last_name}!
        </h2>
        <RemindersPage first_name={first_name} last_name={last_name} contact_number={contact_number} zipcode={zipcode}/>
        
      </div>
    </>
  );
};

export default ConfirmClient;
