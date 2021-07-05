var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERNAME, 
        pass: process.env.PASSWORD 
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

// GET
router.get('/', function(req, res, next) {
    res.send('Get request received');
  });
  
// POST  
router.post('/send', function(req, res){
    var name = req.body.name;
    var comments = req.body.comments;
    if (comments.includes('undefined')){
        res.redirect("http://cardenaselectric.com/#contact_form");    
    }

    var mailOptions = {
        from: 'admin@cardelectric.com',
        //to: 'kevinmenezes@yahoo.com, cardelectric@yahoo.com',
        to: 'kevinmenezes@yahoo.com',
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
            res.redirect("http://cardenaselectric.com/#contact_form");
        }
    })
})
  
module.exports = router;
  