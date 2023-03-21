const express = require("express");
const router = express.Router();

// dingen
const pool = require("../models/Database");

router.get("/", (req, res) => {
  let users = [];
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query("SELECT * FROM accounts")
        .then((rows) => {
          users = rows;
          conn.release();
          res.send(users);
        })
        .catch((err) => {
          console.log("Error querying database");
        });
    })
    .catch((err) => {
      console.log("Error connecting to database");
    });
});

module.exports = router;