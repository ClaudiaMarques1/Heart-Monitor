"use strict";

const logger = require("../utils/logger");
const weekStore = require("../models/week-store");

const reading = { // This ensures you are able to edit your readings
  index(request, response) {
    const weekId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Week ${weekId}`);
    const viewData = {
      title: "Edit Reading",
      week: weekStore.getWeek(weekId),
      reading: weekStore.getReading(weekId, readingId)
    };
    response.render("reading", viewData);
  },

  update(request, response) { // This ensures you are able to update your readings.
    const weekId = request.params.id;
    const readingId = request.params.readingid;
    const reading = weekStore.getReading(weekId, readingId);
    const newReading = {
      date: request.body.date,
      weight: request.body.weight,
      height: request.body.height,
      hipMeasurement: request.body.hipMeasurement,
      waistMeasaurement: request.body.waistMeasaurement
    };
    logger.debug(`Updating Reading ${readingId} from Week ${weekId}`);
    weekStore.updateReading(reading, newReading);
    response.redirect("/week/" + weekId);
  }
};

module.exports = reading;