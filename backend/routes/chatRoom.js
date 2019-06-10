var express = require('express');
var router = express.Router();
const chatRoomModel = require('../schemas/createChatRoom');

router.post('/createChatRoom', function(req, res, next){
    let newChatRoom = new chatRoomModel();
    newChatRoom.chatRoomId = req.body.chatRoomId;
    newChatRoom.hostUserName = req.body.hostUserName;
    newChatRoom.guestUserName = req.body.guestUserName;
    newChatRoom.save(function(err){
        if(err){
            return res.json({state : -1, msg : err});
        }else{
            return res.json({state : 0, msg : "create new chatRoom is success"});
        }
    })
})


router.get('/host/:hostId',function(req, res,next){ 
    //인자로 hostId 만을 가져옴 
    chatRoomModel.find({hostUserName : req.params.hostId}, function(err, getInfo){
        if(err){
            console.log(err);
            return res.json({state : -1, msg : err});
        }else{
            return res.json(getInfo);
        }
    })
}); 
                
router.get('/guest/:guestId',function(req, res,next){ 
    //인자로 hostId 만을 가져옴 
    chatRoomModel.find({guestUserName : req.params.guestId}, function(err, getInfo){
        if(err){
            console.log(err);
            return res.json({state : -1, msg : err});
        }else{
            return res.json(getInfo);
        }
    })
}); 
                


   
module.exports = router;