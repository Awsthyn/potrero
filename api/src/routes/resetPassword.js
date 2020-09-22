const server = require("express").Router();
const nodemailer = require("nodemailer")
const { User } = require("../db.js");
var crypto = require('crypto');



//---------- Crea token, lo setea al usuario, y se lo envia por email -------
server.post('/forgot', function(req, res, next) {

    crypto.randomBytes(20, function(err, buf) {
        token = buf.toString('hex');
        return token
    })
console.log('BODY', req.body)
        User.findOne({ where: {email: req.body.email}})
        .then(usuario => {
            usuario.update({resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 })
            //Configurar mail remitente
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'fundacionelpotrero1@gmail.com',
                    pass: 'Henryelpotrero'
                }
            });

            var mailOptions = {
                from: "El Potrero",
                to: usuario.email,
                subject: 'Fundación El Potrero',
                text:
                'Estas recibiendo este email porque pediste cambiar tu contraseña.\n\n' +
                'Para continuar con el proceso, debes hacer click en el siguiente Link, o en su defecto copiar y pegar en el navegador:\n\n' +
                'http://localhost:3000/login/' + token + '\n\n' +
                'Si usted no pidió esto, por favor ignorar este mail y la contraseña se mantendrá igual.\n'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send(error.message)
                } else {
                    console.log("reset enviado");
                    res.status(200).jsonp(req.body)
                }
            })
    })
    .catch(err => console.log(err))
});


//---------- Crea token, lo setea al usuario, y se lo envia por email -------
server.get('/reset/:token', function(req, res, next) {
    var token = req.params.token
    console.log('TOKEN', token)
    User.findOne({where: {resetPasswordToken: token} })
    .then(usuario => {
        res.json(usuario)
        console.log(usuario)
    })
    .catch(err => console.log(err))
})

//-------- Actualiza la contraseña ----------------
server.put('/reset/:token', function(req, res, next) {

    try {
        const { token } = req.params;
        const { password } = req.body;
        User.findOne({where: {resetPasswordToken: token}}).then(user => {
            if (user) {
                user.password = password
                return user.save()
            }
        })
        .then( () => {
            res.sendStatus(200);
        });
    } catch (error) {
        console.error(error.message);
    }

})

module.exports = server;
