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

//메인화면에서 notification schema 읽어오기  guest가 받은 
router.get('/guest/getNotification/:id',function(req, res,next){ 
      //인자로 guestId 만을 가져옴 
      notifyGuest.find({writer : req.params.id}, function(err, notifyList){
          if(err){
              console.log(err);
              return res.json(err);
          }else{
              return res.json(notifyList);
          }
      })
});


//메인화면에서 notification schema 읽어오기  host가 받은 
router.get('/host/getNotification/:id',function(req, res,next){ 
    //인자로 hostId 만을 가져옴 
    notifyHost.find({writer : req.params.id}, function(err, notifyList){
        if(err){
            console.log(err);
            return res.json(err);
        }else{
            return res.json(notifyList);
        }
    })
}); 


   
module.exports = router;