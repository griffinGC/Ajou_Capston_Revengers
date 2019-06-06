var express = require('express');
var router = express.Router();


const notifyApproveGuest =require('../schemas/notificationGuest');
const notifyRefuseGuest =require('../schemas/notificationGuest');

const notifyApproveHost =require('../schemas/notificationHost');
const notifyRefuseHost =require('../schemas/notificationHost');

router.post('/notifyApproveStateGuest',function(req, res,next){
  notifyApproveGuest.update({userName : req.body.userName},{boardID : req.body.boardID},{$set : {state : "approve"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
    return res.json({state : 0, msg : "Registeration approve"});
    })
});  


      
router.post('/notifyApproveStateHost',function(req, res,next){
  notifyApproveHost.update({userName : req.body.userName},{boardID : req.body.boardID},{$set : {state : "approve"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration approve"});
         
     
      })
});  


router.get('/getGuestApprove/:id', function(req, res, next){
  notifyApproveGuest.find({userName : req.params.id, state : "approve"}, function(err, getInfo){
    if(err){
      return res.json(err);
    }
    console.log(req.params.id);
    console.log(getInfo);
    return res.json(getInfo);
  })
})

//host가 guest를 approve
router.get('/getHostApprove/:id', function(req, res, next){
  notifyApproveHost.find({userName : req.params.id, state : "approve"}, function(err, getInfo){
    if(err){
      return res.json(err);
    }
    console.log(req.params.id);
    console.log(getInfo);
    return res.json(getInfo);
  })
})

router.post('/notifyRefuseStateGuest',function(req, res,next){
  notifyRefuseGuest.update({userName : req.body.userName},{boardID : req.body.boardID},{$set : {state : "refuse"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration refuse"});
     
      })
});


      
router.post('/notifyRefuseStateHost',function(req, res,next){
  notifyRefuseHost.update({userName : req.body.userName},{boardID : req.body.boardID},{$set : {state : "refuse"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration refuse"});
         
     
      })
});  



      
   
module.exports = router;