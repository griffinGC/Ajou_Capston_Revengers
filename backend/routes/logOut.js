var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
const hostModel = require('../schemas/createHost');

router.get('/',function(req, res, error){
    if(req.session.userId){
        req.session.destroy(function(err) {
            // res.redirect('/');
            res.json({state : 0, msg : "destroy session"});
        })
    }
})
 


module.exports = router;