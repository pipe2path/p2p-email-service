var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix'
    //path: '/usr/sbin/sendmail'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send('Get request received');
  });
  
  router.post('/send', function(req, res){
    var name = req.body.name;
        
    var mailOptions = {
      from: 'admin@cardelectric.com',
      to: 'cardelectric@yahoo.com',
      subject: "Contact form submitted",
      text: 'Name: ' + name + String.fromCharCode(13) + String.fromCharCode(13) + req.body.text
    }
    console.log(mailOptions);
  
    res.setHeader('Access-Control-Allow-Origin','*');
    transporter.sendMail(mailOptions, function(error, response){
      if (error){
        console.log('Error: ' + error);
        res.end("error: " + error);
      }
      else{
        console.log("Message sent");
        res.end("sent");
      }
    })
  })
  
  module.exports = router;
  