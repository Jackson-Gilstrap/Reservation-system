import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RemindersPage = ({last_name, contact_number, zipcode}) => {
  const [forms, setforms] = useState([])
  const [confirmStatus, setConfirmStatus] = useState(false)
  const handleSubmitProcess = (event) => {
    event.preventDefault();
    setConfirmStatus(true)
    
  };
  
  const values = [last_name, contact_number, zipcode]

  const getForms = async (values) => {
    const [last_name, contact_number, zipcode] = values
    const queryParams = new URLSearchParams({
      last_name,
      contact_number,
      zipcode
    })
    const url = `http://localhost:3007/api/reminders?${queryParams}`
    const form_list = await axios.get(url);
    return form_list.data.body;
  };

  const displayForms = async () => {
    const form_objects = [];
    const forms = await getForms(values);
    forms.map((form) => {
      const f_obj = {
        form_title: form,
      };
      form_objects.push(f_obj);
    });
    return form_objects;
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const form_objects = await displayForms();
        setforms(form_objects)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchForms()
    
  }, []);

  return (
    <>
      <h2>
        Here are the forms that you should bring to your appointment based on your last visit.
      </h2>
      {forms.map((form)=> (
        <div className="form-container" key={form.form_title}>
          <h3>{form.form_title}</h3>
        </div>
      ))}
      <form onSubmit={handleSubmitProcess}>
        <label htmlFor="checkbox">
          <input type="checkbox" required />
        </label>

        <button type="submit">continue</button>
      </form>
      { confirmStatus === true && <Link to={"/reservation"}>Proceed</Link>}
    </>
  );
};

export default RemindersPage;
