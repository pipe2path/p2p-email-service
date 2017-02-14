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
  var mailOptions = {
    from: req.query.from,
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
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
