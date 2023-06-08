const express = require("express");
const router = express.Router();
const jszip = require("jszip");
const zip = new jszip();
const path = require("path");
const cookieParser = require("cookie-parser");

const file_sys = require("fs");
const AccountModel = require("../models/Account");
const SensorModel = require("../models/SensorModel");
const pool = require("../models/Database");
const { log } = require("console");
const Account = new AccountModel(pool);
const Sensor = new SensorModel(pool);

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.get("/inlog", async (req, res) => {
  try {
    let pad = path.join(__dirname, "../views/login.html");
    res.sendFile(pad);
  } catch (e) {
    console.log(e);
  }
});

router.post("/inlog", async (req, res) => {
  let username = req.body.username;
  let pass = req.body.password;

  try {
    let cookie = await Account.login(username, pass);
    res.cookie("token", cookie);

    res.redirect("/avg");
  } catch (e) {
    console.log("fout");
    res.redirect("inlog");
    return;
  }
});

router.get("/", async (req, res) => {
  if (!req.cookies) {
    res.redirect("/avg/inlog");
    return;
  }

  let MA = await Account.getMyAccount(req.cookies.token);
  let stappen = await Sensor.getStapRange(
    new Date("2000-01-01"),
    new Date(),
    req.cookies.token,
  );
  let hartslagen = await Sensor.getHartRange(
    new Date("2000-01-01"),
    new Date(),
    req.cookies.token,
  );

  MA = JSON.stringify(MA);
  stappen = JSON.stringify(stappen);
  hartslagen = JSON.stringify(hartslagen);

  zip.file("account.json", MA);
  zip.file("stappen.json", stappen);
  zip.file("hartslagen.json", hartslagen);

  zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
    res.set("Content-Type", "application/zip");
    res.set("Content-Disposition", "attachment; filename=example.zip");
    res.send(content);
  });
});

module.exports = router;
