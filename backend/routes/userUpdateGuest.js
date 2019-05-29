var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');



//회원정보 가져오기 테스트
router.get('/',function(req, res,next){
  console.log("userInfo Test");
  return res.json({state : 0, msg : "userInfo router test"});
  });     


//guest회원정보 수정 
router.post('/updateInfo/guest', function(req, res, next){
    //굳이 만들필요 없을듯 ? test 해볼 것 
    let editInfo = new guestModel();
    editInfo.userName = req.body.userName;
    editInfo.password = req.body.password;
    editInfo.name = req.body.name;
    editInfo.ability = req.body.ability;
    editInfo.phone = req.body.phone;
    editInfo.email = req.body.email;    
    
    console.log("userInfo Test");
    guestModel.update({userName : req.body.userName},{$set : {password : req.body.password, userName:req.body.userName, name : req.body.name
        ,ability : req.body.ability, phone : req.body.phone,email : req.body.email }},function(err){
        if(err){
            return res.json({state : -1, msg : "guest Information is failed to modify "});
        }
        console.log(editInfo);
        res.json({state : 0, msg : "guest Information successfully modified"});
    })
})


   
module.exports = router;