var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');
const notifyHost =require('../schemas/notificationHost');
const notifyGuest =require('../schemas/notificationGuest');
 
router.post('/', function(req, res){
  console.log("test main page");
  return res.json({state : 0, msg : "test okay!"});
});

//메인화면에서 notification schema 읽어오기 
router.post('/guest/getNotification',function(req, res,next){ 
      //인자로 guestId 만을 가져옴 
      notifyGuest.find({writer : req.body.userName}, function(err, notifyList){
          if(err){
              console.log(err);
              return res.json(err);
          }else{
              return res.json(notifyList);
          }
      })
});

router.post('/host/getNotification',function(req, res,next){ 
    //인자로 hostId 만을 가져옴 
    notifyHost.find({writer : req.body.userName}, function(err, notifyList){
        if(err){
            console.log(err);
            return res.json(err);
        }else{
            return res.json(notifyList);
        }
    })
}); 


   
module.exports = router;