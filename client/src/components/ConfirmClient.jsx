import { Link } from "react-router-dom";

const ConfirmClient = ({ first_name, last_name, contact_number, zipcode }) => {
  return (
    <>
      <div>
        <h2>
          Welcome back {first_name} {last_name}!
        </h2>
        <h3>Confirm this is you</h3>
        <p>
          Name: {first_name} {last_name}
        </p>
        <p>Phone Number: {contact_number}</p>
        <p>Zipcode: {zipcode}</p>
        <Link to={"/reservation"}>
          <button>Yes</button>
        </Link>
        <Link to={"/"}>
          <button>No</button>
        </Link>
      </div>
    </>
  );
};

export default ConfirmClient;
