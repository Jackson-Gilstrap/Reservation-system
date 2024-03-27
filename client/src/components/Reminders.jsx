import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const reminders = [
  {
    id: 1,
    title: "Sample text for a random tax form",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure enim facilis possimus libero architecto? Id rem enim mollitia molestiae ullam voluptas laboriosam veniam.",
  },
  {
    id: 2,
    title: "Sample text for a differnece tax form",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium adipisci hic maiores!",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet.",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, eligendi?",
  },
];

const RemindersPage = () => {

const handleSubmitProcess = ()=> {
    console.log("proceeding to the reservation ")

}


  useEffect(() => {
    console.log("mouting the main reminders list on load");
  }, []);

  return (
    <>
      <h1>
        Hi user here are the forms that you should bring to your appointment.
      </h1>
      <div className="reminder-container">
        {reminders &&
          reminders.map((reminder) => {
            <div className="reminder" key={reminder.id}>
              <h2>{reminder.title}</h2>
              <p>{reminder.body}</p>
            </div>;
          })}
      </div>
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
