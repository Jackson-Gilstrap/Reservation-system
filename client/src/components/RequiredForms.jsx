import { Formik, Form, Field } from "formik";

const RequiredForms = () => {
  return (
    <div>
      <h1>Tax Forms</h1>
      <p>Please check off any forms you plan to bring to the appointment</p>
      <div>
        <p>If you are unsure which forms you might need click the ?</p>
        <span>?</span>
      </div>
      <Formik
        initialValues={{
          has_1098_T: false,
          has_1099_INT: false,
          has_1099_DIV: false,
          has_1099_G: false,
          has_1099_MISC: false,
          has_1099_NEC: false,
          has_1099_K: false,
          has_1099_S: false,
          has_1099_B: false,
          has_SSA_1099: false,
          has_RBR_1099: false,
          has_5498_SA: false,
          has_1099_SA: false,
          has_1040_Schedule_D: false,
        }}
        onSubmit={async (values, {resetForm}) => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
        }}
      >
        <Form>
          <label>
            <Field type="checkbox" name="has_1098_T" />
            1098_T
          </label>
          <br />
          <label>
            <Field type="checkbox" name="has_1099_INT" />
            1099_INT
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_DIV" />
            1099_DIV
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_G" />
            1099_G
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_MISC" />
            1099_MISC
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_NEC" />
            1099_NEC
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_K" />
            1099_K
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_S" />
            1099_S
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_B" />
            1099_B
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_SSA_1099" />
            SSA_1099
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_RBR_1099" />
            RBR_1099
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_5498_SA" />
            5498_SA
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1099_SA" />
            1099_SA
          </label>
          <br />

          <label>
            <Field type="checkbox" name="has_1040_Schedule_D" />
            1040_Schedule_D
          </label>
          <br />
          <button type="submit">Proceed</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RequiredForms;
