var express = require('express');
var router = express.Router();


const notifyApproveGuest =require('../schemas/notificationGuest');
const notifyRefuseGuest =require('../schemas/notificationGuest');

const notifyApproveHost =require('../schemas/notificationHost');
const notifyRefuseHost =require('../schemas/notificationHost');

router.post('/notifyApproveStateGuest',function(req, res,next){
  notifyApproveGuest.update({userName : req.body.userName},{$set : {state : "approve"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
    return res.json({state : 0, msg : "Registeration approve"});
    })
});  


      
router.post('/notifyApproveStateHost',function(req, res,next){
  notifyApproveHost.update({userName : req.body.userName},{$set : {state : "approve"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
   
    return res.json({state : 0, msg : "Registeration approve"});
         
     
      })
});  


      
   
module.exports = router;