var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');
const notifyHost =require('../schemas/notificationHost');
const notifyGuest =require('../schemas/notificationGuest');
 
router.post('/', function(req, res){
  console.log("test deleteCandidate");
    return res.json({state : 0, msg : "test delete router"});
});

//guestboard candidate삭제 및 업데이트 
router.get('/guest/deleteNotification/:id',function(req, res,next){ 
      //frontend에서 보낼때는 notificationId를 보낼 예정
      // console.log("notifidationId 정보 : " + boardInfo);
      notifyGuest.find({notificationGuestId : req.params.id}, function(err, info){
        if(err){
          return res.json(err);
        }
        console.log(info);
        if(!info[0])
        {
          return res.json({state : -1, msg : "삭제할 글을 찾을 수 없습니다."})
        }
        let deleteBoardId = info[0].boardInfo.guestBoardId;
        let userName = info[0].userName;
        console.log("삭제할 boardId : " + deleteBoardId);
        console.log("삭제할 userName : " + userName);
        notifyGuest.deleteCandidate(userName, deleteBoardId, function(err){
          console.log("get in here");
          if(err){
            console.log(err);
            return res.json(err);
          }
          notifyGuest.deleteOne({notificationGuestId : req.params.id}, function(err){
            if(err){
              console.log(err);
              return res.json(err);
            }else{
              return res.json({ state: 0, msg: "Delete notification in guest was successful!" });
            }
          })  
        });
    });
});

// host board candidate 삭제 및 notification 삭제 
router.get('/host/deleteNotification/:id',function(req, res,next){ 
  //frontend에서 보낼때는 notificationId를 보낼 예정
  // console.log("notifidationId 정보 : " + boardInfo);
  notifyHost.find({notificationHostId : req.params.id}, function(err, info){
    console.log(info);
    let deleteBoardId = info[0].boardInfo.hostBoardId;
    let userName = info[0].userName;
    console.log("삭제할 boardId : " + deleteBoardId);
    console.log("삭제할 userName : " + userName);
    notifyHost.deleteCandidate(userName, deleteBoardId, function(err){
      console.log("get in here");
      if(err){
        console.log(err);
        return res.json(err);
      }
      notifyHost.deleteOne({notificationHostId : req.params.id}, function(err){
        if(err){
          console.log(err);
          return res.json(err);
        }else{
          return res.json({ state: 0, msg: "Delete notification in host was successful!" });
        }
      })  
    });
  });
});


 


   
module.exports = router;