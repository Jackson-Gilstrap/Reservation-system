import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const RemindersPage = () => {

const handleSubmitProcess = ()=> {
    console.log("proceeding to the reservation ")

}

const getForms = async () => {
  const form_list = await axios.get("http://localhost:3007/api/reminders")
  console.log(form_list)
}


  useEffect(() => {
    console.log("mouting the main reminders list on load");
  }, []);

  getForms();

  return (
    <>
      <h1>
        Hi user here are the forms that you should bring to your appointment.
      </h1>
     
      <form onSubmit={handleSubmitProcess}>
        <label htmlFor="checkbox">
          <input type="checkbox" required />
        </label>

        <button type="submit">continue</button>
      </form>
    </>
  );
};

export default RemindersPage;
