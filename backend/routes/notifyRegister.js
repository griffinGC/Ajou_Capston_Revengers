var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');
const notifyHost =require('../schemas/notificationHost');
const notifyGuest =require('../schemas/notificationGuest');
 

router.post('/guest/registerNotification',function(req, res,next){ 
  console.log("test");
      
      
       console.log(req.body.userName);
        let applyUser = new notifyHost();
        applyUser.userName = req.body.userName;
        applyUser.boardID = req.body.boardID;
        
      applyUser.save({userName : req.body.userName, boardID : req.body.boardID},function (err) {
          if(err){
              return res.json({state : -1, msg : "Sending notification to host is failed"});
              
              // return;
          }
        res.json({ state: 0, msg: "Sending notification to host was successful!" });
      });
});

router.post('/host/registerNotification',function(req, res,next){ 
    console.log("test");
        
        
         console.log(req.body.userName);
          let applyUser = new notifyGuest();
          applyUser.userName = req.body.userName;
          applyUser.boardID = req.body.boardID;
          
        applyUser.save({userName : req.body.userName, boardID : req.body.boardID},function (err) {
            if(err){
                return res.json({state : -1, msg : "Sending notification to guest is failed"});
                
                // return;
            }
          res.json({ state: 0, msg: "Sending notification to guest was successful!" });
        });
  });
  


   
module.exports = router;