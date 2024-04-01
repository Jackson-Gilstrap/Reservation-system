import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import ConfirmClient from "./ConfirmClient";

const ClientValidationSchema = Yup.object().shape({
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  phone_number: Yup.string()
    .min(10, "Too short")
    .max(15, "Too long")
    .required("Required"),
  zipcode: Yup.string()
    .min(5, " Too Short")
    .max(5, "Too Long")
    .required("Required"),
});
const DemographicForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [found, setFound] = useState(null);
  const [first_name_confirm, set_first_name_confirm] = useState("");
  const [last_name_confirm, set_last_name_confirm] = useState("");
  const [contact_number_confirm, set_contact_number_confirm] = useState("");
  const [zipcode_confirm, set_zipcode_confirm] = useState("");
  return (
    <>
      <div>
        {showForm ? (
          <Formik
            initialValues={{
              last_name: "",
              phone_number: "",
              zipcode: "",
            }}
            validationSchema={ClientValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await axios.post(
                  "http://localhost:3007/api/validateClient",
                  values
                );
                if (response.status === 406) {
                  console.log(
                    "There has been an error multiple clients found in the database please double check you information!"
                  );
                } else if (response.status === 200) {
                  console.log(response.data.message);
                  setFound(false);
                  //client was not found route to the questionnaire
                } else if (response.status === 201) {
                  console.log(response.data.message);
                  console.log(response.data.body);
                  const { first_name, last_name, zipcode, contact_number } =
                    response.data.body;
                  setFound(true);
                  set_first_name_confirm(first_name);
                  set_last_name_confirm(last_name);
                  set_contact_number_confirm(contact_number);
                  set_zipcode_confirm(zipcode);
                  setShowForm(false);

                  //client was found route to reservation but render confirmation prompt.
                }
              } catch (error) {
                console.error(error.message);
              }
              resetForm();
            }}
          >
            <Form>
              <Field name="last_name" placeholder="Last Name" />
              <Field name="phone_number" placeholder="Phone Number" />
              <Field name="zipcode" placeholder="Zipcode" />

              <button type="submit">Check</button>
            </Form>
          </Formik>
        ) : (
          <ConfirmClient
            first_name={first_name_confirm}
            last_name={last_name_confirm}
            contact_number={contact_number_confirm}
            zipcode={zipcode_confirm}
          />
        )}
      </div>
      {found === false && (
        <Link to={"/questionnaire"}>Quesionnaire for new clients</Link>
      )}
      {/* {found === true && <Link to={"/reservation"}>Proceed</Link>} */}
  
    </>
  );
};

export default DemographicForm;
