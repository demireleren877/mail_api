const jwt = require('jsonwebtoken');
const mailServices = require("./mail_services");
const fbController = require('./fb_controller');


function signIn(req, res) {
    const user = { mail: req.body.email };
    jwt.sign({ user }, 'secretkey', (err, token) => {
        fbController.signUP(req, res, token)
        mailServices.sendEmail("Postacı <demireleren1903@gmail>", req.body.email, "Your Mailation Access Code Arrived", "Your Access Code: " + token);
    });
}

module.exports = { signIn }