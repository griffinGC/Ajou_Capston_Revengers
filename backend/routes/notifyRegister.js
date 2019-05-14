var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');
const notifyHost =require('../schemas/notificationHost');
const notifyGuest =require('../schemas/notificationGuest');
 

router.post('/guest/registerNotification',function(req, res,next){ 
  console.log("test");
      
      if(req.body.state==1){//1: 매칭완료
          return res.json({state: 1, msg: 'Complete Matching!'})
      }    
      if(!req.body.state==-1){//-1: 매칭 실패
          return res.json({state: -1, msg: 'Fail to Matching!'})
      }
      if(!req.body.state==0){//0: 진행중
          return res.json({state: -1, msg: 'Ongoing!'})
      }
       console.log(req.body.userName);
        let applyUser = new apaplicant();
        applyUser.userName = req.body.userName;
        applyUser.boardID = req.body.boardID;
        
      applyUser.save({userName : req.body.userName, boardID : req.body.boardID},function (err) {
          if(err){
              return res.json({state : -1, msg : "error is occured"});
              
              // return;
          }
        res.json({ state: 0, msg: "The application was successful!" });
      });
});



   
module.exports = router;