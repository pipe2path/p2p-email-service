var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

console.log('user: ' + process.env.USERNAME);
console.log('pass: ' + process.env.PASSWORD);

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERNAME, // Your email id
        pass: process.env.PASSWORD // Your password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
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
    to: 'kevinmenezes@yahoo.com, cardelectric@yahoo.com',
    subject: "Contact form submitted",
    text: 'Name: ' + name + String.fromCharCode(13) + String.fromCharCode(13) + req.body.phone + 
                String.fromCharCode(13) + String.fromCharCode(13) + req.body.email + 
            String.fromCharCode(13) + String.fromCharCode(13) + req.body.comments ,
    auth: {

    }
}
console.log(mailOptions);

res.setHeader('Access-Control-Allow-Origin','*');
transporter.sendMail(mailOptions, function(error, response){
    if (error){
    console.log('Error: ' + error);
    res.end("error: " + error);
    }
    else{
        res.redirect("http://cardenaselectric.netlify.com/#contact_form");
    }
})
})
  
  module.exports = router;
  