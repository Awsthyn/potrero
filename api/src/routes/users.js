const server = require("express").Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const {
  User,
  UserSchedule,
  Subject,
  AcademicLevel,
  EducationLevel,
} = require("../db.js");

const isAdmin = require('./middlewares.js').isAdmin;
const isUserActive = require('./middlewares.js').isUserActive;
const isUserAdmin = require('./middlewares.js').isUserAdmin;

// URL PARA MIDDLEWARES



// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

// USAMOS ESTE MIDDLEWARE PARA GUARDAR ARCHIVOS
const multer = require("multer");
const { isAuthenticated } = require("./authenticate.js");

// Usamos esta funcion para guardar el archivo con extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/uploads`);
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({
  storage: storage,
});


server.get("/", isAdmin, (req, res) => {
  User.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "password",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    include: [
      {
        model: Subject,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: AcademicLevel,
            attributes: {
              exclude: ["createdAt", "updatedAt", "educationLevelId"],
            },
            include: [
              {
                model: EducationLevel,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      },
      {
        model: UserSchedule,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  })
    .then((users) => {
      // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "USERS" ESTÁ VACÍO. ASÍ
      // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS USUARIOS DENTRO.
      !users.length
        ? res.send("No hay usuarios disponibles.")
        : res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

// BUSCA UN USUARIO EN ESPECÍFICO Y MUESTRA SUS DATOS.
server.get("/:id", isUserActive, (req, res) => {
  // ACÁ BUSCA UN USUARIO EN LA BASE DE DATOS
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "password",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    include: [
      {
        model: Subject,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: AcademicLevel,
            attributes: {
              exclude: ["createdAt", "updatedAt", "educationLevelId"],
            },
            include: [
              {
                model: EducationLevel,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      },
      {
        model: UserSchedule,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  })
    .then((userFound) => {
      // SI ENCUENTRA AL USUARIO, LO ENVÍA. SINO, ENVÍA UN MENSAJE DE ERROR.
      !userFound ? res.send("El usuario no existe.") : res.send(userFound);
    })
    .catch((err) => {
      res.send(err);
    });
});

// CREA UN USUARIO
server.post("/", upload.single("cv"), (req, res) => {
  // RECIBE LOS DATOS DEL USUARIO POR BODY
  let usuario;
  if (!req.file) {
    usuario = req.body;
  } else {
    usuario = {
      ...req.body,
      cv: `${req.file.filename}`,
    };
  }
  User.create(usuario)
    .then((userCreated) => {
      res.send(userCreated)
    })
    .catch(err => res.send(err))
});

// RELACIONA LAS MATERIAS CON USUARIOS
server.post("/:id/subjects", (req, res) => {
  var id = req.params.id;
  var materias = req.body.materias;
  var user = User.findByPk(id);

  materias.map((m, i) => {
    var subject = Subject.findOne({
      where: {
        name: m,
      },
    });
    Promise.all([user, subject])
      .then((values) => {
        var user = values[0];
        var subject = values[1];
        user.addSubject(subject);
        if (i === arrayMateria.length - 1) res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

// BUSCA UN USUARIO Y MODIFICA LA INFORMACIÓN QUE LE HAYAN ENVIADO POR BODY
server.put("/:id", isUserActive, (req, res) => {
  if (req.body.disabled) {
    User.findByPk(req.params.id).then((user) => {
      user.state = "rechazado";
      user.save();
      res.json(user);
    });
  }
  // BUSCA Y MODIFICA AL USUARIO ENCONTRADO.
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

    // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
    .then(() => {
      User.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then((userWithChanges) => {
          res.send(userWithChanges);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
}); 

// RELACIONA LAS MATERIAS CON USUARIOS
server.post("/:id/subjects", (req, res) => {
  var id = req.params.id;
  var materias = req.body.subjects;
  var user = User.findByPk(id);

  materias.map((m, i) => {
    var subject = Subject.findOne({
      where: {
        name: m,
      },
    });
    Promise.all([user, subject])
      .then((values) => {
        var user = values[0];
        var subject = values[1];
        user.addSubject(subject);
        if (i === arrayMateria.length - 1) res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

module.exports = server;
