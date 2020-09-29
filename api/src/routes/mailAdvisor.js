const server = require("express").Router();
const nodemailer = require("nodemailer");
const {User} = require("../db.js");

//Envío mail desde la fundación a un asesor
server.post('/advisor', function(req, res){
    User.findOne({where: {email : req.body.email}})
    .then(volunteer =>{
        const transporter= nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: 'fundacionelpotrero1@gmail.com',
                pass: 'Henryelpotrero'
            }
        });

        var mailOptions = {
            from: "El Potrero",
            to: volunteer.email,
            subject: 'Fundación El Potrero',
            text: req.body.body
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
