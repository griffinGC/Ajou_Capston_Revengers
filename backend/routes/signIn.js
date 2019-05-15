var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

router.get('/',function(req, res, error){
    // console.log(req.headers);
    if(req.session.userId){
        res.send({state : 0, msg : "already login!"});
    }else{
        res.send({state : -1, msg : "required login"});
    }
})
 

router.post('/',function(req, res, error){
    //세션을 저장 
    var sess = req.session;
    var userId = req.body.userName;
    var userPwd = req.body.password;

    if(!userId){
        return res.json({state: -1, msg : "username is empty"});
    }
    if(!userPwd){
        return res.json({state: -1, msg : "password is empty"});
    }
    console.log("id랑 패스워드, 유형선택 확인완료");

    console.log(req.body.radio);
    //0이면 guest
    if(!req.body.radio){
        guestModel.find({userName : req.body.userName, password : req.body.password}, function(err,guestModel){
            console.log("guest확인");
            if(err) {
              return res.json(err);
            };
            if(guestModel[0] == null){
                return res.json({state : -1, msg : "guest is not exist"});
            }else {
                    sess.userId = guestModel[0].userName;
                    sess.userPwd = guestModel[0].password;
                    req.session.save(function(){
                        res.json({state : 0, msg : "session is saved! && guest login is success"});
                    });
                    //비동기이기때문에 저장하는데 시간이 걸려서 json이 두번 전송되기 때문에 오류발생
                    //  res.json({state : 0, msg : "guest login success!!!"});
            }   
        });
    }
    
    //0이면 host
    if(req.body.radio){
        console.log("host test");
        hostModel.find({userName : req.body.userName, password : req.body.password}, function(err, hostModel){
            console.log("host확인");
            if(err){
                return res.json(err);
            };
            // return res.json(hostModel);
            if(hostModel[0] == null){
                return res.json({state : -1, msg : "host is not exist"});
            }else{
                    sess.userId = hostModel[0].userName;
                    sess.userPwd = hostModel[0].password;
                    req.session.save(function(){
                        res.json({state : 0, msg : "session is saved & host login is success"})
                    });
                    //비동기이기때문에 저장하는데 시간이 걸려서 json이 두번 전송되기 때문에 오류발생
                //  res.json({state: 0, msg:" host login success!!"});
            }
        });
    }
})


module.exports = router;