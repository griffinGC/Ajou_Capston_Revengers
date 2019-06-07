var express = require('express');
var router = express.Router();

const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');




//회원정보 가져오기 테스트
router.get('/',function(req, res,next){
  console.log("userInfo Test");
  return res.json({state : 0, msg : "userInfo router test"});
  });     

      

//특정 guest정보 가져오기
router.get('/getInfo/guest/:id', function(req, res, next){
    guestModel.find({userName : req.params.id}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//모든 guest정보 가져오기
router.get('/getInfo/guest', function(req, res, next){
    guestModel.find({}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//신고당한 guest정보 가져오기
router.get('/getBan/guest', function(req, res, next){
    guestModel.find({$where : "this.isReport.length > 0"}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//guest 계정 금지시키기
router.get('/updateGuest/ban/:id', function(req, res, next){
    guestModel.update({userName : req.params.id}, {$set : {report : true}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update Guest ban is success"});
    });
})

//guest 계정 해제시키기
router.get('/updateGuest/able/:id', function(req, res, next){
    guestModel.update({userName : req.params.id}, {$set : {report : false}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update Guest able is success"});
    });
})






//특정 Host정보 가져오기
router.get('/getInfo/host/:id', function(req, res, next){
    hostModel.find({userName : req.params.id}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//모든 host정보 가져오기
router.get('/getInfo/host', function(req, res, next){
    hostModel.find({}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})

//신고당한 host정보 가져오기
router.get('/getBan/host', function(req, res, next){
    hostModel.find({$where : "this.isReport.length > 0"}, function(err, getInfo){
        if(err){
            return res.json(err);
        };
        return res.json(getInfo);
    });
})



//host 계정 금지시키기 
router.get('/updateHost/ban/:id', function(req, res, next){
    hostModel.update({userName : req.params.id}, {$set : {report : true}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update Host ban is success"});
    });
})
//host 계정 해제 시키기 
router.get('/updateHost/able/:id', function(req, res, next){
    hostModel.update({userName : req.params.id}, {$set : {report : false}}, function(err){
        if(err){
            return res.json(err);
        };
        return res.json({state : 0, msg : "update Host able is success"});
    });
})






   
module.exports = router;