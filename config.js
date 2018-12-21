require('dotenv').config();

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const whoIsAwesome = "DAN AND STEVE, OBVS";

const db = `${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${
  process.env.DB_PASSWORD
}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const secret = process.env.APP_SECRET;

const config = {
  host,
  port,
  db,
  secret,
};

module.exports = config;
