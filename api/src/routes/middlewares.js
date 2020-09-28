const middlewares = {
  isAdmin: function (req, res, next) {
    if (req.user.state === "admin") {
      console.log("Estoy entrando para el ADMIN");
      next();
    } else {
      res.redirect("localhost:3000");
    }
  },
  isUserAdmin: function (req, res, next) {
    if (req.user.state === "aceptado" || req.user.state === "admin") {
      next();
    } else {
      res.redirect("localhost:3000");
    }
  },
  isUserActive: (req, res, next) => {
    if (req.user.isActive === true) {
      next();
    } else {
      res.redirect("localhost:3000");
    }
  },
};

module.exports = middlewares;
