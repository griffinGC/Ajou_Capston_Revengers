var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

const guestInfo = require('../schemas/createGuest');
const hostInfo= require('../schemas/createHost');



//회원정보 가져오기 테스트
router.get('/',function(req, res,next){
  console.log("userInfo Test");
  return res.json({state : 0, msg : "userInfo router test"});
  });     

      

//guest정보 가져오기
router.get('/getInfo/:id', function(req, res, next){
    guestModel.find({userName : req.params.id}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//post test
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
});  

//guest회원정보 수정 
router.post('/updateInfo', function(req, res, next){
    
       
    let editInfo = new guestModel();
    editInfo.userName = req.body.userName;
    editInfo.password = req.body.password;
    editInfo.name = req.body.name;
    editInfo.ability = req.body.ability;
    editInfo.phone = req.body.phone;
    editInfo.email = req.body.email;    
    
    console.log("userInfo Test");
    guestModel.update({$set : {password : req.body.password, userName:req.body.userName, name : req.body.name
        ,ability : req.body.ability, phone : req.body.phone,email : req.body.email }},function(err){
        if(err){
            return res.json({state : -1, msg : "Information is failed to modify "});
        }
        console.log(editInfo);
        res.json({state : 0, msg : "Information successfully modified"});
    })
})

//Host정보 가져오기
router.get('/getInfo/:id', function(req, res, next){
    hostModel.find({userName : req.params.id}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//board post test
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
});  

//host회원정보 수정 
router.post('/updateInfo', function(req, res, next){
    
       
    let editInfo = new hostModel();
    editInfo.userName = req.body.userName;
    editInfo.password = req.body.password;
    editInfo.name = req.body.name;
    editInfo.work = req.body.work;
    editInfo.address = req.body.address;
    editInfo.loacation = req.body.loacation;
    editInfo.phone = req.body.phone;
    editInfo.email = req.body.email;    
    
    console.log("userInfo Test");
    hostModel.update({$set : {password : req.body.password, userName:req.body.userName, name : req.body.name
        ,work : req.body.work, phone : req.body.phone,email : req.body.email,
        address = req.body.address,loacation = req.body.loacation  }},function(err){
        if(err){
            return res.json({state : -1, msg : "Information is failed to modify "});
        }
        console.log(editInfo);
        res.json({state : 0, msg : "Information successfully modified"});
    })
})




   
module.exports = router;