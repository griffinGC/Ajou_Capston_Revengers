var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

router.get('/',function(req, res, error){
    console.log(req.headers);
    res.send({state:0});
})
 

router.post('/',function(req, res, error){
    // if(error){
    //     return res.json({state : -1, msg : "error"});
    // }
    if(!req.body.id){
        return res.json({state: -1, msg : "username is empty"});
    }
    if(!req.body.pwd){
        return res.json({state: -1, msg : "password is empty"});
    }
    console.log("id랑 패스워드, 유형선택 확인완료");
    console.log(req.body.radio);
    if(!req.body.radio){
        guestModel.find({userName : req.body.id, password : req.body.pwd}, function(err,guestModel){
            console.log("guest확인");
            if(err) {
              return res.json(err);
            };
            if(guestModel[0] == null){
                return res.json({state : -1, msg : "guest is not exist"});
            }else {
                return res.json({state : 0, msg : "guest login success!!!"});
            }   
        });
    }
    console.log("host test");
    if(req.body.radio){
        hostModel.find({userName : req.body.id, password : req.body.pwd}, function(err, hostModel){
            console.log("host확인");
            if(err){
                return res.json(err);
            };
            // return res.json(hostModel);
            if(hostModel[0] == null){
                return res.json({state : -1, msg : "host is not exist"});
            }else{
                return res.json({state: 0, msg:" host login success!!"});
            }
        });
    }

})

module.exports = router;