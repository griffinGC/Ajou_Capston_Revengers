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
  
 //금지된 host정보 가져오기
router.get('/getBan', function(req, res, next){
    hostBoard.find({report : true}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
}) 

//host게시판 작성자 정보 가져오기
router.get('/getMsg/:id', function(req, res, next){
    hostModel.find({userName : req.params.id}, function(err, hostIdInfo){
        if(err){
            return res.json(err);
        };
        return res.json(hostIdInfo);
    });
})

//hostBoard 게시글 금지시키기 
router.get('/updateHost/ban/:id', function(req, res, next){
    hostBoard.update({boardId : req.params.id}, {$set : {report : true}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update HostBoard ban is success"});
    });
})
//hostBoard 게시글 금지 해제 시키기 
router.get('/updateHost/able/:id', function(req, res, next){
    hostBoard.update({boardId : req.params.id}, {$set : {report : false}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update HostBoard able is success"});
    });
})

var newFile = "";

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/hostBoard')
    },
    filename: function(req, file, cb){
        let checkFile = file.originalname;
        // var newFile = "";
        console.log("jpeg 있는곳의 index : " + checkFile.indexOf(".jpeg"));
        console.log("jpg 있는곳의 index : " + checkFile.indexOf(".jpg"))
        newFile = Date.now() + "" + checkFile;
        console.log("저장하는곳에서 변경된 파일명 : " + newFile);
        cb(null, newFile);
    }
})

var upload = multer({storage : storage});

//host게시판 글 작성 
router.post('/createBoard', upload.single('img'),function(req, res, next){
    console.log("파일의 원래 이름 : " + req.file.originalname);
    console.log("변경된 파일명 : " + newFile);
    console.log("최종 파일명 : " + newFile);
    
    if(!req.body.title){
        return res.json({state : -1, msg : "Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "Content is empty!"});
    }
    if(!req.body.hostId){
        return res.json({state : -1, msg : "hostID is empty!"});
    }
    let writeBoard = new hostBoard();
    hostBoard.findByUserName(req.body.hostId, function(err, userInfo){
        // console.log(userInfo);
        writeBoard.title = req.body.title;
        writeBoard.content = req.body.content;
        writeBoard.Info = userInfo[0];
        writeBoard.startDate = req.body.startDate;
        writeBoard.endDate = req.body.endDate;
        writeBoard.difficulty = req.body.difficulty;
        writeBoard.workDay = req.body.workDay;
        writeBoard.category = req.body.category;
        writeBoard.latitude = req.body.latitude;
        writeBoard.longtitude = req.body.longtitude;
        // writeBoard.preferLocation = req.body.preferLocation;
        writeBoard.candidate = req.body.candidate;
        writeBoard.report = false;

        let canNumber = "";
        if(req.body.candidate){
            canNumber = writeBoard.candidate.length;
            console.log(canNumber);
            writeBoard.candidateNumber = canNumber;
        }

        writeBoard.boardImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/hostBoard/"+newFile;
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