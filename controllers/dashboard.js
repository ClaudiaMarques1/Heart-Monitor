"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const axios = require("axios");
const accounts = require("./accounts.js");
const weekStore = require("../models/week-store");
const week = require("../controllers/week");

const dashboard = { // The dashboard is ensuring that the current user is the one who signed in, also bring information from week store, bringing in all the weeks showing under this account.
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Heart Rate Dashboard",
      weeks: weekStore.getUserWeeks(loggedInUser.id)
    };
    logger.info("about to render", weekStore.getAllWeeks());
    response.render("dashboard", viewData);
  },

  deleteWeek(request, response) { // This ensures you are able to delete your week.
    const weekId = request.params.id;
    logger.debug(`Deleting Week ${weekId}`);
    weekStore.removeWeek(weekId);
    response.redirect("/dashboard");
  },

  addWeek(request, response) { // This ensures you are able to add a week.
    const loggedInUser = accounts.getCurrentUser(request);
    const newWeek = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      date: request.body.date,
      readings: []
    };
    logger.debug("Creating a new Week", newWeek);
    weekStore.addWeek(newWeek);
    response.redirect("/dashboard");
  },
  
};

module.exports = dashboard;
