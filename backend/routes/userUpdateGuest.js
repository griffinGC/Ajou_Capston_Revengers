var express = require('express');
var router = express.Router();

const multer = require('multer');
var fs = require('fs');

const guestModel = require('../schemas/createGuest');

var newFile = "";

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'public/images/guestProfile')
    },
    filename: function(req, file, cb){
      let checkFile = file.originalname;
      newFile = Date.now() + "" + checkFile;
      console.log("저장하는곳에서 변경된 파일명 : " + newFile);
      cb(null, newFile);
    }
})

var upload = multer({ storage : storage})

//guest회원정보 수정 
//api
//http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/userUpdateGuest
router.post('/', upload.single('img'), function(req, res, next){
    let updateProfileImg = "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/images/guestProfile/"+newFile;
    
    console.log("userInfo Test");
    guestModel.deleteFile(req.body.userName, function(err, getInfo){
        var existFile = "";
        if(err){
            console.log(err);
            return err;
        }
        console.log("처음 능력 받았을때 : " +req.body.ability);
        let ability = req.body.ability;
        let deletea = ability.replace("[","");
        let deleteb = deletea.replace("]","");
        deleteb = deleteb.replace(/"/gi,'');
        console.log(deleteb);
        let abArr = deleteb.split(',');
        //받은 문자열을 배열로 다시 나눠서 재 저장함 

        console.log(getInfo);
        if(getInfo[0].profileImg)
        {
            var temp = getInfo[0].profileImg.split('/');
            existFile = temp[temp.length -1];
            console.log("잘린 문자열 : "+  temp);
            console.log(existFile);

            console.log("기존에 존재하던 파일 명 : " +existFile);
            fs.unlink(`public/images/guestProfile/${existFile}`, function(err){
                if(err) return err;
                console.log("기존의 이미지 파일이 삭제됨");
            })
        }else{
            console.log("기존의 파일들이 존재하지 않음");
        }

        guestModel.update({userName : req.body.userName},{$set : {password : req.body.password, userName:req.body.userName, name : req.body.name
            ,ability : abArr, phone : req.body.phone,email : req.body.email, profileImg :  updateProfileImg}},function(err){
            if(err){
                return res.json({state : -1, msg : "guest Information is failed to modify "});
            }
            res.json({state : 0, msg : "guest Information successfully modified"});
        })
    })

})


   
module.exports = router;