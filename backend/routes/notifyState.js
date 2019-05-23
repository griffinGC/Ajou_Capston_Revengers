var express = require('express');
var router = express.Router();


const notifyApproveGuest =require('../schemas/notificationGuest');
const notifyRefuseGuest =require('../schemas/notificationGuest');


router.post('/notifyStateGuest',function(req, res,next){
  notifyApproveGuest.update({userName : req.body.userName},{$set : {state : approve}},function(err,guestBoardContent){
      if(req.body.state == approve) {
        return res.json({state : 0, msg : "Registeration Accept"});
      };     
     
      })
});  

router.post('/notifyStateGuest',function(req, res,next){
  notifyRefuseGuest.update({userName : req.body.userName},{$set : {state : refuse}},function(err,guestBoardContent){
      if(req.body.state == refuse) {
        return res.json({state : -1, msg : "Registeration Refuse"});
      };     
     
      })
});
      
   
module.exports = router;