var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  //servoce:"gmail",
  //host: "smtp.gmail.com",
  ////port: 465,
  ////secure: true,
  //auth: {
  //    user: "kmenezes@gmail.com",
  //    pass: "Jianada1"
  //}

  host: "smtpout.secureserver.net",
  port: 80,
  //secure: true,
  auth: {
    user: "info@sunobi.com",
    pass: "sbiinfo"
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('Get request received');
});

router.post('/send', function(req, res){
  var name = req.query.name;
  var mailOptions = {
    from: 'info@sunobi.com',
    to: 'kmenezes@gmail.com',
    subject: req.query.subject,
    text: 'Name: ' + name + String.fromCharCode(13) + String.fromCharCode(13) + req.query.text
  }
  console.log(mailOptions);

  res.setHeader('Access-Control-Allow-Origin','*');
  smtpTransport.sendMail(mailOptions, function(error, response){
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
