var express = require('express');
var router = express.Router();

const hostModel = require('../schemas/createHost');

const multer = require('multer');

const hostBoard = require('../schemas/hostBoard');



//board 라우터 테스트
router.get('/',function(req, res,next){
  console.log("board Test");
  return res.json({state : 0, msg : "board router test"});
  });     

//board post test
router.post('/', function(req, res, next){
    res.json({state : "testNormal"});
});  

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/hostBoard')
    },
    filename: function(req, file, cb){
        cb(null, urlName);
    }
})
var upload = multer({ storage : storage})

// router.post('/', upload.single('img'), function(req, res, next){
//     console.log(req.file);
//     res.json({msg : 'uploaded', msg2 : req.file});
//   });  



//host게시판 글 가져오기
router.get('/getList',function(req, res,next){
    hostBoard.find({},function(err,hostBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
        return res.json(hostBoardContent);
        })
  });        

//host게시판 작성자 정보 가져오기
router.get('/getMsg/:id', function(req, res, next){
    hostModel.find({userName : req.params.id}, function(err, hostIdInfo){
        if(err){
            return res.json(err);
        };
        return res.json(hostIdInfo);
    });
})


//host게시판 글 작성 
router.post('/createBoard', function(req, res, next){
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