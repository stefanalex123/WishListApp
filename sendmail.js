import nodemailer from "nodemailer"

function sendmail(subject, text, adress){
    const transporter = nodemailer.createTransport({
       service:"hotmail",
           auth: {
                user: 'wishlistapp99@outlook.com',
                pass: '123456789baaA',
             },
        secure: false,
        });
    
    var mailOptions = {
      from: 'wishlistapp99@outlook.com',
      to: adress,
      subject: subject,
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }

    export default sendmail;