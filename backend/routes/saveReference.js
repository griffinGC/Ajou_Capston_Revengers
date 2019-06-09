var express = require('express');
var router = express.Router();

const referenceModel = require('../schemas/reference');



//guest => host 후기 글 작성 
router.post('/createHostReference',function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "reference Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "reference Content is empty!"});
    }

    let writeReference = new referenceModel();

    writeReference.boardId = req.body.boardId;
    //작성되는곳 host profile
    writeReference.boardType = "host";
    //새로 작성될 title
    writeReference.title = req.body.title;
    writeReference.writer = req.body.writer;
    writeReference.writerImg = req.body.writerImg;
    //작성될 host profile
    writeReference.userName = req.body.userName;
    let day = new Date();
    let yy = day.getFullYear();
    let mm = day.getMonth()
    let dd = day.getDate();
    writeReference.writeDay = yy + '-' + mm + '-'+ dd;
    writeReference.content = req.body.content;
    writeReference.star = req.body.star;

    writeReference.save(function(err){
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

    let writeReference = new referenceModel();

    writeReference.boardId = req.body.boardId;
    //작성되는곳 host profile
    writeReference.boardType = "guest";
    //새로 작성될 title
    writeReference.title = req.body.title;
    writeReference.writer = req.body.writer;
    writeReference.writerImg = req.body.writerImg;
    //작성될 guest profile
    
    writeReference.userName = req.body.userName;


    let day = new Date();
    let yy = day.getFullYear();
    let mm = day.getMonth()
    let dd = day.getDate();
    writeReference.writeDay = yy + '-' + mm + '-'+ dd;
    writeReference.content = req.body.content;
    writeReference.star = req.body.star;

    writeReference.save(function(err){
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
