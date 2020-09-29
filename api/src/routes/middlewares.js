const isAuthenticated = require("./authenticate").isAuthenticated;
const middlewares = {
  isAdmin: function (req, res, next) {
    
    console.log("SOY ADMIN", req.user);
    if (req.user.state === "admin" && req.isAuthenticated()) {
      console.log("Estoy entrando para el ADMIN");
      next();
    } else {
      res.redirect("localhost:3000");
    }
  },

  isUserAdmin: function (req, res, next) {
    console.log("SOY USERADMIN", req.user, "ADMIN", req.user.state);
    if (req.user.state === "aceptado" || req.user.state === "admin") {
      next();
    } else {
      res.redirect("localhost:3000");
    }
  },

  isUserActive: (req, res, next) => {
    console.log("SOY USERACTIVE", req.user);
    if (req.user.isActive === true) {
      next();
    } else {
      res.redirect("localhost:3000");
    }
  },
};

module.exports = middlewares;
