"use strict";

const logger = require("../utils/logger");

const monitor = {
  index(request, response) {
    logger.info("monitor rendering");
    const viewData = {
      title: "About Template 1",
    };
    response.render("monitor", viewData);
  },
};

module.exports = monitor;
