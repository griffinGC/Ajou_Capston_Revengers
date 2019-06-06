var express = require('express');
var router = express.Router();

const referenceModel = require('../schemas/reference');



//guest => host 후기 글 작성 
router.post('/createHostReference',function(req, res, next){
    if(!req.body.title){
        return res.json({state : -1, msg : "reference Title is empty!"});
    }
    if(!req.body.content){
        return res.json({state : -1, msg : "reference Content is empty!"});
    }

    let writeReference = new referenceModel();

    writeReference.boardId = req.body.boardId;
    //작성되는곳 host profile
    writeReference.boardType = "host";
    //새로 작성될 title
    writeReference.title = req.body.title;
    writeReference.writer = req.body.writer;
    //작성될 host profile
    writeReference.userName = req.body.uerName;
    let day = new Date();
    let yy = day.getFullYear();
    let mm = day.getMonth()
    let dd = day.getDate();
    writeReference.writeDay = yy + '-' + mm + '-'+ dd;
    writeReference.content = req.body.content;
    writeReference.star = req.body.star;

    writeReference.save(function(err){
        if(err){
            console.log(err);
            return res.json({state : -1, msg : "write reference for host is failed"});
        }
        res.json({state : 0, msg : "write reference for host is success"});
    })


})



   
module.exports = router;