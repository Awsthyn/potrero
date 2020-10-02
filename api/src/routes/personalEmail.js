const server = require("express").Router();
const nodemailer = require("nodemailer");

//Envía mail personales a asesores o estudiantes


server.post('/asesorEmail', (req, res) => {
	// Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'fundacionelpotrero1@gmail.com',
            pass: 'Henryelpotrero'
        }
    });
	
    // Definimos el email
    var mailOptions = {
        from: "El Potrero",
        to: req.body.email,
        subject: req.body.asunto,
        text: req.body.mensaje, 
    };

    // Enviamos el email
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            res.status(200).jsonp(req.body)
        }
    })
    })

    server.post('/studentEmail', (req, res) => {
        // Definimos el transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'fundacionelpotrero1@gmail.com',
                pass: 'Henryelpotrero'
            }
        });
        
        // Definimos el email
        var mailOptions = {
            from: "El Potrero",
            to: req.body.email,
            subject: req.body.asunto,
            text: req.body.mensaje, 
        };
    
        // Enviamos el email
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message)
            } else {
                res.status(200).jsonp(req.body)
            }
        })
        })
	
module.exports = server;