require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db, client_db } = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

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

app.post("/api/v1/reservation", (req, res) => {
  //do something with the reservation data
  console.log(req.body);
  const { datetime, firstName, lastName, phoneNumber, zipcode, email } =
    req.body;
  //insert query into the client table
  //insert quert into the reservation table
});

app.post("/api/validateClient", async (req, res) => {
  const { last_name, phone_number, zipcode } = req.body;
  const results = await client_db.query(
    "select * from clients where last_name = $1 AND contact_number = $2 AND zipcode = $3",
    [last_name, phone_number, zipcode]
  );
  console.log(results);
  if (results.rowCount < 1) {
    res
      .status(200)
      .send({
        message:
          "client does not exit in our database, routing to questionnaire!",
      });
  } else if (results.rowCount == 1) {
    res
      .status(201)
      .send({
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

//check if client exists in the db then return a response back with 204

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is starting on port ${port}`);
});
