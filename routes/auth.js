var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/login')
  .get((req, res, next) => {
    res.render('login', {title: 'Login - Node Collaborator'})
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/auth/login'
  }), function(req, res){
    res.redirect('/');
  });

router.route('/register')
  .get((req, res, next) => {
    res.render('register', {title: 'Register - Node Collaborator'})
  })
  .post((req, res, next) => {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('password', 'Empty Password').notEmpty();
    req.checkBody('password', 'Password do not match').equals(req.body.confirmPassword).notEmpty();

    var errors = req.validationErrors();

    console.log("errors ", errors);

    if(errors){
      res.render('register', {
        name: req.body.name,
        email: req.body.email,
        errorMessages: errors
      })
    }else{
      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      user.save(function(err){
        console.log("user saved maybe ", err);
        if(err){
          res.render('register', {
            errorMessages: err
          })
        }else{
          res.redirect('/auth/login');
        }
      })
    }

  });

  router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));

  router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

module.exports = router;
