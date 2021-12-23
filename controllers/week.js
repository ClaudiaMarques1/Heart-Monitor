"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const weekStore = require("../models/week-store.js");
const analytics = require("../utils/analytics.js");
const axios = require("axios");

const week = { // This ensures you are able to bring all the calculations made in Max Min and Analytics to week.
  index(request, response) {
    const weekId = request.params.id;
    logger.debug("Week id = " + weekId);
    const week = weekStore.getWeek(weekId);
    const latestReading = analytics.getLatestReading(week.readings);
    const viewData = {
      title: week.title + " Week Schedule",
      week: weekStore.getWeek(weekId),
      week: week,
    };
    response.render("week", viewData);
  },

  deleteReading(request, response) { // Ability to remove readings from weeks.
    const weekId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Week ${weekId}`);
    weekStore.removeReading(weekId, readingId);
    response.redirect("/week/" + weekId);
  },

  addReading(request, response) { // Ability to add reading to weeks.
    const weekId = request.params.id;
    const week = weekStore.getWeek(weekId);
    const newReading = {
      id: uuid.v1(),
      date: request.body.date,
      weight: request.body.weight,
      height: request.body.height,
      hipMeasurement: request.body.hipMeasurement,
      waistMeasurement: request.body.waistMeasurement
    };
    weekStore.addReading(weekId, newReading);
    response.redirect("/week/" + weekId);
    logger.debug("New Reading = ", newReading);
  },

};

module.exports = week;
