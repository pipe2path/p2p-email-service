var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: "kmenezes@gmail.com",
      pass: "Jianada1"
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res){
  var name = req.query.name;
  var mailOptions = {
    to: 'kmenezes@gmail.com',
    subject: 'Ice Skating Lessons',
    text: 'Name: ' + name +
          String.fromCharCode(13) + String.fromCharCode(13) + req.query.from +
          String.fromCharCode(13) + String.fromCharCode(13) + req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if (error){
      res.send("error: " + error);
    }
    else{
      console.log("Message sent: " + response.message);
      res.send("sent");
    }
  })
})

module.exports = router;
