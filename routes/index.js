var express = require('express');
var router = express.Router();
var userModel = require('../models/user')
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/sign-up', async function(req, res, next) {

const cost = 10;

const hash = bcrypt.hashSync(req.body.password, cost);

var mail = await userModel.findOne({email: req.body.email})

console.log(req.body)
var result= false
var token = ""
if(!mail && req.body.email.length !=="" && req.body.name.length!=="" && req.body.password.length!=="" &&req.body.email.trim() !=="" && req.body.name.trim()!=="" && req.body.password.trim()!==""){

  var newUser= new userModel({
    firstname: req.body.name,
    email: req.body.email,
    password: hash,
    token: uid2(32)
  })

  var userSaved = await newUser.save()
  result= true
  token = userSaved.token
}else{
  var resultat =''
  console.log("je suis dans le else ")
  resultat= "l'enregistrement n'a pas pu aboutir"
}


  res.json({ result, resultat, token });
});

router.post('/sign-in', async function(req, res, next) {

  var user = await userModel.findOne({
    email: req.body.email,
  })

  var password = req.body.password

  var result = false


  if(bcrypt.compareSync(password, user.password) && req.body.email.length!=="" && req.body.password.length!==""){

    result = true

  }else{
    var resultat =''
 
    resultat= "mot de passe ou email incorrect"
    result= false
  }
  
  
    res.json({ result, resultat, user });
  });



module.exports = router;
