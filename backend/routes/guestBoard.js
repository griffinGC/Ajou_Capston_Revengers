var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');

const multer = require('multer');

const guestBoard = require('../schemas/guestBoard');

//board 라우터 테스트
router.get('/',function(req, res,next){
  console.log("board Test");
  return res.json({state : 0, msg : "board router test"});
  });     

//guest게시판 글 가져오기
router.get('/getList',function(req, res,next){
    guestBoard.find({},function(err,guestBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
        return res.json(guestBoardContent);
        })
  });        

//guest게시판 작성자 정보 가져오기
router.get('/getMsg/:id', function(req, res, next){
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


var upload = multer({ storage : storage})

router.post('/', upload.single('img'), function(req, res, next){
    console.log(req.file);
    res.json({msg : 'uploaded', msg2 : req.file});
  });  


var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/guestBoard')
    },
    filename: function(req, file, cb){
        let checkFile = file.originalname;
        let newFile = "";
        console.log("jpeg 있는곳의 index : " + checkFile.indexOf(".jpeg"));
        console.log("jpg 있는곳의 index : " + checkFile.indexOf(".jpg"))
        if(checkFile.indexOf(".jpeg") != -1){
            newFile = checkFile.replace(".jpeg", "");
        }else if(checkFile.indexOf(".jpg") === -1){
            newFile = checkFile.replace(".jpg", "");
        }
        console.log("변경된 파일명 : " + checkFile);
        newFile = checkFile + Date.now()+".jpeg";
        cb(null, newFile);
    }
})


var upload = multer({storage : storage});

//guest게시판 글 작성 
router.post('/createBoard',upload.single('img'), function(req, res, next){
    //startDate를 required로 바꾸고 넣는거 생각 
    // let d = new Date();
    // let today = d.getDate() +""+ d.getHours(); 
    // let urlName = req.body.guestId + "" + today;
    // console.log("img 파일 이름 : " + urlName);
    console.log("파일의 원래 이름 : " + req.file.originalname);
    let checkFile = req.file.originalname;
    let newFile = "";    
    if(checkFile.indexOf(".jpeg") != -1){
        newFile = checkFile.replace(".jpeg", "");
    }else if(checkFile.indexOf(".jpg") === -1){
        newFile = checkFile.replace(".jpg", "");
    }
    console.log("변경된 파일명 : " + checkFile);
    newFile = checkFile + Date.now()+".jpeg";
    console.log("최종 파일명 : " + newFile);
    
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
        console.log(userInfo);
        writeBoard.startDate = req.body.startDate;
        writeBoard.endDate = req.body.endDate;
        // writeBoard.difficulty = req.body.difficulty;
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
        // console.log("이미지 파일 이름 2 : " + urlName);
        writeBoard.boardImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/guestBoard/"+newFile;
        // writeBoard.boardImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/guestBoard/"+urlName+".jpeg";
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



   
module.exports = router;