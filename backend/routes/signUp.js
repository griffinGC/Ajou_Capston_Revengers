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
            return res.json({state : -1, msg : "host ID alreay exists!"});
        } 
        else {
            return res.json({state : 0, msg : "host ID can use"});           
          }
        })
  });        
        
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
  });  

router.post('/host',function(req, res,next){ 
  console.log("test");
      if(!req.body.userName){
          return res.json({state: -1, msg: 'ID can not be empty!'})
      }
      if(!req.body.password){
          return res.json({state: -1, msg: 'password can not be empty!'})
      }    
      if(!req.body.phone){
          return res.json({state: -1, msg: 'phone can not be empty!'})
      }
      if(!req.body.email){
          return res.json({state: -1, msg: 'email can not be empty!'})
      }
       console.log(req.body.userName);
        let registerUser = new hostModel();
        registerUser.userName = req.body.userName;
        registerUser.password = req.body.password;
        registerUser.email = req.body.email;
        registerUser.phone = req.body.phone;
        registerUser.name = req.body.name;
        registerUser.address= req.body.address;
        registerUser.location = req.body.location;
        registerUser.age = req.body.age;
        registerUser.work = req.body.work;

        //gender => number man=0, woman =1
        registerUser.gender = req.body.gender;
        registerUser.role = "host";
      registerUser.save(function (err) {
          if(err){
              return res.json({state : -1, msg : "error is occured"});
              
              // return;
          }
        res.json({ state: 0, msg: "host register success!" });
      });
});


router.get('/guestConfirm/:id',function(req, res,next){
    guestModel.find({userName : req.params.id},function(err,guestModel){
        console.log(hostModel);
        if(err) {
          return res.json(err);
        };
        if(guestModel[0]){
            return res.json({state : -1, msg : "guest ID alreay exists!"})
        } 
        else {
            return res.json({state : 0, msg : "guest ID can use"});           
          }
        }); 
});

router.post('/guest',function(req, res,next){
      if(!req.body.userName){
        return res.json({state: -1, msg: 'ID can not be empty!'})
        }
        if(!req.body.password){
            return res.json({state: -1, msg: 'password can not be empty!'})
        }    
        if(!req.body.phone){
            return res.json({state: -1, msg: 'phone can not be empty!'})
        }
        if(!req.body.email){
            return res.json({state: -1, msg: 'email can not be empty!'})
        }        

        let registerUser = new guestModel();
        registerUser.userName = req.body.userName;
        registerUser.name = req.body.name;
        registerUser.password = req.body.password;
        registerUser.email = req.body.email;
        registerUser.phone = req.body.phone;
        registerUser.ability= req.body.abiity;        
        registerUser.age = req.body.age;  
        //gender => number man=0, woman =1      
        registerUser.gender = req.body.gender;
        registerUser.role = "guest";
        console.log("1");
      registerUser.save(function (err) {
          if(err){
              console.log(err);
              return res.json({state : -1, msg : "error is occured"});
          }
        res.json({ state: 0, msg: 'guest register success!' })
      })
});

   
module.exports = router;