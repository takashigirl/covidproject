function sendMail(address,servername,port) {
    const mailer = require('nodemailer');

    text1 = 'Hi '+ address +'\n';
    text2 = 'Thank you for registering, we are nearly there. Please click';
    text3 = 'on the following link to complete registration\n\n';
    texturl = 'http://' + servername + ':' + port + '/api/verifyEmail?email='+address;

    text = text1 + text2 + text3 + texturl;

    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mail.service287@gmail.com',
            pass: 'G00dday20'
        }
    });
    var mailOptions = {
      from: 'mail.service287@gmail.com',
      to: address,
      subject: 'HI, WELCOME TO COVID19-TRACKER',
      text: text
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  };

    
    
    
    function sendLocationIDmail(companyname,locationID,address) {
      console.log('******** sendLocationIDmail', locationID);
      const mailer = require('nodemailer');
  
      text1 = 'Hi '+ companyname +'\n';
      text2 = 'Thank you for registering, please see below for the locationID\n';
      
      texturl = 'locationID:'+locationID;
  
      text = text1 + text2 + texturl;
  
      var transporter = mailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'mail.service287@gmail.com',
              pass: 'G00dday20'
          }
      });

    var mailOptions = {
        from: 'mail.service287@gmail.com',
        to: address,
        subject: 'your covid19-tracker locationID',
        text: text
      };
     
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    };
      
    
    

module.exports = {
    sendMail,
    sendLocationIDmail
   
}