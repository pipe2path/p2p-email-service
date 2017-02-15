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
  //res.render('index', { title: 'Express' });
  res.send('Get request received');
});

router.get('/send', function(req, res){
  var name = req.query.name;
  var mailOptions = {
    from: 'kmenezes@gmail.com',
    to: 'kmenezes@gmail.com',
    subject: req.query.subject,
    text: 'Name: ' + name + String.fromCharCode(13) + String.fromCharCode(13) + req.query.text
  }
  console.log(mailOptions);

  res.setHeader('Access-Control-Allow-Origin','*');
  smtpTransport.sendMail(mailOptions, function(error, response){
    if (error){
      res.send("error: " + error);
    }
    else{
      console.log("Message sent: " + response);
      res.send("sent");
    }
  })
})

module.exports = router;
