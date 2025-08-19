"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sendMail(to, subject, message)

const nodemailer = require('nodemailer')

// sendMail(to, subject, message)

module.exports = function sendMail(to, subject, message){

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {

    user: process.env.MAIL_USER || 'mehmet.turker.tuncer.mtt@gmail.com',
    pass: process.env.MAIL_PASS 
  }
})

// SEND MAIL
transporter.sendMail({

    from: 'mehmet.turker.tuncer.mtt@gmail.com',
    to : to,  
    // from: 'mehmet.turker.tuncer.mtt@gmail.com',
    // to: 'turistomer33@gmail.com',
    subject: subject,
    text: message,
    html:  message  
    
    
    //text: 'Hello, this is a test email sent from the Pizza API using Nodemailer!',
    //html: '<b>Hello, this is a test email sent from the Pizza API using Nodemailer!</b>'


}, function (error, success) {
  if (error) {
    console.log("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", success);
  }   

})



}



