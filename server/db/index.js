const {Pool} = require("pg");
require("dotenv").config();


const reservationPool = new Pool({
    user:process.env.PGUSER,
    host:process.env.PGHOST,
    database:process.env.PGDATABASE_RESERVATION,
    password:process.env.PGPASSWORD,
    port:process.env.PGPORT
});
const clientPool = new Pool({
    user:process.env.PGUSER,
    host:process.env.PGHOST,
    database:process.env.PGDATABASE_CLIENT,
    password:process.env.PGPASSWORD,
    port:process.env.PGPORT
})

module.exports = {
    db: reservationPool,
    client_db: clientPool,
}