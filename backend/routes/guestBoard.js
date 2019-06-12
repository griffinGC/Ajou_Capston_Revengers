var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

const multer = require('multer');

const guestBoard = require('../schemas/guestBoard');

//board 라우터 테스트
router.get('/',function(req, res,next){
  console.log("board Test");
  return res.json({state : 0, msg : "board router test"});
  });     

//guest의 요구사항에 맞는 host board 게시판 글 가져오기
router.get('/filterBoard/:id',function(req, res,next){
    // id로 guest의 id를 받아옴 
    hostModel.findAbility(req.params.id, function(err, guestInfo){
        // console.log(guestInfo);
        let ability = guestInfo[0].ability;
        console.log(ability);
        guestBoard.find({}, function(err, board){
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
            console.log("중간값 : " + result[0].preferCount);
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

//guest boardId에 맞는 게시판 글 가져오기
router.get('/getBoard/:id',function(req, res,next){
guestBoard.find({boardId : req.params.id},function(err,guestBoardContent){
    if(err) {
        return res.json(err);
    };
    //json형식으로 응답
    return res.json(guestBoardContent);
    })
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

  //한번이라도 신고당한 guest게시판 정보 가져오기
 router.get('/getBan', function(req, res, next){
    guestBoard.find({$where : "this.isReport.length > 0"}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
}) 


//guest게시판 작성자 정보 가져오기
router.get('/getMsg/:id', function(req, res, next){
    guestModel.find({userName : req.params.id}, function(err, guestIdInfo){
        if(err){
            return res.json(err);
        };
        return res.json(guestIdInfo);
    });
})


//hostBoard 게시글 금지시키기 
router.get('/updateGuest/ban/:id', function(req, res, next){
    guestBoard.update({boardId : req.params.id}, {$set : {report : true}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update guestBoard ban is success"});
    });
})
//hostBoard 게시글 금지 해제 시키기 
router.get('/updateGuest/able/:id', function(req, res, next){
    guestBoard.update({boardId : req.params.id}, {$set : {report : false}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update guestBoard able is success"});
    });
})
//guestBoard 게시글 신고 
router.post('/isReportGuest/ban', function(req, res, next){
    guestBoard.update({boardId : req.body.boardId}, {$addToSet : {isReport : req.body.userName}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "isReport GuestBoard is success"});
    });
})

var newFile = "";

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/guestBoard')
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

//guest게시판 글 작성 
router.post('/createBoard',upload.single('img'), function(req, res, next){
    console.log("파일의 원래 이름 : " + req.file.originalname);
    console.log("변경된 파일명 : " + newFile);
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
        writeBoard.Info = userInfo[0];
        console.log(userInfo);
        writeBoard.startDate = req.body.startDate;
        writeBoard.endDate = req.body.endDate;
        // writeBoard.difficulty = req.body.difficulty;
        writeBoard.workDay = req.body.workDay;
        writeBoard.category = req.body.category;

        let preferLocation = req.body.preferLocation;
        let deleteA = preferLocation.replace("[","");
        let deleteB = deleteA.replace("]","");
        deleteB = deleteB.replace(/"/gi,'');
        console.log(deleteB);
        let abArr = deleteB.split(',');

        writeBoard.preferLocation = abArr;
        
        writeBoard.candidate = req.body.candidate;
        writeBoard.report = false;

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