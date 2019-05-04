var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

const guestBoard = require('../schemas/guestBoard');
const hostBoard = require('../schemas/hostBoard');


//board 라우터 테스트
router.get('/',function(req, res,next){
  console.log("board Test");
  return res.json({state : 0, msg : "board router test"});
  });     

router.get('/getGuestList',function(req, res,next){
    guestBoard.find({},function(err,guestBoardContent){
        if(err) {
          return res.json(err);
        };
        return res.json({state : 0, guestBoard : `${guestBoardContent}`});
        })
  });        

router.get('/getGuestMsg/:id', function(req, res, next){
    // guestModel.
})
  
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
  });  


   
module.exports = router;