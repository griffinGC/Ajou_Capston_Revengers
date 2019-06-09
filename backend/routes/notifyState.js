var express = require('express');
var router = express.Router();

const notifyGuest =require('../schemas/notificationGuest');
const notifyHost =require('../schemas/notificationHost');
const referenceShema =require('../schemas/reference');

//guest가 승인 여기서 
// userName은 신청한 사람 => 즉 host
// boardId, userName, writer
// userName은 신청한 사람, writer은 글을 기존에 작성했던 사람
// boardId는 writer가 썼던 글의 번호 
// guest가 approve 하면 host가 글을 쓸 수 있음 즉, 원래 글은 guest가 쓴 글 
router.post('/guestApprove',function(req, res,next){
  let type = "guest";
  referenceShema.saveWithNotification(req.body.writerName, req.body.boardId, req.body.userName, type,function(err){
    if(err){
      console.log(err);
      return res.json({state : -1, msg : err});
    }
    notifyGuest.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "approve"}},function(err){
      if(err) {
        return res.json(err);
      };
      console.log("approve 완료")
      //json형식으로 응답
      return res.json({state : 0, msg : "Registeration approve"});
      })
  })

});  


//host가 승인      
router.post('/hostApprove',function(req, res,next){
  let type = "host";
  referenceShema.saveWithNotification(req.body.writerName, req.body.boardId, req.body.userName, type, function(err){
    if(err){
      console.log(err);
      return res.json({state : -1, msg : err});
    }
    notifyHost.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "approve"}},function(err){
      if(err) {
        return res.json(err);
      };
      //json형식으로 응답
      console.log("approve 완료")
      return res.json({state : 0, msg : "Registeration approve"});
    })
  })
});  

//guest가 거절 
router.post('/guestRefuse',function(req, res,next){
  let type = "guest";
  referenceShema.deleteWithNotification(req.body.writerName, req.body.boardId, req.body.userName, type,function(err){
    if(err){
      console.log(err);
      return res.json({state : -1, msg : err});
    }
    notifyGuest.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "refuse"}},function(err){
      if(err) {
        return res.json(err);
      };
      //json형식으로 응답
     console.log("refuse 완료");
      return res.json({state : 0, msg : "Registeration refuse"});
       
        })
  
  })
});


//host가 거절      
router.post('/hostRefuse',function(req, res,next){
  let type = "host";
  referenceShema.deleteWithNotification(req.body.writerName, req.body.boardId, req.body.userName, type,function(err){
    if(err){
      console.log(err);
      return res.json({state : -1, msg : err});
    }
    notifyHost.update({userName : req.body.userName, notificationId : req.body.notificationId},{$set : {state : "refuse"}},function(err){
    if(err) {
      return res.json(err);
    };
    //json형식으로 응답
    console.log("refuse 완료");
    return res.json({state : 0, msg : "Registeration refuse"});
         
     
      })
    })
});  

//guest가 approve한 host정보 보여줌 => 삭제 예정
router.get('/getGuestApprove/:id', function(req, res, next){
  notifyGuest.find({userName : req.params.id, state : "approve"}, function(err, getInfo){
    if(err){
      return res.json(err);
    }
    console.log(req.params.id);
    console.log(getInfo);
    return res.json(getInfo);
  })
})

//host가 appve한 guest정보를 보여줌 => 삭제 예정
router.get('/getHostApprove/:id', function(req, res, next){
  notifyHost.find({userName : req.params.id, state : "approve"}, function(err, getInfo){
    if(err){
      return res.json(err);
    }
    console.log(req.params.id);
    console.log(getInfo);
    return res.json(getInfo);
  })
})

   
module.exports = router;