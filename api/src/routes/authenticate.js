const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const bcrypt = require("bcrypt");

server.get("/", function (req, res) {
  console.log("user", req.user);
  res.json({ user: req.user });
});

server.post("/login", passport.authenticate("local"), function (
  req,
  res,
  next
) {
  console.log(req.user.isActive);
  req.user.isActive
    ? res.json(req.user)
    : res.json({ error: "No tiene permiso para realizar esta operación" });
});

server.get("/logout", function (req, res) {
  req.logout();
  res.json({});
  console.log("cierre de sesion");
});

function isAuthenticated(req, res, next) {
  console.info("isAuthenticated");
  if (req.isAuthenticated()) {
    console.info("esta authenticado");
    next();
  } else {
    console.info("no esta authenticado");
    res.json(false);
  }
}

server.get("/users", isAuthenticated, function (req, res) {
  console.info("usuario autenticado");
  res.json(true);
});

const isLoggedId = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = server;
module.exports.isAuthenticated = isAuthenticated;
