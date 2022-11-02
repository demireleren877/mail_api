const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
    const user = { mail: req.body.email };
    jwt.sign({ user }, 'secretkey', (err, token) => {
        sendEmail("", req.body.email, "Your Mailation Access Code Arrived", "Your Access Code: " + token);
    });
    res.redirect("/");
});



app.get('/api/service', checkToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            sendEmail(req.query.from, authData.user.mail, req.query.subject, req.query.text);
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

function sendEmail(from, to, subject, text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "demireleren1903@gmail.com",
            pass: "ceuqchabyttkvwig"
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}




app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});