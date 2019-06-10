var express = require('express');
var router = express.Router();

const referenceModel = require('../schemas/reference');


//guest가 자기가 작성한 reference가져오기 
router.get('/getGuestWrited/:boardId',function(req, res,next){
  let type = "host"
  if(!req.params.id){
    return res.json({state : -1, msg : "board ID is empty"});
  }
    referenceModel.find({boardId : req.params.boardId, boardType : type},function(err,getInfo){
        if(err) {
          return res.json({state : -1 , msg : err});
        };
        if(getInfo){
            return res.json(getInfo)
        } 
      }); 
});


//host가 자기가 작성할 reference가져오기 
router.get('/getHostWrited/:boardId',function(req, res,next){
  let type = "guest"
  if(!req.params.id){
    return res.json({state : -1, msg : "board ID is empty"});
  }
    referenceModel.find({boardId : req.params.boardId, boardType : type},function(err,getInfo){
        if(err) {
          return res.json({state : -1 , msg : err});
        };
        if(getInfo){
            return res.json(getInfo)
        } 
      }); 
});



//guest => host 후기 글 작성 
router.post('/createHostReference',function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "reference Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "reference Content is empty!"});
    }
    // userName은 작성될 곳의 이름
    // writer는 작성하는 사람의 이름 
    let day = new Date();
    let yy = day.getFullYear();
    let mm = day.getMonth()
    let dd = day.getDate();
    let resultDay = yy  + '-' + mm+"-"+dd;
    let type = "host"
    referenceModel.update({userName : req.body.userName, boardType : type, boardId : req.body.boardId, writer : req.body.writer},
    {
     $set : {title : req.body.title, writerImg : req.body.writerImg, writeDay : resultDay, content : req.body.content, star: req.body.star} 
    }, function(err){
        if(err){
            console.log(err);
            return res.json({state : -1, msg : "write reference for host is failed"});
        }
        res.json({state : 0, msg : "write reference for host is success"});
    })
})

//host => guest 후기 글 작성 
router.post('/createGuestReference',function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "reference Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "reference Content is empty!"});
    }


    let day = new Date();
    let yy = day.getFullYear();
    let mm = day.getMonth()
    let dd = day.getDate();
    let resultDay = yy  + '-' + mm+"-"+dd;
    let type = "guest";
    referenceModel.update({userName : req.body.userName, boardType : type, boardId : req.body.boardId, writer : req.body.writer},
    {
     $set : {title : req.body.title, writerImg : req.body.writerImg, writeDay : resultDay, content : req.body.content, star: req.body.star} 
    }, function(err){
        if(err){
            console.log(err);
            return res.json({state : -1, msg : "write reference for host is failed"});
        }
        res.json({state : 0, msg : "write reference for host is success"});
    })
})

//host가 자기한테 작성된 reference가져오기 
router.get('/getHostReference/:id',function(req, res,next){
    console.log(req.params.id);
    if(!req.params.id){
      return res.json({state : -1, msg : "host ID is empty"});
    }
      referenceModel.find({userName : req.params.id, boardType : "host"},function(err,getInfo){
          if(err) {
            return res.json(err);
          };
          if(getInfo){
              return res.json(getInfo)
          } 
        }); 
});

//guest가 자기한테 작성된 reference가져오기 
router.get('/getGuestReference/:id',function(req, res,next){
    console.log(req.params.id);
    if(!req.params.id){
      return res.json({state : -1, msg : "guest ID is empty"});
    }
      referenceModel.find({userName : req.params.id, boardType : "guest"},function(err,getInfo){
          if(err) {
            return res.json(err);
          };
          if(getInfo){
              return res.json(getInfo)
          } 
        }); 
});

//guest가 자기가 작성할 reference가져오기 
router.get('/getGuestMyReference/:id',function(req, res,next){
    console.log(req.params.id);
    if(!req.params.id){
      return res.json({state : -1, msg : "guest ID is empty"});
    }
      referenceModel.find({writer : req.params.id, boardType : "host"},function(err,getInfo){
          if(err) {
            return res.json(err);
          };
          if(getInfo){
              return res.json(getInfo)
          } 
        }); 
});

//host가 자기가 작성할 reference가져오기 
router.get('/getHostMyReference/:id',function(req, res,next){
    console.log(req.params.id);
    if(!req.params.id){
      return res.json({state : -1, msg : "host ID is empty"});
    }
      referenceModel.find({writer : req.params.id, boardType : "guest"},function(err,getInfo){
          if(err) {
            return res.json(err);
          };
          if(getInfo){
              return res.json(getInfo)
          } 
        }); 
});

module.exports = router;
