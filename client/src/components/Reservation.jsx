import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
// import axios from 'axios';
import { Link } from "react-router-dom";
import { Calendar } from "react-calendar";
let locations = [
  {
    id: 1,
    name: "Location 1",
    address: "123 Main St, Cityville, USA",
    appointments: [
      { id: 1, date: "2024-03-05", time: "10:00 AM" },
      { id: 2, date: "2024-03-07", time: "02:30 PM" },
    ],
  },
  {
    id: 2,
    name: "Location 2",
    address: "456 Elm St, Townsville, USA",
    appointments: [
      { id: 1, date: "2024-03-06", time: "09:00 AM" },
      { id: 2, date: "2024-03-08", time: "11:00 AM" },
    ],
  },
  {
    id: 3,
    name: "Location 3",
    address: "789 Oak St, Villagetown, USA",
    appointments: [
      { id: 1, date: "2024-03-05", time: "01:00 PM" },
      { id: 2, date: "2024-03-09", time: "03:30 PM" },
    ],
  },
  {
    id: 4,
    name: "Location 4",
    address: "321 Pine St, Hamletville, USA",
    appointments: [
      { id: 1, date: "2024-03-06", time: "10:30 AM" },
      { id: 2, date: "2024-03-10", time: "12:45 PM" },
    ],
  },
  {
    id: 5,
    name: "Location 5",
    address: "654 Maple St, Suburbia, USA",
    appointments: [
      { id: 1, date: "2024-03-05", time: "03:00 PM" },
      { id: 2, date: "2024-03-07", time: "05:15 PM" },
    ],
  },
  {
    id: 6,
    name: "Location 6",
    address: "987 Cedar St, Countryside, USA",
    appointments: [
      { id: 1, date: "2024-03-06", time: "11:45 AM" },
      { id: 2, date: "2024-03-08", time: "01:30 PM" },
    ],
  },
  {
    id: 7,
    name: "Location 7",
    address: "741 Birch St, Mountainside, USA",
    appointments: [
      { id: 1, date: "2024-03-07", time: "09:30 AM" },
      { id: 2, date: "2024-03-09", time: "04:00 PM" },
    ],
  },
];

const Reservation = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState("");
  const [selectedLocationAppointments, setSelectedLocationAppointments] =
    useState([]);
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    zipcode: "",
    email: "",
  });
  useEffect(() => {
    console.log(appointmentData);
  }, [appointmentData]);
  const updateAppointmentData = (values) => {
    setAppointmentData((prevAppointmentData) => ({
      ...prevAppointmentData,
      date: dateValue,
      time: timeValue,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      zipcode: values.zipcode,
      email: values.email,
    }));
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setTimeValue(time);
  };
  const handleLocationChange = (event) => {
    const locationName = event.target.value;
    const selected = locations.find(
      (location) => location.name === locationName
    );
    setSelectedLocationAppointments(selected.appointments);
  };
  console.log(dateValue);
  console.log(selectedLocationAppointments);
  console.log(timeValue);
  //   console.log(appointmentData)
  return (
    <div>
      <div>
        <h4>Step 1</h4>
        <p>Pick Date</p>
        <Calendar onChange={setDateValue} value={dateValue} />
      </div>
      <div>
        <h4>Step 2</h4>
        <p>Pick Location</p>
        <select onChange={handleLocationChange}>
          {locations &&
            locations.map((location, id) => (
              <option key={id} value={location.name}>
                {location.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <h4>Step 3</h4>
        <p>Pick Time</p>
        <select onChange={handleTimeChange}>
          {selectedLocationAppointments &&
            selectedLocationAppointments.map((appointment, id) => (
              <option key={id}>{appointment.time}</option>
            ))}
        </select>
      </div>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            zipcode: "",
            email: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            console.log(JSON.stringify(values, null, 2));
            updateAppointmentData(values);
          }}
        >
          <Form>
            <div>
              <Field name="firstName" placeholder="First Name" />
              <Field name="lastName" placeholder="Last Name" />
              <Field name="phoneNumber" placeholder="Phone Number" />
              <Field name="zipcode" placeholder="Zipcode" />
              <Field name="email" placeholder="Email (optional)" />
            </div>
            <button type="submit">Continue</button>
          </Form>
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
