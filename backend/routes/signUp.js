var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

//guestid 확인용, gudstid 가입, hostid 확인, hostid 가입 => 총 4개의 router 지정해야함 
router.post('/guest',function(req, res,next){
    if(!req.body.userName){
        res.json({status: 1, message: 'ID can not be empty!'})
    }
    if(!req.body.password){
            res.json({status: 1, message: 'password can not be empty!'})
    }
    // if(!req.body.gender){
    //     res.json({status: 1, message: 'gender can not be empty!'})
    // }
    // if(!req.body.age){
    //     res.json({status: 1, message: 'age can not be empty!'})
    // }
    // if(!req.body.work){
    //     res.json({status: 1, message: 'work can not be empty!'})
    // }
    // if(!req.body.address){
    //     res.json({status: 1, message: 'address can not be empty!'})
    // }
    // if(!req.body.location){
    //     res.json({status: 1, message: 'location can not be empty!'})
    // }
    if(!req.body.phone){
        res.json({status: 1, message: 'phone can not be empty!'})
    }
    if(!req.body.email){
        res.json({status: 1, message: 'email can not be empty!'})
    }
    
    guestModel.find({userName : req.body.id},function(err,guestModel){
        console.log(guestModel);
        if(err) {
          return res.json(err);
        };
        if(guestModel[0]){
            res.json({state : -1, msg : "ID alreay exists!"})
        } 
        else {
            // let registerUser = new guestModel();
            //   registerUser.userName = req.body.userName;
            //   registerUser.password = req.body.password;
            //   registerUser.email = req.body.email;
            //   registerUser.phone = req.body.phone;
            //   registerUser.address= req.body.address;
            //   registerUser.location = req.body.location;
            //   registerUser.age = req.body.age;
            //   registerUser.work = req.body.work;
            //   registerUser.gender = req.body.gender;
            // registerUser.save(function () {
            //     if(err){
            //         res.json({state : -1, msg : err});
            //     }
            //   res.json({ status: 0, message: 'guest register success!' })
            // })
          }
        })
        
        //지금은 find함수 밖으로 분리만 해놓은 상태 => find와 save 동시 불가능 
        //router 분리 필요 
        let registerUser = new guestModel();
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
              res.json({state : -1, msg : "error is occured"});
          }
        res.json({ status: 0, message: 'guest register success!' })
      })

      });
     
    

   
module.exports = router;