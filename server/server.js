require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db, client_db } = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

const printSomething = () => console.log("wait 3 seconds");

app.get("/api/v1/locations", async (req, res) => {
  const results = await db.query("select * from locations");
  console.log(results);
  res.status(200).json({
    status: "success",
    data: { locations: results.rows },
  });
});

app.get("/api/v1/appointments/:location_id", async (req, res) => {
  const { location_id } = req.params;

  try {
    const results = await db.query(
      "SELECT a.*, l.location_name FROM appointments AS a JOIN locations AS l ON a.location_id = l.location_id WHERE a.location_id = $1;",
      [parseInt(location_id)]
    );
    res.status(200).json({
      status: "success",
      body: { appointments: results.rows },
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/api/v1/reservation", async (req, res) => {
  console.log(req)
  const {
    datetime,
    firstName,
    lastName,
    phoneNumber,
    zipcode,
    email,
    locationID,
  } = req.body;

  console.log(locationID)
  try {
    //grab the location name from locaitons table based on id

    const location_results = await db.query(
      "SELECT location_name FROM locations where location_id = $1 ",
      [parseInt(locationID)]
    );

    // grab the value of location results
    const reservation_location = location_results.rows[0].location_name;
    console.log(reservation_location);
    // insert client data into client db

    const insert_client = await db.query(
      "INSERT INTO client (client_first_name, client_last_name, client_phonenum, client_zipcode, client_email) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [firstName, lastName, phoneNumber, zipcode, email]
    );
    //wait 3 seconds to make sure client data inserts

    setTimeout(printSomething, 3000);

    //update appointment table to switch the is taken to true based on reservation_datetime

    //insert everything but first name into reservation table
    const insert_reservation = await db.query(
      "INSERT INTO reservation (client_last_name, client_phonenum, client_zipcode, reservation_datetime, reservation_location) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [lastName, phoneNumber, zipcode, datetime, reservation_location]
    );

    setTimeout(printSomething, 3000);
    //grab the data regarding the just updated client and their reservation sand return

    const get_reservation = await db.query(
      "SELECT * FROM client as c JOIN reservation as r ON c.client_last_name = r.client_last_name AND c.client_phonenum = r.client_phonenum and c.client_zipcode =r.client_zipcode WHERE c.client_last_name = $1 and c.client_phonenum = $2 and c.client_zipcode = $3",
      [lastName, phoneNumber, zipcode]
    );

    console.log(get_reservation);

    //return the correct res based on the data returned

    res.status(201).send({
      status: "success",
      body: { reservation: get_reservation.rows[0] },
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/api/validateClient", async (req, res) => {
  const { last_name, phone_number, zipcode } = req.body;
  const results = await client_db.query(
    "select * from clients where last_name = $1 AND contact_number = $2 AND zipcode = $3",
    [last_name, phone_number, zipcode]
  );
  console.log(results);
  if (results.rowCount < 1) {
    res.status(200).send({
      message:
        "client does not exit in our database, routing to questionnaire!",
    });
  } else if (results.rowCount == 1) {
    res.status(201).send({
      message:
        "client has been found on our database, routing to reminder screen!",
      body: results.rows[0],
    });
  } else {
    res
      .status(406)
      .send({ message: "There has been an error duplicate clients found." });
  }
});

// get client info from a matching client
app.get("/api/reminders", async (req, res) => {
  const { last_name, contact_number, zipcode } = req.query;
  console.log(req.query);
  try {
    const results = await client_db.query(
      "SELECT * from clients RIGHT JOIN client_info on clients.last_name = client_info.client_last_name and clients.contact_number = client_info.client_contact_number and clients.zipcode = client_info.client_zipcode where clients.last_name = $1 and clients.contact_number = $2 and clients.zipcode = $3;",
      [last_name, contact_number, zipcode]
    );
    console.log(results);

    const {
      has_wages,
      has_social_security,
      has_pension,
      has_interest,
      has_dividends,
      recieves_stock_income,
      recieves_unemployment,
      recieves_disability,
      pays_tuition,
      pays_student_loans,
      has_self_employment_income,
      pays_rent,
      has_hobby_income,
      has_gambling_income,
      first_time_homebuyer,
      has_obama_care,
    } = results.rows[0];
    const form_list = [];
    if (has_wages === "Yes" || recieves_disability === "Yes") {
      form_list.push("W2");
    }
    if (has_social_security == "Yes") {
      form_list.push("SSA-1099");
    }
    if (has_pension === "Yes") {
      form_list.push("1099-R");
    }
    if (has_interest === "Yes") {
      form_list.push("1099-INT");
    }
    if (has_dividends === "Yes") {
      form_list.push("1099-DIV");
    }
    if (recieves_stock_income == "Yes") {
      form_list.push("1099-COMP");
    }
    if (recieves_unemployment === "Yes") {
      form_list.push("1099-G");
    }
    if (pays_tuition == "Yes") {
      form_list.push("1098-T");
    }
    if (pays_student_loans === "Yes") {
      form_list.push("1098-E");
    }
    if (has_self_employment_income == "Yes") {
      form_list.push("1099-NET");
    }
    if (pays_rent == "Yes" || has_hobby_income === "Yes") {
      form_list.push("1099-MISC");
    }
    if (has_gambling_income == "Yes") {
      form_list.push("W2G");
    }
    if (first_time_homebuyer === "Yes") {
      form_list.push("Bring Proof of purchase");
    }
    if (has_obama_care === "Yes") {
      form_list.push("1095-A");
    }
    res.status(200).json({
      status: "sucess",
      body: form_list,
    });
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is starting on port ${port}`);
});

//check if the client exist in db before updating data in the rervation client table
