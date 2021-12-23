 "use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const weekStore = {
  store: new JsonStore("./models/week-store.json", {
    weekCollection: []
  }),
  collection: "weekCollection",

  getAllWeeks() { // This returns all weeks in the collection.
    return this.store.findAll(this.collection);
  },

  getWeek(id) { // This returns the weeks ID under the current user.
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserWeeks(userid) { // This returns all weeks in the collection under the current user.
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeReading(id, readingId) { // This lets you remove a reading
    const week = this.getWeek(id);
    const readings = week.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  removeWeek(id) { // This lets you remove a week
    const week = this.getWeek(id);
    this.store.remove(this.collection, week);
    this.store.save();
  },

  removeAllWeeks() { // This lets you remove all weeks
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) { // This lets you add a reading
    const week = this.getWeek(id);
    week.readings.push(reading);
    this.store.save();
  },
  
  addWeek(week) { // This lets you add a week
    this.store.add(this.collection, week);
    this.store.save();
  },

  getReading(id, readingId) { // This lets you get a reading
    const week = this.store.findOneBy(this.collection, { id: id });
    const readings = week.readings.filter(
      reading => reading.id == readingId
    );
    return readings[0];
  },

  updateReading(reading, updateReading) { // This lets you update the readings
    reading.date = updateReading.date;
    reading.code = updateReading.code;
    reading.temperature = updateReading.temperature;
    reading.windSpeed = updateReading.windSpeed;
    reading.windDirection = updateReading.windDirection;
    reading.pressure = updateReading.pressure;

    this.store.save();
  }
};

module.exports = weekStore;
