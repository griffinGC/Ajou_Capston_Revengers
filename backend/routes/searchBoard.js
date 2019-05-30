var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

const guestBoard = require('../schemas/guestBoard');
const hostBoard = require('../schemas/hostBoard');


//board 라우터 테스트
router.get('/',function(req, res,next){
  console.log("board Test");
  return res.json({state : 0, msg : "Show all writed post by specific user router test"});
  });     

//사용자 게스트  글 가져오기
router.get('/getUguestBoard/:id',function(req, res,next){
    guestBoard.find({Info:{$elemMatch:{userName: req.params.id}}},function(err,guestBoard){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
        
        return res.json(guestBoard);
        
        })
  });        

//사용자 호스트  글 가져오기
router.get('/getUhostBoard/:id',function(req, res,next){
  hostBoard.find({Info:{$elemMatch:{userName: req.params.id}}},function(err,hostBoard){
      if(err) {
        return res.json(err);
      };
      //json형식으로 응답
      
      return res.json(hostBoard);
      
      })
});        





   
module.exports = router;