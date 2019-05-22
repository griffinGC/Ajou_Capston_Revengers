var express = require('express');
var router = express.Router();

const multer = require('multer');
// const upload = multer({dest : 'uploads/'})

var storage = multer.diskStorage({
    //cb는 콜백 
    destination : function(req, file, cb){
        cb(null, 'temp/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

var upload = multer({ storage : storage})

router.post('/', upload.single('img'), function(req, res, next){
    console.log(req.file);
    res.json({msg : 'uploaded', msg2 : req.file});
  });  
module.exports = router;