var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

//guestid 확인용, gudstid 가입, hostid 확인, hostid 가입 => 총 4개의 router 지정해야함 
router.get('/:id',function(req, res,next){
  console.log("start");
  console.log(req.params.id);
  res.json({state : 0});
    
  });     

router.get('/hostConfirm/:id',function(req, res,next){
  console.log(req.params.id);
    hostModel.find({userName : req.params.id},function(err,hostModel){
      // console.log(req.params.id);

        if(err) {
          return res.json(err);
        };
        if(hostModel[0]){
            res.json({state : -1, msg : "host ID alreay exists!"});
        } 
        else {
            res.json({state : 0, msg : "host ID can use"});           
          }
        })
  });        
        
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
  });  

router.post('/host',function(req, res,next){ 
  console.log("test");
      if(!req.body.userName){
          res.json({state: -1, message: 'ID can not be empty!'})
      }
      if(!req.body.password){
              res.json({state: -1, message: 'password can not be empty!'})
      }    
      if(!req.body.phone){
          res.json({state: -1, message: 'phone can not be empty!'})
      }
      if(!req.body.email){
          res.json({state: -1, message: 'email can not be empty!'})
      }
       console.log(req.body.userName);
        let registerUser = new hostModel();
        registerUser.userName = req.body.userName;
        registerUser.password = req.body.password;
        registerUser.email = req.body.email;
        registerUser.phone = req.body.phone;
        registerUser.address= req.body.address;
        registerUser.location = req.body.location;
        registerUser.age = req.body.age;
        registerUser.work = req.body.work;
        registerUser.gender = req.body.gender;
      registerUser.save(function (err) {
          if(err){
              return res.json({state : -1, msg : "error is occured"});
              // return;
          }
        res.json({ state: 0, message: "host register success!" });
      });

});



router.get('/guestConfirm/:id',function(req, res,next){
    guestModel.find({userName : req.params.id},function(err,guestModel){
        console.log(hostModel);
        if(err) {
          return res.json(err);
        };
        if(guestModel[0]){
            res.json({state : -1, msg : "guest ID alreay exists!"})
        } 
        else {
            res.json({state : 0, msg : "guest ID can use"});           
          }
        }); 
});

router.post('/guest',function(req, res,next){
      if(!req.body.userName){
        res.json({state: -1, message: 'ID can not be empty!'})
        }
        if(!req.body.password){
            res.json({state: -1, message: 'password can not be empty!'})
        }    
        if(!req.body.phone){
        res.json({state: -1, message: 'phone can not be empty!'})
        }
        if(!req.body.email){
        res.json({state: -1, message: 'email can not be empty!'})
        }        
        let registerUser = new guestModel();
        registerUser.userName = req.body.userName;
        registerUser.password = req.body.password;
        registerUser.email = req.body.email;
        registerUser.phone = req.body.phone;
        registerUser.ability= req.body.abiity;        
        registerUser.age = req.body.age;        
        registerUser.gender = req.body.gender;
      registerUser.save(function (err) {
          if(err){
              return res.json({state : -1, msg : "error is occured"});
          }
        res.json({ state: 0, message: 'guest register success!' })
      })
});

   
module.exports = router;