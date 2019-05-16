var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');
const notifyHost =require('../schemas/notificationHost');
const notifyGuest =require('../schemas/notificationGuest');
 

router.post('/guest/registerNotification',function(req, res,next){ 
  console.log("test");

       console.log(req.body.userName);
        let applyUser = new notifyGuest();
        applyUser.userName = req.body.userName;
        applyUser.boardID = req.body.boardID;
        applyUser.state = "ongoing"
        
      applyUser.save({userName : req.body.userName, boardID : req.body.boardID},function (err) {
          if(err){
              return res.json({state : -1, msg : "error is occured"});
              
              // return;
          }
        res.json({ state: 0, msg: "The application was successful!" });
      });
});

//main화면에서 나에게 온 알림 요청하는 api 작성 필요 


   
module.exports = router;