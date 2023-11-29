
const nodemailer = require('nodemailer');


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
            res.send({ success: false, message: error });
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail };