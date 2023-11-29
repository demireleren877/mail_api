const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const tokenServices = require("./token_services");
const fb_controller = require('./fb_controller');
const mailServices = require("./mail_services")

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});
app.post("/", (req, res) => {
    console.log(req.body);
    tokenServices.signIn(req, res);
    res.redirect("/");
});



app.get('/api', checkToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            mailServices.sendEmail(req.query.from, authData.user.mail, req.query.subject, req.query.text);
            res.json({
                success: true,
                message: 'Email Sent'
            });
        }
    });

})
function checkToken(req, res, next) {
    const bearerHeader = req.query.access_token;
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.sendStatus(403);
    }
}



app.get('/firebase', (req, res) => {
    fb_controller.getDataFirestore(res)
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});