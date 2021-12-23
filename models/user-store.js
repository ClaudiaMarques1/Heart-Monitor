 "use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  getAllUsers() { // Lets you get all the users in the collection
    return this.store.findAll(this.collection);
  },

  addUser(user) { // add the users to the collection
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) { // get a specific user by ID from the collection
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) { // get a specific user by Email from the collection
    return this.store.findOneBy(this.collection, { email: email });
  }
};

module.exports = userStore;
