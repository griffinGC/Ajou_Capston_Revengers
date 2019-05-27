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

//금지된 guest정보 가져오기
router.get('/getBan/guest', function(req, res, next){
    guestModel.find({report : true}, function(err, getInfo){
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

//guest회원정보 수정 
router.post('/updateInfo/guest', function(req, res, next){
    //굳이 만들필요 없을듯 ? test 해볼 것 
    let editInfo = new guestModel();
    editInfo.userName = req.body.userName;
    editInfo.password = req.body.password;
    editInfo.name = req.body.name;
    editInfo.ability = req.body.ability;
    editInfo.phone = req.body.phone;
    editInfo.email = req.body.email;    
    
    console.log("userInfo Test");
    guestModel.update({userName : req.body.userName},{$set : {password : req.body.password, userName:req.body.userName, name : req.body.name
        ,ability : req.body.ability, phone : req.body.phone,email : req.body.email }},function(err){
        if(err){
            return res.json({state : -1, msg : "guest Information is failed to modify "});
        }
        console.log(editInfo);
        res.json({state : 0, msg : "guest Information successfully modified"});
    })
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

//모든 host정보 가져오기
router.get('/getBan/host', function(req, res, next){
    hostModel.find({report : true}, function(err, getInfo){
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


//host회원정보 수정 
router.post('/updateInfo/host', function(req, res, next){   
    let editInfo = new hostModel();
    editInfo.userName = req.body.userName;
    editInfo.password = req.body.password;
    editInfo.name = req.body.name;
    editInfo.work = req.body.work;
    editInfo.address = req.body.address;
    editInfo.location = req.body.location;
    editInfo.phone = req.body.phone;
    editInfo.email = req.body.email;    
    
    console.log("userInfo Test");
    hostModel.update({userName : req.body.userName},{$set : {password : req.body.password, userName:req.body.userName, name : req.body.name
        ,work : req.body.work, phone : req.body.phone,email : req.body.email,
        address : req.body.address,location : req.body.location  }},function(err){
        if(err){
            return res.json({state : -1, msg : "host Information is failed to modify "});
        }
        console.log(editInfo);
        
        res.json({state : 0, msg : "host Information successfully modified"});
    })
})




   
module.exports = router;