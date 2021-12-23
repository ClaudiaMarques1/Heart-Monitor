"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = { // This ensures that the start of the application gets you to sign up or login to weathertop.
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) { // This ensures you are able to login to the application.
    const viewData = {
      title: "Login to the Weathertop"
    };
    response.render("login", viewData);
  },

  logout(request, response) { // This ensures you are able to logout of the application.
    response.cookie("week", "");
    response.redirect("/");
  },

  signup(request, response) { // This ensures you are able to signup to the application.
    const viewData = {
      title: "Login to the Weathertop"
    };
    response.render("signup", viewData);
  },

  register(request, response) { // This ensures you are able to register the account after you have signed up to the application.
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) { // This verifies your email and password is correct when signing in to the application.
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("week", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) { // This ensures that you get sign in to multiple accounts on the application, not just one.
    const userEmail = request.cookies.week;
    return userstore.getUserByEmail(userEmail);
  }
};

module.exports = accounts;
