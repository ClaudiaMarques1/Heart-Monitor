"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const monitor = require("./controllers/monitor.js");
const about = require("./controllers/about.js");
const week = require('./controllers/week.js');
const reading = require("./controllers/reading.js");

router.get("/about", about.index);
router.get("/dashboard", dashboard.index);
router.get("/monitor", monitor.index);
router.get("/dashboard/deleteweek/:id", dashboard.deleteWeek);
router.post("/dashboard/addWeek", dashboard.addWeek);

router.get("/week/:id", week.index);
router.get("/week/:id/deletereading/:readingid", week.deleteReading);
router.post("/week/:id/addreading", week.addReading);
router.get("/reading/:id/editreading/:readingid", reading.index);
router.post("/reading/:id/updatereading/:readingid", reading.update);

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

module.exports = router;
