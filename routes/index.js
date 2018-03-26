var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', (req, res, next) => {
  res.render('about', {title: 'About - Node Collaborator'});
});

router.route('/contact')
  .get((req, res, next) => {
    res.render('contact', {title: 'Contact Us - Node Collaborator'});
  })
  .post((req, res, next) => {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();

    var errors = req.validationErrors();

    if(errors){
      res.render('contact', {
        title: 'Contact Us - Node Collaborator',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      })
    }else{
      var mailOptions = {
          from: 'Node Collaborator <no-reply@sapnick.com>',
          to: 'saaggy18@gmail.com',
          subject: 'You got a new message from visitor 👽 😬 ',
          text: req.body.message
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          return console.log(error);
        }else{
          res.render('thank', {title: 'Thank You - Node Collaborator'});
        }
      });

    }
  });


module.exports = router;
