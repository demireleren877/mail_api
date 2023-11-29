
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
        from: {
            name: "Postacı",
            address: "demireleren1903@gmail"
        },
        to: to,
        subject: "New Message From Your Website",
        text: text,
        replyTo: from.address
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