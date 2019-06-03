var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');

const multer = require('multer');


//guestid 확인용, gudstid 가입 => 총 2개의 router 지정해야함 
router.get('/:id',function(req, res,next){
  console.log("start");
  console.log(req.params.id);
  res.json({state : 0});
    
  });     


router.get('/guestConfirm/:id',function(req, res,next){
  console.log(req.params.id);
  if(!req.params.id){
    return res.json({state : -1, msg : "guest ID is empty"});
  }
    guestModel.find({userName : req.params.id},function(err,guestModel){
        if(err) {
          return res.json(err);
        };
        if(guestModel[0]){
            return res.json({state : -1, msg : "guest ID alreay exists!"})
        } 
        else {
            return res.json({state : 0, msg : "guest ID can use"});           
          }
        }); 
});

var newFile = "";

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/guestProfile')
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


router.post('/guest', upload.single('img'),function(req, res,next){
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
        console.log("처음 능력 받았을때 : " +req.body.ability);
        let ability = req.body.ability;
        let deletea = ability.replace("[","");
        let deleteb = deletea.replace("]","");
        deleteb = deleteb.replace(/"/gi,'');
        console.log(deleteb);
        let abArr = deleteb.split(',');
        //받은 문자열을 배열로 다시 나눠서 재 저장함 

        let registerUser = new guestModel();
        registerUser.userName = req.body.userName;
        registerUser.name = req.body.name;
        registerUser.password = req.body.password;
        registerUser.email = req.body.email;
        registerUser.phone = req.body.phone;

        registerUser.ability = abArr;
                
        registerUser.age = req.body.age;  
        
        registerUser.profileImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/guestProfile/"+newFile;
           
        registerUser.gender = req.body.gender;
        registerUser.role = "guest";
        registerUser.report = false;
        console.log("1");
      registerUser.save(function (err) {
          if(err){
              console.log(err);
              return res.json({state : -1, msg : "error is occured"});
          }
        res.json({ state: 0, msg: 'guest register success!' })
      })
});

   
module.exports = router;