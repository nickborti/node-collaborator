var express = require('express');
var router = express.Router();

router.get('/create', (req, res) => {
  var newTask = new Task();

  newTask.save((err, data) => {
    if(err){
      console.log(err);
      res.render('error');
    }else{
      res.redirect('/task/'+data.id);
    }
  })
});

router.get('/:id', (req, res) => {
  if(req.params.id){
    Task.findOne({_id: req.params.id}, (err, data) => {
      if(err){
        console.log(err);
        res.render('error');
      }

      if(data){
        res.render('task', { data: data, roomId: data.id })
      }else{
        res.render('error');
      }
    })
  }
});

module.exports = router;
