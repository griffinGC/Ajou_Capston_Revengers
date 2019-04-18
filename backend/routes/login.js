var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest')

router.get('/',function(req, res, error){
    if(!req.body.id){
        res.json({state: 1, msg : "username is empty"});
    }
    if(!req.body.pwd){
        res.json({state:1, msg : "password is empty"})
    }

    guestModel.find({guestId : req.body.id }, function(err,guestModel){
        if(err) return res.status(500).json({error:err});
        res.json({state:0, msg: "find guest success"});
    });
    // res.json({state:0});

    
})
/*
router.post('/',function(req, res, error){
    if(!req.body.id){
        res.json({state: 1, msg : "username is empty"});
    }
    if(!req.body.pwd){
        res.json({state:1, msg : "password is empty"})
    }

    guestModel.find({guestId : req.body.id }, function(err,guestModel){
        if(err) return res.status(500).json({error:err});
        res.json({state:0, msg: "find guest success"});
    });
    // res.json({state:0});

    
})
*/
module.exports = router;