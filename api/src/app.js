const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
// // ----> passport --->
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');

// const cors = require('cors');

const {User} = require('./db.js');
// require('./db.js');
const server = express();

server.name = 'API';

//Estrategia Local de Autenticación con passport
passport.use(
	new Strategy(
		{
			usernameField: 'email',
		},
		function (email, password, done) {
			User.findOne({where: {email: email}})
				.then(user => {
					if (!user) return done(null, false);
					user.isPasswordValid(password).then(validation => {
						if (user && validation) return done(null, user);
						else return done(null, false);
					});
				})
				.catch(err => {
					return done(err);
				});
		},
	),
);

// Para recuperar los datos de la sesión autenticada Passport necesita dos métodos para
// serializar y deserializar al usuario de la sesión.
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// Al deserealizar la información del usuario va a quedar almacenada en req.user
passport.deserializeUser(function (id, done) {
	User.findByPk(id)
		.then(user => {
			done(null, user);
		})
		.catch(err => {
			return done(err);
		});
});

server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));

// ---> passport --->
server.use(
	require('express-session')({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	}),
);

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
});

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	credentials : true
// }
// server.use(cors(corsOptions));

server.use(`/uploads`, express.static(path.join(__dirname, '/routes/uploads')));
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
