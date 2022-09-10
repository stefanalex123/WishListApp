import nodemailer from "nodemailer"
































































function sendmail(subject, text, adress){
    const transporter = nodemailer.createTransport({
       service:"hotmail",
           auth: {
                user: 'stefan.focan@365.univ-ovidius.ro',
                pass: '****',
             },
        secure: false,
        });
        
    

    var mailOptions = {
      from: 'stefan.focan@365.univ-ovidius.ro',
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