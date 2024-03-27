import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { Calendar } from "react-calendar";
import LocationFinder from "../apis/LocationFinder";

const Reservation = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocationAppointments, setSelectedLocationAppointments] =
    useState([]);
 

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
    setFieldValue('datetime', datetime)
  };

  const handleLocationChange = async (event) => {
    const locationID = event.target.value;
    try {
      const response = await axios.get(
        `http://localhost:3007/api/v1/appointments/${locationID}`
      );
      setSelectedLocationAppointments(response.data.body.appointments);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            datetime: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            zipcode: "",
            email: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            console.log(JSON.stringify(values, null, 2));
            try {
                const response = await axios.post("http://localhost:3007/api/v1/reservation", values)
                console.log(response.status)
            } catch (err) {
                console.error(err.message)
            }
            resetForm()
            
          }}
        > {({setFieldValue}) => (
          <Form>
            <div>
              <h4>Step 1</h4>
              <p>Pick Location</p>
              <select onChange={handleLocationChange}>
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
              <select onChange={(event)=>handleDateTimeChange(event, setFieldValue)}>
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
    </div>
  );
};

export default Reservation;

//step 1 is pick the day
//step 2 is pick the locations
//step 3 is to pick the time
//step 4 is to input client information
