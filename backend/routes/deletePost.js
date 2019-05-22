var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

const guestBoard = require('../schemas/guestBoard');
const hostBoard = require('../schemas/hostBoard');


  

//guest게시판 글 삭제하기
//guestBoardId => boardId
router.get('/deleteGuestList/:id/:guestBoardId',function(req, res,next){
    guestBoard.remove({$and:[{guestInfo:{$elemMatch:{userName: req.params.id}},boardId : req.params.guestBoardId}]},function(err,guestBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
       
        return res.json({state : 0, msg : "delete guest post success"});
        })
  });        

//host 게시판 글 삭제하기
//guestBoardId => boardId
router.get('/deleteHostList/:id/:hostBoardId',function(req, res,next){
    hostBoard.remove({$and:[{hostInfo:{$elemMatch:{userName: req.params.id}},boardId : req.params.hostBoardId}]},function(err,guestBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
       
        return res.json({state : 0, msg : "delete host post success"});
        })
  });        
   
module.exports = router;