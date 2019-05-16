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

//guest게시판 글 가져오기
router.get('/getGuestList',function(req, res,next){
    guestBoard.find({},function(err,guestBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
        return res.json(guestBoardContent);
        })
  });        

//guest게시판 작성자 정보 가져오기
router.get('/getGuestMsg/:id', function(req, res, next){
    guestModel.find({userName : req.params.id}, function(err, guestIdInfo){
        if(err){
            return res.json(err);
        };
        return res.json(guestIdInfo);
    });
})

//board post test
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
});  

//guest게시판 글 작성 
router.post('/guestCreateBoard', function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "Content is empty!"});
    }
    if(!req.body.guestId){
        return res.json({state : -1, msg : "guestID is empty!"});
    }
    let writeBoard = new guestBoard();
    guestBoard.findByUserName(req.body.guestId, function(err, userInfo){
        writeBoard.title = req.body.title;
        writeBoard.content = req.body.content;
        writeBoard.guestInfo = userInfo;
        writeBoard.startDate = req.body.startDate;
        writeBoard.endDate = req.body.endDate;
        writeBoard.difficulty = req.body.difficulty;
        writeBoard.workDay = req.body.workDay;
        writeBoard.category = req.body.category;
        writeBoard.preferLocation = req.body.preferLocation;
        writeBoard.candidate = req.body.candidate;
        let canNumber = "";
        if(req.body.candidate){
            canNumber = writeBoard.candidate.length;
            console.log(canNumber);
            writeBoard.candidateNumber = canNumber;
        }
        //startDate를 required로 바꾸고 넣는거 생각 
        let d = new Date();
        let today = d.getDate() +""+ d.getHours(); 
        let urlName = req.body.guestId + "" + today;
        console.log(urlName);
        writeBoard.boardImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/guestBoard/"+urlName+".jpeg";
        // writeBoard.boardImg = "http://localhost:3000/images/guestBoard/"+req.body.guestId+today+".jpeg";
        writeBoard.save(function(err){
            if(err){
                console.log(err);
                return res.json({state : -1, msg : "guestBoard save is failed"});
            }
            res.json({state : 0, msg : "guestBoard save is success"});
        })
    });

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//host게시판 글 가져오기
router.get('/getHostList',function(req, res,next){
    hostBoard.find({},function(err,hostBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
        return res.json(hostBoardContent);
        })
  });        

//host게시판 작성자 정보 가져오기
router.get('/getHostMsg/:id', function(req, res, next){
    hostModel.find({userName : req.params.id}, function(err, hostIdInfo){
        if(err){
            return res.json(err);
        };
        return res.json(hostIdInfo);
    });
})


//host게시판 글 작성 
router.post('/hostCreateBoard', function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "Content is empty!"});
    }
    if(!req.body.hostId){
        return res.json({state : -1, msg : "guestID is empty!"});
    }
    let writeBoard = new hostBoard();
    hostBoard.findByUserName(req.body.hostId, function(err, userInfo){
        writeBoard.title = req.body.title;
        writeBoard.content = req.body.content;
        writeBoard.hostInfo = userInfo;
        writeBoard.startDate = req.body.startDate;
        writeBoard.endDate = req.body.endDate;
        writeBoard.difficulty = req.body.difficulty;
        writeBoard.workDay = req.body.workDay;
        writeBoard.category = req.body.category;
        writeBoard.preferLocation = req.body.preferLocation;
        writeBoard.candidate = req.body.candidate;
        let canNumber = "";
        if(req.body.candidate){
            canNumber = writeBoard.candidate.length;
            console.log(canNumber);
            writeBoard.candidateNumber = canNumber;
        }

        //startDate를 required로 바꾸고 넣는거 생각 
        let d = new Date();
        let today = d.getDate() +""+ d.getHours(); 
        let urlName = req.body.hostId + "" + today;
        console.log(urlName);
        writeBoard.boardImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/hostBoard/"+urlName+".jpeg";
        // writeBoard.boardImg = "http://localhost:3000/images/hostBoard/"+req.body.hostId+today+".jpeg";
        writeBoard.save(function(err){
            if(err){
                console.log(err);
                return res.json({state : -1, msg : "hostBoard save is failed"});
            }
            res.json({state : 0, msg : "hostBoard save is success"});
        })
    });
})



   
module.exports = router;