const server = require("express").Router();
const nodemailer = require("nodemailer")
const { Volunteer } = require("../db.js");
const crypto = require('crypto');




//---------- Crea token, lo setea al usuario, y se lo envia por email -------
server.post('/setPassword', function(req, res, next) {
    crypto.randomBytes(20, function(err, buf) {
        token = buf.toString('hex');
        return token
    })

        Volunteer.findOne({ where: {email: req.body.email}})
        .then(usuario => {
            usuario.update({resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 })
            //Configurar mail remitente
            console.info("Soy el usuario",usuario)
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
                html:
                `<h3>Hola ${usuario.firstName} ${usuario.lastName} !!</h3>
                <p>Desde la fundación El Potrero te comunicamos que fuiste elegido como Asesor para dar apoyo escolar a los niños y niñas de El Potrero.</p>
                <p>Para continuar con el proceso, debes hacer click en el siguiente Link, o en su defecto copiar y pegar en el navegador:</p>
                <p>http://localhost:3000/resetPassword/${token}</p>
                <p>Estamos muy Felices de que te sumes a esta gran Causa.</p>
                <p>Un abrazo</p>`
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

module.exports = server;
