var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
// const hostModel = require('../schemas/createHost');

router.get('/',function(req, res, error){
    console.log(req.headers);
    res.send({state:0});
})

router.post('/',function(req, res, error){
    if(!req.body.id){
        res.json({state: -1, msg : "username is empty"});
    }
    if(!req.body.pwd){
        res.json({state: -1, msg : "password is empty"})
    }
    console.log("id랑 패스워드 확인완료");
    // guestModel.find({}, function(err,guestModel){
    guestModel.find({userName : req.body.id, password : req.body.pwd}, function(err,guestModel){
        if(err) {
          return res.json(err);
        };
        if(guestModel[0] == null){
            res.json({state : -1, msg : "login fail!!"});
        }else{
            res.json(guestModel);
        }
       
    });
})

module.exports = router;