var express = require('express');
var router = express.Router();
const hostModel = require('../schemas/createHost');
const approveModel = require('../schemas/approve');

const multer = require('multer');

const axios = require('axios');


// hostid 확인, hostid 가입 => 총 2개의 router 지정해야함 
router.get('/hostConfirm/:id',function(req, res,next){
  console.log(req.params.id);
  if(!req.params.id){
    return res.json({state : -1, msg : "host ID is empty"});
  }
    hostModel.find({userName : req.params.id},function(err,hostModel){
      // console.log(req.params.id);

        if(err) {
          return res.json(err);
        };
        if(hostModel[0]){
            return res.json({state : -1, msg : "host ID alreay exists!"});
        } 
        else {
            return res.json({state : 0, msg : "host ID can use"});           
          }
        })
  });        
     
  router.post('/sendPhoneNumber',function(req, res,next){
      var confirmNumber = Math.floor(Math.random()*(10000 -1000))+1000;
      axios.post("https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:256041881792:capstone_test/messages",
      {
        type:"SMS",
        contentType:"COMM",
        countryCode:"82",
        from:"01079239095",
        to: [
          `${req.body.phoneNumber}`
        ],
        content: `인증번호는 ${confirmNumber} 입니다.`
      },
      {
        headers : {
        'x-ncp-auth-key' : 'AkiluHXyo4N1legXt3uA',
        'x-ncp-service-secret' : 'e1bf019e05d54e63bc4ec3a6700aecd9'
        }
      }).then(response =>{
        if(response.status === 202)
        {
          console.log("sending message is success");
          let newPhone = new approveModel();
          newPhone.phoneNumber = req.body.phoneNumber;
          newPhone.randomCode = confirmNumber;
          newPhone.role = "host";
          newPhone.save(function(err){
            if(err){
              return res.json({state : -1, msg : "msg sending is success but db save is failed"});
            }
            return res.json({state : 0, msg : "msg sending && db save is success"})
          })
        }else{
          return res.json({state : -1, msg : "msg sending is fail"})
        } 
      })
    });

  router.post('/phoneConfirm',function(req, res,next){
      approveModel.find({phoneNumber : req.body.phoneNumber, randomCode : req.body.confirmNumber},function(err, getInfo){
          if(err) {
            return res.json(err);
          };
          if(getInfo[0]){
              console.log("얻은 정보 : " +getInfo[0]);
              return res.json({state : 0, msg : "phoneNumber confirm is success"});
          } 
          else {
              return res.json({state : -1, msg : "phoneNumber confirm is failed"});
            }
          })
    });


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
  

router.post('/host',upload.single('img'),function(req, res,next){ 
      if(!req.body.userName){
          return res.json({state: -1, msg: 'ID can not be empty!'})
      }
      if(!req.body.password){
          return res.json({state: -1, msg: 'password can not be empty!'})
      }    
      if(!req.body.phone){
          return res.json({state: -1, msg: 'phone can not be empty!'})
      }
      if(!req.body.email){
          return res.json({state: -1, msg: 'email can not be empty!'})
      }
       console.log(req.body.userName);
        let registerUser = new hostModel();
        registerUser.userName = req.body.userName;
        registerUser.password = req.body.password;
        registerUser.email = req.body.email;
        registerUser.phone = req.body.phone;
        registerUser.name = req.body.name;
        registerUser.address= req.body.address;
        registerUser.location = req.body.location;
        registerUser.age = req.body.age;
        registerUser.work = req.body.work;

        registerUser.profileImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/hostProfile/"+newFile;
        
        registerUser.gender = req.body.gender;
        registerUser.role = "host";
        registerUser.report = false;
      registerUser.save(function (err) {
          if(err){
              return res.json({state : -1, msg : "error is occured"});
              
              // return;
          }
        res.json({ state: 0, msg: "host register success!" });
      });
});

   
module.exports = router;