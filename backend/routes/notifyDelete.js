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

//candidate삭제 및 업데이트 
router.post('/guest/deleteNotification',function(req, res,next){ 
      //frontend에서 보낼때는 guest boardId (boardId), userName, 작성자 정보 이렇게 3개를 보낼예정
      notifyGuest.updateCandidate(req.body.userName, req.body.boardId, function(err){
        console.log(req.body.userName);
        notifyGuest.findBoard(req.body.boardId, function(err, boardInfo){
          let applyUser = new notifyGuest();
          // console.log("board정보 : " + boardInfo);
          applyUser.userName = req.body.userName;
          applyUser.boardInfo = boardInfo;
          applyUser.writer = req.body.writer;
          applyUser.state = "ongoing"
          console.log("get into guest notification save sentence");
          applyUser.save(function (err) {
            if(err){
              console.log(err);
                return res.json({state : -1, msg : "Sending notification to guest is failed"});
                // return;
            }
          res.json({ state: 0, msg: "Sending notification to guest was successful!" });
            });
          })
        })
});

//guest => host
router.post('/host/registerNotification',function(req, res,next){ 
      //frontend에서 보낼때는 guest boardId (boardId), userName, 작성자 정보 이렇게 3개를 보낼예정
      notifyHost.updateCandidate(req.body.userName, req.body.boardId, function(err){
        console.log(req.body.userName);
        notifyHost.findBoard(req.body.boardId, function(err, boardInfo){
          let applyUser = new notifyHost();
          // console.log("board정보 : " + boardInfo);
          applyUser.userName = req.body.userName;
          applyUser.boardInfo = boardInfo;
          applyUser.writer = req.body.writer;
          applyUser.state = "ongoing"
          console.log("get into host notification save sentence");
          applyUser.save(function (err) {
            if(err){
              console.log(err);
                return res.json({state : -1, msg : "Sending notification to host is failed"});
                // return;
            }
          res.json({ state: 0, msg: "Sending notification to host was successful!" });
            });
          })
        })
});
 


   
module.exports = router;