const server = require("express").Router();
const nodemailer = require("nodemailer");
const {User} = require("../db.js");

server.get('/:id/email', function(req, res){
    User.findOne({where: {id : req.params.id}})
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
            subject: 'Términos y condiciones. Fundación El Potrero',
            attachments: [{
               filename: 'file.pdf',
               path: __dirname + '/uploads/terminosycondiciones.pdf',
               contentType: 'application/pdf'
             }], function (err, info) {
                if(err){
                    console.error(err);
                    res.send(err);
                }
                else{
                    console.log(info);
                    res.send(info);
                    }
                }
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
        .catch(err => console.log(err));
    })

    module.exports = server;
