var express = require('express');
var router = express.Router();


const notifyGuest =require('../schemas/notificationGuest');

const notifyHost =require('../schemas/notificationHost');


//guest가 승인 여기서 
// userName은 신청한 사람 => 즉 host
router.post('/guestApprove',function(req, res,next){
  notifyGuest.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "approve"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
    return res.json({state : 0, msg : "Registeration approve"});
    })
});  


//host가 승인      
router.post('/hostApprove',function(req, res,next){
  notifyHost.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "approve"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration approve"});
         
     
      })
});  

//guest가 거절 
router.post('/guestRefuse',function(req, res,next){
  notifyGuest.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "refuse"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration refuse"});
     
      })
});


//host가 거절      
router.post('/hostRefuse',function(req, res,next){
  notifyHost.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "refuse"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration refuse"});
         
     
      })
});  


router.get('/getGuestApprove/:id', function(req, res, next){
  notifyGuest.find({userName : req.params.id, state : "approve"}, function(err, getInfo){
    if(err){
      return res.json(err);
    }
    console.log(req.params.id);
    console.log(getInfo);
    return res.json(getInfo);
  })
})

//host가 appve한 guest정보를 보여줌 
router.get('/getHostApprove/:id', function(req, res, next){
  notifyHost.find({userName : req.params.id, state : "approve"}, function(err, getInfo){
    if(err){
      return res.json(err);
    }
    console.log(req.params.id);
    console.log(getInfo);
    return res.json(getInfo);
  })
})

   
module.exports = router;