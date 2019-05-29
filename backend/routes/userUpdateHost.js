var express = require('express');
var router = express.Router();

const multer = require('multer');

const hostModel = require('../schemas/createHost');

var newFile = "";

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/hostProfile')
    },
    filename: function(req, file, cb){
      let checkFile = file.originalname;
      // var newFile = "";
      // console.log("jpeg 있는곳의 index : " + checkFile.indexOf(".jpeg"));
      // console.log("jpg 있는곳의 index : " + checkFile.indexOf(".jpg"))
      newFile = Date.now() + "" + checkFile;
      console.log("저장하는곳에서 변경된 파일명 : " + newFile);
      cb(null, newFile);
    }
})

var upload = multer({ storage : storage})


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