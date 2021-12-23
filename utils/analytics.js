"use strict";

const stationAnalytics = {
  
  getLatestReading(readings) {
    return readings[readings.length - 1];
  },

};

module.exports = stationAnalytics;