import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { Calendar } from "react-calendar";
import LocationFinder from "../apis/LocationFinder";
import ReservationSummary from "./Summary";

const Reservation = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocationAppointments, setSelectedLocationAppointments] =
    useState([]);
  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientPhoneNum, setClientPhoneNum] = useState("");
  const [clientZipcode, setClientZipcode] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [reservationDatetime, setReservationDatetime] = useState("");
  const [reservationLocation, setReservationLocation] = useState("");
  const [showSummary, setShowSummary] = useState(true);

  const buffer = () => {
    console.log("buffer");
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    // Format the date time as desired, for example:
    const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDateTime;
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await LocationFinder.get("/");
        console.log(response);
        setLocationOptions(response.data.data.locations);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLocations();
  }, []);

  const handleDateTimeChange = (event, setFieldValue) => {
    const datetime = event.target.value;
    setFieldValue("datetime", datetime);
  };

  const handleLocationChange = async (event, setFieldValue) => {
    const locationID = event.target.value;
    try {
      const response = await axios.get(
        `http://localhost:3007/api/v1/appointments/${locationID}`
      );
      setSelectedLocationAppointments(response.data.body.appointments);
      setFieldValue("locationID", locationID);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {showSummary ? (
        <div>
        <Formik
          initialValues={{
            datetime: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            zipcode: "",
            email: "",
            locationID: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await axios.post(
                "http://localhost:3007/api/v1/reservation",
                values
              );
              console.log(response.status);
              const {
                client_email,
                client_first_name,
                client_last_name,
                client_phonenum,
                client_zipcode,
                reservation_datetime,
                reservation_location,
              } = response.data.body.reservation;
              setClientFirstName(client_first_name);
              setClientLastName(client_last_name);
              setClientPhoneNum(client_phonenum);
              setClientZipcode(client_zipcode);
              setClientEmail(client_email);
              setReservationDatetime(reservation_datetime);
              setReservationLocation(reservation_location);
              if(showSummary) {
                setShowSummary(false);

              }
            } catch (err) {
              console.error(err.message);
            }
            resetForm();
          }}
        >
          
          {({ setFieldValue }) => (
            <Form>
              <div>
                <h4>Step 1</h4>
                <p>Pick Location</p>
                <select
                  onChange={(event) =>
                    handleLocationChange(event, setFieldValue)
                  }
                >
                  <option>Select one</option>
                  {locationOptions.map((location) => (
                    <option
                      key={location.location_id}
                      value={location.location_id}
                    >
                      {location.location_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h4>Step 2</h4>
                <p>Pick Time</p>
                <select
                  onChange={(event) =>
                    handleDateTimeChange(event, setFieldValue)
                  }
                >
                  {selectedLocationAppointments &&
                    selectedLocationAppointments.map((appointment, id) => (
                      <option key={id} value={appointment.appointment_datetime}>
                        {formatDateTime(appointment.appointment_datetime)}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <Field name="firstName" placeholder="First Name" />
                <Field name="lastName" placeholder="Last Name" />
                <Field name="phoneNumber" placeholder="Phone Number" />
                <Field name="zipcode" placeholder="Zipcode" />
                <Field name="email" placeholder="Email (optional)" />
              </div>
              <button type="submit">Continue</button>
            </Form>
          )}
        </Formik>
      </div>
      ): (
        <ReservationSummary
          first_name={clientFirstName}
          last_name={clientLastName}
          phone={clientPhoneNum}
          zipcode={clientZipcode}
          email={clientEmail}
          reservation_datetime={reservationDatetime}
          reservation_location={reservationLocation}
        />
      )}
      
    </div>
  );
};

export default Reservation;

//ipp number 
//compare to the backend dashboard with previous client.