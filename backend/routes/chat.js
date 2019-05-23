var express = require('express');
var router = express.Router();
const chatModel = require('../schemas/createChat');


                
router.post('/', function(req, res, next){
    if(!req.body.userName){
        return res.json({state : -1, msg : "userName is empty"});
    };
    if(!req.body.boardId){
        return res.json({state : -1, msg : "boardId is empty"});
    };
    if(!req.body.chatId){
        return res.json({state : -1, msg : "chatId is empty"});
    };
    let newChat = new chatModel();
    newChat.chatId = req.body.chatId;
    newChat.userName = req.body.userName;
    newChat.boardId = req.body.boardId;

    newChat.save(function(err){
        if(err){
            console.log(err);
            return res.json({state : -1, msg : "error is occured!"});
        }else{
            return res.json({state : 0, msg : "newChat is created"});
        };
    })
  });  

   
module.exports = router;