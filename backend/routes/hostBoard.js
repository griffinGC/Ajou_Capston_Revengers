var express = require('express');
var router = express.Router();

const hostModel = require('../schemas/createHost');
const guestModel = require('../schemas/createGuest');

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

//host boardId에 맞는 게시판 글 가져오기
router.get('/getBoard/:id',function(req, res,next){
    hostBoard.find({boardId : req.params.id},function(err,hostBoardContent){
        if(err) {
          return res.json(err);
        };
        //json형식으로 응답
        return res.json(hostBoardContent);
        })
  });     

//guest의 요구사항에 맞는 host board 게시판 글 가져오기
router.get('/filterBoard/:id',function(req, res,next){
    // id로 guest의 id를 받아옴 
    guestModel.findAbility(req.params.id, function(err, guestInfo){
        // console.log(guestInfo);
        let ability = guestInfo[0].ability;
        console.log(ability);
        hostBoard.find({}, function(err, board){
            if(err){
                return res.json({state : -1, msg : err});
            }
            var result = new Array();    
            for(let i = 0; i<board.length; i++){
                board[i].preferCount = 0;
                for(let j = 0 ; j < ability.length; j++){
                    for(let k = 0; k<board[i].preferAbility.length; k++){
                        if(ability[j] === board[i].preferAbility[k]){
                            ++board[i].preferCount;
                            console.log("보드의 카운트 값 : " + board[i].preferCount);
                        }
                    }
                }
                if(board[i].preferCount > 0){
                    result.push(board[i]);
                }    
            }
            for(let i = 0; i< result.length -1; i++){
                for(let j = 1; j<result.length; j++){
                    if(result[i].preferCount > result[j].preferCount){
                        let temp = result[i].preferCount;
                        result[i].preferCount = result[j].preferCount;
                        result[j].preferCount = temp;
                    }
                }
            }
            console.log(result);
            return res.json(result);
        })
    })
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
  
 //한번이라도 신고당한 host게시판 가져오기
router.get('/getBan', function(req, res, next){
    hostBoard.find({$where : "this.isReport.length > 0"}, function(err, getInfo){
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

//hostBoard 게시글 신고 
router.post('/isReportHost/ban', function(req, res, next){
    hostBoard.update({boardId : req.body.boardId}, {$addToSet : {isReport : req.body.userName}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "isReport HostBoard is success"});
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
        writeBoard.location = req.body.location;
        
        let preferAbility = req.body.preferAbility;
        let deleteA = preferAbility.replace("[","");
        let deleteB = deleteA.replace("]","");
        deleteB = deleteB.replace(/"/gi,'');
        console.log(deleteB);
        let abArr = deleteB.split(',');
        
        writeBoard.preferAbility = abArr;

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