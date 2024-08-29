const http = require("http");
const nodemailer = require("nodemailer");
require('dotenv').config();

const server = http.createServer((request, response) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "kanerkartanaya29@gmail.com",
        subject: "Congratulations!",
        text: "Hello, Tanaya!"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error occurred: ", error);
            response.statusCode = 500;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Error sending email.');
            return;
        }

        console.log("Email sent successfully: ", info.response);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Email sent successfully!');
    });
});

server.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
