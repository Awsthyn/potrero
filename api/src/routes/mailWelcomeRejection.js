const server = require("express").Router();
const nodemailer = require("nodemailer");
const { User } = require("../db.js");

//cuando se crea un voluntario o cuando cambia el state a rejected se envía un mail con asunto
//según el caso
server.post('/mail', function(req, res, next) {
User.findOne({ where: {email: req.body.email}})
.then(volunteer => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'fundacionelpotrero1@gmail.com',
            pass: 'Henryelpotrero'
        }
    });
    if(volunteer.state === "pendiente"){
        var mailOptions = {
            from: "El Potrero",
            to: volunteer.email,
            subject: 'Fundación El Potrero',
            html:
            `<h3>Hola ${volunteer.firstName} ${volunteer.lastName} !!</h3>
            <p>Desde la Fundación, queremos agradecerte por postularte para dar ayuda escolar a los niños y niñas de El Potrero.</p>
            <p>Tus datos se registraron correctamente en nuestro sitio. Cualquier novedad la estaremos comunicando por este medio.</p>
            <p>Un abrazo</p>`
        };
    }else{
        var mailOptions = {
            from: "El Potrero",
            to: volunteer.email,
            subject: 'Fundación El Potrero',
            html:
            `<h3>Hola ${volunteer.firstName} ${volunteer.lastName} !!</h3>
            <p>Desde la fundación agradecemos que quieras sumarte para brindar apoyo escolar a los niños y niñas de El Potrero.</p>
            <p>En estos momentos no tenemos puestos vacantes, pero te tendremos en cuenta en un futuro si surgen nuevos espacios a cubrir.</p>
            <p>Muchas gracias por tu espíritu voluntario. Un abrazo</p>`
        };
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            console.log("reset enviado");
            res.status(200).jsonp(req.body)
        }
    })
})
.catch(err => console.log(err));
})

module.exports = server;
