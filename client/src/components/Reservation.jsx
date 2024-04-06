import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReservationSummary from "./Summary";

const Reservation = ({ location_id }) => {
  const [selectedLocationAppointments, setSelectedLocationAppointments] =
    useState([]);
  const [ap_datetime, setAP_datetime] = useState("");
  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientPhoneNum, setClientPhoneNum] = useState("");
  const [clientZipcode, setClientZipcode] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [reservationDatetime, setReservationDatetime] = useState("");
  const [reservationLocation, setReservationLocation] = useState("");
  const [showSummary, setShowSummary] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    // Format the date time as desired, for example:
    const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDateTime;
  };

  const convertMonthTextToMonthNumbers = (month) => {
    let monthString;
    switch (month) {
      case "Jan":
        monthString = "01";
        break;
      case "Feb":
        monthString = "02";
        break;
      case "Mar":
        monthString = "03";
        break;
      case "Apr":
        monthString = "04";
        break;
      case "May":
        monthString = "05";
        break;
      case "Jun":
        monthString = "06";
        break;
      case "Jul":
        monthString = "07";
        break;
      case "Aug":
        monthString = "08";
        break;
      case "Sep":
        monthString = "09";
        break;
      case "Oct":
        monthString = "10";
        break;
      case "Nov":
        monthString = "11";
        break;
      case "Dec":
        monthString = "12";
        break;
      default:
        monthString = "Invalid month";
    }

    return monthString;
  };

  const convertDateTimetoDay = (dateString) => {
    let newDateArr = dateString.split("T");
    let dayMonthYearArray = newDateArr[0].split("-");
    //day month year should have three elements
    return dayMonthYearArray;
  };

  const convertDateTimeToDay2 = (dateStringObj) => {
    const dateObj = new Date(dateStringObj);
    const month = dateObj.toLocaleString("en-us", { month: "short" });
    const day =
      dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate(); // Output: 06
    const newDateArr2 = ["Date", month, day];
    return newDateArr2;
  };

  const combineMonthDay = (month, day) => {
    const monthDay = `${month}/${day}`;
    return monthDay;
  };

  const handleAppointmentSelection = (event, setFieldValue) => {
    const datetime = event.target.textContent;
    console.log(datetime);
    setFieldValue("datetime", datetime);
    setFieldValue("locationID", location_id);

    //now do something weith this string
  };

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3007/api/v1/appointments/${location_id}`
        );
        console.log(response);
        const appointments = response.data.body.appointments;
        const filtered_appointments = appointments.filter((appointment) => {
          const { appointment_datetime } = appointment;
          const dayMonthYearArray = convertDateTimetoDay(appointment_datetime);
          const monthDay = combineMonthDay(
            dayMonthYearArray[1],
            dayMonthYearArray[2]
          );

          const selectedDayMonthYearArray = convertDateTimeToDay2(selectedDate);
          console.log(selectedDayMonthYearArray);
          const month = convertMonthTextToMonthNumbers(
            selectedDayMonthYearArray[1]
          );
          const selectedMonthDay = combineMonthDay(
            month,
            selectedDayMonthYearArray[2]
          );
          // this is a string in month/day format split by a /
          setAP_datetime(selectedMonthDay);

          return monthDay === selectedMonthDay;
        });
        setSelectedLocationAppointments(filtered_appointments);
        console.log(selectedLocationAppointments);
        //this is where i need to call my setfieldvalue
      } catch (error) {
        console.error(error.message);
      }
    };
    getAppointments();
    console.log(selectedLocationAppointments);
  }, [location_id, selectedDate]);

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
                if (showSummary) {
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
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                  <h4>Appointments for {ap_datetime}</h4>

                  <ul>
                    {selectedLocationAppointments &&
                      selectedLocationAppointments.map((appointment, id) => (
                        <li
                          key={id}
                          value={appointment.appointment_datetime}
                          onClick={(event) =>
                            handleAppointmentSelection(event, setFieldValue)
                          }
                        >
                          {formatDateTime(appointment.appointment_datetime)}
                        </li>
                      ))}
                  </ul>
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
      ) : (
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
