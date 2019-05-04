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
    guestModel.find({userName : req.params.id}, function(err, guestIdInfo){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, guestInfo : `${guestIdInfo}`});
    });
})

router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
});  

router.post('/guestCreateBoard', function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "Content is empty!"});
    }
    if(!req.body.guestInfo){
        return res.json({state : -1, msg : "guestID is empty!"});
    }
    let writeBoard = new guestBoard();
    writeBoard.title = req.body.title;
    writeBoard.content = req.body.content;
    writeBoard.guestInfo = req.body.guestInfo;
    writeBoard.startDate = req.body.startDate;
    writeBoard.endDate = req.body.endDate;
    writeBoard.difficulty = req.body.difficulty;
    writeBoard.workDay = req.body.workDay;
    writeBoard.category = req.body.category;
    writeBoard.preferLocation = req.body.preferLocation;
    writeBoard.candidate = req.body.candidate;
    let canNumber = writeBoard.candidate.length;
    console.log(canNumber);
    writeBoard.candidateNumber = canNumber;
    writeBoard.save(function(err){
        if(err){
            return res.json({state : -1, msg : "guestBoard save is failed"});
        }
        res.json({state : 0, msg : "guestBoard save is success"});
    })
})




   
module.exports = router;