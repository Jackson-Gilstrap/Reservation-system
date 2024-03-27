import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
const PreForm = () => {
  const [path, setPath] = useState("");
  const [canProceed, setCanProceed] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          filingJointly: "",
          hasDependents: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          setCanProceed(true);
          setPath("/reservation");
          alert(JSON.stringify(values, null, 2));
          resetForm();
        }}
      >
        <Form>
          <label>
            Are you filingly jointly?
            <Field as="select" name="filingJointly">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </label>
          <label>
            Do you have any dependents?
            <Field as="select" name="hasDependents">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </label>
          <button type="submit">Save</button>
        </Form>
      </Formik>
      {canProceed && (
        <Link to={path}>
          <button type="submit">Continue</button>
        </Link>
      )}
    </div>
  );
};

export default PreForm;
// non relational db for reservations
// open table !!! for ideas
