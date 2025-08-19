"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Logger:
app.use(require("./src/middlewares/logger"));

// Auhentication:
app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));


/* ------------------------------------------------------- */

// E_MAIL
// npm i nodemailer 
// ethereal.mail   fake mail service
//const nodemailer = require("nodemailer");

// create test account

// nodemailer.createTestAccount().then((data) => console.log(data)) ;
/*
MAIL HASABI BILGILERI:

{
  user: 'p4rf56z4kcph2z6z@ethereal.email',
  pass: 'RpJeqsX4Xw1XCmahTc',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false }, // EMAIL ALMA SUNUCU AYARLARI
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },  // EMAIL GONDERME SUNUCU AYARLARI
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },  // EMAIL GONDERME SUNUCU AYARLARI

  web: 'https://ethereal.email',
  mxEnabled: false
}

*/

// Connect to MailServer/ SMTP:

/*
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.ethereal.email",
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE || false, // true for 465, false for other ports
  auth:{
    user: 'p4rf56z4kcph2z6z@ethereal.email',
    pass: 'RpJeqsX4Xw1XCmahTc',
  
  }
  })

transporter.sendMail({

    from: 'p4rf56z4kcph2z6z@ethereal.email',
    to: 'turistomer33@gmail.com',
    subject: 'Test Email from Pizza API',
    text: 'Hello, this is a test email sent from the Pizza API using Nodemailer!',
    html: '<b>Hello, this is a test email sent from the Pizza API using Nodemailer!</b>'


}, function (error, success) {
  if (error) {
    console.log("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", success);
  }   

})

*/
/*
// Google Mail SMTP Settings:
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {

    user: process.env.MAIL_USER || 'mehmet.turker.tuncer.mtt@gmail.com',
    pass: process.env.MAIL_PASS || 'plux ojag bdzm ectm' 
  }
})


transporter.sendMail({

    from: 'mehmet.turker.tuncer.mtt@gmail.com',
    to: 'turistomer33@gmail.com',
    subject: 'Test Email from Pizza API',
    text: 'Hello, this is a test email sent from the Pizza API using Nodemailer!',
    html: '<b>Hello, this is a test email sent from the Pizza API using Nodemailer!</b>'


}, function (error, success) {
  if (error) {
    console.log("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", success);
  }   

})
*/

/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use("/", require("./src/routes/"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.

